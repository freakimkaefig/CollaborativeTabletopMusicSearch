MediathekCrawler.BookmarkView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.BookmarkView.init');
		//onDeleteBookmark();
		$("body").on("click","button[id^='delete-bookmark-']",onDeleteBookmark);
	},
	onDeleteBookmark = function(){
		
			$broadcastId = $(this).val();
			console.log($broadcastId);
			$.ajax({
				type: "GET",
				url: "http://mediathek-crawler/bookmarks/delete/"+$broadcastId,
				data: {},
			});
		$('#confirm-delete-'+$broadcastId).modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$("#list-item-"+$broadcastId).remove();
		
		$(that).trigger('feedback',["deleteVideo"]);

	};

	that.init = init;
	that.dispose = dispose;

	return that;
});