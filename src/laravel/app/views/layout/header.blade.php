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
		        			<li><a class="row" href="{{ URL::route('account-my-account') }}"><span class="col-sm-2 glyphicon glyphicon-user pull-left"></span><span class="col-sm-2">Mein Konto</span></a></li>
		        			<li><a class="row" href="{{ URL::route('playlists') }}"><span class="col-sm-2 glyphicon glyphicon-list pull-left"></span></span><span class="col-sm-2">Meine Playlists</span></a></li>
		         			<li><a class="row" href="{{ URL::route('bookmarks') }}"><span class="col-sm-2 glyphicon glyphicon-list-alt pull-left"></span></span><span class="col-sm-2">Meine Merkliste</span></a></li>
		         			<li class="divider"></li>
		         			<li><a class="row" href="{{ URL::route('account-sign-out') }}"><span class="col-sm-2 glyphicon glyphicon-log-out pull-left"></span></span><span class="col-sm-2">Abmelden</span></a></li>
		        		</ul>
		      		</li>
				@else
					<li><a class="row" href="{{ URL::route('account-sign-in') }}"><span class="col-sm-2 glyphicon glyphicon-log-in pull-left"></span><span class="col-sm-2">Anmelden</span></a></li>
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
