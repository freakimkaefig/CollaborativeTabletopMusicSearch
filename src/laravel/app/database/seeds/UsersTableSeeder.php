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
				'remember_token' => 'EusZWs9xnIiQ1XEnQXLJGO2CSckdaaZylHkrUWPkZodsENSgp3ZM3WMReCwK',
				'created_at' => '2014-07-08 12:56:04',
				'updated_at' => '2014-08-18 09:08:22',
			),
			1 => 
			array (
				'id' => 2,
				'email' => 'semmel-tobi@gmx.de',
				'password' => '$2y$10$xgxBlGlXy5jKKVhczQYKe.0tlEP9w2Ou8fHRTtsvO6ZUp6UG5cuNW',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => 'pQ3HpNPmwzuku6HG5flWEDTxuQ3dWnKhTlXUAuuMSlDlWmbpAP8b6UsYCGZA',
				'created_at' => '2014-07-22 10:20:43',
				'updated_at' => '2014-08-12 14:10:50',
			),
			2 => 
			array (
				'id' => 3,
				'email' => 'lukas.lamm89@hotmail.com',
				'password' => '$2y$10$vzfHrAxHxH2B3/DbGlsbL.myV8jN0ws2XcLln9EGkNR4bzNbsVhA2',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '2014-08-18 09:09:09',
				'updated_at' => '2014-08-18 09:09:40',
			),
		));
	}

}
