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
				'name' => '',
				'created_at' => '2014-07-29 12:05:09',
				'updated_at' => '2014-07-29 12:05:09',
				'user' => 2,
			),
		));
	}

}
