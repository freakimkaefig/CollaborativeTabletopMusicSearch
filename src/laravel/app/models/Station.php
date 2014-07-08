<?php

class Station extends Eloquent {

	protected $fillable = array('name', 'logo');
	//protected $table = 'stations';

	public function broadcasts() {
		return $this->hasMany('Broadcast');
	}
}