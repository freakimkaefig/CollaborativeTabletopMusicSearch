@extends('layout.main')

@section('content')
	<!-- START account/myaccount -->
	<div class="row hidden-xs">
		<h2 class="page-title">Mein Konto</h2>
		<div class="pull-right col-xs-4 text-right">
			<a class="text-center" href="{{ URL::route('account-change-password') }}">
				<button class=" btn btn-transparent"> Passwort ändern</button>
			</a>
		</div>
	</div>
	<div class="visible-xs">
		<div class="col-xs-12 list-item">
			<h2 class="text-center">Mein Konto</h2>
			<div class="text-center">
				<a class="text-center" href="{{ URL::route('account-change-password') }}">
					<button class=" btn btn-transparent"> Passwort ändern</button>
				</a>
			</div>
		<hr>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12 col-sm-7 col-lg-7">
			<h2 class="text-center">
				Playlisten
				<a href="{{ URL::route('playlists') }}">
					<small><span class="pull-right glyphicon glyphicon-pencil"></span></small>
				</a>
			</h2>
			<?php
				$results= DB::table('playlists')->where('user', '=', Auth::id())->take(5)->get();
			?>
	   			@foreach($results as $result)
					<?php 
						$results_broadcast= DB::table('broadcasts')->get() ;
						$id = $result->id;
						$videos = DB::table('broadcasts')->orderBy('updated_at','desc')->where('playlist_id','=', $id)->get();
					?>

			        <?php 
			          try{
			            $image_playlist = get_object_vars(json_decode($videos[0]->image)[0])['_url'];
			          }
			          catch(Exception $e){
			            $image_playlist = "/images/no_image.png";
			          }
			        ?>
			    @if(isset($videos[0]->id))  
	   			<a href="{{ URL::route('playlist-single',[$result->id,$videos[0]->id])}}">
	   				<div class="list-item">
	   					<div class="list-item-content">
					        <img src='{{$image_playlist}}' class="img-responsive col-sm-6 col-lg-4"/>
			       			<div class="col-sm-6 col-lg-8">
				       			<h4>{{$result->name}}</h4>
				       			<h5>{{ isset($videos[0]->title) ? '1) ' . substr($videos[0]->title,0,25).((strlen($videos[0]->title)>24) ? '...' : "") : '' }}</h5>
				       			<h5>{{ isset($videos[1]->title) ? '2) ' . substr($videos[1]->title,0,25).((strlen($videos[1]->title)>24) ? '...' : "") : '' }}</h5>
				       			<h5>{{ isset($videos[2]->title) ? '3) ' . substr($videos[2]->title,0,25).((strlen($videos[2]->title)>24) ? '...' : "") : '' }}</h5>
			   				</div>
			   			</div>
	   				</div>
	   			</a>
	   			@else
	   			<div class="list-item">
	   				<div class="list-item-content">
		   				<img src='{{$image_playlist}}' class="img-responsive col-sm-6 col-lg-4"/>
		   				<div class="col-sm-6 col-lg-8">
			   				<h3>{{$result->name}}</h3>
			   				<h5>Diese Playliste ist leer.</h5>
		   				</div>
		   			</div>
	   			</div> 
	   			@endif
	       		@endforeach
			<hr class="visible-xs">
		</div>
		<div class="col-xs-12 col-sm-4 col-sm-offset-1 col-md-4 col-md-offset-1">
			<h2 class="text-center">
				Merkliste
				<a href="{{ URL::route('bookmarks') }}">
					<small><span class="pull-right glyphicon glyphicon-pencil"></span></small>
				</a>
			</h2>
			<?php
				$results = DB::table('broadcasts')->where('user_id', '=', Auth::id())->take(5)->get();
			?>
	   			@foreach($results as $result)
			    <?php try{
			            $image_bookmark = get_object_vars(json_decode($result->image)[0])['_url'];
			          }
			          catch(Exception $e){
			            $image_bookmark = "";
			          } ?>
				<div class="video-item list-item col-xs-12 col-lg-8 col-lg-offset-2">
					<a href="/video/bookmark/{{$result->id}}">
					<img src="{{$image_bookmark}}" class="img-responsive col-xs-12"/>
					<div class="video-item-description col-xs-12">
						<div class="video-item-title">{{$result->title}}</div>
						<div class="video-item-subtitle">{{($result->subtitle) ? $result->subtitle : ""}}</div>
						<div class="video-item-time">
							<span>{{date('d.m.y H:i', strtotime($result->airtime))}}</span>
						</div>
						<div class="video-item-channel">
							<span>{{$result->station}}</span> | <span>{{$result->duration}}</span> 
						</div>
					</div>
					</a>
				</div>
	       		@endforeach
		</div>
	</div>
	<!-- END account/myaccount -->
@stop