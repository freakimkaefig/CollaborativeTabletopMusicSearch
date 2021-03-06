<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::statement('SET FOREIGN_KEY_CHECKS=0;');

		Eloquent::unguard();

		$this->call('ClearAllTablesSeeder');
		$this->call('UsersTableSeeder');
		$this->call('PlaylistsTableSeeder');
		$this->call('BroadcastsTableSeeder');

		DB::statement('SET FOREIGN_KEY_CHECKS=1;');
	}

}
