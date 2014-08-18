@extends('layout.main')

@section('content')
	<!-- START account/myaccount -->
	<div class="col-xs-12">
		<h2 class="text-center">
			<div class="col-xs-12 col-sm-6">Mein Konto</div>
			<div class="col-xs-12 col-sm-6 visible-xs hidden-sm">
				<div class="spacer visible-xs hidden-sm"></div>
				<a class="text-center" href="{{ URL::route('account-change-password') }}">
					<button class=" btn btn-transparent"> Passwort ändern</button>
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 hidden-xs visible-sm">
				<div class="spacer visible-xs hidden-sm"></div>
				<a class="pull-right" href="{{ URL::route('account-change-password') }}">
					<button class=" btn btn-transparent"> Passwort ändern</button>
				</a>
			</div>
		</h2>
	</div>
	<div class="col-xs-12 col-sm-7 col-lg-7">
		<div class="spacer visible-xs hidden-sm"></div>
		<h2 class="text-center">Playlisten</h2>
		<?php
			//$results = DB::select('select * from playlists where user="'+Auth::id()+'"');
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
   			<a href="{{ URL::route('playlist-single',[$result->id,$videos[0]->id])}}"><div class="list-item">
		        <img src='{{$image_playlist}}' class="img-responsive col-sm-6 col-lg-4"/>
       			<div class="col-sm-6 col-lg-8">
	       			<h4>{{$result->name}}</h4>
	       			<h5>{{ isset($videos[0]->title) ? '1) ' . substr($videos[0]->title,0,25).((strlen($videos[0]->title)>24) ? '...' : "") : '' }}</h5>
	       			<h5>{{ isset($videos[1]->title) ? '2) ' . substr($videos[1]->title,0,25).((strlen($videos[1]->title)>24) ? '...' : "") : '' }}</h5>
	       			<h5>{{ isset($videos[2]->title) ? '3) ' . substr($videos[2]->title,0,25).((strlen($videos[2]->title)>24) ? '...' : "") : '' }}</h5>
   				</div>
   			</div></a>
   			@else
   			<div class="list-item">
   				<img src='{{$image_playlist}}' class="img-responsive col-sm-6 col-lg-4"/>
   				<div class="col-sm-6 col-lg-8">
	   				<h3>{{$result->name}}</h3>
	   				<h5>Diese Playliste ist leer.</h5>
   				</div>
   			</div> 
   			@endif
       		@endforeach
	</div>
	<div class="col-xs-12 col-sm-4 col-sm-offset-1 col-md-4 col-md-offset-1">
		<div class="spacer visible-xs hidden-sm"></div>
		<div class="spacer visible-xs hidden-sm"></div>
		<h2 class="text-center">Merkliste</h2>
		<?php
			//$results = DB::select('select * from playlists where user="'+Auth::id()+'"');
			$results = DB::table('broadcasts')->where('user_id', '=', Auth::id())->take(5)->get();
		     
		?>
   			@foreach($results as $result)
		    <?php try{
		            $image_bookmark = get_object_vars(json_decode($result->image)[0])['_url'];
		          }
		          catch(Exception $e){
		            $image_bookmark = "";
		          } ?>
			<div class="video-item col-xs-12 col-lg-8 col-lg-offset-2">
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
	<!-- END account/myaccount -->
@stop