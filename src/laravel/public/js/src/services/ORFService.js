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
		//init ORFService
		console.info("MediathekCrawler.ORFService.init");
		_model = model;
	},

	_fixORFLength = function(length){
		if(length.indexOf(' Min.') > 0){
			length = length.replace(' Min.', '');
			return '00:'+length;
		}
		if(length.indexOf(' Std.') > 0){
			length = length.replace(' Std.', '');
			var hh = Number(length.slice(0,2));
			var mm = Number(length.slice(3,5));
			// console.log("HH UND MM: ",hh,mm);	
			if(Number(hh)<10){
				hh = '0'+String(hh);
			}
			if(Number(mm)<10){
				mm = '0'+String(mm);
			}
			return hh+':'+mm+':00';
		}
	},

	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	searchString = function(searchStr) {
		var origin = {
			_channel: 'ORF',
			_method: 'searchString',
			_searchTerm: searchStr,
			_badge: null
		};

		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr/* + SEARCH_PARAMS*/);
		// var _searchUrl = PROXY_URL + "www.ORF.de/mediathek/video/suche/videosucheinclude100-solrSendereihenSuche_index-mediathekvideos.jsp";
		// console.log('ORF searchString url: ',_searchUrl);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: function(data){
				// console.log('ORF data: ',data);
				onORFLoadDetails(data, origin);
			}
		});
	},

	getNew = function(maxResults){
		var origin = {
			_channel: 'ORF',
			_method: 'getNew',
			_searchTerm: null,
			_badge: 'new'
		};

		var _searchUrl = PROXY_URL + encodeURI(SEARCH_NEW);
		// console.log('ORF getNew url: ',_searchUrl);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: function(data){
				// console.log('ORF data: ',data);
				onORFLoadDetails(data, origin, maxResults);
			}
		});
	},

	getHot = function(){
		var origin = {
			_channel: 'ORF',
			_method: 'getHot',
			_searchTerm: null,
			_badge: 'hot'
		};

		var _searchUrl = PROXY_URL + encodeURI(SEARCH_HOT);
		// console.log('ORF getNew url: ',_searchUrl);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: function(data){
				// console.log('ORF data: ',data);
				onORFLoadDetails(data, origin);
			}
		});
	},

	onORFLoadDetails = function(data, origin, maxResults) {

		// console.log('ORF pageHeadline: ',pageHeadline);
		// find all divs with the class 'teaser'
		if(!maxResults || maxResults === undefined || maxResults === null){
			maxResults = 15;
		}
		var counter = 1;
		var x = $(data).find('.item');
		x.each(function (index, element) {
			if(counter <= maxResults){

				// check if element has child with class 'media' and 'mediaA'
				if($(element).length > 0) {
					// get 'documentId' of video
					var	documentUrl = $(element).find('a').attr('href'),
						// broadcastUrlParams = _parseQueryString($(element).find(VIDEO_CLASS).find(LINK_CLASS).attr('href')),
						// documentId = broadcastUrlParams.documentId;
				// console.log('ORF onORFLoadDetails: ',documentUrl,documentId);
					
					// find container for details
					// var $textWrapper = $(element).find('div.textWrapper');
					_result = {};
					_result._station ='ORF';
				// console.log('ORF onORFLoadDetails STATION : ',$element.find('p.subtitle').text(), _result._station);
					_result._title = $(element).find('.item_title').text();
					_result._subtitle = ''; //$textWrapper.find('p.teasertext').text();
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

					// console.log(documentUrl, _result);
					loadORFStreams(documentUrl, _result, origin);
				}
				counter++;
			}
		});

	},

	loadORFStreams = function(documentUrl, result, origin) {
		var streamURL = PROXY_URL + encodeURI(documentUrl);
		// console.log('ORF loadORFStreams streamURL: ',streamURL);
		$.ajax({
			url: streamURL,
			type: 'GET',
			success: function(data) {
		// console.log('ORF loadORFStreams: ',typeof data, data);
				onloadORFStreams(documentUrl, result, data, origin);
			}
		});
	},

	onloadORFStreams = function(documentUrl, result, data, origin) {
		// console.log('ORF onloadORFStreams');;
		try{

			var resp = JSON.parse($(data).find('.service_link_play').attr('data-jsb'));
			// console.log('ORF: ', resp);
			var r = resp.video.sources;
			// console.log('ORF r: ',resp.video.sources);
			for(i=0;i<=r.length;i++){
				if(r[i].protocol === 'http' && r[i].src.indexOf('.mp4') > 0 && r[i].src.indexOf('3gp') === -1 && r[i].src.indexOf('m3u8') === -1 && r[i].src.indexOf('rtmp') === -1 && r[i].src.indexOf('rtsp') === -1 && r[i].src.indexOf('f4m') === -1){
					var basetype = '',
			    		quality = '',
			    		url = r[i].src,
			    		filesize = 0,
		    			type = 'video/mp4';
			    		console.log('ORF url: ',url);

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
			    		//console.log('basetype: ',basetype,', stream: ',stream._url);
						result._streams.push(stream);
		console.log('ORF onloadORFStreams: ', url, quality);
				}
			}

			// result._streams
		}catch(e){
			try{
				var resp = JSON.parse($(data).find('.player_viewport').find('.jsb_VideoPlaylist').attr('data-jsb'));
				// console.log('ORF resp: ',resp);
				var r = resp.selected_video.sources;
				// console.log('ORF r: ',resp.video.sources);
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
			    		//console.log('basetype: ',basetype,', stream: ',stream._url);
						result._streams.push(stream);
			console.log('ORF onloadORFStreams: ', url, quality);
					}
				}
			}catch(e){}
		}


		if(result._streams.length >0){
			_model.addResults(origin, result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
		}
	},

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