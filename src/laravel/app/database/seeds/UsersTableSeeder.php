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
				'remember_token' => 'Wcc0PWcI2RYZhbBRYxpLnH2e6rc0VJ59cQ1JVdzfYm4ccNHutO5ZKBKRFVKR',
				'created_at' => '2014-07-08 12:56:04',
				'updated_at' => '2014-08-26 15:09:04',
			),
			1 => 
			array (
				'id' => 2,
				'email' => 'semmel-tobi@gmx.de',
				'password' => '$2y$10$xgxBlGlXy5jKKVhczQYKe.0tlEP9w2Ou8fHRTtsvO6ZUp6UG5cuNW',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => 'viLSHnslYYMN9LNSPrtSrxP3CwiLcALk9U9HNsyY8YIP6q5h8lANrFxZsS0K',
				'created_at' => '2014-07-22 10:20:43',
				'updated_at' => '2014-08-24 10:16:43',
			),
		));
	}

}
