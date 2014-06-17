MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ===== VIEWS ===== */
	footerView = null,
	
	
	init = function() {
		console.log('MediathekCrawler.ApplicationController.init');
	    //MediathekCrawler.Model.init();
	    footerView = MediathekCrawler.FooterView();
		footerView.init();
	};
	

	that.init = init;

	return that;

};
