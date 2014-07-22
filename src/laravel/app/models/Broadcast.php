<?php

class Broadcast extends Eloquent {

	protected $fillable = array('title', 'airtime', 'url', 'duration', 'image', 'playlist_id', 'station_id','user_id');
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