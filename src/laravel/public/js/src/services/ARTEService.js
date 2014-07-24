
			    //TODO:
			    // searchString
			    // hot
			    // new
			    // rubriken
			    // INFO
			    // CONCERT
			    // FUTURE?

MediathekCrawler.ARTEService = function() {

	var that = {},
	mediathekModel = null,
	ARTESEARCHNEW = 'http://www.arte.tv/papi/tvguide/epg/schedule/D/L3/',
	PROXY_URL = '/proxy.php?url=',
	
	init = function(mModel) {
		//init ZDFService
		console.info('MediathekCrawler.ARTEService.init');
		mediathekModel = mModel;
	},

	searchString = function(searchString){



	},
	/*
	Gets videos from the last 3 days, starting & including today
	*/
	getNew = function(){

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

		var _url = PROXY_URL + encodeURI(ARTESEARCHNEW+String(dayBeforeYesterday)+'/'+String(today)+'.json');
		// console.log('ARTEService; getNew: ', _url);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {
				_onGetNew(data);
			},
			error: function(){
				console.warn('ERROR; ARTEService.getNew; AJAX-request did not recieve a response');
			}
		});
	},

	_onGetNew = function(data){

		var response = $.parseJSON(data);
		// console.log(response.abstractBroadcastList.length);
		if(response.abstractBroadcastList.length > 0){

			$.each(response.abstractBroadcastList, function(index, element) {
				
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
					
					var ti = mediathekModel.createTeaserImage(0, element.IMG.IUR);
			    	teaserImages.push(ti);
				}catch(e){
				   // console.log(e);
				}
				try{	
					var ti2 = mediathekModel.createTeaserImage(0, element.VDO.programImage);
			    	teaserImages.push(ti2);
				}catch(e){
				   // console.log(e);
				}
				try{
					var ti3 = mediathekModel.createTeaserImage(0, element.VDO.VTU.original);
			    	teaserImages.push(ti3);
				}catch(e){
				   // console.log(e);
				}
				try{	
					var ti4 = mediathekModel.createTeaserImage(0, element.VDO.VTU.IUR);
			    	teaserImages.push(ti4);

				}catch(e){
				   // console.log(e);
				}

				//get remaining infos
				try{
					details = element.DSS;
				}catch(e){
				   // console.log(e);
				}
				try{
					title = element.TIT;
				}catch(e){
				   // console.log(e);
				}
				try{
					assetID = element.programId;
				}catch(e){
				   // console.log(e);
				}
				try{
					length = element.BAT;
				}catch(e){
				   // console.log(e);
				}
				try{
					airtime = element.BDT;
					airtime = String(airtime).slice(0, airtime.length - 5);
					airtime = airtime.trim();
					// console.log('airtime: ',airtime);
				}catch(e){
				   // console.log(e);
				}
				try{
					station = element.POR;
				}catch(e){
				   // console.log(e);
				}
				try{
					subtitle = element.STL;
				}catch(e){
				   // console.log(e);
				}
				try{
					streamUrl = element.VDO.videoStreamUrl;
				}catch(e){
				   // console.log(e);
				}
				
				// search Streams
				if(streamUrl != ''){
					_searchStreams(assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl);
				}else{
					console.log('Could not fetch ALL.json-URL for ', title, ' with ID: ',assetID);
				}
				
			});
		}
	},

	_searchStreams = function(assetID, title, subtitle, details, station, length, airtime, teaserImages, streamUrl){
		var streams = [],
		_url = PROXY_URL + encodeURI(streamUrl);
		// console.log('ARTEService; getNew: ', _url);

		$.ajax({
			url: _url,
			type: 'GET',
			success: function(data) {

				var response = $.parseJSON(data);
				// console.log(response.abstractBroadcastList.length);
				try{

					if(response.video.VSR.length > 0){

						$.each(response.video.VSR, function(index, element) {
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
						    				quality = 0;
						    				break;
						    			case 'EQ':
						    				quality = 1;
						    				break;
						    			case 'MQ':
						    				quality = 2;
						    				break;
						    			case 'HQ':
						    				quality = 3;
						    				break;
					    			}

						    		var stream = mediathekModel.createStream(basetype, type, quality, url, filesize);
						    		//console.log('basetype: ',basetype,', stream: ',stream._url);
									streams.push(stream);

					    		}
				    		}catch(e){
				    			//fuck.	
				    		}

						});
					}

					if(streams.length < 1){				
						console.log('\'',title, '\' has ', streams.length, ' streams. \nCHECK: ',streamUrl);
					}
					else{
						_pushResultToModel(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams);
					}

				}catch(e){
					console.log('could not fetch streaming urls: ',e);
				}
			},
			error: function(){
				console.warn('ERROR; ARTEService.getNew; AJAX-request did not recieve a response');
			}
		});

	},

	_pushResultToModel = function(title, subtitle, details, station, assetID, length, airtime, teaserImages, streams){
		// console.log('pushing to result model');
		// if(station != 'null' && title != 'null' && subtitle != 'null' && details != 'null' && length != 'null' && airtime != 'null' && teaserImages != 'null' && streams && station && title && subtitle && details && length && airtime && teaserImages && streams){

			mediathekModel.addResults(station, title, subtitle, details, length, airtime, teaserImages, streams);
		// }
		// else{
		// console.log('some params missing @ ARTEService._pushResultToModel: ', 'station: ', station, 'title: ', title, 'subtitle: ', subtitle, 'details: ', details, 'length: ', length, 'airtime: ', airtime, 'teaserImages: ', teaserImages, 'streams: ', streams);
		// }
		// console.log('number of streams: ',streams.length);
	},

	dispose = function() {
		that = {};
	};


	that.init = init;
	that.searchString = searchString;
	that.getNew = getNew;

	return that;

};