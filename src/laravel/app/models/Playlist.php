<?php

class Playlist extends Eloquent {

	protected $fillable = array('name');
	protected $table = 'playlists';

	//protected $table = 'stations';

	public function broadcasts() {
		return $this->hasMany('Broadcast');
	}
}