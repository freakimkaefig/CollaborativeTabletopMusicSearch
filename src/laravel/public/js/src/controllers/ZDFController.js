MediathekCrawler.ZDFController = function() {

	var that = {},
	ZDFSEARCHURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/detailsSuche?searchString=",
	ZDFSTREAMURL = "http://www.zdf.de/ZDFmediathek/xmlservice/web/beitragsDetails?id=",
	xmlHttp = null,
	once = 0
	
	
	init = function() {
		//init ZDFController
		console.log("ZDFController init");

		//http://www.zdf.de/ZDFmediathek/xmlservice/web/detailsSuche?searchString=tatort&maxLength=100


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
				streams = []

				// get all teaserImgs with resolution
		    	$(this).find("teaserimage").each(function(){
				
					var res = $(this).attr('key');
			    	var imgUrl = $(this).text();

			    	//Array containing all the unsorted teaserImages as Objects(with resolution & url)
			    	teaserImages.push(new teaserImage(res, imgUrl));
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

	teaserImage = function(key1, key2){
	    this.resolution = key1;
	    this.url = key2;
	},

	stream = function(key1, key2, key3, key4){
	    this.basetype = key1;
	    this.quality = key2;
	    this.url = key3;
	    this.filesize = key4;
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
	    		filesize = 0

	    		basetype = $(this).attr('basetype');
	    		quality = $(this).find("quality").text();
				url = $(this).find("url").text();
				filesize = $(this).find("filesize").text();

				streams.push(new stream(basetype, quality, url, filesize));

	    	}); // end foreach formitaet

	    	return streams;

	    }
	}

	

	that.init = init,
	that.searchString = searchString;

	return that;

};