@extends('layout.main')

@section('content')

<div class="container">
	<div id="home-title" class="col-xs-12 col-sm-8 col-sm-offset-2">
		<h1>Meditahekcrawler</h1>
		<h3>Der einfachste Weg Ihre Lieblingsvideos in den Mediatheken zu finden.</h3>	
		<h4>Melden Sie sich jetzt an oder Registrieren Sie sich für ein noch besseres Mediathekerlebnis!</h4>
	</div>
</div>
<div id="home-channels" class="container-fluid">
		<h3>Sender:</h3>
		<li class="col-xs-6 col-sm-2"><a href="{{URL::route('channel',array('DasErste'))}}"><div><img src="css/images/Das_Erste_2014.svg" /></div></a>	</li>
		<li class="col-xs-6 col-sm-2"><a href="{{URL::route('channel',array('ZDF'))}}"><div><img src="css/images/ZDF.svg" /></div>	</a></li>
		<li class="col-xs-6 col-sm-2"><a href="{{URL::route('channel',array('BR'))}}"><div><img src="css/images/br.svg" /></div>	</a></li>
		<li class="col-xs-6 col-sm-2"><a href="{{URL::route('channel',array('Arte'))}}"><div><img src="css/images/Arte.svg" /></div>	</a></li>
		<li class="col-xs-6 col-sm-2"><a href="{{URL::route('channel',array('SRF'))}}"><div><img src="css/images/srf.svg" /></div>	</a></li>
</div>
<div id="home-categories" class="container-fluid">
	
	<h3>Kategorien:</h3>
	<li class="col-xs-6 col-sm-2"><a href="{{ URL::route('hot-videos') }}"><div>Hot</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{ URL::route('new-videos') }}"><div>New</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('politik'))}}"><div>Politik</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('sport'))}}"><div>Sport</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('kinder'))}}"><div>Kinder</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('wissen-kultur'))}}"><div>Wissen</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('nachrichten'))}}"><div>Nachrichten</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('kino-tv'))}}"><div>Kino &amp; TV</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('wirtschaft'))}}"><div>Wirtschaft</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('ratgeber-gesundheit'))}}"><div>Ratgeber</div></a></li>
	<li class="col-xs-6 col-sm-2"><a href="{{URL::route('category',array('unterhaltung'))}}"><div>Unterhaltung</div></a></li>
</div>



</div>
@stop