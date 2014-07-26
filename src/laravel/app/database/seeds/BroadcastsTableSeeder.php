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
			3 => 
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
		));
	}

}
