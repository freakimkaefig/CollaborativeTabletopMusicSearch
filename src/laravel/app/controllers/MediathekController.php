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


	public function getSearchResults() {
		return View::make('search.search')
			->with('isSearch', TRUE);
	}

	public function getCategory($category) {
		// return Redirect::route('category-list')
		// 	->with('category', $category);
		return View::make('search.categories')
			->with('category', $category);
	}

	public function getVideoById($id) {
		return View::make('streaming.video')
			->with('video', $id);		
	}
}