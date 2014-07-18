@extends('layout.main')

@section('content')
	<!-- START streaming/video -->
	@if(isset($video))
		<div class="row">
			<div id="video-wrapper" class=" col-xs-12 col-sm-8 colsm-offset-0 col-lg-7 col-lg-offset-1">
				<video id="video" class="video-js vjs-default-skin" controls preload="auto"></video>
			</div>
			<div id="info-wrapper"></div>
		</div>
		<div class="row">
			<div id="description-wrapper"></div>
		</div>
		<input id="video-id" type="hidden" value="{{ $video }}">
	@else
		{{ Redirect::route('home')->with('global-warning', 'Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.') }}
	@endif
	<!-- END streaming/video -->
@stop