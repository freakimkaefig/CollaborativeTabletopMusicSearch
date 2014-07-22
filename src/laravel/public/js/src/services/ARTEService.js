
			    //TODO:
			    // searchString
			    // hot
			    // new
			    // rubriken
			    // INFO
			    // CONCERT
			    // FUTURE?

MediathekCrawler.ARTEService = function() {

	var that = {},
	mediathekModel = null,
	xmlHttp = null,
	
	init = function(mModel) {
		//init ZDFService
		console.info("MediathekCrawler.ARTEService.init");
		mediathekModel = mModel;
	},

	searchString = function(searchString){



	},


	dispose = function() {
		that = {};
	};


	that.init = init;
	that.searchString = searchString;

	return that;

};