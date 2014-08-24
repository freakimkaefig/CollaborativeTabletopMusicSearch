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
				'remember_token' => '5oJZIavLGHrUFYL4VaYqaLysw1sn9AVbJavsJjXyUJIuMtUSc0N8pY469x0c',
				'created_at' => '2014-07-08 12:56:04',
				'updated_at' => '2014-08-24 14:03:32',
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
				'password' => '$2y$10$2GYmruP/EUX/HcbeISrZVef4dwVG5ArZ4.BzuxcSH6a/wpenvtb32',
				'password_temp' => '',
				'code' => 'RSerCGoBjOlqu29ycds2nkrxYvEIiNosxi75hhycPcKrU98rEp6C98ksP0st',
				'active' => 0,
				'remember_token' => '',
				'created_at' => '2014-08-24 14:04:22',
				'updated_at' => '2014-08-24 14:04:22',
			),
		));
	}

}
