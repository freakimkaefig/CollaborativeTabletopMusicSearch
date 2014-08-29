<!-- START search/results -->
<div id="waiting"><h2 class="text-center col-sm-6 col-sm-offset-3">Die Mediatheken werden durchsucht. Das dauert ein bisschen.<br> Bitte warte einen Augenblick.<br><br><a class="hover" href="{{ URL::route('home') }}">Oder zurück zur Startseite</a></h2>
</div>

<div class="col-sm-12 hidden" id="sort-buttons">
	<span><h4>Sortieren: </h4></span>
	<span><button id="alphabetic-sort" class="btn-transparent" value="asc">Alphabetisch</button></span>
	<button id="duration-sort" class="btn-transparent" value="asc">Dauer</button>
	<button id="channel-sort" class="btn-transparent" value="asc">Sender</button>
	<button id="date-sort" class="btn-transparent" value="asc">Datum</button>
	<button id="hot-new-sort" class="btn-transparent hidden" value="asc">Hot / New</button>
</div>
<div id="result-wrapper" class="row"></div>
<!-- END search/results --> 
