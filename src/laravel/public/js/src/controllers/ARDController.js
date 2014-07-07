MediathekCrawler.ARDController = function() {

	var that = {},
	ARD_SEARCH_URL = 'http://www.ardmediathek.de/tv/suche?searchText=',
	ARD_STREAM_URL = 'http://www.ardmediathek.de/play/media/',
	ARD_STREAM_PARAMS = '?deviceType=pc&features=flash',
	WRAPPER_ELEMENT = 'div.teaser',
	VIDEO_CLASS = 'div.media.mediaA',
	LINK_CLASS = 'a.mediaLink',
	
	
	init = function() {
		//init ZDFController
		console.log("ZDFController init");
	},

	searchString = function(searchStr) {
		var searchUrl = ARD_SEARCH_URL + searchStr;
		var searchXmlHttp = new XMLHttpRequest();
		searchXmlHttp.open('GET', '/proxy.php?url=' + encodeURI(searchUrl), false);
		searchXmlHttp.send(null);
		var searchXmlResponse = searchXmlHttp.responseText;
		$(searchXmlResponse).find(WRAPPER_ELEMENT).each(function(index, element) {
			if($(element).find(VIDEO_CLASS).length > 0) {
				var broadcastUrlParams = parseQueryString($(element).find(VIDEO_CLASS).find(LINK_CLASS).attr('href').split('?')[1]);
				var broadcastUrl = ARD_STREAM_URL + broadcastUrlParams.documentId;
				// console.log(element);
				if (broadcastUrl !== undefined) {
					var $textWrapper = $(element).find('div.textWrapper'),
					title = $textWrapper.find('h4.headline').text(),
					subtitle = $textWrapper.find('p.subtitle').text(),
					broadcastXmlHttp = new XMLHttpRequest();
					broadcastXmlHttp.open('GET', '/proxy.php?url=' + encodeURI(broadcastUrl), false);
					broadcastXmlHttp.send(null);
					var broadcastXmlResponse = JSON.parse(broadcastXmlHttp.responseText);
					var streamUrl = broadcastXmlResponse._mediaArray;
					// console.log(streamUrl);
					for (var i=0; i<streamUrl.length; i++) {
						if (streamUrl[i]._plugin == 1) {
							// console.log(index, streamUrl[i]._mediaStreamArray);
							streamUrl = streamUrl[i]._mediaStreamArray[3]._stream;
							/*for(var j=0; j<streamUrl[i]._mediaStreamArray; j++) {
								if (streamUrl[i]._mediaStreamArray[j]._quality == 3) {
									streamUrl = streamUrl[i]._mediaStreamArray[j]._stream;
									console.log(streamUrl);
								}
							}*/
						}
					}
					console.log(index, streamUrl);

					$('#result-wrapper').append('<div class="col-xs-6">' +
						'<video class="video-js vjs-default-skin" width="400" height="225" controls>'+
						'<source src="' + streamUrl + '" type="video/mp4">'+
						'</video>'+
						'<div>' + title + '</div>'+
						'<div>' + subtitle + '</div>'+
						'</div>');
				}
			}
		});
	},

	parseQueryString = function( queryString ) {
    	var params = {}, queries, temp, i, l;
 
	    // Split into key/value pairs
	    queries = queryString.split('&');
 
	    // Convert the array of strings into an object
	    for ( i = 0, l = queries.length; i < l; i++ ) {
	        temp = queries[i].split('=');
	        params[temp[0]] = temp[1];
	    }
	 
	    return params;
	};
	

	that.init = init,
	that.searchString = searchString;

	return that;

};