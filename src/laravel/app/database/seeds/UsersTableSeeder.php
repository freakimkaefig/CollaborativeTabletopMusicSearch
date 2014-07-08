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
				'password' => '$2y$10$7RSzVI1rrnhhg5p2hpccPeWH3Kw/zS4a6G/lMXT5G2RrQMAg2owGu',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '2014-07-08 12:32:23',
				'updated_at' => '2014-07-08 12:32:23',
			),
		));
	}

}
