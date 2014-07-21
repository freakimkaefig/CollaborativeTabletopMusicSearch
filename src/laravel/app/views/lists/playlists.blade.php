@extends('layout.main')

@section('content')
	<h1>Playlisten</h1>
	<button id="newList">Neue Liste</button>
	<form action="{{ URL::route('new-playlist')}}" method="post">
		<input type="text" name="playlistName" />
		<button type="submit">Erstellen</button>
		<?php
			$results = DB::select('select * from playlists');
			foreach($results as $result) {
       			 echo '<h2>',$result->name,'</h2>';
   			 }
		?>
	</form>

@stop