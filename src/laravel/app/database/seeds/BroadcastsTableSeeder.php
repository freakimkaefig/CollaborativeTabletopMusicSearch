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
				'title' => 'Naturparadiese in Lateinamerika',
			'subtitle' => 'Die Anden (Doku-Reihe)',
				'details' => 'AUSSCHNITT: Auf dem südamerikanischen Kontinent lebt etwa ein Drittel aller Tier- und Pflanzenarten der Erde. Die fünfteilige Dokumentationsreihe stellt die faszinierenden Regionen Lateinamerikas in spektakulären Aufnahmen vor. Neben der exotischen Flora und Fauna zeigen die Filmemacher aber auch den Alltag der hier lebenden indigenen Völker, die versuchen, sich ihre traditionelle Lebensweise zu bewahren. 
Im Mittelpunkt dieses Teils der Dokumentationsreihe stehen die Anden, die mit mehr als 7.000 Kilometern längste Bergkette der Welt.',
				'airtime' => '1970-01-01 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwxd.net\\/o35\\/nogeo\\/HBBTV\\/045322-001-A_EXT_SQ_1_VA_01324421_MP4-2200_AMM-HBBTV_EXTRAIT.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwxd.net\\/o35\\/nogeo\\/HBBTV\\/045322-001-A_EXT_HQ_1_VA_01324420_MP4-800_AMM-HBBTV_EXTRAIT.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwxd.net\\/o35\\/nogeo\\/HBBTV\\/045322-001-A_EXT_EQ_1_VA_01324422_MP4-1500_AMM-HBBTV_EXTRAIT.mp4","_filesize":"0"}]',
				'duration' => '07:40:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/923554\\/W940H530\\/045322-001_nil-anden_04-1402285533229.jpg"},{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/923554\\/W940H530\\/045322-001_nil-anden_04-1402285533229.jpg"}]',
				'station' => 'ARTE F',
				'created_at' => '2014-07-30 10:33:42',
				'updated_at' => '2014-07-30 10:33:42',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			1 => 
			array (
				'id' => 4,
				'title' => 'ZDFneo TVLab 2014 Trailer',
				'subtitle' => '0',
				'details' => 'Ende August startet in ZDFneo das TVLab 2014 unter dem Motto fiktionale Serien - mit dabei: "Alibi Agentur", "BLOCKBUSTAZ" und "JETZT IST SENSE". Die Abstimmung startet am 22. August, um 12 Uhr!',
				'airtime' => '2014-08-28 21:45:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_436k_p9v11.mp4","_filesize":"14040571"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_436k_p9v11.mp4","_filesize":"14040571"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_189k_p7v11.mp4","_filesize":"6490215"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1456k_p13v11.mp4","_filesize":"45260161"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1456k_p13v11.mp4","_filesize":"45260161"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_776k_p17v11.webm","_filesize":"15477500"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_282k_p16v11.webm","_filesize":"6022817"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1496k_p18v11.webm","_filesize":"27921405"}]',
				'duration' => '00:03:55',
				'image' => '[{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg75x52blob\\/10059360"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg476x268blob\\/10059361"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg298x168blob\\/10059362"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg404x227blob\\/10059367"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg276x155blob\\/10059355"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg644x363blob\\/10059364"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg476x176blob\\/10059359"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg144x81blob\\/10059366"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg485x273blob\\/10059354"},{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg94x65blob\\/10059352"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg72x54blob\\/10059358"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg173x120blob\\/10059353"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg236x133blob\\/10059363"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg116x88blob\\/10059357"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg116x54blob\\/10059356"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg672x378blob\\/10059365"},{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg946x532blob\\/10059368"}]',
				'station' => 'ZDFneo',
				'created_at' => '2014-07-30 13:37:59',
				'updated_at' => '2014-07-30 13:37:59',
				'playlist_id' => 2,
				'user_id' => NULL,
			),
			2 => 
			array (
				'id' => 5,
				'title' => 'ZDFneo TVLab 2014 Trailer',
				'subtitle' => '0',
				'details' => 'Ende August startet in ZDFneo das TVLab 2014 unter dem Motto fiktionale Serien - mit dabei: "Alibi Agentur", "BLOCKBUSTAZ" und "JETZT IST SENSE". Die Abstimmung startet am 22. August, um 12 Uhr!',
				'airtime' => '2014-08-28 21:45:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_436k_p9v11.mp4","_filesize":"14040571"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_436k_p9v11.mp4","_filesize":"14040571"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_189k_p7v11.mp4","_filesize":"6490215"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1456k_p13v11.mp4","_filesize":"45260161"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1456k_p13v11.mp4","_filesize":"45260161"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_776k_p17v11.webm","_filesize":"15477500"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_282k_p16v11.webm","_filesize":"6022817"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1496k_p18v11.webm","_filesize":"27921405"}]',
				'duration' => '00:03:55',
				'image' => '[{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg75x52blob\\/10059360"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg476x268blob\\/10059361"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg298x168blob\\/10059362"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg404x227blob\\/10059367"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg276x155blob\\/10059355"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg644x363blob\\/10059364"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg476x176blob\\/10059359"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg144x81blob\\/10059366"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg485x273blob\\/10059354"},{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg94x65blob\\/10059352"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg72x54blob\\/10059358"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg173x120blob\\/10059353"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg236x133blob\\/10059363"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg116x88blob\\/10059357"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg116x54blob\\/10059356"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg672x378blob\\/10059365"},{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg946x532blob\\/10059368"}]',
				'station' => 'ZDFneo',
				'created_at' => '2014-07-30 13:45:07',
				'updated_at' => '2014-07-30 13:45:07',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			3 => 
			array (
				'id' => 6,
				'title' => 'ZDFneo TVLab 2014 Trailer',
				'subtitle' => '0',
				'details' => 'Ende August startet in ZDFneo das TVLab 2014 unter dem Motto fiktionale Serien - mit dabei: "Alibi Agentur", "BLOCKBUSTAZ" und "JETZT IST SENSE". Die Abstimmung startet am 22. August, um 12 Uhr!',
				'airtime' => '2014-08-28 21:45:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_436k_p9v11.mp4","_filesize":"14040571"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_436k_p9v11.mp4","_filesize":"14040571"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_189k_p7v11.mp4","_filesize":"6490215"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1456k_p13v11.mp4","_filesize":"45260161"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1456k_p13v11.mp4","_filesize":"45260161"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_776k_p17v11.webm","_filesize":"15477500"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_282k_p16v11.webm","_filesize":"6022817"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140815_neo_gesamttrailer_lab_1496k_p18v11.webm","_filesize":"27921405"}]',
				'duration' => '00:03:55',
				'image' => '[{"_resolution":"75x52","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg75x52blob\\/10059360"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg476x268blob\\/10059361"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg298x168blob\\/10059362"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg404x227blob\\/10059367"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg276x155blob\\/10059355"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg644x363blob\\/10059364"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg476x176blob\\/10059359"},{"_resolution":"144x81","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg144x81blob\\/10059366"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg485x273blob\\/10059354"},{"_resolution":"94x65","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg94x65blob\\/10059352"},{"_resolution":"72x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg72x54blob\\/10059358"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg173x120blob\\/10059353"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg236x133blob\\/10059363"},{"_resolution":"116x88","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg116x88blob\\/10059357"},{"_resolution":"116x54","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg116x54blob\\/10059356"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg672x378blob\\/10059365"},{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201734\\/timg946x532blob\\/10059368"}]',
				'station' => 'ZDFneo',
				'created_at' => '2014-07-30 13:45:11',
				'updated_at' => '2014-07-30 13:45:11',
				'playlist_id' => 2,
				'user_id' => NULL,
			),
			4 => 
			array (
				'id' => 7,
				'title' => 'tagesschau, 16:00 Uhr',
				'subtitle' => '0',
				'details' => 'Sie verwenden eine veraltete Browser-Version. Bitte installieren Sie einen aktuellen Browser, um unser Angebot richtig darstellen zu können.Themen der Sendung: Israel setzt Militäroffensive fort, Russland gibt sich unbeeindruckt von EU-Sanktionen, Tote nach Erdrutsch in Indien, Umweltbundesamt warnt vor Gefahren des Fracking, Weitspringer Rehm nicht für Leichtathletik-WM nominiert, Unwetter in Deutschland, Das Wetter',
				'airtime' => '2014-07-30 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0730\\/TV-20140730-1611-5601.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0730\\/TV-20140730-1611-5601.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0730\\/TV-20140730-1611-5601.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0730\\/TV-20140730-1611-5601.webs.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0730\\/TV-20140730-1611-5601.webm.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0730\\/TV-20140730-1611-5601.webml.h264.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0730\\/TV-20140730-1611-5601.webl.h264.mp4","_filesize":""}]',
				'duration' => '07:23:00',
				'image' => '[{"_resolution":"960x540","_url":"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/22\\/67\\/38\\/06\\/1067187042\\/16x9\\/960"}]',
				'station' => 'Das Erste',
				'created_at' => '2014-07-30 15:14:21',
				'updated_at' => '2014-07-30 15:14:21',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
		));
	}

}
