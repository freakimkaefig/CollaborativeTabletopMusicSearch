@extends('layout.main')

@section('content')
	<!-- START lists/playlists -->
	<div class="row">
		<h2 class="text-center page-title">Playlisten</h2>	
	</div>
	<div class="col-xs-3 alpha">
	<button id="new-list" class="btn btn-transparent">Neue Liste</button>
	<form id="create-playlist" class="select-box col-sm-6 hidden" action="{{ URL::route('new-playlist')}}" method="post">
		<input type="text" name="playlistName" />
		<button id="button-create-playlist" class="col-xs-12 btn btn-transparent" type="submit">Erstellen</button>
		<button id="button-create-playlist-cancel" class=" col-xs-12 btn btn-transparent" >Abbrechen</button>
	</form>
	</div>
		<?php
			//$results = DB::select('select * from playlists where user="'+Auth::id()+'"');
			$results= DB::table('playlists')->where('user', '=', Auth::id())->get();
		?>
   			@foreach($results as $result)
				<?php 
					$results_broadcast= DB::table('broadcasts')->get() ;
					$id = $result->id;
					$videos = DB::table('broadcasts')->orderBy('updated_at','desc')->where('playlist_id','=', $id)->get();
				?>

		        <?php 
		          try{
		            $image = get_object_vars(json_decode($videos[0]->image)[0])['_url'];
		          }
		          catch(Exception $e){
		            $image = "/images/no_image.png";
		          }
		        ?>
		    @if(isset($videos[0]->id))  
   			<div  id="list-item-{{$result->id}}" class="list-item col-xs-12 col-sm-10 col-sm-offset-1">
   				<a href="{{ URL::route('playlist-single',[$result->id,$videos[0]->id])}}">
		        	<img src='{{$image}}' class="img-responsive col-xs-10 col-md-4 col-lg-3"/>
		        </a>
		       	<div class="col-xs-1 pull-right">
		        	<button class="btn btn-transparent pull-right" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}">X</button>
		        </div>
		        <a href="{{ URL::route('playlist-single',[$result->id,$videos[0]->id])}}">
       				<div class="col-xs-12 col-md-7 col-lg-8">
       					<h3>{{$result->name}}</h3>
       					<h4>{{ isset($videos[0]->title) ? '1) ' . $videos[0]->title : '' }}</h4>
       					<h4>{{ isset($videos[1]->title) ? '2) ' . $videos[1]->title : '' }}</h4>
       					<h4>{{ isset($videos[2]->title) ? '3) ' .$videos[2]->title : '' }}</h4>
       					<!-- <h4>3)<?php try{ echo $videos[0]->title;}catch(Exception $e){echo "";}?></h4> -->
       				</div>
       			</a>
       			<div class="modal fade" id="confirm-delete-{{$result->id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		        <div class="modal-dialog">
		            <div class="modal-content">
		                <div class="modal-header">
		                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                    <h4 class="modal-title" >Video wirklich löschen?</h4>
		                </div>
		            
		                <div class="modal-body">
		                    <p>Sie sind dabei die Playliste "{{$result->name}}" zu löschen! </p>
		                    <p>Wirklich löschen?</p>
		                </div>
		                
		                <div class="modal-footer">
		                    <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
   							<button id="delete-playlist-{{$result->id}}" value="{{$result->id}}" class="btn pull-right">Löschen</button>
		                </div>
		            </div>
		        </div>
		        </div>
   			</div>
   			@else
   			<div id="list-item-{{$result->id}}" class="list-item col-xs-12 col-sm-10 col-sm-offset-1">
   				<img src='{{$image}}' class="img-responsive col-xs-10 col-md-4 col-lg-3"/>
   				<div class="col-xs-1 pull-right">
		        	<button class="btn btn-transparent pull-right" data-toggle="modal" data-target="#confirm-delete-{{$result->id}}">X</button>
		        </div>
   				<div class="col-xs-12 col-md-7 col-lg-8">
   					<h3>{{$result->name}}</h3>
   					<h4>Diese Playliste ist leer.</h4>
   				</div>
		        <div class="modal fade" id="confirm-delete-{{$result->id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		        <div class="modal-dialog">
		            <div class="modal-content">
		                <div class="modal-header">
		                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                    <h4 class="modal-title" >Video wirklich löschen?</h4>
		                </div>
		            
		                <div class="modal-body">
		                    <p>Sie sind dabei die Playliste "{{$result->name}}" zu löschen! </p>
		                    <p>Wirklich löschen?</p>
		                </div>
		                
		                <div class="modal-footer">
		                    <button type="button" class="btn btn-default" data-dismiss="modal">Abbrechen</button>
   							<button id="delete-playlist-{{$result->id}}" value="{{$result->id}}" class="btn pull-right">Löschen</button>
		                </div>
		            </div>
		        </div>
		        </div>
   			</div> 
   			@endif
       		@endforeach
    <!-- END lists/playlists -->
@stop