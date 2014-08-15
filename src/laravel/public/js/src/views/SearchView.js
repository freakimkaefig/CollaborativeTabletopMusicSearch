MediathekCrawler.SearchView = (function() {
	var that = {},
	duration = 0 ,

	init = function(){
		console.info('MediathekCrawler.SearchView.init');
		initDatepickers();
		initSlider();
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
	initSlider = function(){
		$("#duration-slider" ).slider({ 
			min: 0,
      		max: 90,
      		step: 10,
 		});
		$("#duration-slider").on("slidestop", function(event){
			getSliderValue();
			duration=$("#duration-slider").slider("value");
			$("#duration-display").text(getSliderValue()+"min");
		});
		
	},
	getSliderValue = function(){
		duration=$("#duration-slider").slider("value");

		console.log(duration);
		return duration;
	},
	initDatepickers = function(){
		$("#datepicker-from").datepicker({  
			maxDate: "+21d" , 
			minDate: "-9d",
			dateFormat: "dd-mm-yy",
			monthNames: ['Januar','Februar','März','April','Mai','Juni',
        				'Juli','August','September','Oktober','November','Dezember'],
        	monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
        						'Jul','Aug','Sep','Okt','Nov','Dez'],
        	dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
        	dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
        	dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa']
		});
		$("#datepicker-to").datepicker({  
			maxDate: "+21d",
			dateFormat: "dd-mm-yy",
			monthNames: ['Januar','Februar','März','April','Mai','Juni',
        				'Juli','August','September','Oktober','November','Dezember'],
        	monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
        						'Jul','Aug','Sep','Okt','Nov','Dez'],
        	dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
        	dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
        	dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa']});

		$("#datepicker-from").on("change",function(){
			$("#datepicker-to").removeAttr("disabled");
			minDate=$("#datepicker-from").datepicker("getDate");
			$("#datepicker-to").datepicker('option', 'minDate', minDate);
			maxDate = $("#datepicker-from").datepicker("getDate");
			maxDate.setDate(maxDate.getDate()+7);
			$("#datepicker-to").datepicker('option', 'maxDate', maxDate);
			$("#datepicker-to").datepicker('setDate', minDate)
		});
	},
	getDateFrom = function(){
		if($("#datepicker-from").datepicker("getDate")){
			var dateFrom = $("#datepicker-from").datepicker("getDate");
			if(dateFrom == undefined){
				dateFrom =  $("#datepicker-to").datepicker("getDate");
			}
			year= dateFrom.getFullYear();
			month = dateFrom.getMonth()+1;
			month = month < 10 ? '0'+month : ''+month;
			day = dateFrom.getDate();
			day = day < 10 ? '0'+day : ''+day;
			date = year+"-"+month+"-"+day;
		}
		else {
			date ="";
		}
		return date;
	},
	getDateTo = function(){
		if($("#datepicker-to").datepicker("getDate")){
			var dateTo = $("#datepicker-to").datepicker("getDate");
			year= dateTo.getFullYear();
			month = dateTo.getMonth()+1;
			month = month < 10 ? '0'+month : ''+month;
			day = dateTo.getDate();
			day = day < 10 ? '0'+day : ''+day;
			date = year+"-"+month+"-"+day;
		}
		else{
			if(dateTo == undefined){
				if($("#datepicker-from").datepicker("getDate")){
					dateTo = $("#datepicker-from").datepicker("getDate");
				}
			else{
				date ="";
				return;
				}
			}
			year= dateTo.getFullYear();
			month = dateTo.getMonth()+1;
			month = month < 10 ? '0'+month : ''+month;
			day = dateTo.getDate();
			day = day < 10 ? '0'+day : ''+day;
			date = year+"-"+month+"-"+day;
			
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
	that.getSliderValue = getSliderValue;
	that.dispose = dispose;

	return that;
});