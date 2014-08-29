@extends('layout.main')

@section('content')
	<!-- START streaming/video -->
	@if(isset($video))
		<div class="row">
		<?php $inBookmarks = DB::table('broadcasts')->whereNotNull("user_id")->where("user_id","=",Auth::id())->get();
			echo "<div id='all-bookmarks' style='display:none'>".json_encode($inBookmarks)."</div>";
			?>
			<div id="video-wrapper" class="img-responsive col-sm-8 col-sm-offset-0 col-lg-7 col-lg-offset-1">
				<video id="video" class="video-js vjs-default-skin" controls preload="auto" data-setup='{"nativeControlsForTouch": false}'></video>
			</div>
			<div id="info-wrapper" class="col-sm-4">
			@if(Auth::check())
				<div  class="row">	
					<div class="col-xs-12 col-sm-12">
						<button id="choosePlaylist" class="btn col-xs-4 col-sm-6 col-md-4 col-lg-3 broadcast-btn btn-transparent"><span class="glyphicon glyphicon-list pull-left"></span>Playlisten</button>
						<div id="playlistForm">
									<?php
								 		$user_playlists= DB::table('playlists')->where('user', '=', Auth::id())->get();
								 	?>
						<form  class="col-sm-6 col-lg-3">
							<div id="selectPlaylist" class="select-box hidden">			
								@if(sizeOf($user_playlists))
								<select id="select">
								 	@foreach($user_playlists as $pl)
								 		<option value="{{$pl->id}}">{{$pl->name}}</option>
								 	@endforeach
								</select>
								<button id="add-to-playlist" class="col-xs-12 btn btn-transparent"><span class="glyphicon glyphicon-plus-sign pull-left"></span>Hinzufügen</button>
								<p> Neue Playlist erstellen: </p>
								<form id="create-playlist" class="select-box col-sm-6 hidden" action="{{-- URL::route('new-playlist-broadcast') --}}" method="post">
									<input type="text" name="playlistName"  placeholder="Name" />
								
									<button id="button-create-playlist-broadcast" class="col-xs-12 btn btn-transparent" type="button"><span class="glyphicon glyphicon-file pull-left"></span>Erstellen</button>
								</form>
								<button id="add-to-playlist-cancel" class="col-xs-12 btn btn-transparent" type="button" ><span class="glyphicon glyphicon-remove pull-left"></span>Abbrechen</button>
								@else
								<p>Du musst zunächst eine Playliste erstellen:</p>
								<form id="create-playlist" class="select-box col-sm-6 hidden" action="{{-- URL::route('new-playlist-broadcast') --}}" method="post">
									<input type="text" name="playlistName"  placeholder="Name" />
									<button id="button-create-playlist-broadcast" class="col-xs-12 btn btn-transparent" type="button"><span class="glyphicon glyphicon-file pull-left"></span>Erstellen</button>
								</form>	
								<input value="{{ DB::table('playlists')->max('id') + 1 }}" hidden />
								<button id="add-to-playlist-cancel" class="col-xs-12 btn btn-transparent" type="button" ><span class="glyphicon glyphicon-remove pull-left"></span>Abbrechen</button>
								@endif
							</div>
						</form>
						</div>
						<h4 class="feedback col-sm-6 " hidden>hinzugefügt!</h4>
					</div>
					<div class="col-xs-12 col-sm-12">	
						<form >
							<button id="addToBookmarks" type="button" class="btn col-xs-4 col-sm-6 col-md-4 col-lg-3  broadcast-btn btn-transparent" value="{{Auth::id()}}"><span class="glyphicon glyphicon-bookmark pull-left"></span>Merken</button>
							<button id="bookmark-name" class="btn col-xs-4 col-sm-6 col-md-4 col-lg-3 broadcast-btn btn-transparent hidden"><span class="glyphicon glyphicon-bookmark pull-left"></span></button>
						</form>
					</div>
				</div>
			@endif
		</div>
	</div>
		<div class="row">
			<div id="description-wrapper" class="col-sm-10 col-sm-offset-1">
				<h3>Beschreibung:</h3>
			</div>
		</div>
		<div class="spacer"></div>
				<input id="video-id" type="hidden" value="{{ $video }}">
				@if(isset($bookmarked))
					<input id="bookmark" type="hidden" value='{{$bookmarked}}'>
				@endif
	@else
		{{ Redirect::route('home')->with('global-warning', 'Es ist ein Fehler aufgetreten. Versuche es später erneut.') }}
	@endif
	<!-- END streaming/video -->
@stop