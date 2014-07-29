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
		@include('layout.header')
		<div class="container">

		<div class="navbar visible-xs">
	
			<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
			      
			      <span class="icon-bar"></span>
			      <span class="icon-bar"></span>
			      <span class="icon-bar"></span>
			</button>

			<div class="nav-collapse collapse">
			    <ul class="nav navbar-nav">
			      <li class="active"><a href="#">Playliste</a></li>
			      <li><a href="#">Favoriten</a></li>
			      <li><a href="#">Merkliste</a></li>
			      <li><a href="#">Live/Mediatheken</a></li>
			      <li><a href="#">Rubriken</a></li>
			      <li><a href="#">Kontakt</a></li>
			      <li><a href="#">Impressum</a></li>
			      <li><a href="#">Einstellungen</a></li>
			    </ul>
			</div>
		</div>
		
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


		<div class="container-fluid">
			@yield('content')
		</div>

		@include('layout.footer')

		@include('mediathek-crawler-js')

	</body>
</html>