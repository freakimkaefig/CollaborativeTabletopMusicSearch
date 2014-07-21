
			    //TODO:
			    //SendungenAbisZ-Suche?
			    //check ob parseResponse() bereits Daten enthät die searchStream() nochmals abruft!?
			    //CHECK: nur mp4 Video links abspielbar!?

MediathekCrawler.ZDFService = function() {

	var that = {},
	ZDFSEARCHURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/detailsSuche?searchString=",
	ZDFSTREAMURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/beitragsDetails?id=",
	ZDFSEARCHNEWURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=",
	ZDFSEARCHHOTURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/meistGesehen?id=_GLOBAL&maxLength=",
	ZDFBROADCASTSPERCATEGORY = "http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=",
	ZDFVIDEOSPERBROADCAST = "http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=",
	ZDFID = 322,
	ZDFNEOID = 857392,
	ZDFINFOID = 398,
	ZDFKULTURID = 1321386,
	xmlHttp = null,
	once = 0,
	mediathekModel = null,
	CATEGORIES = [
		{
			'_id': 'nachrichten',
			'_assetId': ['884718'],
		},
		{
			'_id': 'politik',
			'_assetId': ['884720'],
		},
		{
			'_id': 'sport',
			'_assetId': ['884726'],
		},
		{
			'_id': 'kinder',
			'_assetId': ['884712'],
		},
		{
			'_id': 'ratgeber-gesundheit',
			'_assetId': ['884722'],
		},
		{
			'_id': 'unterhaltung',
			'_assetId': ['884728'],
		},
		{
			'_id': 'kino-tv',
			'_assetId': ['884724','884708','884714'],
		},
		{
			'_id': 'wissen-kultur',
			'_assetId': ['884730','884716'],
		},
	];
	
	init = function(mModel) {
		//init ZDFService
		console.info("MediathekCrawler.ZDFService.init");
		mediathekModel = mModel;
	},

	searchString = function(searchStr, maxResults){
		if(maxResults >= 50){
			maxResults = 50;
		}
	    
		$.ajax({
			url: ZDFSEARCHURL+searchStr+"&maxLength="+String(maxResults),
			type: 'GET',
			success: function(data) {
				_parseResponse(data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.searchString; AJAX-request did not recieve a response');
			}
		});
	},

	_parseResponse = function(data){
		// console.log("parsing response: ", data);
	    $xml = $(data);
	     //console.log(data);
	    if(typeof $xml  != "undefined"){
	    	//each teaser = 1 search Result
	    	$xml.find("teaser").each(function(){

				var teaserImages = [],
				details = "",
				title = "",
				assetID = 0,
				length = "",
				airtime = "",
				station = "",
				subtitle = "",
				streams = [];

				// get all teaserImgs with resolution
		    	$(this).find("teaserimage").each(function(){
				
					var res = $(this).attr('key');
			    	var imgUrl = $(this).text();

			    	//Array containing all the unsorted teaserImages as Objects(with resolution & url)
			    	var ti = mediathekModel.createTeaserImage(res, imgUrl);
			    	teaserImages.push(ti);
				});

			    //get information
			    title = $(this).find("title").text();
			    details = $(this).find("detail").text();
			    station = $(this).find("channel").text();

			    //get assetid (for stream-url's)
			    assetID = $(this).find("assetId").text();

			    //get length
			    length = $(this).find("length").text();

			    //get airtime
			    airtime = $(this).find("airtime").text();

			    //Fetch stream url's
			    // console.log("parsing response: ",assetID, title, subtitle, details, station, assetID, length, airtime, teaserImages);
			    _searchStream(assetID, title, subtitle, details, station, length, airtime, teaserImages);
			   
	    	}); //end foreach searchResult
		    	
	    } 
	    
	},

	_searchStream = function(assetID, title, subtitle, details, station, length, airtime, teaserImages){

		var streams = [];

		$.ajax({
			url: ZDFSTREAMURL+assetID,
			type: 'GET',
			success: function(data) {
				$xml = $(data);

			    if(typeof $xml  != "undefined"){


			    	$xml.find("formitaet").each(function(){

			    		var basetype = "",
			    		quality = "",
			    		url = "",
			    		filesize = 0;

			    		basetype = $(this).attr('basetype');
			    		
			    		// filter for playable & working(!) basetypes
			    		// only save url & stream if this is the case!
			    		switch (basetype) {
			    			case 'h264_aac_3gp_rtsp_na_na':
			    				type = null;	// TODO: transform to type! (.3gp)
			    				// geht nicht mit videojs?
			    				break;
			    			case 'h264_aac_f4f_http_f4m_http':
			    				type = null;	// TODO: transform to type! (.f4m)
			    				// geht nicht!?
			    				break;
			    			case 'h264_aac_mp4_http_na_na':
			    				type = 'video/mp4';
			    				url = $(this).find("url").text();
			    				// filter metafilegenerator-URLS (not streamable!)
			    				if(url.indexOf('metafilegenerator') == -1){

									filesize = $(this).find("filesize").text();

									var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
						    		//console.log("basetype: ",basetype,", stream: ",stream._url);
									streams.push(stream);
			    				}
			    				// log those URLs to console:
			    				// else{
			    				// 	console.log('found metafilegenerator-URL: ', url)
			    				// }
			    				break;
			    			case 'h264_aac_mp4_rtmp_smil_http':
			    				type = null;	// TODO: transform to type! (.smil)
			    				break;
			    			case 'h264_aac_mp4_rtmp_zdfmeta_http':
			    				type = null;	// TODO: transform to type! (.meta)
			    				break;
			    			case 'h264_aac_mp4_rtsp_mov_http':
			    				type = null;	// TODO: transform to type! (.mov)
			    				break;
			    			case 'h264_aac_ts_http_m3u8_http':
			    				type = null; //'application/x-mpegURL' oder 'vnd.apple.mpegURL'
			    				break;
			    			case 'vp8_vorbis_webm_http_na_na':
			    				type = null; //'video/webm';  oder 'video/webm; codecs="vp8, vorbis"'
			    	// 			url = $(this).find("url").text();
								// filesize = $(this).find("filesize").text();

								// var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
					   //  		//console.log("basetype: ",basetype,", stream: ",stream._url);
								// streams.push(stream);
			    				break;
			    			default:
			    				type = 'video/mp4';
			    				break;
			    		}
			    		// type = 
			    		qualityText = $(this).find("quality").text();
			    		switch (qualityText) {
			    			case 'low':
			    				quality = 0;
			    				break;
			    			case 'med':
			    				quality = 1;
			    				break;
			    			case 'high':
			    				quality = 2;
			    				break;
			    			case 'veryhigh':
			    				quality = 3;
			    				break;
			    		}
			    	}); // end foreach formitaet

			    }
			},
			error: function(){
				console.warn('ERROR; ZDFService._searchStream; AJAX-request did not recieve a response');
			}
		});
// console.log("before pushing to model: ", title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
		_pushResultToModel(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
	},

	_pushResultToModel = function(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		
		mediathekModel.addResults(station, title, subtitle, details, length, airtime, teaserImages, streams);
	},

	getHot = function(maxResults){
		if(maxResults >50){
			maxResults = 50;
		} 

		$.ajax({
			url: ZDFSEARCHHOTURL+String(maxResults),
			type: 'GET',
			success: function(data) {
				_parseResponse(data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.getHot; AJAX-request did not recieve a response');
			}
		});
	},

	getNew = function(maxResults) {
		if(maxResults >50){
			maxResults = 50;
		} 

		$.ajax({
			url: ZDFSEARCHNEWURL+ZDFID+"&maxLength="+String(maxResults),
			type: 'GET',
			success: function(data) {
				_parseResponse(data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.getNew; ZDF; AJAX-request did not recieve a response');
			}
		});
		$.ajax({
			url: ZDFSEARCHNEWURL+ZDFNEOID+"&maxLength="+String(maxResults),
			type: 'GET',
			success: function(data) {
				_parseResponse(data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.getNew; ZDFNEO; AJAX-request did not recieve a response');
			}
		});
		$.ajax({
			url: ZDFSEARCHNEWURL+ZDFKULTURID+"&maxLength="+String(maxResults),
			type: 'GET',
			success: function(data) {
				_parseResponse(data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.getNew; ZDFKULTUR; AJAX-request did not recieve a response');
			}
		});
		$.ajax({
			url: ZDFSEARCHNEWURL+ZDFINFOID+"&maxLength="+String(maxResults),
			type: 'GET',
			success: function(data) {
				_parseResponse(data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.getNew; ZDFINFO; AJAX-request did not recieve a response');
			}
		});
	},

	getCategories = function(_category, maxVidProSendung) {
		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if (find.length > 0) {
			// console.log(find[0]._assetId);
			$.each(find[0]._assetId, function(index,value){
				_getBroadcastOfCategory(value, maxVidProSendung);
			});

		} else {
			console.error('ERROR; ZDFService.getCategories; AJAX-request did not recieve a response');
		}
	},

	_getBroadcastOfCategory = function(assetId, maxVidProSendung){
		// console.log(assetId);
		$.ajax({
			// maxLength: max results of broadcasts per category
			url: ZDFBROADCASTSPERCATEGORY+String(assetId)+"&maxLength=50",
			type: 'GET',
			success: function(data) {
				$xml = $(data);
	     		//console.log(data);
			    if(typeof $xml  != "undefined"){
			    	//each teaser = 1 search Result
			    	$xml.find("teaser").each(function(){

						var	assetID = 0;

					    //get assetid (for stream-url's)
					    assetID = $(this).find("assetId").text();

					    _getVideosOfBroadcast(assetID, maxVidProSendung);
			    	}); 
				    	
			    }

			},
			error: function(){
				console.warn('ERROR; ZDFService._getBroadcastOfCategory; AJAX-request did not recieve a response');
			}
		});
		
	},

	_getVideosOfBroadcast = function(assetId, maxVidProSendung){
		
		$.ajax({
			url: ZDFVIDEOSPERBROADCAST+String(assetId)+"&maxLength="+String(maxVidProSendung),
			type: 'GET',
			success: function(data) {
				$xml = $(data);
	     		//console.log(data);
			    if(typeof $xml  != "undefined"){
			    	//each teaser = 1 search Result
			    	$xml.find("teaser").each(function(){

						var	assetID = 0;

					    //get assetid (for stream-url's)
					    assetID = $(this).find("assetId").text();

					    _getDetailsAndStreamOfVideo(assetID);
			    	}); 
				    	
			    }
			},
			error: function(){
				console.warn('ERROR; ZDFService._getVideosOfBroadcast; AJAX-request did not recieve a response');
			}
		});
	},

	_getDetailsAndStreamOfVideo = function(assetId){
		
		$.ajax({
			url: ZDFSTREAMURL+assetId,
			type: 'GET',
			success: function(data) {
				$xml = $(data);
			    //console.log(data);
			    if(typeof $xml  != "undefined"){
			    	//each teaser = 1 search Result
			    	$xml.find("video").each(function(){

						var teaserImages = [],
						details = "",
						title = "",
						assetID = 0,
						length = "",
						airtime = "",
						station = "",
						subtitle = "",
						streams = [];

						// get all teaserImgs with resolution
				    	$(this).find("teaserimage").each(function(){
						
							var res = $(this).attr('key');
					    	var imgUrl = $(this).text();

					    	//Array containing all the unsorted teaserImages as Objects(with resolution & url)
					    	var ti = mediathekModel.createTeaserImage(res, imgUrl);
					    	teaserImages.push(ti);
						});

					    //get information
					    title = $(this).find("title").text();
					    details = $(this).find("detail").text();
					    station = $(this).find("channel").text();

					    //get assetid (for stream-url's)
					    assetID = $(this).find("assetId").text();

					    //get length
					    length = $(this).find("length").text();

					    //get airtime
					    airtime = $(this).find("airtime").text();

					    //Fetch stream url's
					    // console.log("_getDetailsAndStreamOfVideo: ",assetID, title, subtitle, details, station, assetID, length, airtime, teaserImages);
					    _searchStream(assetID, title, subtitle, details, station, length, airtime, teaserImages);
					   
			    	});
				    	
			    } //end if
			},
			error: function(){
				console.warn('ERROR; ZDFService._getDetailsAndStreamOfVideo; ZDFINFO; AJAX-request did not recieve a response');
			}
		});
	},

	dispose = function() {
		that = {};
	};


	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;
	that.getHot = getHot;
	that.getNew = getNew;
	that.getCategories = getCategories;

	return that;

};