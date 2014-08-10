MediathekCrawler.ResultView = (function() {
	var that = {},

	$resultWrapper = null,

	init = function() {
		console.info('MediathekCrawler.ResultView.init');
		
		$resultWrapper = $('#result-wrapper');
	},

	appendResult = function(event, result) {
		// console.log(result);
		
		if(result._origin._badge =="new"){
			badge = "badge-new";
		}
		else if(result._origin._badge =="hot"){
			badge = "badge-hot";
		}
		else{
			badge = "badge-null";
		}
		var resultElement = '<div class="video-item col-xs-6 col-sm-3 col-lg-2">' +
			// TODO: desicion process for teaserImage missing!
			'<a href="/video/' + result._id + '">' +
			'<div class="col-xs-3 '+badge+'"></div>'+
			'<img src=' + result._teaserImages[0]._url + ' class="img-responsive">' + 
			/*'<video class="video-js vjs-default-skin" controls preload="auto" width="400" height="244">' +
			'<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '">' +
			'</video>' + */
			'<div class="video-item-description col-xs-12">'+
				'<div class=" video-item-title">' + result._title + '</div>' +
				'<div  class="">' + result._subtitle + ' </div>' +
				'<div  class=""><span>' + result._airtime + '</span> | <span>' + result._length + '</span> | <span>' + result._station + '</span></div>' +
			'</div>'+
			'</a>' +
			'</div>'
			;

		$resultWrapper.append(resultElement);

		// retrieving results from localstorage
		// var _result = localStorage.getItem(result._id);
		// console.log(JSON.parse(_result));
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.appendResult = appendResult;

	return that;
});