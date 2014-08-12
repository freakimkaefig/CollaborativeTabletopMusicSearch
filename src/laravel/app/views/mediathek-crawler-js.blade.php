{{ HTML::script('js/src/App.js') }}


	<!-- Libraries -->
	{{ HTML::script('js/libs/videojs/video.dev.js') }}
	{{ HTML::script('js/libs/videojs/video.js') }}
	{{ HTML::script('js/libs/videojs/video-quality-selector.js') }}

	<!-- Classes -->
	{{ HTML::script('js/src/exceptions/NotImplementedException.js') }}

	<!-- Controller -->
	{{ HTML::script('js/src/controllers/ApplicationController.js') }}
	{{ HTML::script('js/src/services/ARDService.js') }}
	{{ HTML::script('js/src/services/DasErsteService.js') }}
	{{ HTML::script('js/src/services/ZDFService.js') }}
	{{ HTML::script('js/src/services/BRService.js') }}
	{{ HTML::script('js/src/services/ARTEService.js') }}
	{{ HTML::script('js/src/services/WDRService.js') }}
	{{ HTML::script('js/src/services/SRFService.js') }}

	<!--Model-->
	{{ HTML::script('js/src/models/MediathekModel.js') }}

	<!-- Views --> 
	{{ HTML::script('js/src/views/FooterView.js') }}
	{{ HTML::script('js/src/views/ResultView.js') }}
	{{ HTML::script('js/src/views/BroadcastView.js') }}
	{{ HTML::script('js/src/views/PlaylistView.js') }}
	{{ HTML::script('js/src/views/BookmarkView.js') }}
	{{ HTML::script('js/src/views/SearchView.js') }}
	<!-- INIT -->
	{{ HTML::script('js/bootstrap.js') }}
