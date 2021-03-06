MediathekCrawler.DasErsteService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://mediathek.daserste.de',
	PROXY_URL = '/proxy.php?url=',
	VIDEOSBYDATE_URL = 'http://mediathek.daserste.de/tv/sendungVerpasst?datum=',

	// constants for searching
	SEARCH_URL = 'http://mediathek.daserste.de/tv/suche?searchText=',
	SEARCH_PARAM_SORT_RELEVANCE = '&topRessort=tv&sort=score',
	SEARCH_PARAM_SORT_DATE = '&topRessort=tv&sort=date',
	SEARCH_PARAM_PAGE = '&goto=',
	SEARCH_WRAPPER_ELEMENT = 'div#resultstab_1',
	SEARCH_ITEM_WRAPPER = 'li',
	SEARCH_ITEM_ELEMENT = 'a.clearfix',
	SEARCH_LIVE_ITEM = 'boxNowPlaying',
	STATION = 'Das Erste',
	TITLE_ELEMENT = 'span.boxTitle',
	SUBTITLE_ELEMENT = 'span.boxDescription',
	LENGTH_ELEMENT = 'span.boxDuration',
	DATE_ELEMENT = 'span.boxDate',
	IMAGE_ELEMENT = 'span.boxImgContainer img',
	
	// constants for streaming
	STREAM_URL = 'http://www.ardmediathek.de/play/media/',
	STREAM_PARAMS = '?deviceType=pc&features=flash',

	// constants for new videos
	NEW_WRAPPER_ELEMENT = '.moduleVideoList #tab_1',

	// constants for details
	DETAIL_ELEMENT = '#infobox_1 .boxInner p',
	AIRTIME_DATE_ELEMENT = '#infobox_1 .boxInner .boxMeta .boxDate',
	AIRTIME_TIME_ELEMENT = '#infobox_1 .boxInner .boxMeta .boxTime',

	// constants for categories
	CATEGORIES_WRAPPER_ELEMENT = '#layer_themen3 .jsScroll',

	// Available image formats in "DasErste Mediathek"
	IMG_RESOLUTIONS = [
		{ 'quality': 'xs', 'resolution': '128x72' },
		{ 'quality': 's', 'resolution': '256x144' },
		{ 'quality': 'm', 'resolution': '512x288' },
		{ 'quality': 'l', 'resolution': '960x540' },
	],

	// Available video formats in "DasErste Mediathek"
	QUALITIES = [
		{ 'quality': 0, 'resolution': '256x144' },
		{ 'quality': 1, 'resolution': '512x288' },
		{ 'quality': 2, 'resolution': '640x360' },
		{ 'quality': 3, 'resolution': '966x544' },
	],

	// Categories
	CATEGORIES = [
		{
			'_id': 'nachrichten',
			'_url': 'http://mediathek.daserste.de/themen/4324_nachrichten-wetter',
		},
		{
			'_id': 'politik',
			'_url': 'http://mediathek.daserste.de/themen/204_politik-weltgeschehen',
		},
		{
			'_id': 'sport',
			'_url': 'http://mediathek.daserste.de/themen/53502_sport',
		},
		{
			'_id': 'kinder',
			'_url': 'http://mediathek.daserste.de/themen/1366_kinder',
		},
		{
			'_id': 'ratgeber-gesundheit',
			'_url': 'http://mediathek.daserste.de/themen/53356_ratgeber-service',
		},
		{
			'_id': 'wirtschaft',
			'_url': 'http://mediathek.daserste.de/themen/4072_wirtschaft-boerse',
		},
		{
			'_id': 'unterhaltung',
			'_url': 'http://mediathek.daserste.de/themen/53378_unterhaltung',
		},
		{
			'_id': 'kino-tv',
			'_url': 'http://mediathek.daserste.de/themen/5246_soaps-serien',
		},
		{
			'_id': 'wissen-kultur',
			'_url': 'http://mediathek.daserste.de/themen/1398_wissen-kultur',
		},
	],

	// private instance of the model
	_model = null,
	// define empty list for categories
	_categories = null,

	init = function(model) {
		_model = model;
		_categories = [];
	},


	/**
	 * Public function to search with given string, type and numResults
	 * @param {String}		string to search
	 * @param {Integer}		type [0=>ByRelevance, 1=>ByDate]
	 */
	searchString = function(searchStr, type) {
		var origin = {
			_channel: 'DasErste',
			_method: 'searchString',
			_searchTerm: searchStr,
			_badge: null
		};
		switch (type) {
			case 0: 	// search by relevance
				searchDASERSTEStringByRelevance(origin, searchStr);
				break;

			case 1: 	// search by date
				searchDASERSTEStringByDate(origin, searchStr);
				break;
		}
	},

	/**
	 * Private function to search with given string sorted by relevance
	 * @param {Object} origin
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchDASERSTEStringByRelevance = function(origin, searchStr) {
		// build restful URL for search in Das Erste
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_RELEVANCE);

		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {

				onDASERSTESearchString(origin, data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; DasErsteService.searchDASERSTEStringByRelevance; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Private function to search with given string sorted by date
	 * @param {Object} origin
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchDASERSTEStringByDate = function(origin, searchStr) {
		// build restful URL for search in Das Erste
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_DATE);
		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {

				onDASERSTESearchString(origin, data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; DasErsteService.searchDASERSTEStringByDate; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {Object} origin
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onDASERSTESearchString = function(origin, data) {
		var x = $(data).find('.flash');
		x.each(function(index,el) {

				var _result = {};
				_result._streams = [];
				documentUrl = $(el).find('.mediaLink').attr('href');
				documentId = documentUrl.slice(documentUrl.indexOf('documentId=') + 11, documentUrl.indexOf('&topRessort'));
				
				var temp2 = $(el).find('.mediaLink').find('.img');
				_result._teaserImages = [];
				var res = null;
				var resX = null;
				var resY = null;
				var imgURL = $(temp2).attr('data-ctrl-image');
				imgURL = imgURL.slice(imgURL.indexOf('urlScheme\':\'') + 12, imgURL.indexOf('##width##'));
				imgURL = imgURL + '384';
				if(imgURL.indexOf('16x9') > 0){
					resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
					resY = parseInt(resX / 1.7777);
					res = resX +'x'+ resY;
					_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
				}else{						
					_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
				}
				loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);
		});
	},

	/**
	 * Function to get videos by date
	 * @param {String} maxResults
	 * @param {String|Date} startdate (DD.MM.YYYY)
	 * @param {String|Date} enddate (DD.MM.YYYY)
	 */
	getDasErsteVideosByDate = function(maxResults, startdate, enddate){

		var documentUrl = null;
		var documentId = null;
		var origin = {};

		Date.prototype.addDays = function(days) {
	       var dat = new Date(this.valueOf());
	       dat.setDate(dat.getDate() + days);
	       return dat;
	   	}

	   var dates = [];
	   var currentDate = new Date(startdate);
	   var endd = new Date(enddate);

	   while (currentDate <= endd) {
       		dates.push(String(currentDate.getDate())+'.'+String(currentDate.getMonth()+1)+'.'+String(currentDate.getFullYear()))
        	currentDate = currentDate.addDays(1);
       }

		for(i=0;i<dates.length;i++){

		var counter = 1;
        var _url = PROXY_URL + VIDEOSBYDATE_URL+String(dates[i]);
    		
   		
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					success: function(data) {
						var x = $(data).find('.teaserbox');
						x.each(function(index,element){

								var y = $(element).find('.teaser');
								y.each(function(idx, el){

									var _result = {};
									_result._streams = [];
									documentUrl = $(el).find('.mediaLink').attr('href');
									documentId = documentUrl.slice(documentUrl.indexOf('documentId=') + 11, documentUrl.indexOf('&topRessort'));
									
									var temp2 = $(el).find('.mediaLink').find('.img');
									_result._teaserImages = [];
									var res = null;
									var resX = null;
									var resY = null;
									var imgURL = $(temp2).attr('data-ctrl-image');
									imgURL = imgURL.slice(imgURL.indexOf('urlScheme\':\'') + 12, imgURL.indexOf('##width##'));
									imgURL = imgURL + '384';
									if(imgURL.indexOf('16x9') > 0){
										resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
										resY = parseInt(resX / 1,7777);
										res = resX +'x'+ resY;
										_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
									}else{						
										_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
									}

									loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);
								});
						});
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.warn('ERROR; DasErsteService.getDasErsteVideosByDate; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
					}
				});
		}
	},

	/**
	 * Private function for async loading of details for a search result
	 * @param {Object} origin
	 * @param {String} documentId
	 * @param {Object} result
	 * @param {String} detailURL
	 */
	loadDASERSTEDetails = function(origin, documentId, result, detailURL) {
		var detailURL = PROXY_URL + encodeURI(detailURL);
		$.ajax({
			url: detailURL,
			type: 'GET',
			cache: false,
			success: function(data) {
				onloadDASERSTEDetails(origin, documentId, result, data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; DasErsteService.loadDASERSTEDetails; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/** 
	 * Callback function for async loading of details for results
	 * @param {Object} origin
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing details and precise airtime)
	 * @param {HTML}				HTML markup of the retrieved detail page of the broadcast
	 */
	onloadDASERSTEDetails = function(origin, documentId, result, data) {
		var _result = result;
		var res = $(data).find('.modClipinfo');
		// fill result params if missing:
			_result._station = STATION;
				
			if(!_result._title || _result._title === undefined){
				try{

				_result._title = $(data).find('.dachzeile').text();
				}catch(e){
				}
			}
			if(!_result._subtitle || _result._subtitle === undefined || _result._subtitle === ''){
				try{

				var temp = $(res).find('.headline');
				_result._subtitle = $(temp).text();
				}catch(e){
				}
			}
			if(!_result._length || _result._length === undefined || _result._length === ''){
				try{

				var temp = $(res).find('.subtitle');
				if($(temp).text().indexOf('|') > 0){
					_result._length = $(temp).text();
					_result._length = '00:'+ _result._length.slice(_result._length.indexOf(' | ') + 3, _result._length.indexOf(' Min'));
				}else{
					_result._length = '';
				}
				}catch(e){
				}
			}
			if(!_result._airtime || _result._airtime === undefined || _result._airtime === '' || _result._airtime.indexOf('undefined') >0){
				try{

				var temp = $(res).find('.subtitle');
				_result._airtime = $(temp).text();
				if(_result._airtime.indexOf('|') > 0){
					_result._airtime = _result._airtime.slice(0, _result._airtime.indexOf(' | '));
				}
				if(_result._subtitle.indexOf('Uhr') > 0){
					_result._airtime += ' '+_result._subtitle.slice(_result._subtitle.indexOf('Uhr') - 6,_result._subtitle.indexOf('Uhr'));
					if(_result._subtitle.indexOf(',') > 0){
						_result._subtitle = _result._subtitle.slice(0, _result._subtitle.indexOf(','));
					}
				}
				}catch(e){
				}
			}
			
			if(!_result._streams || _result._streams === undefined){
			}
			if(!_result._details || _result._details === undefined || _result._details === ''){
				try{

				var temp = $(res).find('.teasertext');
				_result._details = $(temp).text();
				}catch(e){
				}
			}
		// load streams for result
		loadDASERSTEStreams(origin, documentId, _result);
	},

	/**
	 * Private function for async loading of streams for a search result
	 * @param {Object} origin
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 */
	loadDASERSTEStreams = function(origin, documentId, result) {
		var streamURL = PROXY_URL + encodeURI(STREAM_URL + documentId);
		$.ajax({
			url: streamURL,
			type: 'GET',
			cache: false,
			success: function(data) {
				onloadDASERSTEStreams(origin, documentId, result, data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; DasErsteService.loadDASERSTEStreams; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Callback function for async loading of streams
	 * @param {Object} origin
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 * @param {JSON}				JSON response of stream loading
	 */
	onloadDASERSTEStreams = function(origin, documentId, result, data) {
		try{
			var data = JSON.parse(data);
		}catch(e){
			var data = data;
		}
		result._streams = [];
		for (var i=0; i<data._mediaArray.length; i++) {
			for (var j=0; j<data._mediaArray[i]._mediaStreamArray.length; j++) {
				var server = data._mediaArray[i]._mediaStreamArray[j]._server;
				var stream = data._mediaArray[i]._mediaStreamArray[j]._stream;
				if ( typeof stream === 'string' ) {
					var _url = stream;
				} else {
					var _url = stream[0];
				}

				var _basetype = null,
					_type = data._type + '/' + _url.substr(_url.lastIndexOf('.') + 1);
					_quality = data._mediaArray[i]._mediaStreamArray[j]._quality;
					_filesize = null;

				if(server !== ''){
					var _url = server+stream;
					_type = 'rtmp/mp4';
				}
				result._streams.push(_model.createStream(_basetype, _type, _quality, _url, _filesize));
			}
		}

		_model.addResults(origin, result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
	},


	/**
	 * Public function to get most viewed videos
	 * @param {String} maxResults
	 */
	getNew = function(maxResults) {
		var origin = {
			_channel: 'DasErste',
			_method: 'getNew',
			_searchTerm: null,
			_badge: 'new'
		};
		// build restful URL for search in Das Erste
		var _newUrl = PROXY_URL + encodeURI(BASE_URL);

		// send asynchronous xmphttp request
		$.ajax({
			url: _newUrl,
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {

				onDASERSTEGetNew(maxResults, origin, data)
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; DasErsteService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String} maxResults
	 * @param {Object} origin
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onDASERSTEGetNew = function(maxResults, origin, data) {
		if(!maxResults || maxResults === undefined || maxResults === null){
			maxResults = 20;
		}
		var documentUrl = null;
		var documentId = null;
		var x = $(data).find('.modHeadline');
		var counter = 1;
		x.each(function (index, element) {
			if($(element).text() === 'Neueste Videos') {
				temp = $(element).next();
				var y = $(temp).find('.box');
				y.each(function(idx,el){
					if(counter <= maxResults){
						
						var _result = {};
						_result._streams = [];
						documentUrl = $(el).find('.mediaLink').attr('href');
						documentId = documentUrl.slice(documentUrl.indexOf('documentId=') + 11, documentUrl.indexOf('&topRessort'));
						
						var temp2 = $(el).find('.mediaLink').find('.img');
						_result._teaserImages = [];
						var res = null;
						var resX = null;
						var resY = null;
						var imgURL = $(temp2).attr('data-ctrl-image');
						imgURL = imgURL.slice(imgURL.indexOf('urlScheme\':\'') + 12, imgURL.indexOf('##width##'));
						imgURL = imgURL + '384';
						if(imgURL.indexOf('16x9') > 0){
							resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
							resY = parseInt(resX / 1,7777);
							res = resX +'x'+ resY;
							_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
						}else{						
							_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
						}

						++counter;
						loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);
					}
				});
			}
		});
	},

	/**
	 * Function to get 'hot' videos
	 */
	getHot = function(){
		var origin = {
			_channel: 'DasErste',
			_method: 'getHot',
			_searchTerm: null,
			_badge: 'hot'
		};

		var _url = PROXY_URL + encodeURI(BASE_URL);

		$.ajax({
			url: _url,
			type: 'GET',
			cache: false,
			success: function(data) {
				onDASERSTEGetHot(origin, data)
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; DasErsteService.getHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get detail URL of 'hot' videos
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
	onDASERSTEGetHot = function(origin, data){
		var _url = PROXY_URL + encodeURI(BASE_URL + $(data).find('.modButton').find('.textLink').attr('href'));
		if(_url && _url !== undefined){

			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data) {
					onDASERSTEParseHot(origin, data)
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; DasErsteService.onDASERSTEGetHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});

		}else{
		}
	},

	/**
	 * Function to get details of 'hot' videos
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
	onDASERSTEParseHot = function(origin, data){
		var x = $(data).find('.flash');
		x.each(function(index, el){

			var _result = {};
			_result._streams = [];
			documentUrl = $(el).find('.mediaLink').attr('href');
			documentId = documentUrl.slice(documentUrl.indexOf('documentId=') + 11, documentUrl.indexOf('&topRessort'));
			
			var temp2 = $(el).find('.mediaLink').find('.img');
			_result._teaserImages = [];
			var res = null;
			var resX = null;
			var resY = null;
			var imgURL = $(temp2).attr('data-ctrl-image');
			imgURL = imgURL.slice(imgURL.indexOf('urlScheme\':\'') + 12, imgURL.indexOf('##width##'));
			imgURL = imgURL + '384';
			if(imgURL.indexOf('16x9') > 0){
				resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
				resY = parseInt(resX / 1.7777);
				res = resX +'x'+ resY;
				_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
			}else{						
				_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
			}
			loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);

		});

	},

	/**
	 * function to reset the instance of DasErsteService
	 */
	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;
	that.getNew = getNew;
	that.getHot = getHot;
	that.getDasErsteVideosByDate = getDasErsteVideosByDate;

	return that;
};