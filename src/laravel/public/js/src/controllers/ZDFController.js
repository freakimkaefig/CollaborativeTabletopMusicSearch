MediathekCrawler.ZDFController = function() {

	var that = {},
	ZDFSEARCHURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/detailsSuche?searchString=",
	ZDFSTREAMURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/beitragsDetails?id=",
	xmlHttp = null,
	once = 0,
	mediathekModel = null;
	
	
	init = function(mModel) {
		//init ZDFController
		console.log("ZDFController init");
		mediathekModel = mModel;
	},

	searchString = function(searchStr, maxResults){
	    xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", ZDFSEARCHURL+searchStr+"&maxLength="+String(maxResults), false );
	    xmlHttp.send( null );
	    //console.log("RESPONSE"+xmlHttp.responseText);
	    var xmlResponse = $.parseXML(xmlHttp.responseText);
	    $xml = $(xmlResponse);

	    if(typeof $xml  != "undefined"){
	    	//each teaser = 1 search Result
	    	$xml.find("teaser").each(function(){

				var teaserImages = [],
				details = "",
				title = "",
				assetID = 0,
				length = "",
				airtime = "",
				streams = [];

				// get all teaserImgs with resolution
		    	$(this).find("teaserimage").each(function(){
				
					var res = $(this).attr('key');
			    	var imgUrl = $(this).text();

			    	//Array containing all the unsorted teaserImages as Objects(with resolution & url)
			    	var ti = mediathekModel.createTeaserImage(res, imgUrl);
			    	teaserImages.push(ti);
				});
				//console.log("images: "+teaserImages[0].resolution+", "+teaserImages[0].url);


			    //get information (titel, detail)
			    title = $(this).find("title").text();
			    details = $(this).find("detail").text();

			    //get assetid (for stream-url's)
			    assetID = $(this).find("assetId").text();

			    //get length
			    length = $(this).find("length").text();

			    //get airtime
			    airtime = $(this).find("airtime").text();

			    //Fetch stream url's
			    streams = searchStream(assetID);
			    //print info's for 1st searchresult:
				if(once === 0){
				    once = 1
				    console.log("resulting details: "+title+", "+details+", "+assetID+", "+length+", "+airtime+", "+streams[0].basetype+", "+streams[0].quality+", "+streams[0].url+", "+streams[0].filesize);
			    }


			    //TODO:
			    //ADD TO MODEL-RESULT-OBJECT
			    //SendungenAbisZ-Suche?
			    //Rubriken-Suche


	    	}); //end foreach searchResult
		    	
	    } 
	    
	},

	searchStream = function(assetID){
		//"http://www.zdf.de/ZDFmediathek/xmlservice/web/beitragsDetails?id="
		//ZDFSTREAMURL+assetID
		//parse for stream urls
		xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", ZDFSTREAMURL+assetID, false );
	    xmlHttp.send( null );
	    //console.log("RESPONSE"+xmlHttp.responseText);
	    var xmlResponse = $.parseXML(xmlHttp.responseText);
	    $xml = $(xmlResponse);

	    if(typeof $xml  != "undefined"){

	    	var streams = [];

	    	$xml.find("formitaet").each(function(){

	    		var basetype = "",
	    		quality = "",
	    		url = "",
	    		filesize = 0;

	    		basetype = $(this).attr('basetype');
	    		quality = $(this).find("quality").text();
				url = $(this).find("url").text();
				filesize = $(this).find("filesize").text();

				var stream = mediathekModel.createStream(basetype, quality, url, filesize);
				streams.push(stream);

	    	}); // end foreach formitaet
	    	return streams;

	    }
	};

	that.init = init;
	that.searchString = searchString;

	return that;

};