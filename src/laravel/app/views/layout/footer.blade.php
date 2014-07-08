<!-- START layout/footer -->
<nav id="footer-nav" class="navbar navbar-default navbar-fixed-bottom" role="navigation">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-4">
				<h4>Rubriken</h4>
				<div class="col-sm-6 alpha">
					<ul>
						<li><a href="#">Live</a></li>
						<li><a href="#">Hot</a></li>
						<li><a href="#">New</a></li>
						<li><a href="#">Nachrichten</a></li>
						<li><a href="#">Sport</a></li>
					</ul>
				</div>
				<div class="col-sm-6 alpha">
					<ul>
						<li><a href="#">Serien</a></li>
						<li><a href="#">Filme</a></li>
						<li><a href="#">Wissen</a></li>
						<li><a href="#">etc</a></li>
					</ul>
				</div>
			</div>
			<div class="col-sm-6">
				<h4>Sender</h4>
				<div class="col-sm-4 alpha">
					<ul>
					    <li><a href="#">Das Erste</a></li>
					    <li><a href="#">ZDF</a></li>
					    <li><a href="#">Arte</a></li>
					    <li><a href="#">BR</a></li>
					    <li><a href="#">SWR</a></li>
					</ul>
				</div>
				<div class="col-sm-4 alpha">
					<ul>
					    <li><a href="#">WDR</a></li>
					    <li><a href="#">NDR</a></li>
					    <li><a href="#">RBB</a></li>
					    <li><a href="#">3Sat</a></li>
					    <li><a href="#">Hr</a></li>
					</ul>
				</div>
				<div class="col-sm-4 alpha">
					<ul>
					    <li><a href="#">ZDF Kultur</a></li>
					    <li><a href="#">ZDF Info</a></li>
					</ul>
				</div>
			</div>
			<div class="col-sm-2 ">
				<h4>Navigation</h4>
				<div class="col-sm-12 alpha">
					<ul>
					    @if(Auth::check())
					    	<li><a href="{{ URL::route('account-my-account') }}">Mein Konto</a></li>
					    @else
					    	<li><a href="{{ URL::route('account-sign-in') }}">Anmelden</a></li>
					    @endif
					    <li><a href="#">Sitemap</a></li>
					    <li><a href="#">Impressum</a></li>
					    <li><a href="#">Kontakt</a></li>
				    </ul>
				</div>
		    </div>
	    </div>
	</div>
</nav>
<!-- END layout/footer -->