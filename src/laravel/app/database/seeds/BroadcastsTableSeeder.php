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
				'id' => 13,
				'title' => 'Metal Evolution: Glam Metal',
				'airtime' => '14.07.2014 22:55',
				'url' => 'http://www.metafilegenerator.de/ondemand/zdf/hbbtv/none/zdf/13/06/130624_metalevolution6_kuk_536k_p9v9.mp4',
				'duration' => '00:00:00',
				'image' => '',
				'created_at' => '2014-07-21 18:53:07',
				'updated_at' => '2014-07-21 18:53:07',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			1 => 
			array (
				'id' => 14,
				'title' => 'Wo der Pfeffer wächst - Safran & Vanille',
				'airtime' => '26.07.2014 17:15',
				'url' => 'http://www.metafilegenerator.de/ondemand/zdf/hbbtv/none/zdf/12/06/120628_pfeffer_safranvanille_neo_h.mp4',
				'duration' => '00:00:44',
				'image' => '',
				'created_at' => '2014-07-21 18:54:39',
				'updated_at' => '2014-07-21 18:54:39',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			2 => 
			array (
				'id' => 15,
				'title' => 'Wo der Pfeffer wächst - Safran & Vanille',
				'airtime' => '26.07.2014 17:15',
				'url' => 'http://www.metafilegenerator.de/ondemand/zdf/hbbtv/none/zdf/12/06/120628_pfeffer_safranvanille_neo_h.mp4',
				'duration' => '00:00:44',
				'image' => '',
				'created_at' => '2014-07-21 18:54:39',
				'updated_at' => '2014-07-21 18:54:39',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			3 => 
			array (
				'id' => 16,
				'title' => 'Elefant, Tiger & Co.',
				'airtime' => '21.07.2014 11:35',
				'url' => 'http://mvideos.daserste.de/videoportal/Film/c_440000/445979/format542409.mp4',
				'duration' => '24:35:00',
				'image' => '',
				'created_at' => '2014-07-22 07:17:21',
				'updated_at' => '2014-07-22 07:17:21',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			4 => 
			array (
				'id' => 23,
				'title' => 'Kulturpalast in ZDFkultur am 17.07.2014',
				'airtime' => '17.07.2014 21:05',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/www.metafilegenerator.de\\/ondemand\\/zdf\\/hbbtv\\/none\\/zdf\\/14\\/07\\/140712_sendung1_pal_928k_p34v11.mp4","_filesize":"198599724"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140712_sendung1_pal_436k_p9v11.mp4","_filesize":"100876171"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140712_sendung1_pal_436k_p9v11.mp4","_filesize":"100876171"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140712_sendung1_pal_189k_p7v11.mp4","_filesize":"46747329"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/www.metafilegenerator.de\\/ondemand\\/zdf\\/hbbtv\\/none\\/zdf\\/14\\/07\\/140712_sendung1_pal_2328k_p35v11.mp4","_filesize":"495976418"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140712_sendung1_pal_1456k_p13v11.mp4","_filesize":"324528458"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140712_sendung1_pal_1456k_p13v11.mp4","_filesize":"324528458"}]',
				'duration' => '00:00:28',
				'image' => '',
				'created_at' => '2014-07-22 07:27:59',
				'updated_at' => '2014-07-22 07:27:59',
				'station_id' => 1,
				'playlist_id' => 7,
				'user_id' => NULL,
			),
			5 => 
			array (
				'id' => 24,
				'title' => 'Mankells Wallander',
				'airtime' => '20.07.2014 21:45',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/mvideos-geo.daserste.de\\/videoportal\\/Film\\/c_440000\\/444786\\/format541189.mp4","_filesize":""},{"_basetype":"","_type":"video\\/+ab+20+Uhr%29&amp;for=Web-M","_quality":"1","_url":"mp4:videoportal\\/mediathek\\/Mankells Wallander\\/c_440000\\/444786\\/geode_format541188.mp4?sen=Mankells+Wallander&amp;amp;for=Web-M&amp;amp;clip=Dunkle+Geheimnisse+%28Video+tgl.+ab+20+Uhr%29&amp;for=Web-M","_filesize":""},{"_basetype":"","_type":"video\\/+ab+20+Uhr%29&amp;for=Web-L","_quality":"2","_url":"mp4:videoportal\\/mediathek\\/Mankells Wallander\\/c_440000\\/444786\\/geode_format541274.mp4?sen=Mankells+Wallander&amp;amp;for=Web-L&amp;amp;clip=Dunkle+Geheimnisse+%28Video+tgl.+ab+20+Uhr%29&amp;for=Web-L","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/mvideos-geo.daserste.de\\/videoportal\\/Film\\/c_440000\\/444786\\/format541189.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/mvideos-geo.daserste.de\\/videoportal\\/Film\\/c_440000\\/444786\\/format541188.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/mvideos-geo.daserste.de\\/videoportal\\/Film\\/c_440000\\/444786\\/format541275.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/mvideos-geo.daserste.de\\/videoportal\\/Film\\/c_440000\\/444786\\/format541274.mp4","_filesize":""}]',
				'duration' => '87:39:00',
				'image' => '',
				'created_at' => '2014-07-22 08:47:16',
				'updated_at' => '2014-07-22 08:47:16',
				'station_id' => 1,
				'playlist_id' => 7,
				'user_id' => NULL,
			),
		));
	}

}
