MediathekCrawler.ResultView = (function() {
	var that = {},

	$resultWrapper = null,
	$sliderWrapper = null,
	results = [],

	init = function() {
		console.info('MediathekCrawler.ResultView.init');
		
		$resultWrapper = $('#result-wrapper');
		$("#alphabetic-sort").on("click",alphabeticSort);
		$("#duration-sort").on("click",durationSort);
		$("#channel-sort").on("click",channelSort);
		$("#date-sort").on("click",dateSort);
		renderStationIcon($("#channel").text());
		$("#waiting").hide();
		$(document).ajaxStart(function(){
			$("#waiting").show();
		});
		$(document).ajaxStop(function(){
			console.log('AJAXSTOP');
			$("#waiting").hide();
		});
	},

	appendResult = function(event, result) {
		//console.log(result);
		if(result._origin._badge =="new"){
			badge = "badge-new";
		}
		else if(result._origin._badge =="hot"){
			badge = "badge-hot";
		}
		else{
			badge = "badge-null";
		}
		var resultElement = '<div class="video-item col-xs-12 col-sm-6 col-md-3 col-lg-2">' +
			// TODO: desicion process for teaserImage missing!
			'<a href="/video/' + result._id + '">' +
			'<div class="col-xs-2 '+badge+'"></div>'+
			'<img src=' + result._teaserImages[0]._url + ' class="img-responsive">' + 
			/*'<video class="video-js vjs-default-skin" controls preload="auto" width="400" height="244">' +
			'<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '">' +
			'</video>' + */
			'<div class="video-item-description col-xs-12">'+
				'<div class="video-item-title">' + result._title + '</div>' +
				'<div  class="video-item-subtitle">' + result._subtitle + ' &nbsp </div>' +
				'<div  class="video-item-time"><span>' + result._airtime + '</span> </div>' + 
				'<div class="video-item-channel"><span>' + result._station + '</span> | <span>' + result._length + '</span></div>' +
			'</div>'+
			'</a>' +
			'</div>'
			;

		$resultWrapper.append(resultElement);
		result.length = 0;
		// retrieving results from localstorage
		//var _result = localStorage.getItem(result._id);
		//console.log(JSON.parse(_result));
	},

	fillSlider = function(event, result) {
		if (result._id == 0) {
	        first = false;
			var slideElement = '<div class="item active">'+
	        	'<img src="' + result._teaserImages[0]._url + '" alt="' + result._title + '">'+
	        	'<div class="container">'+
	            	'<a href="/video/' + result._id + '">'+
		            	'<div class="carousel-caption">'+
		              		'<h1>' + result._title + '</h1>'+
		              		'<p>' + result._subtitle + '</p>'+
		            	'</div>'+
		            '</a>'+
	          	'</div>'+
	        '</div>';
    	} else {
    		var slideElement = '<div class="item">'+
	        	'<img src="' + result._teaserImages[0]._url + '" alt="' + result._title + '">'+
	        	'<div class="container">'+
	        		'<a href="/video/' + result._id + '">'+
		            	'<div class="carousel-caption">'+
		              		'<h1>' + result._title + '</h1>'+
		              		'<p>' + result._subtitle + '</p>'+
		            	'</div>'+
		            '</a>'+
	          	'</div>'+
	        '</div>';
    	}

        $indicatorWrapper = $('#carousel-wrapper .carousel-indicators');
		$indicatorWrapper.append('<li data-target="#myCarousel" data-slide-to="' + (result._id+1) + '"></li>');

		$sliderWrapper = $('#carousel-wrapper .carousel-inner');
		$sliderWrapper.append(slideElement);

		if (result._id == 0) {
        	$('#carousel-loading-item').remove();
        	$('#carousel-loading-indicator').remove();
        }
	},

	getFromLocalstorage = function(){
		var result_json = localStorage.getItem("mediathek-crawler");
		var results_storage = JSON.parse(result_json);
		return results_storage;
	},
	alphabeticSort = function(){
		var results = getFromLocalstorage()._results;
		if($("#alphabetic-sort").val() == "asc"){
			results.sort(function(a, b){
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
			$("#alphabetic-sort").val("desc");
		}
		else{
			results.sort(function(a, b){
				var titleA=a._title.toLowerCase();
				var titleB=b._title.toLowerCase();
				if (titleA < titleB){
				  return 1 
				}
				if (titleA > titleB){
				  return -1
				}
				return 0 //default return value (no sorting)
			})
			$("#alphabetic-sort").val("asc");		
		}
		
		$resultWrapper.empty();
		results.forEach(function(result){
			appendResult(event, result);
		})
	},
	durationSort = function(){
		results = getFromLocalstorage()._results;
		if($("#duration-sort").val()=="asc"){
			results.sort(function(a, b){
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
			$("#duration-sort").val("desc");
		}
		else{
			results.sort(function(a, b){
				var durationA=a._length.toLowerCase();
				var durationB=b._length.toLowerCase();
				if (durationA < durationB){
				  return 1 
				}
				if (durationA > durationB){
				  return -1
				}
				return 0 //default return value (no sorting)
			})
			$("#duration-sort").val("asc");
		}

		$resultWrapper.empty();
		results.forEach(function(result){
			appendResult(event, result);
		})
		return;
	},
	channelSort = function(){
		var results = getFromLocalstorage()._results;

		if($("#channel-sort").val() == "asc"){
			results.sort(function(a, b){
				var stationA=a._station.toLowerCase();
				var stationB=b._station.toLowerCase();
				if (stationA < stationB){
				  return -1 
				}
				if (stationA > stationB){
				  return 1
				}
				return 0 //default return value (no sorting)
			})
			$("#channel-sort").val("desc");
		}
		else{
			results.sort(function(a, b){
				var stationA=a._station.toLowerCase();
				var stationB=b._station.toLowerCase();
				if (stationA < stationB){
				  return 1 
				}
				if (stationA > stationB){
				  return -1
				}
				return 0 //default return value (no sorting)
			})
			$("#channel-sort").val("asc");		
		}
		
		$resultWrapper.empty();
		results.forEach(function(result){
			appendResult(event, result);
		})
	},
	dateSort = function(){
		results = getFromLocalstorage()._results;
		if($("#date-sort").val()=="asc"){
			results.sort(function(a, b){
				var airtimeA=a._airtime.toLowerCase();
				var airtimeB=b._airtime.toLowerCase();
				var partsA = airtimeA.split(/\s|\.|\:/);
				var airtimeA = partsA[2]+'-'+partsA[1]+'-'+partsA[0];/*+" "+partsA[3]+':'+partsA[4];*/
 				var partsB = airtimeB.split(/\s|\.|\:/);
				var airtimeB = partsB[2]+'-'+partsB[1]+'-'+partsB[0];/*+" "+partsB[3]+':'+partsB[4];*/					
				airtimeA = new Date(airtimeA).getTime();
				airtimeB = new Date(airtimeB).getTime();
				if (airtimeA < airtimeB){
				  return -1 
				}
				if (airtimeA > airtimeB){
				  return 1
				}
				return 0 //default return value (no sorting)
			})
			$("#date-sort").val("desc");
		}
		else{
			results.sort(function(a, b){
				var airtimeA=a._airtime.toLowerCase();
				var airtimeB=b._airtime.toLowerCase();
				var partsA = airtimeA.split(/\s|\.|\:/);
				var airtimeA = partsA[2]+'-'+partsA[1]+'-'+partsA[0];/*+" "+partsA[3]+':'+partsA[4];*/
 				var partsB = airtimeB.split(/\s|\.|\:/);
				var airtimeB = partsB[2]+'-'+partsB[1]+'-'+partsB[0];/*+" "+partsB[3]+':'+partsB[4];*/				
				airtimeA = new Date(airtimeA).getTime();
				airtimeB = new Date(airtimeB).getTime();
				if (airtimeA < airtimeB){
				  return 1 
				}
				if (airtimeA > airtimeB){
				  return -1
				}
				return 0 //default return value (no sorting)
			})
			$("#date-sort").val("asc");
		}

		$resultWrapper.empty();
		results.forEach(function(result){
			appendResult(event, result);
		})
		return;
	},
	renderStationIcon = function(station){
		$('#icon-station').tooltip();
		station = station.toLowerCase();
		if(station.indexOf("erste") > -1){
			$("#icon-station-results").append("<img src='/css/images/Das_Erste_2014.svg' />");
		}
		if(station.indexOf("zdf") > -1 ){
			$("#icon-station-results").append("<img src='/css/images/ZDF.svg' />");
			$("#icon-station-results").append("<img src='/css/images/ZDFneo.svg' />");
			$("#icon-station-results").append("<img src='/css/images/ZDFinfo.svg' />");
			$("#icon-station-results").append("<img src='/css/images/Zdf.kultur_logo.svg' />");
		}
		if(station.indexOf("srf") > -1){
			$("#icon-station-results").append("<img src='/css/images/srf.svg' />");
		}
		if(station.indexOf("arte") > -1){
			$("#icon-station-results").append("<img src='/css/images/Arte.svg' />");
		}
		if(station.indexOf("br") > -1){
			$("#icon-station-results").append("<img src='/css/images/br.svg' />");
		}


	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.appendResult = appendResult;
	that.fillSlider = fillSlider;

	return that;
});