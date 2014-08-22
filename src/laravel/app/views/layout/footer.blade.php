<!-- START layout/footer -->
<nav id="footer-nav" class="navbar navbar-default navbar-fixed-bottom hidden-xs" role="navigation">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-sm-offset-1">
				<h4 class="col-sm-offset-2">Rubriken</h4>
				<div class="col-sm-6 col-md-4 alpha">
					<ul>
						<li><a href="{{URL::route('category',array('live'))}}">Live</a></li>
						<li><a href="{{ URL::route('hot-videos') }}">Hot</a></li>
						<li><a href="{{ URL::route('new-videos') }}">New</a></li>
						<li><a href="{{URL::route('category',array('politik'))}}">Politik</a></li>
						<li><a href="{{URL::route('category',array('sport'))}}">Sport</a></li>
						<li><a href="{{URL::route('category',array('kinder'))}}">Kinder</a></li>
						<li><a href="{{URL::route('category',array('wissen-kultur'))}}">Wissen</a></li>

					</ul>
				</div>
				<div class="col-sm-6 col-md-4 alpha">
					<ul>
						<li><a href="{{URL::route('category',array('nachrichten'))}}">Nachrichten</a></li>
						<li><a href="{{URL::route('category',array('kino-tv'))}}">Kino &amp; TV</a></li>
						<li><a href="{{URL::route('category',array('wirtschaft'))}}">Wirtschaft</a></li>
						<li><a href="{{URL::route('category',array('ratgeber-gesundheit'))}}">Ratgeber</a></li>
						<li><a href="{{URL::route('category',array('unterhaltung'))}}">Unterhaltung</a></li>


					</ul>
				</div>
			</div>
			<div class="col-sm-3">
				<h4 class="">Sender</h4>
				<div class="alpha">
					<ul>
					    <li><a href="{{URL::route('channel',array('DasErste'))}}">Das Erste</a></li>
					    <li><a href="{{URL::route('channel',array('ZDF'))}}">ZDF</a></li>
					    <li><a href="{{URL::route('channel',array('ARTE'))}}">Arte</a></li>
					    <li><a href="{{URL::route('channel',array('BR'))}}">BR</a></li>
					    <li><a href="{{URL::route('channel',array('SRF'))}}">SRF</a></li>
					    <li><a href="{{URL::route('channel',array('ORF'))}}">ORF</a></li>
					</ul>
				</div>
			</div>
			<div class="col-sm-3">
				<h4 class="">Konto</h4>
				<div class="col-sm-4 alpha ">
					<ul>
							<li><a href="{{ URL::route('account-my-account') }}">Übersicht</a></li>
							<li><a href="{{ URL::route('playlists') }}">Playlisten</a></li>
							<li><a href="#">Favoriten</a></li>
							<li><a href="{{ URL::route('bookmarks') }}">Merkliste</a></li>
						
						@if(Auth::check())
							<li><a href="{{ URL::route('account-sign-out') }}">Abmelden</a></li>
					    @else
					    	<li><a href="{{ URL::route('account-sign-in') }}">Anmelden</a></li>
					    @endif
					</ul>
				</div>
			</div>
			<div class="col-sm-2 hidden-xs">
				<h4 class="col-sm-offset-1">&nbsp;</h4>
				<div class="col-sm-4 col-sm-offset-1 alpha">
					<ul>
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