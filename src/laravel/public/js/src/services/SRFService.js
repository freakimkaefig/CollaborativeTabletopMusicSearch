MediathekCrawler.SRFService = function() {

	var that = {},
	mediathekModel = null,
	PROXY_URL = '/proxy.php?url=',
	SRFBASEURL ='http://www.srf.ch/player/tv',
	SRFHOTURL = 'http://www.srf.ch/player/tv/carouselvideosajax/mostviews',
	SRFSEARCHSTRING = 'http://www.srf.ch/player/tv/suche?query=',
	SRFSEARCHNEW = 'http://www.srf.ch/player/tv/sendungen-nach-datum',
	SRFCATEGORYURL = 'http://www.srf.ch/player/tv/sendungen-nach-thema',
	SRFALTERNATIVESTREAMS1 = 'http://www.srf.ch/webservice/cvis/segment/',
	SRFALTERNATIVESTREAMS2 = '/.json',
	SRFGETVIDEOSBYDATEURL ='http://tvprogramm.srf.ch/',
	once = 0,
	CATEGORIES = [
		{
			'_id': 'nachrichten',
			'_value': ['az_unit_NewsPolitikWirtschaft'],
		},
		{
			'_id': 'politik',
			'_value': ['az_unit_Konsum', 'az_unit_MenschGesellschaft'],
		},
		{
			'_id': 'sport',
			'_value': ['az_unit_Sport'],
		},
		{
			'_id': 'kinder',
			'_value': ['az_unit_Kinder'],
		},
		{
			'_id': 'ratgeber-gesundheit',
			'_value': ['az_unit_Gesundheit'],
		},
		{
			'_id': 'wirtschaft',
			'_value': ['az_unit_NewsPolitikWirtschaft'],
		},
		{
			'_id': 'unterhaltung',
			'_value': ['az_unit_Unterhaltung', 'az_unit_SatireComedy'],
		},
		{
			'_id': 'kino-tv',
			'_value': ['az_unit_FilmSerien'],
		},
		{
			'_id': 'wissen-kultur',
			'_value': ['az_unit_WissenDigital','az_unit_Kultur', 'az_unit_Musik', 'az_unit_Religion'],
		},
	];
	
	init = function(mModel) {
		mediathekModel = mModel;
	},

	/**
	 * Function to get videos by date
	 * @param {String|Integer} maxResults
	 * @param {String|Date} startDate
	 * @param {String|Date} endDate
	 */
	getSRFVideosByDate = function(maxResults, startDate, endDate){
		var origin = {};
		Date.prototype.addDays = function(days) {
	       var dat = new Date(this.valueOf())
	       dat.setDate(dat.getDate() + days);
	       return dat;
	   	}

	   var dates = [];
	   var currentDate = new Date(startDate);
	   var endd = new Date(endDate);

	   while (currentDate <= endd) {
	   		var temp = '';
	   		var dd = currentDate.getDate();
			var mm = currentDate.getMonth()+1; //January is 0!
			var yyyy = currentDate.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} temp = dd+'.'+mm+'.'+yyyy

       		dates.push(temp)
        	currentDate = currentDate.addDays(1);
       }

		for(i=0;i<dates.length;i++){

		var counter = 1;
        var _url = PROXY_URL + SRFGETVIDEOSBYDATEURL+String(dates[i]);
		
   		
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					success: function(data) {	
						_onSRFVideosByDate(data, origin);
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.warn('ERROR; SRFService.getSRFVideosByDate; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
					}
				});
  			
		}
	},

	/**
	 * Function to check if an entry with a given id is already within a given array
	 * @param {Array} array
	 * @param {String} id
	 */
	_checkSRFDuplicates = function(array, id){
		for(i=0;i<array.length;i++){

			if (array[i].match(id)) {
	        	return false;
	        }
		}
		return true;
	},

	/**
	 * Function to get details for video search by date
	 * @param {String|HTML|JSON} data
	 * @param {Object} origin
	 */
	_onSRFVideosByDate = function(data, origin){

		var duplicates = [];
		var x = $(data).find('#programchannels');
		x.each(function(index, element){
			var y = $(element).find('.vod');
			y.each(function(idx, el){
				
				var _url = PROXY_URL + $(el).attr('href');
				assetID = _url.substring(_url.indexOf('id=')+3, _url.indexOf('&referrer'));
				if(_checkSRFDuplicates(duplicates, assetID)){
					$.ajax({
						url: _url,
						type: 'GET',
						cache: false,
						success: function(data) {

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

							var todayPos = null;
							var airtimePos = null;
							airtime = $(data).find('#asset_info_topline').text();
							if(airtime.indexOf('vom') > 1 && airtime.indexOf('.') > 1){

								airtime = airtime.slice(airtime.indexOf('vom ') + 4, airtime.indexOf('Uhr'));
							}
							else {
								try{

									var now = new Date();
									var today = new Date();
									var dd = today.getDate();
									var mm = today.getMonth()+1;
									var yyyy = today.getFullYear();
									if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'.'+mm+'.'+yyyy

									var days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
									
									if(airtime ==='Heute'){
										airtime = today;
									}
									else if(airtime === 'Gestern'){
										var yesterday = new Date(now);
										yesterday.setDate(now.getDate() - 1);
										var dd = yesterday.getDate();
										var mm = yesterday.getMonth()+1;
										var yyyy = yesterday.getFullYear();
										if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
										airtime = yesterday;
									}
									else{
										for (var j=0; j<days.length; j++) {
									        if (days[j].match(airtime)) {
									        	airtimePos = j;
									        }
									        if(days[j].match(days[ now.getDay() ])){
									        	todayPos = j;
									        }
									    }
										airtime = new Date();
									    if(todayPos > airtimePos){
									    	var x = parseInt(todayPos - airtimePos);
									    	airtime.setDate(now.getDate() - x);
									    }
									    if(todayPos < airtimePos){
									    	var z = parseInt(todayPos + days.length - airtimePos);
									    	airtime.setDate(now.getDate() - z)
									    }
									    var dd = airtime.getDate();
										var mm = airtime.getMonth()+1;
										var yyyy = airtime.getFullYear();
										if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy

									}
								}catch(e){
									
								}
							}
							if(airtime.indexOf(',') > 0){
								airtime = airtime.replace(',','');
							}

							details = $(data).find('#asset_info_description').text();

							
							station = 'SRF';
							title = $(data).find('#asset_info_hl').text();

							var resolution = $(data).find('#sendung_box_logo').find('.retina_image').attr('width') + 'x' + $(data).find('.retina_image').attr('height');
							var imgUrl = $(data).find('#sendung_box_logo').find('.retina_image').attr('src');
							var ti = mediathekModel.createTeaserImage(resolution, imgUrl);
							teaserImages.push(ti);
							var resolution2 = $(data).find('#sendung_box_logo').find('.retina_image').attr('width') * 2 + 'x' + $(data).find('.retina_image').attr('height') * 2;
							var imgUrl2 = $(data).find('#sendung_box_logo').find('.retina_image').attr('data-src2x');
							var ti2 = mediathekModel.createTeaserImage(resolution2, imgUrl2);
							teaserImages.push(ti2);

							streamUrl = $(data).find('.button_download_img').attr('href');

							if(streamUrl !== 'undefined' && streamUrl !== undefined){

								var basetype = '',
					    		quality = '',
					    		url = '',
					    		filesize = 0,
				    			type = 'video/mp4';

				    			url = streamUrl;

				    			if(url.indexOf('q10') > 0){
				    				quality = 0;
				    			}else if(url.indexOf('q20') > 0){
				    				quality = 1;
				    			}else if(url.indexOf('q30') > 0){
				    				quality = 2;
				    			}

				    			var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
								streams.push(stream);
							}
							
							if(streams.length < 1){		
								var streams2 = _getFurtherSRFStreams(assetID);
								
								if(streams.length < 1){

								}else{
									_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams2);
							
								}	
							}
							else{
								_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
							}
						},
						error: function(jqXHR, textStatus, errorThrown){
							console.warn('ERROR; SRFService._onSRFVideosByDate; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
						}
					});

					duplicates.push(assetID);
				}
				

				
			});
		});
	},

	/**
	 * Function to get videos matching a given category
	 * @param {String} _category
	 */
	getSRFCategories = function(_category) {
		var origin = {
			_channel: 'SRF',
			_method: 'getCategories',
			_searchTerm: _category,
			_badge: null
		};

		$.ajax({
			url: PROXY_URL + SRFCATEGORYURL,
			type: 'GET',
			cache: false,
			complete: function(data, textStatus, jqXHR) {
				
				_onSRFBroadcastOfCategory(origin, data, _category);
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; SRFService.getSRFCategories; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});

	},

	/**
	 * Function to get details of videos matching a given category
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 * @param {String} _category
	 */
	_onSRFBroadcastOfCategory = function(origin, data, _category){
		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if(find.length > 0) {
			$.each(find[0]._value, function(index,value){
				
				var temp = '#'+value;
				var data2 = data.responseText;
				var x = $(data2).find(temp);
				x.each(function(index, element){
					var y = $(element).find('.az_item');
					y.each(function(idx, el){

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
							details = $(el).find('.az_description').text();
							station = 'SRF';
							title = $(el).find('.sendung_name').text();

							var resolution = $(el).find('.retina_image').attr('width') + 'x' + $(el).find('.retina_image').attr('height');
							var imgUrl = $(el).find('.retina_image').attr('src');
							var ti = mediathekModel.createTeaserImage(resolution, imgUrl);
							teaserImages.push(ti);
							var resolution2 = $(el).find('.retina_image').attr('width') * 2 + 'x' + $(el).find('.retina_image').attr('height') * 2;
							var imgUrl2 = $(el).find('.retina_image').attr('data-src2x');
							var ti2 = mediathekModel.createTeaserImage(resolution2, imgUrl2);
							teaserImages.push(ti2);

							var _url = 'http://www.srf.ch/' + $(el).find('.last_episode_link').attr('href');
							
							assetID = _url.substring(_url.indexOf('quicklink/')+10, _url.length);

							_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
				
					});
				});

				
			});

		} else {
			console.warn('ERROR; ARTEService.getCategories; Category not found');
		}
	},

	/**
	 * Function to get 'hot' videos
	 */
	getHot = function(){
		var origin = {
			_channel: 'SRF',
			_method: 'getHot',
			_searchTerm: null,
			_badge: 'hot'
		};
		$.ajax({
			url: PROXY_URL + SRFHOTURL,
			type: 'GET',
			cache: false,
			complete: function(data, textStatus, jqXHR) {
				_onSRFGetHot(origin, data);
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; SRFService.getHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get details for 'hot' videos
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
	_onSRFGetHot = function(origin, data){
			var data2 = data.responseText;
			var x = $(data2).find('.carousel_teaser');
			x.each(function(index,el){

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

					subtitle = $(el).find('.format').text();		
					airtime = $(el).find('.format').next().text();
					var now = new Date();
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth()+1;
					var yyyy = today.getFullYear();
					if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'.'+mm+'.'+yyyy

					var days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
					
					if(airtime ==='Heute'){
						airtime = today;
					}
					else if(airtime === 'Gestern'){
						var yesterday = new Date(now);
						yesterday.setDate(now.getDate() - 1);
						var dd = yesterday.getDate();
						var mm = yesterday.getMonth()+1;
						var yyyy = yesterday.getFullYear();
						if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
						airtime = yesterday;
					}
					else{
						var todayPos = null;
						var airtimePos = null;
						for (var j=0; j<days.length; j++) {
					        if (days[j].match(airtime)) {
					        	airtimePos = j;
					        }
					        if(days[j].match(days[ now.getDay() ])){
					        	todayPos = j;
					        }
					    }
						airtime = new Date();
					    if(todayPos > airtimePos){
					    	var x = parseInt(todayPos - airtimePos);
					    	airtime.setDate(now.getDate() - x);
					    }
					    if(todayPos < airtimePos){
					    	var z = parseInt(todayPos + days.length - airtimePos);
					    	airtime.setDate(now.getDate() - z)
					    }
					    var dd = airtime.getDate();
						var mm = airtime.getMonth()+1;
						var yyyy = airtime.getFullYear();
						if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy

					}


					station = 'SRF';
					title = $(el).find('.headline').text();

					var resolution = $(el).find('.retina_image').attr('width') + 'x' + $(el).find('.retina_image').attr('height');
					var imgUrl = $(el).find('.retina_image').attr('src');
					var ti = mediathekModel.createTeaserImage(resolution, imgUrl);
					teaserImages.push(ti);
					var resolution2 = $(el).find('.retina_image').attr('width') * 2 + 'x' + $(el).find('.retina_image').attr('height') * 2;
					var imgUrl2 = $(el).find('.retina_image').attr('data-src2x');
					var ti2 = mediathekModel.createTeaserImage(resolution2, imgUrl2);
					teaserImages.push(ti2);

					var _url = 'http://www.srf.ch/' + $(el).find('.headline').attr('href');
					
					assetID = _url.substring(_url.indexOf('id=')+3, _url.length);

					_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					
		

			});
		// });
	},

	/**
	 * Function to get 'new' videos
	 * @param {String|Integer} maxResults
	 */
	getNew = function (maxResults) {
		var origin = {
			_channel: 'SRF',
			_method: 'getNew',
			_searchTerm: null,
			_badge: 'new'
		};
		$.ajax({
			url: PROXY_URL + SRFSEARCHNEW,
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {
				_onSRFGetNew(maxResults, origin, data,'#left_day');
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; SRFService.getNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get details for 'new' videos
	 * @param {String|Integer} maxResults
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 * @param {String} divId
	 */
	_onSRFGetNew = function(maxResults, origin, data,divId){
		if(!maxResults || maxResults === undefined || maxResults === null){
			maxResults = 50;
		}
		var temp = divId;
		var x = $(data).find(divId).find('.missed_list');
		var counter = 1;
		x.each(function(index, element){
			var y = $(element).find('.sendung_item');
			y.each(function(idx, el){
				if(counter <= maxResults){
				
				var attr = $(el).attr('id');
				if (typeof attr !== typeof undefined && attr !== false) {

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

					$today = new Date();
					$yesterday = new Date($today);
					$yesterday.setDate($today.getDate() - 1);
					var $dd = $yesterday.getDate();
					var $mm = $yesterday.getMonth()+1;

					var $yyyy = $yesterday.getFullYear();
					if($dd<10){$dd='0'+$dd} if($mm<10){$mm='0'+$mm} $yesterday = $dd+'.'+$mm+'.'+$yyyy

					airtime = $yesterday +' '+ $(el).find('.time').text();
					if(airtime.indexOf(' Uhr') > 0){
						airtime = airtime.substring(0,airtime.indexOf(' Uhr'));
					}
					station = 'SRF';
					title = $(el).find('.title').attr('title');

					var resolution = $(el).find('.retina_image').attr('width') + 'x' + $(el).find('.retina_image').attr('height');
					var imgUrl = $(el).find('.retina_image').attr('src');
					var ti = mediathekModel.createTeaserImage(resolution, imgUrl);
					teaserImages.push(ti);
					var resolution2 = $(el).find('.retina_image').attr('width') * 2 + 'x' + $(el).find('.retina_image').attr('height') * 2;
					var imgUrl2 = $(el).find('.retina_image').attr('data-src2x');
					var ti2 = mediathekModel.createTeaserImage(resolution2, imgUrl2);
					teaserImages.push(ti2);

					var _url = 'http://www.srf.ch/' + $(el).find('.sengung_logo_wrapper').attr('href');
					
					assetID = _url.substring(_url.indexOf('id=')+3, _url.length);

					if(maxResults === 1){
						$.ajax({
							url: PROXY_URL + _url,
							type: 'GET',
							cache: false,
							success: function(data, textStatus, jqXHR) {
								if(subtitle === null || subtitle === undefined || subtitle === ''){
									subtitle = $(data).find('#asset_info_hl').text();
								}
								if(details === null || details === undefined || details === ''){
									details = $(data).find('#asset_info_description').text()
								}
								if(airtime === null || airtime === undefined || airtime === ''){
									airtime = $(data).find('#asset_info_topline').text();
									// console.log("AIRTIME: ",airtime);
									if(airtime.indexOf('vom') > 1 && airtime.indexOf('.') > 1){

										airtime = airtime.slice(airtime.indexOf('vom ') + 4, airtime.indexOf(' Uhr'));
									}
									else {
										try{

											var now = new Date();
											var today = new Date();
											var dd = today.getDate();
											var mm = today.getMonth()+1;
											var yyyy = today.getFullYear();
											if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'.'+mm+'.'+yyyy

											var days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
											
											if(airtime ==='Heute'){
												airtime = today;
											}
											else if(airtime === 'Gestern'){
												var yesterday = new Date(now);
												yesterday.setDate(now.getDate() - 1);
												var dd = yesterday.getDate();
												var mm = yesterday.getMonth()+1;
												var yyyy = yesterday.getFullYear();
												if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
												airtime = yesterday;
											}
											else{
												var todayPos = null;
												var airtimePos = null;
												for (var j=0; j<days.length; j++) {
											        if (days[j].match(airtime)) {
											        	airtimePos = j;
											        }
											        if(days[j].match(days[ now.getDay() ])){
											        	todayPos = j;
											        }
											    }
												airtime = new Date();
											    if(todayPos > airtimePos){
											    	var x = parseInt(todayPos - airtimePos);
											    	airtime.setDate(now.getDate() - x);
											    }
											    if(todayPos < airtimePos){
											    	var z = parseInt(todayPos + days.length - airtimePos);
											    	airtime.setDate(now.getDate() - z)
											    }
											    var dd = airtime.getDate();
												var mm = airtime.getMonth()+1;
												var yyyy = airtime.getFullYear();
												if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy
											}
										}catch(e){
											
										}
									}
								}

								streamUrl = $(data).find('.button_download_img').attr('href');

								if(streamUrl !== 'undefined' && streamUrl !== undefined){

									var basetype = '',
						    		quality = '',
						    		url = '',
						    		filesize = 0,
					    			type = 'video/mp4';

					    			url = streamUrl;

					    			if(url.indexOf('q10') > 0){
					    				quality = 0;
					    			}else if(url.indexOf('q20') > 0){
					    				quality = 1;
					    			}else if(url.indexOf('q30') > 0){
					    				quality = 2;
					    			}

					    			var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
									streams.push(stream);
								}
								
								if(streams.length < 1){		
									streams = _getFurtherSRFStreams(assetID);
									
									if(streams.length < 1){

									}else{
										counter++;
										_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams2);
										
									}	
								}
								else{
									++counter;
									_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
								}

							},
							error: function(jqXHR, textStatus, errorThrown){
								console.warn('ERROR; SRFService._onSRFGetNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
							}
						});

					}else{

						_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
						++counter;
					}
		
				}

				}

			});
		});
		
		//recursive call to get todays content
		if(temp === '#left_day'){
			_onSRFGetNew(origin, data,'#right_day');
		}
	},

	/**
	 * Function to search videos by a given keyword
	 * @param {String} searchString
	 * @param {String|Integer} maxResults
	 */
	searchString = function(searchString, maxResults){
		if(searchString.indexOf(' ') > 0){
			searchString = searchString.replace(' ','+');
		}
		if(maxResults < 1 || maxResults === null || maxResults === 'undefined' || maxResults === undefined){
			maxResults = 2;
		}
		var origin = {
			_channel: 'SRF',
			_method: 'searchString',
			_searchTerm: searchString,
			_badge: null
		};

		for(i=1;i<=maxResults;i++){

			var _url = PROXY_URL + encodeURI(SRFSEARCHSTRING+String(searchString))+'&page='+String(i);
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					success: function(data, textStatus, jqXHR) {
						_onSRFSearchString(origin, data);
						
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.warn('ERROR; SRFService.searchString; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
					}
				});
		}

	},

	/**
	 * Function to get details for videos matching a given keyword
	 * @param {Object} origin
	 * @param {String|HTML|JSON} data
	 */
	_onSRFSearchString = function(origin, data){
		var x = $(data).find('.result_row');
		x.each(function(index, element){
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

			subtitle = $(element).find('.title_infos_description').find('.sender').text();
			airtime = $(element).find('.title_infos_description').find('.sender').next().text();
			
			var now = new Date();
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'.'+mm+'.'+yyyy
			var days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];

			
			if(airtime ==='Heute'){
				airtime = today;
			}
			else if(airtime === 'Gestern'){
				var yesterday = new Date(now);
				yesterday.setDate(now.getDate() - 1);
				var dd = yesterday.getDate();
				var mm = yesterday.getMonth()+1;
				var yyyy = yesterday.getFullYear();
				if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
				airtime = yesterday;
			}
			else{
				var todayPos = null;
				var airtimePos = null;
				for (var j=0; j<days.length; j++) {
			        if (days[j].match(airtime)) {
			        	airtimePos = j;
			        }
			        if(days[j].match(days[ now.getDay() ])){
			        	todayPos = j;
			        }
			    }
				airtime = new Date();
			    if(todayPos > airtimePos){
			    	var x = parseInt(todayPos - airtimePos);
			    	airtime.setDate(now.getDate() - x);
			    }
			    if(todayPos < airtimePos){
			    	var z = parseInt(todayPos + days.length - airtimePos);
			    	airtime.setDate(now.getDate() - z)
			    }
			    var dd = airtime.getDate();
				var mm = airtime.getMonth()+1;
				var yyyy = airtime.getFullYear();
				if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy

			}
			station = 'SRF';
			length = $(element).find('.title_infos_description').find('.duration').text();
			length = length.substring(7,100);
			length = _fixLength(length);
			details = $(element).find('.title_infos_description').find('.result_description').text();
			title = $(element).find('.title_infos_description').find('.result_title').attr('title');

			var resolution = $(element).find('.sendung_img_wrapper').find('.retina_image').attr('width') + 'x' + $(element).find('.sendung_img_wrapper').find('.retina_image').attr('height');
			var imgUrl = $(element).find('.sendung_img_wrapper').find('.retina_image').attr('src');
			var ti = mediathekModel.createTeaserImage(resolution, imgUrl);
			teaserImages.push(ti);
			var resolution2 = $(element).find('.sendung_img_wrapper').find('.retina_image').attr('width') * 2 + 'x' + $(element).find('.sendung_img_wrapper').find('.retina_image').attr('height') * 2;
			var imgUrl2 = $(element).find('.sendung_img_wrapper').find('.retina_image').attr('data-src2x');
			var ti2 = mediathekModel.createTeaserImage(resolution2, imgUrl2);
			teaserImages.push(ti2);

			var _url = 'http://www.srf.ch/' + $(element).find('.title_infos_description').find('.result_title').attr('href');
			
			assetID = _url.substring(_url.indexOf('id=')+3, _url.length);

			_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
		});
	},

	/**
	 * Function to search streams of videos
	 * @param {Object} origin
	 * @param {String} _url
	 * @param {String} title
	 * @param {String} subtitle
	 * @param {String} details
	 * @param {String} station
	 * @param {String} assetID
	 * @param {String} length
	 * @param {String} airtime
	 * @param {Array} teaserImages
	 * @param {Array} streams
	 */
	_searchSRFStreams = function(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		$.ajax({
				url: PROXY_URL + _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					if(subtitle === null || subtitle === undefined || subtitle === ''){
						subtitle = $(data).find('#asset_info_hl').text();
					}
					if(details === null || details === undefined || details === ''){
						details = $(data).find('#asset_info_description').text()
					}
					if(airtime === null || airtime === undefined || airtime === ''){
						airtime = $(data).find('#asset_info_topline').text();
						if(airtime.indexOf('vom') > 1 && airtime.indexOf('.') > 1){

							airtime = airtime.slice(airtime.indexOf('vom ') + 4, airtime.indexOf(' Uhr'));
						}
						else {
							try{

								var now = new Date();
								var today = new Date();
								var dd = today.getDate();
								var mm = today.getMonth()+1; //January is 0!
								var yyyy = today.getFullYear();
								if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'.'+mm+'.'+yyyy

								var days = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
								
								if(airtime ==='Heute'){
									airtime = today;
								}
								else if(airtime === 'Gestern'){
									var yesterday = new Date(now);
									yesterday.setDate(now.getDate() - 1);
									var dd = yesterday.getDate();
									var mm = yesterday.getMonth()+1;
									var yyyy = yesterday.getFullYear();
									if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
									airtime = yesterday;
								}
								else{
									var todayPos = null;
									var airtimePos = null;
									for (var j=0; j<days.length; j++) {
								        if (days[j].match(airtime)) {
								        	airtimePos = j;
								        }
								        if(days[j].match(days[ now.getDay() ])){
								        	todayPos = j;
								        }
								    }
									airtime = new Date();
								    if(todayPos > airtimePos){
								    	var x = parseInt(todayPos - airtimePos);
								    	airtime.setDate(now.getDate() - x);
								    }
								    if(todayPos < airtimePos){
								    	var z = parseInt(todayPos + days.length - airtimePos);
								    	airtime.setDate(now.getDate() - z)
								    }
								    var dd = airtime.getDate();
									var mm = airtime.getMonth()+1;
									var yyyy = airtime.getFullYear();
									if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy
								}
							}catch(e){
								
							}
						}
					}

					streamUrl = $(data).find('.button_download_img').attr('href');

					if(streamUrl !== 'undefined' && streamUrl !== undefined){

						var basetype = '',
			    		quality = '',
			    		url = '',
			    		filesize = 0,
		    			type = 'video/mp4';

		    			url = streamUrl;

		    			if(url.indexOf('q10') > 0){
		    				quality = 0;
		    			}else if(url.indexOf('q20') > 0){
		    				quality = 1;
		    			}else if(url.indexOf('q30') > 0){
		    				quality = 2;
		    			}

		    			var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
						streams.push(stream);

					}
					
					if(streams.length < 1){		
						streams = _getFurtherSRFStreams(assetID);
						
						if(streams.length < 1){

						}else{
							_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams2);
					
						}	
					}
					else{
						_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					}

				},
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; SRFService._searchSRFStreams; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});
	},

	/**
	 * Function to get further streams of videos
	 * @param {String} assetID
	 * @return {Array} []
	 */
	_getFurtherSRFStreams = function(assetID){
		// not implemented due to unavailable content from SRF website
		return [];
	},

	/**
	 * Function to fix format of given string
	 * @param {String} length
	 */
	_fixLength = function(length){
		if(length.indexOf(' Min') > 0){
			length = length.replace(' Min', '');
		}
		if(Number(length) > 60){
			var hours = String(parseInt(length / 60));
			if(Number(hours)<10){
				hours = '0'+String(hours);
			}
			var minutes = String(Number(length)-(Number(hours)*60));
			if(Number(minutes)<10){
				minutes = '0'+String(minutes);
			}
			return hours+':'+minutes+':00';
		}
		if(Number(length)<=60){
			if(Number(length)<10){
				length = '0'+String(length);
			}
			return '00:'+String(length)+':00';
		}

		return length;
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
	_pushSRFResultToModel = function(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
			mediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
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
	that.getSRFCategories = getSRFCategories;
	that.getSRFVideosByDate = getSRFVideosByDate;

	return that;

};