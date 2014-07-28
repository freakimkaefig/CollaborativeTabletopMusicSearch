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
				'subtitle' => '',
				'details' => '',
				'airtime' => '2014-07-23 04:37:00',
				'url' => 'http://mediathek-crawler',
				'duration' => '12:00:00',
				'image' => 'http://mediathek-crawler',
				'station' => 'ARD',
				'created_at' => '0000-00-00 00:00:00',
				'updated_at' => '0000-00-00 00:00:00',
				'playlist_id' => NULL,
				'user_id' => NULL,
			),
			1 => 
			array (
				'id' => 4,
				'title' => 'Tagesschau',
				'subtitle' => '',
				'details' => '',
				'airtime' => '1900-12-25 07:12:11',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webl.h264.mp4","_filesize":""}]',
				'duration' => '07:20:00',
				'image' => '[{"_resolution":"128x72","_url":"http:\\/\\/mediathek.daserste.de\\/daserste\\/servlet\\/scaled\\/22\\/51\\/99\\/72\\/22519972-bild-xs16x9"},{"_resolution":"960x540","_url":"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/22\\/51\\/99\\/74\\/2028247919\\/16x9\\/960"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-24 19:49:53',
				'updated_at' => '2014-07-24 19:49:53',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			2 => 
			array (
				'id' => 5,
				'title' => 'tagesschau, 12:00 Uhr',
				'subtitle' => '',
				'details' => '',
				'airtime' => '2024-07-20 14:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webl.h264.mp4","_filesize":""}]',
				'duration' => '15:02:00',
				'image' => '[{"_resolution":"960x540","_url":"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/22\\/55\\/11\\/78\\/2028247919\\/16x9\\/960"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-25 09:14:54',
				'updated_at' => '2014-07-25 09:14:54',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			3 => 
			array (
				'id' => 6,
				'title' => 'Rennen und Religion',
				'subtitle' => '',
				'details' => '',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_436k_p9v11.mp4","_filesize":"16510445"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_436k_p9v11.mp4","_filesize":"16510445"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_189k_p7v11.mp4","_filesize":"7610876"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1456k_p13v11.mp4","_filesize":"53087073"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1456k_p13v11.mp4","_filesize":"53087073"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_776k_p17v11.webm","_filesize":"18344144"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_282k_p16v11.webm","_filesize":"6886241"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1496k_p18v11.webm","_filesize":"34859725"}]',
				'duration' => '00:04:35',
				'image' => '[{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg94x65blob\\/9241534"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg173x120blob\\/9241522"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg485x273blob\\/9241521"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg276x155blob\\/9241531"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg116x54blob\\/9241528"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg116x88blob\\/9241533"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg72x54blob\\/9241536"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg476x176blob\\/9241525"},{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg75x52blob\\/9241532"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg476x268blob\\/9241523"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg298x168blob\\/9241524"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg236x133blob\\/9241535"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg144x81blob\\/9241530"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg644x363blob\\/9241527"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg672x378blob\\/9241526"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg404x227blob\\/9241529"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-25 09:30:21',
				'updated_at' => '2014-07-25 09:30:21',
				'playlist_id' => 3,
				'user_id' => NULL,
			),
			4 => 
			array (
				'id' => 7,
				'title' => 'Mehmet Scholl - "Das ist nicht mehr mein Sport"',
				'subtitle' => '',
				'details' => '',
				'airtime' => '2005-07-20 14:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/f4m","_quality":"auto","_url":"http:\\/\\/adaptiv.wdr.de\\/z\\/medstdp\\/de\\/fsk0\\/46\\/468100\\/,468100_4832880,468100_4832881,468100_4832883,.mp4.csmil\\/manifest.f4m","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832882.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"mp4:CMS2010\\/mdb\\/ondemand\\/de\\/fsk0\\/46\\/468100\\/468100_4832881.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"mp4:CMS2010\\/mdb\\/ondemand\\/de\\/fsk0\\/46\\/468100\\/468100_4832880.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832882.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832881.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832883.mp4","_filesize":""}]',
				'duration' => '00:38:00',
				'image' => '[{"_resolution":"960x540","_url":"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/22\\/22\\/67\\/24\\/861531312\\/16x9\\/960"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-25 09:34:14',
				'updated_at' => '2014-07-25 09:34:14',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			5 => 
			array (
				'id' => 8,
				'title' => 'Baurfeind assistiert Linda Zervakis -...',
				'subtitle' => '',
				'details' => '',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_436k_p9v11.mp4","_filesize":"1711052"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_436k_p9v11.mp4","_filesize":"1711052"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_189k_p7v11.mp4","_filesize":"792221"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/podfiles.zdf.de\\/podcast\\/zdf_podcasts\\/diverse\\/0305_obenrumjob_bauerfeind_446k_p20v11.mp4","_filesize":"1762823"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1456k_p13v11.mp4","_filesize":"5507576"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1456k_p13v11.mp4","_filesize":"5507576"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_776k_p17v11.webm","_filesize":"1751755"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_282k_p16v11.webm","_filesize":"685288"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1496k_p18v11.webm","_filesize":"3418242"}]',
				'duration' => '00:00:28',
				'image' => '[{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg94x65blob\\/9591613"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg173x120blob\\/9591601"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg485x273blob\\/9591600"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg276x155blob\\/9591610"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg116x54blob\\/9591607"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg116x88blob\\/9591612"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg72x54blob\\/9591615"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg476x176blob\\/9591604"},{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg75x52blob\\/9591611"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg476x268blob\\/9591602"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg298x168blob\\/9591603"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg236x133blob\\/9591614"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg144x81blob\\/9591609"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg644x363blob\\/9591606"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg672x378blob\\/9591605"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg404x227blob\\/9591608"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-25 12:28:08',
				'updated_at' => '2014-07-25 12:28:08',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			6 => 
			array (
				'id' => 9,
				'title' => 'Baurfeind assistiert Linda Zervakis -...',
				'subtitle' => '',
				'details' => '',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_436k_p9v11.mp4","_filesize":"1711052"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_436k_p9v11.mp4","_filesize":"1711052"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_189k_p7v11.mp4","_filesize":"792221"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/podfiles.zdf.de\\/podcast\\/zdf_podcasts\\/diverse\\/0305_obenrumjob_bauerfeind_446k_p20v11.mp4","_filesize":"1762823"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1456k_p13v11.mp4","_filesize":"5507576"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1456k_p13v11.mp4","_filesize":"5507576"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_776k_p17v11.webm","_filesize":"1751755"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_282k_p16v11.webm","_filesize":"685288"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1496k_p18v11.webm","_filesize":"3418242"}]',
				'duration' => '00:00:28',
				'image' => '[{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg94x65blob\\/9591613"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg173x120blob\\/9591601"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg485x273blob\\/9591600"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg276x155blob\\/9591610"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg116x54blob\\/9591607"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg116x88blob\\/9591612"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg72x54blob\\/9591615"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg476x176blob\\/9591604"},{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg75x52blob\\/9591611"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg476x268blob\\/9591602"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg298x168blob\\/9591603"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg236x133blob\\/9591614"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg144x81blob\\/9591609"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg644x363blob\\/9591606"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg672x378blob\\/9591605"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg404x227blob\\/9591608"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-25 12:40:31',
				'updated_at' => '2014-07-25 12:40:31',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			7 => 
			array (
				'id' => 10,
				'title' => 'Petersilie und Schnittlauch trennen!',
				'subtitle' => '',
				'details' => '',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_436k_p9v11.mp4","_filesize":"11787635"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_436k_p9v11.mp4","_filesize":"11787635"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_189k_p7v11.mp4","_filesize":"5460859"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_1456k_p13v11.mp4","_filesize":"37943538"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_1456k_p13v11.mp4","_filesize":"37943538"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_776k_p17v11.webm","_filesize":"14223889"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_282k_p16v11.webm","_filesize":"5194399"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_1496k_p18v11.webm","_filesize":"25765984"}]',
				'duration' => '00:03:17',
				'image' => '[{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg94x65blob\\/9819820"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg173x120blob\\/9821245"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg485x273blob\\/9819807"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg276x155blob\\/9819817"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg116x54blob\\/9821248"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg116x88blob\\/9819819"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg72x54blob\\/9819822"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg476x176blob\\/9821251"},{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg75x52blob\\/9821252"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg476x268blob\\/9821253"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg298x168blob\\/9821254"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg236x133blob\\/9821255"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg144x81blob\\/9819816"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg644x363blob\\/9821256"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg672x378blob\\/9819812"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg404x227blob\\/9819815"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-25 12:53:45',
				'updated_at' => '2014-07-25 12:53:45',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			8 => 
			array (
				'id' => 18,
				'title' => 'Trailer: "Die letzte Fahrstunde"',
				'subtitle' => '',
				'details' => '',
				'airtime' => '0000-00-00 00:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_436k_p9v11.mp4","_filesize":"3695126"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_436k_p9v11.mp4","_filesize":"3695126"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_189k_p7v11.mp4","_filesize":"1709688"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_1456k_p13v11.mp4","_filesize":"11929981"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_1456k_p13v11.mp4","_filesize":"11929981"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_776k_p17v11.webm","_filesize":"4038738"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_282k_p16v11.webm","_filesize":"1531796"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_1496k_p18v11.webm","_filesize":"7335324"}]',
				'duration' => '00:01:01',
				'image' => '[{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg94x65blob\\/10037338"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg173x120blob\\/10037326"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg485x273blob\\/10037325"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg276x155blob\\/10037335"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg116x54blob\\/10037332"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg116x88blob\\/10037337"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg72x54blob\\/10037340"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg476x176blob\\/10037329"},{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg75x52blob\\/10037336"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg476x268blob\\/10037327"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg298x168blob\\/10037328"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg236x133blob\\/10037339"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg144x81blob\\/10037334"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg644x363blob\\/10037331"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg672x378blob\\/10037330"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg404x227blob\\/10037333"}]',
				'station' => 'ARD',
				'created_at' => '2014-07-25 13:39:12',
				'updated_at' => '2014-07-25 13:39:12',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
		));
	}

}
