MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ==== MEDIATHEK-MODEL ====*/
	mediathekModel = null,

	/* ===== MEDIATHEK-CONTROLLERS ===== */
	ARDService = null,
	DasErsteService = null,
	ZDFService = null,
	BRService = null,
	
	/* ===== VIEWS ===== */
	footerView = null,
	resultView = null,
	broadcastView = null,

	init = function() {   
		console.info('MediathekCrawler.ApplicationController.init');

	    // init Models
	    mediathekModel = MediathekCrawler.MediathekModel();
	    mediathekModel.init();
	    $(mediathekModel).on('resultReceived', onResultReceived);

	    // init Mediathek-Controllers:
	    // ARDService = MediathekCrawler.ARDService();
	    // ARDService.init(mediathekModel);
	    DasErsteService = MediathekCrawler.DasErsteService();
	    DasErsteService.init(mediathekModel);
		ZDFService = MediathekCrawler.ZDFService();
	 	ZDFService.init(mediathekModel);
	 	BRService = MediathekCrawler.BRService();
	 	BRService.init(mediathekModel);
	 	

		// init Views:
	    footerView = MediathekCrawler.FooterView();
		footerView.init();
		resultView = MediathekCrawler.ResultView();
		resultView.init();
		broadcastView = MediathekCrawler.BroadcastView();
		broadcastView.init();

		// check if $_POST data is available
		_analyzeRoute();
	},

	onResultReceived = function(event, result) {
		// console.log("RESULT", result);
		resultView.appendResult(event, result);
	},

	_analyzeRoute = function() {
		if (document.URL === "http://mediathek-crawler/") {
			_getNew();
		}
		if (document.URL.indexOf("/suche") > -1) {
			// var nachrichten = $('input[name="nachrichten"]').attr('checked');
			// if (nachrichten) {
			// 	_getCategory('nachrichten');
			// }
			var searchString = $('input[name="search"]').val();
			if (searchString !== '' && searchString !== undefined) {
				_search(searchString);
			} else {
				_getNew();
			}
		}
		if (document.URL.indexOf('/video') > -1) {
			_getVideoById();
		}
		if (document.URL.indexOf('/rubrik') > -1) {
			var url = document.URL.split('/'),
				category = url[url.length-1];
			_getCategory(category.toLowerCase());
		}
	},

	_search = function(searchString) {
		mediathekModel.clearResults();

		//ardController.searchString(searchString);
		DasErsteService.searchString(searchString, 0);
		ZDFService.searchString(searchString, 100);
		BRService.searchString(searchString, 0);
	},

	_getCategory = function(category) {
		console.log('MediathekCrawler.ApplicationController._getCategory', category);
		DasErsteService.getCategories(category);
	},

	_getNew = function() {
		DasErsteService.getNew();
		ZDFService.searchNew(10);
		BRService.getNew();
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
