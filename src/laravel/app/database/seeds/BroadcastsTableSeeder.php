<?php

class BroadcastsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('broadcasts')->truncate();
        
		\DB::table('broadcasts')->insert(array (
			0 => 
			array (
				'id' => 1,
				'title' => 'Tatort',
				'datetime' => '0000-00-00 00:00:00',
				'url' => 'http://www.daserste.de',
				'duration' => '00:00:00',
				'image' => '',
				'created_at' => '2014-07-08 12:32:23',
				'updated_at' => '2014-07-08 12:32:23',
				'station_id' => 1,
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			1 => 
			array (
				'id' => 2,
				'title' => 'Heute Journal',
				'datetime' => '0000-00-00 00:00:00',
				'url' => 'http://www.zdf.de',
				'duration' => '00:00:00',
				'image' => '',
				'created_at' => '2014-07-08 12:32:23',
				'updated_at' => '2014-07-08 12:32:23',
				'station_id' => 2,
				'playlist_id' => NULL,
				'user_id' => 1,
			),
		));
	}

}
