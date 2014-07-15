@extends('layout.main')

@section('content')
	<!-- START search/search -->
	<h2>Search results</h2>

	@include('search.results')

	<input id="search-string" type="hidden"{{ (Input::old('search')) ? ' value="' . e(Input::old('search')) . '"' : '' }}>
	<!-- END search/search -->
@stop