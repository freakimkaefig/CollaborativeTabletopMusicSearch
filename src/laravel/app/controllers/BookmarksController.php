<?php
class BookmarksController extends BaseController {

	public function getAllBookmarks() {
		// handle get request for my-account page ('/account/my-account')
		return View::make('lists.bookmarks');
	}
	public function addBookmark($userId){
		
		$data = Request::all();
		if (Request::ajax()) {
			$Broadcast = new Broadcast;
			//$Broadcast->playlist_id=$playlistId;
			$Broadcast->title=$data['title'];
			$Broadcast->station_id=1;
			$Broadcast->user_id=$userId;
			$Broadcast->airtime=$data['airtime'];
			$Broadcast->url=json_encode($data['url']);
			$Broadcast->duration=$data['duration'];
			$Broadcast->image=json_encode($data['image']);
			$Broadcast->save();
		}
	}
	public function getBookmarkVideo($broadcastId) {
		$bookmarked = Broadcast::where("id","=",$broadcastId)->get();
		Response::json($bookmarked);
		return View::make('streaming.video')
			->with("bookmarked", $bookmarked)
			->with("video", $broadcastId);
	}
	public function deleteBookmark($broadcastId){
		Broadcast::where('id',"=", $broadcastId)->delete();
	}


}