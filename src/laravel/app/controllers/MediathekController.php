<?php
class MediathekController extends BaseController {
	public function postSearch() {

		// Get search input
		$searchQuery = Input::all();
		$searchString = $searchQuery['search'];

		return Redirect::route('search-results')
			->withInput();
	}

	public function getSearchResults() {
		return View::make('search.search')
			->with('isSearch', TRUE);
	}

	public function getSearchResultsMobile() {
		return View::make('search.search_mobile');
	}

	public function getCategory($category) {
		// validate category
		return View::make('search.categories')
			->with('category', $category);
	}

	public function getVideoById($id) {
		return View::make('streaming.video')
			->with('video', $id);		
	}
	public function getNewVideos() {
		return View::make('search.new');

	}
	public function getHotVideos() {
		return View::make('search.hot');

	}
	public function getChannel($channel){
		return View::make('search.channel')
			->with('channel',$channel);
	}

	public function getChannelsOverview() {
		return View::make('channels_overview');
	}

	public function getCategoriesOverview() {
		return View::make('categories_overview');
	}

	public function getContact() {
		return View::make('contact');
	}

	public function postContact() {
		// handles post request for contact form

		// validating fields
		$validator = Validator::make(Input::all(),
			array(
				'name' 			=> 'required',
				'email'			=> 'required|email',
				'text' 			=> 'required'
			)
		);
		
		if($validator->fails()) {
			// redirect to sign-in-page and show errors
			return Redirect::route('contact')
				->withErrors($validator)
				->withInput();
		} else {
			$name	= Input::get('name');
			$email 	= Input::get('email');
			$text 	= Input::get('text');
			
			Mail::send('emails.contact', array('name' => $name, 'email' => $email, 'text' => $text), function($message) use ($name, $email, $text) {
				$message->to('lukas.lamm89@hotmail.com')->subject('Mediathek-Crawler: Kontaktanfrage');
			});
				
			// redirect to contact page and show message
			return Redirect::route('contact')
				->with('global-success', 'Deine Kontaktanfrage wurde versendet');
		}
	}

	public function getData() {
		return View::make('data');
	}

	public function getImprint() {
		return View::make('imprint');
	}
}
