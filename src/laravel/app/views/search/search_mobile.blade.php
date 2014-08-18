<!DOCTYPE html>
<html>
	<head>
		<title>Mediathek Crawler</title>
		{{ HTML::style('css/bootstrap.min.css'); }}
		{{ HTML::style('css/video-js.css') }}
		{{ HTML::style('css/style.css') }}

		{{ HTML::script('js/libs/jquery/jquery.min.js') }}
		{{ HTML::script('js/libs/bootstrap/bootstrap.min.js') }}
	</head>

	<body>		
		@include('layout.header')
		@include('mediathek-crawler-js')

		<div class="visible-xs col-md-4">
			<!-- <button type="button" class="btn btn-default" data-toggle="collapse" data-target=".nav-collapse">_</button>
			
			<div class="nav-collapse collapse" style="position: absolute; z-index: 99">
			    <ul class="nav navbar-nav" style="background-color: #1b1b1b">
			      
			      <li class="active"><a href="{{ URL::route('playlists') }}">Playliste</a></li>
			      <li><a href="{{ URL::route('bookmarks') }}">Merkliste</a></li>
			      <li><a href="#">Live/Mediatheken</a></li>			      
			      <li><a href="#">Rubriken</a></li>
			      <li><a href="#">Kontakt</a></li>
			      <li><a href="#">Impressum</a></li>
			      <li><a href="{{ URL::route('account-my-account') }}">Einstellungen</a></li>
			    </ul>
			</div> -->
			<button class="btn btn-default dropdown">
       			<a href="#" class="dropdown-toggle" data-toggle="dropdown">_</a>
      			<ul class="dropdown-menu" style="border-color: white; border-radius: 5">
        		  <li><a href="{{ URL::route('playlists') }}">Playliste</a></li>
        		  <li class="divider"></li>
			      <li><a href="{{ URL::route('bookmarks') }}">Merkliste</a></li>
			      <li class="divider"></li>
			      <li><a href="#">Live/Mediatheken</a></li>
			      <li class="divider"></li>
			      <li><a href="#">Rubriken</a></li>
			      <li class="divider"></li>
			      <li><a href="#">Kontakt</a></li>
			      <li class="divider"></li>
			      <li><a href="#">Impressum</a></li>
			      <li class="divider"></li>
			      <li><a href="{{ URL::route('account-my-account') }}">Einstellungen</a></li>
        		</ul>
      		</button>

      		
      		
			<input class="search-query " type="text" name="search" placeholder="Suche"{{ (Input::old('search')) ? ' value="' . e(Input::old('search')) . '"' : '' }}>
			
			<button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span>Suchen</button>
			
			

		</div>


		
		<div id="channel-filter" class="form-group col-sm-3 visible-xs">
			<h4>Sender</h4>
			<div class="col-xs-6">
				<div class="checkbox">
					<label>
						<input type="checkbox" name="daserste" value="daserste">
						Das Erste
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="zdf" value="zdf">
						ZDF
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="br" value="br">
						BR
					</label>
				</div>
			</div>
			<div class="col-xs-6">
				<div class="checkbox">
					<label>
						<input type="checkbox" name="arte" value="arte">
						Arte
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="srf" value="srf">
						SRF
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="wdr" value="wdr">
						WDR
					</label>
				</div>
			</div>		
		</div>



		<div id="category-filter" class="form-group visible-xs">
			<h4>Rubriken</h4>
			<div class="col-xs-6">
				<div class="checkbox">
					<label>
						<input type="checkbox" name="nachrichten" value="nachrichten"{{ (Input::old('nachrichten')) ? ' checked' : ' selected' }}>
						Nachrichten
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="sport" value="sport" >
						Sport
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="politik" value="politik" >
						Politik
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="wirtschaft" value="wirtschaft" >
						Wirtschaft
					</label>
				</div>
			</div>
			<div class="col-xs-6">
				<div class="checkbox">
					<label>
						<input type="checkbox" name="kinder" value="kinder" >
						Kinder
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="kino-tv" value="kino-tv" >
						Kino und TV
					</label>
				</div>
				<div class="checkbox">
					<label>
					<input type="checkbox" name="wissen-kultur" value="wissen-kultur" >
						Wissen
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="ratgeber-gesundheit" value="ratgeber-gesundheit">
						Ratgeber
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="unterhaltung" value="unterhaltung" >
						Unterhaltung
					</label>
				</div>
			</div>
		</div>

		<div class="form-group form-inline visible-xs">
			<h4>Datum &amp; Dauer</h4>
			<div class="col-xs-6">
				<label>Von:
					<input id="datepicker-from" class="col-sm-12" type="text" name="from" >
				</label>
			</div>
			<div class="col-xs-6">
				<label>Bis:
					<input id="datepicker-to" class="col-sm-12"  type="type" name="to" disabled>
				</label>
			</div>
			<div class="disabled col-xs-6">
				<label>Mindestdauer: <p id="duration-display">0min</p>
					<div id="duration-slider"></div>			
				</label>
			</div>
		</div>


		<div class="col-sm-2 visible-xs">
			<button id="submit" class="btn btn-transparent col-xs-12">Absenden</button>
			<button type="" class="btn btn-transparent col-xs-12">Zurücksetzen</button>
		</div>
	</body>
</html>