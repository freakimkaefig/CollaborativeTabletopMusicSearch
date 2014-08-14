
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
	// http://www.srf.ch/webservice/cvis/segment/87769548-f63d-4d3f-979d-47b985eba22c/.json
	SRFALTERNATIVESTREAMS1 = 'http://www.srf.ch/webservice/cvis/segment/',
	SRFALTERNATIVESTREAMS2 = '/.json',
	once = 0;
	
	init = function(mModel) {
		//init ZDFService
		console.info('MediathekCrawler.SRFService.init');
		mediathekModel = mModel;
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
				console.log('SRF getHot: ', PROXY_URL + SRFHOTURL);
				_onSRFGetHot(origin, data);
				
			},
			error: function(){
				console.warn('ERROR; SRFService.getNew(); AJAX-request did not recieve a response');
			}
		});
	},

	_onSRFGetHot = function(origin, data){
		// var temp = $(data).find('#tab_most_viewed');
		// $(data).find('.	').each(function(index,element){
			var data2 = data.responseText;
			// console.log('SRF _onSRFGetHot: ', data2);
			$(data2).find('.carousel_teaser').each(function(index,el){
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

	getNew = function () {
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
				// console.log('SRF getNew: ', PROXY_URL + SRFSEARCHNEW);
				_onSRFGetNew(origin, data,'#left_day');
				
			},
			error: function(){
				console.warn('ERROR; SRFService.getNew(); AJAX-request did not recieve a response');
			}
		});
	},

	_onSRFGetNew = function(origin, data,divId){
		var temp = divId;
		$(data).find(divId).find('.missed_list').each(function(index, element){

			$(element).find('.sendung_item').each(function(idx, el){
				
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
		$(data).find('.result_row').each(function(index, element){
			console.log('SRF _onSRFSearchString element: ', element);
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

					// console.log('URL, title, subtitle, length & details AFTER fix: ', _url, title, subtitle, length, details);



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
				error: function(){
					console.warn('ERROR; SRFService._searchSRFStreams(); AJAX-request did not recieve a response');
				}
			});
	},

	//Will be able to return several rtmp streams
	// but since we're not able to playback those streams
	// it returns an empty array at the moment.
	_getFurtherSRFStreams = function(assetID){
		_url = SRFALTERNATIVESTREAMS1 + String(assetID) + SRFALTERNATIVESTREAMS2;
		$.ajax({
			url: PROXY_URL + encodeURI(_url),
			type: 'GET',
			cache: false,
			success: function(data, textStatus, jqXHR) {
				data = data.replace('/*-secure-','');
				data = data.slice(0, data.length -2);
				var response = $.parseJSON(data);
				// console.log('SRF _getFurtherSRFStreams: ', typeof response, response);
				// _onSRFGetNew(origin, data,'#left_day');
				
			},
			error: function(){
				console.warn('ERROR; SRFService.getNew(); AJAX-request did not recieve a response');
			}
		});

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
			return hours+':'+minutes+':00';
		}
		if(Number(length)<=60){
			return '00:'+String(length)+':00';
		}

		return length;
	},

	_pushSRFResultToModel = function(origin, title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		// console.log('pushing to result model');
		// if(station != 'null' && title != 'null' && subtitle != 'null' && details != 'null' && length != 'null' && airtime != 'null' && teaserImages != 'null' && streams && station && title && subtitle && details && length && airtime && teaserImages && streams){

			mediathekModel.addResults(origin, station, title, subtitle, details, length, airtime, teaserImages, streams);
		// }
		// else{
		// console.log('some params missing @ ARTEService._pushSRFResultToModel: ', 'station: ', station, 'title: ', title, 'subtitle: ', subtitle, 'details: ', details, 'length: ', length, 'airtime: ', airtime, 'teaserImages: ', teaserImages, 'streams: ', streams);
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

	return that;

};