/*
 * MediathekView
 * Copyright (C) 2008 W. Xaver
 * W.Xaver[at]googlemail.com
 * http://zdfmediathk.sourceforge.net/
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package msearch.filmeSuchen.sender;

import msearch.daten.DatenFilm;
import msearch.daten.MSConfig;
import msearch.filmeSuchen.MSFilmeSuchen;
import msearch.io.MSGetUrl;
import msearch.tool.DatumZeit;
import msearch.tool.MSConst;
import msearch.tool.MSLog;
import msearch.tool.MSStringBuilder;

public class MediathekSrfPod extends MediathekReader implements Runnable {

    //public static final String SENDER = "SF.Podcast";
    public static final String SENDER = "SRF.Podcast";
    private MSStringBuilder seite = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);

    public MediathekSrfPod(MSFilmeSuchen ssearch, int startPrio) {
        super(ssearch, /* name */ SENDER, /* threads */ 2, /* urlWarten */ 1000, startPrio);
    }

    @Override
    public void addToList() {
        //Liste von http://www.sf.tv/podcasts/index.php holen
        //http://www.podcast.sf.tv/Podcasts/al-dente
        // class="" href="/Podcasts/al-dente" rel="2" >
        final String MUSTER_1 = "value=\"http://feeds.sf.tv/podcast";
        final String MUSTER_2 = "value=\"http://pod.drs.ch/";
        String addr1 = "http://www.srf.ch/podcasts";
        listeThemen.clear();
        meldungStart();
        seite = getUrlIo.getUri_Utf(nameSenderMReader, addr1, seite, "");
        int pos = 0;
        int pos1 = 0;
        int pos2 = 0;
        String url = "";
        while (!MSConfig.getStop() && (pos = seite.indexOf(MUSTER_1, pos)) != -1) {
            pos += MUSTER_1.length();
            pos1 = pos;
            pos2 = seite.indexOf("\"", pos);
            if (pos1 != -1 && pos2 != -1) {
                url = seite.substring(pos1, pos2);
                url = "http://feeds.sf.tv/podcast" + url;
            }
            if (url.equals("")) {
                MSLog.fehlerMeldung(-698875503, MSLog.FEHLER_ART_MREADER, "MediathekSfPod.addToList", "keine URL");
            } else {
                String[] add = new String[]{url, ""};
                listeThemen.addUrl(add);
            }
        }
        pos = 0;
        while (!MSConfig.getStop() && (pos = seite.indexOf(MUSTER_2, pos)) != -1) {
            pos += MUSTER_2.length();
            pos1 = pos;
            pos2 = seite.indexOf("\"", pos);
            if (pos1 != -1 && pos2 != -1) {
                url = seite.substring(pos1, pos2);
                url = "http://pod.drs.ch/" + url;
            }
            if (url.equals("")) {
                MSLog.fehlerMeldung(-698875503, MSLog.FEHLER_ART_MREADER, "MediathekSfPod.addToList", "keine URL");
            } else {
                String[] add = new String[]{url, ""};
                listeThemen.addUrl(add);
            }
        }
        if (MSConfig.getStop()) {
            meldungThreadUndFertig();
        } else if (listeThemen.size() == 0) {
            meldungThreadUndFertig();
        } else {
            meldungAddMax(listeThemen.size());
            for (int t = 0; t < maxThreadLaufen; ++t) {
                //new Thread(new ThemaLaden()).start();
                Thread th = new Thread(new ThemaLaden());
                th.setName(nameSenderMReader + t);
                th.start();
            }
        }
    }

    private class ThemaLaden implements Runnable {

        MSGetUrl getUrl = new MSGetUrl(wartenSeiteLaden);
        private MSStringBuilder seite = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);

        @Override
        public void run() {
            try {
                meldungAddThread();
                String link[];
                while (!MSConfig.getStop() && (link = listeThemen.getListeThemen()) != null) {
                    meldungProgress(link[0] /* url */);
                    addFilme(link[1], link[0] /* url */);
                }
            } catch (Exception ex) {
                MSLog.fehlerMeldung(-286931004, MSLog.FEHLER_ART_MREADER, "MediathekSfPod.SfThemaLaden.run", ex);
            }
            meldungThreadUndFertig();
        }

        void addFilme(String thema, String strUrlFeed) {
            //<title>al dente - Podcasts - Schweizer Fernsehen</title>
            // <h2 class="sf-hl1">al dente vom 28.06.2010</h2>
            // <li><a href="
            // <pubDate>Wed, 21 Nov 2012 00:02:00 +0100</pubDate>
            final String MUSTER_THEMA_1 = "<title>";
            final String MUSTER_THEMA_2 = "</title>";
            final String MUSTER_URL_1 = "url=\"http://";
            final String MUSTER_DATE = "<pubDate>";
            final String MUSTER_DURATION = "<itunes:duration>";
            final String MUSTER_DESCRIPTION = "<itunes:summary>";
            final String MUSTER_IMAGE = "<itunes:image href=\"";
            final String MUSTER_KEYWORDS = "<itunes:keywords>";
            int pos = 0, pos1;
            int pos2;
            String titel;
            String url = "";
            String datum, zeit;
            long duration = 0;
            String description = "";
            String image = "";
            String[] keywords = {};
            try {
                meldung(strUrlFeed);
                seite = getUrl.getUri_Utf(nameSenderMReader, strUrlFeed, seite, "Thema: " + thema);
                if ((pos1 = seite.indexOf(MUSTER_THEMA_1)) != -1) {
                    pos1 = pos1 + MUSTER_THEMA_1.length();
                }
                if ((pos2 = seite.indexOf(MUSTER_THEMA_2, pos1)) != -1) {
                    thema = seite.substring(pos1, pos2).trim();
//                        if (thema.contains(" ")) {
//                            thema = thema.substring(0, thema.indexOf(" "));
//                        }
                }
                // Image of show (unfortunatly we do not have an custom image for each entry
                // <itunes:image href="http://api-internet.sf.tv/xmlservice/picture/1.0/vis/videogroup/c3d7c0d6-5250-0001-a1ac-edeb183b17d8/0003" />
                int pos3 = seite.indexOf(MUSTER_IMAGE);
                if (pos3 != -1) {
                    pos3 += MUSTER_IMAGE.length();
                    int pos4 = seite.indexOf("\"", pos3);
                    if (pos4 != -1) {
                        image = seite.substring(pos3, pos4);
                    }
                }
                while ((pos = seite.indexOf(MUSTER_THEMA_1, pos)) != -1) { //start der Einträge, erster Eintrag ist der Titel
                    pos += MUSTER_THEMA_1.length();
                    pos1 = pos;
                    int pos5 = 0;
                    String d = "";
                    if ((pos5 = seite.indexOf(MUSTER_DURATION, pos)) != -1) {
                        pos5 += MUSTER_DURATION.length();
                        if ((pos2 = seite.indexOf("</", pos5)) != -1) {
                            d = seite.substring(pos5, pos2);
                            if (!d.isEmpty()) {
                                try {
                                    if (d.contains(".")) {
                                        d = d.replace(".", ""); // sind dann ms
                                        duration = Long.parseLong(d);
                                        duration = duration / 1000;
                                    } else if (d.contains(":")) {
                                        duration = 0;
                                        String[] parts = d.split(":");
                                        long power = 1;
                                        for (int i = parts.length - 1; i >= 0; i--) {
                                            duration += Long.parseLong(parts[i]) * power;
                                            power *= 60;
                                        }
                                    } else {
                                        // unfortunately the duration tag can be empty :-(
                                        duration = Long.parseLong(d);
                                    }
                                } catch (Exception ex) {
                                    MSLog.fehlerMeldung(-915263987, MSLog.FEHLER_ART_MREADER, "MediathekSfPod.addFilme", "d: " + d);
                                }
                            }
                        }
                    }
                    if (duration == 0) {
                        if (!d.equals("0")) {
                            MSLog.fehlerMeldung(-915159637, MSLog.FEHLER_ART_MREADER, "MediathekSfPod.addFilme", "keine Dauer");
                        }
                    }
                    if ((pos5 = seite.indexOf(MUSTER_DESCRIPTION, pos)) != -1) {
                        pos5 += MUSTER_DESCRIPTION.length();
                        if ((pos2 = seite.indexOf("</", pos5)) != -1) {
                            description = seite.substring(pos5, pos2);
                        }
                    }
                    if ((pos5 = seite.indexOf(MUSTER_KEYWORDS, pos)) != -1) {
                        pos5 += MUSTER_KEYWORDS.length();
                        if ((pos2 = seite.indexOf("</", pos5)) != -1) {
                            String k = seite.substring(pos5, pos2);
                            if (k.length() > 0) {
                                keywords = k.split(",");
                                for (int i = 0; i < keywords.length; i++) {
                                    keywords[i] = keywords[i].trim();
                                }
                            }
                        }
                    }
                    if ((pos2 = seite.indexOf(MUSTER_THEMA_2, pos1)) != -1) {
                        titel = seite.substring(pos1, pos2).trim();
                        datum = "";
                        zeit = "";
                        int p1, p2;
                        if ((p1 = seite.indexOf(MUSTER_DATE, pos1)) != -1) {
                            p1 += MUSTER_DATE.length();
                            if ((p2 = seite.indexOf("<", p1)) != -1) {
                                String tmp = seite.substring(p1, p2);
                                datum = DatumZeit.convertDatum(tmp);
                                zeit = DatumZeit.convertTime(tmp);
                            }
                        }
                        if ((pos1 = seite.indexOf(MUSTER_URL_1, pos1)) != -1) {
                            pos1 += MUSTER_URL_1.length();
                            if ((pos2 = seite.indexOf("\"", pos1)) != -1) {
                                url = seite.substring(pos1, pos2);
                                url = "http://" + url;
                            }
                            if (url.equals("")) {
                                MSLog.fehlerMeldung(-463820049, MSLog.FEHLER_ART_MREADER, "MediathekSfPod.addFilme", "keine URL: " + strUrlFeed);
                            } else {
                                // public DatenFilm(String ssender, String tthema, String filmWebsite, String ttitel, String uurl, String datum, String zeit,
                                //      long duration, String description, String thumbnailUrl, String imageUrl, String[] keywords) {
                                addFilm(new DatenFilm(nameSenderMReader, thema, strUrlFeed, titel, url, ""/*rtmpURL*/, datum, zeit,
                                        duration, description, image, keywords));
                            }
                        }
                    }
                }
            } catch (Exception ex) {
                MSLog.fehlerMeldung(-496352007, MSLog.FEHLER_ART_MREADER, "MediathekSfPod.addFilme", ex);
            }
        }
    }
}
