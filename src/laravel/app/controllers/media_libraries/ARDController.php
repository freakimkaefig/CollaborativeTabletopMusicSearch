<?php

include(app_path() . '/includes/simple_html_dom.php');

class ARDController extends BaseController {

	// Constants
	const BASE_URL_SEARCH = 'http://www.ardmediathek.de/tv/suche?searchText=';
	const BASE_URL_FILE = 'http://www.ardmediathek.de/play/media/';
	const PARAM_URL_FILE = '?deviceType=pc&features=flash';

	const ELEMENT_CLASS = 'teaser';
	const VIDEO_CLASS = 'mediaA';
	const LINK_CLASS = 'mediaLink';
	// const ELEMENT_XPATH = "//*/div[@class='media']";

	public function test() {
		
	}

	public function startSearch($searchString) {

		$url = self::BASE_URL_SEARCH . $searchString;
		// Debugbar::info('Search_URL: ' . $url);
		$html = file_get_html($url);

		$results = array();

		$counter = 0;

		foreach($html->find('div.'.self::ELEMENT_CLASS) as $div) {

			if ($counter == 2) break;
			$link_url = $div->find('div.'.self::VIDEO_CLASS, 0);

			if ($link_url != NULL) {
				$link_title = $div->find('h4.headline', 0);
    			$link_subtitle = $div->find('p.subtitle', 0);
    			$link_teasertext = $div->find('teasertext', 0);

    			$link_url = $div->find('a.'.self::LINK_CLASS, 0);
	    		$link_url = $link_url->href;
	    		$link_url = parse_url($link_url, PHP_URL_QUERY);
	    		parse_str($link_url, $broadcast_id);
	    		if (isset($broadcast_id['documentId'])) {
	    			$broadcast_id = $broadcast_id['documentId'];
	    			$broadcast_url = self::BASE_URL_FILE . $broadcast_id . self::PARAM_URL_FILE;
	    			// Debugbar::info($broadcast_url);
	    			$broadcast_json = file_get_contents($broadcast_url);
	    			$broadcast_json = json_decode($broadcast_json, TRUE);
	    			foreach ($broadcast_json['_mediaArray'] as $media) {
	    				if ($media['_plugin'] == 1) {
	    					foreach ($media['_mediaStreamArray'] as $mediaStream) {
	    						if($mediaStream['_quality'] == 3) {
	    							$video_url = $mediaStream['_stream'];
	    							// Debugbar::info($video_url);
	    							$results[] = array(
	    								'title' => $link_title,
	    								// 'airtime' => $link_airtime,
	    								'url' => $video_url,
	    								// 'duration' => $link_duration,
	    								'image' => ''
	    							);
	    						}
	    					}
	    				}
	    			}
	    		}
			}
			$counter .= 1;
		}
		return $results;
	}

}