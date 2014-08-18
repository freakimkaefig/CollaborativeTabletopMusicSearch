@extends('layout.main')

@section('content')
		<h2 id="channel" class="page-title">{{$channel}}</h2>
		<div id="icon-station-results"></div>
	<div class="row">
		@include('search.results')

	</div>
@stop