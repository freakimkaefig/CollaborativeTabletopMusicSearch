MediathekCrawler.ZDFController = function() {

	var that = {},
	ZDFSEARCHURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/detailsSuche?searchString=",
	ZDFSTREAMURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/beitragsDetails?id=",
	ZDFSEARCHHOTURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/meistGesehen?id=_GLOBAL&maxLength=",
	xmlHttp = null,
	once = 0,
	mediathekModel = null;
	
	
	init = function(mModel) {
		//init ZDFController
		console.log("MediathekCrawler.ZDFController.init");
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
				parseResponse(data);
			}
		});
	},

	parseResponse = function(data){
		
	     $xml = $(data);

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
			    searchStream(assetID, title, subtitle, details, station, assetID, length, airtime, teaserImages);
			   
	    	}); //end foreach searchResult
		    	
	    } 
	    
	},

	searchStream = function(assetID, title, subtitle, details, station, assetID, length, airtime, teaserImages){

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
			    		// only save url if this is the case!


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
								filesize = $(this).find("filesize").text();

								var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
					    		//console.log("basetype: ",basetype,", stream: ",stream._url);
								streams.push(stream);
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
			    				type = 'video/webm'; 	// oder 'video/webm; codecs="vp8, vorbis"'
			    				url = $(this).find("url").text();
								filesize = $(this).find("filesize").text();

								var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
					    		//console.log("basetype: ",basetype,", stream: ",stream._url);
								streams.push(stream);
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
						// url = $(this).find("url").text();
						// filesize = $(this).find("filesize").text();

						// var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
			   //  		//console.log("basetype: ",basetype,", stream: ",stream._url);
						// streams.push(stream);

			    	}); // end foreach formitaet

			    }
			},
			error: function(){
				console.log('ERROR; ZDFController; AJAX-request did not recieve a response');
			}
		});
		pushResultToModel(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
	},

	pushResultToModel = function(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		
		mediathekModel.addResults(station, title, subtitle, details, length, airtime, teaserImages, streams);
	},

	searchHot = function(maxResults){
		if(maxResults >50){
			maxResults = 50;
		} 

		$.ajax({
			url: ZDFSEARCHHOTURL+String(maxResults),
			type: 'GET',
			success: function(data) {
				parseHot(data);
			}
		});
	},

	parseHot = function(data){

		$xml = $(data);

	    if(typeof $xml  != "undefined"){

	    	//each teaser = 1 search Result
	    	$xml.find("teaser").each(function(){

	    		// check for videos
				var type = $(this).find("type").text();
				if(type === "video")
				{	

					var teaserImages = [],
					details = "",
					title = "",
					assetID = 0,
					length = "",
					airtime = "",
					station = "",
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
				    streams = searchStream(assetID);
					
				    pushResultToModel(title, details, station, assetID, length, airtime, teaserImages, streams);

				} //end if type === video

		    });	//end foreach searchResult
			
		}	//end if xml != undefined
			
	},

			    //TODO:
			    //neu
			    //SendungenAbisZ-Suche?
			    //Rubriken-Suche
			    //filter streaming url's

	dispose = function() {
		that = {};
	};


	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;
	that.searchHot = searchHot;

	return that;

};