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
				'email' => 'mueller-felix@web.de',
				'password' => '$2y$10$Ni327zD6r6DWW45AehYBk.iWZyKHFUTu52lwQbt0ndZ8N1bX2YSeK',
				'password_temp' => '',
				'code' => '',
				'active' => 1,
				'remember_token' => 'eBKPXuUPKtfpnsfKOAv7KQmwtwyKuCUxGnYbO1e8SycTttwwvyrFgPYCZfvx',
				'created_at' => '2014-07-15 15:42:58',
				'updated_at' => '2014-07-20 18:29:49',
			),
		));
	}

}
