MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ==== MEDIATHEK-MODEL ====*/
	mediathekModel = null,

	/* ===== MEDIATHEK-CONTROLLERS ===== */
	ardController = null,
	zdfController = null,
	
	/* ===== VIEWS ===== */
	footerView = null,
	resultView = null,

	init = function() {   
		console.log('MediathekCrawler.ApplicationController.init');

	    // init Models
	    mediathekModel = MediathekCrawler.MediathekModel();
	    mediathekModel.init();
	    $(mediathekModel).on('resultReceived', onResultReceived);

	    // init Mediathek-Controllers:
	    ardController = MediathekCrawler.ARDController();
	    ardController.init(mediathekModel);
		zdfController = MediathekCrawler.ZDFController();
	 	zdfController.init(mediathekModel);
	 	

		// init Views:
	    footerView = MediathekCrawler.FooterView();
		footerView.init();
		resultView = MediathekCrawler.ResultView();
		resultView.init();

		// check if $_POST data is available
		_analyzeRoute($('#search-string').val());
	},

	onResultReceived = function(event, result) {
		resultView.appendResult(event, result);
	},

	_analyzeRoute = function(POST) {
		if (POST !== '' && POST !== undefined) {
			_search(POST);
		}
	},

	_search = function(searchString) {
		ardController.searchString(searchString);
		zdfController.searchString(searchString, 100);
	};

	that.init = init;
    
	return that;

};
