MediathekCrawler.FooterView = (function() {
	var that = {},

	$footerNav = null,
	closed = true;
	/**
	 * Public function to initialize the instance of FooterView.
	 */
	init = function() {
		$footerNav = $('#footer-nav');
		$footerNav.on('mouseenter', footerOnMouseEnter);
		$footerNav.on('mouseleave', footerOnMouseLeave);
		$footerNav.click(function(){
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
	/**
	* Function to show footer.
	* @param {Event}		mouseEnter Event
	*/
	footerOnMouseEnter = function(event) {
		$footerNav.stop(true, false);
		$footerNav.animate({
			bottom: 0
		});
	},
	/**
	* Function to hide footer.
	* @param {Event}		mouseLeave Event
	*/
	footerOnMouseLeave = function(event) {
		$footerNav.stop(true, false);
		$footerNav.animate({
			bottom: -190
		});
	},
	/**
	 * Public function to reset the instance of FooterView.
	 */
	dispose = function() {
		that = {};
	};


	that.init = init;

	return that;
});