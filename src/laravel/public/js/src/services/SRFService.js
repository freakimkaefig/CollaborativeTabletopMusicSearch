
			    //TODO:
			    // STringsuche
			    // Kategorien
			    // hot
			    // new
			    // filter

MediathekCrawler.SRFService = function() {

	var that = {},
	mediathekModel = null,
	PROXY_URL = '/proxy.php?url=',
	once = 0;
	
	init = function(mModel) {
		//init ZDFService
		console.info('MediathekCrawler.SRFService.init');
		mediathekModel = mModel;
	},

	
	dispose = function() {
		that = {};
	};


	that.init = init;

	return that;

};