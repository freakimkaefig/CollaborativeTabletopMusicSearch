MediathekCrawler.PlaylistView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.PlaylistView.init');
		onDeleteBookmark();
	},
	onDeleteBookmark = function(){
		$("body").on("click","button[id^='delete-bookmark-']",function(){
			$broadcastId = $(this).val();
			console.log($broadcastId);
			$.ajax({
				type: "GET",
				url: "http://mediathek-crawler/bookmarks/delete/"+$broadcastId,
				data: {},
			});
		$("#list-item-"+$broadcastId).remove();
		});
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});