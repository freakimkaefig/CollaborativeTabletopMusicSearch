@extends('layout.main')

@section('content')
	<!-- START streaming/video -->
	@if(isset($video))
		<?php $inBookmarks = DB::table('broadcasts')->whereNotNull("user_id")->where("user_id","=",Auth::id())->get();
			 //echo "<input id='all-bookmarks' type='hidden' value='".json_encode($inBookmarks)."''>";
			echo "<div id='all-bookmarks' style='display:none'>".json_encode($inBookmarks)."</div>";
			?>
		<div class="row">
			<div id="video-wrapper" class=" img-responsivecol-xs-12 col-sm-8 col-sm-offset-0 col-lg-7 col-lg-offset-1">
				<video id="video" class="video-js vjs-default-skin" controls preload="auto" data-setup='{"nativeControlsForTouch": false}'></video>
			</div>
			<div id="info-wrapper" class="col-sm-4">
			@if(Auth::check())
				<div class="row">	
					<div class="col-xs-12 col-sm-12">
						<button id="choosePlaylist" class="btn col-xs-4 col-sm-6 col-md-4 col-lg-3 broadcast-btn btn-transparent"><span class="glyphicon glyphicon-list pull-left"></span>Playlisten</button>
						<form class="col-sm-3 col-lg-3">
									<?php
								 		$user_playlists= DB::table('playlists')->where('user', '=', Auth::id())->get();
								 	?>
							<div id="selectPlaylist" class="select-box hidden">			
								@if(sizeOf($user_playlists))
								<select id="select">
								 	@foreach($user_playlists as $pl)
								 		<option value="{{$pl->id}}">{{$pl->name}}</option>
								 	@endforeach
								</select>
								<button id="add-to-playlist" class="btn btn-transparent">Hinzufügen</button>
								<button id="add-to-playlist-cancel" class="btn btn-transparent" type="button" >Abbrechen</button>
								@else
								<p>Es sind noch keine Playlisten vorhanden</p>
								<button id="add-to-playlist-cancel" class="btn btn-transparent" type="button" >Abbrechen</button>
								@endif
							</div>
						</form>
						<h4 class="feedback col-sm-6 " hidden>hinzugefügt!</h4>
					</div>
					<div class="col-xs-12 col-sm-12">	
						<form >
							<button id="addToBookmarks" type="button" class="btn col-xs-4 col-sm-6 col-md-4 col-lg-3  broadcast-btn btn-transparent" value="{{Auth::id()}}"><span class="glyphicon glyphicon-bookmark pull-left"></span>Merken</button>
							<button id="bookmark-name" class="btn col-xs-4 col-sm-6 col-md-4 col-lg-3 broadcast-btn btn-transparent hidden"><span class="glyphicon glyphicon-bookmark pull-left"></span></button>
						</form>
					</div>
					<!-- <div class="col-sm-12">	
						<form >
							<button id="addToFavorites" class="btn col-xs-12 col-sm-6 col-lg-3 btn-transparent broadcast-btn" value="{{Auth::id()}}"><span class="glyphicon glyphicon-star pull-left"></span>Favorisieren</button>
							<button id="favorit-name" class="btn col-xs-12 col-sm-6 col-lg-3 broadcast-btn btn-transparent hidden"><span class="glyphicon glyphicon-bookmark pull-left"></span></button>
						</form>
					</div> -->
				</div>
			@endif
		</div>
	</div>
		<div class="row">
			<div id="description-wrapper" class="col-sm-10 col-sm-offset-1">
				<h3>Beschreibung:</h3>
			</div>
		</div>
				<input id="video-id" type="hidden" value="{{ $video }}">
				@if(isset($bookmarked))
					<input id="bookmark" type="hidden" value='{{$bookmarked}}'>
				@endif
	@else
		{{ Redirect::route('home')->with('global-warning', 'Es ist ein Fehler aufgetreten. Versuchen Sie es später erneut.') }}
	@endif
	<!-- END streaming/video -->
@stop