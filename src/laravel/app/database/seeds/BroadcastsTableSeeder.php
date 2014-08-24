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
			1 => 
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
			2 => 
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
			3 => 
			array (
				'id' => 85,
				'title' => '"Dschungelkampf"',
				'subtitle' => '0',
				'details' => 'Im "Dschungelkampf" taucht das "starke Team" tief in ein sozial schwaches Berliner Plattenbauviertel ein, um den Mord an dem jungen Carsten Bubenberger aufzuklären.',
				'airtime' => '2014-08-16 20:15:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_436k_p9v11.mp4","_filesize":"313006106"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_436k_p9v11.mp4","_filesize":"313006106"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_189k_p7v11.mp4","_filesize":"144526237"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_1456k_p13v11.mp4","_filesize":"1006469284"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_1456k_p13v11.mp4","_filesize":"1006469284"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_776k_p17v11.webm","_filesize":"335872386"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_282k_p16v11.webm","_filesize":"126954838"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140801_dschungelkampf_ps_ete_1496k_p18v11.webm","_filesize":"613481725"}]',
				'duration' => '01:27:00',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg946x532blob\\/10131027"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg672x378blob\\/10131024"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg644x363blob\\/10131023"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg485x273blob\\/10131013"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg476x268blob\\/10131020"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg476x176blob\\/10131018"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg404x227blob\\/10131026"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg298x168blob\\/10131021"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg276x155blob\\/10131014"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg236x133blob\\/10131022"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2209656\\/timg173x120blob\\/10131012"}]',
				'station' => 'ZDF',
				'created_at' => '2014-08-18 08:56:38',
				'updated_at' => '2014-08-18 08:56:38',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			4 => 
			array (
				'id' => 86,
				'title' => 'Gasland',
			'subtitle' => ' (Dokumentarfilm)',
				'details' => 'Flammen aus dem Wasserhahn, kranke Menschen, tote Tiere: Trotz vieler Alarmzeichen setzen die USA flächendeckend auf Fracking. Wie gefährlich ist die Gas-Fördermethode wirklich? Das explosive dokumentarische Roadmovie von John Fox wurde für einen Oscar nominiert und mehrfach ausgezeichnet.',
				'airtime' => '2014-08-12 20:15:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048120-000-A_HQ_1_VA-STA_01419414_MP4-800_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048120-000-A_SQ_1_VA-STA_01419418_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048120-000-A_EQ_1_VA-STA_01419416_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '01:43:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1017655\\/W940H530\\/048120-000_gasland_09-1406000721712.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-18 09:00:48',
				'updated_at' => '2014-08-18 09:00:48',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
			5 => 
			array (
				'id' => 87,
				'title' => 'Tatort Internet',
				'subtitle' => '0',
				'details' => 'Gefälschte Wohnungsangebote, Abzocke mit Liebes-SMS oder Psychoterror durch Cybermobbing: Die weite Welt des Internets bietet Kriminellen eine ganz neue Plattform.',
				'airtime' => '2014-08-02 18:00:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_436k_p9v11.mp4","_filesize":"155236949"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_436k_p9v11.mp4","_filesize":"155236949"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_189k_p7v11.mp4","_filesize":"71792982"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_1456k_p13v11.mp4","_filesize":"499313532"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_1456k_p13v11.mp4","_filesize":"499313532"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_776k_p17v11.webm","_filesize":"175860457"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_282k_p16v11.webm","_filesize":"66969589"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140813_tatortneu_inf_1496k_p18v11.webm","_filesize":"312065460"}]',
				'duration' => '00:43:00',
				'image' => '[{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg672x378blob\\/10145150"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg644x363blob\\/10145149"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg485x273blob\\/10145139"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg476x268blob\\/10145146"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg476x176blob\\/10145144"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg404x227blob\\/10145152"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg298x168blob\\/10145147"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg276x155blob\\/10145140"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg236x133blob\\/10145148"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/1673784\\/timg173x120blob\\/10145138"}]',
				'station' => 'ZDFinfo',
				'created_at' => '2014-08-18 14:38:13',
				'updated_at' => '2014-08-18 14:38:13',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			6 => 
			array (
				'id' => 88,
				'title' => 'Mertesacker: 10 Jahre und 104 Einsätze',
				'subtitle' => '0',
				'details' => 'Weltmeister Per Mertesacker ist mit nicht einmal 30 Jahren aus der Deutschen Fußballnationalmannschaft zurückgetreten. In seinen 10 Jahren im DFB Team spielte er 104 mal und erzielte 4 Tore.',
				'airtime' => '2014-08-16 23:48:00',
				'url' => '[{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_436k_p9v11.mp4","_filesize":"5119709"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_436k_p9v11.mp4","_filesize":"5119709"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_189k_p7v11.mp4","_filesize":"2361213"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_1456k_p13v11.mp4","_filesize":"16473856"},{"_basetype":"h264_aac_mp4_http_na_na","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_1456k_p13v11.mp4","_filesize":"16473856"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"2","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_776k_p17v11.webm","_filesize":"5695982"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"0","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_282k_p16v11.webm","_filesize":"2177310"},{"_basetype":"vp8_vorbis_webm_http_na_na","_type":"video\\/webm","_quality":"3","_url":"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/08\\/140816_mertesacker_sst_1496k_p18v11.webm","_filesize":"11207575"}]',
				'duration' => '00:01:25',
				'image' => '[{"_resolution":"946x532","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg946x532blob\\/10155092"},{"_resolution":"672x378","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg672x378blob\\/10155089"},{"_resolution":"644x363","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg644x363blob\\/10155088"},{"_resolution":"485x273","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg485x273blob\\/10155078"},{"_resolution":"476x268","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg476x268blob\\/10155085"},{"_resolution":"476x176","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg476x176blob\\/10155083"},{"_resolution":"404x227","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg404x227blob\\/10155091"},{"_resolution":"298x168","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg298x168blob\\/10155086"},{"_resolution":"276x155","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg276x155blob\\/10155079"},{"_resolution":"236x133","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg236x133blob\\/10155087"},{"_resolution":"173x120","_url":"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2219490\\/timg173x120blob\\/10155077"}]',
				'station' => 'ZDF',
				'created_at' => '2014-08-18 14:55:13',
				'updated_at' => '2014-08-18 14:55:13',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			7 => 
			array (
				'id' => 89,
				'title' => 'Rote Rosen',
				'subtitle' => 'Folge 1789: Auf später verschoben?',
				'details' => 'Auch Thomas muss akzeptieren, dass Aylin momentan keinen Platz für eine Beziehung in ihrem Leben hat. Doch beide wissen insgeheim, dass Aylins Abschied nach Genf nicht das Ende der Geschichte ist.',
				'airtime' => '2014-08-18 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_450000\\/454795\\/format551473.mp4","_filesize":""},{"_basetype":"","_type":"rtmp\\/mp4","_quality":"1","_url":"rtmp:\\/\\/vod.daserste.de\\/ardfs\\/mp4:videoportal\\/mediathek\\/Rote+Rosen\\/c_450000\\/454795\\/format551472.mp4?sen=Rote+Rosen&amp;clip=Folge+1789+Auf+sp%C3%A4ter+verschoben%3F&amp;for=Web-M","_filesize":""},{"_basetype":"","_type":"rtmp\\/mp4","_quality":"2","_url":"rtmp:\\/\\/vod.daserste.de\\/ardfs\\/mp4:videoportal\\/mediathek\\/Rote+Rosen\\/c_450000\\/454795\\/format551482.mp4?sen=Rote+Rosen&amp;clip=Folge+1789+Auf+sp%C3%A4ter+verschoben%3F&amp;for=Web-L","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_450000\\/454795\\/format551473.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_450000\\/454795\\/format551472.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_450000\\/454795\\/format551531.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/mvideos.daserste.de\\/videoportal\\/Film\\/c_450000\\/454795\\/format551482.mp4","_filesize":""}]',
				'duration' => '00:48:29',
				'image' => '[{"_resolution":"384xNaN","_url":"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/23\\/00\\/35\\/08\\/1222470096\\/16x9\\/384"}]',
				'station' => 'Das Erste',
				'created_at' => '2014-08-18 15:31:56',
				'updated_at' => '2014-08-18 15:31:56',
				'playlist_id' => 1,
				'user_id' => NULL,
			),
			8 => 
			array (
				'id' => 90,
				'title' => 'Also sprach Cissé',
				'subtitle' => 'Die Tabelle steht fest',
				'details' => 'Der Blickpunkt Sport-Kult-Taxifahrer kennt die Ergebnisse bereits.
Moderation:
Markus Othmer

Autor:
Blickpunkt Sport

Redaktion:
Marianne Kreuzer



Moderation:
Markus Othmer

Autor:
Blickpunkt Sport

Redaktion:
Marianne Kreuzer


',
				'airtime' => '1970-01-01 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_0.mp4","_filesize":"977155"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_A.mp4","_filesize":"1394919"},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_B.mp4","_filesize":"5804057"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_C.mp4","_filesize":"11791891"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_E.mp4","_filesize":"7838493"}]',
				'duration' => '00:01:00',
				'image' => '[{"_resolution":"640x360","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-360_v-image853_w-640_-32550a25a71f9ea6a28488357c9b82d34bc5cc66.jpg?version=4886d"},{"_resolution":"400x255","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-225_v-image853_w-400_-46551a6ec6b42bcb6fc43f2cde7c015d39d126c0.jpg?version=4886d"},{"_resolution":"320x180","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-180_v-image853_w-320_-84bf43942cbaa96151d5c125e27e60633b3a04c9.jpg?version=4886d"},{"_resolution":"108x61","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-61_v-image853_w-108_-8bf23116f3f36b170c5e692a307c070a087283df.jpg?version=4886d"}]',
				'station' => 'BR',
				'created_at' => '2014-08-24 10:01:07',
				'updated_at' => '2014-08-24 10:01:07',
				'playlist_id' => 6,
				'user_id' => NULL,
			),
			9 => 
			array (
				'id' => 91,
				'title' => 'Also sprach Cissé',
				'subtitle' => 'Die Tabelle steht fest',
				'details' => 'Der Blickpunkt Sport-Kult-Taxifahrer kennt die Ergebnisse bereits.
Moderation:
Markus Othmer

Autor:
Blickpunkt Sport

Redaktion:
Marianne Kreuzer



Moderation:
Markus Othmer

Autor:
Blickpunkt Sport

Redaktion:
Marianne Kreuzer


',
				'airtime' => '1970-01-01 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_0.mp4","_filesize":"977155"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_A.mp4","_filesize":"1394919"},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_B.mp4","_filesize":"5804057"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_C.mp4","_filesize":"11791891"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/cdn-storage.br.de\\/MUJIuUOVBwQIbtCCBLzGiLC1uwQoNA4p_AZS\\/_AJS\\/_y4d5yF6\\/ed2ae961-bdf2-4486-9516-4c986f267a14_E.mp4","_filesize":"7838493"}]',
				'duration' => '00:01:00',
				'image' => '[{"_resolution":"640x360","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-360_v-image853_w-640_-32550a25a71f9ea6a28488357c9b82d34bc5cc66.jpg?version=4886d"},{"_resolution":"400x255","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-225_v-image853_w-400_-46551a6ec6b42bcb6fc43f2cde7c015d39d126c0.jpg?version=4886d"},{"_resolution":"320x180","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-180_v-image853_w-320_-84bf43942cbaa96151d5c125e27e60633b3a04c9.jpg?version=4886d"},{"_resolution":"108x61","_url":"http:\\/\\/www.br.de\\/fernsehen\\/bayerisches-fernsehen\\/sendungen\\/blickpunkt-sport\\/blickpunkt-sport-cisse-taxifahrer-bild-100~_h-61_v-image853_w-108_-8bf23116f3f36b170c5e692a307c070a087283df.jpg?version=4886d"}]',
				'station' => 'BR',
				'created_at' => '2014-08-24 10:01:08',
				'updated_at' => '2014-08-24 10:01:08',
				'playlist_id' => NULL,
				'user_id' => 2,
			),
			10 => 
			array (
				'id' => 92,
				'title' => 'Sportschau',
				'subtitle' => 'Atletico Madrid holt den Supercup',
				'details' => 'Atletico Madrid gewinnt im stadtinternen Duell den spanischen Supercup. Matchwinner des Spiels war der ehemalige Bayern-Spieler Mario Mandzukic mit dem entscheidenden Treffer zum 1:0, Toni Kroos blieb das Spiel über blass.',
				'airtime' => '2014-08-23 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/f4m","_quality":"auto","_url":"http:\\/\\/adaptiv.wdr.de\\/z\\/medstdp\\/ww\\/fsk0\\/50\\/505249\\/,505249_5275477,505249_5275478,505249_5275479,.mp4.csmil\\/manifest.f4m","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275480.mp4","_filesize":""},{"_basetype":"","_type":"rtmp\\/mp4","_quality":"1","_url":"rtmp:\\/\\/gffstream.fcod.llnwd.net\\/a792\\/e2\\/mp4:CMS2010\\/mdb\\/ondemand\\/weltweit\\/fsk0\\/50\\/505249\\/505249_5275479.mp4","_filesize":""},{"_basetype":"","_type":"rtmp\\/mp4","_quality":"2","_url":"rtmp:\\/\\/gffstream.fcod.llnwd.net\\/a792\\/e2\\/mp4:CMS2010\\/mdb\\/ondemand\\/weltweit\\/fsk0\\/50\\/505249\\/505249_5275477.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275480.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275479.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275478.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275477.mp4","_filesize":""}]',
				'duration' => '00:02:16',
				'image' => '[{"_resolution":"384x216","_url":"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/23\\/09\\/57\\/22\\/2123382625\\/16x9\\/384"}]',
				'station' => 'Das Erste',
				'created_at' => '2014-08-24 10:01:59',
				'updated_at' => '2014-08-24 10:01:59',
				'playlist_id' => NULL,
				'user_id' => 2,
			),
			11 => 
			array (
				'id' => 93,
				'title' => 'Sportschau',
				'subtitle' => 'Atletico Madrid holt den Supercup',
				'details' => 'Atletico Madrid gewinnt im stadtinternen Duell den spanischen Supercup. Matchwinner des Spiels war der ehemalige Bayern-Spieler Mario Mandzukic mit dem entscheidenden Treffer zum 1:0, Toni Kroos blieb das Spiel über blass.',
				'airtime' => '2014-08-23 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/f4m","_quality":"auto","_url":"http:\\/\\/adaptiv.wdr.de\\/z\\/medstdp\\/ww\\/fsk0\\/50\\/505249\\/,505249_5275477,505249_5275478,505249_5275479,.mp4.csmil\\/manifest.f4m","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275480.mp4","_filesize":""},{"_basetype":"","_type":"rtmp\\/mp4","_quality":"1","_url":"rtmp:\\/\\/gffstream.fcod.llnwd.net\\/a792\\/e2\\/mp4:CMS2010\\/mdb\\/ondemand\\/weltweit\\/fsk0\\/50\\/505249\\/505249_5275479.mp4","_filesize":""},{"_basetype":"","_type":"rtmp\\/mp4","_quality":"2","_url":"rtmp:\\/\\/gffstream.fcod.llnwd.net\\/a792\\/e2\\/mp4:CMS2010\\/mdb\\/ondemand\\/weltweit\\/fsk0\\/50\\/505249\\/505249_5275477.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275480.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275479.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275478.mp4","_filesize":""},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/ondemand-ww.wdr.de\\/medstdp\\/fsk0\\/50\\/505249\\/505249_5275477.mp4","_filesize":""}]',
				'duration' => '00:02:16',
				'image' => '[{"_resolution":"384x216","_url":"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/23\\/09\\/57\\/22\\/2123382625\\/16x9\\/384"}]',
				'station' => 'Das Erste',
				'created_at' => '2014-08-24 10:02:02',
				'updated_at' => '2014-08-24 10:02:02',
				'playlist_id' => 8,
				'user_id' => NULL,
			),
			12 => 
			array (
				'id' => 94,
				'title' => 'Rundschau',
				'subtitle' => 'Sendung vom 18.08.2014',
				'details' => 'Wann läuft die Rundschau? Aus der Rundschau-Redaktion kommen täglich zwei ausführliche, 15-minütige Rundschau-Sendungen um 16.45 und 18.45 Uhr. Täglich sendet auch das Rundschau-Magazin und wochentags zu später Stunde die Rundschau-Nacht. Montags bis freitags senden wir ferner zwischen 9.00 bis 15.00 Uhr fünf Ausgaben der 100-Sekunden-News.Die Sendezeiten im Einzelnen:Die Rundschau sehen Sie täglich um 16.45 und um 18.45 Uhr. Kurznachrichten in 100 Sekunden werden werktäglich gegen 9.00 Uhr, 10.05 Uhr, 12.10 Uhr, 13.30 Uhr und 15 Uhr ausgestrahlt.Das Rundschau-Magazin sehen Sie montags bis samstags um 21.45 Uhr und sonntags um 23.00 Uhr.Die Rundschau-Nacht bringt Sie am Montag und Donnerstag in der Regel um 00.00 Uhr auf den neuesten Stand, am Dienstag und Freitag um ca. 00.15 Uhr sowie am Mittwoch um 00.30 Uhr.
Autor:
Rundschau

Redaktion:
Anja Miller



Autor:
Rundschau

Redaktion:
Anja Miller


',
				'airtime' => '1970-01-01 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_0.mp4","_filesize":"16371737"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_A.mp4","_filesize":"23121541"},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_B.mp4","_filesize":"97598972"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_C.mp4","_filesize":"195587273"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_E.mp4","_filesize":"130904719"}]',
				'duration' => '00:14:00',
				'image' => '[{"_resolution":"640x360","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-360_v-image853_w-640_-32550a25a71f9ea6a28488357c9b82d34bc5cc66.jpg?version=0c2ef"},{"_resolution":"400x255","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-225_v-image853_w-400_-46551a6ec6b42bcb6fc43f2cde7c015d39d126c0.jpg?version=0c2ef"},{"_resolution":"320x180","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-180_v-image853_w-320_-84bf43942cbaa96151d5c125e27e60633b3a04c9.jpg?version=0c2ef"},{"_resolution":"108x61","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-61_v-image853_w-108_-8bf23116f3f36b170c5e692a307c070a087283df.jpg?version=0c2ef"}]',
				'station' => 'BR',
				'created_at' => '2014-08-24 10:05:33',
				'updated_at' => '2014-08-24 10:05:33',
				'playlist_id' => NULL,
				'user_id' => 2,
			),
			13 => 
			array (
				'id' => 95,
				'title' => 'Rundschau',
				'subtitle' => 'Sendung vom 18.08.2014',
				'details' => 'Wann läuft die Rundschau? Aus der Rundschau-Redaktion kommen täglich zwei ausführliche, 15-minütige Rundschau-Sendungen um 16.45 und 18.45 Uhr. Täglich sendet auch das Rundschau-Magazin und wochentags zu später Stunde die Rundschau-Nacht. Montags bis freitags senden wir ferner zwischen 9.00 bis 15.00 Uhr fünf Ausgaben der 100-Sekunden-News.Die Sendezeiten im Einzelnen:Die Rundschau sehen Sie täglich um 16.45 und um 18.45 Uhr. Kurznachrichten in 100 Sekunden werden werktäglich gegen 9.00 Uhr, 10.05 Uhr, 12.10 Uhr, 13.30 Uhr und 15 Uhr ausgestrahlt.Das Rundschau-Magazin sehen Sie montags bis samstags um 21.45 Uhr und sonntags um 23.00 Uhr.Die Rundschau-Nacht bringt Sie am Montag und Donnerstag in der Regel um 00.00 Uhr auf den neuesten Stand, am Dienstag und Freitag um ca. 00.15 Uhr sowie am Mittwoch um 00.30 Uhr.
Autor:
Rundschau

Redaktion:
Anja Miller



Autor:
Rundschau

Redaktion:
Anja Miller


',
				'airtime' => '1970-01-01 00:00:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_0.mp4","_filesize":"16371737"},{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_A.mp4","_filesize":"23121541"},{"_basetype":"","_type":"video\\/mp4","_quality":"1","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_B.mp4","_filesize":"97598972"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_C.mp4","_filesize":"195587273"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/cdn-storage.br.de\\/iLCpbHJGNLT6NK9HsLo6s61luK4C_2rc5U1S\\/_-dS\\/5-vf5-g6\\/44d547ce-f426-45a7-b085-48e4a1a1ff17_E.mp4","_filesize":"130904719"}]',
				'duration' => '00:14:00',
				'image' => '[{"_resolution":"640x360","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-360_v-image853_w-640_-32550a25a71f9ea6a28488357c9b82d34bc5cc66.jpg?version=0c2ef"},{"_resolution":"400x255","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-225_v-image853_w-400_-46551a6ec6b42bcb6fc43f2cde7c015d39d126c0.jpg?version=0c2ef"},{"_resolution":"320x180","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-180_v-image853_w-320_-84bf43942cbaa96151d5c125e27e60633b3a04c9.jpg?version=0c2ef"},{"_resolution":"108x61","_url":"http:\\/\\/www.br.de\\/layout\\/img\\/programmfahne\\/sendungsbild-rundschau-106~_h-61_v-image853_w-108_-8bf23116f3f36b170c5e692a307c070a087283df.jpg?version=0c2ef"}]',
				'station' => 'BR',
				'created_at' => '2014-08-24 10:05:36',
				'updated_at' => '2014-08-24 10:05:36',
				'playlist_id' => 6,
				'user_id' => NULL,
			),
		));
	}

}
