<!DOCTYPE html>
<html>
	<head>
		<title>Mediathek Crawler</title>
		{{ HTML::style('css/bootstrap.min.css'); }}
		{{ HTML::style('css/video-js.css') }}
		{{ HTML::style('css/jquery-ui.min.css') }}
		{{ HTML::style('css/jquery-ui.theme.css')}}
		{{ HTML::style('css/style.css') }}

		{{ HTML::script('js/libs/jquery/jquery.min.js') }}
		{{ HTML::script('js/libs/jquery/jquery-ui.min.js') }}
		{{ HTML::script('js/libs/bootstrap/bootstrap.min.js') }}
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>			
		@include('layout.header')
		<div id="mobile-button-container" class="container visible-xs">

			<div id="mobile-menu-button" class="pull-left">
				<button class="btn btn-default btn-big dropdown-toggle" type="button" id="dropdownMenu" data-toggle="dropdown">
					<span class="glyphicon glyphicon-align-justify"></span>
					<span>Menü</span>
				</button>
	      		<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
			      <li><a href="{{ URL::route('account-my-account') }}">Mein Konto</a></li>
	        	  <li><a href="{{ URL::route('playlists') }}">Playlisten</a></li>
				  <li><a href="{{ URL::route('bookmarks') }}">Merkliste</a></li>
	        	  <li class="divider"></li>
			      <li><a href="{{ URL::route('channels-overview') }}">Mediatheken</a></li>
			      <li><a href="{{ URL::route('categories-overview') }}">Rubriken</a></li>
			      <li class="divider"></li>
			      <li><a href="{{ URL::route('contact') }}">Kontakt</a></li>
			      <li><a href="{{ URL::route('data') }}">Datenschutz</a></li>
			      <li><a href="{{ URL::route('imprint') }}">Impressum</a></li>
        		</ul>
			</div>
		</div>

		@if(Session::has('global-danger'))
			<div id="feedback-container-danger" class="container-fluid feedback-container"><h4 class="text-center">{{ Session::get('global-danger') }}</h4></div>
		@endif
		@if(Session::has('global-warning'))				
			<div id="feedback-container-warning" class="container-fluid feedback-container"><h4 class="text-center">{{ Session::get('global-warning') }}</h4></div>
		@endif
		@if(Session::has('global-success'))
			<div id="feedback-container-success" class="container-fluid feedback-container"><h4 class="text-center">{{ Session::get('global-success') }}</h4></div>
		@endif
			<div id="feedback-container" class="container-fluid feedback-container"><h4 class="text-center"></h4></div>


		<div class="container-fluid">
			@yield('content')
		</div>
		<a href="#">
			<div id="to-top" class="visible-xs">
				<span  class="glyphicon glyphicon glyphicon-chevron-up text-center"></span>
			</div>
		</a>
		@include('layout.footer')

		@include('mediathek-crawler-js')

	</body>
</html>