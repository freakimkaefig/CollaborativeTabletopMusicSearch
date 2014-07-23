//TODO
// welches videoformat in welcher qualität?
// dynamischer wechsel der src attribute?

MediathekCrawler.BroadcastView = (function() {
	var that = {},

	$videoWrapper = null,
	$video = null,
	$infoWrapper = null,

	/**
	 * Public function to initialize the instance of BroadcastView
	 */
	init = function() {
		console.info('MediathekCrawler.BroadcastView.init');
		
		$videoWrapper = $('#video-wrapper');
		$video = $('#video');
		$infoWrapper = $('#info-wrapper');
		$descriptionWrapper = $("#description-wrapper");

		onAddToPlaylist();
	},

	/**
	 * Public function to render a video by the given id from localStorage
	 * @param {Integer}		Id of the result item in localStorage
	 */
	renderVideoById = function(id) {
		//console.log(id);
		var results_json = localStorage.getItem('mediathek-crawler'),
			results = JSON.parse(results_json);
			result = results._results[id];

		//console.log(result);


		for (var i=result._streams.length-1; i>=0; i--) {
			var source = '<source src="' + result._streams[i]._url + '" type="' + result._streams[i]._type + '">'
			$video.append(source);
			url = result._streams[i]._url;
		}

		var infoElement = 
			'<h3>Titel:</h3>'+
			'<div>' + result._title + '</div>' +
			'<div>' + result._subtitle + '</div>' +
			/*'<div>' + result._details + '</div>' +*/
			'<h3>Zeit:</h3>' +
			'<div>' + result._airtime + '</div>' +
			'<h3>Dauer:</h3>' +
			'<div>' + result._length + '</div>' +
			'<h3>Sender:</h3>' +
			'<div>' + result._station + '</div>';

		
		$infoWrapper.append(infoElement);

		var descriptionElement = '<div>' + result._details + '</div>';
		$descriptionWrapper.append(descriptionElement);

	},

	onAddToPlaylist = function(){
		$("#choosePlaylist").click(function(e){
			e.preventDefault();
			$("#selectPlaylist").removeClass("hidden");
		});

		$("#addToPlaylist").click( function(e){
			e.preventDefault();
			$("#selectPlaylist").addClass("hidden");
			$.ajax({
  			type: "GET",
 			url: "http://mediathek-crawler/playlists/add/"+$("#select").val()+"/1",
  			// parameters that you want to pass
			data: {
				"title": result._title,
				"airtime":result._airtime,
				"url": result._streams,
				"duration": result._length,
				"image": result._teaserImages
			},
			dataType: 'json',		
			});
			return false;
		});
	},
	onAddBookmark = function(){
		$('#addToBookmarks').click(function(e){

		});
	},
	/**
	 * Public function to reset the instance of BroadcastView
	 */
	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;
	that.renderVideoById = renderVideoById;

	return that;
});