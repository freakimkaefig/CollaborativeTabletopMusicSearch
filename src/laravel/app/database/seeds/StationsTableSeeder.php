<?php

class StationsTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('stations')->truncate();
        
		\DB::table('stations')->insert(array (
			0 => 
			array (
				'id' => 1,
				'name' => 'Das Erste',
				'logo' => 'http://www.daserste.de/mediasrc/img/tv/banner/daserste_logo_white.png',
				'created_at' => '2014-06-30 11:36:02',
				'updated_at' => '2014-06-30 11:36:02',
			),
			1 => 
			array (
				'id' => 2,
				'name' => 'ZDF',
				'logo' => 'http://www.zdf.de/ZDF/zdfportal/blob/24559496/6/data.jpg',
				'created_at' => '2014-06-30 11:36:02',
				'updated_at' => '2014-06-30 11:36:02',
			),
		));
	}

}