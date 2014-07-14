@extends('layout.main')

@section('content')
<!-- START test/streaming-test -->
	<video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" data-setup="{ }">
	<!-- alternativ: data-setup='{ "techOrder": ["flash"] } -->
	  <source src="http://static.ard.de/daserste_livestream/geo.smil">
	</video>
<!-- END test/streaming-test -->
@stop