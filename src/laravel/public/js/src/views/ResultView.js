MediathekCrawler.ResultView = (function() {
	var that = {},

	$ = null,

	init = function() {
		console.log('MediathekCrawler.ResultView.init');
		
	},
	
	dispose = function() {
		that = {};
	},

	appendResult = function(event, result) {
		console.log("Result received", result);
	};


	that.init = init;
	that.dispose = dispose;
	that.appendResult = appendResult;

	return that;
});