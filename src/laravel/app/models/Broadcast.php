<?php

class Broadcast extends Eloquent {

	protected $fillable = array('title', 'datetime', 'url', 'duration', 'image');
	//protected $table = 'stations';

	public function station() {
		return $this->belongsTo('Broadcast');
	}

	public function playlist() {
		return $this->belongsTo('Playlist');
	}

	public function user() {
		return $this->belongsTo('User');
	}
}