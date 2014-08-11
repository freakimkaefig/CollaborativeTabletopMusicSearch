MediathekCrawler.SearchView = (function() {
	var that = {},

	init = function(){
		console.info('MediathekCrawler.SearchView.init');
		$('#channel-filter').on('change',getSelectedChannels);
	},
	getSelectedChannels = function(){
		var selectedChannels = [];
		$('#channel-filter input:checked').each(function(){
			selectedChannels.push($(this).attr('name'));
		})
		return selectedChannels;
	},
	getSelectedCategories = function(){
		var selectedCategories = [];
		$("#category-filter input:checked").each(function(){
			selectedCategories.push($(this).attr('name'));
		})
		return selectedCategories;
	},
	dispose = function(){
		that = {};
	};

	that.init = init;
	that.getSelectedChannels = getSelectedChannels;
	that.getSelectedCategories = getSelectedCategories;
	that.dispose = dispose;

	return that;
});