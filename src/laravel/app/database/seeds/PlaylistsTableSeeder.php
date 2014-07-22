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
				'id' => 1,
				'name' => 'Test',
				'created_at' => '2014-07-21 09:57:59',
				'updated_at' => '2014-07-21 09:57:59',
				'user' => NULL,
			),
			1 => 
			array (
				'id' => 2,
				'name' => 'hallo',
				'created_at' => '2014-07-21 10:02:16',
				'updated_at' => '2014-07-21 10:02:16',
				'user' => NULL,
			),
			2 => 
			array (
				'id' => 3,
				'name' => 'hmm',
				'created_at' => '2014-07-21 18:37:59',
				'updated_at' => '2014-07-21 18:37:59',
				'user' => NULL,
			),
			3 => 
			array (
				'id' => 4,
				'name' => 'Neu',
				'created_at' => '2014-07-21 18:38:32',
				'updated_at' => '2014-07-21 18:38:32',
				'user' => 1,
			),
			4 => 
			array (
				'id' => 7,
				'name' => 'TestPlaylist',
				'created_at' => '2014-07-21 19:02:48',
				'updated_at' => '2014-07-21 19:02:48',
				'user' => 1,
			),
		));
	}

}
