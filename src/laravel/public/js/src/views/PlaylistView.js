MediathekCrawler.PlaylistView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.PlaylistView.init');
		$("#new-list").on("click",showCreatePlaylist);
		$("#create-playlist").on("submit",hideCreatePlaylist);
		$("#button-create-playlist-cancel").on("click",hideCreatePlaylist);
		onDeleteVideo();
		onDeletePlaylist();

	},

	showCreatePlaylist = function() {
		$("#create-playlist").removeClass("hidden");
	},
	hideCreatePlaylist = function() {
		$("#create-playlist").addClass("hidden");
	},
	onDeleteVideo = function(){
		$("body").on("click","button[id^='delete-from-playlist-']",function(){
			$broadcastId = $(this).val();
			
			$.ajax({
				type: "GET",
				url: "http://mediathek-crawler/playlists/video/delete/"+$broadcastId,
				data: {},
			});
		$("#list-item-"+$broadcastId).remove();
		});
	},
	onDeletePlaylist = function(){
		$("body").on("click","button[id^='delete-playlist-']",function(){
			$playlistId = $(this).val();
			
			$.ajax({
				type: "GET",
				url: "http://mediathek-crawler/playlists/delete/"+$playlistId,
				data: {},
			});
		$("#list-item-"+$playlistId).remove();
		});
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});