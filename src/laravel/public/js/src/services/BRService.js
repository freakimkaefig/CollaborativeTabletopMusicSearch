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

	// Vorab im Web
	// http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100.html?t=category&q=vorab-im-web

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
		var origin = {
			_channel: 'BR',
			_method: 'searchString',
			_searchTerm: searchStr,
			_badge: null
		};
		switch (type) {
			case 0: 	// search by relevance
				searchStringByRelevance(searchStr, origin);
				break;

			case 1: 	// search by date
				searchStringByDate(searchStr, origin);
				break;
		}
	},

	/**
	 * Private function to search with given string sorted by relevance
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchStringByRelevance = function(searchStr, origin) {
		// build restful URL for search in BR
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_RELEVANCE);
			// console.log('BR onLoadDetails searchStringByRelevance: ',searchStr, _searchUrl);

		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: function(data) {
				onSearchString(data, origin);
			}
		});
	},

	/**
	 * Private function to search with given string sorted by date
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchStringByDate = function(searchStr, origin) {
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_DATE);
		
		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: function(data) {
				onSearchString(data, origin);
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		HTML response of ajax call
	 */
	onSearchString = function(data, origin) {
		// console.log('NR onSearchString:', data);
		// $(data).find('.teaser standard').each(function(idx, el){
			$(data).find('.teaserInner').each(function (index, element) {

				var detailUrl = $(element).find('.link_video').attr('href');
				// console.log('BR onLoadDetails detailUrldetailUrl: ',detailUrl);
				if (detailUrl !== undefined) {
					loadDetails(detailUrl, origin);
				}
			});
		// });
	},

	/**
	 * Private function to load the broadcasts detail page
	 * @param {String}		url of the detail page
	 */
	loadDetails = function(url, origin) {
		var _url = PROXY_URL + encodeURI(BASE_URL + url);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {
				onLoadDetails(data, origin);
			}
		});
	},

	_fixLength = function(length){
		if(length.indexOf(' Min') > 0){
			length = length.replace(' Min.', '');
		}
		if(Number(length) > 60){
			var hours = String(parseInt(length / 60));
			if(Number(hours)<10){
				hours = '0'+String(hours);
			}
			var minutes = String(Number(length)-(Number(hours)*60));
			return hours+':'+minutes+':00';
		}
		if(Number(length)<=60){
			return '00:'+String(length)+':00';
		}

		return length;
	},

	/**
	 * Callback function for parsing broadcast detail pages for details and stream urls
	 * @param {String}		HTML data of the detail page
	 */
	onLoadDetails = function(data, origin) {
		var _onclick = $(data).find('#playerFrame .player .avPlayer figure .clearFix a').attr('onclick');
		if (_onclick !== undefined) {
			// url for xml file containing streams is placed in click event handler
			// searching for string between {dataURL:' and '}
			var matches = _onclick.match(/\{dataURL:'(.*?)\'}/);
			// console.log('BR onLoadDetails matches: ',matches);

			if (matches) {
			    var submatch = matches[1];

			    // build result with currently available details
			    var _result = {}
			    	_result._station = $(data).find('.bcastData ul.meta li.start span.welle').text(),
			    	_result._subtitle = $(data).find('.bcastData ul.title li.title').text(),
			    	_result._title = $(data).find('.bcastData header h3').text(),
			    	_result._length = $(data).find('.bcastData ul.meta li.duration time.duration').text(),
			    	_result._length = _fixLength(_result._length);
			    	_result._airtime = $(data).find('.bcastData ul.meta li.start time.start').text().replace(',', ''),
			    	_result._details = $(data).find('#bcastInfo .bcastContent p').text() + $(data).find('#bcastInfo .bcastContent div.cast').text(),
			    	_result._teaserImages = [],
			    	_result._teaserImages.push(_model.createTeaserImage('108x61', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-s'))),
			    	_result._teaserImages.push(_model.createTeaserImage('320x180', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-m'))),
			    	_result._teaserImages.push(_model.createTeaserImage('400x255', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-l'))),
			    	_result._teaserImages.push(_model.createTeaserImage('640x360', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-xl'))),
			    	_result._streams = [];

			    // load stream urls and metadata from xml file

			// console.log('BR onLoadDetails _result: ',_result);
			    loadStreams(_result, submatch, origin);
			}
		}
	},

	/**
	 * Private function to load the xml file containing the stream url for a broadcast
	 * @param {object}		the current result object
	 * @param {String}		url of the xml page
	 */
	loadStreams = function(result, url, origin) {
		var _url = PROXY_URL + encodeURI(BASE_URL + url);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {
				onLoadStreams(result, data, origin);
			}
		});
	},

	/**
	 * Callback function to parse the xml file for streams and their metadata
	 * @param {object}		the current result object
	 * @param {String}		XML data containing stream urls, qualities, sizes etc
	 */
	onLoadStreams = function(result, data, origin) {
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

			// console.log('BR onLoadStreams result._streams: ',result._streams);
		// add result to model
		_model.addResults(origin, result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
	},


	/**
	 * Public function to get most viewed videos
	 */
	getBRNew = function() {
		throw new NotImplementedException();
	},


	/**
	 * Function to load all categories from "Das Erste Mediathek"
	 */
	getBRCategories = function(_category) {
		throw new NotImplementedException();
	},

	/**
	 * Public function to get hot videos
	 */
	getBRHot = function() {
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
	that.getBRNew = getBRNew;
	that.getBRCategories = getBRCategories;
	that.getBRHot = getBRHot;

	return that;
};