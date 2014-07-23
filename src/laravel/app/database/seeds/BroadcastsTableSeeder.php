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
				'title' => 'Test Broadcast',
				'airtime' => '2014-07-23 04:37:00',
				'url' => 'http://mediathek-crawler',
				'duration' => '12:00:00',
				'image' => 'http://mediathek-crawler',
				'created_at' => '0000-00-00 00:00:00',
				'updated_at' => '0000-00-00 00:00:00',
				'station_id' => 1,
				'playlist_id' => NULL,
				'user_id' => NULL,
			),
			1 => 
			array (
				'id' => 2,
				'title' => 'Imperium - Der Kriegsruf der Indianer',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/11\\/07\\/110721_imperiumindianer_okrijkd_tex_h.mp4","_filesize":"198927334"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/11\\/07\\/110721_imperiumindianer_okrijkd_tex_vh.mp4","_filesize":"540696511"}]',
				'duration' => '00:00:43',
				'image' => '[{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg75x52blob\\/4871393"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg476x268blob\\/7034696"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg298x168blob\\/7034697"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg404x227blob\\/7034702"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg276x155blob\\/10032647"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg644x363blob\\/10032656"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg476x176blob\\/4871388"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg144x81blob\\/7034701"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg485x273blob\\/10032646"},{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg94x65blob\\/10032644"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg72x54blob\\/10032650"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg173x120blob\\/4871385"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg236x133blob\\/10032655"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg116x88blob\\/4871394"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg116x54blob\\/4871390"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1404952\\/timg672x378blob\\/10032657"},{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/330\\/timg946x532blob\\/8597142"}]',
				'created_at' => '2014-07-23 21:09:05',
				'updated_at' => '2014-07-23 21:09:05',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			2 => 
			array (
				'id' => 3,
				'title' => 'Satelliten-Spotter',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_436k_p9v11.mp4","_filesize":"158089245"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_436k_p9v11.mp4","_filesize":"158089245"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_189k_p7v11.mp4","_filesize":"73158163"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_1456k_p13v11.mp4","_filesize":"508493965"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_1456k_p13v11.mp4","_filesize":"508493965"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_776k_p17v11.webm","_filesize":"177121022"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_282k_p16v11.webm","_filesize":"66491175"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140225_spotter_inf_1496k_p18v11.webm","_filesize":"276460709"}]',
				'duration' => '00:00:44',
				'image' => '[{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg75x52blob\\/10041779"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg476x268blob\\/10041780"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg298x168blob\\/10041781"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg404x227blob\\/10041786"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg276x155blob\\/10041774"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg644x363blob\\/10041783"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg476x176blob\\/10041778"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg144x81blob\\/10041785"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg485x273blob\\/10041773"},{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg94x65blob\\/10041771"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg72x54blob\\/10041777"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg173x120blob\\/10041772"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg236x133blob\\/10041782"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg116x88blob\\/10041776"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg116x54blob\\/10041775"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg672x378blob\\/10041784"},{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2098824\\/timg946x532blob\\/10041787"}]',
				'created_at' => '2014-07-23 21:47:30',
				'updated_at' => '2014-07-23 21:47:30',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
		));
	}

}
