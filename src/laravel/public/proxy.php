<?php

	$options  = array(
		'http' => array(
			'user_agent' => 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
			'header' => 'Connection: keep-alive\r\nAccept: */*',
			)
		);
	$context  = stream_context_create($options);
	$response = file_get_contents(urldecode($_GET['url']), false, $context);
	echo $response;



	// $myFile = "logs/requestslog.txt";
	// $fh = fopen($myFile, 'a') or die("can't open file");
	// fwrite($fh, "\n\n--------------------------------------
	// 	-------------------------\n");
	// foreach($_SERVER as $h=>$v)
	// 	if(ereg('HTTP_(.+)',$h,$hp))
	// 		fwrite($fh, "$h = $v\n");
	// fwrite($fh, "\r\n");
	// fwrite($fh, file_get_contents('php://input'));
	// fclose($fh);
	// echo "<html><head /><body><iframe src=\"$myFile\" style=\"height:100%; width:100%;\"></iframe></body></html>"

?>