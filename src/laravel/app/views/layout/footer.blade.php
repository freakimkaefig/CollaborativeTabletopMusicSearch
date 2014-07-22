<!-- START layout/footer -->
<nav id="footer-nav" class="navbar navbar-default navbar-fixed-bottom" role="navigation">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 hidden-xs">
				<h4 class="col-sm-offset-4">Rubriken</h4>
				<div class="col-sm-4 col-sm-offset-4 alpha">
					<ul>
						<li><a href="#">Live</a></li>
						<li><a href="#">Hot</a></li>
						<li><a href="#">New</a></li>
						<li><a href="#">Nachrichten</a></li>
						<li><a href="#">Sport</a></li>
						<li><a href="#">Serien</a></li>
						<li><a href="#">Spielfilme</a></li>
						<li><a href="#">Dokumentationen</a></li>
						<li><a href="#">Lifestyle</a></li>
					</ul>
				</div>
			</div>
			<div class="col-sm-3 hidden-xs">
				<h4 class="col-sm-offset-4">Sender</h4>
				<div class="col-sm-4 col-sm-offset-4 alpha">
					<ul>
					    <li><a href="#">Das Erste</a></li>
					    <li><a href="#">ZDF</a></li>
					    <li><a href="#">Arte</a></li>
					    <li><a href="#">BR</a></li>
					    <li><a href="#">SWR</a></li>
					    <li><a href="#">WDR</a></li>
					    <li><a href="#">NDR</a></li>
					    <li><a href="#">3Sat</a></li>
					</ul>
				</div>
			</div>
			<div class="col-sm-3 hidden-xs">
				<h4 class="col-sm-offset-4">Konto</h4>
				<div class="col-sm-4 col-sm-offset-4 alpha ">
					<ul>
						<li><a href="#">Übersicht</a></li>
						<li><a href="#">Playlisten</a></li>
						<li><a href="#">Favoriten</a></li>
						<li><a href="#">Merkliste</a></li>
						<li><a href="#">Einstellungen</a></li>
						<li><a href="#">Abmelden</a></li>
					</ul>
				</div>
			</div>
			<div class="col-sm-3 hidden-xs">
				<h4 class="col-sm-offset-4">Sonstiges</h4>
				<div class="col-sm-4 col-sm-offset-4 alpha">
					<ul>
					    @if(Auth::check())
					    	<li><a href="{{ URL::route('account-my-account') }}">Mein Konto</a></li>
					    @else
					    	<li><a href="{{ URL::route('account-sign-in') }}">Anmelden</a></li>
					    @endif
					    <li><a href="#">About</a></li>
					    <li><a href="#">Kontakt</a></li>
					    <li><a href="#">Impressum</a></li>
					    <li><a href="#">Datenschutz</a></li>
				    </ul>
				</div>
		    </div>
	    </div>
	</div>
</nav>
<!-- END layout/footer -->