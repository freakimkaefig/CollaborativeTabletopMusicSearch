<nav class="navbar navbar-default" role="navigation">
	<div class="container-fluid">
     	<ul class="nav navbar-nav">
        	<li><a class="navbar-brand" href="{{ URL::route('home') }}">LOGO</a></li>
      	</ul>
      		
      		<ul class="nav navbar-nav navbar-right">
      			<li>
      			<form class="navbar-form navbar-left" role="search">
	        		<div class="form-group">
	          			<input type="text" class="form-control" placeholder="Search">
	        		</div>
	        		<button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
	        		<button class="btn btn-default"><a href="#"><span class="glyphicon glyphicon-filter"></span></a></button>
	      		</form>
	      		</li>
        		@if(Auth::check())
					<li class="dropdown">
	          			<a href="#" class="dropdown-toggle" data-toggle="dropdown">Mein Konto <b class="caret"></b></a>
	          			<ul class="dropdown-menu">
	            			<li><a href="{{ URL::route('account-my-account') }}">Mein Konto</a></li>
	           				<li><a href="#">Meine Playlists</a></li>
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
    	</div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>