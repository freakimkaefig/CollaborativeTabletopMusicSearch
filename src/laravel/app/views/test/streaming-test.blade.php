@extends('layout.main')

@section('content')
<!-- START test/streaming-test -->
	<video controls preload="auto" width="640" height="264">
	<!-- alternativ: data-setup='{ "techOrder": ["flash"] } -->
	  <source src="http://mobile-ondemand.wdr.de/CMS2010/mdb/ondemand/weltweit/fsk0/47/470454/470454_4863252.mp4" type="video/mp4">
	</video>
<!-- END test/streaming-test -->
@stop