@extends('layout.main')

@section('content')
	<h1 class="text-center">Playlisten</h1>
	<div class="col-sm-3">
	<button id="new-list" class="btn">Neue Liste</button>
	<form id="create-playlist" class="hidden" action="{{ URL::route('new-playlist')}}" method="post">
		<input type="text" name="playlistName" />
		<button id="button-create-playlist" class="btn" type="submit">Erstellen</button>
		<button id="button-create-playlist-cancel" class="btn" >Abbrechen</button>
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
		            $image = "https://photos-4.dropbox.com/t/0/AAApwsyTodwk2yHgkVFcSHvOVcX_xwrcppU_0HLeIx3GnA/12/97810337/png/1024x768/3/1406131200/0/2/rect3001.png/LEsRiQ13NKBewQUDTxuK0ie3K6O6kGJ1Oy8ez2kQfYY";
		          }
		        ?>
		    @if(isset($videos[0]->id))  
   			<div  id="list-item-{{$result->id}}" class="list-item col-sm-10 col-sm-offset-1"><a href="{{ URL::route('playlist-single',[$result->id,$videos[0]->id])}}">
		        <img src='{{$image}}' class="img-responsive col-lg-3"/>
       			<div class="col-sm-8">
       				<h3>{{$result->name}}</h3>
       				<h4>1){{ isset($videos[0]->title) ? $videos[0]->title : '' }}</h4>
       				<h4>2){{ isset($videos[1]->title) ? $videos[1]->title : '' }}</h4>
       				<h4>2){{ isset($videos[2]->title) ? $videos[2]->title : '' }}</h4>
       				<!-- <h4>3)<?php try{ echo $videos[0]->title;}catch(Exception $e){echo "";}?></h4> -->
       			</div>
   				<button id="delete-playlist-{{$result->id}}" value="{{$result->id}}" class="btn pull-right">X</button>
   			</a></div>
   			@else
   			<div id="list-item-{{$result->id}}" class="list-item col-sm-10 col-sm-offset-1">
   				<img src='{{$image}}' class="img-responsive col-lg-3"/>
   				<div class="col-sm-8">
   					<h3>{{$result->name}}</h3>
   					<h4>Noch nichts vorhanden</h4>
   				</div>
   				<button id="delete-playlist-{{$result->id}}" value="{{$result->id}}" class="btn pull-right">X</button>
   			</div> 
   			@endif
       		@endforeach
   			 

@stop