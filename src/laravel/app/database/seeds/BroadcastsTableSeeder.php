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
			1 => 
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
			2 => 
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
			3 => 
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
			4 => 
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
			5 => 
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
			6 => 
			array (
				'id' => 277,
				'title' => '112 Hochzeiten',
			'subtitle' => ' (Dokumentarfilm)',
				'details' => 'Hochzeit – ein Bund fürs Leben? Worin besteht eigentlich der Sinn einer Eheschließung? Gerade im Hinblick auf die hohen Scheidungsraten unserer Tage erscheinen solche Fragen berechtigt. Der Dokumentarfilmer Doug Block geht der Realität auf den Grund, was sich nach der Hochzeit im gemeinsamen Leben der Ehepaare verändert und ob dies den einstigen Erwartungen entspricht.',
				'airtime' => '2014-08-22 22:35:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048583-000-A_EQ_1_VA_01433227_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048583-000-A_SQ_1_VA_01433229_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048583-000-A_HQ_1_VA_01433225_MP4-800_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '01:33:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1240687\\/W940H530\\/048583-000_112hochzeiten_02-1406879118417.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-29 14:44:47',
				'updated_at' => '2014-08-29 14:44:47',
				'playlist_id' => 27,
				'user_id' => NULL,
			),
			7 => 
			array (
				'id' => 278,
				'title' => '112 Hochzeiten',
			'subtitle' => ' (Dokumentarfilm)',
				'details' => 'Hochzeit – ein Bund fürs Leben? Worin besteht eigentlich der Sinn einer Eheschließung? Gerade im Hinblick auf die hohen Scheidungsraten unserer Tage erscheinen solche Fragen berechtigt. Der Dokumentarfilmer Doug Block geht der Realität auf den Grund, was sich nach der Hochzeit im gemeinsamen Leben der Ehepaare verändert und ob dies den einstigen Erwartungen entspricht.',
				'airtime' => '2014-08-22 22:35:00',
				'url' => '[{"_basetype":"","_type":"video\\/mp4","_quality":"0","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048583-000-A_EQ_1_VA_01433227_MP4-1500_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"3","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048583-000-A_SQ_1_VA_01433229_MP4-2200_AMM-HBBTV.mp4","_filesize":"0"},{"_basetype":"","_type":"video\\/mp4","_quality":"2","_url":"http:\\/\\/artestras.vo.llnwd.net\\/v2\\/am\\/HBBTV\\/048583-000-A_HQ_1_VA_01433225_MP4-800_AMM-HBBTV.mp4","_filesize":"0"}]',
				'duration' => '01:33:00',
				'image' => '[{"_resolution":"940x530","_url":"http:\\/\\/www.arte.tv\\/papi\\/tvguide\\/images\\/1240687\\/W940H530\\/048583-000_112hochzeiten_02-1406879118417.jpg"}]',
				'station' => 'ARTE',
				'created_at' => '2014-08-29 14:59:44',
				'updated_at' => '2014-08-29 14:59:44',
				'playlist_id' => NULL,
				'user_id' => 1,
			),
		));
	}

}
