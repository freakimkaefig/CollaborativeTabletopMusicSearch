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
				'password' => '$2y$10$1vXm3wYZqxFAQtZyBqKnneZdrOYJCIhbPX4DlA.pKDzHeprptXH.K',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => 'MKawe9FpHdzocOFkic7z8ardsCafVL6VmFWEaDFlUettNDqUsFFjUFIWLMqQ',
				'created_at' => '2014-06-30 11:36:02',
				'updated_at' => '2014-07-10 11:27:55',
			),
		));
	}

}
