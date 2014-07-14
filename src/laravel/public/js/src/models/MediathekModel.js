MediathekCrawler.MediathekModel = function() {

	var that = {},

	results = null,
	idCounter = null,
		
	
	init = function(){
		//init MediathekModel
		console.log("MediathekCrawler.MediathekModel.init");

		results = [];
		idCounter = 0;
	},

	

	teaserImage = function(resolution, url){
	    this._resolution = resolution;
	    this._url = url;
	},

	stream = function(basetype, type, quality, url, filesize){
	    this._basetype = basetype;
	    this._type = type;
	    this._quality = quality;
	    this._url = url;
	    this._filesize = filesize;
	},

	createStream = function(basetype, type, quality, url, filesize){

		return new stream(basetype, type, quality, url, filesize);
	},

	createTeaserImage = function(resolution, url){

		return new teaserImage(resolution, url);
	},

	addResults = function(station, title, subtitle, details, length, airtime, teaserImages, streams) {

		var _result = {
			'_id': idCounter,
			'_station': station,
			'_title': title,
			'_subtitle': subtitle
			'_details': details,
			'_length': length,
			'_airtime': airtime,
			'_teaserImages': teaserImages,
			'_streams': streams
		};
		results.push(_result);

		// saving results in localstorage
		storage_object = { '_results': results };
		storage_json = JSON.stringify(storage_object);
		localStorage.setItem('mediathek-crawler', storage_json);

		// trigger to view
		$(that).trigger('resultReceived', [ _result ]);
		idCounter++;
	},

	clearResults = function() {
		results = [];

		//reset localStorage
		// localStorage.removeItem('mediathek-crawler');
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.teaserImage = teaserImage;
	that.createTeaserImage = createTeaserImage;
	that.createStream = createStream;
	that.stream = stream;

	that.addResults = addResults;
	that.clearResults = clearResults;

	return that;

};