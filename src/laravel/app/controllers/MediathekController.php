<?php
class MediathekController extends BaseController {
	public function postSearch() {

		return Redirect::route('search.results');
	}
}