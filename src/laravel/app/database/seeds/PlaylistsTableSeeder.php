<?php

class PlaylistsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('playlists')->truncate();
        
		\DB::table('playlists')->insert(array (
			0 => 
			array (
				'id' => 6,
				'name' => 'Meine supergeile Playlist',
				'created_at' => '2014-08-22 15:06:54',
				'updated_at' => '2014-08-22 15:06:54',
				'user' => 2,
			),
			1 => 
			array (
				'id' => 25,
				'name' => 'test',
				'created_at' => '2014-08-24 17:30:41',
				'updated_at' => '2014-08-24 17:30:41',
				'user' => 4,
			),
			2 => 
			array (
				'id' => 26,
				'name' => '123',
				'created_at' => '2014-08-24 17:33:55',
				'updated_at' => '2014-08-24 17:33:55',
				'user' => 4,
			),
			3 => 
			array (
				'id' => 62,
				'name' => 'freg',
				'created_at' => '2014-08-26 12:08:22',
				'updated_at' => '2014-08-26 12:08:22',
				'user' => 1,
			),
			4 => 
			array (
				'id' => 63,
				'name' => '213',
				'created_at' => '2014-08-26 12:10:27',
				'updated_at' => '2014-08-26 12:10:27',
				'user' => 1,
			),
			5 => 
			array (
				'id' => 64,
				'name' => '543',
				'created_at' => '2014-08-26 12:10:32',
				'updated_at' => '2014-08-26 12:10:32',
				'user' => 1,
			),
			6 => 
			array (
				'id' => 65,
				'name' => 'dffdgfd',
				'created_at' => '2014-08-26 12:11:40',
				'updated_at' => '2014-08-26 12:11:40',
				'user' => 1,
			),
			7 => 
			array (
				'id' => 66,
				'name' => 'gh',
				'created_at' => '2014-08-26 12:12:23',
				'updated_at' => '2014-08-26 12:12:23',
				'user' => 1,
			),
		));
	}

}
