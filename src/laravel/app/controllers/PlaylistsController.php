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
			$Broadcast->subtitle=$data['subtitle'];
			$Broadcast->station=$data['station'];
			$Broadcast->playlist_id=$playlistId;
			$Broadcast->airtime=$data['airtime'];
			$Broadcast->url=json_encode($data['url']);
			$Broadcast->duration=$data['duration'];
			$Broadcast->image=json_encode($data['image']);
			$Broadcast->details=$data['details'];
			$Broadcast->save();
		}
	}
	public function getPlaylistByIds($playlistId, $broadcastId) {
		return View::make('lists.playlist-single')
			->with('playlistVideo', $broadcastId)		
			->with('playlist', $playlistId);
	}
	public function deleteVideoFromPlaylist($broadcastId){
		Broadcast::where('id',"=", $broadcastId)->delete();
	}
	public function deletePlaylist($playlistId){
		Broadcast::where('playlist_id',"=", $playlistId)->delete();
		Playlist::where("id","=",$playlistId)->delete();
	}

}