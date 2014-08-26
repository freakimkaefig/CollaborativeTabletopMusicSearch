<!-- START layout/header -->
<nav class="navbar navbar-default hidden-xs" role="navigation">
	<form class="" role="search" action="{{ URL::route('search-post') }}" method="post">
		<div class="container-fluid">
	     	<ul class="nav navbar-nav">
	     		<li><a class="navbar-brand" href="{{ URL::route('home') }}">LOGO</a></li>
	     	</ul>

	     	<ul class="nav navbar-nav navbar-right">
	      		<li>
	      			<div class="navbar-form navbar-left">
	      				<div class="form-group">
	      					<input type="text" class="form-control" name="search" placeholder="Suche"{{ (Input::old('search')) ? ' value="' . e(Input::old('search')) . '"' : '' }}>
	      				</div>
	      				<button type="submit" class="btn btn-default" id="search-button">Suchen <span class="glyphicon glyphicon-search"></span></button>
	      				<button class="btn btn-default"><a href="{{ URL::route('search-results') }}">Filtern <span class="glyphicon glyphicon-filter"></span></a></button>
      				</div>
		     	</li>
	        	@if(Auth::check())
					<li class="dropdown">
		       			<a href="#" class="dropdown-toggle" data-toggle="dropdown">Mein Konto<b class="caret"></b></a>
		      			<ul class="dropdown-menu">
		        			<li class="divider"></li>
		        			<li><a href="{{ URL::route('account-my-account') }}">Mein Konto</a></li>
		        			<li><a href="{{ URL::route('playlists') }}">Meine Playlists</a></li>
		         			<li><a href="{{ URL::route('bookmarks') }}">Meine Merkliste</a></li>
		         			<li class="divider"></li>
		         			<li><a href="{{ URL::route('account-sign-out') }}">Abmelden</a></li>
		        		</ul>
		      		</li>
				@else
					<li><a href="{{ URL::route('account-sign-in') }}">Anmelden</a></li>
				@endif
			</ul>	
			


	 	</div>
	 	

	 	@if(isset($isSearch))
		 	<div class="container-fluid header-container">
		 		@include('search.filters')
		 	</div>
	 	@endif

 		{{ Form::token() }}
	</form>
	
</nav>
<!-- START mobile nav-->
<nav class="navbar navbar-default visible-xs" role="navigation">
	
	<div class="container-fluid">
		
     	<ul class="nav navbar-nav no-margin-top-bottom">
     		<li>
     			<div id="mobile-menu-button" class="pull-left">
				<button class="btn btn-default btn-big dropdown-toggle nohover" type="button" id="dropdownMenu" data-toggle="dropdown">
					<span class="glyphicon glyphicon-align-justify"></span>
				</button>
	      		<!-- <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
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
        		</ul> -->
			</div>
     		</li>
     		<li><a class="navbar-brand" href="{{ URL::route('home') }}">LOGO</a></li>
     	
     		@if(Auth::check())
     			<li class="pull-right" ><a href="{{ URL::route('account-sign-out') }}"style="color: white">Abmelden</a></li>
     			<li class="pull-right"><a href="{{ URL::route('search-results-mobile') }}" style="color: white">Suchen</a></li>

     		@else
				<li class="pull-right"><a href="{{ URL::route('account-sign-in') }}"style="color: white">Anmelden</a></li>
				<li class="pull-right"><a href="{{ URL::route('search-results-mobile') }}"style="color: white">Suchen</a></li>
     		@endif
		</ul>
		
    </div>
</nav>
<!-- END mobile nav-->
<!-- END layout/header -->
