MediathekCrawler.WDRService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://www1.wdr.de',
	PROXY_URL = '/proxy.php?url=',

	SEARCH_URL = 'http://www1.wdr.de/mediathek/video/suche/videosuche106.jsp?q=',

	_model = null,

	/**
	 * Public function to initialize the instance of BRService
	 */
	init = function(model) {
		console.info('MediathekCrawler.WDRService.init');
		_model = model;
	},


	/**
	 * Public function to search with given string, type and numResults
	 * @param {String}		string to search
	 * @param {Integer}		maximum number of results
	 */
	searchString = function(searchString) {
		// var _url = PROXY_URL + encodeURI(SEARCH_URL + searchString);
		var _url = PROXY_URL + encodeURI(BASE_URL + '/mediathek/video/sendungen/abenteuer_erde/videoabenteuererdederbergderhaie100-videoplayer_size-L.html');

		$.ajax({
			url: _url,
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
		console.log(data);
		// $(data).find(SEARCH_WRAPPER_ELEMENT).find(SEARCH_ITEM_WRAPPER).each(function (index, element) {
			
		// });
	},


	/**
	 * Public function to reset the instance of BRService
	 */
	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;

	return that;
};