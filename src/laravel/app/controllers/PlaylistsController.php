<?php
class PlaylistsController extends BaseController {

	public function getAllPlaylists() {
		// handle get request for my-account page ('/account/my-account')
		return View::make('lists.playlists');
	}
	public function savePlaylist(){
		
		$name = Input::all();
		$nameString = $name['playlistName'];
		$Playlist = new Playlist;
		$Playlist->name=$nameString;
		$Playlist->save();
		return Redirect::route('playlists');
	}

}