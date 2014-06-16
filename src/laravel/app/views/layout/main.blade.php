<!DOCTYPE html>
<html>
	<head>
		<title>Mediathek Crawler</title>
		<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
	</head>
	<body>
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

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
	</body>
</html>