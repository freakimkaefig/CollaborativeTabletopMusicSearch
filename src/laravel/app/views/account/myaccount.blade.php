@extends('layout.main')

@section('content')
	<!-- START account/myaccount -->
	<h2>Mein Konto</h2>
	<p>Das ist die Mein Konto Übersichtsseite</p>
	<ul>
		<li><a href="{{ URL::route('account-sign-out') }}">Abmelden</a></li>
		<li><a href="{{ URL::route('account-change-password') }}">Passwort ändern</a></li>
	</ul>
	<div class="col-sm-3 col-lg-4">
		<h2>Favoriten</h2>
	</div>
	<div class="col-sm-6 col-lg-4">
		<h2>Playlisten</h2>
	</div>
	<div class="col-sm-3 col-lg-4">
		<h2>Merkliste</h2>
	</div>
	<!-- END account/myaccount -->
@stop