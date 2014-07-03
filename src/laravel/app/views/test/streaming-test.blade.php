@extends('layout.main')

@section('content')
<!-- START test/streaming-test -->
	<video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" data-setup='{}'>
	<!-- alternativ: data-setup='{ "techOrder": ["flash"] } -->
	  <source src="http://rodl.zdf.de/none/zdf/14/05/140526_veggies_zei_436k_p9v11.mp4" type='video/mp4'>
	</video>



<!-- END test/streaming-test -->
@stop