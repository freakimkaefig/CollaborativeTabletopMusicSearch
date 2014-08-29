MediathekCrawler.ARTEService = function() {

	var that = {},
	ARTEmediathekModel = null,
	ARTESEARCHNEW = 'http://www.arte.tv/papi/tvguide/epg/schedule/D/L3/',
	ARTESEARCHSTRING = 'http://www.arte.tv/papi/tvguide/videos/plus7/search/D/L1/',
	ARTESEARCHSTRING2 = '/ALL/ALL/-1/AIRDATE_DESC/',
	ARTESEARCHSTRING3 = '/0.json',
	ARTESEARCHHOT = 'http://www.arte.tv/papi/tvguide/videos/plus7/D/L2/ALF/ALL/-1/VIEWS/',
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
		ARTEmediathekModel = mModel;
	},

	/**
	 * Function to get videos within a date-range
	 * @param {String|Integer} maxResults
	 * @param {String|Date}	startdate (DD.MM.YYYY)
	 * @param {String|Date} enddate (DD.MM.YYYY)
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

	/**
	 * Function to check date formatting & fix it
	 * @param {String|Date}	date
	 */
	_checkARTEStartDate = function(date){
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



		return date;
	},

	/**
	 * Function to check if a category is available
	 * @param {String} _category
	 */
	getCategories = function(_category) {
		var origin = {
			_channel: 'ARTE',
			_method: 'getCategories',
			_searchTerm: _category,
			_badge: null
		};
		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if(find.length > 0) {
			$.each(find[0]._value, function(index,value){
				_getARTEBroadcastOfCategory(origin, value);
			});

		} else {
			console.warn('ERROR; ARTEService.getCategories; Category not found');
		}
	},

	/**
	 * Function to get details of videos
	 * @param {Object} origin
	 * @param {String}	category
	 */
	_getARTEBroadcastOfCategory = function(origin, category){
		$.ajax({
			url: PROXY_URL + encodeURI(ARTESEARCHCATEGORY+String(category)+ARTESEARCHCATEGORY2),
			type: 'GET',
			cache: false,
			success: function(data) {
	     		try{
	     			var response = $.parseJSON(data);
	     		}catch(e){
	     			var response = data;
	     		}
				var y = response.videoList;
				if(y.length > 0){
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

						try{	
							var resolution = _getResolution(element.programImage);
							if(resolution !== 0 && resolution.length > 6){
								
								var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
						    	teaserImages.push(ti2);
							}
						}catch(e){
						}
						try{	
							var resolution = _getResolution(element.element.VTU.IUR);
							// console.log('res: ',resolution);
							if(resolution !== 0 && resolution.length > 6){

								var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VTU.IUR);
						    	teaserImages.push(ti4);
							}

						}catch(e){
						}
						try{
							details = element.VDE;
						}catch(e){
						}
						try{
							title = element.VTI;
						}catch(e){
						}
						try{
							assetID = element.VPI;
						}catch(e){
						}
						try{
							length = _formatSeconds(String(element.VDU) * 60);
						}catch(e){
						}
						try{
							airtime = element.VDA;
							airtime = String(airtime).slice(0, airtime.length - 5);
							airtime = airtime.trim();
							if(airtime.indexOf('/') > 0){
								airtime = _replaceAll('/','.', airtime);
							}
							airtime = airtime.slice(0,airtime.length - 3);
						}catch(e){
						}
						try{
							station = STATION;
						}catch(e){
						}
						try{
							subtitle = element.VSU;
							if(subtitle === undefined){
								subtitle = '';
							}
							subtitle = subtitle +' ('+element.VCG+')';;
						}catch(e){
						}
						try{
							streamUrl = element.videoStreamUrl;
						}catch(e){
						}
						
						if(streamUrl !== ''){
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

	/**
	 * Function to get 'hot' videos
	 * @param {String|Integer} maxResults
	 */
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
			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					_onARTEGetHot(origin, data);
					
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; ARTEService.getHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});
	},

	/**
	 * Function to get details for 'hot' videos
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
	_onARTEGetHot = function(origin, data){
		try{
			var response = $.parseJSON(data);
		}catch(e){
			var response = data;
		}
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

				try{	
					var resolution = _getResolution(element.programImage);
					if(resolution !== 0 && resolution.length > 6){
						
						var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
				    	teaserImages.push(ti2);
					}
				}catch(e){
				}
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					if(resolution !== 0 && resolution.length > 6){

						var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VTU.IUR);
				    	teaserImages.push(ti4);
					}

				}catch(e){
				}
				try{
					details = element.VDE;
				}catch(e){
				}
				try{
					title = element.VTI;
				}catch(e){
				}
				try{
					assetID = element.VPI;
				}catch(e){
				}
				try{
					length = _formatSeconds(String(element.VDU) * 60);
				}catch(e){
				}
				try{
					airtime = element.VDA;
					airtime = String(airtime).slice(0, airtime.length - 5);
					airtime = airtime.trim();
					if(airtime.indexOf('/') > 0){
						airtime = _replaceAll('/','.',airtime);
					}
					airtime = airtime.slice(0,airtime.length - 3);
				}catch(e){
				}
				try{
					station = STATION;
				}catch(e){
				}
				try{
					subtitle = element.VSU;
					if(subtitle === undefined){
						subtitle = '';
					}
					subtitle = subtitle +' ('+element.VCG+')';;
				}catch(e){
				}
				try{
					streamUrl = element.videoStreamUrl;
				}catch(e){
				}
				
				if(streamUrl !== ''){
					_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
				}else{
					console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
				}

			});
		}		
	},

	/**
	 * Function to search videos by keyword
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
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
			$.ajax({
				url: _url,
				type: 'GET',
				dataType: 'json',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					_onARTESearchString(origin, data);
					
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; ARTEService.searchString; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});
	},

	/**
	 * Function to get details for videos searched by keyword
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
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

				try{	
					var resolution = _getResolution(element.programImage);
					if(resolution !== 0 && resolution.length > 6){
						var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.programImage);
				    	teaserImages.push(ti2);
					}
				}catch(e){
				}
				try{	
					var resolution = _getResolution(element.element.VTU.IUR);
					if(resolution !== 0 && resolution.length > 6){

						var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VTU.IUR);
				    	teaserImages.push(ti4);
					}

				}catch(e){
				}
				try{
					details = element.VDE;
				}catch(e){
				}
				try{
					title = element.VTI;
				}catch(e){
				}
				try{
					assetID = element.VPI;
				}catch(e){
				}
				try{
					length = _formatSeconds(String(element.VDU) * 60);
				}catch(e){
				}
				try{
					airtime = element.VDA;
					airtime = String(airtime).slice(0, airtime.length - 5);
					airtime = airtime.trim();
					if(airtime.indexOf('/') > 0){
						airtime = _replaceAll('/','.', airtime);
					}
					airtime = airtime.slice(0,airtime.length - 3);
				}catch(e){
				}
				try{
					station = STATION;
				}catch(e){
				}
				try{
					subtitle = element.VSU
					if(subtitle === undefined){
						subtitle = '';
					}
					subtitle = subtitle +' ('+element.VCG+')';;
				}catch(e){
				}
				try{
					streamUrl = element.videoStreamUrl;
				}catch(e){
				}
				
				if(streamUrl !== ''){
					_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
				}else{
					console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
				}

			});
		}		
	},

	/**
	 * Function to get resolution of certain img-urls
	 * @param {String} url
	 */
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
				return resolution;
			}else{
				return 0;
			}
		}catch(e){
			console.log('ARTE; ERROR _getResolution() - url: ',url, ', e: ',e);
			return 0;
		}
	},

	/**
	 * Function to get 'new' videos
	 * @param {String|Integer} maxResults
	 * @param {String|Date}	startdate (DD.MM.YYYY)
	 * @param {String|Date} enddate (DD.MM.YYYY)
	 */
	getNew = function(maxResults, startdate, enddate){
		var _startdate = startdate;
		var _enddate = enddate;
		var origin = {};

		if(!_startdate || _startdate === undefined || _startdate === '' || _startdate === null || !_enddate || _enddate === undefined || _enddate === '' || _enddate === null)
		{
			origin = {
				_channel: 'ARTE',
				_method: 'getNew',
				_searchTerm: null,
				_badge: 'new'
			};
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

		var _url = PROXY_URL + encodeURI(ARTESEARCHNEW+String(_startdate)+'/'+String(_enddate)+'.json');

		$.ajax({
			url: _url,
			type: 'GET',
			cache: false,
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				_onARTEGetNew(origin, data, maxResults);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ARTEService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to replace chars with other chars within a given string using regular expression
	 * @param {String} find
	 * @param {String} replace
	 * @param {String} str
	 */
	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	/**
	 * Function to get details for 'new' videos
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 * @param {String|Integer} maxResults
	 */
	_onARTEGetNew = function(origin, data, maxResults){
		var counter = 1;
		var x = data.abstractBroadcastList;
		if(data !== undefined && x.length > 0){

			$.each(x, function(index, element) {
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

					try{
						var resolution = _getResolution(element.IMG.IUR);
						if(resolution !== 0 && resolution.length > 6){
						
							var ti = ARTEmediathekModel.createTeaserImage(resolution, element.IMG.IUR);
					    	teaserImages.push(ti);
						}
					}catch(e){
					}
					try{	
						var resolution = _getResolution(element.VDO.programImage);
						if(resolution !== 0 && resolution.length > 6){
						
							var ti2 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.programImage);
					    	teaserImages.push(ti2);
						}
					}catch(e){
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.original);
						if(resolution !== 0 && resolution.length > 6){
						
							var ti3 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.VTU.original);
					    	teaserImages.push(ti3);
						}
					}catch(e){
					}
					try{
						var resolution = _getResolution(element.VDO.VTU.IUR);
						if(resolution !== 0 && resolution.length > 6){
						
							var ti4 = ARTEmediathekModel.createTeaserImage(resolution, element.VDO.VTU.IUR);
					    	teaserImages.push(ti4);
						}

					}catch(e){
					}

					try{
						details = element.VDO.VTX+': '+element.DSS;
					}catch(e){
					}
					try{
						title = element.TIT;
					}catch(e){
					}
					try{
						assetID = element.programId;
					}catch(e){
					}
					try{
						length = _formatSeconds(String(element.VDS[0].VDU) * 60);
					}catch(e){
					}
					try{
						airtime = element.BDT;
						airtime = String(airtime).slice(0, airtime.length - 5);
						airtime = airtime.trim();
						if(airtime.indexOf('/') > 0){
							airtime = _replaceAll('/','.',airtime);
						}
						airtime = airtime.slice(0,airtime.length - 3);
					}catch(e){
					}
					try{
						station = STATION;
					}catch(e){
					}
					try{
						subtitle = element.STL
						if(subtitle === undefined){
							subtitle = '';
						}
						subtitle = subtitle + ' ('+element.VDO.genre+')';
					}catch(e){
					}
					try{
						streamUrl = element.VDO.videoStreamUrl;
					}catch(e){
					}
					
					if(streamUrl !== '' || teaserImages.length < 0){
						_searchARTEStreams(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
					}else{
						console.log('Could not fetch streamURL for ', title, ' with ID: ',assetID);
					}
					counter++;

				}
				
			});
		}else{
			console.log('ARTE _ongetNew - response was: ',data);
		}
	},

	/**
	 * Function to format given seconds into 'hh:mm:ss'
	 * @param {String|Integer} seconds
	 */
	_formatSeconds = function(seconds){
	    var date = new Date(1970,0,1);
	    date.setSeconds(seconds);
	    var temp = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
	    return temp;
	},

	/**
	 * Function to get streams for video entries
	 * @param {Object} origin
	 * @param {String} assetID
	 * @param {String} title
	 * @param {String} subtitle
	 * @param {String} details
	 * @param {String} station
	 * @param {String} length
	 * @param {String} airtime
	 * @param {Array} teaserImages
	 * @param {String} streamUrl
	 */
	_searchARTEStreams = function(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl){
		var streams = [],
		response = null,
		_url = PROXY_URL + encodeURI(streamUrl);
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
									streams.push(stream);

					    		}
				    		}catch(e){
				    		}

						});
					}
				}catch(e){
					
				}

				if(streams.length < 1){				
					var position = streamUrl.indexOf('stream')+6;
					var newStreamUrl = [streamUrl.slice(0, position), '/player', streamUrl.slice(position)].join('');
					var _url2 = newStreamUrl;
					
				}else{
					_pushARTEResultToModel(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
				}

			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ARTEService._searchARTEStreams; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});

	},

	/**
	 * Function to push videos to mainmodel
	 * @param {Object} origin
	 * @param {String} assetID
	 * @param {String} title
	 * @param {String} subtitle
	 * @param {String} details
	 * @param {String} station
	 * @param {String} length
	 * @param {String} airtime
	 * @param {Array} teaserImages
	 * @param {Array} streams
	 */
	_pushARTEResultToModel = function(origin, station, title, subtitle, details, length, airtime, teaserImages, streams){
			ARTEmediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
	},

	/**
	 * Function to reset the instance of ARTEService
	 */
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