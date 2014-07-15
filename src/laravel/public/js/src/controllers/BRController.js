MediathekCrawler.BRController = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://mediathek.daserste.de',
	PROXY_URL = '/proxy.php?url=',

	// constants for searching
	SEARCH_URL = 'http://www.br.de/mediathek/video/suche/?query=',
	SEARCH_PARAM_SORT_RELEVANCE = '&sort=relevance',
	SEARCH_PARAM_SORT_DATE = '&sort=date',
	SEARCH_PARAM_ENTIRE_BROADCAST = '&entireBroadcast=true',
	SEARCH_PARAM_SUBTITLES = '&subtitles=true',
	SEARCH_PARAM_PERIOD_TODAY = '&period=today',
	SEARCH_PARAM_PERIOD_YESTERDAY = '&period=yesterday',
	SEARCH_PARAM_PERIOD_WEEK = '&period=week',
	SEARCH_PARAM_PERIOD_MONTH = '&period=month',
	SEARCH_PARAM_DATE_FROM = '&dateFrom=',		// dateFormat: 01.07.2014
	SEARCH_PARAM_DATE_UNTIL = '&dateUntil=',	// dateFormat: 01.07.2014



	_model = null,

	/**
	 * Public function to initialize the instance of DasErsteController
	 */
	init = function(model) {
		console.log("MediathekCrawler.BRController.init");
		_model = model;
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
			success: function(data) {
				onSearchString(data);
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		HTML response of ajax call
	 */
	onSearchString = function(data) {
		$(data).find(SEARCH_WRAPPER_ELEMENT).find(SEARCH_ITEM_WRAPPER).each(function (index, element) {
			if(!$(element).find(SEARCH_ITEM_ELEMENT).hasClass(SEARCH_LIVE_ITEM)) {
				// retrieving documentId for streamURL
				var documentUrl = $(element).find(SEARCH_ITEM_ELEMENT).attr('href'),
					documentId = $(element).find('.boxPlaylistIcons img').attr('class'),
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
		});
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;

	return that;
};