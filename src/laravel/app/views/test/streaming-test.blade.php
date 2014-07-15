@extends('layout.main')

@section('content')
<!-- START test/streaming-test -->
	<video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" data-setup="{ }">
	<!-- alternativ: data-setup='{ "techOrder": ["flash"] } -->
	  <source src="http://adaptiv.wdr.de/z/medstdp/de/fsk0/47/476719/,476719_4938964,476719_4938965,476719_4938967,.mp4.csmil/manifest.f4m" type="smil/f4m">
	</video>
<!-- END test/streaming-test -->
@stop