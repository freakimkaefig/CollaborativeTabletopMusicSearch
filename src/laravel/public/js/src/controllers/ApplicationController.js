MediathekCrawler.ApplicationController = function() {

	var that = {},

	/* ==== MEDIATHEK-MODEL ====*/
	mediathekModel = null,

	/* ===== MEDIATHEK-CONTROLLERS ===== */
	ARDService = null,
	DasErsteService = null,
	ZDFService = null,
	BRService = null,
	ARTEService = null,
	WDRService = null,
	SRFService = null,
	
	/* ===== VIEWS ===== */
	footerView = null,
	resultView = null,
	broadcastView = null,

	/* ===== CONTROLS ===== */
	ZDFMAXRESULTS = 10,
	ARTEMAXRESULTS = 10,
	SRFMAXPAGESTOCRAWL = 2,

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
	 	ARTEService = MediathekCrawler.ARTEService();
	 	ARTEService.init(mediathekModel);
	 	SRFService = MediathekCrawler.SRFService();
	 	SRFService.init(mediathekModel);
	 	WDRService = MediathekCrawler.WDRService();
	 	WDRService.init(mediathekModel);
	 	

		// init Views:
	    footerView = MediathekCrawler.FooterView();
		footerView.init();
		resultView = MediathekCrawler.ResultView();
		resultView.init();
		broadcastView = MediathekCrawler.BroadcastView();
		broadcastView.init();
		playlistView =  MediathekCrawler.PlaylistView();
		playlistView.init();
		bookmarkView =  MediathekCrawler.BookmarkView();
		bookmarkView.init();
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
			if (document.URL.indexOf('/video/bookmark') > -1) {
				console.log("ne merkliste");
				_getVideoBookmark();
			}
			else{	
				_getVideoById();
			}
		}
		if (document.URL.indexOf('/rubrik') > -1) {
			var url = document.URL.split('/'),
				category = url[url.length-1];
			_getCategory(category.toLowerCase());
		}
		if (document.URL.indexOf('/playlists/playlist') >-1){
			console.log("ich bin in einer palyliste");
		}
	},

	_search = function(searchString) {
		mediathekModel.clearResults();

		//ardController.searchString(searchString);
		DasErsteService.searchString(searchString, 0);
		ZDFService.searchString(searchString, ZDFMAXRESULTS);
		WDRService.searchString(searchString);
		ARTEService.searchString(searchString, ARTEMAXRESULTS);
		BRService.searchString(searchString, 0);
		SRFService.searchString(searchString, SRFMAXPAGESTOCRAWL);
	},

	_getCategory = function(category) {
		console.log('MediathekCrawler.ApplicationController._getCategory', category);
		DasErsteService.getCategories(category, 100);
		//param: maxLength of ZDF results (videos per show/series/broadcast)
		ZDFService.getCategories(category, 2);
		ARTEService.getCategories(category);
		// SRFService.getCategories(category);
	},

	_getNew = function() {
		DasErsteService.getNew();
		ZDFService.getNew(ZDFMAXRESULTS);
		// ARTEService.getNew(ARTEMAXRESULTS);
		SRFService.getNew();
		//BRService blockiert; notImplemented!
		BRService.getNew();
	},

	_getVideoById = function() {
		var _id = $('#video-id').val();
		broadcastView.renderVideoById(_id);
	},
	_getVideoBookmark = function(){
		var _id = $('#video-id').val();
		broadcastView.renderVideoBookmark(_id);
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
    
	return that;

};
