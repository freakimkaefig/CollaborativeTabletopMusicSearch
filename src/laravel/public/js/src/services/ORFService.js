MediathekCrawler.ORFService = function() {

	var that = {},

	// constant urls
	BASE_URL = 'http://tvthek.orf.at/',
	PROXY_URL = '/proxy.php?url=',
	ORF_NEW_URL = '',

	// constants for searching
	SEARCH_URL = 'http://tvthek.orf.at/search?q=',
	// SEARCH_URL = 'http://www1.ORF.de/themen/suche/suche100.jsp?q=klofrau',
	SEARCH_PARAMS = '', 
	SEARCH_PAGE2 = ''
	STREAM_URL = '',

	_model = null,
	once = 1,
	
	
	init = function(model) {
		//init ORFService
		console.info("MediathekCrawler.ORFService.init");
		_model = model;
	},

	_fixORFLength = function(length){
		if(length.indexOf(' Min.') > 0){
			length = length.replace(' Min.', '');
			return '00:'+length;
		}
		if(length.indexOf(' Std.') > 0){
			length = length.replace(' Std.', '');
			var hh = Number(length.slice(0,2));
			var mm = Number(length.slice(3,5));
			// console.log("HH UND MM: ",hh,mm);	
			if(Number(hh)<10){
				hh = '0'+String(hh);
			}
			if(Number(mm)<10){
				mm = '0'+String(mm);
			}
			return hh+':'+mm+':00';
		}
	},

	_replaceAll = function(find, replace, str) {
	  return str.replace(new RegExp(find, 'g'), replace);
	},

	searchString = function(searchStr) {
		var origin = {
			_channel: 'ORF',
			_method: 'searchString',
			_searchTerm: searchStr,
			_badge: null
		};

		var _searchUrl = PROXY_URL + encodeURI(SEARCH_URL + searchStr/* + SEARCH_PARAMS*/);
		// var _searchUrl = PROXY_URL + "www.ORF.de/mediathek/video/suche/videosucheinclude100-solrSendereihenSuche_index-mediathekvideos.jsp";
		console.log('ORF searchString url: ',_searchUrl);
		$.ajax({
			url: _searchUrl,
			type: 'GET',
			success: function(data){
				// console.log('ORF data: ',data);
				onSearchString(data, origin);
			}
		});
	},

	onSearchString = function(data, origin) {

		// console.log('ORF pageHeadline: ',pageHeadline);
		// find all divs with the class 'teaser'
		var x = $(data).find('.item');
		x.each(function (index, element) {
			// check if element has child with class 'media' and 'mediaA'
			if($(element).length > 0) {
				// get 'documentId' of video
				var	documentUrl = $(element).find('a').attr('href'),
					// broadcastUrlParams = _parseQueryString($(element).find(VIDEO_CLASS).find(LINK_CLASS).attr('href')),
					// documentId = broadcastUrlParams.documentId;
			// console.log('ORF onSearchString: ',documentUrl,documentId);
				
				// find container for details
				// var $textWrapper = $(element).find('div.textWrapper');
				_result = {};
				_result._station ='ORF';
			// console.log('ORF onSearchString STATION : ',$element.find('p.subtitle').text(), _result._station);
				_result._title = $(element).find('.item_title').text();
				_result._subtitle = ''; //$textWrapper.find('p.teasertext').text();
				_result._length = $(element).find('.meta_duration').text();
				_result._length = _fixORFLength(_result._length);
				_result._airtime = $(element).find('.meta_date').text();
				_result._airtime = _result._airtime.slice(4,100);
				_result._airtime += ' '+$(element).find('.meta_time').text();
				_result._airtime = _result._airtime.replace(' Uhr','');
				_result._teaserImages = [],
				_result._teaserImages.push(_model.createTeaserImage('395x209', $(element).find('.item_image').find('img').attr('src')));
				_result._streams = [];

				// console.log(documentUrl, _result);
				loadStreams(documentUrl, _result, origin);
			}
		});

	},

	// loadDetails = function(result, detailURL, origin) {
	// 	var detailUrl = PROXY_URL + encodeURI(detailURL);
	// 			// console.log('ORF loadDetails: ',result,origin, detailUrl,documentId);
	// 	$.ajax({
	// 		url: detailUrl,
	// 		type: 'GET',
	// 		success: function(data) {
	// 			onLoadDetails(documentId, result, data,origin);
	// 		}

	// 	});
	// },

	// onLoadDetails = function(documentId, result, data,origin) {
	// 	var _result = result;
	// 	_result._details = $(data).find(DETAIL_ELEMENT).text();

	// 	// load streams for result
	// 	loadStreams(documentId, _result,origin);
	// },

	/**
	 * Private function for async loading of streams for a search result
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 */
	loadStreams = function(documentUrl, result, origin) {
		var streamURL = PROXY_URL + encodeURI(documentUrl);
		// console.log('ORF loadStreams streamURL: ',streamURL);
		$.ajax({
			url: streamURL,
			type: 'GET',
			success: function(data) {
		// console.log('ORF loadStreams: ',typeof data, data);
				onLoadStreams(documentUrl, result, data, origin);
			}
		});
	},

	/**
	 * Callback function for async loading of streams
	 * @param {String|Integer}		documentId of the broadcast
	 * @param {object}				currently builded result (missing streams and preview images)
	 * @param {JSON}				JSON response of stream loading
	 */
	onLoadStreams = function(documentUrl, result, data, origin) {
		// var data = JSON.parse(data);
		// console.log('ORF onLoadStreams: ',typeof data, data);
		console.log('ORF onLoadStreams: ',$(data).find('#player_wrapper'));


		// console.log('ORF onLoadStreams result: ', result,origin);
		if(result._streams.length >0){
			_model.addResults(origin, result._station, result._title, result._subtitle, result._details, result._length, result._airtime, result._teaserImages, result._streams);
		}
	},

	// _parseQueryString = function(queryString) {
 //    	var params = {}, queries, temp, i, l;
 	
 // 		queryString = queryString.split('?')[1];

	//     // Split into key/value pairs
	//     queries = queryString.split('&');
 
	//     // Convert the array of strings into an object
	//     for (i = 0, l = queries.length; i < l; i++ ) {
	//         temp = queries[i].split('=');
	//         params[temp[0]] = temp[1];
	//     }
	 
	//     return params;
	// },

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.searchString = searchString;

	return that;

};