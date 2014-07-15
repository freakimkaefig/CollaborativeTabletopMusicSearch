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
				'password' => '$2y$10$51tgc/vFZNLxBWPkgZ6XWe/RAR7Kij173f1LbnGY32NHN7FCqVpY.',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '0000-00-00 00:00:00',
				'updated_at' => '0000-00-00 00:00:00',
			),
		));
	}

}
