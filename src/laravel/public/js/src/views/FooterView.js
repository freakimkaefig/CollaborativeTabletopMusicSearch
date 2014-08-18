MediathekCrawler.FooterView = (function() {
	var that = {},

	$footerNav = null,

	init = function() {
		console.info('MediathekCrawler.FooterView.init');
		$footerNav = $('#footer-nav');
		$footerNav.on('mouseenter', footerOnMouseEnter);
		$footerNav.on('mouseleave', footerOnMouseLeave);
	},

	footerOnMouseEnter = function(event) {
		// console.log(event)
		$(this).stop(true, false);
		$(this).animate({
			bottom: 0
		});
	},

	footerOnMouseLeave = function(event) {
		$(this).stop(true, false);
		$(this).animate({
			bottom: -150
		});
	},
	
	dispose = function() {
		that = {};
	};


	that.init = init;

	return that;
});