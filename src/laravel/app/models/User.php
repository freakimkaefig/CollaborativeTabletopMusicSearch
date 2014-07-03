<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;
	
	protected $fillable = array('email', 'password', 'password_temp', 'code', 'active');
	protected $table = 'users';
	protected $hidden = array('password', 'remember_token');

	public function playlists() {
		return $this->hasMany('Playlist');
	}

	public function bookmarks() {
		return $this->hasMany('Broadcast');
	}
}
