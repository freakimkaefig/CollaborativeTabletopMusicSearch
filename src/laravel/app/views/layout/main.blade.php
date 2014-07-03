<!DOCTYPE html>
<html>
	<head>
		<title>Mediathek Crawler</title>
		{{ HTML::style('css/bootstrap.min.css'); }}
		{{ HTML::style('css/style.css') }}
		{{ HTML::style('css/video-js.css') }}

		{{ HTML::script('js/libs/jquery/jquery.min.js') }}
		{{ HTML::script('js/libs/bootstrap/bootstrap.min.js') }}
	</head>
	<body>
		@if(Session::has('global'))
			<div class="messages">{{ Session::get('global') }}</div>
		@endif
			
		@include('layout.header')
		<div class="container">
			<div class="row">
				@if(Session::has('global-danger'))
					<div class="alert alert-danger">{{ Session::get('global-danger') }}</div>
				@endif
				@if(Session::has('global-warning'))
					<div class="alert alert-warning">{{ Session::get('global-warning') }}</div>
				@endif
				@if(Session::has('global-success'))
					<div class="alert alert-success">{{ Session::get('global-success') }}</div>
				@endif
			</div>
		</div>


		<div class="container">
			@yield('content')
		</div>

		@include('layout.footer')

		@include('mediathek-crawler-js')

	</body>
</html>