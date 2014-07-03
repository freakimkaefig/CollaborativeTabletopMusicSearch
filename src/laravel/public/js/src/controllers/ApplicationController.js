MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ===== VIEWS ===== */
	footerView = null,
	
	
	init = function() {
		console.log('MediathekCrawler.ApplicationController.init');

	    //init Models
	    //MediathekCrawler.Model.init();

	    //init Controlers:
	    zdfController = MediathekCrawler.ZDFController();
	    zdfController.init();

	    //TestQuery
	    zdfController.searchString("tatort",100);

	    //init Views:
	    footerView = MediathekCrawler.FooterView();
		footerView.init();
	};
	

	that.init = init;

	return that;

};
