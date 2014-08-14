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
	ARTEMAXRESULTS = 15,
	// requesting more than 1 result page (SRF) leads to the same
	// received data -> duplicate entries!
	SRFMAXPAGESTOCRAWL = 1,

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

		searchView = MediathekCrawler.SearchView();
		searchView.init();
		// check if $_POST data is available
		_analyzeRoute();
	},

	onResultReceived = function(event, result) {
		if (document.URL.indexOf("/suche") > -1) {
			$(document).ajaxStop(function(event, request, settings){
				resultView.appendResult(event, result);
			});
		}
		else{
			resultView.appendResult(event, result);
		}
		
				
	},

	_analyzeRoute = function() {
		if (document.URL === "http://mediathek-crawler/") {
			_getNew();
			_getHot();
		}
		if(document.URL.indexOf('/new') > -1){
			_getNew();
		}
		if(document.URL.indexOf('/hot') > -1){
			_getHot();
		}
		if(document.URL.indexOf('/channel') > -1){
			if(document.URL.indexOf('/channel/ZDF') > -1){
				ZDFService.getNew(ZDFMAXRESULTS);
				ZDFService.getHot(ZDFMAXRESULTS);

				// first param = maxResults (<= 50!!)
				// ZDFService.getZDFVideosByDate(50,  '2013-08-09', '2013-08-14');
			}
			if(document.URL.indexOf('/channel/ARTE') > -1){
				ARTEService.getNew(ARTEMAXRESULTS, null, null);
				ARTEService.getHot(ARTEMAXRESULTS);

				// first param: maxResults (<=200!!!)
				// ARTEService.getVideosByDate(200, '2014-08-10', '2014-08-15');
			}
			if(document.URL.indexOf('/channel/DasErste') > -1){
				DasErsteService.getNew();
				DasErsteService.getHot();

				// first param: useless at the moment!
				// DasErsteService.getDasErsteVideosByDate(10, '2014-08-13', '2014-08-13');
			}
			if(document.URL.indexOf('/channel/SRF') > -1){
				SRFService.getNew();
				SRFService.getHot();
			}

		}
		if (document.URL.indexOf("/suche") > -1) {
			// var nachrichten = $('input[name="nachrichten"]').attr('checked');
			// if (nachrichten) {
			// 	_getCategory('nachrichten');
			// }

			var searchString = $('input[name="search"]').val();

			if (searchString !== '' && searchString !== undefined) {
				_search(searchString);
				$('#submit').on('click',_filterSeach);

			} else {
				//_getNew();
				$('#submit').on('click',_filterSeach);
			}
			

		}
		if (document.URL.indexOf('/video') > -1) {
			if (document.URL.indexOf('/video/bookmark') > -1) {
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
	_filterSeach = function(e) {
		//e.preventDefault();
		mediathekModel.clearResults();
		$("#result-wrapper").empty();
		var channels = searchView.getSelectedChannels();
		var categories = searchView.getSelectedCategories();
		var searchString = $('input[name="search"]').val();
		var startDate = searchView.getDateFrom();
		var endDate = searchView.getDateTo();
		if(channels.length > 0){	
			channels.forEach(function(c){
				var channel = c;

				// Channel-category-search
				if(categories.length > 0){
					categories.forEach(function(category){
						if(channel == "arte"){
							ARTEService.getCategories(category);
						}
						if(channel == "zdf"){
							ZDFService.getCategories(category,1);
						}
					})
				}
				// Channel-String search
				else if(searchString !== '' && searchString !== undefined){
					if(channel == "arte"){
						ARTEService.searchString(searchString, ARTEMAXRESULTS);
					}
					if(channel == "zdf"){
						ZDFService.searchString(searchString, ZDFMAXRESULTS);
					}
					if(channel == "daserste"){
						DasErsteService.searchString(searchString, 0);
					}
				}
				// cahnnel-string search
				else if(startDate != ""){
					if(channel == "zdf"){
						ZDFService.getZDFVideosByDate(50, startDate, endDate);
					}
					if(channel == "arte"){
						ARTEService.getVideosByDate(200,  startDate, endDate);
					
					}
					if(channel == "daserste"){
						DasErsteService.getDasErsteVideosByDate(50,  startDate, endDate);
							
					}
				}
				// Channel search
				else{
					if(channel == "arte"){
						ARTEService.getNew(5);
						ARTEService.getHot(5);
					}
					if(channel == "zdf"){
						ZDFService.getNew(6);
						ZDFService.getHot(6)
					}
					if(channel == "daserste"){
						DasErsteService.getNew();
						DasErsteService.getHot();
					}
				}

			})
		}
		// categpory search
		else if(categories.length > 0){
			categories.forEach(function(category){
				ARTEService.getCategories(category);
				ZDFService.getCategories(category,1);	
			})
		}
		// string search
		else if(searchString !== '' && searchString !== undefined) {
			_search(searchString);
		}
		// date search
		else if(startDate != "" || endDate != ""){
			console.log(startDate,endDate);
			ZDFService.getZDFVideosByDate(200, startDate, endDate);
			ARTEService.getVideosByDate(50,  startDate, endDate);
		}
	
		return;
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
		// console.log('MediathekCrawler.ApplicationController._getCategory', category);
		
		// since the relaunch of DasErste-Mediathek there are no 
		// categoriy-subpages or any other way to fetch them
		// DasErsteService.getCategories(category, 100);

		//param: maxLength of ZDF results (videos per show/series/broadcast)
		ZDFService.getCategories(category, 2);
		ARTEService.getCategories(category);
		// SRFService.getCategories(category);
	},

	_getNew = function() {
		DasErsteService.getNew();
		ZDFService.getNew(ZDFMAXRESULTS);
		ARTEService.getNew(ARTEMAXRESULTS, null, null);
		SRFService.getNew();
		//BRService blockiert; notImplemented!
		//BRService.getNew();
	},
	_getHot = function(){
		DasErsteService.getHot();
		ZDFService.getHot(ZDFMAXRESULTS);
		ARTEService.getHot(ARTEMAXRESULTS);
		SRFService.getHot();
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
