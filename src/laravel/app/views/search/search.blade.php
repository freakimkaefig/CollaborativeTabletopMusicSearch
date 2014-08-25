@extends('layout.main')

@section('content')
	<!-- START search/search -->
	<div class="row">
		<h2 class="page-title">Suchergebnisse:</h2>
	</div>

	@include('search.results')
	<!-- END search/search -->
@stop