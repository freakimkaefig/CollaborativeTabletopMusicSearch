@extends('layout.main')

@section('content')
	<div class="row">
		<h2 id="channel">Sender: {{$channel}}</h2><div id="station-icon-results"></div>
		@include('search.results')

	</div>
@stop