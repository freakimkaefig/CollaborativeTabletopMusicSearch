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
				'id' => 5,
				'title' => 'tagesschau, 12:00 Uhr',
				'airtime' => '2024-07-20 14:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webl.h264.mp4","_filesize":""}]',
				'duration' => '15:02:00',
				'image' => '[{"_resolution":"960x540","_url":"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/22\\/55\\/11\\/78\\/2028247919\\/16x9\\/960"}]',
				'created_at' => '2014-07-25 09:14:54',
				'updated_at' => '2014-07-25 09:14:54',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			2 => 
			array (
				'id' => 6,
				'title' => 'Rennen und Religion',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_436k_p9v11.mp4","_filesize":"16510445"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_436k_p9v11.mp4","_filesize":"16510445"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_189k_p7v11.mp4","_filesize":"7610876"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1456k_p13v11.mp4","_filesize":"53087073"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1456k_p13v11.mp4","_filesize":"53087073"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_776k_p17v11.webm","_filesize":"18344144"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_282k_p16v11.webm","_filesize":"6886241"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1496k_p18v11.webm","_filesize":"34859725"}]',
				'duration' => '00:04:35',
				'image' => '[{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg94x65blob\\/9241534"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg173x120blob\\/9241522"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg485x273blob\\/9241521"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg276x155blob\\/9241531"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg116x54blob\\/9241528"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg116x88blob\\/9241533"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg72x54blob\\/9241536"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg476x176blob\\/9241525"},{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg75x52blob\\/9241532"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg476x268blob\\/9241523"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg298x168blob\\/9241524"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg236x133blob\\/9241535"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg144x81blob\\/9241530"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg644x363blob\\/9241527"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg672x378blob\\/9241526"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg404x227blob\\/9241529"}]',
				'created_at' => '2014-07-25 09:30:21',
				'updated_at' => '2014-07-25 09:30:21',
				'station_id' => 1,
				'playlist_id' => 3,
				'user_id' => NULL,
			),
			3 => 
			array (
				'id' => 7,
				'title' => 'Mehmet Scholl - "Das ist nicht mehr mein Sport"',
				'airtime' => '2005-07-20 14:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/f4m","_quality":"auto","_url":"http:\\/\\/adaptiv.wdr.de\\/z\\/medstdp\\/de\\/fsk0\\/46\\/468100\\/,468100_4832880,468100_4832881,468100_4832883,.mp4.csmil\\/manifest.f4m","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832882.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"mp4:CMS2010\\/mdb\\/ondemand\\/de\\/fsk0\\/46\\/468100\\/468100_4832881.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"mp4:CMS2010\\/mdb\\/ondemand\\/de\\/fsk0\\/46\\/468100\\/468100_4832880.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832882.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832881.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832883.mp4","_filesize":""}]',
				'duration' => '00:38:00',
				'image' => '[{"_resolution":"960x540","_url":"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/22\\/22\\/67\\/24\\/861531312\\/16x9\\/960"}]',
				'created_at' => '2014-07-25 09:34:14',
				'updated_at' => '2014-07-25 09:34:14',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			4 => 
			array (
				'id' => 41,
				'title' => 'Tagesschau',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-0908-3101.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-0908-3101.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-0908-3101.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-0908-3101.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-0908-3101.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-0908-3101.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-0908-3101.webl.h264.mp4","_filesize":""}]',
				'duration' => '03:29:00',
				'image' => '[{"_resolution":"128x72","_url":"http:\\/\\/mediathek.daserste.de\\/daserste\\/servlet\\/scaled\\/22\\/54\\/76\\/40\\/22547640-bild-xs16x9"},{"_resolution":"960x540","_url":"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/22\\/54\\/76\\/42\\/2028247919\\/16x9\\/960"}]',
				'created_at' => '2014-07-26 10:34:02',
				'updated_at' => '2014-07-26 10:34:02',
				'station_id' => 1,
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			5 => 
			array (
				'id' => 42,
				'title' => 'Tatort',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_390000\\/392270\\/format487430.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4?sen=Tatort&amp;clip=Mit+Schwung+ins+neue+Jahr+-+ein+Solo+f%C3%BCr+Dietmar+B%C3%A4r&amp;for=Web-M","_quality":"1","_url":"mp4:videoportal\\/mediathek\\/Tatort\\/c_390000\\/392270\\/format487429.mp4?sen=Tatort&amp;clip=Mit+Schwung+ins+neue+Jahr+-+ein+Solo+f%C3%BCr+Dietmar+B%C3%A4r&amp;for=Web-M","_filesize":""},{"_basetype":"","_type":"video\\/mp4?sen=Tatort&amp;clip=Mit+Schwung+ins+neue+Jahr+-+ein+Solo+f%C3%BCr+Dietmar+B%C3%A4r&amp;for=Web-L","_quality":"2","_url":"mp4:videoportal\\/mediathek\\/Tatort\\/c_390000\\/392270\\/format487428.mp4?sen=Tatort&amp;clip=Mit+Schwung+ins+neue+Jahr+-+ein+Solo+f%C3%BCr+Dietmar+B%C3%A4r&amp;for=Web-L","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_390000\\/392270\\/format487430.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_390000\\/392270\\/format487429.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_390000\\/392270\\/format487426.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_390000\\/392270\\/format487428.mp4","_filesize":""}]',
				'duration' => '00:45:00',
				'image' => '[{"_resolution":"128x72","_url":"http:\\/\\/mediathek.daserste.de\\/daserste\\/servlet\\/contentblob\\/19210824\\/bild\\/2245592"},{"_resolution":"960x540","_url":"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/19\\/21\\/08\\/18\\/-1958817668\\/16x9\\/960"}]',
				'created_at' => '2014-07-26 11:08:53',
				'updated_at' => '2014-07-26 11:08:53',
				'station_id' => 1,
				'playlist_id' => 1,
				'user_id' => NULL,
			),
		));
	}

}
