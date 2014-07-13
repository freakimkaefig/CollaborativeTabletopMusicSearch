MediathekCrawler.ResultView = (function() {
	var that = {},

	$resultWrapper = null,

	init = function() {
		console.log('MediathekCrawler.ResultView.init');
		
		$resultWrapper = $('#result-wrapper');
	},

	appendResult = function(event, result) {
		console.log(result);
		var resultElement = '<div class="item col-xs-6 col-md-3">' +
			// TODO: desicion process for teaserImage missing!
			'<img src=' + result._teaserImages[0]._url + ' class"img-responsive">' + 
			/*'<video class="video-js vjs-default-skin" controls preload="auto" width="400" height="244">' +
			'<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '">' +
			'</video>' + */
			'<div>' + result._title + '</div>' +
			'<div>' + result._details + '</div>' +
			'<div><span>' + result._airtime + '</span> | <span>' + result._length + '</span> | <span>' + result._station + '</span></div>' +
			'</div>';

		$resultWrapper.append(resultElement);
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.appendResult = appendResult;

	return that;
});