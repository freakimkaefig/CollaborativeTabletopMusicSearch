MediathekCrawler.FeedbackView = (function() {
	var that = {},

	init = function() {
		console.info('MediathekCrawler.FeedbackView.init');
		$("#feedback-container").hide();
		
		
	},
	showFeedback = function(feedback){
		if(feedback=="addPlaylist"){
			$("#feedback-container>h4").text("Zur Playlist hinzugefügt!");
		}
		if(feedback == "addBookmark"){
			$("#feedback-container>h4").text("Der Merkliste hinzugefügt!");	
		}
		if(feedback == "deleteBookmark"){
			$("#feedback-container>h4").text("Aus der Merkliste gelöscht!");	
		}
		if(feedback =="deleteVideo"){
			$("#feedback-container>h4").text("Video wurde gelöscht!");
		}
		if(feedback =="deletePlaylist"){
			$("#feedback-container>h4").text("Playlist wurde gelöscht!");
		}
		setTimeout(function() { $("#feedback-container").slideDown(500); },100);
		setTimeout(function() { $("#feedback-container").slideUp(500); },2000);
		
	},
	
	dispose = function() {
		that = {};
	};


	that.init = init;
	that.showFeedback = showFeedback;

	return that;
});