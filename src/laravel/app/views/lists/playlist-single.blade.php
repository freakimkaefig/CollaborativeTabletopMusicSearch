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
            echo '<a href="'.URL::route("playlist-single",[$playlist,$before]).'"><button class="btn btn-transparent col-xs-6 col-sm-12" >vorheriges</button></a>';
            echo "<div>".$results_videos[$beforeIndex]->title."</div>"; 
            echo "<div>".$results_videos[$beforeIndex]->subtitle."</div>"; 
          } catch (Exception $e) {
            $before = $results_videos[$beforeIndex+1]->id;
          }
         ?>
        </div>
        <div id="playlist-video-wrapper" class="img-responsive col-xs-12 col-sm-8">
       
        <video id="video-playlist" class="video-js vjs-default-skin " controls preload="auto">
        <?php

          $urls = DB::table('broadcasts')->select('url')->where('id',"=", $playlistVideo)->get(); 
          foreach ($urls as $url ) { 
            foreach ($url as $u) {
              $obj = json_decode($u);
              usort($obj, function($a, $b)
              {
                  return strcmp($b->_quality, $a->_quality);
              });
                foreach ($obj as $o) {
                  echo "<source src='$o->_url' type='$o->_type' data-res='".checkQuality($o->_quality)."''>";
                }
            }
          }
          function checkQuality($quality){
              if($quality==3){
                return "Hoch";
              }
              else if ($quality==2){
                return "Gut";
              }
              else if ($quality==1){
                return "Mittel";
              }
              else if ($quality==0){
                return "Schlecht";
              }
          }

        ?>
        </video>
        </div>
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
            echo '<a href="'.URL::route("playlist-single",[$playlist,$next]).'"><button class="btn btn-transparent col-xs-6 col-sm-12" >nächstes</button></a>';
            echo "<div>".$results_videos[$nextIndex]->title."</div>"; 
            echo "<div>".$results_videos[$nextIndex]->subtitle."</div>"; 
          } catch (Exception $e) {
            $next = $results_videos[$nextIndex-1]->id;
          }
         ?>
        </div> 
      </div>
    </div>
    <div class="list row">
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
        <a href="{{URL::route('playlist-single',[$playlist,$result->id])}}">
        <img src='{{$image}}' class="img-responsive col-xs 12 col-sm-3"/>
        <div class="list-item-description col-sm-7 col-sm-offset-1">
        <h3>{{$result->title}}</h3>
        <h4>{{($result->subtitle) ? $result->subtitle : ""}}</h4>
        <h4>Sender:{{$result->station}}</h4>
        <h4>Datum:{{date('d.m.y H:i', strtotime($result->airtime))}}</h4>
        <h4>Dauer:{{$result->duration}}</h4>
        </div>
        </a>
        <button class="btn btn-transparent pull-right" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}">X</button>
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