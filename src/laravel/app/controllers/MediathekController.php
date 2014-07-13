<?php
class MediathekController extends BaseController {
	public function postSearch() {

		// Get search input
		$searchQuery = Input::all();
		$searchString = $searchQuery['search'];

		// $results = array();

		// Initialize ARD Controller
		// $ardController = new ARDController();
		// Start search in ARD
		// $ardResults = $ardController->startSearch($searchString);

		// $results['ard'] = $ardResults;

		return Redirect::route('search-results')
			->withInput();
			// ->with('results', $results)
	}


	public function getSearch() {

		return View::make('search.results');
	}

	public function getVideo($id) {
		return View::make('search.video')
			->with('video-id', $id);
	}
}