MediathekCrawler.FooterView = (function() {
	var that = {},

	$footerNav = null,

	init = function() {
		console.log('MediathekCrawler.FooterView.init');
		$footerNav = $('#footer-nav');
		$footerNav.on('mouseenter', footerOnMouseEnter);
		$footerNav.on('mouseleave', footerOnMouseLeave);
	},

	footerOnMouseEnter = function(event) {
		// console.log(event)
		$(this).finish();
		$(this).animate({
			bottom: 0
		});
	},

	footerOnMouseLeave = function(event) {
		$(this).finish();
		$(this).animate({
			bottom: -190
		});
	},
	
	dispose = function() {
		that = {};
	};


	that.init = init;

	return that;
});