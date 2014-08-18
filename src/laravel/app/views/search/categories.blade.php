@extends('layout.main')

@section('content')
	<!-- START search/categories -->
	@if($category)
		<div class="col-xs-12">
			<h2>{{ strtolower(str_replace('-', ' & ', $category)) }}</h2>
		</div>

		@include('search.results')

		<input id="category" type="hidden" value="{{ $category }}">
	@else
		{{ Redirect::route('home')->with('global-warning', 'Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.') }}
	@endif
	<!-- END search/categories -->
@stop