MediathekCrawler.BRService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://www.br.de',
	PROXY_URL = '/proxy.php?url=',
	BR_NEW_URL = 'http://www.br.de/mediathek/video/programm/index.html';
	// Most viewed broadcasts
	BR_HOT_URL = 'http://www.br.de/mediathek/video/suche/tag-suche-mediathek-100~tagSearchMoreResults_count-12_entireBroadcast-false_start-0_-915410257bf253a3d2f95cebbaf43688c1e4944b.json?q=mostViewed&t=social',

	// constants for searching
	SEARCH_URL = 'http://www.br.de/mediathek/video/suche/?query=',
	SEARCH_PARAM_SORT_RELEVANCE = '&sort=relevance',
	SEARCH_PARAM_SORT_DATE = '&sort=date',
	SEARCH_PARAM_ENTIRE_BROADCAST = '&entireBroadcast=true',
	SEARCH_PARAM_SUBTITLES = '&subtitles=true',
	SEARCH_PARAM_PERIOD_TODAY = '&period=today',
	SEARCH_PARAM_PERIOD_YESTERDAY = '&period=yesterday',
	SEARCH_PARAM_PERIOD_WEEK = '&period=week',
	SEARCH_PARAM_PERIOD_MONTH = '&period=month',
	SEARCH_PARAM_DATE_FROM = '&dateFrom=',		// dateFormat: 01.07.2014
	SEARCH_PARAM_DATE_UNTIL = '&dateUntil=',	// dateFormat: 01.07.2014
	SEARCH_WRAPPER_ELEMENT = '#teaserBundleSearch',
	SEARCH_ITEM_WRAPPER = 'article.teaser',
	SEARCH_ITEM_URL = 'a.link_video',
	_model = null,
	getDatesOnce = 1;

	init = function(model) {
		_model = model;
	},


	/**
	 * Public function to search with a given string
	 * @param {String}		string to search
	 * @param {Integer}		type [0=>ByRelevance, 1=>ByDate]
	 */
	searchString = function(searchStr, type) {
		var origin = {
			_channel: 'BR',
			_method: 'searchString',
			_searchTerm: searchStr,
			_badge: null
		};
		switch (type) {
			case 0: 
				searchStringByRelevance(searchStr, origin);
				break;

			case 1: 
				searchStringByDate(searchStr, origin);
				break;
		}
	},

	/**
	 * Private function to search with given string sorted by relevance
	 * @param {String} 	The given keyword(s) to search for
	 * @param {Object} origin
	 */
	searchStringByRelevance = function(searchStr, origin) {
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_RELEVANCE);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data) {
				onSearchString(data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; BRService.searchStringByRelevance; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Private function to search with given string sorted by date
	 * @param {String} 	The given keyword(s) to search for
	 * @param {Object} origin
	 */
	searchStringByDate = function(searchStr, origin) {
		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr + SEARCH_PARAM_SORT_DATE);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			cache: false,
			success: function(data) {
				onSearchString(data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; BRService.searchStringByDate; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Callback function for async loading of search results
	 * @param {String|HTML}		HTML response of ajax call
	 * @param {Object} origin
	 */
	onSearchString = function(data, origin) {
		$(data).find('.teaserInner').each(function (index, element) {

			var detailUrl = $(element).find('.link_video').attr('href');
			if (detailUrl !== undefined) {
				loadDetails(detailUrl, origin);
			}
		});
	},

	/**
	 * Private function to load the broadcasts detail page
	 * @param {String}		url of the detail page
	 * @param {Object} origin
	 */
	loadDetails = function(url, origin) {
		var _url = PROXY_URL + encodeURI(BASE_URL + url);

		$.ajax({
			url: _url,
			type: 'GET',
			cache: false,
			success: function(data) {
				onLoadDetails(data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; BRService.loadDetails; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to fix format of a given string
	 * @param {String} length
	 */
	_fixBRLength = function(length){
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
	 * Function to replace chars within a given string
	 * @param {String} find
	 * @param {String} replace
	 * @param {String} str
	 */
	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	/**
	 * Callback function for parsing broadcast detail pages for details and stream urls
	 * @param {String}		HTML data of the detail page
	 * @param {Object} origin
	 */
	onLoadDetails = function(data, origin) {
		var _onclick = $(data).find('#playerFrame .player .avPlayer figure .clearFix a').attr('onclick');
		if (_onclick !== undefined) {
			// url for xml file containing streams is placed in click event handler
			// searching for string between {dataURL:' and '}
			var matches = _onclick.match(/\{dataURL:'(.*?)\'}/);
			var l = null;

			if (matches) {
			    var submatch = matches[1];
		    	l = $(data).find('.bcastData ul.meta li.duration time.duration').text();
		    	l = l.replace('.','');
			    var _result = {}
			    	_result._station = 'BR',
			    	_result._subtitle = $(data).find('.bcastData ul.title li.title').text(),
			    	_result._title = $(data).find('.bcastData header h3').text(),
			    	_result._length = _fixBRLength(l);
			    	_result._airtime = $(data).find('.bcastData ul.meta li.start time.start').text().replace(',', ''),
			    	_result._airtime = _result._airtime.replace('Uhr,','');
			    	_result._details = $(data).find('#bcastInfo .bcastContent p').text() + $(data).find('#bcastInfo .bcastContent div.cast').text(),
			    	_result._teaserImages = [],
			    	_result._teaserImages.push(_model.createTeaserImage('108x61', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-s'))),
			    	_result._teaserImages.push(_model.createTeaserImage('320x180', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-m'))),
			    	_result._teaserImages.push(_model.createTeaserImage('400x255', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-l'))),
			    	_result._teaserImages.push(_model.createTeaserImage('640x360', BASE_URL + $(data).find('#playerFrame .player .avPlayer figure .clearFix a figure img').data('src-xl'))),
			    	_result._streams = [];

			    loadStreams(_result, submatch, origin);
			}
		}
	},

	/**
	 * Function to get streams for videos
	 * @param {Object} results
	 * @param {String} url
	 * @param {Object} origin
	 */
	loadStreams = function(result, url, origin) {
		var _url = PROXY_URL + encodeURI(BASE_URL + url);
		$.ajax({
			url: _url,
			type: 'GET',
			cache: false,
			success: function(data) {
				onLoadStreams(result, data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; BRService.loadStreams; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to parse streams for videos
	 * @param {Object} results
	 * @param {String} url
	 * @param {Object} origin
	 */
	onLoadStreams = function(result, data, origin) {
		var x = $(data).find('assets').find('asset');
		$(x).each(function (index, element) {
			if ($(element).attr('type') !== 'HDS') {
				var basetype = null,
					type = 'video/' + $(element).find('mediaType').text(),
					quality = $(element).attr('type'),
					url = $(element).find('downloadUrl').text(),
					filesize = $(element).find('size').text();

				// stream qualities represented as strings in BR Mediathek
				switch (quality) {
					case 'MOBILE':
						quality = 0;
						break;
					case 'MOBILES':
						quality = 0;
						break;
					case 'STANDARD':
						quality = 1;
						break;
					case 'LARGE':
						quality = 2;
						break;
					case 'PREMIUM':
						quality = 3;
						break;
					case 'HD':
						quality = 3;
						break;
				}

				result._streams.push(_model.createStream(basetype, type, quality, url, filesize));
			}
		});

		// add result to model
		if(result._streams.length >0){
			_model.addResults(origin, result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
		}
	},

	/**
	 * Function to get 'new' videos
	 * @param {String|Integer} maxResults
	 * @param {String} dateUrl
	 */
	getBRNew = function(maxResults, dateUrl) {
		if(!maxResults || maxResults === undefined || maxResults === null){
			maxResults = 20;
		}

		$today = new Date();
		var $dd = $today.getDate();
		if($dd<10){$dd='0'+$dd} var nowDay = $dd

		var currentMonths = [ "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember" ];

		var currentMonth = currentMonths[$today.getMonth()];
		var lastMonth = currentMonths[$today.getMonth() - 1];
		var lastDayOfLastMonth = new Date($today.getFullYear(), ($today.getMonth() - 1) + 1, 0);
		lastDayOfLastMonth = lastDayOfLastMonth.getDate();

		var origin = {
			_channel: 'BR',
			_method: 'getBRNew',
			_searchTerm: null,
			_badge: 'new'
		};

		if(!dateUrl || dateUrl === undefined || dateUrl === null){
			if(maxResults >1){

				var _url = PROXY_URL + encodeURI(BR_NEW_URL);
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					success: function(data) {
						onGetBRNew(maxResults, data, origin);
							var yesterday = $(data).find('.epgCalendar').find('td');
							$(yesterday).each(function(index, element){

								if(parseInt(nowDay) > 2){

									var day = $(element).text();
									if(day.indexOf(currentMonth) > 0){
										var x = parseInt(nowDay) - 1;

										var cuttedDay = parseInt(day.slice(0, day.indexOf('.')));
										// get yesterday url:
										if(cuttedDay === x || cuttedDay === (x - 1)){
											getBRNew(maxResults, BASE_URL + $(element).find('a').attr('href'));
										}

									}
								}else if(parseInt(nowDay) === 2){
									var day = $(element).text();
									if(day.indexOf(currentMonth) > 0){
										var x = parseInt(nowDay) - 1;

										var cuttedDay = parseInt(day.slice(0, day.indexOf('.')));
										// get yesterday url:
										if(cuttedDay === x){
											getBRNew(maxResults, BASE_URL + $(element).find('a').attr('href'));
										}
									}
									if(day.indexOf(lastMonth) > 0){

										var cuttedDay = parseInt(day.slice(0, day.indexOf('.')));
										// get yesterday url:
										if(cuttedDay === lastDayOfLastMonth){
											getBRNew(maxResults, BASE_URL + $(element).find('a').attr('href'));
										}
									}
								}else if(parseInt(nowDay) === 1){
									var day = $(element).text();
									if(day.indexOf(lastMonth) > 0){

										var cuttedDay = parseInt(day.slice(0, day.indexOf('.')));
										// get yesterday url:
										if(cuttedDay === lastDayOfLastMonth || cuttedDay === lastDayOfLastMonth - 1){
											getBRNew(maxResults, BASE_URL + $(element).find('a').attr('href'));
										}
									}
								}

							});
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.warn('ERROR; BRService.getBRNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
					}
				});
			}else{
				var _url = PROXY_URL + encodeURI(BR_NEW_URL);
				$.ajax({
					url: _url,
					type: 'GET',
					cache: false,
					success: function(data) {
						onGetBRNew(maxResults, data, origin);
					},
					error: function(jqXHR, textStatus, errorThrown){
						console.warn('ERROR; BRService.getBRNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
					}
				});
			}
		}
		else{
			var _url = PROXY_URL + encodeURI(dateUrl);
			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data) {

					onGetBRNew(maxResults, data, origin);
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; BRService.getBRNew; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});
		}
	},

	/**
	 * Function to traverse data for 'new' videos
	 * @param {String|Integer} maxResult
	 * @param {String|HTML|JSON} data
	 * @param {Object} origin
	 */
	onGetBRNew = function(maxResults, data, origin){
		if(!maxResults || maxResults === undefined || maxResults === null){
			maxResults = 20;
		}
		var resp = $(data).find('.epgContainer').find('#BFS');
		var x = $(resp).find('.videoAvailable');
		var counter = 1;
		$(x).each(function(index,element){
			if(counter <= maxResults){

				var url = $(element).attr('data-ondemand_url');
				if (url !== undefined) {
					loadDetails(url, origin);
				}
				counter++;
			}
		});
	},

	/**
	 * Function to get 'hot' videos
	 */
	getBRHot = function() {
		var origin = {
			_channel: 'BR',
			_method: 'getBRHot',
			_searchTerm: null,
			_badge: 'hot'
		};
		var _url = PROXY_URL + encodeURI(BR_HOT_URL);
		$.ajax({
			url: _url,
			type: 'GET',
			cache: false,
			success: function(data) {

				onGetBRHot(data, origin);
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.warn('ERROR; BRService.getBRHot; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
			}
		});
	},

	/**
	 * Function to get details for 'hot' videos
	 * @param {String|HTML|JSON} data
	 * @param {Object} origin
	 */
	onGetBRHot = function(data, origin){
		// not implemented due to unavailable data from BR website
	},

	/**
	 * Function to check if a given array includes entries that own a given id
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
	 * Function to get videos by date
	 * @param {Object} origin
	 * @param {String|Date} startDate (DD.MM.YYYY)
	 * @param {String|Date} endDate (DD.MM.YYYY)
	 */
	getBRVideosByDate = function(startDate, endDate){
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
			var mm = currentDate.getMonth()+1;
			var yyyy = currentDate.getFullYear();
			if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} temp = dd+'.'+mm+'.'+yyyy

       		dates.push(temp)
        	currentDate = currentDate.addDays(1);
       }

        var _url = PROXY_URL + encodeURI(BR_NEW_URL);
		
   		
			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data) {	
					_onBRVideosByDate(data, origin, dates);
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.warn('ERROR; BRService.getBRVideosByDate; AJAX-request did not recieve a response\n',jqXHR, textStatus, errorThrown);
				}
			});
	},

	/**
	 * Function to get details for videos searched by date
	 * @param {String|HTML|JSON} data
	 * @param {Object} origin
	 * @param {Array} dates
	 */
	_onBRVideosByDate = function(data, origin, dates){
		var duplicates = [];

		for(i=0;i<dates.length;i++){
			var x = dates[i].slice(3,6)+dates[i].slice(0,3)+dates[i].slice(6,10);
			$today = new Date(x);
			var $dd = $today.getDate();
			if($dd<10){$dd='0'+$dd} var nowDay = $dd

			var currentMonths = [ "Januar", "Februar", "März", "April", "Mai", "Juni",
		"Juli", "August", "September", "Oktober", "November", "Dezember" ];

			var currentMonth = currentMonths[$today.getMonth()];

			var yesterday = $(data).find('.epgCalendar').find('td');
				$(yesterday).each(function(index, element){

					var day = $(element).text();
					var cuttedDay = parseInt(day.slice(0, day.indexOf('.')));
					if(cuttedDay<10){cuttedDay='0'+cuttedDay}

					if(day.indexOf(currentMonth) > 0){
						if(cuttedDay === nowDay){
							var y = BASE_URL + $(element).find('a').attr('href');
							if(_checkSRFDuplicates(duplicates, y)){

								getBRNew(null, y, origin);
								duplicates.push(y);
							}
						}
					}
				});
		}
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
	that.getBRNew = getBRNew;
	that.getBRHot = getBRHot;
	that.getBRVideosByDate = getBRVideosByDate;

	return that;
};