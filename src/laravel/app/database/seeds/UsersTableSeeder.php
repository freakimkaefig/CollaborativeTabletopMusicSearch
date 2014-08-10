<?php

class UsersTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('users')->truncate();
        
		\DB::table('users')->insert(array (
			0 => 
			array (
				'id' => 1,
				'email' => 'mueller-felix@web.de',
				'password' => '$2y$10$fb6K/1kYeJ6kEl2huWbCFu1EV.v87NZS4quph4ggzXpCtBNUM6xAa',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '2014-08-10 15:05:43',
				'updated_at' => '2014-08-10 15:06:23',
			),
		));
	}

}
