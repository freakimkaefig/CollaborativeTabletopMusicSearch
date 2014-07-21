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
		));
	}

}
