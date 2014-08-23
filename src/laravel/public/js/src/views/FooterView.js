MediathekCrawler.FooterView = (function() {
	var that = {},

	$footerNav = null,
	closed = true;

	init = function() {
		console.info('MediathekCrawler.FooterView.init');
		$footerNav = $('#footer-nav');
		$footerNav.on('mouseenter', footerOnMouseEnter);
		$footerNav.on('mouseleave', footerOnMouseLeave);
		$footerNav.click(function(){
			console.log("click",closed);
			if(closed){
				footerOnMouseEnter();
				closed = false;
			}
			else{
				footerOnMouseLeave();
				closed = true;
			}
		});
	},



	footerOnMouseEnter = function(event) {
		// console.log(event)
		$footerNav.stop(true, false);
		$footerNav.animate({
			bottom: 0
		});
	},

	footerOnMouseLeave = function(event) {
		$footerNav.stop(true, false);
		$footerNav.animate({
			bottom: -190
		});
	},
	
	dispose = function() {
		that = {};
	};


	that.init = init;

	return that;
});