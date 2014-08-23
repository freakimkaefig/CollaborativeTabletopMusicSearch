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
				'id' => 5,
				'name' => '',
				'created_at' => '2014-08-23 11:31:10',
				'updated_at' => '2014-08-23 11:31:10',
				'user' => 1,
			),
		));
	}

}
