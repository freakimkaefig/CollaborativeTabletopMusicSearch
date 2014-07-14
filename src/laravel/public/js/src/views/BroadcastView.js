MediathekCrawler.BroadcastView = (function() {
	var that = {},

	$videoWrapper = null,
	$video = null,
	$infoWrapper = null,

	init = function() {
		console.log('MediathekCrawler.BroadcastView.init');
		
		$videoWrapper = $('#video-wrapper');
		$video = $('#video');
		$infoWrapper = $('#info-wrapper');
	},

	/**
	 * Public function to render a video by the given id from localStorage
	 * @param {Integer}		Id of the result item in localStorage
	 */
	renderVideoById = function(id) {
		var results_json = localStorage.getItem('mediathek-crawler'),
			results = JSON.parse(results_json);
			result = results._results[id];

		for (var i=result._streams.length-1; i>=0; i--) {
			var source = '<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '">'
			$video.append(source);
		}

		var infoElement = '<div>' + result._title + '</div>' +
			'<div>' + result._details + '</div>' +
			'<div><span>' + result._airtime + '</span> | <span>' + result._length + '</span> | <span>' + result._station + '</span></div>';
		$infoWrapper.append(infoElement);
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.renderVideoById = renderVideoById;

	return that;
});