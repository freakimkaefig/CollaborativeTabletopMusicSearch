@extends('layout.main')

@section('content')
	<h2>Mein Konto</h2>
	<p>Das ist die Mein Konto Übersichtsseite</p>
	<ul>
		<li><a href="{{ URL::route('account-sign-out') }}">Abmelden</a></li>
		<li><a href="{{ URL::route('account-change-password') }}">Passwort ändern</a></li>
	</ul>
@stop