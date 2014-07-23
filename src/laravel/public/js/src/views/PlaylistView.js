MediathekCrawler.PlaylistView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.PlaylistView.init');
		$("#new-list").on("click",showCreatePlaylist);
		$("#create-playlist").on("submit",hideCreatePlaylist);
	},

	showCreatePlaylist = function() {
		$("#create-playlist").removeClass("hidden");
	},
	hideCreatePlaylist = function() {
		$("#create-playlist").addClass("hidden");
	},
	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});