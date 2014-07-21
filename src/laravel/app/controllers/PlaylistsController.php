<?php
class PlaylistsController extends BaseController {

	public function getAllPlaylists() {
		// handle get request for my-account page ('/account/my-account')
		return View::make('lists.playlists');
	}

}