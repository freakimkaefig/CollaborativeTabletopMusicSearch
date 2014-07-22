MediathekCrawler.WDRService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://www.ardmediathek.de',
	PROXY_URL = '/proxy.php?url=',

	// constants for searching
	// SEARCH_URL = 'http://www.ardmediathek.de/tv/suche?sort=date&deviceType=pc&features=flash&sender=sel&chanWDR&searchText=',
	SEARCH_URL = 'http://www.ardmediathek.de/tv/suche?searchText=',
	SEARCH_PARAMS = '&sender=sel&chanWDR',
	STREAM_URL = 'http://www.ardmediathek.de/play/media/',
	SEARCH_WRAPPER_ELEMENT = 'div.elementWrapper div.boxCon',
	WRAPPER_ELEMENT = 'div.teaser',
	VIDEO_CLASS = 'div.media.mediaA',
	LINK_CLASS = 'a.mediaLink',
	DETAIL_ELEMENT = 'div.textWrapper p.teasertext',
	STREAM_PLUGIN = 1,
	// http://www.ardmediathek.de/play/media/22342328

	// Available image formats in "DasErste Mediathek"
	IMG_RESOLUTIONS = [
		{ 'quality': 'xs', 'resolution': '128x72' },
		{ 'quality': 's', 'resolution': '256x144' },
		{ 'quality': 'm', 'resolution': '512x288' },
		{ 'quality': 'l', 'resolution': '960x540' },
	],

	// Available video formats in "ARD Mediathek"
	QUALITIES = [
		{ 'quality': 0, 'resolution': '256x144' },
		{ 'quality': 1, 'resolution': '512x288' },
		{ 'quality': 2, 'resolution': '640x360' },
		{ 'quality': 3, 'resolution': '966x544' },
	],

	_model = null,
	
	
	init = function(model) {
		//init ARDService
		console.info("MediathekCrawler.WDRService.init");
		_model = model;
	},

	searchString = function(searchStr) {
		// build restful URL for search in ARD
		var searchString = searchStr + '+';
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAMS);
		$.ajax({
			url: _searchUrl,
			type: 'POST',
			success: onSearchString
		});
	},

	onSearchString = function(data) {
		var pageHeadline = $(data).find('h1.pageHeadline').text().indexOf('TV-Videos und -Livestreams der ARD in der ARD Mediathek');
		if(pageHeadline === -1) {
			// find all divs with the class 'teaser'
			$(data).find(WRAPPER_ELEMENT).each(function (index, element) {
				// check if element has child with class 'media' and 'mediaA'
				if($(element).find(VIDEO_CLASS).length > 0) {
					// get 'documentId' of video
					var	documentUrl = $(element).find(VIDEO_CLASS).find(LINK_CLASS).attr('href'),
						broadcastUrlParams = _parseQueryString($(element).find(VIDEO_CLASS).find(LINK_CLASS).attr('href')),
						documentId = broadcastUrlParams.documentId;
					
					// find container for details
					var $textWrapper = $(element).find('div.textWrapper');
						_result = {};
					_result._station = $textWrapper.find('p.subtitle').text().split(' | ')[2];
					_result._title = $textWrapper.find('h4.headline').text();
					_result._subtitle = ''; //$textWrapper.find('p.teasertext').text();
					_result._length = $textWrapper.find('p.subtitle').text().split(' | ')[1];
					_result._airtime = $textWrapper.find('p.subtitle').text().split(' | ')[0];
					_result._teaserImages = [],
					// _result._teaserImages.push(_model.createTeaserImage('352x198', BASE_URL + $(element).find(VIDEO_CLASS).find(LINK_CLASS).find('img').attr('src')));
					_result._streams = [];

					// console.log(index, _result);
					loadDetails(documentId, _result, BASE_URL + documentUrl);
				}
			});
		} else {
			console.warn('ERROR; WDRService.onSearchString; AJAX-request did not recieve a response');
		}
	},

	loadDetails = function(documentId, result, detailURL) {
		var detailUrl = PROXY_URL + encodeURI(detailURL);
		$.ajax({
			url: detailUrl,
			type: 'GET',
			success: function(data) {
				onLoadDetails(documentId, result, data);
			}

		});
	},

	onLoadDetails = function(documentId, result, data) {
		var _result = result;
		_result._details = $(data).find(DETAIL_ELEMENT).text();

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

		for (var i=0; i<data._mediaArray.length; i++) {
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

	_parseQueryString = function(queryString) {
    	var params = {}, queries, temp, i, l;
 	
 		queryString = queryString.split('?')[1];

	    // Split into key/value pairs
	    queries = queryString.split('&');
 
	    // Convert the array of strings into an object
	    for (i = 0, l = queries.length; i < l; i++ ) {
	        temp = queries[i].split('=');
	        params[temp[0]] = temp[1];
	    }
	 
	    return params;
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;

	return that;

};