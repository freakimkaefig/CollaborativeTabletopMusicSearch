
			    //TODO:
			    // Stringsuche: search further streams via
			    	// http://www.srf.ch/webservice/cvis/segment/ID/.json
			    	// search param (sortierung nach relevanz/neueste/... ???)
			    	// fix missing params of result
			    // Kategorien
			    // gethot
			    // getnew
			    	// erweitern auf die letzten 3 tage!
			    // filter

MediathekCrawler.SRFService = function() {

	var that = {},
	mediathekModel = null,
	PROXY_URL = '/proxy.php?url=',
	SRFBASEURL ='http://www.srf.ch/player/tv',
	SRFHOTURL = 'http://www.srf.ch/player/tv/carouselvideosajax/mostviews',
	SRFSEARCHSTRING = 'http://www.srf.ch/player/tv/suche?query=',
	SRFSEARCHNEW = 'http://www.srf.ch/player/tv/sendungen-nach-datum',
	SRFCATEGORYURL = 'http://www.srf.ch/player/tv/sendungen-nach-thema',
	// http://www.srf.ch/webservice/cvis/segment/87769548-f63d-4d3f-979d-47b985eba22c/.json
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
		//init ZDFService
		console.info('MediathekCrawler.SRFService.init');
		mediathekModel = mModel;
	},

	getSRFVideosByDate = function(maxResults, startDate, endDate){
		// console.log('SRF received dates: ',startdate, enddate);

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

       // console.log('SRF dates: ',dates);
       	
		for(i=0;i<dates.length;i++){

		var counter = 1;
        var _url = PROXY_URL + SRFGETVIDEOSBYDATEURL+String(dates[i]);
		
   		
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					// complete: function(data){

					// 	console.log('AJAX complete SRF: ',i,dates[i]);
					// },
					success: function(data) {	
						_onSRFVideosByDate(data, origin);
					},
					error: function(data){
						console.log('SRF getSRFVideosByDate - Could not fetch Data from: ',_url);
					}
				});
  			
		}
	},

	_checkSRFDuplicates = function(array, id){
		for(i=0;i<array.length;i++){

			if (array[i].match(id)) {
	        	return false;
	        }
		}
		return true;
	},

	_onSRFVideosByDate = function(data, origin){

		var duplicates = [];
		// console.log('_onSRFVideosByDate');
		var x = $(data).find('#programchannels');
		x.each(function(index, element){
					// console.log(temp,': ',element);
			var y = $(element).find('.vod');
			y.each(function(idx, el){
				
				// console.log('SRF _onSRFVideosByDate element: ', el);
				var _url = PROXY_URL + $(el).attr('href');
				assetID = _url.substring(_url.indexOf('id=')+3, _url.indexOf('&referrer'));
				if(_checkSRFDuplicates(duplicates, assetID)){
					$.ajax({
						url: _url,
						type: 'GET',
						cache: false,
						success: function(data) {
							// console.log('success: ',_url);

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
							// not available:
								// subtitle = $(el).find('.title_infos_description').find('.sender').text();
								// length = $(el).find('.title_infos_description').find('.duration').text();
								// length = length.substring(7,100);
								// length = _fixLength(length);	
							airtime = $(data).find('#asset_info_topline').text();
							// console.log('SRF VIDEOSBYDATE airtime: ',airtime);
							if(airtime.indexOf('vom') > 1 && airtime.indexOf('.') > 1){

								airtime = airtime.slice(airtime.indexOf('vom ') + 4, airtime.indexOf('Uhr'));
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
										var mm = yesterday.getMonth()+1; //January is 0!
										var yyyy = yesterday.getFullYear();
										if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
										airtime = yesterday;
									}
									else{
										// console.log('TODAY IS: ',days[ now.getDay() ],' AIRTIME IS: ',airtime);
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
										var mm = airtime.getMonth()+1; //January is 0!
										var yyyy = airtime.getFullYear();
										if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy

									}
								}catch(e){
									
								}
							}
							if(airtime.indexOf(',') > 0){
								airtime = airtime.replace(',','');
							}
						    // console.log('airtime: ',airtime,' todayPos: ',todayPos,' airtimePos: ',airtimePos);

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

							// var _url = 'http://www.srf.ch/' + $(data).find('.last_episode_link').attr('href');


							// console.log('el: ', _url, title, details, length, subtitle, assetID, airtime, teaserImages);

							streamUrl = $(data).find('.button_download_img').attr('href');

							if(streamUrl !== 'undefined' && streamUrl !== undefined){
								// console.log('Stream Url: ',_url);

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
					    		//console.log('basetype: ',basetype,', stream: ',stream._url);
								streams.push(stream);

								// SEARCH further URLS through 
								// http://www.srf.ch/webservice/cvis/segment/assetID/.json
								// fix incorrect params (e.g. airtime) with the received JSON
								// push to result model!
							}else{

								// SEARCH further URLS through 
								// http://www.srf.ch/webservice/cvis/segment/assetID/.json
								// push to result model!
							}
							
							if(streams.length < 1){		
								//search for further streams
								var streams2 = _getFurtherSRFStreams(assetID);
								
								if(streams.length < 1){

									console.log('\'',title, '\' has ', streams2.length, ' streams. \nCHECK: ',_url);
								}else{
									_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams2);
							
								}	
							}
							else{
								_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
							}
						},
						error: function(data){
							console.log('SRF _onSRFVideosByDate - Could not fetch Data from: ',_url);
						}
					});

					duplicates.push(assetID);
					// console.log('duplicates: ',duplicates);
				}
				

				
			});
		});
	},

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
				
				// console.log('SRF getCategories: ', PROXY_URL + SRFHOTURL);
				_onSRFBroadcastOfCategory(origin, data, _category);
				
			},
			error: function(){
				console.warn('ERROR; SRFService.getSRFCategories(); AJAX-request did not recieve a response');
			}
		});

	},

	_onSRFBroadcastOfCategory = function(origin, data, _category){
		// console.log('SRF _onSRFBroadcastOfCategory data: ',data);

		var find = CATEGORIES.filter(function (category) { return category._id == _category });
		if(find.length > 0) {
			// console.log(find[0]._assetId);
			$.each(find[0]._value, function(index,value){
				
				var temp = '#'+value;
				var data2 = data.responseText;
				var x = $(data2).find(temp);
				x.each(function(index, element){
					// console.log(temp,': ',element);
					var y = $(element).find('.az_item');
					y.each(function(idx, el){
						
					// console.log('SRF _onSRFBroadcastOfCategory element: ', el);
						//check for attribute id to remove duplicate entries
						// var attr = $(el).attr('id');
						// if (typeof attr !== typeof undefined && attr !== false) {
						    // console.log('FOUND: ',el);

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

							// not available:
								// subtitle = $(el).find('.title_infos_description').find('.sender').text();
								// length = $(el).find('.title_infos_description').find('.duration').text();
								// length = length.substring(7,100);
								// length = _fixLength(length);
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


							// console.log('el: ', _url, title, details, length, subtitle, assetID, airtime, teaserImages);

							_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
				
						// }
					});
				});

				
			});

		} else {
			console.warn('ERROR; ARTEService.getCategories; Category not found');
		}
	},

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
				// var resp = document.createElement("div");
				// resp.style.visibility = 'hidden';
				// document.body.appendChild(resp);
				// $(resp).html(data);
				// $(resp).find("script").each(function(i) {
    //                 eval($(this).text());
    //             });
				// console.log('SRF getHot: ', PROXY_URL + SRFHOTURL);
				_onSRFGetHot(origin, data);
				
			},
			error: function(){
				console.warn('ERROR; SRFService.getHot(); AJAX-request did not recieve a response');
			}
		});
	},

	_onSRFGetHot = function(origin, data){
		// var temp = $(data).find('#tab_most_viewed');
		// $(data).find('.	').each(function(index,element){
			var data2 = data.responseText;
			// console.log('SRF _onSRFGetHot: ', data2);
			var x = $(data2).find('.carousel_teaser');
			x.each(function(index,el){
				// console.log('SRF _onSRFGetHot: ', el);

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

					// not available:
					subtitle = $(el).find('.format').text();
						// length = $(el).find('.title_infos_description').find('.duration').text();
						// length = length.substring(7,100);
						// length = _fixLength(length);
						// details = $(el).find('.title_infos_description').find('.result_description').text();

					
					airtime = $(el).find('.format').next().text();
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
						var mm = yesterday.getMonth()+1; //January is 0!
						var yyyy = yesterday.getFullYear();
						if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
						airtime = yesterday;
					}
					else{
						// console.log('TODAY IS: ',days[ now.getDay() ],' AIRTIME IS: ',airtime);
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
						var mm = airtime.getMonth()+1; //January is 0!
						var yyyy = airtime.getFullYear();
						if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy

					    // console.log('airtime: ',airtime,' todayPos: ',todayPos,' airtimePos: ',airtimePos);
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


					// console.log('el airtime: ', origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);

					_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					
		

			});
		// });
	},

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
				console.log('SRF getNew: ', PROXY_URL + SRFSEARCHNEW);
				_onSRFGetNew(maxResults, origin, data,'#left_day');
				
			},
			error: function(){
				console.warn('ERROR; SRFService.getNew(); AJAX-request did not recieve a response');
			}
		});
	},

	_onSRFGetNew = function(maxResults, origin, data,divId){
		if(!maxResults || maxResults === undefined || maxResults === null){
			maxResults = 40;
		}
		var temp = divId;
		var x = $(data).find(divId).find('.missed_list');
		var counter = 1;
		x.each(function(index, element){
			var y = $(element).find('.sendung_item');
			y.each(function(idx, el){
				if(counter <= maxResults){
				
			// console.log('SRF _onSRFSearchString element: ', el);
				//check for attribute id to remove duplicate entries
				var attr = $(el).attr('id');
				if (typeof attr !== typeof undefined && attr !== false) {
				    // console.log('FOUND: ',el);

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

					// not available:
						// subtitle = $(el).find('.title_infos_description').find('.sender').text();
						// length = $(el).find('.title_infos_description').find('.duration').text();
						// length = length.substring(7,100);
						// length = _fixLength(length);
						// details = $(el).find('.title_infos_description').find('.result_description').text();

					$today = new Date();
					$yesterday = new Date($today);
					$yesterday.setDate($today.getDate() - 1);
					var $dd = $yesterday.getDate();
					var $mm = $yesterday.getMonth()+1; //January is 0!

					var $yyyy = $yesterday.getFullYear();
					if($dd<10){$dd='0'+$dd} if($mm<10){$mm='0'+$mm} $yesterday = $dd+'.'+$mm+'.'+$yyyy
					// console.log($yesterday);

					airtime = $yesterday +' '+ $(el).find('.time').text();
					if(airtime.indexOf(' Uhr') > 0){
						airtime = airtime.substring(0,airtime.indexOf(' Uhr'));
					// console.log('AIRTIME: ',airtime);
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


					// console.log('el: ', _url, title, details, length, subtitle, assetID, airtime, teaserImages);

					_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
		
				}

					counter++;
				}

			});
		});
		
		//recursive call to get todays content
		if(temp === '#left_day'){
			_onSRFGetNew(origin, data,'#right_day');
		}
	},

	searchString = function(searchString, maxResults){
		if(searchString.indexOf(' ') > 0){
			// console.log('SRF searchString: ',searchString);
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

		// requesting more than 1 result page ends with the same
		// received data -> duplicate entries!
		for(i=1;i<=maxResults;i++){

			var _url = PROXY_URL + encodeURI(SRFSEARCHSTRING+String(searchString))+'&page='+String(i);
				
				// console.log("SRF search url: ", _url);
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					success: function(data, textStatus, jqXHR) {
						// console.log('YAAAY', data);
						_onSRFSearchString(origin, data);
						
					},
					error: function(){
						console.warn('ERROR; SRFService.searchString(); AJAX-request did not recieve a response');
					}
				});
		}

	},

	_onSRFSearchString = function(origin, data){
		// console.log('div: ',$(data).find('.result_row'));
		var x = $(data).find('.result_row');
		x.each(function(index, element){
			// console.log('SRF _onSRFSearchString element: ', element);
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

			// console.log('el: ', _url, title, details, length, subtitle, assetID, airtime, teaserImages);

			_searchSRFStreams(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
		});
	},

	_searchSRFStreams = function(origin, _url, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		// not available:

		$.ajax({
				url: PROXY_URL + _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					// console.log('YAAAY', data);


					// console.log('subtitle, length & details before fix: ', subtitle, length, details);
					// fill missing params:
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
									var mm = yesterday.getMonth()+1; //January is 0!
									var yyyy = yesterday.getFullYear();
									if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} yesterday = dd+'.'+mm+'.'+yyyy
									airtime = yesterday;
								}
								else{
									// console.log('TODAY IS: ',days[ now.getDay() ],' AIRTIME IS: ',airtime);
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
									var mm = airtime.getMonth()+1; //January is 0!
									var yyyy = airtime.getFullYear();
									if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} airtime = dd+'.'+mm+'.'+yyyy

								    // console.log('airtime: ',airtime,' todayPos: ',todayPos,' airtimePos: ',airtimePos);
								}
							}catch(e){
								
							}
						}
						// console.log('airtime AFTER fix: ', airtime);
					}

					streamUrl = $(data).find('.button_download_img').attr('href');

					if(streamUrl !== 'undefined' && streamUrl !== undefined){
						// console.log('Stream Url: ',_url);

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
			    		//console.log('basetype: ',basetype,', stream: ',stream._url);
						streams.push(stream);

						// SEARCH further URLS through 
						// http://www.srf.ch/webservice/cvis/segment/assetID/.json
						// fix incorrect params (e.g. airtime) with the received JSON
						// push to result model!
					}else{

						// SEARCH further URLS through 
						// http://www.srf.ch/webservice/cvis/segment/assetID/.json
						// push to result model!
					}
					
					if(streams.length < 1){		
						//search for further streams
						streams = _getFurtherSRFStreams(assetID);
						
						if(streams.length < 1){

							console.log('\'',title, '\' has ', streams.length, ' streams. \nCHECK: ',_url);
						}else{
							_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams2);
					
						}	
					}
					else{
						_pushSRFResultToModel(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					}

				},
				error: function(){
					console.warn('ERROR; SRFService._searchSRFStreams(); AJAX-request did not recieve a response');
				}
			});
	},

	//Will be able to return several rtmp streams
	// but since we're not able to playback those streams
	// it returns an empty array at the moment.
	_getFurtherSRFStreams = function(assetID){
		// _url = SRFALTERNATIVESTREAMS1 + String(assetID) + SRFALTERNATIVESTREAMS2;
		// $.ajax({
		// 	url: PROXY_URL + encodeURI(_url),
		// 	type: 'GET',
		// 	cache: false,
		// 	success: function(data, textStatus, jqXHR) {
		// 		data = data.replace('/*-secure-','');
		// 		data = data.slice(0, data.length -2);
		// 		var response = $.parseJSON(data);
		// 		// console.log('SRF _getFurtherSRFStreams: ', typeof response, response);
		// 		// _onSRFGetNew(origin, data,'#left_day');
				
		// 	},
		// 	error: function(){
		// 		console.warn('ERROR; SRFService.getNew(); AJAX-request did not recieve a response');
		// 	}
		// });

		return [];
	},

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

	_pushSRFResultToModel = function(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		// console.log('pushing to result model');
		// console.log('@ SRFService._pushSRFResultToModel: ', 'station: ', station, 'title: ', title, 'subtitle: ', subtitle, 'details: ', details, 'length: ', length, 'airtime: ', airtime, 'teaserImages: ', teaserImages, 'streams: ', streams);
		// if(station != 'null' && title != 'null' && subtitle != 'null' && details != 'null' && length != 'null' && airtime != 'null' && teaserImages != 'null' && streams && station && title && subtitle && details && length && airtime && teaserImages && streams){

			mediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
		// }
		// else{
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
	that.getSRFCategories = getSRFCategories;
	that.getSRFVideosByDate = getSRFVideosByDate;

	return that;

};