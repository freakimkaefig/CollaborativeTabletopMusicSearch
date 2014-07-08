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
	    this.quality = quality;
	    this.url = url;
	    this.filesize = filesize;
	},

	createStream = function(basetype, type, quality, url, filesize){

		return new stream(basetype, quality, url, filesize);
	},

	createTeaserImage = function(resolution, url){

		return new teaserImage(resolution, url);
	},

	addResults = function(station) {
		results.push(null);
		// trigger to view
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