@extends('layout.main')

@section('content')
	<div class="row">
		<h2>Sender {{$channel}}</h2>
		@include('search.results')

	</div>
@stop