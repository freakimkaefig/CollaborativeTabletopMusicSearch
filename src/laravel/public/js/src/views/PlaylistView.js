MediathekCrawler.PlaylistView = (function() {
	var that = {},


	init = function() {
		$("#new-list").on("click",showCreatePlaylist);
		$("#create-playlist").on("submit",hideCreatePlaylist);
		$("#button-create-playlist-cancel").on("click",hideCreatePlaylist);
		$("body").on("click","button[id^='delete-from-playlist-']",onDeleteVideo);
		$("body").on("click","button[id^='delete-playlist-']",onDeletePlaylist);

		if($("#video-playlist").length >0){
			var resolutionOrder = calculateOrder();

			video = videojs("#video-playlist");	
			video.resolutionSelector({force_types : ['video/mp4'],
    							default_res: resolutionOrder});
		}

	},
	/**
	 * Function to show create-palylist-div.
	 */
	showCreatePlaylist = function() {
		$("#create-playlist").removeClass("hidden");
	},
	/**
	 * Function to hide create-palylist-div.
	 */
	hideCreatePlaylist = function() {
		$("#create-playlist").addClass("hidden");
	},
	/**
	 * Function to delete video from playlist.
	 */
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
	/**
	 * Function to delete palylist.
	 */
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
	/**
	 * Function to calculate the quality of current video.
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
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});