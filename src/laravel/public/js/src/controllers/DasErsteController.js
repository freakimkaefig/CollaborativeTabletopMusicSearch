MediathekCrawler.DasErsteController = function() {

	var that = {},

	BASE_URL = 'http://mediathek.daserste.de',
	SEARCH_URL = 'http://mediathek.daserste.de/suche?s=',
	SEARCH_PARAM_SORT_RELEVANCE = '&reiter=1',
	SEARCH_PARAM_SORT_DATE = '&reiter=2',
	SEARCH_PARAM_PAGE = '&goto=',
	STREAM_URL = 'http://www.ardmediathek.de/play/media/',
	STREAM_PARAMS = '?deviceType=pc&features=flash',
	SEARCH_WRAPPER_ELEMENT = 'div#resultstab_1',
	NEW_WRAPPER_ELEMENT = 'div#tab_1',

	// http://www.ardmediathek.de/play/media/22241338

	// TEMP
	// Datumsuche: http://mediathek.daserste.de/suche?s=tatort&datumBis=13.07.14&datumVon=01.07.14&reiter=2

	IMG_RESOLUTIONS = [
		{ 'quality': 'xs', 'resolution': '128x72' },
		{ 'quality': 's', 'resolution': '256x144' },
		{ 'quality': 'm', 'resolution': '512x288' },
		{ 'quality': 'l', 'resolution': '967x544' },
	],

	QUALITIES = [
		{ 'quality': 0, 'resolution': '256x144' },
		{ 'quality': 1, 'resolution': '512x288' },
		{ 'quality': 2, 'resolution': '640x360' },
		{ 'quality': 3, 'resolution': '966x544' },
	],

	_model = null,

	init = function(model) {
		console.log("MediathekCrawler.DasErsteController.init");
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
	}

	/**
	 * Public function to get most viewed videos
	 */
	getNew = function() {
		// build restful URL for search in Das Erste
		var _searchUrl = '/proxy.php?url=' + encodeURI(BASE_URL);
		console.log("MediathekCrawler.DasErsteController.getMostViewed", _searchUrl);

		// send asynchronous xmphttp request
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: onGetNew
		});
	},

	/**
	 * Private function to search with given string sorted by relevance
	 * @param {String} 	The given keyword(s) to search for
	 */
	searchStringByRelevance = function(searchStr) {
		// build restful URL for search in Das Erste
		var _searchUrl = '/proxy.php?url=' + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_RELEVANCE);

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
		// build restful URL for search in Das Erste
		var _searchUrl = '/proxy.php?url=' + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_DATE);
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
	 * Private function for async loading of streams for a search result
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 */
	loadStreams = function(documentId, result) {
		var streamURL = '/proxy.php?url=' + encodeURI(STREAM_URL + documentId);
		$.ajax({
			url: streamURL,
			type: 'GET',
			success: function(data) {
				onLoadStreams(documentId, result, data);
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onSearchString = function(data) {
		$(data).find(SEARCH_WRAPPER_ELEMENT).find('li').each(function (index, element) {
			if(!$(element).find('a.clearfix').hasClass('boxNowPlaying')) {
				console.log(element);
				// retrieving documentId for streamURL
				var documentId = $(element).find('a.clearfix').attr('href');
				documentId = documentId.split('/')[2];
				documentId = documentId.split('_')[0];

				// building result meta information
				var _result = {}
					_result._station = 'Das Erste',
					_result._title = $(element).find('span.boxTitle').text(),
					_result._details = $(element).find('span.boxDescription').text(),
					_result._length = $(element).find('span.boxDuration').text(),
					_result._airtime = $(element).find('span.boxDate').text(),
					imgURL = $(element).find('span.boxImgContainer img').attr('src'),
					_result._teaserImages = [],
					_result._teaserImages.push(_model.createTeaserImage('128x72', BASE_URL + imgURL)),
					_result._streams = [];

				// load streams for result
				loadStreams(documentId, _result);
			} else {
				// LIVESTREAM
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		xmlhttp response of ajax call
	 */
	onGetNew = function(data) {
		$(data).find(NEW_WRAPPER_ELEMENT).find('li').each(function (index, element) {
			if(!$(element).find('a.clearfix').hasClass('boxNowPlaying')) {
				// console.log(element);
				// retrieving documentId for streamURL
				var documentId = $(element).find('a.clearfix').attr('href');
				documentId = documentId.split('/')[3];
				documentId = documentId.split('_')[0];

				// building result meta information
				var _result = {}
					_result._station = 'Das Erste',
					_result._title = $(element).find('span.boxTitle').text(),
					_result._details = $(element).find('span.boxDescription').text(),
					_result._length = $(element).find('span.boxDuration').text(),
					_result._airtime = $(element).find('span.boxDate').text(),
					imgURL = $(element).find('span.boxImgContainer img').attr('src'),
					_result._teaserImages = [],
					_result._teaserImages.push(_model.createTeaserImage('128x72', BASE_URL + imgURL)),
					_result._streams = [];

				// load streams for result
				loadStreams(documentId, _result);
			} else {
				// LIVESTREAM
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
		data = JSON.parse(data);
		result._teaserImages.push(_model.createTeaserImage('960x540', BASE_URL + data._previewImage));

		// for (var i=0; i<data._mediaArray.length; i++) {
		var i = 1;	// only add videos of type mp4
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
		// }

		_model.addResults(result._station, result._title, result._details, result._length, result._airtime, result._teaserImages, result._streams);
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;
	that.getNew = getNew;

	return that;
};