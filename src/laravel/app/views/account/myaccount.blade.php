@extends('layout.main')

@section('content')
	<!-- START account/myaccount -->
	<h2>Mein Konto</h2>
	<p>Das ist die Mein Konto Übersichtsseite</p>
	<ul>
		<li><a href="{{ URL::route('account-sign-out') }}">Abmelden</a></li>
		<li><a href="{{ URL::route('account-change-password') }}">Passwort ändern</a></li>
	</ul>
	<div class="col-sm-3 col-lg-4">
		<h2 class="text-center">Favoriten</h2>
	</div>
	<div class="col-sm-6 col-lg-4">
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
		            $image_playlist = "https://photos-4.dropbox.com/t/0/AAApwsyTodwk2yHgkVFcSHvOVcX_xwrcppU_0HLeIx3GnA/12/97810337/png/1024x768/3/1406131200/0/2/rect3001.png/LEsRiQ13NKBewQUDTxuK0ie3K6O6kGJ1Oy8ez2kQfYY";
		          }
		        ?>
		    @if(isset($videos[0]->id))  
   			<a href="{{ URL::route('playlist-single',[$result->id,$videos[0]->id])}}"><div class="list-item row ">
		        <img src='{{$image_playlist}}' class="img-responsive col-sm-6"/>
       			<div class="col-sm-6">
       			<h4>{{$result->name}}</h4>
       			<h5>1){{ isset($videos[0]->title) ? substr($videos[0]->title,0,25).((strlen($videos[0]->title)>24) ? '...' : "") : '' }}</h5>
       			<h5>2){{ isset($videos[1]->title) ? substr($videos[1]->title,0,25).((strlen($videos[1]->title)>24) ? '...' : "") : '' }}</h5>
       			<h5>3){{ isset($videos[2]->title) ? substr($videos[2]->title,0,25).((strlen($videos[2]->title)>24) ? '...' : "") : '' }}</h5>
   				</div>
   			</div></a>
   			@else
   			<div class="list-item">
   				<img src='{{$image}}' class="img-responsive col-lg-3"/>
   				<h3>{{$result->name}}</h3>
   				<h4>Noch nichts vorhanden</h4>
   			</div> 
   			@endif
       		@endforeach
	</div>
	<div class="col-sm-3 col-lg-4">
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
			<div class="item col-xs-12 col-sm-12 col-lg-8 col-lg-offset-2">
				<a href="/video/bookmark/{{$result->id}}">
				<img src="{{$image_bookmark}}" class="img-responsive col-xs-12"/>
				<div class="col-xs-12">{{$result->title}}</div>
				<div class="col-xs-12">TODO: subtitle</div>
				<div class="col-xs-12"><span>{{$result->airtime}}</span> | <span> {{$result->duration}}</span> | <span>{{$result->station}}</span></div>
				</a>
			</div>
       		@endforeach
	</div>
	<!-- END account/myaccount -->
@stop