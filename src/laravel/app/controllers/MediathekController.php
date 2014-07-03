<?php
class MediathekController extends BaseController {
	public function postSearch() {

		return Redirect::route('search.results');
	}
	

	public function getSearch() {

		return View::make('search.results');
	}
}