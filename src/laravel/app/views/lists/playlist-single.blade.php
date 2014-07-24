@extends('layout.main')

@section('content')
	<?php 
		$results_playlist = DB::table('playlists')->where('id', '=', $playlist)->get();
		$results_videos = DB::table('broadcasts')->orderBy('updated_at', 'desc')->where('playlist_id','=',$playlist)->get();

  	?>
    @foreach($results_playlist as $result)
      <div class="col-sm-12 text-center"><h1>Playlist:{{$result->name}}</h1></div>
    @endforeach
    <div class="row">  
      <div class="col-sm-8 col-sm-offset-2">
      <button class="btn col-sm-1">vorheriges</button>  
      <video id="playlist-video" class="video-js vjs-default-skin img-responsive col-sm-10" controls preload="auto">
      <?php
        $urls = DB::table('broadcasts')->select('url')->where('id',"=", $playlistVideo)->get(); 
        foreach ($urls as $url ) { 
          foreach ($url as $u) {
            $obj = json_decode($u);
              foreach ($obj as $o) {
                echo "<source src='$o->_url' type='$o->_type'>";
              }
          }
        }
      ?>
      </video>
      <button class="btn col-sm-1">nächstes</button>
      </div>
    </div>
    <div class="row">
    @foreach($results_videos as $result)
    	<div id="list-item-{{$result->id}}"class="list-item col-sm-10 col-sm-offset-1">
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
        <h3><a href="{{URL::route('playlist-single',[$playlist,$result->id])}}">{{$result->title}}</a></h3>
        <h4>Sender:{{$result->station_id}}</h4>
        <h4>Datum:{{$result->airtime}}</h4>
        <h4>Dauer:{{$result->duration}}</h4>
        </div>
        <button id="delete-from-playlist-{{$result->id}}" value="{{$result->id}}" class="btn pull-right">X</button>
      </div>
    @endforeach
  	</div>


@stop