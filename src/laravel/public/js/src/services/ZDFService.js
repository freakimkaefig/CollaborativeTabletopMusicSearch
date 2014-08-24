
			    //TODO:
			    // Abfrage ob Ajax response bereits JSON oder nicht
			    // mehrere Suchbegriffe (wie verbinden)?
			    // Filter
			    // SendungenAbisZ-Suche?
			    // CHECK ob parseResponse() bereits Daten enthät die searchStream() nochmals abruft!?
			    // CHECK: nur mp4 Video links abspielbar!?

MediathekCrawler.ZDFService = function() {

	var that = {},
	ZDFSEARCHURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/detailsSuche?searchString=',
	ZDFSTREAMURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/beitragsDetails?id=',
	ZDFSEARCHNEWURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=',
	ZDFSEARCHHOTURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/meistGesehen?id=_GLOBAL&maxLength=',
	ZDFBROADCASTSPERCATEGORY = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=',
	ZDFVIDEOSPERBROADCAST = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=',
	// http://www.zdf.de/ZDFmediathek/xmlservice/web/sendungVerpasst?startdate=100814&enddate=120814&maxLength=50
	ZDFSEARCHBYDATE = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/sendungVerpasst?startdate=', //+startdate
	ZDFSEARCHBYDATE2 = '&enddate=', //+enddate
	ZDFSEARCHBYDATE3 = '&maxLength=', //+maxResults
	ZDFID = 322,
	ZDFNEOID = 857392,
	ZDFINFOID = 398,
	ZDFKULTURID = 1321386,
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
		console.info('MediathekCrawler.ZDFService.init');
		mediathekModel = mModel;
	},

	searchString = function(searchStr, maxResults){
		if(maxResults >= 50){
			maxResults = 50;
		}
		var origin = {
			_channel: 'ZDF',
			_method: 'searchString',
			_searchTerm: searchStr,
			_badge: null
		};
	    
		$.ajax({
			url: ZDFSEARCHURL+searchStr+'&maxLength='+String(maxResults),
			type: 'GET',
			success: function(data) {
				_parseResponse(origin, data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.searchString; AJAX-request did not recieve a response');
			}
		});
	},

	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	getZDFVideosByDate = function(maxResults, startdate, enddate){
		if(maxResults >= 50){
			maxResults = 50;
		}
		var origin = {};

		if(startdate.indexOf('-') > 0){
			startdate = _replaceAll('-','',startdate);
		}
		startYYYY = startdate.slice(2,4);
		startMM = startdate.slice(4,6);
		startDD = startdate.slice(6,8);
		startdate = startDD+startMM+startYYYY;
		// console.log('ZDF fixxed startdate: ',startdate);

		if(enddate.indexOf('-') > 0){
			enddate = _replaceAll('-','',enddate);
		}
		endYYYY = enddate.slice(2,4);
		endMM = enddate.slice(4,6);
		endDD = enddate.slice(6,8);
		enddate = endDD+endMM+endYYYY;
		// console.log('ZDF fixxed enddate: ',enddate);


		$.ajax({
			url: encodeURI(ZDFSEARCHBYDATE+String(startdate)+ZDFSEARCHBYDATE2+String(enddate)+ZDFSEARCHBYDATE3+String(maxResults)),
			type: 'GET',
			success: function(data) {
				// console.log('ZDF getZDFVideosByDate ajax succes, data: ',data);
				_parseResponse(origin, data);
			},
			error: function(){
				console.warn('ERROR; ZDFService.searchString; AJAX-request did not recieve a response');
			}
		});



	},

	_parseResponse = function(origin, data){
		// console.log('parsing response: ', data);
	    $xml = $(data);
	     //console.log(data);
	    if(typeof $xml  != 'undefined'){
	    	//each teaser = 1 search Result
	    	var x = $xml.find('teaser');
	    	x.each(function(){

				var teaserImages = [],
				details = '',
				title = '',
				assetID = 0,
				length = '',
				airtime = '',
				station = '',
				subtitle = '';

				// get all teaserImgs with resolution
		    	var y = $(this).find('teaserimage');
		    	y.each(function(){
				
					var res = $(this).attr('key');
			    	var imgUrl = $(this).text();
			    	if(res !== 0 && res.length > 6){

				    	//Array containing all the unsorted teaserImages as Objects(with resolution & url)
				    	var ti = mediathekModel.createTeaserImage(res, imgUrl);
				    	teaserImages.push(ti);
			    	}
				});

			    //get information
			    title = $(this).find('title').text();
			    details = $(this).find('detail').text();
			    station = $(this).find('channel').text();

			    //get assetid (for stream-url's)
			    assetID = $(this).find('assetId').text();

			    //get length
			    length = $(this).find('length').text();
			    if(length.indexOf(".") > 0){
			    	end = length.indexOf('.');
			    	length = length.substring(0, end);
			    }else if(length.indexOf('min') > 0){
			    	end = length.indexOf('min');
			    	length = _formatSeconds(length.substring(0, end-1) * 60);
			    }else if(length.length < 6 && length.indexOf('min') === -1 && length.indexOf(':') === -1){
			    	length = _formatSeconds(length * 60);
			    }
			    // console.log("ZDF _getDetailsAndStreamOfVideo length: ",length);

			    //get airtime
			    airtime = $(this).find('airtime').text();

			    //Fetch stream url's
			    // console.log('parsing response: ',assetID, title, subtitle, details, station, assetID, length, airtime, teaserImages);
			    _searchStream(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages);
			   
	    	}); //end foreach searchResult
		    	
	    } 
	    
	},

	_searchStream = function(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages){

		var streams = [];
		// console.log('ZDF _searchStream url: ',ZDFSTREAMURL+assetID);
		$.ajax({
			url: ZDFSTREAMURL+assetID,
			type: 'GET',
			success: function(data) {	
				$xml = $(data);

			    if(typeof $xml  != 'undefined'){

			    	var x = $xml.find('formitaet');
			    	x.each(function(){

			    		var basetype = '',
			    		quality = '',
			    		url = '',
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
			    				url = $(this).find('url').text();

		    					// console.log("ZDF searching streams");
		    					qualityText = $(this).find('quality').text();
		    					// console.log("ZDF quality: ",qualityText);
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
			    				// filter metafilegenerator-URLS (not streamable!)
			    				if(url.indexOf('metafilegenerator') == -1){
			    				
									filesize = $(this).find('filesize').text();
									// console.log('url: ', url);
									var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
						    		//console.log('basetype: ',basetype,', stream: ',stream._url);
									streams.push(stream);
			    				}
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
			    				type = null; //'video/webm'
			    				break;
			    				type = 'video/webm';
			    				url = $(this).find('url').text();

		    					// console.log("ZDF searching streams");
		    					qualityText = $(this).find('quality').text();
		    					// console.log("ZDF quality: ",qualityText);
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
			    				// filter metafilegenerator-URLS (not streamable!)
			    				if(url.indexOf('metafilegenerator') == -1){

									filesize = $(this).find('filesize').text();
									// console.log('url: ', url);
									var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
						    		//console.log('basetype: ',basetype,', stream: ',stream._url);
									streams.push(stream);
			    				}
			    				break;
			    			default:
			    				type = 'video/mp4';
			    				break;
			    		}

			    	}); // end foreach formitaet
					if(streams.length < 1){
						
						console.log('\'',title, '\' has ', streams.length, ' streams. \nCHECK: ',ZDFSTREAMURL+assetID);
					}
					else{
						// console.log('pushing to resultmodel: ',origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
						_pushResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					}
			    }
			},
			error: function(){
				console.warn('ERROR; ZDFService._searchStream; AJAX-request did not recieve a response');
			}
		});

	},

	_pushResultToModel = function(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		// console.log('pushing to result model');
		// if(station != 'null' && title != 'null' && subtitle != 'null' && details != 'null' && length != 'null' && airtime != 'null' && teaserImages != 'null' && streams && station && title && subtitle && details && length && airtime && teaserImages && streams){

			mediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
		// }
		// else{
			// console.log('some params missing @ ZDFService._pushResultToModel: ', 'station: ', station, 'title: ', title, 'subtitle: ', subtitle, 'details: ', details, 'length: ', length, 'airtime: ', airtime, 'teaserImages: ', teaserImages, 'streams: ', streams);
		// }
		// console.log('number of streams: ',streams.length);
	},

	getHot = function(maxResults){

				// console.log('ZDF getHot');
		if(maxResults >50){
			maxResults = 50;
		} 
		var origin = {
			_channel: 'ZDF',
			_method: 'getHot',
			_searchTerm: null,
			_badge: 'hot'
		};

		$.ajax({
			url: ZDFSEARCHHOTURL+String(maxResults)+'&offset=1',
			type: 'GET',
			success: function(data) {
				// console.log('ZDF getHot data: ',data, ZDFSEARCHHOTURL+String(maxResults)+'&offset=1');
				_parseResponse(origin, data);
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
		var origin = {
			_channel: 'ZDF',
			_method: 'getNew',
			_searchTerm: null,
			_badge: 'new'
		};
		if(maxResults > 1){
			maxResults = parseInt(maxResults / 4);

			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFID+'&maxLength='+String(maxResults),
				type: 'GET',
				success: function(data) {
					_parseResponse(origin, data);
				},
				error: function(){
					console.warn('ERROR; ZDFService.getNew; ZDF; AJAX-request did not recieve a response');
				}
			});
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFNEOID+'&maxLength='+String(maxResults),
				type: 'GET',
				success: function(data) {
					_parseResponse(origin, data);
				},
				error: function(){
					console.warn('ERROR; ZDFService.getNew; ZDFNEO; AJAX-request did not recieve a response');
				}
			});
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFKULTURID+'&maxLength='+String(maxResults),
				type: 'GET',
				success: function(data) {
					_parseResponse(origin, data);
				},
				error: function(){
					console.warn('ERROR; ZDFService.getNew; ZDFKULTUR; AJAX-request did not recieve a response');
				}
			});
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFINFOID+'&maxLength='+String(maxResults),
				type: 'GET',
				success: function(data) {
					_parseResponse(origin, data);
				},
				error: function(){
					console.warn('ERROR; ZDFService.getNew; ZDFINFO; AJAX-request did not recieve a response');
				}
			});
		}else{
			// console.log('ZDF getNew with maxResults = ',maxResults, ZDFSEARCHNEWURL+ZDFID+'&maxLength=1');
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFID+'&maxLength=1',
				type: 'GET',
				success: function(data) {
					_parseResponse(origin, data);
				},
				error: function(){
					console.warn('ERROR; ZDFService.getNew; ZDF with maxResults = 1; AJAX-request did not recieve a response');
				}
			});
		}
	},

	getCategories = function(_category, maxVidProSendung) {
		var origin = {
			_channel: 'ZDF',
			_method: 'getCategories',
			_searchTerm: _category,
			_badge: null
		};
		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if(find.length > 0) {
			// console.log(find[0]._assetId);
			$.each(find[0]._assetId, function(index,value){
				_getBroadcastOfCategory(origin, value, maxVidProSendung);
			});

		} else {
			console.warn('ERROR; ZDFService.getCategories; Category not found');
		}
	},

	_getBroadcastOfCategory = function(origin, assetId, maxVidProSendung){
		// console.log(assetId);
		$.ajax({
			// maxLength: max results of broadcasts per category
			url: ZDFBROADCASTSPERCATEGORY+String(assetId)+'&maxLength=50',
			type: 'GET',
			success: function(data) {
				$xml = $(data);
	     		//console.log(data);
			    if(typeof $xml  != 'undefined'){
			    	//each teaser = 1 search Result
			    	var x = $xml.find('teaser');
			    	x.each(function(){

						var	assetID = 0;

					    //get assetid (for stream-url's)
					    assetID = $(this).find('assetId').text();

					    _getVideosOfBroadcast(origin, assetID, maxVidProSendung);
			    	}); 
				    	
			    }

			},
			error: function(){
				console.warn('ERROR; ZDFService._getBroadcastOfCategory; AJAX-request did not recieve a response');
			}
		});
		
	},

	_getVideosOfBroadcast = function(origin, assetId, maxVidProSendung){
		
		$.ajax({
			url: ZDFVIDEOSPERBROADCAST+String(assetId)+'&maxLength='+String(maxVidProSendung),
			type: 'GET',
			success: function(data) {
				$xml = $(data);
	     		//console.log(data);
			    if(typeof $xml  != 'undefined'){
			    	//each teaser = 1 search Result
			    	var x = $xml.find('teaser');
			    	x.each(function(){

						var	assetID = 0;

					    //get assetid (for stream-url's)
					    assetID = $(this).find('assetId').text();

					    _getDetailsAndStreamOfVideo(origin, assetID);
			    	}); 
				    	
			    }
			},
			error: function(){
				console.warn('ERROR; ZDFService._getVideosOfBroadcast; AJAX-request did not recieve a response');
			}
		});
	},

	_getDetailsAndStreamOfVideo = function(origin, assetId){
		
		$.ajax({
			url: ZDFSTREAMURL+assetId,
			type: 'GET',
			success: function(data) {
				$xml = $(data);
			    //console.log(data);
			    if(typeof $xml  != 'undefined'){
			    	//each teaser = 1 search Result
			    	var x = $xml.find('video');
			    	x.each(function(){

						var teaserImages = [],
						details = '',
						title = '',
						assetID = 0,
						length = '',
						airtime = '',
						station = '',
						subtitle = '',
						streams = [];

						// get all teaserImgs with resolution
						var y = $(this).find('teaserimage');
				    	y.each(function(){
						
							var res = $(this).attr('key');
					    	var imgUrl = $(this).text();
					    	if(res !== 0 && res.length > 6){

						    	//Array containing all the unsorted teaserImages as Objects(with resolution & url)
						    	var ti = mediathekModel.createTeaserImage(res, imgUrl);
						    	teaserImages.push(ti);
					    	}
						});

					    //get information
					    title = $(this).find('title').text();
					    details = $(this).find('detail').text();
					    station = $(this).find('channel').text();

					    //get assetid (for stream-url's)
					    assetID = $(this).find('assetId').text();

					    //get length
					    length = $(this).find('length').text();
					    if(length.indexOf(".") > 0){
					    	end = length.indexOf('.');
					    	length = length.substring(0, end);
					    }else if(length.indexOf('min') > 0){
					    	end = length.indexOf('min');
					    	length = _formatSeconds(length.substring(0, end-1) * 60);
					    }
					    // console.log("ZDF _getDetailsAndStreamOfVideo length: ",length);

					    //get airtime
					    airtime = $(this).find('airtime').text();

					    //Fetch stream url's
					    // console.log('_getDetailsAndStreamOfVideo: ',assetID, title, subtitle, details, station, assetID, length, airtime, teaserImages);
					    _searchStream(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages);
					   
			    	});
				    	
			    } //end if
			},
			error: function(){
				console.warn('ERROR; ZDFService._getDetailsAndStreamOfVideo; ZDFINFO; AJAX-request did not recieve a response');
			}
		});
	},

	_formatSeconds = function(seconds){
	    var date = new Date(1970,0,1);
	    date.setSeconds(seconds);
	    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
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
	that.getZDFVideosByDate = getZDFVideosByDate;

	return that;

};