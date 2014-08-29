@extends('layout.main')

@section('content')

    <div class="row">
        <div id="feedback-container-mobile" class="container-fluid feedback-container"><h4 class="text-center"></h4></div>
        <h2 class="text-center page-title">Merkliste</h2>
    </div>
		<?php
			$results= DB::table('broadcasts')->where('user_id', '=', Auth::id())->get();
		?>
    <div id="bookmark-items" class="list row">
    @foreach($results as $result)
    	<div id="list-item-{{$result->id}}" class="video-item video-item col-xs-12 col-sm-6 col-md-3 col-lg-2">
                <a href="/video/bookmark/{{$result->id}}" class="col-xs-12 alpha">
                <?php 
                  try{
                    $image = get_object_vars(json_decode($result->image)[0])['_url'];
                  }
                  catch(Exception $e){
                    $image = "no image";
                  }
                ?>
                <img src='{{$image}}' class="img-responsive col-xs-11"/>
                    <div class="video-item-description col-xs-12">
                        <div class="video-item-title">{{$result->title}}</div>
                        <div class="video-item-subtitle">{{($result->subtitle) ? $result->subtitle : ""}}</div>
                        <div class="video-item-time">{{date('d.m.y H:i', strtotime($result->airtime))}}</div>
                        <div class="video-item-channel">{{$result->station}} | {{$result->duration}}</div>
                    </div>
                </a>
                  <div class=" pull-right hidden-sm hidden-md hidden-lg">
                      <button class="btn btn-transparent pull-right bookmark-delete" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}">X</button>
                  </div>
                  <div class="hidden-xs">
                      <button class="btn btn-transparent glyphicon glyphicon-trash pull-right  bookmark-delete" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}"></button>
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
