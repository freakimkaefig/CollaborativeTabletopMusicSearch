@extends('layout.main')

@section('content')
	<h2>Search results</h2>
	@if(Session::has('results'))
		<pre>{{ print_r(Session::get('results')) }}</pre>
	@endif
@stop