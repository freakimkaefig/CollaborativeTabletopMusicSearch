@extends('layout.main')

@section('content')
	<h1>Hello Mediathek Crawler.</h1>
	
	@if(Auth::check())
		<p>Angemeldet als {{ Auth::user()->email }}.</p>
	@else
		<p>Du bist nicht angemeldet.</p>
	@endif
@stop