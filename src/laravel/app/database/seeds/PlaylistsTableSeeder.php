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
				'name' => 'TestPlaylist',
				'created_at' => '2014-07-23 21:06:13',
				'updated_at' => '2014-07-23 21:06:13',
				'user' => 1,
			),
			1 => 
			array (
				'id' => 3,
				'name' => 'NochEinePlaylist',
				'created_at' => '2014-07-25 09:29:55',
				'updated_at' => '2014-07-25 09:29:55',
				'user' => 1,
			),
		));
	}

}
