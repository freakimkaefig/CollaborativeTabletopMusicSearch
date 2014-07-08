MediathekCrawler.ResultView = (function() {
	var that = {},

	$resultWrapper = null,

	init = function() {
		console.log('MediathekCrawler.ResultView.init');
		
		$resultWrapper = $('#result-wrapper');
	},
	
	dispose = function() {
		that = {};
	},

	appendResult = function(event, result) {
		for (var i=0; i<result._streams.length; i++) {
			if (result._streams[i]._type == 'video/mp4') {
				var resultElement = '<div class="col-xs-6">' +
				'<video class="video-js vjs-default-skin" controls preload="auto" width="400" height="244">' +
			 	'<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '">' +
				'</video>' +
				'<div>' + result._title + '</div>' +
				'<div><span>' + result._airtime + '</span> | <span>' + result._length + '</span> | <span>' + result._station + '</span></div>' +
				'</div>';

				$resultWrapper.append(resultElement);
				break;
			}
		}
	};


	that.init = init;
	that.dispose = dispose;
	that.appendResult = appendResult;

	return that;
});