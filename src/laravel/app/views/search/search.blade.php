@extends('layout.main')

@section('content')
	<!-- START search/search -->
	<h2 class="page-title">Suchergebnisse:</h2>

	@include('search.results')
	<!-- END search/search -->
@stop