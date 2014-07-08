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
	
	
	init = function() {
		//init ZDFController
		console.log("ZDFController init");
	},

	searchString = function(searchStr) {
		// build restful URL for search in ARD
		var searchUrl = ARD_SEARCH_URL + searchStr;

		// send http request to URL
		var searchXmlHttp = new XMLHttpRequest();
		searchXmlHttp.open('GET', '/proxy.php?url=' + encodeURI(searchUrl), false);
		searchXmlHttp.send(null);
		var searchXmlResponse = searchXmlHttp.responseText;

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
					var $textWrapper = $(element).find('div.textWrapper'),
					title = $textWrapper.find('h4.headline').text(),
					subtitle = $textWrapper.find('p.subtitle').text(),

					// send http request for documentId
					broadcastXmlHttp = new XMLHttpRequest();
					broadcastXmlHttp.open('GET', '/proxy.php?url=' + encodeURI(broadcastUrl), false);
					broadcastXmlHttp.send(null);

					// parse JSON response
					var broadcastXmlResponse = JSON.parse(broadcastXmlHttp.responseText);
					var imageUrl = BASE_URL + broadcastXmlResponse._previewImage;
					var streamUrl = broadcastXmlResponse._mediaArray;
					for (var i=0; i<streamUrl.length; i++) {
						// search for plugin 1 ==> http
						if (streamUrl[i]._plugin == 1) {
							// get video url for best quality
							streamUrl = streamUrl[i]._mediaStreamArray[streamUrl[i]._mediaStreamArray.length-1]._stream;
						}
					}

					/*$('#result-wrapper').append('<div class="col-xs-6">' +
						'<img src="'+ imageUrl + '">' +
						'<video class="video-js vjs-default-skin" width="400" height="225" controls>' +
						'<source src="' + streamUrl + '" type="video/mp4">' +
						'</video>' +
						'<div>' + title + '</div>' +
						'<div>' + subtitle + '</div>' +
						'</div>');*/
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