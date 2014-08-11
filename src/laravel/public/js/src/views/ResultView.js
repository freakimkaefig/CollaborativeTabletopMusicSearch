MediathekCrawler.ResultView = (function() {
	var that = {},

	$resultWrapper = null,

	init = function() {
		console.info('MediathekCrawler.ResultView.init');
		
		$resultWrapper = $('#result-wrapper');
		$("#alphabetic-sort").on("click",alphabeticSort);
		$("#duration-sort").on("click",durationSort);
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
			'<div class="col-xs-2 '+badge+'"></div>'+
			'<img src=' + result._teaserImages[0]._url + ' class="img-responsive">' + 
			/*'<video class="video-js vjs-default-skin" controls preload="auto" width="400" height="244">' +
			'<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '">' +
			'</video>' + */
			'<div class="video-item-description col-xs-12">'+
				'<div class=" video-item-title">' + result._title + '</div>' +
				'<div  class="video-item-subtitle">' + result._subtitle + ' </div>' +
				'<div  class=""><span>' + result._airtime + '</span> | <span>' + result._length + '</span> | <span>' + result._station + '</span></div>' +
			'</div>'+
			'</a>' +
			'</div>'
			;

		$resultWrapper.append(resultElement);

		// retrieving results from localstorage
		//var _result = localStorage.getItem(result._id);
		//console.log(JSON.parse(_result));
	},
	getFromLocalstorage = function(){
		var result_json = localStorage.getItem("mediathek-crawler");
		results = JSON.parse(result_json);
		return results;
	},
	alphabeticSort = function(){
		results = getFromLocalstorage();

		sorted = results._results.sort(function(a, b){
			var titleA=a._title.toLowerCase();
			var titleB=b._title.toLowerCase();
			if (titleA < titleB){
			  return -1 
			}
			if (titleA > titleB){
			  return 1
			}
			return 0 //default return value (no sorting)
		})
		
		$resultWrapper.empty();
		sorted.forEach(function(result){
			appendResult(event, result);
		})
	},
	durationSort = function(){
		console.log("durationSort");
		results = getFromLocalstorage();

		sorted = results._results.sort(function(a, b){
			var durationA=a._length.toLowerCase();
			var durationB=b._length.toLowerCase();
			if (durationA < durationB){
			  return -1 
			}
			if (durationA > durationB){
			  return 1
			}
			return 0 //default return value (no sorting)
		})
		$resultWrapper.empty();
		sorted.forEach(function(result){
			appendResult(event, result);
		})

	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.appendResult = appendResult;

	return that;
});