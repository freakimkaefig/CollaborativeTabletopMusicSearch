MediathekCrawler.PlaylistView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.PlaylistView.init');
		$("#new-list").on("click",showCreatePlaylist);
		$("#create-playlist").on("submit",hideCreatePlaylist);
		$("#button-create-playlist-cancel").on("click",hideCreatePlaylist);
		//$("#button-create-playlist-broadcast").on("click",savePlaylistFromBroadcast);
		//onDeleteVideo();
		//onDeletePlaylist();
		$("body").on("click","button[id^='delete-from-playlist-']",onDeleteVideo);
		$("body").on("click","button[id^='delete-playlist-']",onDeletePlaylist);

		if($("#video-playlist").length >0){
			var resolutionOrder = calculateOrder();

			video = videojs("#video-playlist");	
			video.resolutionSelector({force_types : ['video/mp4'],
    							default_res: resolutionOrder});
		}

	},

	showCreatePlaylist = function() {
		$("#create-playlist").removeClass("hidden");
	},
	hideCreatePlaylist = function() {
		$("#create-playlist").addClass("hidden");
	},
	onDeleteVideo = function(){
		

			$broadcastId = $(this).val();
			
			$.ajax({
				type: "GET",
				url: "/playlists/delete/video/"+$broadcastId,
				data: {},
			});
		$('#confirm-delete-'+$broadcastId).modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$("#list-item-"+$broadcastId).remove();
		$(that).trigger('feedback',["deleteVideo"]);
		
	},
	onDeletePlaylist = function(){
		$playlistId = $(this).val();
			
		$.ajax({
				type: "GET",
				url: "/playlists/delete/"+$playlistId,
				data: {},
			});
		$('#confirm-delete-'+$playlistId).modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$("#list-item-"+$playlistId).remove();
		$(that).trigger('feedback',["deletePlaylist"]);
		
	},
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
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});