MediathekCrawler.MediathekModel = function() {

	var that = {},

	results = null,
	idCounter = null,
		
	
	init = function(){
		//init MediathekModel
		console.info("MediathekCrawler.MediathekModel.init");

		results = [];
		idCounter = 0;
	},

	/**
	 * Helper class for streams teaser images
	 * @param {String}		the resolution of the image in "width"x"height"
	 * @param {String} 		the url of the image
	 */
	teaserImage = function(resolution, url){
	    this._resolution = resolution;
	    this._url = url;
	},

	/**
	 * Helper class for streams
	 * @param {String}		the files basetype
	 * @param {String} 		the files type for embedding in html (e.g. "video/mp4")
	 * @param {Integer}		the quality of the stream (between 0 and 3)
	 * @param {String}		the files url
	 * @param {filesize}	the files size
	 */
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
		console.log
		if(station != 'null' && title != 'null' && teaserImages != 'null' && streams != 'null' && streams && station && title && teaserImages && streams.length > 0){

			var _result = {
				'_id': idCounter,
				'_station': station,
				'_title': title,
				'_subtitle': subtitle,
				'_details': details,
				'_length': length,
				'_airtime': airtime,
				'_teaserImages': teaserImages,
				'_streams': streams
			};
			

				// console.log("number of streams before pushing to results: ",_result._streams.length);
				results.push(_result);

				// saving results in localstorage
				storage_object = { '_results': results };
				storage_json = JSON.stringify(storage_object);
				localStorage.setItem('mediathek-crawler', storage_json);

				// trigger to view
				$(that).trigger('resultReceived', [ _result ]);
				idCounter++;
			
		}
		else{
			console.log("some params missing @ model.addResults: ", "|| station: ", station, " || title: ", title, " || subtitle: ", subtitle, " || details: ", details, " || length: ", length, " || airtime: ", airtime, " || teaserImages: ", teaserImages, " || streams: ", streams);
		}
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
	that.createTeaserImage = createTeaserImage;
	that.createStream = createStream;

	that.addResults = addResults;
	that.clearResults = clearResults;

	return that;

};