<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('Clear');

		$this->call('UserTableSeeder');
		$this->call('StationTableSeeder');
		$this->call('BroadcastTableSeeder');
	}

}

class UserTableSeeder extends Seeder {

	public function run() {
		User::create(array(
			'email' => 'test',
			'password' => Hash::make('test'),
			'active' => 1
		));
	}
}

class StationTableSeeder extends Seeder {

	public function run() {
		Station::create(array(
			'name' => 'Das Erste',
			'logo' => 'http://www.daserste.de/mediasrc/img/tv/banner/daserste_logo_white.png'
		));
		Station::create(array(
			'name' => 'ZDF',
			'logo' => 'http://www.zdf.de/ZDF/zdfportal/blob/24559496/6/data.jpg'
		));
	}
}

class BroadcastTableSeeder extends Seeder {

	public function run() {
		$tatort = new Broadcast(array(
			'title' => 'Tatort',
			'datetime' => '',
			'url' => 'http://www.daserste.de',
			'duration' => '',
			'image' => ''
		));
		$tatort->station()->associate(Station::where('name', '=', 'Das Erste')->first());
		$tatort->user()->associate(User::where('email', '=', 'test')->first());
		$tatort->save();

		$heuteJournal = new Broadcast(array(
			'title' => 'Heute Journal',
			'datetime' => '',
			'url' => 'http://www.zdf.de',
			'duration' => '',
			'image' => ''
		));
		$heuteJournal->station()->associate(Station::where('name', '=', 'ZDF')->first());
		$heuteJournal->user()->associate(User::where('email', '=', 'test')->first());
		$heuteJournal->save();
	}
}

class Clear extends Seeder {
	
	public function run() {
		DB::statement('SET FOREIGN_KEY_CHECKS=0;');

		DB::table('users')->truncate();
		DB::table('stations')->truncate();
		DB::table('broadcasts')->truncate();

		DB::statement('SET FOREIGN_KEY_CHECKS=1;');
	}
}