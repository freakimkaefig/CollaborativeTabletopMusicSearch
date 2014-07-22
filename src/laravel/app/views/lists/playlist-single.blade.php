@extends('layout.main')

@section('content')
	<?php 
		$results_playlist = DB::table('playlists')->where('id', '=', $playlist)->get();
		$results_videos = DB::table('broadcasts')->where('playlist_id','=',$playlist)->get();
		Log::info($results_videos);
		Log::info($playlistVideo);

  	?>
  	<div class="col-sm-8 col-sm-offset-2">
  		
    <video id="playlist-palyer" class="video-js vjs-default-skin img-responsive col-sm-12" controls preload="auto">
   	<?php $urls = DB::table('broadcasts')->select('url')->where('id',"=", $playlistVideo)->get(); 
   			Log::info($urls);
   		
   			//$obj = json_decode($urls,TRUE);
			//print_r(obj);	
   		foreach ($urls as $url ) { 
   			print_r($url);
   			//Log::info($url);
   			foreach ($url as $u) {
   				$obj = json_decode($u);
   					foreach ($obj as $o) {
   						echo "<source src='$o->_url' type='$o->_type'>";
   					}
   			}
   		
   		}
   	?>
   	</video>
  	</div>

  	<div class="row">

  		
	@foreach($results_playlist as $result)
    	<div class="col-sm-12">{{$result->name}}</div>
    @endforeach
    @foreach($results_videos as $result)
    	<div class="col-sm-12"><a href="{{URL::route('playlist-single',[$playlist,$result->id])}}">{{$result->title}}</a></div>
    @endforeach
  	</div>


@stop