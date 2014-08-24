MediathekCrawler.PlaylistView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.PlaylistView.init');
		$("#new-list").on("click",showCreatePlaylist);
		$("#create-playlist").on("submit",hideCreatePlaylist);
		$("#button-create-playlist-cancel").on("click",hideCreatePlaylist);
		$("#button-create-playlist-broadcast").on("click",savePlaylistFromBroadcast);
		//onDeleteVideo();
		//onDeletePlaylist();
		$("body").on("click","button[id^='delete-from-playlist-']",onDeleteVideo);
		$("body").on("click","button[id^='delete-playlist-']",onDeletePlaylist);

		if($("#video-playlist").length >0){

		videojs("#video-playlist", {plugins : { resolutionSelector : {
    							force_types : [ 'video/mp4' ],
    							default_res : "3"
							} }}, function(){
		
							
		});
		}

	},

	showCreatePlaylist = function() {
		$("#create-playlist").removeClass("hidden");
	},
	hideCreatePlaylist = function() {
		$("#create-playlist").addClass("hidden");
	},
	savePlaylistFromBroadcast = function() {
		console.log("save");
		$("#selectPlaylist").addClass("hidden");
		$.ajax({
				type: "GET",
				url: "/playlists/new/"+$("input[name='playlistName']").val(),
				data: {},
			});
		$(that).trigger('feedback',["addNewPlaylist"]);
		$("#playlistForm").load("video.blade.php #playlistForm");

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
		
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});