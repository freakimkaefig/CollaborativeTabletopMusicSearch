MediathekCrawler.PlaylistView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.PlaylistView.init');
		$("#new-list").on("click",showCreatePlaylist);
		$("#create-playlist").on("submit",hideCreatePlaylist);
		onDeleteVideo();
	},

	showCreatePlaylist = function() {
		$("#create-playlist").removeClass("hidden");
	},
	hideCreatePlaylist = function() {
		$("#create-playlist").addClass("hidden");
	},
	onDeleteVideo = function(e){
		$("body").on("click","button[id^='delete-from-playlist-']",function(){
			$broadcastId = $(this).val();
			
			$.ajax({
				type: "GET",
				url: "http://mediathek-crawler/playlists/delete/"+$broadcastId,
				data: {},
			});
		$("#list-item-"+$broadcastId).remove();
		});
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});