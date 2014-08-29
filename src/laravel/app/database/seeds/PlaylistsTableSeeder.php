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
				'name' => 'Blanfsdf',
				'created_at' => '2014-08-18 14:35:38',
				'updated_at' => '2014-08-18 14:35:38',
				'user' => 1,
			),
			1 => 
			array (
				'id' => 4,
				'name' => 'kjsdfkjhsadöfhösadhfkjashdflkjhasdkjfhasödjfhölasdfasdfasdfasdfasdfasdf',
				'created_at' => '2014-08-18 15:07:58',
				'updated_at' => '2014-08-18 15:07:58',
				'user' => 1,
			),
			2 => 
			array (
				'id' => 6,
				'name' => 'Meine supergeile Playlist',
				'created_at' => '2014-08-22 15:06:54',
				'updated_at' => '2014-08-22 15:06:54',
				'user' => 2,
			),
			3 => 
			array (
				'id' => 25,
				'name' => 'test',
				'created_at' => '2014-08-24 17:30:41',
				'updated_at' => '2014-08-24 17:30:41',
				'user' => 4,
			),
			4 => 
			array (
				'id' => 26,
				'name' => '123',
				'created_at' => '2014-08-24 17:33:55',
				'updated_at' => '2014-08-24 17:33:55',
				'user' => 4,
			),
		));
	}

}
