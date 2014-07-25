@extends('layout.main')

@section('content')
	<!-- START streaming/video -->
	@if(isset($video))
		<div class="row">
			<div id="video-wrapper" class=" col-xs-12 col-sm-8 col-sm-offset-0 col-lg-7 col-lg-offset-1">
				<video id="video" class="video-js vjs-default-skin img-responsive" controls preload="auto"></video>
			</div>
			<div id="info-wrapper" class="col-sm-4"></div>
			@if(Auth::check())
				<div class="row">	
					<div class="col-sm-4">		
						<button id="choosePlaylist" class="btn col-sm-3 col-lg-3">Playliste</button>
						<form class="col-sm-3 col-lg-3">
							<div id="selectPlaylist" class="hidden">			
								<select id="select">
								 	<?php
								 		$user_playlists= DB::table('playlists')->where('user', '=', Auth::id())->get();
								 	?>
								 	@foreach($user_playlists as $pl)
								 		<option value="{{$pl->id}}">{{$pl->name}}</option>
								 	@endforeach
								</select>
								<button id="add-to-playlist" class="btn">Hinzufügen</button>
								<button id="add-to-playlist-cancel" class="btn" type="button">Abbrechen</button>
							</div>
						</form>
					</div>
					<div class="col-sm-4">	
						<form >
							<button id="addToBookmarks" class="btn col-sm-3" value="{{Auth::id()}}">Merken</button>
						</form>
					</div>
				</div>
			@endif
		</div>
		<div class="row">
			<div id="description-wrapper" class="col-sm-10 col-sm-offset-1"></div>
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