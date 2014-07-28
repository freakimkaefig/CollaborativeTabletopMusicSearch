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
      <div class="col-sm-12 col-sm-offset-0">
        <div id="playlist-before-container" class="col-sm-2">
         <?php
          $beforeIndex = null; 
          foreach($results_videos AS $key=>$result){
            if ($result->id == $playlistVideo){
                  $beforeIndex = $key-1;
            }
          }
          try {
            $before = $results_videos[$beforeIndex]->id;
            echo '<button class="btn col-xs-6 col-sm-12" ><a href="'.URL::route("playlist-single",[$playlist,$before]).'">vorheriges Video</a></button>';
            echo "<span>".$results_videos[$beforeIndex]->title."</span>"; 

          } catch (Exception $e) {
            $before = $results_videos[$beforeIndex+1]->id;
          }
         ?>
        </div>
        <video id="playlist-video" class="video-js vjs-default-skin img-responsive col-xs-12 col-sm-8" controls preload="auto">
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
        <div id="playlist-next-container"  class="col-sm-2">
           
        <?php
          $nextIndex = null; 
          foreach($results_videos AS $key=>$result){
            if ($result->id == $playlistVideo){
                  $nextIndex = $key+1;
            }
          }
          try {
            $next = $results_videos[$nextIndex]->id;
            echo '<button class="btn col-xs-6 col-sm-12" ><a href="'.URL::route("playlist-single",[$playlist,$next]).'">nächstes</a></button>';
            echo "<span>".$results_videos[$nextIndex]->title."</span>"; 
          } catch (Exception $e) {
            $next = $results_videos[$nextIndex-1]->id;
          }
         ?>
        </div> 
      </div>
    </div>
    <div class="row">
    @foreach($results_videos as $result)
    	<div id="list-item-{{$result->id}}" class="list-item  col-xs-12 col-sm-10 col-sm-offset-1">
        <?php 
          try{
            $image = get_object_vars(json_decode($result->image)[0])['_url'];
          }
          catch(Exception $e){
            $image = "no image";
          }
        ?>
        <img src='{{$image}}' class="img-responsive col-xs 12 col-sm-3"/>
        <div class="list-item-description col-sm-7 col-sm-offset-1">
        <h3><a href="{{URL::route('playlist-single',[$playlist,$result->id])}}">{{$result->title}}</a></h3>
        <h4>Sender:{{$result->station}}</h4>
        <h4>Datum:{{$result->airtime}}</h4>
        <h4>Dauer:{{$result->duration}}</h4>
        </div>
        <button class="btn pull-right" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}">X</button>
        <div class="modal fade" id="confirm-delete-{{$result->id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" >Video wirklich löschen?</h4>
                </div>
            
                <div class="modal-body">
                    <p>Sie sind dabei das Video "{{$result->title}}" aus ihrer Playliste zu löschen! </p>
                    <p>Wirklich löschen?</p>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                    <button id="delete-from-playlist-{{$result->id}}" value="{{$result->id}}" class="btn pull-right" data-dismiss="modal">Löschen</button>
                </div>
            </div>
        </div>
        </div>
      </div>
    @endforeach
  	</div>


@stop