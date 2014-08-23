MediathekCrawler.MainView = (function() {
	var that = {},
	snapper = null,

	init = function() {
		console.info('MediathekCrawler.MainView.init');
		
		snapper = new Snap({
			element: document.getElementById('content'),
			disable: 'right'
		});

		myToggleButton = document.getElementById('mobile-menu-button');
		myToggleButton.addEventListener('click', function(){

		    if( snapper.state().state=="left" ){
		        snapper.close();
		    } else {
		        snapper.open('left');
		    }

		});
	},

	disableSnap = function() {
		snapper.disable();
	},

	enableSnap = function() {
		snapper.enable();
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});