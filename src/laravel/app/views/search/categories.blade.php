@extends('layout.main')

@section('content')
	<!-- START search/categories -->
	@if($category)
		<h2>{{ $category }}</h2>

		@include('search.results')

		<input id="category" type="hidden" value="{{ $category }}">
	@else
		{{ Redirect::route('home')->with('global-warning', 'Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.') }}
	@endif
	<!-- END search/categories -->
@stop