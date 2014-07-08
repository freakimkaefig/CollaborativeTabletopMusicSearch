MediathekCrawler.MediathekModel = function() {

	var that = {},
		
	
	init = function(){
		//init MediathekModel
		console.log("MediathekModel init");


	},

	teaserImage = function(resolution, url){
	    this.resolution = resolution;
	    this.url = url;
	},

	stream = function(basetype, quality, url, filesize){
	    this.basetype = basetype;
	    this.quality = quality;
	    this.url = url;
	    this.filesize = filesize;
	},

	createStream = function(basetype, quality, url, filesize){

		return new stream(basetype, quality, url, filesize);
	},

	createTeaserImage = function(resolution, url){

		return new teaserImage(resolution, url);
	};

	that.init = init;
	that.teaserImage = teaserImage;
	that.createTeaserImage = createTeaserImage;
	that.createStream = createStream;
	that.stream = stream;

	return that;

};