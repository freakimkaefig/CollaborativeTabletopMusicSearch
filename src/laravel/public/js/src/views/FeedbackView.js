MediathekCrawler.FeedbackView = (function() {
	var that = {},

	init = function() {
		console.info('MediathekCrawler.FeedbackView.init');
		
		
	},
	showFeedback = function(feedback){
		if(feedback=="addPlaylist"){
			$("#feedback-container>h2").text("Zur Playlist hinzugefügt!");
		}
		if(feedback == "addBookmark"){
			$("#feedback-container>h2").text("Der Merkliste hinzugefügt!");	
		}
		if(feedback == "deleteBookmark"){
			$("#feedback-container>h2").text("Aus der Merkliste gelöscht!");	
		}
		if(feedback =="deleteVideo"){
			$("#feedback-container>h2").text("Video wurde gelöscht!");
		}
		if(feedback =="deletePlaylist"){
			$("#feedback-container>h2").text("Playlist wurde gelöscht!");
		}
		$("#feedback-container").slideDown().delay(1000).slideUp();
	},

	
	
	dispose = function() {
		that = {};
	};


	that.init = init;
	that.showFeedback = showFeedback;

	return that;
});