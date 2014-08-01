
			    //TODO:
			    // rubriken/kategorien
			    // filter
			    // INFO
			    // CONCERT
			    // FUTURE?

MediathekCrawler.ARTEService = function() {

	var that = {},
	mediathekModel = null,
	ARTESEARCHNEW = 'http://www.arte.tv/papi/tvguide/epg/schedule/D/L3/',
	// http://www.arte.tv/papi/tvguide/videos/plus7/search/D/L1/KEYWORD/ALL/ALL/-1/AIRDATE_DESC/LIMIT/0.json
	// or
	// http://www.arte.tv/tvhack/tvguide/videos/plus7/search/F/L2/KEYWORD/ALL/ALL/-1/AIRDATE_DESC/LIMIT/0/EUR_DE_FR/DATE(YYYY-MM-DD).json
	ARTESEARCHSTRING = 'http://www.arte.tv/papi/tvguide/videos/plus7/search/D/L1/', // +KEYWORD
	ARTESEARCHSTRING2 = '/ALL/ALL/-1/AIRDATE_DESC/', // +maxResults (+'/YYYY-MM-DD'; not working atm!)
	ARTESEARCHSTRING3 = '/0.json',
	ARTESEARCHHOT = 'http://www.arte.tv/papi/tvguide/videos/plus7/D/L2/ALF/ALL/-1/VIEWS/', // +maxResults
	ARTESEARCHHOT2 = '/0.json',
	PROXY_URL = '/proxy.php?url=',
	once = 0;
	
	init = function(mModel) {
		//init ZDFService
		console.info('MediathekCrawler.ARTEService.init');
		mediathekModel = mModel;
	},

	getHot = function(maxResults){
		if(maxResults < 1 || maxResults === null || maxResults === 'undefined' || maxResults === undefined){
			maxResults = 10;
		}

		var _url = PROXY_URL + encodeURI(ARTESEARCHHOT+String(maxResults)+ARTESEARCHHOT2);
			// console.log("ARTE getHot() url: ",_url);
			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					// console.log('YAAAY', textStatus, jqXHR);
					_onGetHot(data);
					
				},
				error: function(){
					console.warn('ERROR; ARTEService.searchString(); AJAX-request did not recieve a response');
				}
			});
	},

	_onGetHot = function(data){
		var response = $.parseJSON(data);

		if(response.videoList.length > 0){

			$.each(response.videoList, function(index, element) {

				var teaserImages = [],
					streams = [],
					details = '',
					title = '',
					assetID = 0,
					length = '',
					airtime = '',
					station = '',
					streamUrl = '',
					subtitle = '';

				//get images
				try{	
					var resolution = _getResolution(element.programImage);
					// console.log("res: ",resolution);
					if(resolution != 0){
						
						var ti2 = mediathekModel.createTeaserImage(resolution, element.programImage);
				    	teaserImages.push(ti2);
					}
				}catch(e){
				   // console.log(e);
				}
				//HD IMAGE; NOT POSSIBLE TO GET RESOLUTION:

				// try{
				// 	// http://www.arte.tv/papi/tvguide/images/915321/ORIGINAL/041102-000_geofalkenaertzin_08-1404791117172.jpg
					
				// 	if(once === 0){
				// 		once = 1;
				// 		console.log("url: ",element.VTU.original);
				// 		 $.get({
		  //                   type: "GET",
		  //                   url: element.VTU.original,
		  //                   success: function(res,status,xhr){
		  //                   	// var temp = $(res);
		  //                   	console.log("HEADER: ",this.xhr.responseText , this.xhr.responseXML);
		  //                   }
		  //               });
				// 	}
				// 			// var ti3 = mediathekModel.createTeaserImage(0, element.VTU.original);
				// 	 		 //teaserImages.push(ti3);
						
				// }catch(e){
				//    // console.log(e);
				// }
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					// console.log("res: ",resolution);
					if(resolution != 0){

						var ti4 = mediathekModel.createTeaserImage(resolution, element.VTU.IUR);
				    	teaserImages.push(ti4);
					}

				}catch(e){
				   // console.log(e);
				}
				//get remaining infos
				try{
					details = element.VDE;
				}catch(e){
				   // console.log(e);
				}
				try{
					title = element.VTI;
				}catch(e){
				   // console.log(e);
				}
				try{
					assetID = element.VPI;
				}catch(e){
				   // console.log(e);
				}
				try{
					length = String(element.VDU)+'m';
				}catch(e){
				   // console.log(e);
				}
				try{
					airtime = element.VDA;
					airtime = String(airtime).slice(0, airtime.length - 5);
					airtime = airtime.trim();
					if(once === 0){
						console.log("GETHOT airtime: ",airtime);
					}
					// console.log('airtime: ',airtime);
				}catch(e){
				   // console.log(e);
				}
				try{
					station = element.VTX;
				}catch(e){
				   // console.log(e);
				}
				try{
					subtitle = element.VSU+' ('+element.VCG+')';
				}catch(e){
				   // console.log(e);
				}
				try{
					streamUrl = element.videoStreamUrl;
					// console.log('streamUrl: ', element.VDO.videoStreamUrl, ' = ',streamUrl);
				}catch(e){
				   // console.log(e);
				}
				
				// search Streams
				if(streamUrl !== ''){
					// console.log("ARTE GETHOT - DATA: ",assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
					_searchStreams(assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
				}else{
					console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
				}

			});
		}		
	},

	searchString = function(searchString, maxResults){
		
		if(maxResults < 1 || maxResults === null || maxResults === 'undefined' || maxResults === undefined){
			maxResults = 10;
		}

		var _url = PROXY_URL + encodeURI(ARTESEARCHSTRING+String(searchString)+ARTESEARCHSTRING2+String(maxResults)+ARTESEARCHSTRING3);
			// console.log("ARTE search results url: ",_url);
			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					// console.log('YAAAY', textStatus, jqXHR);
					_onSearchString(data);
					
				},
				error: function(){
					console.warn('ERROR; ARTEService.searchString(); AJAX-request did not recieve a response');
				}
			});
	},

	_onSearchString = function(data){
		// console.log("ARTE; data: ",data);
		var response = $.parseJSON(data);

		if(response.videoList.length > 0){

			$.each(response.videoList, function(index, element) {

				var teaserImages = [],
					streams = [],
					details = '',
					title = '',
					assetID = 0,
					length = '',
					airtime = '',
					station = '',
					streamUrl = '',
					subtitle = '';

				//get images
				try{	
					var resolution = _getResolution(element.programImage);
					// console.log("res: ",resolution);
					if(resolution != 0){
						
						var ti2 = mediathekModel.createTeaserImage(resolution, element.programImage);
				    	teaserImages.push(ti2);
					}
				}catch(e){
				   // console.log(e);
				}
				//HD IMAGE; NOT POSSIBLE TO GET RESOLUTION:

				// try{
				// 	// http://www.arte.tv/papi/tvguide/images/915321/ORIGINAL/041102-000_geofalkenaertzin_08-1404791117172.jpg
					
				// 	if(once === 0){
				// 		once = 1;
				// 		console.log("url: ",element.VTU.original);
				// 		 $.get({
		  //                   type: "GET",
		  //                   url: element.VTU.original,
		  //                   success: function(res,status,xhr){
		  //                   	// var temp = $(res);
		  //                   	console.log("HEADER: ",this.xhr.responseText , this.xhr.responseXML);
		  //                   }
		  //               });
				// 	}
				// 			// var ti3 = mediathekModel.createTeaserImage(0, element.VTU.original);
				// 	 		 //teaserImages.push(ti3);
						
				// }catch(e){
				//    // console.log(e);
				// }
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					// console.log("res: ",resolution);
					if(resolution != 0){

						var ti4 = mediathekModel.createTeaserImage(resolution, element.VTU.IUR);
				    	teaserImages.push(ti4);
					}

				}catch(e){
				   // console.log(e);
				}
				//get remaining infos
				try{
					details = element.VDE;
				}catch(e){
				   // console.log(e);
				}
				try{
					title = element.VTI;
				}catch(e){
				   // console.log(e);
				}
				try{
					assetID = element.VPI;
				}catch(e){
				   // console.log(e);
				}
				try{
					length = String(element.VDU)+'m';
				}catch(e){
				   // console.log(e);
				}
				try{
					airtime = element.VDA;
					airtime = String(airtime).slice(0, airtime.length - 5);
					airtime = airtime.trim();
					if(once === 0){
						console.log("SEARCHSTRING airtime: ",airtime);
					}
				}catch(e){
				   // console.log(e);
				}
				try{
					station = element.VTX;
				}catch(e){
				   // console.log(e);
				}
				try{
					subtitle = element.VSU+' ('+element.VCG+')';
				}catch(e){
				   // console.log(e);
				}
				try{
					streamUrl = element.videoStreamUrl;
					// console.log('streamUrl: ', element.VDO.videoStreamUrl, ' = ',streamUrl);
				}catch(e){
				   // console.log(e);
				}
				
				// search Streams
				if(streamUrl !== ''){
					_searchStreams(assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
				}else{
					console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
				}

			});
		}		
	},

	_getResolution = function(url){
		try{
			if(url.indexOf('ORIGINAL') == -1){

				var res = url,
				start = res.search(/[W]\d+[H]\d+/),
				end = res.indexOf("/", start+1);
				resolution = res.substring(start, end);
				resolution = resolution.substring(1);
				resolution = resolution.replace('H','x');
				resolution = resolution.trim();
				// console.log("ARTE; resolution: ",resolution, url);
				return resolution;
			}else{
				return 0;
			}
		}catch(e){
			console.log("ARTE; ERROR _getResolution(): ",url, " e: ",e);
			return 0;
		}
	},

	/*
	Gets videos from the last 3 days, starting & including today
	*/
	getNew = function(maxResults){

		//set & format today
		var today = new Date();
		var td = today.getDate();
		if (td.toString().length == 1) {
            td = '0' + td;
        }
		var tm = today.getMonth()+1; 
		if (tm.toString().length == 1) {
            tm = '0' + tm;
        }
		var tyyyy = today.getFullYear();
		today = tyyyy+'-'+tm+'-'+td;


		//set & format the day before yesterday
		var dayBeforeYesterday = new Date();
		dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
		var yd = dayBeforeYesterday.getDate();
		if (yd.toString().length == 1) {
            yd = '0' + yd;
        }
		var ym = dayBeforeYesterday.getMonth()+1; 
		if (ym.toString().length == 1) {
            ym = '0' + ym;
        }
		var yyyyy = dayBeforeYesterday.getFullYear();
		dayBeforeYesterday = yyyyy+'-'+ym+'-'+yd;

		// build search-url
		var _url = PROXY_URL + encodeURI(ARTESEARCHNEW+String(dayBeforeYesterday)+'/'+String(today)+'.json');
		// console.log('ARTEService; getNew: ', _url);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {
				_onGetNew(data, maxResults);
			},
			error: function(){
				console.warn('ERROR; ARTEService.getNew(); AJAX-request did not recieve a response');
			}
		});
	},

	_onGetNew = function(data, maxResults){
		var counter = 1;
		var response = $.parseJSON(data);
		// console.log(response.abstractBroadcastList.length);
		if(response.abstractBroadcastList.length > 0){

			$.each(response.abstractBroadcastList, function(index, element) {
				if(counter <= maxResults){

					var teaserImages = [],
						details = '',
						title = '',
						assetID = 0,
						length = '',
						airtime = '',
						station = '',
						streamUrl = '',
						subtitle = '';

					//get images
					try{
						var resolution = _getResolution(element.IMG.IUR);
						if(resolution != 0){
						
							var ti = mediathekModel.createTeaserImage(resolution, element.IMG.IUR);
					    	teaserImages.push(ti);
						}
					}catch(e){
					   // console.log(e);
					}
					try{	
						var resolution = _getResolution(element.VDO.programImage);
						if(resolution != 0){
						
							var ti2 = mediathekModel.createTeaserImage(resolution, element.VDO.programImage);
					    	teaserImages.push(ti2);
						}
					}catch(e){
					   // console.log(e);
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.original);
						if(resolution != 0){
						
							var ti3 = mediathekModel.createTeaserImage(resolution, element.VDO.VTU.original);
					    	teaserImages.push(ti3);
						}
					}catch(e){
					   // console.log(e);
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.IUR);if(resolution != 0){
						
							var ti4 = mediathekModel.createTeaserImage(resolution, element.VDO.VTU.IUR);
					    	teaserImages.push(ti4);
						}

					}catch(e){
					   // console.log(e);
					}

					//get remaining infos
					try{
						details = element.VDO.VTX+': '+element.DSS;
					}catch(e){
					   // console.log(e);
					}
					try{
						title = element.TIT;
					}catch(e){
					   // console.log(e);
					}
					try{
						assetID = element.programId;
					}catch(e){
					   // console.log(e);
					}
					try{
						length = element.BAT;
					}catch(e){
					   // console.log(e);
					}
					try{
						airtime = element.BDT;
						airtime = String(airtime).slice(0, airtime.length - 5);
						airtime = airtime.trim();
						if(once === 0){
						console.log("onGETNEW airtime: ",airtime);
					}
					}catch(e){
					   // console.log(e);
					}
					try{
						station = element.POR;
					}catch(e){
					   // console.log(e);
					}
					try{
						subtitle = element.STL+' ('+element.VDO.genre+')';
					}catch(e){
					   // console.log(e);
					}
					try{
						streamUrl = element.VDO.videoStreamUrl;
						// console.log('streamUrl: ', element.VDO.videoStreamUrl, ' = ',streamUrl);
					}catch(e){
					   // console.log(e);
					}
					
					// search Streams
					if(streamUrl !== '' && teaserImages.length > 0){
						_searchStreams(assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
					}else{
						console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
					}

					counter++;
				}
				
			});
		}
	},

	_searchStreams = function(assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl){
		var streams = [],
		_url = PROXY_URL + encodeURI(streamUrl),
		
		// build alternative stream url:
		position = streamUrl.indexOf('stream')+6;
		newStreamUrl = [streamUrl.slice(0, position), '/player', streamUrl.slice(position)].join('');
		_url2 = PROXY_URL + encodeURI(newStreamUrl);
		// console.log("New stream url: ",_url2);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {

				var response = $.parseJSON(data);
				// console.log(response);
				try{

					if(response.video.VSR.length > 0){

						$.each(response.video.VSR, function(index, element) {
							var basetype = '',
				    		quality = '',
				    		url = '',
				    		filesize = 0,
			    			type = 'video/mp4';

				    		try{
					    		if(String(element.VFO) == 'HBBTV'){
					    			url = element.VUR;
					    			switch (element.VQU) {
						    			case 'SQ':
						    				quality = 3;
						    				break;
						    			case 'EQ':
						    				quality = 0;
						    				break;
						    			case 'MQ':
						    				quality = 1;
						    				break;
						    			case 'HQ':
						    				quality = 2;
						    				break;
					    			}

						    		var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
						    		//console.log('basetype: ',basetype,', stream: ',stream._url);
									streams.push(stream);

					    		}
				    		}catch(e){
				    			//fuck.	
				    		}

						});
					}

					if(streams.length < 1){				
						if(_url != _url2){
							// console.log("ARTE; trying to search Streams with new streamUrl: ",_url2);
							_searchStreams(assetID, title, subtitle, details, station, length, airtime, teaserImages, _url2);
						}else if(_url === _url2){
							console.log('ARTE; \'',title, '\' has ', streams.length, ' streams. \nCHECK: ',_url, ' AND ',_url2);
						}
					}
					else{
						_pushResultToModel(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					}

				}catch(e){
					console.log('could not fetch streaming urls: ',e);
				}
			},
			error: function(){
				console.warn('ERROR; ARTEService.getNew; AJAX-request did not recieve a response');
			}
		});

	},

	_pushResultToModel = function(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		// console.log('pushing to result model');
		// if(station != 'null' && title != 'null' && subtitle != 'null' && details != 'null' && length != 'null' && airtime != 'null' && teaserImages != 'null' && streams && station && title && subtitle && details && length && airtime && teaserImages && streams){

			mediathekModel.addResults(station, title, subtitle, details, length, airtime, teaserImages, streams);
		// }
		// else{
		// console.log('some params missing @ ARTEService._pushResultToModel: ', 'station: ', station, 'title: ', title, 'subtitle: ', subtitle, 'details: ', details, 'length: ', length, 'airtime: ', airtime, 'teaserImages: ', teaserImages, 'streams: ', streams);
		// }
		// console.log('number of streams: ',streams.length);
	},

	dispose = function() {
		that = {};
	};


	that.init = init;
	that.searchString = searchString;
	that.getNew = getNew;
	that.getHot = getHot;

	return that;

};