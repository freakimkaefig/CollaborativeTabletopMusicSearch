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
				'email' => 'required|email',
				'password' => 'required'
			)
		);
		
		if($validator->fails()) {
			return Redirect::route('account-sign-in')
				->withErrors($validator)
				->withInput();
		} else {
			
			$remember = (Input::has('remember')) ? true : false;
			
			$auth = Auth::attempt(array(
				'email' => Input::get('email'),
				'password' => Input::get('password'),
				'active' => 1
			), $remember);
			
			if($auth) {
				//Redirect to the intended page
				return Redirect::intended('/');
			} else {
				return Redirect::route('account-sign-in')
					->with('global', 'Bei der Anmeldung ist ein Problem aufgetreten. Falsche Email-Adresse/Passwort oder das Konto ist nicht aktiviert.');
			}
		}
		
		return Redirect::route('account-sign-in')
			->with('global', 'Bei der Anmeldung ist ein Problem aufgetreten.');
	}
	
	public function getSignOut() {
		Auth::logout();
		return Redirect::route('home');
	}
	
	public function getCreate() {
		return View::make('account.create');
	}
	
	public function postCreate() {
		$validator = Validator::make(Input::all(),
			array(
				'email' 		 => 'required|max:50|email|unique:users',
				'password' 		 => 'required|min:6',
				'password_again' => 'required|same:password'
			)
		);
		
		if($validator->fails()) {
			return Redirect::route('account-create')
				->withErrors($validator)
				->withInput();
		} else {
			$email 	  = Input::get('email');
			$password = Input::get('password');
			
			// Activation code
			$code 	  = str_random(60);
			
			$user	= User::create(array(
				'email' => $email,
				'password' => Hash::make($password),
				'code' => $code,
				'active' => 0
			));
			
			if($user) {
				
				Mail::send('emails.auth.activate', array('link' => URL::route('account-activate', $code), 'debug' => TRUE), function($message) use ($user) {
					$message->to($user->email)->subject('Mediathek-Crawler: Konto aktivieren');
				});
				
				return Redirect::route('home')
					->with('global', 'Dein Konto wurde angelegt, bitte bestätige zunächst deine Email-Adresse.');
			}
		}
	}
	
	public function getActivate($code) {
		$user = User::where('code', '=', $code)->where('active', '=', 0);
		
		if($user->count()) {
			$user = $user->first();
			
			// Update user to active state
			$user->active = 1;
			$user->code = '';
			
			if($user->save()) {
				return Redirect::route('home')
					->with('global', 'Konto aktiviert.');
			}
		}
		
		return Redirect::route('home')
			->with('global', 'Bei der Aktivierung ist ein Fehler aufgetreten. Versuch es später noch einmal.');
	}
}