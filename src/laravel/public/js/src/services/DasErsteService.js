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


	/**
	 * Public function to initialize the instance of DasErsteService
	 */
	init = function(model) {
		console.info("MediathekCrawler.DasErsteService.init");
		_model = model;
		_categories = [];
	},


	/**
	 * Public function to search with given string, type and numResults
	 * @param {String}		string to search
	 * @param {Integer}		type [0=>ByRelevance, 1=>ByDate]
	 * @param {Integer}		maximum number of results
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
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchDASERSTEStringByRelevance = function(origin, searchStr) {
		// build restful URL for search in Das Erste
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_RELEVANCE);
		// console.log('DASERSTTE searchDASERSTEStringByRelevance: ',_searchUrl);

		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {

				onDASERSTESearchString(origin, data)
			}
		});
	},

	/**
	 * Private function to search with given string sorted by date
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchDASERSTEStringByDate = function(origin, searchStr) {
		// TODO: searching by date not working correctly
		// 		- second tab on mediathek page is loaded by ajax --> ajax isn't ready when php queries the page

		// build restful URL for search in Das Erste
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_DATE);
		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {

				onDASERSTESearchString(origin, data)
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onDASERSTESearchString = function(origin, data) {
		/*var resp = */
		$(data).find('.flash').each(function(index,el) {
			// if($(el).hasClass('flash')){

			// return((" " + this.className + " ").match(/box\s*flash/) !== null);
			// });
			// $(resp).each(function (index, el) {
				// console.log('DASERSTE onDASERSTESearchString: ',el);
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
				//willkürliche Größenangabe für Bildbreite:
				imgURL = imgURL + '384';
				// console.log('TEASERIMAGES imgURL: ',BASE_URL + imgURL);
				if(imgURL.indexOf('16x9') > 0){
					resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
					resY = parseInt(resX / 1.7777);
					res = resX +'x'+ resY;
					_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
				}else{						
					_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
				}
				// if(!$(element).find(SEARCH_ITEM_ELEMENT).hasClass(SEARCH_LIVE_ITEM)) {
				// 	// retrieving documentId for streamURL
				// 	var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
				// 		documentId = $(element).find('.boxPlaylistIcons>img').attr('class');
				// 		if (documentId !== undefined) {
				// 			documentId = documentId.replace(/\D/g,'');
				// 		// building result meta information
				// 		var _result = {};
				// 		_result._station = STATION;
				// 		_result._title = $(element).find(TITLE_ELEMENT).text();
				// 		_result._subtitle = $(element).find(SUBTITLE_ELEMENT).text();
				// 		_result._length = $(element).find(LENGTH_ELEMENT).text();
				// 		_result._airtime = $(element).find(DATE_ELEMENT).text();
				// 		imgURL = $(element).find(IMAGE_ELEMENT).attr('src');
				// 		_result._teaserImages = [];
				// 		_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
				// 		_result._streams = [];
				// 		// load details
				loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);
				// 	}
				// } else {
				// 	// LIVESTREAM
				// }
			// }
		});
	},

	getDasErsteVideosByDate = function(maxResults, startdate, enddate){

		var documentUrl = null;
		var documentId = null;
		var origin = {};
		// console.log('DASERSTE received dates: ',startdate, enddate);

		Date.prototype.addDays = function(days) {
	       var dat = new Date(this.valueOf())
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

       // console.log('DASERSTE dates: ',dates);
       	
		for(i=0;i<dates.length;i++){

		var counter = 1;
        var _url = PROXY_URL + VIDEOSBYDATE_URL+String(dates[i]);

    		
   		
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					success: function(data) {
						$(data).find('.teaserbox').each(function(index,element){

							// if(counter <= maxResults){

								$(element).find('.teaser').each(function(idx, el){

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
									//willkürliche Größenangabe für Bildbreite:
									imgURL = imgURL + '384';
									// console.log('TEASERIMAGES imgURL: ',BASE_URL + imgURL);
									if(imgURL.indexOf('16x9') > 0){
										resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
										resY = parseInt(resX / 1,7777);
										res = resX +'x'+ resY;
										_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
									}else{						
										_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
									}

									// console.log('DASERSTE onDASERSTEGetNew DATA: ', _result);
									// // load details for result
									loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);

									// console.log('DasErste getDasErsteVideosByDate: ', el);
								});
							// counter++;
							// }

						});
					},
					error: function(data){
						console.log('DasErste - Could not fetch Data from: ',_url);
					}
				});
  			
		}
	},

	/**
	 * Private function for async loading of details for a search result
	 * @param {String}		url of the detail page
	 */
	loadDASERSTEDetails = function(origin, documentId, result, detailURL) {

		// console.log('DASERSTE loadDASERSTEDetails: \n',documentId, result, detailURL);
		var detailURL = PROXY_URL + encodeURI(detailURL);
		$.ajax({
			url: detailURL,
			type: 'GET',
			cache: false,
			success: function(data) {
				onloadDASERSTEDetails(origin, documentId, result, data);
			}
		});
	},

	/** 
	 * Callback function for async loading of details for results
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing details and precise airtime)
	 * @param {HTML}				HTML markup of the retrieved detail page of the broadcast
	 */
	onloadDASERSTEDetails = function(origin, documentId, result, data) {

		// console.log('result._streams:\n',data);

		var _result = result;
		var res = $(data).find('.modClipinfo');
		// console.log('DASERSTE res: ',res);
		// var temp = null;
		// fill result params if missing:
			
			_result._station = STATION;
				
			if(!_result._title || _result._title === undefined){
				try{

				_result._title = $(data).find('.dachzeile').text();
				}catch(e){
					console.log(e);
				}
			}
			if(!_result._subtitle || _result._subtitle === undefined || _result._subtitle === ''){
				try{

				var temp = $(res).find('.headline');
				_result._subtitle = $(temp).text();
				// console.log('_result._subtitle: ',temp,_result._subtitle);
				}catch(e){
					console.log(e);
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
				// console.log('_result._length: ',$(temp).text(),' to: ',_result._length);
				}catch(e){
					console.log(e);
				}
			}
			if(!_result._airtime || _result._airtime === undefined || _result._airtime === '' || _result._airtime.indexOf('undefined') >0){
				try{

				// _result._airtime = $(data).find(AIRTIME_DATE_ELEMENT).text().split(' ')[1] + ' ' + $(data).find(AIRTIME_TIME_ELEMENT).text().split(' ')[0];
				var temp = $(res).find('.subtitle');
				_result._airtime = $(temp).text();
				if(_result._airtime.indexOf('|') > 0){
					_result._airtime = _result._airtime.slice(0, _result._airtime.indexOf(' | '));
					// console.log('DASERSTE _result._airtime: ',$(temp).text(),' to: ',result._airtime);
				}
				}catch(e){
					console.log(e);
				}
			}
			if(!_result._teaserImages || _result._teaserImages === undefined || _result._teaserImages.length < 1){
				// 	imgURL = $(data).find(IMAGE_ELEMENT).attr('src'),
				// 	_result._teaserImages = [],
				// 	_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL)),
			}
			if(!_result._streams || _result._streams === undefined){
					// _result._streams = [];
			}
			if(!_result._details || _result._details === undefined || _result._details === ''){
				try{

				var temp = $(res).find('.teasertext');
				// var temp2 = $(temp).next();
				// var temp3 = $(temp).find('.teasertext');
				_result._details = $(temp).text();
				// console.log('_result._details: ',temp,_result._details);
				}catch(e){
					console.log(e);
				}
			}
		// console.log('DASERSTE onloadDASERSTEDetails: \n',documentId, _result);
		// load streams for result
		loadDASERSTEStreams(origin, documentId, _result);
	},

	/**
	 * Private function for async loading of streams for a search result
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 */
	loadDASERSTEStreams = function(origin, documentId, result) {

		// console.log('DASERSTE loadDASERSTEStreams: \n',documentId, result);
		var streamURL = PROXY_URL + encodeURI(STREAM_URL + documentId);
		$.ajax({
			url: streamURL,
			type: 'GET',
			cache: false,
			success: function(data) {
				onloadDASERSTEStreams(origin, documentId, result, data);
			}
		});
	},

	/**
	 * Callback function for async loading of streams
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 * @param {JSON}				JSON response of stream loading
	 */
	onloadDASERSTEStreams = function(origin, documentId, result, data) {
		
		// only is fired for correct results:
		// console.log('DASERSTE onloadDASERSTEStreams: \n',documentId, result);

		// how do the other reslts get added to the model?
		// this is the only method with the proper call...!?
		
		// console.log('DASERSTE onloadDASERSTEStreams: \n',documentId, result);
		var data = JSON.parse(data);
		// result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[3].resolution, BASE_URL + data._previewImage));
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

				var _basetype = null,	// TODO: missing basetype!
					_type = data._type + '/' + _url.substr(_url.lastIndexOf('.') + 1);
					_quality = data._mediaArray[i]._mediaStreamArray[j]._quality;
					_filesize = null;	// TODO: missing filesize!

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
	 */
	getNew = function() {
		var origin = {
			_channel: 'DasErste',
			_method: 'getNew',
			_searchTerm: null,
			_badge: 'new'
		};
		// build restful URL for search in Das Erste
		var _newUrl = PROXY_URL + encodeURI(BASE_URL);
		// console.log('dasERSTE getNew url: ',_newUrl);

		// send asynchronous xmphttp request
		$.ajax({
			url: _newUrl,
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {

				onDASERSTEGetNew(origin, data)
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onDASERSTEGetNew = function(origin, data) {
		var documentUrl = null;
		var documentId = null;
		// console.log('DASERSTE onDASERSTEGetNew: ',data);
		$(data)./*find(NEW_WRAPPER_ELEMENT).*/find('.modHeadline').each(function (index, element) {
			// console.log('modHeadline-element TEXT: ',$(element).text());
			if($(element).text() === 'Neueste Videos') {
				temp = $(element).next();
				// console.log('TEMP: ',temp);
				$(temp).find('.box').each(function(idx,el){
					var _result = {};
					_result._streams = [];
					documentUrl = $(el).find('.mediaLink').attr('href');
					documentId = documentUrl.slice(documentUrl.indexOf('documentId=') + 11, documentUrl.indexOf('&topRessort'));
					// console.log('FOUND box flash link: ',documentUrl, documentId);



					// retrieving documentId for streamURL
					// var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
					// 	documentId = $(element).find('.boxPlaylistIcons>img').attr('class'),
					// 	documentId = documentId.replace(/\D/g,'');

					// // building result meta information
					// 	_result._station = STATION,
					// 	_result._title = $(element).find(TITLE_ELEMENT).text(),
					// 	_result._subtitle = $(element).find(SUBTITLE_ELEMENT).text(),
					// 	_result._length = $(element).find(LENGTH_ELEMENT).text(),
					// 	_result._airtime = $(element).find(DATE_ELEMENT).text(),
					var temp2 = $(el).find('.mediaLink').find('.img');
					_result._teaserImages = [];
					var res = null;
					var resX = null;
					var resY = null;
					var imgURL = $(temp2).attr('data-ctrl-image');
					imgURL = imgURL.slice(imgURL.indexOf('urlScheme\':\'') + 12, imgURL.indexOf('##width##'));
					//willkürliche Größenangabe für Bildbreite:
					imgURL = imgURL + '384';
					// console.log('TEASERIMAGES imgURL: ',BASE_URL + imgURL);
					if(imgURL.indexOf('16x9') > 0){
						resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
						resY = parseInt(resX / 1,7777);
						res = resX +'x'+ resY;
						_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
					}else{						
						_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
					}

					// console.log('DASERSTE onDASERSTEGetNew DATA: ', _result);
					// // load details for result
					loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);
				});
			}
		});
	},

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
				}
			});
	},

	onDASERSTEGetHot = function(origin, data){
		var _url = PROXY_URL + encodeURI(BASE_URL + $(data).find('.modButton').find('.textLink').attr('href'));
		// console.log('onDASERSTEGetHot: ', _url);
		if(_url && _url !== undefined){

			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data) {
					onDASERSTEParseHot(origin, data)
				}
			});

		}else{
			console.log('DasErste onDASERSTEGetHot could not fetch _url! ',_url);
		}
	},

	onDASERSTEParseHot = function(origin, data){

		$(data).find('.flash').each(function(index, el){

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
			//willkürliche Größenangabe für Bildbreite:
			imgURL = imgURL + '384';
			// console.log('TEASERIMAGES imgURL: ',BASE_URL + imgURL);
			if(imgURL.indexOf('16x9') > 0){
				resX = imgURL.slice(imgURL.indexOf('16x9/') + 5, imgURL.length);
				resY = parseInt(resX / 1.7777);
				res = resX +'x'+ resY;
				_result._teaserImages.push(_model.createTeaserImage(res, BASE_URL + imgURL));
			}else{						
				_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
			}
			// if(!$(element).find(SEARCH_ITEM_ELEMENT).hasClass(SEARCH_LIVE_ITEM)) {
			// 	// retrieving documentId for streamURL
			// 	var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
			// 		documentId = $(element).find('.boxPlaylistIcons>img').attr('class');
			// 		if (documentId !== undefined) {
			// 			documentId = documentId.replace(/\D/g,'');
			// 		// building result meta information
			// 		var _result = {};
			// 		_result._station = STATION;
			// 		_result._title = $(element).find(TITLE_ELEMENT).text();
			// 		_result._subtitle = $(element).find(SUBTITLE_ELEMENT).text();
			// 		_result._length = $(element).find(LENGTH_ELEMENT).text();
			// 		_result._airtime = $(element).find(DATE_ELEMENT).text();
			// 		imgURL = $(element).find(IMAGE_ELEMENT).attr('src');
			// 		_result._teaserImages = [];
			// 		_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
			// 		_result._streams = [];
			// 		// load details
			loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);

		});

	},

	/**
	 * Function to load all categories from "Das Erste Mediathek"
	 */
	// getCategories = function(_category, numResults) {
	// 	var origin = {
	// 		_channel: 'DasErste',
	// 		_method: 'getCategories',
	// 		_searchTerm: _category,
	// 		_badge: null
	// 	};
	// 	var find = CATEGORIES.filter(function (category) { return category._id == _category });
	// 	if (find.length > 0) {
	// 		var _broadcastUrl = PROXY_URL + encodeURI(find[0]._url);
	// 		$.ajax({
	// 			url: _broadcastUrl,
	// 			type: 'GET',
	// 			cache: false,
	// 			success: function(data) {
	// 				onDASERSTEGetCategories(origin, data, numResults)
	// 			}
	// 		});
	// 	} else {
	// 		console.error("Mediathek-Crawler", "|", "DasErsteController", "|", "Kategorie nicht verfügbar:", "'" + _category + "'");
	// 	}
	// },

	/**
	 * Callback function for loading categories of Das Erste Mediathek
	 * @param {String}		HTML data of the category page
	 * @param {String}		current category
	 */
	// onDASERSTEGetCategories = function(origin, data, numResults) {
	// 	$(data).find('#layer_themen2 .jsScroll').find('li').each(function(index, element) {
	// 		loadDASERSTECategory(origin, BASE_URL + $(element).find('a').attr('href'), numResults);
	// 	});
	// },

	/**
	 * Function to load a category from "Das Erste Mediathek"
	 * @param {String}		the url of the category
	 */
	// loadDASERSTECategory = function(origin, url, numResults) {
	// 	var _broadcastUrl = PROXY_URL + encodeURI(url);
	// 	$.ajax({
	// 		url: _broadcastUrl,
	// 		type: 'GET',
	// 		cache: false,
	// 		success: function(data) {
	// 			onGetDASERSTECategory(origin, data, numResults);
	// 		}
	// 	});
	// },

	/**
	 * Callback function for async loading of category results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	// onGetDASERSTECategory = function(origin, data, numResults) {
	// 	$(data).find(CATEGORIES_WRAPPER_ELEMENT).find(SEARCH_ITEM_WRAPPER).each(function (index, element) {
	// 		if (index < numResults) {
	// 			if(!$(element).find(SEARCH_ITEM_ELEMENT).hasClass(SEARCH_LIVE_ITEM)) {
	// 				// retrieving documentId for streamURL
	// 				var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
	// 					documentId = $(element).find('.boxPlaylistIcons>img').attr('class'),
	// 					documentId = documentId.replace(/\D/g,'');

	// 				// building result meta information
	// 				var _result = {};
	// 					_result._station = STATION;
	// 					_result._title = $(element).find(TITLE_ELEMENT).text();
	// 					_result._subtitle = $(element).find(SUBTITLE_ELEMENT).text();
	// 					_result._length = $(element).find(LENGTH_ELEMENT).text();
	// 					_result._airtime = $(element).find(DATE_ELEMENT).text();
	// 					imgURL = $(element).find(IMAGE_ELEMENT).attr('src');
	// 					_result._teaserImages = [];
	// 					_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL));
	// 					_result._streams = [];

	// 				// load details
	// 				loadDASERSTEDetails(origin, documentId, _result, BASE_URL + documentUrl);
	// 			} else {
	// 				// LIVESTREAM
	// 			}
	// 		} else {
	// 			return;
	// 		}
	// 	});
	// },


	/**
	 * Public function to reset the instance of DasErsteService
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
	// that.getCategories = getCategories;

	return that;
};