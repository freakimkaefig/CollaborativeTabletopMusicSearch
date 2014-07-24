@extends('layout.main')

@section('content')
	<h1 class="text-center">Merkliste</h1>
		<?php
			//$results = DB::select('select * from playlists where user="'+Auth::id()+'"');
			$results= DB::table('broadcasts')->where('user_id', '=', Auth::id())->get();
		?>
   		 <div class="row">
    @foreach($results as $result)
    	<div id="list-item-{{$result->id}}" class="list-item col-sm-10 col-sm-offset-1">
        <?php 
          try{
            $image = get_object_vars(json_decode($result->image)[0])['_url'];
          }
          catch(Exception $e){
            $image = "no image";
          }
        ?>
        <img src='{{$image}}' class="img-responsive col-sm-3"/>
        <div class="list-item-description col-sm-7 col-sm-offset-1">
        <h3><a href="/video/bookmark/{{$result->id}}">{{$result->title}}</a></h3>
        <h4>Sender:{{$result->station_id}}</h4>
        <h4>Datum:{{$result->airtime}}</h4>
        <h4>Dauer:{{$result->duration}}</h4>
        </div>
        <button id="delete-from-playlist-{{$result->id}}" value="{{$result->id}}" class="btn pull-right">X</button>
      </div>
    @endforeach
  	</div 	
   			 

@stop