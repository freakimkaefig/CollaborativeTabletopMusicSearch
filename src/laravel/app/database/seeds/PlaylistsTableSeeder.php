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
				'id' => 8,
				'name' => 'Fussballer',
				'created_at' => '2014-08-24 10:01:39',
				'updated_at' => '2014-08-24 10:01:39',
				'user' => 2,
			),
		));
	}

}
