@extends('layout.main')

@section('content')
	<h2>Search results</h2>

	<div id="result-wrapper"></div>

	<input id="search-string" type="hidden"{{ (Input::old('search')) ? ' value="' . e(Input::old('search')) . '"' : '' }}>
@stop