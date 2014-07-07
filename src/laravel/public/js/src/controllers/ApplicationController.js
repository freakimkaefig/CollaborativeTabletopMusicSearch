MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ===== VIEWS ===== */
	footerView = null,

	/* ===== MEDIATHEK-CONTROLLERS ===== */
	zdfController = null,
	

	init = function() {
		console.log('MediathekCrawler.ApplicationController.init');

	    //init Models
	    //MediathekCrawler.Model.init();

	    //init Mediathek-Controllers:
	    zdfController = MediathekCrawler.ZDFController();
	    zdfController.init();

	    //init Views:
	    footerView = MediathekCrawler.FooterView();
		footerView.init();

		analyzeRoute($('#search-string').val());
	},

	analyzeRoute = function(POST) {
		if (POST !== '') {
			search(POST);
		}
	},

	search = function(searchString) {
		zdfController.searchString(searchString, 100);
	};

	that.init = init;
    
	return that;

};
