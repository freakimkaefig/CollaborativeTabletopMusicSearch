MediathekCrawler.BookmarkView = (function() {
	var that = {},


	init = function() {
		console.info('MediathekCrawler.BookmarkView.init');
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
		$('#confirm-delete-'+$broadcastId).modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$("#list-item-"+$broadcastId).remove();
		});
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});