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
				'remember_token' => 'Otm5MrxVD7V6mr9cAK3JgU4IAN2SA0wTB7LcqM37LImtrOyacYzv4Nd2Qylm',
				'created_at' => '2014-07-08 12:56:04',
				'updated_at' => '2014-08-18 13:03:39',
			),
			1 => 
			array (
				'id' => 2,
				'email' => 'semmel-tobi@gmx.de',
				'password' => '$2y$10$xgxBlGlXy5jKKVhczQYKe.0tlEP9w2Ou8fHRTtsvO6ZUp6UG5cuNW',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => 'WHSYwvVZRxC4a5eNyQpLUYhaxq0jdmzwLso5k1ssMPqm9gbqg8WcbidS4y7b',
				'created_at' => '2014-07-22 10:20:43',
				'updated_at' => '2014-08-22 10:31:31',
			),
		));
	}

}
