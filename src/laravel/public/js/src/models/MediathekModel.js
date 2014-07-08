MediathekCrawler.MediathekModel = function() {

	var that = {},

	results = null,
		
	
	init = function(){
		//init MediathekModel
		console.log("MediathekModel init");

		results = [];
	},

	

	teaserImage = function(resolution, url){
	    this.resolution = resolution;
	    this.url = url;
	},

	stream = function(basetype, type, quality, url, filesize){
	    this.basetype = basetype;
	    this.type = type;
	    this.quality = quality;
	    this.url = url;
	    this.filesize = filesize;
	},

	createStream = function(basetype, type, quality, url, filesize){

		return new stream(basetype, type, quality, url, filesize);
	},

	createTeaserImage = function(resolution, url){

		return new teaserImage(resolution, url);
	},

	addResults = function(station, title, details, length, airtime, teaserImages, streams) {
		
		var _result = {
			'station': station,
			'title': title,
			'details': details,
			'length': length,
			'airtime': airtime,
			'teaserImages': teaserImages,
			'streams': streams
		};
		results.push(_result);
		// trigger to view
		$(that).trigger('resultReceived', _result);
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