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
				'title' => '7 Tage... unter Juden',
				'airtime' => '2013-04-20 14:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/f4m","_quality":"auto","_url":"http:\\/\\/hds.ndr.de\\/z\\/ndr\\/2014\\/0412\\/TV-20140412-1040-3942.,hq,hi,.mp4.csmil\\/manifest.f4m","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.ndr.de\\/progressive\\/2014\\/0412\\/TV-20140412-1040-3942.lo.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"mp4:ndr\\/2014\\/0412\\/TV-20140412-1040-3942.hi.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"mp4:ndr\\/2014\\/0412\\/TV-20140412-1040-3942.hq.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.ndr.de\\/progressive\\/2014\\/0412\\/TV-20140412-1040-3942.lo.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.ndr.de\\/progressive\\/2014\\/0412\\/TV-20140412-1040-3942.hi.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/media.ndr.de\\/progressive\\/2014\\/0412\\/TV-20140412-1040-3942.hq.mp4","_filesize":""}]',
				'duration' => '29:02:00',
				'image' => '[{"_resolution":"960x540","_url":"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/20\\/76\\/54\\/38\\/-219271675\\/16x9\\/960"}]',
				'created_at' => '2014-07-24 16:22:06',
				'updated_at' => '2014-07-24 16:22:06',
				'station_id' => 1,
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			2 => 
			array (
				'id' => 4,
				'title' => 'Tagesschau',
				'airtime' => '1900-12-25 07:12:11',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webl.h264.mp4","_filesize":""}]',
				'duration' => '07:20:00',
				'image' => '[{"_resolution":"128x72","_url":"http:\\/\\/mediathek.daserste.de\\/daserste\\/servlet\\/scaled\\/22\\/51\\/99\\/72\\/22519972-bild-xs16x9"},{"_resolution":"960x540","_url":"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/22\\/51\\/99\\/74\\/2028247919\\/16x9\\/960"}]',
				'created_at' => '2014-07-24 19:49:53',
				'updated_at' => '2014-07-24 19:49:53',
				'station_id' => 1,
				'playlist_id' => NULL,
				'user_id' => 1,
			),
		));
	}

}
