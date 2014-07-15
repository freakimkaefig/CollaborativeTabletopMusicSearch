<?php
class MediathekController extends BaseController {
	public function postSearch() {

		// Get search input
		$searchQuery = Input::all();
		$searchString = $searchQuery['search'];

		// echo '<script>localstorage.removeItem("searchOptions"); localstorage.setItem("searchOptions", JSON.stringify({ "searchString": ' . $searchString . '}));</script>';

		return Redirect::route('search-results')
			->withInput();
	}


	public function getSearch() {
		return View::make('search.search');
	}

	public function getVideoById($id) {
		Debugbar::info($id);
		return Redirect::route('video')
			->with('video-id', $id);		
	}

	public function getVideo() {
		return View::make('streaming.video');
	}
}