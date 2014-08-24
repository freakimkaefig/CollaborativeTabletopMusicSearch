MediathekCrawler.SearchView = (function() {
	var that = {},
	duration = 0 ,

	init = function(){
		console.info('MediathekCrawler.SearchView.init');
		initDatepickers();
		initSlider();
		$('#channel-filter').on('change',getSelectedChannels);
		$("#reset").click(function(){
			resetFilter();
		});
		manageFilters();

		$('#mobile-filter-button').on('click', onMobileFilterButtonClick);
		$('#submit').on('click', onSubmitButtonClick);
		$('#search-button').on('click', onSubmitButtonClick);
		$('#search-button-mobile').on('click', onSubmitButtonClick);
	},

	onSubmitButtonClick = function(event){
		if($('#sort-buttons').hasClass('hidden')) {
			$('#sort-buttons').removeClass('hidden');
			$('#sort-buttons').show();
		}
	},

	onMobileFilterButtonClick = function(event) {
		if ($(this).hasClass('open')) {
			$('#mobile-search-form').animate({
				height: 0
			}, 300);
			$(this).removeClass('open');
			$(this).find('span.glyphicon').removeClass('glyphicon-chevron-up');
			$(this).find('span.glyphicon').addClass('glyphicon-chevron-down');
			$('#mobile-search-results').show();
		} else {
			$('#mobile-search-form').animate({
				height: '100%'
			}, 300);
			$(this).addClass('open');
			$(this).find('span.glyphicon').removeClass('glyphicon-chevron-down');
			$(this).find('span.glyphicon').addClass('glyphicon-chevron-up');
		}
	},

	collapseMobileFilter = function() {
		$mobileFilter = $('#mobile-filter-button');
		if ($mobileFilter.hasClass('open')) {
			$('#mobile-search-form').animate({
				height: 0
			}, 300);
			$mobileFilter.removeClass('open');
			$mobileFilter.find('span.glyphicon').removeClass('glyphicon-chevron-up');
			$mobileFilter.find('span.glyphicon').addClass('glyphicon-chevron-down');
			$('#mobile-search-results').show();
		}
	},

	manageFilters = function(){
			$("input[name='orf']").click(function(){
				if ($("#datepicker-from").attr('disabled')){ 
					$("#datepicker-from").removeAttr('disabled');
					$("#datepicker-to").removeAttr('disabled');
					$("#datepicker-from").removeClass('ui-state-disabled');
					$("#datepicker-to").removeClass('ui-state-disabled');
					// ui-state-disabled
				}else{
					$("#datepicker-from").attr('disabled', 'disabled');
					$("#datepicker-to").attr('disabled', 'disabled');
					$("#datepicker-from").addClass('ui-state-disabled');
					$("#datepicker-to").addClass('ui-state-disabled');
				}
			})
			// $("input[name='daserste']").click(function(){
			// 	 if ($("#category-filter :input").attr('disabled')){ 
			// 	 	$("#category-filter :input").removeAttr('disabled');
			// 	 }
			// 	 else{
			// 	 	$("#category-filter :input").attr('disabled', 'disabled');
			// 	}
			// })
			// $("input[name='br']").click(function(){
			// 	 if ($("#category-filter :input").attr('disabled')){ 
			// 	 	$("#category-filter :input").removeAttr('disabled');
			// 	 }
			// 	 else{
			// 	 	$("#category-filter :input").attr('disabled', 'disabled');
			// 	}
			// })
			$("input[name='srf']").change(function(){
				 if ($("input[name='srf']").is(":checked")){ 
				 	// console.log("disable");
				 	$("#duration-slider").slider("disable");
				 }
				 else{
				 	// console.log("enable");
				 	$("#duration-slider").slider("enable");
				}
			})
	},
	resetFilter = function(event){
			console.log("reset");
			$('input').prop('checked', false);
			$("#datepicker-from").datepicker("setDate",null);
			$("#datepicker-to").datepicker("setDate",null);
			$("#duration-slider").slider("value",0);		
			$("#duration-display").text("0min")

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

		// if ($("input[name='daserste']").is(":checked")||$("input[name='br']").is(":checked")){
		// 	selectedCategories = [];
		// }else{	
			$("#category-filter input:checked").each(function(){
				selectedCategories.push($(this).attr('name'));
			})
		// }
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

		// console.log(duration);
		return duration;
	},
	initDatepickers = function(){
		$("#datepicker-from").datepicker({  
			maxDate: 0 , 
			minDate: "-30d",
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
			maxDate: 0,
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
			sevenDaysBeforeToday = new Date();
			sevenDaysBeforeToday.setDate(sevenDaysBeforeToday.getDate()-7)
			maxDate = $("#datepicker-from").datepicker("getDate");
			if(maxDate > sevenDaysBeforeToday){

				today = new Date();
				maxDate.setDate(today.getDate())
			}else{
				maxDate.setDate(maxDate.getDate()+7);	
			}

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
	that.collapseMobileFilter = collapseMobileFilter;
	that.getSelectedChannels = getSelectedChannels;
	that.getSelectedCategories = getSelectedCategories;
	that.getDateFrom = getDateFrom;
	that.getDateTo = getDateTo;
	that.getSliderValue = getSliderValue;
	that.dispose = dispose;

	return that;
});