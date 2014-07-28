-- MySQL dump 10.13  Distrib 5.6.16, for Win32 (x86)
--
-- Host: localhost    Database: mediathek_crawler
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `broadcasts`
--

DROP TABLE IF EXISTS `broadcasts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `broadcasts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `airtime` datetime NOT NULL,
  `url` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `duration` time NOT NULL,
  `image` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `station_id` int(10) unsigned NOT NULL,
  `playlist_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `broadcasts_station_id_foreign` (`station_id`),
  KEY `broadcasts_playlist_id_foreign` (`playlist_id`),
  KEY `broadcasts_user_id_foreign` (`user_id`),
  CONSTRAINT `broadcasts_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`),
  CONSTRAINT `broadcasts_station_id_foreign` FOREIGN KEY (`station_id`) REFERENCES `stations` (`id`),
  CONSTRAINT `broadcasts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `broadcasts`
--

LOCK TABLES `broadcasts` WRITE;
/*!40000 ALTER TABLE `broadcasts` DISABLE KEYS */;
INSERT INTO `broadcasts` VALUES (1,'Test Broadcast','2014-07-23 04:37:00','http://mediathek-crawler','12:00:00','http://mediathek-crawler','0000-00-00 00:00:00','0000-00-00 00:00:00',1,NULL,NULL);
INSERT INTO `broadcasts` VALUES (4,'Tagesschau','1900-12-25 07:12:11','[{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"0\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webs.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"1\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webm.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"2\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webml.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"0\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webs.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"1\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webm.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"2\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webml.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"3\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0722\\/TV-20140722-1513-2301.webl.h264.mp4\",\"_filesize\":\"\"}]','07:20:00','[{\"_resolution\":\"128x72\",\"_url\":\"http:\\/\\/mediathek.daserste.de\\/daserste\\/servlet\\/scaled\\/22\\/51\\/99\\/72\\/22519972-bild-xs16x9\"},{\"_resolution\":\"960x540\",\"_url\":\"http:\\/\\/mediathek.daserste.de\\/image\\/00\\/22\\/51\\/99\\/74\\/2028247919\\/16x9\\/960\"}]','2014-07-24 17:49:53','2014-07-24 17:49:53',1,NULL,1);
INSERT INTO `broadcasts` VALUES (5,'tagesschau, 12:00 Uhr','2024-07-20 14:00:00','[{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"0\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webs.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"1\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webm.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"2\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webml.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"0\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webs.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"1\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webm.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"2\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webml.h264.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"3\",\"_url\":\"http:\\/\\/media.tagesschau.de\\/video\\/2014\\/0724\\/TV-20140724-1226-5002.webl.h264.mp4\",\"_filesize\":\"\"}]','15:02:00','[{\"_resolution\":\"960x540\",\"_url\":\"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/22\\/55\\/11\\/78\\/2028247919\\/16x9\\/960\"}]','2014-07-25 07:14:54','2014-07-25 07:14:54',1,1,NULL);
INSERT INTO `broadcasts` VALUES (6,'Rennen und Religion','0000-00-00 00:00:00','[{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_436k_p9v11.mp4\",\"_filesize\":\"16510445\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_436k_p9v11.mp4\",\"_filesize\":\"16510445\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_189k_p7v11.mp4\",\"_filesize\":\"7610876\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1456k_p13v11.mp4\",\"_filesize\":\"53087073\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1456k_p13v11.mp4\",\"_filesize\":\"53087073\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_776k_p17v11.webm\",\"_filesize\":\"18344144\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_282k_p16v11.webm\",\"_filesize\":\"6886241\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/02\\/140216_pfarrer_son_1496k_p18v11.webm\",\"_filesize\":\"34859725\"}]','00:04:35','[{\"_resolution\":\"94x65\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg94x65blob\\/9241534\"},{\"_resolution\":\"173x120\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg173x120blob\\/9241522\"},{\"_resolution\":\"485x273\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg485x273blob\\/9241521\"},{\"_resolution\":\"276x155\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg276x155blob\\/9241531\"},{\"_resolution\":\"116x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg116x54blob\\/9241528\"},{\"_resolution\":\"116x88\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg116x88blob\\/9241533\"},{\"_resolution\":\"72x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg72x54blob\\/9241536\"},{\"_resolution\":\"476x176\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg476x176blob\\/9241525\"},{\"_resolution\":\"75x52\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg75x52blob\\/9241532\"},{\"_resolution\":\"476x268\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg476x268blob\\/9241523\"},{\"_resolution\":\"298x168\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg298x168blob\\/9241524\"},{\"_resolution\":\"236x133\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg236x133blob\\/9241535\"},{\"_resolution\":\"144x81\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg144x81blob\\/9241530\"},{\"_resolution\":\"644x363\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg644x363blob\\/9241527\"},{\"_resolution\":\"672x378\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg672x378blob\\/9241526\"},{\"_resolution\":\"404x227\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2088358\\/timg404x227blob\\/9241529\"}]','2014-07-25 07:30:21','2014-07-25 07:30:21',1,3,NULL);
INSERT INTO `broadcasts` VALUES (7,'Mehmet Scholl - \"Das ist nicht mehr mein Sport\"','2005-07-20 14:00:00','[{\"_basetype\":\"\",\"_type\":\"video\\/f4m\",\"_quality\":\"auto\",\"_url\":\"http:\\/\\/adaptiv.wdr.de\\/z\\/medstdp\\/de\\/fsk0\\/46\\/468100\\/,468100_4832880,468100_4832881,468100_4832883,.mp4.csmil\\/manifest.f4m\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"0\",\"_url\":\"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832882.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"1\",\"_url\":\"mp4:CMS2010\\/mdb\\/ondemand\\/de\\/fsk0\\/46\\/468100\\/468100_4832881.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"2\",\"_url\":\"mp4:CMS2010\\/mdb\\/ondemand\\/de\\/fsk0\\/46\\/468100\\/468100_4832880.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"0\",\"_url\":\"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832882.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"1\",\"_url\":\"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832881.mp4\",\"_filesize\":\"\"},{\"_basetype\":\"\",\"_type\":\"video\\/mp4\",\"_quality\":\"3\",\"_url\":\"http:\\/\\/ondemand-de.wdr.de\\/medstdp\\/fsk0\\/46\\/468100\\/468100_4832883.mp4\",\"_filesize\":\"\"}]','00:38:00','[{\"_resolution\":\"960x540\",\"_url\":\"http:\\/\\/www.ardmediathek.de\\/image\\/00\\/22\\/22\\/67\\/24\\/861531312\\/16x9\\/960\"}]','2014-07-25 07:34:14','2014-07-25 07:34:14',1,1,NULL);
INSERT INTO `broadcasts` VALUES (8,'Baurfeind assistiert Linda Zervakis -...','0000-00-00 00:00:00','[{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_436k_p9v11.mp4\",\"_filesize\":\"1711052\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_436k_p9v11.mp4\",\"_filesize\":\"1711052\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_189k_p7v11.mp4\",\"_filesize\":\"792221\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/podfiles.zdf.de\\/podcast\\/zdf_podcasts\\/diverse\\/0305_obenrumjob_bauerfeind_446k_p20v11.mp4\",\"_filesize\":\"1762823\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1456k_p13v11.mp4\",\"_filesize\":\"5507576\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1456k_p13v11.mp4\",\"_filesize\":\"5507576\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_776k_p17v11.webm\",\"_filesize\":\"1751755\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_282k_p16v11.webm\",\"_filesize\":\"685288\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/diverse\\/0305_obenrumjob_bauerfeind_1496k_p18v11.webm\",\"_filesize\":\"3418242\"}]','00:00:28','[{\"_resolution\":\"94x65\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg94x65blob\\/9591613\"},{\"_resolution\":\"173x120\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg173x120blob\\/9591601\"},{\"_resolution\":\"485x273\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg485x273blob\\/9591600\"},{\"_resolution\":\"276x155\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg276x155blob\\/9591610\"},{\"_resolution\":\"116x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg116x54blob\\/9591607\"},{\"_resolution\":\"116x88\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg116x88blob\\/9591612\"},{\"_resolution\":\"72x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg72x54blob\\/9591615\"},{\"_resolution\":\"476x176\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg476x176blob\\/9591604\"},{\"_resolution\":\"75x52\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg75x52blob\\/9591611\"},{\"_resolution\":\"476x268\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg476x268blob\\/9591602\"},{\"_resolution\":\"298x168\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg298x168blob\\/9591603\"},{\"_resolution\":\"236x133\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg236x133blob\\/9591614\"},{\"_resolution\":\"144x81\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg144x81blob\\/9591609\"},{\"_resolution\":\"644x363\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg644x363blob\\/9591606\"},{\"_resolution\":\"672x378\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg672x378blob\\/9591605\"},{\"_resolution\":\"404x227\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2141302\\/timg404x227blob\\/9591608\"}]','2014-07-25 10:28:08','2014-07-25 10:28:08',1,1,NULL);
INSERT INTO `broadcasts` VALUES (10,'Petersilie und Schnittlauch trennen!','0000-00-00 00:00:00','[{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_436k_p9v11.mp4\",\"_filesize\":\"11787635\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_436k_p9v11.mp4\",\"_filesize\":\"11787635\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_189k_p7v11.mp4\",\"_filesize\":\"5460859\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_1456k_p13v11.mp4\",\"_filesize\":\"37943538\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_1456k_p13v11.mp4\",\"_filesize\":\"37943538\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_776k_p17v11.webm\",\"_filesize\":\"14223889\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_282k_p16v11.webm\",\"_filesize\":\"5194399\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/06\\/140612_serviceL_mom_1496k_p18v11.webm\",\"_filesize\":\"25765984\"}]','00:03:17','[{\"_resolution\":\"94x65\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg94x65blob\\/9819820\"},{\"_resolution\":\"173x120\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg173x120blob\\/9821245\"},{\"_resolution\":\"485x273\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg485x273blob\\/9819807\"},{\"_resolution\":\"276x155\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg276x155blob\\/9819817\"},{\"_resolution\":\"116x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg116x54blob\\/9821248\"},{\"_resolution\":\"116x88\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg116x88blob\\/9819819\"},{\"_resolution\":\"72x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg72x54blob\\/9819822\"},{\"_resolution\":\"476x176\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg476x176blob\\/9821251\"},{\"_resolution\":\"75x52\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg75x52blob\\/9821252\"},{\"_resolution\":\"476x268\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg476x268blob\\/9821253\"},{\"_resolution\":\"298x168\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg298x168blob\\/9821254\"},{\"_resolution\":\"236x133\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg236x133blob\\/9821255\"},{\"_resolution\":\"144x81\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg144x81blob\\/9819816\"},{\"_resolution\":\"644x363\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg644x363blob\\/9821256\"},{\"_resolution\":\"672x378\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg672x378blob\\/9819812\"},{\"_resolution\":\"404x227\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2174786\\/timg404x227blob\\/9819815\"}]','2014-07-25 10:53:45','2014-07-25 10:53:45',1,NULL,1);
INSERT INTO `broadcasts` VALUES (18,'Trailer: \"Die letzte Fahrstunde\"','0000-00-00 00:00:00','[{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_436k_p9v11.mp4\",\"_filesize\":\"3695126\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_436k_p9v11.mp4\",\"_filesize\":\"3695126\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_189k_p7v11.mp4\",\"_filesize\":\"1709688\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_1456k_p13v11.mp4\",\"_filesize\":\"11929981\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_1456k_p13v11.mp4\",\"_filesize\":\"11929981\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_776k_p17v11.webm\",\"_filesize\":\"4038738\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_282k_p16v11.webm\",\"_filesize\":\"1531796\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/07\\/140717_trailer_fahrstunde_rhc_1496k_p18v11.webm\",\"_filesize\":\"7335324\"}]','00:01:01','[{\"_resolution\":\"94x65\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg94x65blob\\/10037338\"},{\"_resolution\":\"173x120\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg173x120blob\\/10037326\"},{\"_resolution\":\"485x273\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg485x273blob\\/10037325\"},{\"_resolution\":\"276x155\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg276x155blob\\/10037335\"},{\"_resolution\":\"116x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg116x54blob\\/10037332\"},{\"_resolution\":\"116x88\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg116x88blob\\/10037337\"},{\"_resolution\":\"72x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg72x54blob\\/10037340\"},{\"_resolution\":\"476x176\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg476x176blob\\/10037329\"},{\"_resolution\":\"75x52\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg75x52blob\\/10037336\"},{\"_resolution\":\"476x268\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg476x268blob\\/10037327\"},{\"_resolution\":\"298x168\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg298x168blob\\/10037328\"},{\"_resolution\":\"236x133\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg236x133blob\\/10037339\"},{\"_resolution\":\"144x81\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg144x81blob\\/10037334\"},{\"_resolution\":\"644x363\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg644x363blob\\/10037331\"},{\"_resolution\":\"672x378\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg672x378blob\\/10037330\"},{\"_resolution\":\"404x227\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2202432\\/timg404x227blob\\/10037333\"}]','2014-07-25 11:39:12','2014-07-25 11:39:12',1,NULL,1);
INSERT INTO `broadcasts` VALUES (19,'Strafzuschläge für Schwarzgeld steigen','0000-00-00 00:00:00','[{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_436k_p9v11.mp4\",\"_filesize\":\"7226522\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_436k_p9v11.mp4\",\"_filesize\":\"7226522\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_189k_p7v11.mp4\",\"_filesize\":\"3335515\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_1456k_p13v11.mp4\",\"_filesize\":\"23227464\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_1456k_p13v11.mp4\",\"_filesize\":\"23227464\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_776k_p17v11.webm\",\"_filesize\":\"7806183\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_282k_p16v11.webm\",\"_filesize\":\"2999996\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/none\\/zdf\\/14\\/05\\/140509_hass_hid_1496k_p18v11.webm\",\"_filesize\":\"13102208\"}]','00:02:00','[{\"_resolution\":\"94x65\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg94x65blob\\/9658559\"},{\"_resolution\":\"173x120\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg173x120blob\\/9658547\"},{\"_resolution\":\"485x273\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg485x273blob\\/9658546\"},{\"_resolution\":\"276x155\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg276x155blob\\/9658556\"},{\"_resolution\":\"116x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg116x54blob\\/9658553\"},{\"_resolution\":\"116x88\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg116x88blob\\/9658558\"},{\"_resolution\":\"72x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg72x54blob\\/9658561\"},{\"_resolution\":\"476x176\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg476x176blob\\/9658550\"},{\"_resolution\":\"75x52\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg75x52blob\\/9658557\"},{\"_resolution\":\"476x268\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg476x268blob\\/9658548\"},{\"_resolution\":\"298x168\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg298x168blob\\/9658549\"},{\"_resolution\":\"236x133\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg236x133blob\\/9658560\"},{\"_resolution\":\"144x81\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg144x81blob\\/9658555\"},{\"_resolution\":\"644x363\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg644x363blob\\/9658552\"},{\"_resolution\":\"672x378\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg672x378blob\\/9658551\"},{\"_resolution\":\"404x227\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2150698\\/timg404x227blob\\/9658554\"}]','2014-07-26 07:37:03','2014-07-26 07:37:03',1,1,NULL);
INSERT INTO `broadcasts` VALUES (20,'Völler: Lieber Biss als Wirbelbruch','0000-00-00 00:00:00','[{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_436k_p9v11.mp4\",\"_filesize\":\"28136419\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_436k_p9v11.mp4\",\"_filesize\":\"28136419\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_189k_p7v11.mp4\",\"_filesize\":\"13046897\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_1456k_p13v11.mp4\",\"_filesize\":\"90552823\"},{\"_basetype\":\"h264_aac_mp4_http_na_na\",\"_type\":\"video\\/mp4\",\"_quality\":\"\",\"_url\":\"http:\\/\\/rodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_1456k_p13v11.mp4\",\"_filesize\":\"90552823\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_776k_p17v11.webm\",\"_filesize\":\"33557754\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_282k_p16v11.webm\",\"_filesize\":\"12548137\"},{\"_basetype\":\"vp8_vorbis_webm_http_na_na\",\"_type\":\"video\\/webm\",\"_quality\":\"\",\"_url\":\"http:\\/\\/nrodl.zdf.de\\/de\\/zdf\\/14\\/07\\/140720_voeller_ssr_1496k_p18v11.webm\",\"_filesize\":\"58407670\"}]','00:07:51','[{\"_resolution\":\"94x65\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg94x65blob\\/10029383\"},{\"_resolution\":\"173x120\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg173x120blob\\/10029401\"},{\"_resolution\":\"485x273\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg485x273blob\\/10029402\"},{\"_resolution\":\"276x155\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg276x155blob\\/10029403\"},{\"_resolution\":\"116x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg116x54blob\\/10029387\"},{\"_resolution\":\"116x88\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg116x88blob\\/10029405\"},{\"_resolution\":\"72x54\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg72x54blob\\/10029406\"},{\"_resolution\":\"476x176\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg476x176blob\\/10029407\"},{\"_resolution\":\"75x52\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg75x52blob\\/10029391\"},{\"_resolution\":\"476x268\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg476x268blob\\/10029409\"},{\"_resolution\":\"298x168\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg298x168blob\\/10029410\"},{\"_resolution\":\"236x133\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg236x133blob\\/10029411\"},{\"_resolution\":\"144x81\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg144x81blob\\/10029414\"},{\"_resolution\":\"644x363\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg644x363blob\\/10029412\"},{\"_resolution\":\"672x378\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg672x378blob\\/10029413\"},{\"_resolution\":\"404x227\",\"_url\":\"http:\\/\\/www.zdf.de\\/ZDFmediathek\\/contentblob\\/2201196\\/timg404x227blob\\/10029415\"}]','2014-07-26 07:38:29','2014-07-26 07:38:29',1,NULL,1);
/*!40000 ALTER TABLE `broadcasts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_06_23_143654_setup',1);
INSERT INTO `migrations` VALUES ('2014_06_23_151541_relations',1);
INSERT INTO `migrations` VALUES ('2014_06_23_163836_add_testuser',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `playlists_user_foreign` (`user`),
  CONSTRAINT `playlists_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (1,'TestPlaylist','2014-07-23 19:06:13','2014-07-23 19:06:13',1);
INSERT INTO `playlists` VALUES (3,'noch','2014-07-25 07:29:55','2014-07-25 07:29:55',1);
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations`
--

DROP TABLE IF EXISTS `stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `logo` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations`
--

LOCK TABLES `stations` WRITE;
/*!40000 ALTER TABLE `stations` DISABLE KEYS */;
INSERT INTO `stations` VALUES (1,'Das Erste','http://www.daserste.de/mediasrc/img/tv/banner/daserste_logo_white.png','2014-07-08 10:56:04','2014-07-08 10:56:04');
INSERT INTO `stations` VALUES (2,'ZDF','http://www.zdf.de/ZDF/zdfportal/blob/24559496/6/data.jpg','2014-07-08 10:56:04','2014-07-08 10:56:04');
/*!40000 ALTER TABLE `stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `password_temp` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `active` int(11) NOT NULL,
  `remember_token` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','$2y$10$1F6zZz8fg6gwXTgHP8i4cePHkCncfhfTCd.NmYO3n8nePsn8nf6fa','','',1,'TA7tbqPdr85KYm1NRPSvNLPCGlY1KWkGmx2ABkFR3fMpI2dVMTgWgchqY2SX','2014-07-08 10:56:04','2014-07-25 08:15:50');
INSERT INTO `users` VALUES (2,'semmel-tobi@gmx.de','$2y$10$xgxBlGlXy5jKKVhczQYKe.0tlEP9w2Ou8fHRTtsvO6ZUp6UG5cuNW','','',1,'X29XjHK3AWupXMi7TU0ZGBztxH29jnjJ38ebAVxghr8CYGW4TshnIk9zY6uN','2014-07-22 08:20:43','2014-07-22 09:16:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-07-27 13:41:56
