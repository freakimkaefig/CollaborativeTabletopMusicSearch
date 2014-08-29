<?php

class Broadcast extends Eloquent {

	protected $fillable = array('title', 'subtitle', 'details', 'airtime', 'url', 'duration', 'image', 'playlist_id', 'station','user_id');
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