MediathekCrawler.DasErsteService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://mediathek.daserste.de',
	PROXY_URL = '/proxy.php?url=',

	// constants for searching
	SEARCH_URL = 'http://mediathek.daserste.de/suche?s=',
	SEARCH_PARAM_SORT_RELEVANCE = '&reiter=1',
	SEARCH_PARAM_SORT_DATE = '&reiter=2',
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
		switch (type) {
			case 0: 	// search by relevance
				searchStringByRelevance(searchStr);
				break;

			case 1: 	// search by date
				searchStringByDate(searchStr);
				break;
		}
	},

	/**
	 * Private function to search with given string sorted by relevance
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchStringByRelevance = function(searchStr) {
		// build restful URL for search in Das Erste
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_RELEVANCE);

		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: onSearchString
		});
	},

	/**
	 * Private function to search with given string sorted by date
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchStringByDate = function(searchStr) {
		// TODO: searching by date not working correctly
		// 		- second tab on mediathek page is loaded by ajax --> ajax isn't ready when php queries the page

		// build restful URL for search in Das Erste
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_DATE);
		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: onSearchString
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onSearchString = function(data) {
		$(data).find(SEARCH_WRAPPER_ELEMENT).find(SEARCH_ITEM_WRAPPER).each(function (index, element) {
			if(!$(element).find(SEARCH_ITEM_ELEMENT).hasClass(SEARCH_LIVE_ITEM)) {
				// retrieving documentId for streamURL
				var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
					documentId = $(element).find('.boxPlaylistIcons>img').attr('class');
					if (documentId !== undefined) {
						documentId = documentId.replace(/\D/g,'');
					// building result meta information
					var _result = {}
						_result._station = STATION,
						_result._title = $(element).find(TITLE_ELEMENT).text(),
						_result._subtitle = $(element).find(SUBTITLE_ELEMENT).text(),
						_result._length = $(element).find(LENGTH_ELEMENT).text(),
						_result._airtime = $(element).find(DATE_ELEMENT).text(),
						imgURL = $(element).find(IMAGE_ELEMENT).attr('src'),
						_result._teaserImages = [],
						_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL)),
						_result._streams = [];

					// load details
					loadDetails(documentId, _result, BASE_URL + documentUrl);
				}
			} else {
				// LIVESTREAM
			}
		});
	},

	/**
	 * Private function for async loading of details for a search result
	 * @param {String}		url of the detail page
	 */
	loadDetails = function(documentId, result, detailURL) {
		var detailURL = PROXY_URL + encodeURI(detailURL);
		$.ajax({
			url: detailURL,
			type: 'GET',
			success: function(data) {
				onLoadDetails(documentId, result, data);
			}
		});
	},

	/** 
	 * Callback function for async loading of details for results
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing details and precise airtime)
	 * @param {HTML}				HTML markup of the retrieved detail page of the broadcast
	 */
	onLoadDetails = function(documentId, result, data) {
		var _result = result;
			_result._details = $(data).find(DETAIL_ELEMENT).text(),
			_result._airtime = $(data).find(AIRTIME_DATE_ELEMENT).text().split(' ')[1] + ' ' + $(data).find(AIRTIME_TIME_ELEMENT).text().split(' ')[0];

		// load streams for result
		loadStreams(documentId, _result);
	},

	/**
	 * Private function for async loading of streams for a search result
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 */
	loadStreams = function(documentId, result) {
		var streamURL = PROXY_URL + encodeURI(STREAM_URL + documentId);
		$.ajax({
			url: streamURL,
			type: 'GET',
			success: function(data) {
				onLoadStreams(documentId, result, data);
			}
		});
	},

	/**
	 * Callback function for async loading of streams
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 * @param {JSON}				JSON response of stream loading
	 */
	onLoadStreams = function(documentId, result, data) {
		var data = JSON.parse(data);
		result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[3].resolution, BASE_URL + data._previewImage));

		for (var i=0; i<data._mediaArray.length; i++) {	//left out to reduce overhead
			for (var j=0; j<data._mediaArray[i]._mediaStreamArray.length; j++) {
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

				result._streams.push(_model.createStream(_basetype, _type, _quality, _url, _filesize));
			}
		}

		_model.addResults(result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
	},


	/**
	 * Public function to get most viewed videos
	 */
	getNew = function() {
		// build restful URL for search in Das Erste
		var _newUrl = PROXY_URL + encodeURI(BASE_URL);

		// send asynchronous xmphttp request
		$.ajax({
			url: _newUrl,
			type: 'GET',
			success: onGetNew
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onGetNew = function(data) {
		$(data).find(NEW_WRAPPER_ELEMENT).find(SEARCH_ITEM_WRAPPER).each(function (index, element) {
			if(!$(element).find(SEARCH_ITEM_ELEMENT).hasClass(SEARCH_LIVE_ITEM)) {
				// retrieving documentId for streamURL
				var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
					documentId = $(element).find('.boxPlaylistIcons>img').attr('class'),
					documentId = documentId.replace(/\D/g,'');

				// building result meta information
				var _result = {}
					_result._station = STATION,
					_result._title = $(element).find(TITLE_ELEMENT).text(),
					_result._subtitle = $(element).find(SUBTITLE_ELEMENT).text(),
					_result._length = $(element).find(LENGTH_ELEMENT).text(),
					_result._airtime = $(element).find(DATE_ELEMENT).text(),
					imgURL = $(element).find(IMAGE_ELEMENT).attr('src'),
					_result._teaserImages = [],
					_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL)),
					_result._streams = [];

				// load details for result
				loadDetails(documentId, _result, BASE_URL + documentUrl);
			}
		});
	},


	/**
	 * Function to load all categories from "Das Erste Mediathek"
	 */
	getCategories = function(_category, numResults) {
		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if (find.length > 0) {
			var _broadcastUrl = PROXY_URL + encodeURI(find[0]._url);
			$.ajax({
				url: _broadcastUrl,
				type: 'GET',
				success: function(data) {
					onGetCategories(data, numResults)
				}
			});
		} else {
			console.error("Mediathek-Crawler", "|", "DasErsteController", "|", "Kategorie nicht verfügbar:", "'" + _category + "'");
		}
	},

	/**
	 * Callback function for loading categories of Das Erste Mediathek
	 * @param {String}		HTML data of the category page
	 * @param {String}		current category
	 */
	onGetCategories = function(data, numResults) {
		$(data).find('#layer_themen2 .jsScroll').find('li').each(function(index, element) {
			loadCategory(BASE_URL + $(element).find('a').attr('href'), numResults);
		});
	},

	/**
	 * Function to load a category from "Das Erste Mediathek"
	 * @param {String}		the url of the category
	 */
	loadCategory = function(url, numResults) {
		var _broadcastUrl = PROXY_URL + encodeURI(url);
		$.ajax({
			url: _broadcastUrl,
			type: 'GET',
			success: function(data) {
				onGetCategory(data, numResults);
			}
		});
	},

	/**
	 * Callback function for async loading of category results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onGetCategory = function(data, numResults) {
		$(data).find(CATEGORIES_WRAPPER_ELEMENT).find(SEARCH_ITEM_WRAPPER).each(function (index, element) {
			if (index < numResults) {
				if(!$(element).find(SEARCH_ITEM_ELEMENT).hasClass(SEARCH_LIVE_ITEM)) {
					// retrieving documentId for streamURL
					var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
						documentId = $(element).find('.boxPlaylistIcons>img').attr('class'),
						documentId = documentId.replace(/\D/g,'');

					// building result meta information
					var _result = {}
						_result._station = STATION,
						_result._title = $(element).find(TITLE_ELEMENT).text(),
						_result._subtitle = $(element).find(SUBTITLE_ELEMENT).text(),
						_result._length = $(element).find(LENGTH_ELEMENT).text(),
						_result._airtime = $(element).find(DATE_ELEMENT).text(),
						imgURL = $(element).find(IMAGE_ELEMENT).attr('src'),
						_result._teaserImages = [],
						_result._teaserImages.push(_model.createTeaserImage(IMG_RESOLUTIONS[0].resolution, BASE_URL + imgURL)),
						_result._streams = [];

					// load details
					loadDetails(documentId, _result, BASE_URL + documentUrl);
				} else {
					// LIVESTREAM
				}
			} else {
				return;
			}
		});
	},


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
	that.getCategories = getCategories;

	return that;
};