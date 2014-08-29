MediathekCrawler.BookmarkView = (function() {
	var that = {},
	
	/**
	 * Public function to initialize the instance of BookmarkView.
	 */
	init = function() {
		$("body").on("click","button[id^='delete-bookmark-']",onDeleteBookmark);
	},
	/**
	* Function to delete bookmark from database.
	*/
	onDeleteBookmark = function(){
		$broadcastId = $(this).val();
			$.ajax({
				type: "GET",
				url: "/bookmarks/delete/"+$broadcastId,
				data: {},
			});
		$('#confirm-delete-'+$broadcastId).modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		$("#list-item-"+$broadcastId).remove();
		
		$(that).trigger('feedback',["deleteVideo"]);

	};

	that.init = init;
	return that;
});