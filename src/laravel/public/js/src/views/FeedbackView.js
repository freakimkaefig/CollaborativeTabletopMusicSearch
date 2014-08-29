MediathekCrawler.FeedbackView = (function() {
	var that = {},

	/**
	 * Public function to initialize the instance of FeedbackView.
	 */
	init = function() {
		$("#feedback-container").hide();
	},
	/**
	 * Shows the Feedback.
	 * @param {String}		the name of the feedback which should be shown
	 */
	showFeedback = function(feedback){
		
		if(feedback=="addPlaylist"){
			$("#feedback-container>h4").text("Zur Playlist hinzugefügt!");
			$("#feedback-container-mobile>h4").text("Zur Playlist hinzugefügt!");
		}
		if(feedback == "addBookmark"){
			$("#feedback-container>h4").text("Zur Merkliste hinzugefügt!");
			$("#feedback-container-mobile>h4").text("Zur Merkliste hinzugefügt!");	
		}
		if(feedback == "deleteBookmark"){
			$("#feedback-container>h4").text("Aus der Merkliste gelöscht!");
			$("#feedback-container-mobile>h4").text("Aus der Merkliste gelöscht!");	
		}
		if(feedback =="deleteVideo"){
			$("#feedback-container>h4").text("Video wurde gelöscht!");
			$("#feedback-container-mobile>h4").text("Video wurde gelöscht!");
		}
		if(feedback =="deletePlaylist"){
			$("#feedback-container>h4").text("Playlist wurde gelöscht!");
			$("#feedback-container-mobile>h4").text("Playlist wurde gelöscht!");
		}
		if(feedback =="addNewPlaylist"){
			$("#feedback-container>h4").text("Video der erstellten Playlist hinzugefügt!");
			$("#feedback-container-mobile>h4").text("Video der erstellten Playlist hinzugefügt!");
		}

		if($('#xs-helper').is(':visible')) {
			setTimeout(function() { $("#feedback-container-mobile").slideDown(500); },100);
			setTimeout(function() { $("#feedback-container-mobile").slideUp(500); },2000);
			
		}else{	
			setTimeout(function() { $("#feedback-container").slideDown(500); },100);
			setTimeout(function() { $("#feedback-container").slideUp(500); },2000);
		}		
	},
	/**
	 * Public function to reset the instance of FeedbackView.
	 */
	dispose = function() {
		that = {};
	};


	that.init = init;
	that.showFeedback = showFeedback;

	return that;
});