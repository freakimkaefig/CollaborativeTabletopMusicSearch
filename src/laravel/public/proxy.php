<?php

if (isset($_GET['ua'])) {
	$options  = array('http' => array('user_agent' => 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36'));
	$context  = stream_context_create($options);
	$response = file_get_contents('http://domain/path/to/uri', false, $context);
	echo file_get_contents(urldecode($_GET['url']), false, $context);
} else {
	echo file_get_contents(urldecode($_GET['url']));
}

?>