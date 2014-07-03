<?php
class MediathekController extends BaseController {
	public function postSearch() {

		// Get search input
		$searchQuery = Input::all();
		$searchString = $searchQuery['search'];

		$results = array();

		// Initialize ARD Controller
		$ardController = new ARDController();
		// Start search in ARD
		$ardResults = $ardController->startSearch($searchString);

		$results['ard'] = $ardResults;

		return Redirect::route('search-results')
			->with('results', $results)
			->withInput();
	}


	public function getSearch() {

		return View::make('search.results');
	}
}