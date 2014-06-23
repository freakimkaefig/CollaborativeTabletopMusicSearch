<?php

class Playlist extends Eloquent {

	protected $fillable = array('name');
	//protected $table = 'stations';

	public function broadcasts() {
		return $this->hasMany('Broadcast');
	}
}