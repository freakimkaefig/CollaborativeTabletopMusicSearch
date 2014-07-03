MediathekCrawler.FooterView = (function(app) {
	var that = {},

	$footerNav = null,

	init = function() {
		console.log('MediathekCrawler.FooterView.init');
		$footerNav = $('#footer-nav');
		$footerNav.on('mouseenter', footerOnMouseEnter);
		$footerNav.on('mouseleave', footerOnMouseLeave);
	},

	footerOnMouseEnter = function(event) {
		console.log(event)
		$(this).animate({
			bottom: 0
		});
	},

	footerOnMouseLeave = function(event) {
		$(this).animate({
			bottom: -110
		});
	},

	dispose = function() {
		that = {};
	};


	that.init = init;

	return that;
});