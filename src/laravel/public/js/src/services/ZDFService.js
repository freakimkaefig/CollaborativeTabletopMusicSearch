MediathekCrawler.ZDFService = function() {

	var that = {},
	ZDFSEARCHURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/detailsSuche?searchString=',
	ZDFSTREAMURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/beitragsDetails?id=',
	ZDFSEARCHNEWURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=',
	ZDFSEARCHHOTURL = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/meistGesehen?id=_GLOBAL&maxLength=',
	ZDFBROADCASTSPERCATEGORY = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=',
	ZDFVIDEOSPERBROADCAST = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/aktuellste?id=',
	ZDFSEARCHBYDATE = 'http://www.zdf.de/ZDFmediathek/xmlservice/web/sendungVerpasst?startdate=', 
	ZDFSEARCHBYDATE2 = '&enddate=',
	ZDFSEARCHBYDATE3 = '&maxLength=',
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
		mediathekModel = mModel;
	},

	/**
	 * Function to search videos by a given keyword
	 * @param {String} searchStr
	 * @param {String|Integer} maxResults
	 */
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
			cache: false,
			success: function(data) {
				_parseResponse(origin, data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.searchString; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to replace chars within a given string
	 * @param {String} find
	 * @param {String} replace
	 * @param {String} str
	 */
	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	/**
	 * Function to get videos by date
	 * @param {String|Integer} maxResults
	 * @param {String|Date} startdate (MM.DD.YYYY)
	 * @param {String|Date} enddate (MM.DD.YYYY)
	 */
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

		if(enddate.indexOf('-') > 0){
			enddate = _replaceAll('-','',enddate);
		}
		endYYYY = enddate.slice(2,4);
		endMM = enddate.slice(4,6);
		endDD = enddate.slice(6,8);
		enddate = endDD+endMM+endYYYY;


		$.ajax({
			url: encodeURI(ZDFSEARCHBYDATE+String(startdate)+ZDFSEARCHBYDATE2+String(enddate)+ZDFSEARCHBYDATE3+String(maxResults)),
			type: 'GET',
			cache: false,
			success: function(data) {
				_parseResponse(origin, data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.getZDFVideosByDate; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});



	},

	/**
	 * Function to get details for videos
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
	_parseResponse = function(origin, data){
	    $xml = $(data);
	    if(typeof $xml  != 'undefined'){
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

			    //get airtime
			    airtime = $(this).find('airtime').text();

			    //Fetch stream url's
			    _searchStream(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages);
			   
	    	}); 
	    } 
	},

	/**
	 * Function to get streams of videos
	 * @param {Object} origin
	 * @param {String} assetID
	 * @param {String} title
	 * @param {String} subtitle
	 * @param {String} details
	 * @param {String} station
	 * @param {String} length
	 * @param {String} airtime
	 * @param {Array} teaserImages
	 */
	_searchStream = function(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages){

		var streams = [];
		$.ajax({
			url: ZDFSTREAMURL+assetID,
			type: 'GET',
			cache: false,
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
			    				type = null;	
			    				break;
			    			case 'h264_aac_f4f_http_f4m_http':
			    				type = null;	
			    				break;
			    			case 'h264_aac_mp4_http_na_na':
			    				type = 'video/mp4';
			    				url = $(this).find('url').text();
		    					qualityText = $(this).find('quality').text();
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
									var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
									streams.push(stream);
			    				}
			    			case 'h264_aac_mp4_rtmp_smil_http':
			    				type = null;
			    				break;
			    			case 'h264_aac_mp4_rtmp_zdfmeta_http':
			    				type = null;
			    				break;
			    			case 'h264_aac_mp4_rtsp_mov_http':
			    				type = null;
			    				break;
			    			case 'h264_aac_ts_http_m3u8_http':
			    				type = null;
			    				break;
			    			case 'vp8_vorbis_webm_http_na_na':
			    				type = null;
			    				break;
			    				type = 'video/webm';
			    				url = $(this).find('url').text();

		    					qualityText = $(this).find('quality').text();
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
									var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
									streams.push(stream);
			    				}
			    				break;
			    			default:
			    				type = 'video/mp4';
			    				break;
			    		}

			    	});
					if(streams.length < 1){
					}
					else{
						_pushResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					}
			    }
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService._searchStream; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
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
	_pushResultToModel = function(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){

			mediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
	},

	/**
	 * Function to get 'hot' videos
	 * @param {String|Integer} maxResults
	 */
	getHot = function(maxResults){
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
			cache: false,
			success: function(data) {
				_parseResponse(origin, data);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.getHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get 'new' videos
	 * @param {String|Integer} maxResults
	 */
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
				cache: false,
				success: function(data) {
					_parseResponse(origin, data);
				},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
			});
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFNEOID+'&maxLength='+String(maxResults),
				type: 'GET',
				cache: false,
				success: function(data) {
					_parseResponse(origin, data);
				},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
			});
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFKULTURID+'&maxLength='+String(maxResults),
				type: 'GET',
				cache: false,
				success: function(data) {
					_parseResponse(origin, data);
				},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
			});
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFINFOID+'&maxLength='+String(maxResults),
				type: 'GET',
				cache: false,
				success: function(data) {
					_parseResponse(origin, data);
				},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
			});
		}else{
			$.ajax({
				url: ZDFSEARCHNEWURL+ZDFID+'&maxLength=1',
				type: 'GET',
				cache: false,
				success: function(data) {
					_parseResponse(origin, data);
				},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
			});
		}
	},

	/**
	 * Function to check if a given category is available
	 * @param {String} _category
	 * @param {String} maxVidProSendung
	 */
	getCategories = function(_category, maxVidProSendung) {
		var origin = {
			_channel: 'ZDF',
			_method: 'getCategories',
			_searchTerm: _category,
			_badge: null
		};
		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if(find.length > 0) {
			$.each(find[0]._assetId, function(index,value){
				_getBroadcastOfCategory(origin, value, maxVidProSendung);
			});

		} else {
			console.warn('ERROR; ZDFService.getCategories; Category not found');
		}
	},

	/**
	 * Function to get assetID of videobroadcasts matching a category
	 * @param {Object} origin
	 * @param {String} assetID
	 * @param {String} maxVidProSendung
	 */
	_getBroadcastOfCategory = function(origin, assetId, maxVidProSendung){
		$.ajax({
			// maxLength: max results of broadcasts per category
			url: ZDFBROADCASTSPERCATEGORY+String(assetId)+'&maxLength=50',
			type: 'GET',
			cache: false,
			success: function(data) {
				$xml = $(data);
			    if(typeof $xml  != 'undefined'){
			    	var x = $xml.find('teaser');
			    	x.each(function(){

						var	assetID = 0;

					    //get assetid (for stream-url's)
					    assetID = $(this).find('assetId').text();

					    _getVideosOfBroadcast(origin, assetID, maxVidProSendung);
			    	}); 
			    }
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService._getBroadcastOfCategory; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
		
	},

	/**
	 * Function to get assetID of single videos
	 * @param {Object} origin
	 * @param {String} assetID
	 * @param {String} maxVidProSendung
	 */
	_getVideosOfBroadcast = function(origin, assetId, maxVidProSendung){
		
		$.ajax({
			url: ZDFVIDEOSPERBROADCAST+String(assetId)+'&maxLength='+String(maxVidProSendung),
			type: 'GET',
			cache: false,
			success: function(data) {
				$xml = $(data);
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
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService._getVideosOfBroadcast; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get details and streams of videos
	 * @param {Object} origin
	 * @param {String} assetID
	 */
	_getDetailsAndStreamOfVideo = function(origin, assetId){
		
		$.ajax({
			url: ZDFSTREAMURL+assetId,
			type: 'GET',
			cache: false,
			success: function(data) {
				$xml = $(data);
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
					    //get airtime
					    airtime = $(this).find('airtime').text();

					    //Fetch stream url's
					    _searchStream(origin, assetID, title, subtitle, details, station, length, airtime, teaserImages);
					   
			    	});
			    }
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; ZDFService._getDetailsAndStreamOfVideo; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to fix format of given seconds
	 * @param {String} seconds
	 */
	_formatSeconds = function(seconds){
	    var date = new Date(1970,0,1);
	    date.setSeconds(seconds);
	    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
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
	that.getHot = getHot;
	that.getNew = getNew;
	that.getCategories = getCategories;
	that.getZDFVideosByDate = getZDFVideosByDate;

	return that;

};