<?php
class AccountController extends BaseController {	
	public function getSignIn() {
		// handles get request for sign-in page ('/account/sign-in')
		return View::make('account.signin');
	}
	
	public function postSignIn() {
		// handles post request to sign-in-form

		// validating fields
		$validator = Validator::make(Input::all(),
			array(
				'email' 	=> 'required|email',
				'password' 	=> 'required'
			)
		);
		
		if($validator->fails()) {
			// redirect to sign-in-page and show errors
			return Redirect::route('account-sign-in')
				->withErrors($validator)
				->withInput();
		} else {
			// try loggin in
			$remember = (Input::has('remember')) ? true : false;
			
			$auth = Auth::attempt(array(
				'email' 	=> Input::get('email'),
				'password' 	=> Input::get('password'),
				'active' 	=> 1
			), $remember);
			
			if($auth) {
				// login is successful
				// Redirect to the intended page
				return Redirect::route('account-my-account');
			} else {
				// login failed
				return Redirect::route('account-sign-in')
					->with('global-warning', 'Bei der Anmeldung ist ein Problem aufgetreten. Falsche Email-Adresse/Passwort oder das Konto ist nicht aktiviert.');
			}
		}
		
		// fallback
		return Redirect::route('account-sign-in')
			->with('global-danger', 'Bei der Anmeldung ist ein Problem aufgetreten.');
	}
	
	public function getSignOut() {
		// handles get request for sign-out ('/account/sign-out')
		Auth::logout();
		return Redirect::route('home');
	}
	
	public function getCreate() {
		// handles get request for create-account page ('/account/create')
		return View::make('account.signin');
	}
	
	public function postCreate() {
		// handles post request for account-create form

		// validating fields
		$validator = Validator::make(Input::all(),
			array(
				'email' 			=> 'required|max:50|email|unique:users',
				'password'			=> 'required|min:6',
				'password_again' 	=> 'required|same:password'
			)
		);
		
		if($validator->fails()) {
			// redirect to sign-in-page and show errors
			return Redirect::route('account-sign-in')
				->withErrors($validator)
				->withInput();
		} else {
			$email 		= Input::get('email');
			$password 	= Input::get('password');
			
			// generate Activation code
			$code		= str_random(60);
			
			// create user in database
			$user 		= User::create(array(
				'email' 	=> $email,
				'password' 	=> Hash::make($password),
				'code' 		=> $code,
				'active' 	=> 0
			));
			
			if($user) {
				// user created successfully

				// send registration mail
				Mail::send('emails.auth.activate', array('link' => URL::route('account-activate', $code), 'debug' => TRUE), function($message) use ($user) {
					$message->to($user->email)->subject('Mediathek-Crawler: Konto aktivieren');
				});
				
				// redirect to sign-in-page and show message
				return Redirect::route('account-sign-in')
					->with('global-success', 'Dein Konto wurde angelegt, bitte bestätige zunächst deine Email-Adresse.');
			}
		}
	}
	
	public function getActivate($code) {
		// handles account activation ('/account/activate/{code}')

		// search user in database
		$user = User::where('code', '=', $code)->where('active', '=', 0);
		
		if($user->count()) {
			$user 			= $user->first();
			
			// Update user to active state
			$user->active 	= 1;
			$user->code 	= '';
			
			if($user->save()) {
				// activate user account
				return Redirect::route('account-my-account')
					->with('global-success', 'Dein Konto wurde aktiviert. Du kannst dich jetzt einloggen');
			}
		}
		
		return Redirect::route('account-sign-in')
			->with('global-warning', 'Bei der Aktivierung ist ein Fehler aufgetreten. Versuch es später noch einmal.');
	}

	public function getChangePassword() {
		// handles get request for changing password ('/account/change-password')
		return View::make('account.password');
	}

	public function postChangePassword() {
		// handle post request for changing password

		// validate fields
		$validator = Validator::make(Input::all(),
			array(
				'old_password' 		=> 'required',
				'password' 			=> 'required|min:6',
				'password_again' 	=> 'required|same:password'
			)
		);

		if($validator->fails()) {
			// redirect to change-password page and show errors
			return Redirect::route('account-change-password')
				->withErrors($validator);
		} else {
			// change password
			$user = User::find(Auth::user()->id);

			$old_password 	= Input::get('old_password');
			$password 		= Input::get('password');

			// check if current password is correct
			if(Hash::check($old_password, $user->getAuthPassword())) {
				// change password
				$user->password = Hash::make($password);

				if($user->save()) {
					return Redirect::route('account-my-account')
						->with('global-success', "Dein Passwort wurde geändert.");
				}
			} else {
				return Redirect::route('account-change-password')
					->with('global-warning', 'Dein aktuelles Passwort ist nicht korrekt.');
			}
		}

		// fallback
		return Redirect::route('account-change-password')
			->with('global-danger', 'Wir konnten dein Passwort nicht ändern.');
	}

	public function getForgotPassword() {
		// handle get request for forgot-password page ('/account/forgot-password')
		return View::make('account.forgot');
	}

	public function postForgotPassword() {
		// handle post request for forgot-password form

		// validate field
		$validator = Validator::make(Input::all(),
			array(
				'email' => 'required|email'
			)
		);

		if($validator->fails()) {
			return Redirect::route('account-forgot-password')
				->withErrors($validator)
				->withInput();
		} else {
			// change password
			$user = User::where('email', '=', Input::get('email'));

			if($user->count()) {
				$user 					= $user->first();

				// Generate a new code and password
				$code 					= str_random(60);
				$password 				= str_random(10);

				$user->code 			= $code;
				$user->password_temp 	= Hash::make($password);

				if($user->save()) {
					// send email with new password and activation link
					Mail::send('emails.auth.forgot', array('link' => URL::route('account-recover', $code), 'email' => $user->email, 'password' => $password), function($message) use ($user) {
						$message->to($user->email, $user->email)->subject('Dein neues Passwort');
					});

					return Redirect::route('account-sign-in')
						->with('global-success', 'Wir haben dir eine Email mit einem neuen Passwort geschickt.');
				}
			}
		}

		return Redirect::route('account-forgot-password')
			->with('global-danger', 'Fehler beim Zurücksetzen des Passworts');
	}

	public function getRecover($code) {
		// handle request for password-recover ('/account/recover/{code}')
		$user = User::where('code', '=', $code)
			->where('password_temp', '!=', '');

		if($user->count()) {
			$user = $user->first();

			// save new password & clear temporary fields
			$user->password 		= $user->password_temp;
			$user->password_temp 	= '';
			$user->code 			= '';

			if($user->save()) {
				return Redirect::route('account-sign-in')
					->with('global-success', 'Dein Konto wurde zurückgesetzt.');
			}
		}

		// fallback
		return Redirect::route('home')
			->with('global-danger', 'Wir konnten dein Konto nicht zurücksetzen.');
	}

	public function getMyAccount() {
		// handle get request for my-account page ('/account/my-account')
		return View::make('account.myaccount');
	}
}