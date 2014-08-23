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
	ORFService = null,
	SRFService = null,
	
	/* ===== VIEWS ===== */
	mainView = null,
	footerView = null,
	resultView = null,
	broadcastView = null,

	/* ===== CONTROLS ===== */
	ZDFMAXRESULTS = 20,
	ARTEMAXRESULTS = 20,
	// requesting more than 1 result page (SRF) leads to the same
	// received data -> duplicate entries!
	SRFMAXPAGESTOCRAWL = 1,

	init = function() {   
		console.info('MediathekCrawler.ApplicationController.init');

	    // init Models
	    mediathekModel = MediathekCrawler.MediathekModel();
	    mediathekModel.init();
	    if (document.URL === "http://mediathek-crawler/" || document.URL === "http://mediathek.lukaslamm.de/") {
			$(mediathekModel).on('resultReceived', onResultReceivedForSlider);
		}else{
	    	$(mediathekModel).on('resultReceived', onResultReceived);
		}

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
	 	ORFService = MediathekCrawler.ORFService();
	 	ORFService.init(mediathekModel);
	 	

		// init Views:
		mainView = MediathekCrawler.MainView();
		mainView.init();
	    footerView = MediathekCrawler.FooterView();
		footerView.init();
		feedbackView = MediathekCrawler.FeedbackView();
		feedbackView.init();

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
		$(broadcastView).on("feedback", onFeedback);
		$(playlistView).on("feedback", onFeedback);
		$(bookmarkView).on("feedback", onFeedback);

		$("#video").click(function(){
			console.log("videoclick");
		})
	},

	onResultReceived = function(event, result) {
		if (document.URL.indexOf("/suche") > -1) {
			if($("#duration-slider").slider("value") < 1){
				resultView.appendResult(event, result);
				// mediathekModel.clearResults();
			}
			else{
				$(document).ajaxStop(checkDuration(searchView.getSliderValue()));
			}
		}
		else{
			resultView.appendResult(event, result);
		}
		
				
	},
	onResultReceivedForSlider = function(event, result) {
		resultView.fillSlider(event, result);
	},
	onFeedback = function(event,feedback){
		console.log("feedback");
		feedbackView.showFeedback(feedback);
	},

	_analyzeRoute = function() {
		if (document.URL === "http://mediathek-crawler/" || document.URL === "http://mediathek.lukaslamm.de/") {
			// DasErsteService.getNew(1);	// liefert 12 Ergebnisse statt einem
			ZDFService.getNew(1);
			ARTEService.getNew(1);
			SRFService.getNew(1);
			BRService.getBRNew(1);
			ORFService.getNew(1);
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
			}
			if(document.URL.indexOf('/channel/ARTE') > -1){
				ARTEService.getNew(ARTEMAXRESULTS, null, null);
				ARTEService.getHot(ARTEMAXRESULTS);
			}
			if(document.URL.indexOf('/channel/DasErste') > -1){
				DasErsteService.getNew();
				DasErsteService.getHot();
			}
			if(document.URL.indexOf('/channel/SRF') > -1){
				SRFService.getNew();
				SRFService.getHot();
			}
			if(document.URL.indexOf('/channel/BR') > -1){
				BRService.getBRNew();
				BRService.getBRHot();
			}
			if(document.URL.indexOf('/channel/ORF') > -1){
				ORFService.getNew(20);
				ORFService.getHot();
			}

		}
		if (document.URL.indexOf("/suche") > -1 || document.URL.indexOf("/suche-mobile") > -1) {
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
					//console.log(mediathekModel.getResults());
		//localStorage.removeItem("mediathek-crawler");
		mediathekModel.clearResults();
		$("#result-wrapper").empty();
		var channels = searchView.getSelectedChannels();
		var categories = searchView.getSelectedCategories();
		var searchString = $('input[name="search"]').val();
		var startDate = searchView.getDateFrom();
		var endDate = searchView.getDateTo();

		var duration = searchView.getSliderValue();

			

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
						if(channel == "srf"){
							SRFService.getSRFCategories(category);
						}
						if(channel == "br"){
							BRService.searchString(category,0);
						}
						if(channel == "daserste"){
							DasErsteService.searchString(category,0);
						}
						if(channel == "orf"){
							ORFService.searchString(category);
						}
					})
							//checkDuration(duration);
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
					if(channel =="srf"){
						SRFService.searchString(searchString, SRFMAXPAGESTOCRAWL);
					}
					if(channel =="br"){
						BRService.searchString(searchString, 0);
					}
					if(channel =="orf"){
						ORFService.searchString(searchString);
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
						DasErsteService.getDasErsteVideosByDate(0,  startDate, endDate);
							
					}
					if(channel =="srf"){
						SRFService.getSRFVideosByDate(0,  startDate, endDate);
					}
					if(channel =="br"){
						BRService.getBRVideosByDate(startDate, endDate);
					}
					if(channel =="orf"){
						// BRService.getORFVideosByDate(startDate, endDate);
					}

				}
				// Channel search
				else{
					if(channel == "arte"){
						ARTEService.getNew(5);
						ARTEService.getHot(5);
						//checkDuration(duration);
					}
					if(channel == "zdf"){
						ZDFService.getNew(6);
						ZDFService.getHot(6)
					}
					if(channel == "daserste"){
						DasErsteService.getNew();
						DasErsteService.getHot();
					}
					if (channel == "srf"){
						SRFService.getHot();
						SRFService.getNew();
					}
					if (channel == "br"){
						BRService.getBRHot();
						BRService.getBRNew();
					}
					if (channel == "orf"){
						ORFService.getHot();
						ORFService.getBRNew();
					}
				}
	
			

			})
		}
		// category search
		else if(categories.length > 0){
			categories.forEach(function(category){
				ARTEService.getCategories(category);
				ZDFService.getCategories(category,1);
				SRFService.getSRFCategories(category);
				BRService.searchString(category,0);
				DasErsteService.searchString(category,0);
				ORFService.searchString(category);
			})
		}
		// string search
		else if(searchString !== '' && searchString !== undefined) {
			_search(searchString);
		}
		// date search
		else if(startDate != "" || endDate != ""){
			ZDFService.getZDFVideosByDate(200, startDate, endDate);
			ARTEService.getVideosByDate(200,  startDate, endDate);
			DasErsteService.getDasErsteVideosByDate(200, startDate, endDate);
			BRService.getBRVideosByDate(startDate, endDate);
			// ORFService.getORFVideosByDate(startDate, endDate);
		}

		searchView.collapseMobileFilter();
	
		return;
	},
	checkDuration = function(duration){
			$("#result-wrapper").empty();
			if(duration > 0){
					results = JSON.parse(localStorage.getItem("mediathek-crawler"))._results;
					//localStorage.removeItem("mediathek-crawler");
					//localStorage.removeItem("mediathek-crawler");
					//mediathekModel.clearResults();
					//console.log("duration");
					var newResults =[];
					results.forEach(function(re){
						time=re._length.split(":");
						timeInMinutes = parseInt(time[1]); 
						if(time[0]>0){
							timeInMinutes = timeInMinutes + parseInt(time[0])*60;
						}
						if(timeInMinutes >= duration){
							//resultView.appendResult(event, re);
							newResults.push(re);
						}
					});
					var resultIndex = 0;
					newResults.forEach(function(i){
						newResults[resultIndex]._id = resultIndex;
						resultView.appendResult(event,i);
						resultIndex++;
					})
					newResults = JSON.stringify(newResults);
					newResults = '{"_results":'+newResults+'}';

					localStorage.setItem("mediathek-crawler", newResults);
					results = JSON.parse(localStorage.getItem("mediathek-crawler"))._results;
				}
	},
	_search = function(searchString) {
		mediathekModel.clearResults();

		//ardController.searchString(searchString);
		DasErsteService.searchString(searchString, 0);
		ZDFService.searchString(searchString, ZDFMAXRESULTS);
		ORFService.searchString(searchString);
		ARTEService.searchString(searchString, ARTEMAXRESULTS);
		SRFService.searchString(searchString, SRFMAXPAGESTOCRAWL);
		BRService.searchString(searchString, 0);
	},

	_getCategory = function(category) {
		ZDFService.getCategories(category, 2);
		ARTEService.getCategories(category);
		SRFService.getSRFCategories(category);
		BRService.searchString(category,0);
		DasErsteService.searchString(category,0);
		ORFService.searchString(category);
	},

	_getNew = function() {
		DasErsteService.getNew();
		ZDFService.getNew(ZDFMAXRESULTS);
		ARTEService.getNew(ARTEMAXRESULTS);
		SRFService.getNew();
		BRService.getBRNew();
		ORFService.getNew();
	},
	_getHot = function(){
		DasErsteService.getHot();
		ZDFService.getHot(ZDFMAXRESULTS);
		ARTEService.getHot(ARTEMAXRESULTS);
		SRFService.getHot();
		BRService.getBRHot();
		ORFService.getHot();
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
