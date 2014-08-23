<!DOCTYPE html>
<html>
	<head>
		<title>Mediathek Crawler</title>
		{{ HTML::style('css/bootstrap.min.css'); }}
		{{ HTML::style('css/video-js.css') }}
		{{ HTML::style('css/jquery-ui.min.css') }}
		{{ HTML::style('css/jquery-ui.theme.css')}}
		{{ HTML::style('css/style.css') }}
		{{ HTML::style('css/snap.css') }}

		{{ HTML::script('js/libs/jquery/jquery.min.js') }}
		{{ HTML::script('js/libs/jquery/jquery-ui.min.js') }}
		{{ HTML::script('js/libs/bootstrap/bootstrap.min.js') }}

		{{ HTML::script('js/libs/snap/snap.min.js') }}
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	</head>
	<body>			
		<div class="snap-drawers">
			<div class="snap-drawer snap-drawer-left">
				<div>
					<ul class="mobile-menu" role="menu">
						<li class="divider-after"><a href="{{ URL::route('home') }}">Startseite</a></li>
						<li class="divider"></li>
			      		<li class="divider-before"><a href="{{ URL::route('account-my-account') }}">Mein Konto</a></li>
			        	<li><a href="{{ URL::route('playlists') }}">Playlisten</a></li>
						<li class="divider-after"><a href="{{ URL::route('bookmarks') }}">Merkliste</a></li>
					    <li class="divider"></li>
					    <li class="divider-before"><a href="{{ URL::route('channels-overview') }}">Mediatheken</a></li>
					    <li class="divider-after"><a href="{{ URL::route('categories-overview') }}">Rubriken</a></li>
					    <li class="divider"></li>
					    <li class="divider-before"><a href="{{ URL::route('contact') }}">Kontakt</a></li>
					    <li><a href="{{ URL::route('data') }}">Datenschutz</a></li>
					    <li><a href="{{ URL::route('imprint') }}">Impressum</a></li>
        			</ul>
				</div>
			</div>
		</div>
		<div id="content" class="snap-content">

			@include('layout.header')

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
		</div>
		<a href="#">
			<div id="to-top" class="visible-xs">
				<span  class="glyphicon glyphicon glyphicon-chevron-up text-center"></span>
			</div>
		</a>
		@include('layout.footer')

		@include('mediathek-crawler-js')

		<div id="xs-helper" class="visible-xs"></div>
	</body>
</html>