<!-- START layout/header -->
<nav class="navbar navbar-default" role="navigation">
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
	      				<button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
	      				<button class="btn btn-default"><a href="{{ URL::route('search-results') }}"><span class="glyphicon glyphicon-filter"></span></a></button>
      				</div>
		     	</li>
	        	@if(Auth::check())
					<li class="dropdown">
		       			<a href="#" class="dropdown-toggle" data-toggle="dropdown">Mein Konto<b class="caret"></b></a>
		      			<ul class="dropdown-menu">
		        			<li><a href="{{ URL::route('account-my-account') }}">Mein Konto</a></li>
		        			<li><a href="{{ URL::route('playlists') }}">Meine Playlists</a></li>
		         			<li><a href="#">Meine Abos</a></li>
		         			<li><a href="#">Meine Merklist</a></li>
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
		 	<div class="container">
		 		<p>&nbsp;</p>
		 	</div>
		 	<div class="container-fluid">
		 		@include('search.filters')
		 	</div>
	 	@endif

 		{{ Form::token() }}
	</form>
</nav>
<!-- END layout/header -->