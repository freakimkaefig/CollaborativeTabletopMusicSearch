MediathekCrawler.BroadcastView = (function() {
	var that = {},

	$videoWrapper = null,
	$video = null,
	$infoWrapper = null,
	result = null,

	/**
	 * Public function to initialize the instance of BroadcastView
	 */
	init = function() {		
		$videoWrapper = $('#video-wrapper');
		$video = $('#video_html5_api');
		$video_element = $('#video'); //this is because of mobile/desktop problems
		$infoWrapper = $('#info-wrapper');
		$descriptionWrapper = $("#description-wrapper");

		$("#choosePlaylist").on("click",onAddToPlaylist);
		$("#addToBookmarks").on("click", onAddBookmark);
	

	},

	/**
	 * Function for calculating the order of the videos for every display resolution.
	 */
	calculateOrder = function(){
		var order;
		if($('#xs-helper').is(':visible')) {
			order = "Schlecht, Mittel, Gut, Hoch";
		}else if($('#sm-helper').is(':visible')){
			order = "Mittel, Schlecht, Gut, Hoch";
		}else if($('#md-helper').is(':visible')){
			order = "Hoch, Gut, Mittel, Schlecht";
		}else if(($('#lg-helper').is(':visible'))){
			order = "Hoch, Gut, Mittel, Schlecht";
		}
		else{
			order="Hoch, Gut, Mittel, Schlecht";
		}
		return order;
	},
	/**
	 * Public function to render a video by the given id from localStorage
	 * @param {Integer}		Id of the result item in localStorage
	 */
	renderVideoById = function(id) {

		var results_json = localStorage.getItem('mediathek-crawler'),
			results = JSON.parse(results_json);
			result = results._results[id];
		
		var ready;
		sources = [];
		
		for (var i=result._streams.length-1; i>=0; i--) {
			var source = '<source class="source" src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '" data-res="'+ checkQuality(result._streams[i]._quality) + '">'
			$video_element.append(source);
			$video.append(source);
			source_b = { type:result._streams[i]._type,src: result._streams[i]._url, "data-res": checkQuality(result._streams[i]._quality) };
			sources.push(source_b);
			url = result._streams[i]._url;
			}
		
		var resolutionOrder = calculateOrder();
		video = videojs("#video");
		// console.log('VJS: ',video.FullscreenToggle);
		video.on('fullscreenchange', FullScreenToggle);
		video.options().sources = sources; 
		$("#video>.source").remove();
		video.resolutionSelector({force_types : ['video/mp4'],
    							default_res: resolutionOrder});
		
		var infoElement = 
			'<h3>Titel :</h3>'+
			'<div>' + result._title + '</div>' +
			'<div>' + result._subtitle + '</div>' +
			'<h3>Ausstrahlung :</h3>' +
			'<div>' + result._airtime+ '</div>' +
			'<h3>Dauer :</h3>' +
			'<div>' + result._length + '</div>' +
			'<h3>Sender :</h3>' +
			'<div id="icon-station" data-toggle="tooltip" data-placement="right" title="'+result._station+'"></div><div id="station">' + result._station + '</div>';

		
		$infoWrapper.prepend(infoElement);
		
		var descriptionElement = '<div>' + result._details + '</div>';
		$descriptionWrapper.append(descriptionElement);

		renderStationIcon(result._station);
		checkBookmarked(result);


	},

	FullScreenToggle = function(event){
		if($('#xs-helper').is(':visible')){
			console.log('XS helper visible');
			if($('.snap-drawers').hasClass('hidden')){
				$('.snap-drawers').removeClass('hidden');
			}else{
				$('.snap-drawers').addClass('hidden');
			}
			if($('#to-top').hasClass('hidden')){
				$('#to-top').removeClass('hidden');
			}else{
				$('#to-top').addClass('hidden');
			}
		}
	},

	/**
	 * Public function to render a bookmarked video by the given id from databse
	 * @param {Integer}		Id of the result item in the database
	 */
	renderVideoBookmark = function(id){
		result = JSON.parse($("#bookmark").val())[0];
		var streams = JSON.parse(result.url);
		sources = [];

		for (var i=streams.length-1; i>=0; i--) {
			var source = '<source src="' + streams[i]._url + '" type="' + streams[i]._type + '" data-res="'+ checkQuality(streams[i]._quality) +'">'
			$video_element.append(source);
			$video.append(source);
			source_b = { type:streams[i]._type,src: streams[i]._url, "data-res": checkQuality(streams[i]._quality) };
			sources.push(source_b);
			url = streams[i]._url;
		}

		var resolutionOrder = calculateOrder();
		video = videojs("#video");
		video.options().sources = sources; 
		$("#video>.source").remove();
		video.resolutionSelector({force_types : ['video/mp4'],
    							default_res: resolutionOrder});
		var infoElement = 
			'<h3>Titel:</h3>'+
			'<div>' + result.title + '</div>' +
			'<div>' + result.subtitle + '</div>' +
			'<h3>Ausstrahlung:</h3>' +
			'<div>' + result.airtime.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3.$2.$1") + '</div>' +
			'<h3>Dauer:</h3>' +
			'<div>' + result.duration + '</div>' +
			'<h3>Sender:</h3>' +
			'<div id="icon-station"></div><div id="station">' + result.station + '</div>';

		
		$infoWrapper.prepend(infoElement);

		var descriptionElement = '<div>' + result.details + '</div>';
		$descriptionWrapper.append(descriptionElement);
		
		renderStationIcon(result.station);
		checkBookmarked(result);


	},
	/**
	 * Function to save a new playlist an the current video into the database.
	 */
	savePlaylistFromBroadcast = function() {
		$("#selectPlaylist").addClass("hidden");
		$.ajax({
				type: "GET",
				url: "/playlists/new/"+$("input[name='playlistName']").val(),
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
				dataType: 'json'
			});
		setTimeout($("#playlistForm").load("video.blade.php #playlistForm"),600);
		$("#playlistForm").attr("id","oldform");
		$(that).trigger('feedback',["addNewPlaylist"]);
		$("#button-create-playlist-broadcast").on("click",savePlaylistFromBroadcast);


	},
	/**
	 * Function to add video to selected playlist.
	 * @param {Event}		Click event
	 */
	onAddToPlaylist = function(e){
		
		e.preventDefault();
		$("#selectPlaylist").removeClass("hidden");
		$("#button-create-playlist-broadcast").on("click",savePlaylistFromBroadcast);

		$("#add-to-playlist").on("click", function(e){
		$(that).trigger('feedback',["addPlaylist"]);
			e.preventDefault();
			$("#selectPlaylist").addClass("hidden");
			$.ajax({
	  			type: "GET",
	 			url: "/playlists/add/"+$("#select").val()+"/1",
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
			setTimeout($("#playlistForm").load("video.blade.php #playlistForm"),600);
		});

		$("#add-to-playlist-cancel").on("click", function(e){
			e.preventDefault();
			$("#selectPlaylist").addClass("hidden");

			return false;
		});
	},
	/**
	 * Function to add video to bookmarks.
	 * @param {Event}		Click event
	 */
	onAddBookmark = function(e){
			e.preventDefault();
			$(that).trigger('feedback',["addBookmark"]);

			$("#addToBookmarks").addClass("hidden");
			$("#bookmark-name").removeClass("hidden").html('<span class="glyphicon glyphicon-bookmark"></span>Gemerkt');
			$.ajax({
				type: "GET",
				url: "/bookmarks/add/"+$(this).val(),
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
				success: function(data){
					deleteBookmark(data);
				}		
			});
				
	},
	/**
	 * Public function to check if video is a bookmarks.
	 * @param {Object}		the video result
	 */
	checkBookmarked = function(result){
		var allBookmarks = JSON.parse($("#all-bookmarks").text());
		
		for  (var i in allBookmarks){
			if (allBookmarks[i]['title'] == result._title || allBookmarks[i]['title'] == result.title){
				id = allBookmarks[i]['id'];
				$("#addToBookmarks").addClass("hidden");
				$("#bookmark-name").removeClass("hidden").html('<span class="glyphicon glyphicon-bookmark"></span>Gemerkt');
				deleteBookmark(id);
			}
		}

		
	},
	/**
	 * Public function to delete bookmark.
	 * @param {Integer}		id of the bookmark
	 */
	deleteBookmark = function(id){
		$("#bookmark-name").click(function(e){
			e.preventDefault();
			$(that).trigger('feedback',["deleteBookmark"]);
			$("#addToBookmarks").removeClass("hidden");
			$("#bookmark-name").addClass("hidden");
			$.ajax({
				type: "GET",
				url: "/bookmarks/delete/"+id,
				data: {},
			});
		})

	},
	/**
	 * Public function to render the station icons.
	 * @param {String}		name of the station
	 */
	renderStationIcon = function(station){
		$('#icon-station').tooltip();
		station = station.toLowerCase();
		if(station.indexOf("erste") > -1){
			$("#icon-station").append("<img src='/css/images/Das_Erste_2014.svg' />");
		}
		if(station =="zdf" ){
			$("#icon-station").append("<img src='/css/images/ZDF.svg' />");
		}
		if(station.indexOf("zdfneo") > -1){
			$("#icon-station").append("<img src='/css/images/ZDFneo.svg' />");
		}
		if(station.indexOf("zdfinfo") > -1){
			$("#icon-station").append("<img src='/css/images/ZDFinfo.svg' />");
		}
		if(station.indexOf("zdf.kultur") > -1){
			$("#icon-station").append("<img src='/css/images/Zdf.kultur_logo.svg' />");
		}
		if(station.indexOf("srf") > -1){
			$("#icon-station").append("<img src='/css/images/srf.svg' />");
		}
		if(station.indexOf("arte") > -1){
			$("#icon-station").append("<img src='/css/images/Arte.svg' />");
		}
		if(station.indexOf("br") > -1){
			$("#icon-station").append("<img src='/css/images/br.svg' />");
		}
		if(station.indexOf("orf") > -1){
			$("#icon-station").append("<img src='/css/images/ORF_logo.svg' />");
		}


	},
	/**
	 * Function to check and format quality of the video for videojs.
	 * @param {quality}		quality in the model or database
	 */
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