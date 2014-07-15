MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ==== MEDIATHEK-MODEL ====*/
	mediathekModel = null,

	/* ===== MEDIATHEK-CONTROLLERS ===== */
	ardController = null,
	dasErsteController = null,
	zdfController = null,
	brController = null,
	
	/* ===== VIEWS ===== */
	footerView = null,
	resultView = null,
	broadcastView = null,

	init = function() {   
		console.log('MediathekCrawler.ApplicationController.init');

	    // init Models
	    mediathekModel = MediathekCrawler.MediathekModel();
	    mediathekModel.init();
	    $(mediathekModel).on('resultReceived', onResultReceived);

	    // init Mediathek-Controllers:
	    ardController = MediathekCrawler.ARDController();
	    ardController.init(mediathekModel);
	    dasErsteController = MediathekCrawler.DasErsteController();
	    dasErsteController.init(mediathekModel);
		zdfController = MediathekCrawler.ZDFController();
	 	zdfController.init(mediathekModel);
	 	brController = MediathekCrawler.BRController();
	 	brController.init();
	 	

		// init Views:
	    footerView = MediathekCrawler.FooterView();
		footerView.init();
		resultView = MediathekCrawler.ResultView();
		resultView.init();
		broadcastView = MediathekCrawler.BroadcastView();
		broadcastView.init();

		// check if $_POST data is available
		_analyzeRoute($('#search-string').val());
	},

	onResultReceived = function(event, result) {
		// console.log("RESULT", result);
		resultView.appendResult(event, result);
	},

	_analyzeRoute = function(POST) {
		if (POST !== '' && POST !== undefined) {
			_search(POST);
		} else {
			// console.log(document.URL);
			if (document.URL === "http://mediathek-crawler/") {
				_getNew();
			}
			if (document.URL === "http://mediathek-crawler/video") {
				_getVideoById();
			}
		}
	},

	_search = function(searchString) {
		mediathekModel.clearResults();

		//ardController.searchString(searchString);
		dasErsteController.searchString(searchString, 0);
		// zdfController.searchString(searchString, 100);
		// brController.searchString(searchString, 1);
	},

	_getNew = function() {
		dasErsteController.getNew();
		// dasErsteController.getCategories();	// produces lag
	},

	_getVideoById = function() {
		var _id = $('#video-id').val();
		broadcastView.renderVideoById(_id);
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
    
	return that;

};
