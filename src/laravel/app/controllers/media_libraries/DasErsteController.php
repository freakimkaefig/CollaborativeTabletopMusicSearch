<?php

include(app_path() . '/includes/simple_html_dom.php');

class DasErsteController extends BaseController {

	public function updateCategories() {
		print('Hello');

		$url = 'http://mediathek.daserste.de/themen';
		$html = file_get_html($url);

			// print_r($html);
		foreach($html->find('div.boxLink') as $categoryUrl) {

			print_r($categoryUrl->href);
		}
	}
}