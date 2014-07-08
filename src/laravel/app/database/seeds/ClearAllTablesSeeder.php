<?php

class ClearAllTablesSeeder extends Seeder {
	
	public function run() {
		DB::table('users')->truncate();
		DB::table('stations')->truncate();
		DB::table('broadcasts')->truncate();
	}
}