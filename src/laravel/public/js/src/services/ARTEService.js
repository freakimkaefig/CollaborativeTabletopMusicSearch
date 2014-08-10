
			    //TODO:
			    // Abfrage ob Ajax response bereits JSON oder nicht
			    // type param für searchString (aritime,views,...)??
			    // Wiederkehrende Funktionalitäten in FUnktionen zusammenfassen!
			    // filter
			    // INFO?
			    // CONCERT?
			    // FUTURE?

MediathekCrawler.ARTEService = function() {

	var that = {},
	ARTEmediathekModel = null,
	ARTESEARCHNEW = 'http://www.arte.tv/papi/tvguide/epg/schedule/D/L3/',
	// http://www.arte.tv/papi/tvguide/videos/plus7/search/D/L1/KEYWORD/ALL/ALL/-1/AIRDATE_DESC/LIMIT/0.json
	// or
	// http://www.arte.tv/tvhack/tvguide/videos/plus7/search/F/L2/KEYWORD/ALL/ALL/-1/AIRDATE_DESC/LIMIT/0/EUR_DE_FR/DATE(YYYY-MM-DD).json
	ARTESEARCHSTRING = 'http://www.arte.tv/papi/tvguide/videos/plus7/search/D/L1/', // +KEYWORD
	ARTESEARCHSTRING2 = '/ALL/ALL/-1/AIRDATE_DESC/', // +maxResults (+'/YYYY-MM-DD'; not working atm!)
	ARTESEARCHSTRING3 = '/0.json',
	ARTESEARCHHOT = 'http://www.arte.tv/papi/tvguide/videos/plus7/D/L2/ALF/ALL/-1/VIEWS/', // +maxResults
	ARTESEARCHHOT2 = '/0.json',
	ARTESEARCHCATEGORY = 'http://www.arte.tv/papi/tvguide/videos/plus7/D/L2/',
	ARTESEARCHCATEGORY2 = '/ALL/-1/VIEWS/10/0.json',
	PROXY_URL = '/proxy.php?url=',
	once = 0,
	CATEGORIES = [
		{
			'_id': 'nachrichten',
			'_value': ['ACT'],
		},
		{
			'_id': 'politik',
			'_value': ['SOC', 'GEO', 'EUR'],
		},
		{
			'_id': 'kinder',
			'_value': ['JUN'],
		},
		{
			'_id': 'kino-tv',
			'_value': ['CIN','DOC'],
		},
		{
			'_id': 'wissen-kultur',
			'_value': ['DEC','ART', 'CUL', 'ENV'],
		},
	];
	
	init = function(mModel) {
		//init ZDFService
		console.info('MediathekCrawler.ARTEService.init');
		ARTEmediathekModel = mModel;
	},

	getCategories = function(_category) {
		var origin = {
			_channel: 'ARTE',
			_method: 'getCategories',
			_searchTerm: _category,
			_badge: null
		};
		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if(find.length > 0) {
			// console.log(find[0]._assetId);
			$.each(find[0]._value, function(index,value){
				_getARTEBroadcastOfCategory(origin, value);
			});

		} else {
			console.warn('ERROR; ARTEService.getCategories; Category not found');
		}
	},

	_getARTEBroadcastOfCategory = function(origin, category){
		$.ajax({
			// maxLength: max results of broadcasts per category
			url: PROXY_URL + encodeURI(ARTESEARCHCATEGORY+String(category)+ARTESEARCHCATEGORY2),
			type: 'GET',
			cache: false,
			success: function(data) {
				// console.log('DATA: ', data)
	     		// var response = $.parseJSON(data);

				if(data.videoList.length > 0){
					// console.log('found videolist entry');
					$.each(data.videoList, function(index, element) {

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
							// console.log('res: ',resolution);
							if(resolution !== 0){
								
								var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
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
						// 		console.log('url: ',element.VTU.original);
						// 		 $.get({
				  //                   type: 'GET',
				  //                   url: element.VTU.original,
				  //                   success: function(res,status,xhr){
				  //                   	// var temp = $(res);
				  //                   	console.log('HEADER: ',this.xhr.responseText , this.xhr.responseXML);
				  //                   }
				  //               });
						// 	}
						// 			// var ti3 = ARTEmediathekModel.createTeaserImage(0, element.VTU.original);
						// 	 		 //teaserImages.push(ti3);
								
						// }catch(e){
						//    // console.log(e);
						// }
						try{	
							var resolution = _getResolution(element.element.VTU.IUR);
							// console.log('res: ',resolution);
							if(resolution !== 0){

								var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VTU.IUR);
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
							length = _formatSeconds(String(element.VDU) * 60);
						}catch(e){
						   // console.log(e);
						}
						try{
							airtime = element.VDA;
							airtime = String(airtime).slice(0, airtime.length - 5);
							airtime = airtime.trim();
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
							subtitle = subtitle.replace('undefined','');
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
							// console.log('ARTE GETHOT - DATA: ',assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
							_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
						}else{
							console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
						}

					});
				}
			 	
			},
			error: function(){
				console.warn('ERROR; ZDFService._getARTEBroadcastOfCategory; AJAX-request did not recieve a response');
			}
		});
	},

	getHot = function(maxResults){
		if(maxResults < 1 || maxResults === null || maxResults === 'undefined' || maxResults === undefined){
			maxResults = 10;
		}
		var origin = {
			_channel: 'ARTE',
			_method: 'getHot',
			_searchTerm: null,
			_badge: 'hot'
		},

		 _url = PROXY_URL + encodeURI(ARTESEARCHHOT+String(maxResults)+ARTESEARCHHOT2);
			// console.log('ARTE getHot() url: ',_url);
			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					// console.log('YAAAY', textStatus, jqXHR);
					_onARTEGetHot(origin, data);
					
				},
				error: function(){
					console.warn('ERROR; ARTEService.searchString(); AJAX-request did not recieve a response');
				}
			});
	},

	_onARTEGetHot = function(origin, data){
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
					// console.log('res: ',resolution);
					if(resolution !== 0){
						
						var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
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
				// 		console.log('url: ',element.VTU.original);
				// 		 $.get({
		  //                   type: 'GET',
		  //                   url: element.VTU.original,
		  //                   success: function(res,status,xhr){
		  //                   	// var temp = $(res);
		  //                   	console.log('HEADER: ',this.xhr.responseText , this.xhr.responseXML);
		  //                   }
		  //               });
				// 	}
				// 			// var ti3 = ARTEmediathekModel.createTeaserImage(0, element.VTU.original);
				// 	 		 //teaserImages.push(ti3);
						
				// }catch(e){
				//    // console.log(e);
				// }
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					// console.log('res: ',resolution);
					if(resolution !== 0){

						var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VTU.IUR);
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
					length = _formatSeconds(String(element.VDU) * 60);
				}catch(e){
				   // console.log(e);
				}
				try{
					airtime = element.VDA;
					airtime = String(airtime).slice(0, airtime.length - 5);
					airtime = airtime.trim();
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
					subtitle = subtitle.replace('undefined','');
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
					// console.log('ARTE GETHOT - DATA: ',assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
					_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
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
		var origin = {
			_channel: 'ARTE',
			_method: 'searchString',
			_searchTerm: searchString,
			_badge: null
		};

		var _url = PROXY_URL + encodeURI(ARTESEARCHSTRING+String(searchString)+ARTESEARCHSTRING2+String(maxResults)+ARTESEARCHSTRING3);
			// console.log('ARTE search url: ',_url);
			$.ajax({
				url: _url,
				type: 'GET',
				dataType: 'json',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					// console.log('YAAAY',_url, textStatus);
					_onARTESearchString(origin, data);
					// console.log('ARTE.searchString; origin: ',origin, data);
					
				},
				error: function(){
					console.warn('ERROR; ARTEService.searchString(); AJAX-request did not recieve a response');
				}
			});
	},

	_onARTESearchString = function(origin, data){
		console.log('ARTE._onARTESearchString');
		// console.log('ARTE._onARTESearchString; origin: ',origin);
		// try{
		// 	var response = $.parseJSON(data);
		// }catch(e){
		// 	console.log('ARTE onsearchString - failed to parse data', '\n', e);
		// }

		if(data.videoList.length > 0){

			$.each(data.videoList, function(index, element) {

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
					// console.log('res: ',resolution);
					if(resolution !== 0){
						// console.log('IMAGE URL: ',element.programImage);
						var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
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
				// 		console.log('url: ',element.VTU.original);
				// 		 $.get({
		  //                   type: 'GET',
		  //                   url: element.VTU.original,
		  //                   success: function(res,status,xhr){
		  //                   	// var temp = $(res);
		  //                   	console.log('HEADER: ',this.xhr.responseText , this.xhr.responseXML);
		  //                   }
		  //               });
				// 	}
				// 			// var ti3 = ARTEmediathekModel.createTeaserImage(0, element.VTU.original);
				// 	 		 //teaserImages.push(ti3);
						
				// }catch(e){
				//    // console.log(e);
				// }
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					// console.log('res: ',resolution);
					if(resolution !== 0){

						// console.log('IMAGE URL: ',element.VTU.IUR);
						var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VTU.IUR);
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
					length = _formatSeconds(String(element.VDU) * 60);
				}catch(e){
				   // console.log(e);
				}
				try{
					airtime = element.VDA;
					airtime = String(airtime).slice(0, airtime.length - 5);
					airtime = airtime.trim();
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
					subtitle = subtitle.replace('undefined','');
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
					// console.log('ARTE searchStream: ',origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
					_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
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
				end = res.indexOf('/', start+1);
				resolution = res.substring(start, end);
				resolution = resolution.substring(1);
				resolution = resolution.replace('H','x');
				resolution = resolution.trim();
				// console.log('ARTE; resolution: ',resolution, url);
				return resolution;
			}else{
				return 0;
			}
		}catch(e){
			console.log('ARTE; ERROR _getResolution(): ',url, ' e: ',e);
			return 0;
		}
	},

	/*
	Gets videos from the last 3 days, starting & including today
	*/
	getNew = function(maxResults){

		var origin = {
			_channel: 'ARTE',
			_method: 'getNew',
			_searchTerm: null,
			_badge: 'new'
		};
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
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {

				console.log('ajax succes: \n',data,'\n',_url);
				// var temp = jqXHR.responseText;
				// var data2 = JSON.stringify(data).split('@').join('');
				// console.log('DATA CONTAINS \" @ \" = ',data2.indexOf('@'));
				_onARTEGetNew(origin, data, maxResults);
			},
			error: function(){
				console.warn('ERROR; ARTEService.getNew(); AJAX-request did not recieve a response');
			}
		});
	},

	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	_onARTEGetNew = function(origin, data, maxResults){
		// console.log('_onARTEGetNew');
				console.log('_onARTEGetNew(): ',data);
		var counter = 1;

		// try{

		// 	var response = $.parseJSON(data);
		// }catch(e){
		// 	console.log('JSON parse FAIL\n',e);
		// }

		// console.log(response.abstractBroadcastList.length);
		if(data !== undefined && data.abstractBroadcastList.length > 0){

			$.each(data.abstractBroadcastList, function(index, element) {
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
						if(resolution !== 0){
						
							var ti = ARTEmediathekModel.createTeaserImage(resolution, element.IMG.IUR);
					    	teaserImages.push(ti);
						}
					}catch(e){
					   // console.log('image fail\n',e);
					}
					try{	
						var resolution = _getResolution(element.VDO.programImage);
						if(resolution !== 0){
						
							var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.programImage);
					    	teaserImages.push(ti2);
						}
					}catch(e){
					   // console.log('image fail\n',e);
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.original);
						if(resolution !== 0){
						
							var ti3 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.VTU.original);
					    	teaserImages.push(ti3);
						}
					}catch(e){
					   // console.log('image fail\n',e);
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.IUR);if(resolution !== 0){
						
							var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.VTU.IUR);
					    	teaserImages.push(ti4);
						}

					}catch(e){
					   // console.log('image fail\n',e);
					}

					//get remaining infos
					try{
						details = element.VDO.VTX+': '+element.DSS;
					}catch(e){
					   // console.log('detail fail\n',e);
					}
					try{
						title = element.TIT;
					}catch(e){
					   // console.log('title fail\n',e);
					}
					try{
						assetID = element.programId;
					}catch(e){
					   // console.log('assetID fail\n',e);
					}
					try{
						length = _formatSeconds(String(element.VDS[0].VDU) * 60);
					}catch(e){
					   // console.log('length fail\n',e);
					}
					try{
						airtime = element.BDT;
						airtime = String(airtime).slice(0, airtime.length - 5);
						airtime = airtime.trim();
						// console.log('airtime: ',airtime);
					}catch(e){
					   // console.log('airtime fail\n',e);
					}
					try{
						station = element.POR;
					}catch(e){
					   // console.log('station fail\n',e);
					}
					try{
						subtitle = element.STL+' ('+element.VDO.genre+')';
					}catch(e){
					   // console.log('subtitle fail\n',e);
					}
					try{
						streamUrl = element.VDO.videoStreamUrl;
						// console.log('streamUrl: ', element.VDO.videoStreamUrl, ' = ',streamUrl);
					}catch(e){
					   // console.log('streamUrl fail\n',e);
					}
					
					// search Streams
					if(streamUrl !== '' && teaserImages.length > 0){
						_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
					}else{
						console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
					}

					counter++;
				}
				
			});
		}else{
			console.log('response was: ',data);
		}
	},

	_formatSeconds = function(seconds){
	    var date = new Date(1970,0,1);
	    date.setSeconds(seconds);
	    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
	},

	_searchARTEStreams = function(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl){
		var streams = [],
		_url = PROXY_URL + encodeURI(streamUrl);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {

				var response = $.parseJSON(data);
				// console.log(response);
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

					    		var stream = ARTEmediathekModel.createStream(basetype, type, quality, url, filesize);
					    		//console.log('basetype: ',basetype,', stream: ',stream._url);
								streams.push(stream);

				    		}
			    		}catch(e){
			    			//fuck.	
			    		}

					});
				}

				if(streams.length < 1){				
					// build alternative stream url:
					var position = streamUrl.indexOf('stream')+6;
					var newStreamUrl = [streamUrl.slice(0, position), '/player', streamUrl.slice(position)].join('');
					var _url2 = PROXY_URL + encodeURI(newStreamUrl);
					// console.log('New stream url: ',_url2);
					if(_url !== _url2){
						// console.log('ARTE; trying to search Streams with new streamUrl: ',_url2);
						_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, _url2);
					}else if(_url === _url2){
						console.log('ARTE; \'',title, '\' has ', streams.length, ' streams. \nCHECK: ',_url, ' AND ',_url2);
					}
				}
				else{
					_pushARTEResultToModel(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
				}

			},
			error: function(){
				console.warn('ERROR; ARTEService.getNew; AJAX-request did not recieve a response');
			}
		});

	},

	_pushARTEResultToModel = function(origin, station, title, subtitle, details, length, airtime, teaserImages, streams){
		// console.log('pushing to result model');
		// if(station !== 'null' && title !== 'null' && subtitle !== 'null' && details !== 'null' && length !== 'null' && airtime !== 'null' && teaserImages !== 'null' && streams && station && title && subtitle && details && length && airtime && teaserImages && streams){

			ARTEmediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
		// }
		// else{
		// console.log('some params missing @ ARTEService._pushARTEResultToModel: ', 'station: ', station, 'title: ', title, 'subtitle: ', subtitle, 'details: ', details, 'length: ', length, 'airtime: ', airtime, 'teaserImages: ', teaserImages, 'streams: ', streams);
		// }
		// console.log('number of streams: ',streams.length);
	},

	dispose = function() {
		that = {};
	};


	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;
	that.getNew = getNew;
	that.getHot = getHot;
	that.getCategories = getCategories;

	return that;

};