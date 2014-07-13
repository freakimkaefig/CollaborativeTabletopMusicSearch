@extends('layout.main')

@section('content')
	<div class="row">
		<h1>Hello Mediathek Crawler.</h1>
		
		@if(Auth::check())
			<p>Angemeldet als {{ Auth::user()->email }}.</p>
		@else
			<p>Du bist nicht angemeldet.</p>
		@endif

		<hr>
		<h2>Neue Sendungen</h2>
		<div id="result-wrapper"></div>
	</div>
@stop