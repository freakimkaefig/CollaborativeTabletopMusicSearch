@extends('layout.main')

@section('content')
	<div class="row">
		<h2>Beliebte Sendungen</h2>
		@include('search.results')

	</div>
@stop