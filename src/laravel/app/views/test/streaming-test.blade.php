@extends('layout.main')

@section('content')
	<video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" data-setup='{}'>
	  <source src="rtmp://cp108475.live.edgefcs.net/live/zdfneo_1_800@44504" type='rtmp/mp4'>
	</video>
@stop