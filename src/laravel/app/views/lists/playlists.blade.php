@extends('layout.main')

@section('content')
	<h1>Playlisten</h1>
	<button id="newList">Neue Liste</button>
	<form action="{{ URL::route('new-playlist')}}" method="post">
		<input type="text" name="playlistName" />
		<button type="submit">Erstellen</button>
	</form>
		<?php
			//$results = DB::select('select * from playlists where user="'+Auth::id()+'"');
			$results= DB::table('playlists')->where('user', '=', Auth::id())->get();
		?>
   			@foreach($results as $result)
				<?php $results_broadcast= DB::table('broadcasts')->where('playlist_id', '=',Auth::id())->get() ?>				
       			 <h2><a href="{{ URL::route('playlist-single',[$result->id,$results_broadcast[0]->id])}}">{{$result->name}}</a></h2>
       		@endforeach
   			 

@stop