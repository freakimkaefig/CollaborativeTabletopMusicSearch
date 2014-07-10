MediathekCrawler.MediathekModel = function() {

	var that = {},

	results = null,
		
	
	init = function(){
		//init MediathekModel
		console.log("MediathekModel init");

		results = [];
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

	addResults = function(station, title, details, length, airtime, teaserImages, streams) {
		
		var _result = {
			'_station': station,
			'_title': title,
			'_details': details,
			'_length': length,
			'_airtime': airtime,
			'_teaserImages': teaserImages,
			'_streams': streams
		};
		results.push(_result);
		// trigger to view
		$(that).trigger('resultReceived', [ _result ]);
	},

	clearResults = function() {
		results = [];
	};

	that.init = init;
	that.teaserImage = teaserImage;
	that.createTeaserImage = createTeaserImage;
	that.createStream = createStream;
	that.stream = stream;

	that.addResults = addResults;
	that.clearResults = clearResults;

	return that;

};