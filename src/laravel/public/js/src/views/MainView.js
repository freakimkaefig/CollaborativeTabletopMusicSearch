MediathekCrawler.MainView = (function() {
	var that = {},
	snapper = null,
	sliderInterval = null,

	init = function() {
		console.info('MediathekCrawler.MainView.init');
		
		snapper = new Snap({
			element: document.getElementById('content'),
			disable: 'right'
		});

		$(document).ajaxStop(function(){
			$('#flipster').flipster({
				style: 'carousel',
				enableMousewheel: false
			});
			$('#flipster-loading').hide();
			$('#flipster-slides').show();
			$('#flipster-controls').show();
			sliderInterval = window.setInterval(function() {
				$('#flipster').flipster('jump', 'right');
			}, 2500);

			$('#flipster-wrapper').mouseover(function() {
				window.clearInterval(sliderInterval);
			});

			$('#flipster-wrapper').mouseleave(function() {
				sliderInterval = window.setInterval(function() {
					$('#flipster').flipster('jump', 'right');
				}, 2500);
			});

			$('#flipster-left').click(function() {
				$('#flipster').flipster('jump', 'left');
			});
			$('#flipster-right').click(function() {
				$('#flipster').flipster('jump', 'right');
			});
		});
		

		myToggleButton = document.getElementById('mobile-menu-button');
		myToggleButton.addEventListener('click', function(){

		    if( snapper.state().state=="left" ){
		        snapper.close();
		    } else {
		        snapper.open('left');
		    }

		});

		if($('#xs-helper').is(':visible')) {
			snapper.enable();
		} else {
			snapper.disable();
		}

		$(window).on('resize', onResizeApp); 

		$("#to-top").on("click",toTop);
	},

	onResizeApp = function(event) {
		if($('#xs-helper').is(':visible')) {
			snapper.enable();
		} else {
			snapper.disable();
		}
	},

	toTop = function(){
		$('#content').animate({scrollTop: 0}, 2000);
	},

	dispose = function() {
		that = {};
	};

	that.init = init;
	that.dispose = dispose;

	return that;
});