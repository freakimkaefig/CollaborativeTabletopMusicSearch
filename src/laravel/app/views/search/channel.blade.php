@extends('layout.main')

@section('content')
	<div class="row">
		<h2 id="channel" class="page-title">{{$channel}}</h2>
		<div id="icon-station-results"></div>
	</div>
	<div class="row">
		@include('search.results')

	</div>
	<div class="spacer"></div>
@stop