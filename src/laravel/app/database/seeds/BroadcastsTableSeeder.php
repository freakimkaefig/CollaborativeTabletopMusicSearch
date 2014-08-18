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
				'title' => 'Der kleine Blonde mit dem weißen Schaf',
			'subtitle' => 'undefined (Kurzfilm)',
				'details' => 'ARTE+7: Anhand der Zeichnungen von Gwendal Le Bec erzählt der französische Schauspieler Pierre Richard von seiner lustigen Kindheit, welche die Persönlichkeit des Komikers nachhaltig prägte.',
				'airtime' => '2014-10-08 05:01:36',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/044409-000-A_HQ_1_VOF-STA_01413750_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/044409-000-A_EQ_1_VOF-STA_01413752_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/044409-000-A_SQ_1_VOF-STA_01413754_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '00:08:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/945721\\/W940H530\\/044409-000_kskleineblonde_01-1405655117882.jpg"},{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/945721\\/W940H530\\/044409-000_kskleineblonde_01-1405655117882.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-12 07:06:18',
				'updated_at' => '2014-08-12 07:06:18',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			1 => 
			array (
				'id' => 10,
				'title' => 'Too Young To Die',
			'subtitle' => 'River Phoenix, der scheue Star (Dokumentationsreihe)',
				'details' => 'Ein früher Tod großer Stars bietet häufig Anlass, einen Mythos entstehen zu lassen. Die Dokureihe beschreibt das Leben früh verstorbener Hollywood-Schauspieler und Musiker hinter dem Bild, das im kollektiven Bewusstsein von ihnen fortbesteht. Diese Folge präsentiert die kurze Karriere des Schauspielers und Musikers River Phoenix, der zu den Jugendidolen der 80er Jahre gehörte.',
				'airtime' => '2014-08-09 22:45:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048741-002-A_HQ_1_VA-STA_01415342_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048741-002-A_EQ_1_VA-STA_01415344_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048741-002-A_SQ_1_VA-STA_01415346_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '00:52:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1235012\\/W940H530\\/048741-002_tytd-phoenix_01-1405741512581.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-12 14:32:53',
				'updated_at' => '2014-08-12 14:32:53',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			2 => 
			array (
				'id' => 11,
				'title' => 'Die Truman Show',
			'subtitle' => ' (spielfilm)',
				'details' => 'TRAILER: Das Leben des Versicherungsagenten Truman Burbank wird ohne dessen Wissen seit 30 Jahren weltweit live übertragen, in einer wahnsinnig erfolgreichen Fernseh-„Seifenoper“. Bis Truman Zweifel überkommen. Vor dem Hintergrund einer gigantischen "lebensechten" Fernsehkulisse wird der Zuschauer selbst zum Voyeur bei Trumans allmählicher Entdeckung einer alternativen Realität. Brillant inszeniert und gespielt, nimmt der Film Medienmanipulation, Konformismus und Kommerzialisierung aufs Korn, scheut aber auch vor existenziellen Fragestellungen nicht zurück. Furore machende, meisterhafte Satire aus den 90er Jahren.',
				'airtime' => '2014-08-05 13:49:18',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwxd.net\\/o35\\/nogeo\\/HBBTV\\/PWA10990_SQ_1_VA_01395698_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwxd.net\\/o35\\/nogeo\\/HBBTV\\/PWA10990_EQ_1_VA_01395697_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwxd.net\\/o35\\/nogeo\\/HBBTV\\/PWA10990_HQ_1_VA_01395694_MP4-800_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '00:01:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1225841\\/W940H530\\/052722-000_trumanshow_01-1405223121406.jpg"},{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1225841\\/W940H530\\/052722-000_trumanshow_01-1405223121406.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-14 09:48:02',
				'updated_at' => '2014-08-14 09:48:02',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			3 => 
			array (
				'id' => 12,
				'title' => 'Nur die Besten kommen durch',
				'subtitle' => '0',
				'details' => 'Das Bundesland Hessen gilt als eines der Besten, wenn es um die Ausbildung von zukünftigen Polizisten geht. 6.000 Bewerber gibt es hier jährlich - 90 Prozent fallen direkt durch.',
				'airtime' => '2014-08-15 10:15:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_436k_p9v11.mp4","_filesize":"156931726"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_436k_p9v11.mp4","_filesize":"156931726"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_189k_p7v11.mp4","_filesize":"72386893"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_1456k_p13v11.mp4","_filesize":"504600904"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_1456k_p13v11.mp4","_filesize":"504600904"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_776k_p17v11.webm","_filesize":"170890616"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_282k_p16v11.webm","_filesize":"65013408"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140708_diebesten_inf_1496k_p18v11.webm","_filesize":"324483626"}]',
				'duration' => '00:43:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg946x532blob\\/10138983"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg672x378blob\\/10138980"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg644x363blob\\/10138979"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg485x273blob\\/10138969"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg476x268blob\\/10138976"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg476x176blob\\/10138974"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg404x227blob\\/10138982"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg298x168blob\\/10138977"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg276x155blob\\/10138970"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg236x133blob\\/10138978"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2193264\\/timg173x120blob\\/10138968"}]',
				'station' => 'ZDFinfo',
				'created_at' => '2014-08-14 11:09:08',
				'updated_at' => '2014-08-14 11:09:08',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			4 => 
			array (
				'id' => 14,
				'title' => 'Der Chronist des Todes',
				'subtitle' => '0',
				'details' => 'Seit fast 30 Jahren filmt der Sozialarbeiter Curtis Mozie das Leben und das Sterben der schwarzen Jugendlichen in der US-Hauptstadt. Er ist ein Chronist des Todes.',
				'airtime' => '2014-08-21 17:30:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_436k_p9v11.mp4","_filesize":"110022736"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_436k_p9v11.mp4","_filesize":"110022736"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_189k_p7v11.mp4","_filesize":"50820534"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_1456k_p13v11.mp4","_filesize":"353777646"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_1456k_p13v11.mp4","_filesize":"353777646"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_776k_p17v11.webm","_filesize":"120932364"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_282k_p16v11.webm","_filesize":"45983459"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_1496k_p18v11.webm","_filesize":"226694445"}]',
				'duration' => '00:30:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg946x532blob\\/10150380"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg672x378blob\\/10150377"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg644x363blob\\/10150376"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg485x273blob\\/10150366"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg476x268blob\\/10150373"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg476x176blob\\/10150371"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg404x227blob\\/10150379"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg298x168blob\\/10150374"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg276x155blob\\/10150367"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg236x133blob\\/10150375"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg173x120blob\\/10150365"}]',
				'station' => 'ZDF',
				'created_at' => '2014-08-16 14:20:20',
				'updated_at' => '2014-08-16 14:20:20',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			5 => 
			array (
				'id' => 37,
				'title' => 'Wacken 2013: Anthrax',
				'subtitle' => '0',
				'details' => 'Thrash Metal aus New York: Anthrax. Beim Wacken Open Air 2013 sind sie mit bewährtem Line-up um Gründungsmitglied Scott Ian am Start und zeigen, was sie immer noch drauf haben.',
				'airtime' => '2014-08-17 02:10:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_189k_p7v11.mp4","_filesize":"96182088"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_776k_p17v11.webm","_filesize":"243447009"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_282k_p16v11.webm","_filesize":"88861737"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1496k_p18v11.webm","_filesize":"452464901"}]',
				'duration' => '00:58:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg946x532blob\\/10093056"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg672x378blob\\/10093053"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg644x363blob\\/10093052"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg485x273blob\\/10093042"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x268blob\\/10093049"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x176blob\\/10093047"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg404x227blob\\/10093055"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg298x168blob\\/10093050"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg276x155blob\\/10093043"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg236x133blob\\/10093051"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg173x120blob\\/10093041"}]',
				'station' => 'ZDF.kultur',
				'created_at' => '2014-08-16 15:47:32',
				'updated_at' => '2014-08-16 15:47:32',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			6 => 
			array (
				'id' => 38,
				'title' => 'Wacken 2013: Anthrax',
				'subtitle' => '0',
				'details' => 'Thrash Metal aus New York: Anthrax. Beim Wacken Open Air 2013 sind sie mit bewährtem Line-up um Gründungsmitglied Scott Ian am Start und zeigen, was sie immer noch drauf haben.',
				'airtime' => '2014-08-17 02:10:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_189k_p7v11.mp4","_filesize":"96182088"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_776k_p17v11.webm","_filesize":"243447009"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_282k_p16v11.webm","_filesize":"88861737"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1496k_p18v11.webm","_filesize":"452464901"}]',
				'duration' => '00:58:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg946x532blob\\/10093056"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg672x378blob\\/10093053"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg644x363blob\\/10093052"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg485x273blob\\/10093042"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x268blob\\/10093049"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x176blob\\/10093047"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg404x227blob\\/10093055"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg298x168blob\\/10093050"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg276x155blob\\/10093043"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg236x133blob\\/10093051"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg173x120blob\\/10093041"}]',
				'station' => 'ZDF.kultur',
				'created_at' => '2014-08-16 15:47:32',
				'updated_at' => '2014-08-16 15:47:32',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			7 => 
			array (
				'id' => 40,
				'title' => 'Wacken 2013: Anthrax',
				'subtitle' => '0',
				'details' => 'Thrash Metal aus New York: Anthrax. Beim Wacken Open Air 2013 sind sie mit bewährtem Line-up um Gründungsmitglied Scott Ian am Start und zeigen, was sie immer noch drauf haben.',
				'airtime' => '2014-08-17 02:10:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_189k_p7v11.mp4","_filesize":"96182088"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_776k_p17v11.webm","_filesize":"243447009"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_282k_p16v11.webm","_filesize":"88861737"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1496k_p18v11.webm","_filesize":"452464901"}]',
				'duration' => '00:58:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg946x532blob\\/10093056"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg672x378blob\\/10093053"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg644x363blob\\/10093052"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg485x273blob\\/10093042"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x268blob\\/10093049"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x176blob\\/10093047"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg404x227blob\\/10093055"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg298x168blob\\/10093050"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg276x155blob\\/10093043"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg236x133blob\\/10093051"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg173x120blob\\/10093041"}]',
				'station' => 'ZDF.kultur',
				'created_at' => '2014-08-16 15:51:07',
				'updated_at' => '2014-08-16 15:51:07',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			8 => 
			array (
				'id' => 41,
				'title' => 'Wacken 2013: Anthrax',
				'subtitle' => '0',
				'details' => 'Thrash Metal aus New York: Anthrax. Beim Wacken Open Air 2013 sind sie mit bewährtem Line-up um Gründungsmitglied Scott Ian am Start und zeigen, was sie immer noch drauf haben.',
				'airtime' => '2014-08-17 02:10:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_436k_p9v11.mp4","_filesize":"208210607"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_189k_p7v11.mp4","_filesize":"96182088"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1456k_p13v11.mp4","_filesize":"669463523"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_776k_p17v11.webm","_filesize":"243447009"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_282k_p16v11.webm","_filesize":"88861737"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/13\\/08\\/130807_wacken_anthrax_fes_1496k_p18v11.webm","_filesize":"452464901"}]',
				'duration' => '00:58:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg946x532blob\\/10093056"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg672x378blob\\/10093053"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg644x363blob\\/10093052"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg485x273blob\\/10093042"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x268blob\\/10093049"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg476x176blob\\/10093047"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg404x227blob\\/10093055"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg298x168blob\\/10093050"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg276x155blob\\/10093043"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg236x133blob\\/10093051"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1959342\\/timg173x120blob\\/10093041"}]',
				'station' => 'ZDF.kultur',
				'created_at' => '2014-08-16 15:58:27',
				'updated_at' => '2014-08-16 15:58:27',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			9 => 
			array (
				'id' => 42,
				'title' => '"Amigo - Bei Ankunft Tod"',
				'subtitle' => '0',
				'details' => 'Zwei BKA-Ermittler landen in Neapel, um den dort untergetauchten Terroristen Amigo Steiger zu fassen. Doch als sie ihn finden, kommt es zur Schießerei und einer der Ermittler wird getroffen.',
				'airtime' => '2014-08-11 20:15:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_436k_p9v11.mp4","_filesize":"313511616"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_436k_p9v11.mp4","_filesize":"313511616"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_189k_p7v11.mp4","_filesize":"144861935"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_1456k_p13v11.mp4","_filesize":"1007893550"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_1456k_p13v11.mp4","_filesize":"1007893550"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_776k_p17v11.webm","_filesize":"335237201"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_282k_p16v11.webm","_filesize":"127568836"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_1496k_p18v11.webm","_filesize":"562574791"}]',
				'duration' => '01:27:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg946x532blob\\/10118346"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg672x378blob\\/10118343"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg644x363blob\\/10118342"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg485x273blob\\/10118332"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg476x268blob\\/10118339"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg476x176blob\\/10118337"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg404x227blob\\/10118345"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg298x168blob\\/10118340"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg276x155blob\\/10118333"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg236x133blob\\/10118341"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg173x120blob\\/10118331"}]',
				'station' => 'ZDF',
				'created_at' => '2014-08-16 15:59:47',
				'updated_at' => '2014-08-16 15:59:47',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			10 => 
			array (
				'id' => 44,
				'title' => '"Amigo - Bei Ankunft Tod"',
				'subtitle' => '0',
				'details' => 'Zwei BKA-Ermittler landen in Neapel, um den dort untergetauchten Terroristen Amigo Steiger zu fassen. Doch als sie ihn finden, kommt es zur Schießerei und einer der Ermittler wird getroffen.',
				'airtime' => '2014-08-11 20:15:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_436k_p9v11.mp4","_filesize":"313511616"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_436k_p9v11.mp4","_filesize":"313511616"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_189k_p7v11.mp4","_filesize":"144861935"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_1456k_p13v11.mp4","_filesize":"1007893550"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_1456k_p13v11.mp4","_filesize":"1007893550"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_776k_p17v11.webm","_filesize":"335237201"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_282k_p16v11.webm","_filesize":"127568836"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140725_amigo_ankunft_tod_ps_fdw_1496k_p18v11.webm","_filesize":"562574791"}]',
				'duration' => '01:27:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg946x532blob\\/10118346"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg672x378blob\\/10118343"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg644x363blob\\/10118342"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg485x273blob\\/10118332"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg476x268blob\\/10118339"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg476x176blob\\/10118337"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg404x227blob\\/10118345"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg298x168blob\\/10118340"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg276x155blob\\/10118333"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg236x133blob\\/10118341"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2204616\\/timg173x120blob\\/10118331"}]',
				'station' => 'ZDF',
				'created_at' => '2014-08-16 16:09:59',
				'updated_at' => '2014-08-16 16:09:59',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			11 => 
			array (
				'id' => 71,
			'title' => 'Welcome to the 90s (3/4)',
			'subtitle' => 'Come as you are: Grunge, Riot Grrrl, Britpop, Nu Metal (Dokumentationsreihe)',
				'details' => 'Offene Grenzen, Internet, moderne Kommunikation: Die 90er sind die Zeit der radikalen Globalisierung, die Welt rückt enger zusammen, doch die Rockmusik besinnt sich auf nationale Qualitäten. Der dritte Teil der Reihe erzählt von neuen Blüten des Genres: Grunge, Riot Grrrl, Crossover und Nu Metal.',
				'airtime' => '2014-08-09 21:40:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/051605-003-A_EQ_1_VA-STA_01415280_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/051605-003-A_HQ_1_VA-STA_01415278_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/051605-003-A_SQ_1_VA-STA_01415282_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '00:52:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/TVGE2270\\/W940H530\\/TVGE2270-1406019725118.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-16 16:15:40',
				'updated_at' => '2014-08-16 16:15:40',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			12 => 
			array (
				'id' => 72,
				'title' => 'Der Chronist des Todes',
				'subtitle' => '0',
				'details' => 'Seit fast 30 Jahren filmt der Sozialarbeiter Curtis Mozie das Leben und das Sterben der schwarzen Jugendlichen in der US-Hauptstadt. Er ist ein Chronist des Todes.',
				'airtime' => '2014-08-21 17:30:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_436k_p9v11.mp4","_filesize":"110022736"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_436k_p9v11.mp4","_filesize":"110022736"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_189k_p7v11.mp4","_filesize":"50820534"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_1456k_p13v11.mp4","_filesize":"353777646"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_1456k_p13v11.mp4","_filesize":"353777646"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_776k_p17v11.webm","_filesize":"120932364"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_282k_p16v11.webm","_filesize":"45983459"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/01\\/140129_der_chronist_des_todes_dok_1496k_p18v11.webm","_filesize":"226694445"}]',
				'duration' => '00:30:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg946x532blob\\/10141631"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg672x378blob\\/10141628"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg644x363blob\\/10141627"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg485x273blob\\/10141617"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg476x268blob\\/10141624"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg476x176blob\\/10141622"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg404x227blob\\/10141630"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg298x168blob\\/10141625"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg276x155blob\\/10141618"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg236x133blob\\/10141626"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2078198\\/timg173x120blob\\/10141616"}]',
				'station' => 'ZDF',
				'created_at' => '2014-08-17 10:16:45',
				'updated_at' => '2014-08-17 10:16:45',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			13 => 
			array (
				'id' => 73,
				'title' => 'Nicht von schlechten Vätern - Boris',
				'subtitle' => '0',
			'details' => 'Boris (39) ist alleinerziehender Vater von Lara (4). Er ist ein wohlsituierter Sunnyboy aus Hamburg Blankenese. "Ich genieße alles mit meiner Tochter."',
				'airtime' => '2014-09-07 10:35:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_436k_p9v11.mp4","_filesize":"4182400"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_436k_p9v11.mp4","_filesize":"4182400"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_189k_p7v11.mp4","_filesize":"1932365"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_1456k_p13v11.mp4","_filesize":"13432632"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_1456k_p13v11.mp4","_filesize":"13432632"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_776k_p17v11.webm","_filesize":"4488752"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_282k_p16v11.webm","_filesize":"1696799"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140710_neo_boris_vsv_1496k_p18v11.webm","_filesize":"7947174"}]',
				'duration' => '00:01:09',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg946x532blob\\/10013039"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg672x378blob\\/10013036"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg644x363blob\\/10013035"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg485x273blob\\/10013025"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg476x268blob\\/10013032"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg476x176blob\\/10013030"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg404x227blob\\/10013038"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg298x168blob\\/10013033"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg276x155blob\\/10013026"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg236x133blob\\/10013034"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2194702\\/timg173x120blob\\/10013024"}]',
				'station' => 'ZDFneo',
				'created_at' => '2014-08-17 10:25:12',
				'updated_at' => '2014-08-17 10:25:12',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			14 => 
			array (
				'id' => 74,
				'title' => 'Pinocchio',
				'subtitle' => 'Pinocchio',
				'details' => 'Der arme, alte Gepetto staunt nicht schlecht, als eine von ihm aus einem Stück Holz geschnitzte Figur plötzlich quicklebendig wird. Schnell sorgt Pinocchio im ganzen Dorf für Aufregung. Mit der Wahrheit nimmt es Pinocchio nicht immer so genau. Doch bei jeder Lüge wird seine Nase länger und länger. Auf seiner Reise wird Pinocchio lernen, was es heißt, ein richtiger Junge zu sein.
Regie:
Anna Justice

Redaktion:
Cornelia Ackers


Besetzung

Die Rollen und ihre Darsteller


Rolle:
Darsteller:




Geppetto
Mario Adorf


Mangiafuoco
Ulrich Tukur


Anna
Inka Friedrich


Antonio
Benjamin Sadler


Füchsin
Sandra Hüller


Kater
Florian Lukas


Luca
Arved Friese


Sofia
Nicolais Borger


Pinocchio als Junge
Aaron Kissiov




Regie:
Anna Justice

Redaktion:
Cornelia Ackers


',
				'airtime' => '1970-01-01 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/b7\\/2014-08\\/17\\/1a3cf40c25e311e48a90984be10adece_0.mp4","_filesize":"64683570"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/b7\\/2014-08\\/17\\/1a3cf40c25e311e48a90984be10adece_A.mp4","_filesize":"91238223"},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/cdn-storage.br.de\\/b7\\/2014-08\\/17\\/1a3cf40c25e311e48a90984be10adece_B.mp4","_filesize":"395579497"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/cdn-storage.br.de\\/b7\\/2014-08\\/17\\/1a3cf40c25e311e48a90984be10adece_C.mp4","_filesize":"792002796"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/cdn-storage.br.de\\/b7\\/2014-08\\/17\\/1a3cf40c25e311e48a90984be10adece_E.mp4","_filesize":"542441705"},{"_basetype":"","_type":"video\\/mp4","_quality":"HD","_url":"http:\\/\\/cdn-storage.br.de\\/b7\\/2014-08\\/17\\/1a3cf40c25e311e48a90984be10adece_X.mp4","_filesize":"1697715738"}]',
				'duration' => '00:58:00',
				'image' => '[{"_resolution":"640x360","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/inhalt\\/film-und-serie\\/pinocchio-104~_h-360_v-image853_w-640_-32550a25a71f9ea6a28488357c9b82d34bc5cc66.jpg?version=88481"},{"_resolution":"400x255","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/inhalt\\/film-und-serie\\/pinocchio-104~_h-225_v-image853_w-400_-46551a6ec6b42bcb6fc43f2cde7c015d39d126c0.jpg?version=88481"},{"_resolution":"320x180","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/inhalt\\/film-und-serie\\/pinocchio-104~_h-180_v-image853_w-320_-84bf43942cbaa96151d5c125e27e60633b3a04c9.jpg?version=88481"},{"_resolution":"108x61","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/inhalt\\/film-und-serie\\/pinocchio-104~_h-61_v-image853_w-108_-8bf23116f3f36b170c5e692a307c070a087283df.jpg?version=88481"}]',
				'station' => 'Bayerisches Fernsehen',
				'created_at' => '2014-08-17 12:22:49',
				'updated_at' => '2014-08-17 12:22:49',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			15 => 
			array (
				'id' => 75,
				'title' => 'Der König von Bastoy / King of Devil\'s Island',
			'subtitle' => ' (Spielfilm)',
			'details' => 'Nach einer wahren Begebenheit: 1915 werden auf einer norwegischen Insel Jungen in einer Besserungsanstalt so lange drangsaliert, bis ein Neuankömmling (Benjamin Helstad) den Willen zum Widerstand weckt. Vor wuchtiger Naturkulisse und in wirkungsvoller Farbgebung inszeniertes Drama um Machtmissbrauch und Sehnsucht nach Freiheit.',
				'airtime' => '2014-08-11 21:45:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_HQ_1_VA-STA_01418362_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_EQ_1_VA-STA_01418364_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_SQ_1_VA-STA_01418366_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '01:48:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1235006\\/W940H530\\/048045-000_koenigbastoy_01-1405914312938.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-18 08:29:41',
				'updated_at' => '2014-08-18 08:29:41',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			16 => 
			array (
				'id' => 76,
				'title' => 'Der König von Bastoy / King of Devil\'s Island',
			'subtitle' => ' (Spielfilm)',
			'details' => 'Nach einer wahren Begebenheit: 1915 werden auf einer norwegischen Insel Jungen in einer Besserungsanstalt so lange drangsaliert, bis ein Neuankömmling (Benjamin Helstad) den Willen zum Widerstand weckt. Vor wuchtiger Naturkulisse und in wirkungsvoller Farbgebung inszeniertes Drama um Machtmissbrauch und Sehnsucht nach Freiheit.',
				'airtime' => '2014-08-11 21:45:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_HQ_1_VA-STA_01418362_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_EQ_1_VA-STA_01418364_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_SQ_1_VA-STA_01418366_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '01:48:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1235006\\/W940H530\\/048045-000_koenigbastoy_01-1405914312938.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-18 08:29:50',
				'updated_at' => '2014-08-18 08:29:50',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			17 => 
			array (
				'id' => 77,
				'title' => 'Der König von Bastoy / King of Devil\'s Island',
			'subtitle' => ' (Spielfilm)',
			'details' => 'Nach einer wahren Begebenheit: 1915 werden auf einer norwegischen Insel Jungen in einer Besserungsanstalt so lange drangsaliert, bis ein Neuankömmling (Benjamin Helstad) den Willen zum Widerstand weckt. Vor wuchtiger Naturkulisse und in wirkungsvoller Farbgebung inszeniertes Drama um Machtmissbrauch und Sehnsucht nach Freiheit.',
				'airtime' => '2014-08-11 21:45:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_HQ_1_VA-STA_01418362_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_EQ_1_VA-STA_01418364_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_SQ_1_VA-STA_01418366_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '01:48:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1235006\\/W940H530\\/048045-000_koenigbastoy_01-1405914312938.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-18 08:30:04',
				'updated_at' => '2014-08-18 08:30:04',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			18 => 
			array (
				'id' => 78,
				'title' => 'Der König von Bastoy / King of Devil\'s Island',
			'subtitle' => ' (Spielfilm)',
			'details' => 'Nach einer wahren Begebenheit: 1915 werden auf einer norwegischen Insel Jungen in einer Besserungsanstalt so lange drangsaliert, bis ein Neuankömmling (Benjamin Helstad) den Willen zum Widerstand weckt. Vor wuchtiger Naturkulisse und in wirkungsvoller Farbgebung inszeniertes Drama um Machtmissbrauch und Sehnsucht nach Freiheit.',
				'airtime' => '2014-08-11 21:45:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_HQ_1_VA-STA_01418362_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_EQ_1_VA-STA_01418364_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048045-000-A_SQ_1_VA-STA_01418366_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '01:48:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1235006\\/W940H530\\/048045-000_koenigbastoy_01-1405914312938.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-18 08:30:14',
				'updated_at' => '2014-08-18 08:30:14',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
		));
	}

}
