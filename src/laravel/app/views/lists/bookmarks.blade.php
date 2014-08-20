@extends('layout.main')

@section('content')
	<h2 class="text-center page-title">Merkliste</h2>
		<?php
			//$results = DB::select('select * from playlists where user="'+Auth::id()+'"');
			$results= DB::table('broadcasts')->where('user_id', '=', Auth::id())->get();
		?>
   		 <div class="list row">
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
        <a href="/video/bookmark/{{$result->id}}">
        <img src='{{$image}}' class="img-responsive col-sm-3"/>
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
                    <p>Sie sind dabei das Video "{{$result->title}}" aus ihrer Merkliste zu löschen! </p>
                    <p>Wirklich löschen?</p>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                    <button id="delete-bookmark-{{$result->id}}" value="{{$result->id}}" class="btn"  data-dismiss="modal">Löschen</button>
                </div>
            </div>
        </div>
        </div>
      </div>
    @endforeach
  	</div 	
   			 

@stop