<?php
class AccountController extends BaseController {
	public function loginRenderView() {		
		return View::make('login');
	}
	
	public function getSignIn() {
		return View::make('account.signin');
	}
	
	public function postSignIn() {
		$validator = Validator::make(Input::all(),
			array(
				'email' 	=> 'required|email',
				'password' 	=> 'required'
			)
		);
		
		if($validator->fails()) {
			return Redirect::route('account-sign-in')
				->withErrors($validator)
				->withInput();
		} else {
			
			$remember = (Input::has('remember')) ? true : false;
			
			$auth = Auth::attempt(array(
				'email' 	=> Input::get('email'),
				'password' 	=> Input::get('password'),
				'active' 	=> 1
			), $remember);
			
			if($auth) {
				//Redirect to the intended page
				return Redirect::route('account-my-account');
			} else {
				return Redirect::route('account-sign-in')
					->with('global-warning', 'Bei der Anmeldung ist ein Problem aufgetreten. Falsche Email-Adresse/Passwort oder das Konto ist nicht aktiviert.');
			}
		}
		
		return Redirect::route('account-sign-in')
			->with('global-danger', 'Bei der Anmeldung ist ein Problem aufgetreten.');
	}
	
	public function getSignOut() {
		Auth::logout();
		return Redirect::route('home');
	}
	
	public function getCreate() {
		return View::make('account.signin');
	}
	
	public function postCreate() {
		$validator = Validator::make(Input::all(),
			array(
				'email' 			=> 'required|max:50|email|unique:users',
				'password'			=> 'required|min:6',
				'password_again' 	=> 'required|same:password'
			)
		);
		
		if($validator->fails()) {
			return Redirect::route('account-sign-in')
				->withErrors($validator)
				->withInput();
		} else {
			$email 		= Input::get('email');
			$password 	= Input::get('password');
			
			// Activation code
			$code		= str_random(60);
			
			$user 		= User::create(array(
				'email' 	=> $email,
				'password' 	=> Hash::make($password),
				'code' 		=> $code,
				'active' 	=> 0
			));
			
			if($user) {
				
				Mail::send('emails.auth.activate', array('link' => URL::route('account-activate', $code), 'debug' => TRUE), function($message) use ($user) {
					$message->to($user->email)->subject('Mediathek-Crawler: Konto aktivieren');
				});
				
				return Redirect::route('account-sign-in')
					->with('global-success', 'Dein Konto wurde angelegt, bitte bestätige zunächst deine Email-Adresse.');
			}
		}
	}
	
	public function getActivate($code) {
		$user = User::where('code', '=', $code)->where('active', '=', 0);
		
		if($user->count()) {
			$user 			= $user->first();
			
			// Update user to active state
			$user->active 	= 1;
			$user->code 	= '';
			
			if($user->save()) {
				return Redirect::route('account-my-account')
					->with('global-success', 'Dein Konto wurde aktiviert. Du kannst dich jetzt einloggen');
			}
		}
		
		return Redirect::route('account-sign-in')
			->with('global-warning', 'Bei der Aktivierung ist ein Fehler aufgetreten. Versuch es später noch einmal.');
	}

	public function getChangePassword() {
		return View::make('account.password');
	}

	public function postChangePassword() {
		$validator = Validator::make(Input::all(),
			array(
				'old_password' 		=> 'required',
				'password' 			=> 'required|min:6',
				'password_again' 	=> 'required|same:password'
			)
		);

		if($validator->fails()) {
			// redirect
			return Redirect::route('account-change-password')
				->withErrors($validator);
		} else {
			// change password
			$user = User::find(Auth::user()->id);

			$old_password 	= Input::get('old_password');
			$password 		= Input::get('password');

			if(Hash::check($old_password, $user->getAuthPassword())) {
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

		return Redirect::route('account-change-password')
			->with('global-danger', 'Wir konnten dein Passwort nicht ändern.');
	}

	public function getForgotPassword() {
		return View::make('account.forgot');
	}

	public function postForgotPassword() {
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
		$user = User::where('code', '=', $code)
			->where('password_temp', '!=', '');

		if($user->count()) {
			$user = $user->first();

			$user->password 		= $user->password_temp;
			$user->password_temp 	= '';
			$user->code 			= '';

			if($user->save()) {
				return Redirect::route('account-sign-in')
					->with('global-success', 'Dein Konto wurde zurückgesetzt.');
			}
		}

		return Redirect::route('home')
			->with('global-danger', 'Wir konnten dein Konto nicht zurücksetzen.');
	}

	public function getMyAccount() {
		return View::make('account.myaccount');
	}
}