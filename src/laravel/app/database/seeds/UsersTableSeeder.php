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
				'email' => 'test',
				'password' => '$2y$10$1F6zZz8fg6gwXTgHP8i4cePHkCncfhfTCd.NmYO3n8nePsn8nf6fa',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '2014-07-08 12:56:04',
				'updated_at' => '2014-07-08 12:56:04',
			),
			1 => 
			array (
				'id' => 2,
				'email' => 'semmel-tobi@gmx.de',
				'password' => '$2y$10$xgxBlGlXy5jKKVhczQYKe.0tlEP9w2Ou8fHRTtsvO6ZUp6UG5cuNW',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => 'X29XjHK3AWupXMi7TU0ZGBztxH29jnjJ38ebAVxghr8CYGW4TshnIk9zY6uN',
				'created_at' => '2014-07-22 10:20:43',
				'updated_at' => '2014-07-22 11:16:57',
			),
		));
	}

}
