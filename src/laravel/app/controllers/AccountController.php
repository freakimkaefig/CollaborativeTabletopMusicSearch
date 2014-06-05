<?php
class AccountController extends BaseController {
	public function login() {

		Mail::send('emails.auth.test', array('name' => 'Name'), function($message) {
			$message->to('lukas.lamm89@hotmail.com', 'Lukas Lamm')->subject('Test Mail');
		});

		return View::make('login');
	}
}