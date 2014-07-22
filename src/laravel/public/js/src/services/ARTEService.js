
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
	ARTESEARCHNEW = 'http://www.arte.tv/guide/de/plus7/par_dates?name=Heute&value=',
	PROXY_URL = '/proxy.php?url=',
	
	init = function(mModel) {
		//init ZDFService
		console.info('MediathekCrawler.ARTEService.init');
		mediathekModel = mModel;
	},

	searchString = function(searchString){



	},

	getNew = function(){

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		today = yyyy+'-'+mm+'-'+dd;

		$.ajax({
			url: PROXY_URL + encodeURI(ARTESEARCHNEW+String(today)),
			type: 'GET',
			success: function(data) {
				_onGetNew(data);
			},
			error: function(){
				console.warn('ERROR; ARTEService.getNew; AJAX-request did not recieve a response');
			}
		});

		// TODO:
		// gestern und vorgestern abfragen!
		// 
	},

	_onGetNew = function(data){
		// console.log("on get new");
		/*.find('div#catchup_videos').find('div#carousel_wrapper').find('ul.catchup_videos').find('li#video')*/
		$(data).find('div#carousel_wrapper').each(function (index, element){
			console.log("YAY");
			console.log($(element));
		});
	},

	dispose = function() {
		that = {};
	};


	that.init = init;
	that.searchString = searchString;
	that.getNew = getNew;

	return that;

};