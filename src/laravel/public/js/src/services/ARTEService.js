MediathekCrawler.ARTEService = function() {

	var that = {},
	ARTEmediathekModel = null,
	ARTESEARCHNEW = 'http://www.arte.tv/papi/tvguide/epg/schedule/D/L3/',
	ARTESEARCHSTRING = 'http://www.arte.tv/papi/tvguide/videos/plus7/search/D/L1/', // +KEYWORD
	ARTESEARCHSTRING2 = '/ALL/ALL/-1/AIRDATE_DESC/', // +maxResults (+'/YYYY-MM-DD'; not working atm!)
	ARTESEARCHSTRING3 = '/0.json',
	ARTESEARCHHOT = 'http://www.arte.tv/papi/tvguide/videos/plus7/D/L2/ALF/ALL/-1/VIEWS/', // +maxResults
	ARTESEARCHHOT2 = '/0.json',
	ARTESEARCHCATEGORY = 'http://www.arte.tv/papi/tvguide/videos/plus7/D/L2/',
	ARTESEARCHCATEGORY2 = '/ALL/-1/VIEWS/10/0.json',
	PROXY_URL = '/proxy.php?url=',
	STATION ='ARTE',
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

	/**
	 * Function to get Videos within a date-range
	 * @param {String|Date}	startdate (YYYY.MM.DD)
	 */
	getVideosByDate = function(maxResults, startdate, enddate){
		if(startdate.indexOf('.') > 0){
			startdate = _replaceAll('.','-',startdate);
		}
		if(startdate.indexOf('/') > 0){
			startdate = _replaceAll('/','-',startdate);
		}
		if(enddate.indexOf('.') > 0){
			enddate = _replaceAll('.','-',enddate);
		}
		if(enddate.indexOf('/') > 0){
			enddate = _replaceAll('/','-',enddate);
		}

		this.getNew(maxResults, startdate, enddate);

	},

	_checkARTEStartDate = function(startdate){
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



		return startdate;
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
	     		var response = $.parseJSON(data);
				// console.log('DATA _getARTEBroadcastOfCategory ', typeof response, response);
				var y = response.videoList;
				if(y.length > 0){
					// console.log('category url: ',ARTESEARCHCATEGORY+String(category)+ARTESEARCHCATEGORY2);
					$.each(y, function(index, element) {

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
							if(resolution !== 0 && resolution.length > 6){
								
								var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
						    	teaserImages.push(ti2);
							}
						}catch(e){
						   // console.log(e);
						}
						try{	
							var resolution = _getResolution(element.element.VTU.IUR);
							// console.log('res: ',resolution);
							if(resolution !== 0 && resolution.length > 6){

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
							if(airtime.indexOf('/') > 0){
								airtime = _replaceAll('/','.', airtime);
							}
							airtime = airtime.slice(0,airtime.length - 3);
							// console.log('airtime: ',airtime);
						}catch(e){
						   // console.log(e);
						}
						try{
							station = STATION;
						}catch(e){
						   // console.log(e);
						}
						try{
							subtitle = element.VSU;
							if(subtitle === undefined){
								subtitle = '';
							}
							subtitle = subtitle +' ('+element.VCG+')';;
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
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ARTEService._getARTEBroadcastOfCategory; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	getHot = function(maxResults){
		// console.log("gethot");
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
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; ARTEService.getHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});
	},

	_onARTEGetHot = function(origin, data){
		var response = $.parseJSON(data);
		var x = response.videoList;
		if(x.length > 0){

			$.each(x, function(index, element) {

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
					if(resolution !== 0 && resolution.length > 6){
						
						var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
				    	teaserImages.push(ti2);
					}
				}catch(e){
				   // console.log(e);
				}
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					// console.log('res: ',resolution);
					if(resolution !== 0 && resolution.length > 6){

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
					if(airtime.indexOf('/') > 0){
						airtime = _replaceAll('/','.',airtime);
					}
					airtime = airtime.slice(0,airtime.length - 3);
					// console.log('airtime: ',airtime);
				}catch(e){
				   // console.log(e);
				}
				try{
					station = STATION;
				}catch(e){
				   // console.log(e);
				}
				try{
					subtitle = element.VSU;
					if(subtitle === undefined){
						subtitle = '';
					}
					subtitle = subtitle +' ('+element.VCG+')';;
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
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; ARTEService.searchString; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});
	},

	_onARTESearchString = function(origin, data){
		var x = data.videoList;
		if(x.length > 0){

			$.each(x, function(index, element) {

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
					if(resolution !== 0 && resolution.length > 6){
						// console.log('IMAGE URL: ',element.programImage);
						var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
				    	teaserImages.push(ti2);
					}
				}catch(e){
				   // console.log(e);
				}
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					// console.log('res: ',resolution);
					if(resolution !== 0 && resolution.length > 6){

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
					if(airtime.indexOf('/') > 0){
						airtime = _replaceAll('/','.', airtime);
					}
					airtime = airtime.slice(0,airtime.length - 3);
					// console.log('airtime: ',airtime);
				}catch(e){
				   // console.log(e);
				}
				try{
					station = STATION;
				}catch(e){
				   // console.log(e);
				}
				try{
					subtitle = element.VSU
					if(subtitle === undefined){
						subtitle = '';
					}
					subtitle = subtitle +' ('+element.VCG+')';;
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
			console.log('ARTE; ERROR _getResolution() - url: ',url, ', e: ',e);
			return 0;
		}
	},

	/*
	Gets videos from the last 3 days, starting & including today
	*/
	getNew = function(maxResults, startdate, enddate){
		var _startdate = startdate;
		var _enddate = enddate;
		// console.log('ARTE dates: ',startdate, enddate);
		var origin = {};

		if(!_startdate || _startdate === undefined || _startdate === '' || _startdate === null || !_enddate || _enddate === undefined || _enddate === '' || _enddate === null)
		{
			origin = {
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
			_enddate = today;

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
			_startdate = dayBeforeYesterday;
		}

		// build search-url
		var _url = PROXY_URL + encodeURI(ARTESEARCHNEW+String(_startdate)+'/'+String(_enddate)+'.json');
		// console.log('ARTEService; getNew: ', _url);

		$.ajax({
			url: _url,
			type: 'GET',
			cache: false,
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				_onARTEGetNew(origin, data, maxResults);
				// console.log('ajax succes: \n','\n',_url);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ARTEService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	_onARTEGetNew = function(origin, data, maxResults){
				// console.log('_onARTEGetNew(): ',data);
		var counter = 1;
		var x = data.abstractBroadcastList;
		if(data !== undefined && x.length > 0){

			$.each(x, function(index, element) {
				// console.log('_onARTEGetNew: ',counter, x.length);
				if(counter <= maxResults){
				// console.log('ARTE _onARTEGetNew: ',element);

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
						if(resolution !== 0 && resolution.length > 6){
						
							var ti = ARTEmediathekModel.createTeaserImage(resolution, element.IMG.IUR);
					    	teaserImages.push(ti);
						}
					}catch(e){
					   // console.log('image fail\n',e);
					}
					try{	
						var resolution = _getResolution(element.VDO.programImage);
						if(resolution !== 0 && resolution.length > 6){
						
							var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.programImage);
					    	teaserImages.push(ti2);
						}
					}catch(e){
					   // console.log('image fail\n',e);
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.original);
						if(resolution !== 0 && resolution.length > 6){
						
							var ti3 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.VTU.original);
					    	teaserImages.push(ti3);
						}
					}catch(e){
					   // console.log('image fail\n',e);
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.IUR);
						if(resolution !== 0 && resolution.length > 6){
						
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
						if(airtime.indexOf('/') > 0){
							airtime = _replaceAll('/','.',airtime);
						}
						airtime = airtime.slice(0,airtime.length - 3);
						// console.log('airtime: ',airtime);
					}catch(e){
					   // console.log('airtime fail\n',e);
					}
					try{
						station = STATION;
					}catch(e){
					   // console.log('station fail\n',e);
					}
					try{
						subtitle = element.STL
						if(subtitle === undefined){
							subtitle = '';
						}
						subtitle = subtitle + ' ('+element.VDO.genre+')';
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
					if(streamUrl !== '' || teaserImages.length < 0){
						_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
					}else{
						console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
					}
					counter++;

				}
				
			});
			// console.log('ARTE _ongetNew - finished loop through data.abstractBroadcastList!');
		}else{
			console.log('ARTE _ongetNew - response was: ',data);
		}
	},

	_formatSeconds = function(seconds){
	    var date = new Date(1970,0,1);
	    date.setSeconds(seconds);
	    var temp = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
	    return temp;
	},

	_searchARTEStreams = function(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl){
		var streams = [],
		response = null,
		_url = PROXY_URL + encodeURI(streamUrl);
		// console.log('ARTE _searchARTEStreams URL: ',_url);
		$.ajax({
			url: _url,
			type: 'GET',
			cache: false,
			success: function(data) {

				try{
					response = $.parseJSON(data);
				}catch(e){
					response = data;
				}
				// console.log('ARTE _searchARTEStreams: ',response);
				try{
					var x = response.video.VSR;
					if(x.length > 0){

						$.each(x, function(index, element) {
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
				}catch(e){
					
				}

				if(streams.length < 1){				
					// build alternative stream url:
					var position = streamUrl.indexOf('stream')+6;
					var newStreamUrl = [streamUrl.slice(0, position), '/player', streamUrl.slice(position)].join('');
					var _url2 = newStreamUrl;
					// console.log('New stream url: ',_url2);
					if(_url !== PROXY_URL + encodeURI(_url2) && _url2.length > 15){
						// console.log('ARTE; trying to search Streams with new streamUrl: ',_url2);
						// _searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, _url2);
					}else if(_url === _url2){
						// console.log('ARTE; \'',title, '\' has ', streams.length, ' streams. \nCHECK: ',_url, '\nAND ',_url2);
					}
				}
				else{
					// console.log('ARTE results: ',origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
					_pushARTEResultToModel(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
				}

			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ARTEService._searchARTEStreams; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
		// console.log('ARTE _searchARTEStreams - finished ajax request')

	},

	_pushARTEResultToModel = function(origin, station, title, subtitle, details, length, airtime, teaserImages, streams){
			ARTEmediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
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
	that.getVideosByDate = getVideosByDate;

	return that;

};