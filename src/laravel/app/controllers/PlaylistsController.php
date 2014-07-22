<?php
class PlaylistsController extends BaseController {

	public function getAllPlaylists() {
		// handle get request for my-account page ('/account/my-account')
		return View::make('lists.playlists');
	}
	public function savePlaylist(){
		
		$input = Input::all();
		$name = $input['playlistName'];

		$Playlist = new Playlist;
		$Playlist->name=$name;
		$Playlist->user=Auth::id();
		
		$Playlist->save();
		return Redirect::route('playlists');
	}
	public function addVideoToPlaylist($playlistId, $broadcastId){
		
		$data = Request::all();
		if (Request::ajax()) {
			$Broadcast = new Broadcast;
			//$Broadcast->playlist_id=$playlistId;
			$Broadcast->title=$data['title'];
			$Broadcast->station_id=1;
			$Broadcast->playlist_id=1;
			$Broadcast->airtime=$data['airtime'];
			$Broadcast->url=json_encode($data['url']);
			$Broadcast->duration=$data['duration'];
			Log::info($data['airtime']);
			$Broadcast->save();
		}
	}
	public function getPlaylistByIds($playlistId, $broadcastId) {
		return View::make('lists.playlist-single')
			->with('playlistVideo', $broadcastId)		
			->with('playlist', $playlistId);
	}

}