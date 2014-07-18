MediathekCrawler.BRService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://www.br.de',
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
	SEARCH_WRAPPER_ELEMENT = '#teaserBundleSearch',
	SEARCH_ITEM_WRAPPER = 'article.teaser',
	SEARCH_ITEM_URL = 'a.link_video',

	// Most recommended broadcastst
	// http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100.html?t=social&q=mostRecommended

	// Best rated
	// http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100.html?t=social&q=bestRated

	// Most viewed broadcasts
	// http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100.html?t=social&q=mostViewed

	// Tipps der Redaktion
	// http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100.html?t=tags&q=Mediathek-Tagestipp

	// Trailer
	// http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100.html?t=category&q=trailer

	// Web-Exklusiv
	// http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100.html?t=category&q=web-exklusiv

	_model = null,

	/**
	 * Public function to initialize the instance of BRService
	 */
	init = function(model) {
		console.info('MediathekCrawler.BRService.init');
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
		// build restful URL for search in BR
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
			var detailUrl = $(element).find(SEARCH_ITEM_URL).attr('href');
			if (detailUrl !== undefined) {
				loadDetails(detailUrl);
			}
		});
	},

	/**
	 * Private function to load the broadcasts detail page
	 * @param {String}		url of the detail page
	 */
	loadDetails = function(url) {
		var _url = PROXY_URL + encodeURI(BASE_URL + url);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {
				onLoadDetails(data);
			}
		});
	},

	/**
	 * Callback function for parsing broadcast detail pages for details and stream urls
	 * @param {String}		HTML data of the detail page
	 */
	onLoadDetails = function(data) {
		var _onclick = $(data).find('#playerFrame .player .avPlayer figure .clearFix a').attr('onclick');
		if (_onclick !== undefined) {
			// url for xml file containing streams is placed in click event handler
			// searching for string between {dataURL:' and '}
			var matches = _onclick.match(/\{dataURL:'(.*?)\'}/);

			if (matches) {
			    var submatch = matches[1];

			    // build result with currently available details
			    var _result = {}
			    	_result._station = $(data).find('.bcastData ul.meta li.start span.welle').text(),
			    	_result._title = $(data).find('.bcastData ul.title li.title').text(),
			    	_result._subtitle = '',
			    	_result._length = $(data).find('.bcastData ul.meta li.duration time.duration').text(),
			    	_result._airtime = $(data).find('.bcastData ul.meta li.start time.start').text().replace(',', ''),
			    	_result._details = $(data).find('#bcastInfo .bcastContent p').text() + $(data).find('#bcastInfo .bcastContent div.cast').text(),
			    	_result._teaserImages = [],
			    	_result._teaserImages.push(_model.createTeaserImage('108x61', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-s'))),
			    	_result._teaserImages.push(_model.createTeaserImage('320x180', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-m'))),
			    	_result._teaserImages.push(_model.createTeaserImage('400x255', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-l'))),
			    	_result._teaserImages.push(_model.createTeaserImage('640x360', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-xl'))),
			    	_result._streams = [];

			    // load stream urls and metadata from xml file
			    loadStreams(_result, submatch);
			}
		}
	},

	/**
	 * Private function to load the xml file containing the stream url for a broadcast
	 * @param {object}		the current result object
	 * @param {String}		url of the xml page
	 */
	loadStreams = function(result, url) {
		var _url = PROXY_URL + encodeURI(BASE_URL + url);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {
				onLoadStreams(result, data);
			}
		});
	},

	/**
	 * Callback function to parse the xml file for streams and their metadata
	 * @param {object}		the current result object
	 * @param {String}		XML data containing stream urls, qualities, sizes etc
	 */
	onLoadStreams = function(result, data) {
		$(data).find('assets').find('asset').each(function (index, element) {
			if ($(element).attr('type') !== 'HDS') {
				var basetype = null,	// TODO: missing basetype!
					type = 'video/' + $(element).find('mediaType').text(),
					quality = $(element).attr('type'),
					url = $(element).find('downloadUrl').text(),
					filesize = $(element).find('size').text();

				// stream qualities represented as strings in BR Mediathek
				switch (quality) {
					case 'MOBILE':
						quality = 0;
						break;
					case 'MOBILES':
						quality = 0;
						break;
					case 'STANDARD':
						quality = 1;
						break;
					case 'LARGE':
						quality = 2;
						break;
					case 'PREMIUM':
						quality = 3;
						break;
				}

				result._streams.push(_model.createStream(basetype, type, quality, url, filesize));
			}
		});

		// add result to model
		_model.addResults(result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
	},


	/**
	 * Public function to get most viewed videos
	 */
	getNew = function() {
		throw new NotImplementedException();
	},


	/**
	 * Function to load all categories from "Das Erste Mediathek"
	 */
	getCategories = function(_category) {
		throw new NotImplementedException();
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
	that.getNew = getNew;
	that.getCategories = getCategories;

	return that;
};