MediathekCrawler.SearchView = (function() {
	var that = {},

	init = function(){
		console.info('MediathekCrawler.SearchView.init');
		initDatepickers();
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
	initDatepickers = function(){
		$( "#datepicker-from" ).datepicker({  maxDate: "+21d" , minDate: "-9d"});
		$( "#datepicker-to" ).datepicker({  maxDate: "+21d"});

		$( "#datepicker-from" ).on("change",function(){
			$( "#datepicker-to" ).removeAttr("disabled");
			minDate=$( "#datepicker-from" ).datepicker("getDate");
			$( "#datepicker-to" ).datepicker('option', 'minDate', minDate);
		});
	},
	getDateFrom = function(){
		if($( "#datepicker-from" ).datepicker("getDate")){
			var dateFrom = $( "#datepicker-from" ).datepicker("getDate");
			if(dateFrom == undefined){
				dateFrom =  $( "#datepicker-to" ).datepicker("getDate");
			}
			date = dateFrom.getFullYear()+"-"+(dateFrom.getMonth()+1)+"-"+dateFrom.getDate();
		}
		else {
			date ="";
		}
		return date;
	},
	getDateTo = function(){
		if($( "#datepicker-to" ).datepicker("getDate")){
			var dateTo = $( "#datepicker-to" ).datepicker("getDate");
			date = dateTo.getFullYear()+"-"+(dateTo.getMonth()+1)+"-"+dateTo.getDate();
		}
		else{
			if(dateTo == undefined){
				dateTo = $( "#datepicker-from" ).datepicker("getDate");
			}
			date = dateTo.getFullYear()+"-"+(dateTo.getMonth()+1)+"-"+dateTo.getDate();
		}
		return date;
	},
	dispose = function(){
		that = {};
	};

	that.init = init;
	that.getSelectedChannels = getSelectedChannels;
	that.getSelectedCategories = getSelectedCategories;
	that.getDateFrom = getDateFrom;
	that.getDateTo = getDateTo;
	that.dispose = dispose;

	return that;
});