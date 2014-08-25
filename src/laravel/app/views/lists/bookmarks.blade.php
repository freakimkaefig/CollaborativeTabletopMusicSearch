@extends('layout.main')

@section('content')
    <div class="row">
        <h2 class="text-center page-title">Merkliste</h2>
    </div>
		<?php
			//$results = DB::select('select * from playlists where user="'+Auth::id()+'"');
			$results= DB::table('broadcasts')->where('user_id', '=', Auth::id())->get();
		?>
    <div id="bookmark-items" class="list row">
    @foreach($results as $result)
    	<div id="list-item-{{$result->id}}" class="list-item col-xs-12 col-sm-10 col-sm-offset-1">
        <?php 
          try{
            $image = get_object_vars(json_decode($result->image)[0])['_url'];
          }
          catch(Exception $e){
            $image = "no image";
          }
        ?>
            <a href="/video/bookmark/{{$result->id}}" class="col-xs-8 col-sm-4 alpha">
                <img src='{{$image}}' class="img-responsive"/>
            </a>
            <div class="col-xs-1 col-xs-offset-1 pull-right hidden-sm hidden-md hidden-lg">
                <button class="btn btn-transparent pull-right" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}">X</button>
            </div>
            <a href="/video/bookmark/{{$result->id}}" class="col-xs-12 col-sm-6 alpha">
                <div class="list-item-description">
                    <h3>{{$result->title}}</h3>
                    <h4>{{($result->subtitle) ? $result->subtitle : ""}}</h4>
                    <h4>Sender: {{$result->station}}</h4>
                    <h4>Datum: {{date('d.m.y H:i', strtotime($result->airtime))}}</h4>
                    <h4>Dauer: {{$result->duration}}</h4>
                </div>
            </a>
            <div class="col-sm-1 pull-right hidden-xs">
                <button class="btn btn-transparent pull-right" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}">X</button>
            </div>
            <div class="modal fade" id="confirm-delete-{{$result->id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" >Sicherheitsabfrage</h4>
                  </div>
                
                  <div class="modal-body">
                    <p>Du bist dabei das Video "{{$result->title}}" aus ihrer Playliste zu löschen! </p>
                    <p>Video wirklich löschen?</p>
                  </div>
                    
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
                    <button id="delete-bookmark-{{$result->id}}" value="{{$result->id}}" class="btn pull-right" data-dismiss="modal">Löschen</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    @endforeach
  	</div> 	
   			 

@stop
