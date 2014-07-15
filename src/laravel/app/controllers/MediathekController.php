<?php
class MediathekController extends BaseController {
	public function postSearch() {

		// Get search input
		$searchQuery = Input::all();
		$searchString = $searchQuery['search'];

		return Redirect::route('search-results')
			->withInput();
	}

	public function updateCategories() {
		$dasErste = new DasErsteController();
		$dasErste->updateCategories();
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