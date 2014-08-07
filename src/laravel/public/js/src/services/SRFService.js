
			    //TODO:
			    // Stringsuche: search further streams via
			    	// http://www.srf.ch/webservice/cvis/segment/ID/.json
			    	// search param (sortierung nach relevanz/neueste/... ???)
			   	// fix length to '00:00:00'
			    // Kategorien
			    // hot
			    // new
			    // filter

MediathekCrawler.SRFService = function() {

	var that = {},
	mediathekModel = null,
	PROXY_URL = '/proxy.php?url=',
	SRFSEARCHSTRING = 'http://www.srf.ch/player/tv/suche?query=',
	once = 0;
	
	init = function(mModel) {
		//init ZDFService
		console.info('MediathekCrawler.SRFService.init');
		mediathekModel = mModel;
	},

	searchString = function(searchString, maxResults){
		if(searchString.indexOf(' ') > 0){
			// console.log('SRF searchString: ',searchString);
			searchString = searchString.replace(' ','+');
		}
		// if(maxResults < 1 || maxResults === null || maxResults === 'undefined' || maxResults === undefined){
		// 	maxResults = 10;
		// }

		var _url = PROXY_URL + encodeURI(SRFSEARCHSTRING+String(searchString));
			
			console.log("SRF search url: ", _url);
			$.ajax({
				url: _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					// console.log('YAAAY', data);
					_onSearchString(data);
					
				},
				error: function(){
					console.warn('ERROR; SRFService.searchString(); AJAX-request did not recieve a response');
				}
			});
	},

	_onSearchString = function(data){
		// console.log('div: ',$(data).find('.result_row'));
		$(data).find('.result_row').each(function(index, element){

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
			// length = length.replace(' Min','');
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

			$.ajax({
				url: PROXY_URL + _url,
				type: 'GET',
				cache: false,
				success: function(data, textStatus, jqXHR) {
					// console.log('YAAAY', $(data).find('.button_download_img'));
					streamUrl = $(data).find('.button_download_img').attr('href');

					if(streamUrl != 'undefined' && streamUrl != undefined){
						// console.log('Stream Url: ',streamUrl);

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
					// fuck!?
					}
					else{
						_pushResultToModel(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					}

				},
				error: function(){
					console.warn('ERROR; SRFService._onSearchString(); AJAX-request did not recieve a response');
				}
			});
		});
	},

	dispose = function() {
		that = {};
	};


	that.init = init;
	that.searchString = searchString;

	return that;

};