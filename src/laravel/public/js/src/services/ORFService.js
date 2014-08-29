MediathekCrawler.ORFService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://tvthek.orf.at/',
	PROXY_URL = '/proxy.php?url=',
	ORF_NEW_URL = '',

	// constants for searching
	SEARCH_URL = 'http://tvthek.orf.at/search?q=',
	SEARCH_NEW = 'http://tvthek.orf.at/newest',
	SEARCH_HOT = 'http://tvthek.orf.at/most_viewed',
	SEARCH_PARAMS = '', 
	SEARCH_PAGE2 = ''
	STREAM_URL = '',

	_model = null,
	once = 1,
	
	
	init = function(model) {
		_model = model;
	},

	/**
	 * Function to fix format of a given string
	 * @param {String} length
	 */
	_fixORFLength = function(length){
		if(length.indexOf(' Min.') > 0){
			length = length.replace(' Min.', '');
			return '00:'+length;
		}
		if(length.indexOf(' Std.') > 0){
			length = length.replace(' Std.', '');
			var hh = Number(length.slice(0,2));
			var mm = Number(length.slice(3,5));
			if(Number(hh)<10){
				hh = '0'+String(hh);
			}
			if(Number(mm)<10){
				mm = '0'+String(mm);
			}
			return hh+':'+mm+':00';
		}
	},

	/**
	 * Function to replace chars within a given string
	 * @param {String} find
	 * @param {String} replace
	 * @param {String} str
	 */
	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	/**
	 * Function to search videos by a given keyword
	 * @param {String} searchStr
	 */
	searchString = function(searchStr) {
		var origin = {
			_channel: 'ORF',
			_method: 'searchString',
			_searchTerm: searchStr,
			_badge: null
		};

		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data){
				onORFLoadDetails(data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ORFService.searchString; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get 'new' videos
	 * @param {String|Integer} maxResults
	 */
	getNew = function(maxResults){
		var origin = {
			_channel: 'ORF',
			_method: 'getNew',
			_searchTerm: null,
			_badge: 'new'
		};

		var _searchUrl = PROXY_URL + encodeURI(SEARCH_NEW);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data){
				onORFLoadDetails(data, origin, maxResults);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ORFService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get 'hot' videos
	 */
	getHot = function(){
		var origin = {
			_channel: 'ORF',
			_method: 'getHot',
			_searchTerm: null,
			_badge: 'hot'
		};

		var _searchUrl = PROXY_URL + encodeURI(SEARCH_HOT);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data){
				// console.log('ORF data: ',data);
				onORFLoadDetails(data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ORFService.getHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get details for videos
	 * @param {String|HTML|JSON} data
	 * @param {Object} origin
	 * @param {String|Integer} maxResults
	 */
	onORFLoadDetails = function(data, origin, maxResults) {
		if(!maxResults || maxResults === undefined || maxResults === null){
			maxResults = 15;
		}
		var counter = 1;
		var x = $(data).find('.item');
		x.each(function (index, element) {
			if(counter <= maxResults){

				if($(element).length > 0) {
					var	documentUrl = $(element).find('a').attr('href'),
					_result = {};
					_result._station ='ORF';
					_result._title = $(element).find('.item_title').text();
					_result._subtitle = ''; 
					_result._length = $(element).find('.meta_duration').text();
					_result._length = _fixORFLength(_result._length);
					_result._details = $(element).find('.item_description').text();
					_result._airtime = $(element).find('.meta_date').text();
					_result._airtime = _result._airtime.slice(4,100);
					_result._airtime += ' '+$(element).find('.meta_time').text();
					_result._airtime = _result._airtime.replace(' Uhr','');
					_result._teaserImages = [],
					_result._teaserImages.push(_model.createTeaserImage('395x209', $(element).find('.item_image').find('img').attr('src')));
					_result._streams = [];

					loadORFStreams(documentUrl, _result, origin);
				}
				counter++;
			}
		});

	},

	/**
	 * Function to get streams for videos
	 * @param {String} documentUrl
	 * @param {Object} result
	 * @param {Object} origin
	 */
	loadORFStreams = function(documentUrl, result, origin) {
		var streamURL = PROXY_URL + encodeURI(documentUrl);
		$.ajax({
			url: streamURL,
			type: 'GET',
			cache: false,
			success: function(data) {
				onloadORFStreams(documentUrl, result, data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ORFService.loadORFStreams; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get & parse streams for videos
	 * @param {String} documentUrl
	 * @param {Object} result
	 * @param {String|HTML|JSON} data
	 * @param {Object} origin
	 */
	onloadORFStreams = function(documentUrl, result, data, origin) {
		try{

			var resp = JSON.parse($(data).find('.service_link_play').attr('data-jsb'));
			var r = resp.video.sources;
			for(i=0;i<=r.length;i++){
				if(r[i].protocol === 'http' && r[i].src.indexOf('.mp4') > 0 && r[i].src.indexOf('3gp') === -1 && r[i].src.indexOf('m3u8') === -1 && r[i].src.indexOf('rtmp') === -1 && r[i].src.indexOf('rtsp') === -1 && r[i].src.indexOf('f4m') === -1){
					var basetype = '',
			    		quality = '',
			    		url = r[i].src,
			    		filesize = 0,
		    			type = 'video/mp4';

		    			switch (r[i].quality_string) {
			    			case 'hoch':
			    				quality = 3;
			    				break;
			    			case 'mittel':
			    				quality = 2;
			    				break;
			    			case 'niedrig':
			    				quality = 1;
			    				break;
	    				}
			    		var stream = _model.createStream(basetype, type, quality, url, filesize);
						result._streams.push(stream);
				}
			}

		}catch(e){
			try{
				var resp = JSON.parse($(data).find('.player_viewport').find('.jsb_VideoPlaylist').attr('data-jsb'));
				var r = resp.selected_video.sources;
				for(i=0;i<=r.length;i++){
					if(r[i].protocol === 'http' && r[i].src.indexOf('.mp4') > 0 && r[i].src.indexOf('3gp') === -1 && r[i].src.indexOf('m3u8') === -1 && r[i].src.indexOf('rtmp') === -1 && r[i].src.indexOf('rtsp') === -1 && r[i].src.indexOf('f4m') === -1){
						var basetype = '',
				    		quality = '',
				    		url = r[i].src,
				    		filesize = 0,
			    			type = 'video/mp4';

		    			switch (r[i].quality_string) {
			    			case 'hoch':
			    				quality = 3;
			    				break;
			    			case 'mittel':
			    				quality = 2;
			    				break;
			    			case 'niedrig':
			    				quality = 1;
			    				break;
	    				}
			    		var stream = _model.createStream(basetype, type, quality, url, filesize);
						result._streams.push(stream);
					}
				}
			}catch(e){}
		}


		if(result._streams.length >0){
			_model.addResults(origin, result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
		}
	},

	/**
	 * Function to reset the instance of ARTEService
	 */
	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;
	that.getNew = getNew;
	that.getHot = getHot;

	return that;

};