MediathekCrawler.ARDController = function() {

	var that = {},
	BASE_URL = 'http://www.ardmediathek.de';
	ARD_SEARCH_URL = 'http://www.ardmediathek.de/tv/suche?searchText=',
	ARD_STREAM_URL = 'http://www.ardmediathek.de/play/media/',
	ARD_STREAM_PARAMS = '?deviceType=pc&features=flash',
	WRAPPER_ELEMENT = 'div.teaser',
	VIDEO_CLASS = 'div.media.mediaA',
	LINK_CLASS = 'a.mediaLink',
	STREAM_PLUGIN = 1,

	QUALITIES = [
		{ 'quality': 0, 'resolution': '256x144' },
		{ 'quality': 1, 'resolution': '512x288' },
		{ 'quality': 2, 'resolution': '640x360' },
		{ 'quality': 3, 'resolution': '966x544' },
	],

	_model = null,
	
	
	init = function(model) {
		//init ZDFController
		console.log("ZDFController init");
		_model = model;
	},

	searchString = function(searchStr) {
		// build restful URL for search in ARD
		var _searchUrl = ARD_SEARCH_URL + searchStr;

		// send http request to URL
		var _searchXmlHttp = new XMLHttpRequest();
		_searchXmlHttp.open('GET', '/proxy.php?url=' + encodeURI(_searchUrl), false);
		_searchXmlHttp.send(null);
		var searchXmlResponse = _searchXmlHttp.responseText;

		// find all divs with the class 'teaser'
		$(searchXmlResponse).find(WRAPPER_ELEMENT).each(function(index, element) {
			// check if element has child with class 'media' and 'mediaA'
			if($(element).find(VIDEO_CLASS).length > 0) {
				// get 'documentId' of video
				var broadcastUrlParams = _parseQueryString($(element).find(VIDEO_CLASS).find(LINK_CLASS).attr('href'));
				// build URL for documentId
				var broadcastUrl = ARD_STREAM_URL + broadcastUrlParams.documentId;
				
				// check if broadcast URL is not undefined
				if (broadcastUrl !== undefined) {
					// find div with class 'textwrapper' for information about the broadcast
					

					// send http request for documentId
					_broadcastXmlHttp = new XMLHttpRequest();
					_broadcastXmlHttp.open('GET', '/proxy.php?url=' + encodeURI(broadcastUrl), false);
					_broadcastXmlHttp.send(null);

					// parse JSON response to access stream urls
					var _broadcastXmlResponse = JSON.parse(_broadcastXmlHttp.responseText),
						_streamUrl = _broadcastXmlResponse._mediaArray,

						// find container for details
						$textWrapper = $(element).find('div.textWrapper'),
						_station = $textWrapper.find('p.subtitle').text().split(' | ')[2],
						_title = $textWrapper.find('h4.headline').text(),
						_details = $textWrapper.find('p.teasertext').text(),
						_length = $textWrapper.find('p.subtitle').text().split(' | ')[1],
						_airtime = $textWrapper.find('p.subtitle').text().split(' | ')[0],
						
						// get teaser image
						_teaserImage_resolution = null,		// TODO: resolution missing!
						_teaserImage_url = BASE_URL + _broadcastXmlResponse._previewImage,
						_teaserImages = [_model.createTeaserImage(_teaserImage_resolution, _teaserImage_url)],
						_streams = [];
					
					// iterate over available streams
					for (var i=0; i<_streamUrl.length; i++) {
						// search for plugin 1 ==> http
						if (_streamUrl[i]._plugin == STREAM_PLUGIN) {
							// get video urls for different qualities
							for (var j=0; j<_streamUrl[i]._mediaStreamArray.length; j++) {
								// build array of available streams for broadcast
								var _url = _streamUrl[i]._mediaStreamArray[j]._stream,
									_basetype = null,	// TODO: basetype missing!
									_type = _broadcastXmlResponse._type + '/' + _url.slice(-3),
									_quality = _streamUrl[i]._mediaStreamArray[j]._quality,
									_filesize = null;	// TODO: filesize missing!

								_streams.push(_model.createStream(_basetype, _type, _quality, _url, _filesize));
							}
						}
					}

					// push result to model
					_model.addResults(_station, _title, _details, length, _airtime, _teaserImages, _streams);
				}
			}
		});
	},

	_parseQueryString = function( queryString ) {
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
	};

	that.init = init;
	that.searchString = searchString;

	return that;

};