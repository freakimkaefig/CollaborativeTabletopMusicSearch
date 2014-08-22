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
				'remember_token' => 'BMUIyqutR1mfm0NmgGMGqDhn6PBUnEtSKL1dcH99vVfxcFe2NYrtu0k6adDg',
				'created_at' => '2014-07-08 12:56:04',
				'updated_at' => '2014-08-21 09:11:11',
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
				'email' => 'mueller-felix@web.de',
				'password' => '$2y$10$5E60rYZul07WsXboDCZu4.8yVtFIyEIC04FnXuAKnoMSBaPFCr.7e',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => '',
				'created_at' => '2014-08-21 09:12:07',
				'updated_at' => '2014-08-21 09:12:49',
			),
		));
	}

}
