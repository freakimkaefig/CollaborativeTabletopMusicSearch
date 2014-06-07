<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', array(
	'as' => 'home',
	'uses' => 'HomeController@renderPage'
));

/*
 * Authenticated group
 */
Route::group(array('before' => 'auth'), function() {
	
	//Sign out (GET)
	Route::get('/account/sign-out', array(
		'as' => 'account-sign-out',
		'uses' => 'AccountController@getSignOut'
	));
});

/*
 * Unauthenticated group
 */
Route::group(array('before' => 'guest'), function() {

	//CSRF protection group
	Route::group(array('before' => 'csrf'), function() {
		//Sign in (POST)
		Route::post('/account/sign-in', array(
			'as' => 'account-sign-in-post',
			'uses' => 'AccountController@postSignIn'
		));
		
		//Create account (POST)
		Route::post('/account/create', array(
			'as' => 'account-create-post',
		 	'uses' => 'AccountController@postCreate'
		));
	});
	
	//Sign in (GET)
	Route::get('/account/sign-in', array(
		'as' => 'account-sign-in',
		'uses' => 'AccountController@getSignIn'
	));
	
	//Create account (GET)
	Route::get('/account/create', array(
		'as' => 'account-create',
	 	'uses' => 'AccountController@getCreate'
	));

	Route::get('/account/activate/{code}', array(
		'as' => 'account-activate',
		'uses' => 'AccountController@getActivate'
	));

});
