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
				'password' => '$2y$10$mqPyCc5WHSVASePou5scfebvtZnFqsPPhQIYjYly3dlp5B01jNxi2',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '2014-06-26 11:59:23',
				'updated_at' => '2014-06-26 11:59:23',
			),
			1 => 
			array (
				'id' => 2,
				'email' => 'lukas.lamm89@hotmail.com',
				'password' => '$2y$10$ZHMqHSfydnTFY8alZXxeSuORmI8FvjT1OJgdyAlEu.F.FnQF0hxUS',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '2014-06-26 12:05:51',
				'updated_at' => '2014-06-26 12:08:19',
			),
			2 => 
			array (
				'id' => 3,
				'email' => 'lukas.lamm@stud.uni-regensburg.de',
				'password' => '$2y$10$LJWrb/OGTKy6blZ67XgWru5BT2thpOQLzpuNm71v4nZMQlE32P74m',
				'password_temp' => '',
				'code' => 'FpoGtAxtnXfb5qItvK7foS1HnWgrtqe40SVkEjnSUa1McHYSp21cF9mmAa67',
				'active' => 0,
				'remember_token' => '',
				'created_at' => '2014-06-26 14:26:27',
				'updated_at' => '2014-06-26 14:26:27',
			),
		));
	}

}
