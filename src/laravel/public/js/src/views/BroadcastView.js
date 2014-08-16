//TODO
// welches videoformat in welcher qualität?
// dynamischer wechsel der src attribute?

MediathekCrawler.BroadcastView = (function() {
	var that = {},

	$videoWrapper = null,
	$video = null,
	$infoWrapper = null,

	/**
	 * Public function to initialize the instance of BroadcastView
	 */
	init = function() {
		console.info('MediathekCrawler.BroadcastView.init');
		
		$videoWrapper = $('#video-wrapper');
		$video = $('#video');
		$infoWrapper = $('#info-wrapper');
		$descriptionWrapper = $("#description-wrapper");

		$("#choosePlaylist").on("click",onAddToPlaylist);
		$("#addToBookmarks").on("click", onAddBookmark);
		//onAddToPlaylist();
		//onAddBookmark();
	},

	/**
	 * Public function to render a video by the given id from localStorage
	 * @param {Integer}		Id of the result item in localStorage
	 */
	renderVideoById = function(id) {
		//console.log(id);
		var results_json = localStorage.getItem('mediathek-crawler'),
			results = JSON.parse(results_json);
			result = results._results[id];
			// console.log('BroadcastView results: ', results, ' || id: ',id);


		for (var i=result._streams.length-1; i>=0; i--) {
			var source = '<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '" data-res="'+ checkQuality(result._streams[i]._quality) + '">'
			$video.append(source);
			url = result._streams[i]._url;
		}

		var infoElement = 
			'<h3>Titel :</h3>'+
			'<div>' + result._title + '</div>' +
			/*'<div>' + result._details + '</div>' +*/
			'<div>' + result._subtitle + '</div>' +
			'<h3>Ausstrahlung :</h3>' +
			'<div>' + result._airtime+ '</div>' +
			'<h3>Dauer :</h3>' +
			'<div>' + result._length + '</div>' +
			'<h3>Sender :</h3>' +
			'<div id="icon-station"></div><div id="station">' + result._station + '</div>';

		
		$infoWrapper.prepend(infoElement);

		videojs("#video", {plugins : { resolutionSelector : {
    							force_types : [ 'video/webm', 'video/mp4' ],
    							default_res : "3"
							} }}, function(){
		});
		var descriptionElement = '<div>' + result._details + '</div>';
		$descriptionWrapper.append(descriptionElement);

		renderStationIcon(result._station);
		checkBookmarked(result);


	},
	renderVideoBookmark = function(id){
		result = JSON.parse($("#bookmark").val())[0];
		var streams = JSON.parse(result.url);
		for (var i=streams.length-1; i>=0; i--) {
			var source = '<source src="' + streams[i]._url + '" type="' + streams[i]._type + '" data-res="'+ checkQuality(streams[i]._quality) +'">'
			$video.append(source);
			url = streams[i]._url;
		}

		var infoElement = 
			'<h3>Titel:</h3>'+
			'<div>' + result.title + '</div>' +
			'<div>' + result.subtitle + '</div>' +
			/*'<div>' + result._details + '</div>' +*/
			'<h3>Ausstrahlung:</h3>' +
			'<div>' + result.airtime.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3.$2.$1") + '</div>' +
			'<h3>Dauer:</h3>' +
			'<div>' + result.duration + '</div>' +
			'<h3>Sender:</h3>' +
			'<div id="icon-station"></div><div id="station">' + result.station + '</div>';

		
		$infoWrapper.prepend(infoElement);

		videojs("#video", {plugins : { resolutionSelector : {
    							force_types : [ 'video/webm', 'video/mp4' ],
    							default_res : "3"
							} }}, function(){
		});

		
		var descriptionElement = '<div>' + result.details + '</div>';
		$descriptionWrapper.append(descriptionElement);
		
		renderStationIcon(result.station);
		checkBookmarked(result);


	},

	onAddToPlaylist = function(e){
		
		e.preventDefault();
		$("#selectPlaylist").removeClass("hidden");

		$("#add-to-playlist").click( function(e){
		$(that).trigger('feedback',["addPlaylist"]);
			e.preventDefault();
			$("#selectPlaylist").addClass("hidden");
			$.ajax({
	  			type: "GET",
	 			url: "http://mediathek-crawler/playlists/add/"+$("#select").val()+"/1",
				data: {
					"title": ((result._title) ? result._title : (result.title) ? result.title : 0),
					"subtitle": ((result._subtitle) ? result._subtitle : (result.subtitle) ? result.subtitle : 0),
					"airtime":((result._airtime) ? result._airtime : (result.airtime) ? result.airtime  : 0),
					"url": ((result._streams) ? result._streams : (result.url) ? JSON.parse(result.url)  : 0),
					"duration": ((result._length) ? result._length  : (result.duration) ? result.duration : 0),
					"image": ((result._teaserImages) ? result._teaserImages : (result.image) ? JSON.parse(result.image)  : 0),
					"details": ((result._details) ? result._details : (result.details) ? result.details : 0),
					"station": ((result._station) ? result._station : (result.station) ? result.station : 0),
				},
				dataType: 'json',		
			});
			//$(".feedback").show().delay(1000).fadeOut();
			return false;
		});

		$("#add-to-playlist-cancel").on("click", function(e){
			e.preventDefault();
			$("#selectPlaylist").addClass("hidden");

			return false;
		});
	},
	onAddBookmark = function(e){
			e.preventDefault();
			$(that).trigger('feedback',["addBookmark"]);

			$("#addToBookmarks").addClass("hidden");
			$("#bookmark-name").removeClass("hidden").html('<span class="glyphicon glyphicon-bookmark"></span>Gemerkt');
			$.ajax({
				type: "GET",
				url: "http://mediathek-crawler/bookmarks/add/"+$(this).val(),
				data: {
					"title": ((result._title) ? result._title : (result.title) ? result.title : 0),
					"subtitle": ((result._subtitle) ? result._subtitle : (result.subtitle) ? result.subtitle : 0),
					"airtime":((result._airtime) ? result._airtime : (result.airtime) ? result.airtime  : 0),
					"url": ((result._streams) ? result._streams : (result.url) ? JSON.parse(result.url)  : 0),
					"duration": ((result._length) ? result._length  : (result.duration) ? result.duration : 0),
					"image": ((result._teaserImages) ? result._teaserImages : (result.image) ? JSON.parse(result.image)  : 0),
					"details": ((result._details) ? result._details : (result.details) ? result.details : 0),
					"station": ((result._station) ? result._station : (result.station) ? result.station : 0),

				
				},
				dataType: 'json',		
			});
		
	},
	checkBookmarked = function(result){
		var allBookmarks = JSON.parse($("#all-bookmarks").val());
		
		for  (var i in allBookmarks){
			if (allBookmarks[i]['title'] == result._title || allBookmarks[i]['title'] == result.title){
				id = allBookmarks[i]['id'];
				$("#addToBookmarks").addClass("hidden");
				$("#bookmark-name").removeClass("hidden").html('<span class="glyphicon glyphicon-bookmark"></span>Gemerkt');
				deleteBookmark(id);
			}
		}

		
	},

	deleteBookmark = function(id){
		$("#bookmark-name").click(function(e){
			e.preventDefault();
			$(that).trigger('feedback',["deleteBookmark"]);
			$("#addToBookmarks").removeClass("hidden");
			$("#bookmark-name").addClass("hidden");
			$.ajax({
				type: "GET",
				url: "http://mediathek-crawler/bookmarks/delete/"+id,
				data: {},
			});
		})

	},
	renderStationIcon = function(station){
		station = station.toLowerCase();
		if(station.indexOf("erste") > -1){
			$("#icon-station").append("<img src='/css/images/Das_erste_2014.svg' />");
		}
		if(station.indexOf("zdf") > -1){
			$("#icon-station").append("<img src='/css/images/zdf.svg' />");
		}
		if(station.indexOf("srf") > -1){
			$("#icon-station").append("<img src='/css/images/srf.svg' />");
		}
		if(station.indexOf("arte") > -1){
			$("#icon-station").append("<img src='/css/images/arte.svg' />");
		}

	},
	checkQuality = function(quality){
		if(quality==3){
			return "Hoch";
		}
		else if (quality==2){
			return "Gut";
		}
		else if (quality==1){
			return "Mittel";
		}
		else if (quality==0){
			return "Schlecht";
		}
	};

	/**
	 * Public function to reset the instance of BroadcastView
	 */
	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.renderVideoById = renderVideoById;
	that.renderVideoBookmark = renderVideoBookmark;

	return that;
});