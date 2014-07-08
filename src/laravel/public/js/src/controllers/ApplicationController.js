MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ===== VIEWS ===== */
	footerView = null,

	/* ===== MEDIATHEK-CONTROLLERS ===== */
	ardController = null,
	zdfController = null,
	
	/* ==== MEDIATHEK-MODEL ====*/
	mediathekModel = null,

	init = function() {   
		console.log('MediathekCrawler.ApplicationController.init');

	    // init Models
	    mediathekModel = MediathekCrawler.MediathekModel();
	    mediathekModel.init();

	    // init Mediathek-Controllers:
	    ardController = MediathekCrawler.ARDController();
	    ardController.init();
		zdfController = MediathekCrawler.ZDFController();
	 	zdfController.init(mediathekModel);
	 	

		// init Views:
	    footerView = MediathekCrawler.FooterView();
		footerView.init();

		// check if $_POST data is available
		analyzeRoute($('#search-string').val());
	},

	analyzeRoute = function(POST) {
		if (POST !== '') {
			search(POST);
		}
	},

	search = function(searchString) {
		ardController.searchString(searchString);
		zdfController.searchString(searchString, 100);
	};

	that.init = init;
    
	return that;

};
