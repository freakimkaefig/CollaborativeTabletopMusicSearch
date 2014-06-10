/*
 *    MediathekView
 *    Copyright (C) 2008 - 2012     W. Xaver
 *                              &   thausherr
 * 
 *    W.Xaver[at]googlemail.com
 *    http://zdfmediathk.sourceforge.net/
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

import msearch.filmeSuchen.MSFilmeSuchen;
import msearch.io.MSGetUrl;
import msearch.daten.MSConfig;
import msearch.daten.DatenFilm;
import msearch.tool.MSConst;
import msearch.tool.MSLog;
import msearch.tool.MSStringBuilder;

public class MediathekRbb extends MediathekReader implements Runnable {

    public static final String SENDER = "RBB";
    final static String ROOTADR = "http://mediathek.rbb-online.de";

    public MediathekRbb(MSFilmeSuchen ssearch, int startPrio) {
        super(ssearch, /* name */ SENDER, /* threads */ 2, /* urlWarten */ 500, startPrio);
    }

    @Override
    void addToList() {
        int pos1 = 0;
        int pos2;
        MSStringBuilder seite1 = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);
        MSStringBuilder seite2 = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);
        final String ADRESSE = "http://mediathek.rbb-online.de/fernsehen";
        final String ITEM_1 = "<a href=\"/rbb/servlet/ajax-cache/";
        final String ITEM_URL = "http://mediathek.rbb-online.de/rbb/servlet/ajax-cache/";
        final String ROOTADRESSE = "http://mediathek.rbb-online.de/sendung/";
        meldungStart();
        try {
            seite1 = getUrlIo.getUri_Utf(nameSenderMReader, ADRESSE, seite1, "");
            while ((pos1 = seite1.indexOf(ITEM_1, pos1)) != -1) {
                pos1 = pos1 + ITEM_1.length();
                if ((pos2 = seite1.indexOf("\"", pos1)) != -1) {
                    String url = ITEM_URL + seite1.substring(pos1, pos2).replace("view=switch", "view=list");
                    if (!url.equals("")) {
                        seite2 = getUrlIo.getUri_Utf(nameSenderMReader, url, seite2, "");
                        int lpos1 = 0;
                        int lpos2;
                        final String LIST_ITEM = "<a href=\"/sendung/";
                        while ((lpos1 = seite2.indexOf(LIST_ITEM, lpos1)) != -1) {
                            lpos1 = lpos1 + LIST_ITEM.length();                            lpos2 = seite2.indexOf("\"", lpos1);
                            String listurl = ROOTADRESSE + seite2.substring(lpos1, lpos2);
                            if (!listurl.equals("")) {
                                String[] add = new String[]{listurl, ""};
                                listeThemen.addUrl(add);
                            }
                        }
                    }
                } else {
                    MSLog.fehlerMeldung(-894562036, MSLog.FEHLER_ART_MREADER, "MediathekRBB.addToList", "keine URL");
                }
            }
        } catch (Exception ex) {
            MSLog.fehlerMeldung(-398214058, MSLog.FEHLER_ART_MREADER, "MediathekRBB.addToList", ex);
        }
        if (MSConfig.getStop()) {
            meldungThreadUndFertig();
        } else if (listeThemen.size() == 0) {
            meldungThreadUndFertig();
        } else {
            meldungAddMax(listeThemen.size());
            listeSort(listeThemen, 1);
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
        private MSStringBuilder seite1 = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);
        private MSStringBuilder seite2 = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);
        private MSStringBuilder seite3 = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);

        @Override
        public void run() {
            try {
                meldungAddThread();
                String link[];
                while (!MSConfig.getStop() && (link = listeThemen.getListeThemen()) != null) {
                    meldungProgress(link[0]);
                    addFilme(link[0] /* url */);
                }
            } catch (Exception ex) {
                MSLog.fehlerMeldung(-794625882, MSLog.FEHLER_ART_MREADER, "MediathekRBB.ThemaLaden.run", ex);
            }
            meldungThreadUndFertig();
        }

        void addFilme(String url) {
            try {
                // Hierin nun einen RSS feed URL extrahieren
                final String RSS_ITEM = "<a href=\"/export/rss/";
                seite1.setLength(0);
                seite1 = getUrlIo.getUri_Utf(nameSenderMReader, url, seite1, "");
                int rpos = seite1.indexOf(RSS_ITEM);
                if (rpos > 0) {
                    int rpos1 = rpos + 9;
                    int rpos2 = seite1.indexOf("\"", rpos1);
                    String rssurl = ROOTADR + seite1.substring(rpos1, rpos2);

                    // Diesen RSS feed laden
                    seite2.setLength(0);
                    seite2 = getUrlIo.getUri_Utf(nameSenderMReader, rssurl, seite2, "");
                    rpos = 0;
                    int count = 0;
                    while ((rpos = seite2.indexOf("<link>", rpos)) != -1) {
                        if (!MSConfig.senderAllesLaden) {
                            // beim Update nur die neuesten Laden
                            ++count;
                            if (count > 10) {
                                break;
                            }
                        }
                        rpos1 = rpos + 6;
                        rpos2 = seite2.indexOf("</link>", rpos1);
                        String showurl = seite2.substring(rpos1, rpos2);

                        // Wir haben den URL der Sendung
                        seite3.setLength(0);
                        seite3 = getUrlIo.getUri_Utf(nameSenderMReader, showurl, seite3, "");

                        long durationInSeconds = extractDuration(seite3);
                        String description = extractDescription(seite3);
                        String[] keywords = extractKeywords(seite3);
                        String thumbnailUrl = extractThumbnailURL(seite3);
                        String imageUrl = extractImageURL(seite3);

                        meldung(showurl);

                        // Titel
                        int tpos = seite3.indexOf("<title>");
                        if (tpos > 0) {
                            int tpos2 = seite3.indexOf("</title>", tpos);
                            String title = seite3.substring(tpos + 7, tpos2);
                            // "rbb Mediathek: Bücher und Moor-Bücher und Moor (1/2013)-Donnerstag, 14.03.2013 | rbb Fernsehen"
                            title = title.replace("rbb Mediathek:", "").trim();
                            title = title.replace("| rbb Fernsehen", "").trim();
                            // "Bücher und Moor-Bücher und Moor (1/2013)-Donnerstag, 14.03.2013"
                            String datum = "";
                            if (title.length() > 12) {
                                datum = title.substring(title.length() - 10, title.length());
                            }
                            String thema = "";
                            if (title.contains("-")) {
                                thema = title.substring(0, title.indexOf("-")).trim();
                                title = title.substring(thema.length() + 1).trim();
                            }
                            if (title.contains("-")) {
                                title = title.substring(0, title.indexOf("-")).trim();
                            } else {
                                title = "";
                            }
//                            title = title.substring(15); // " rbb Mediathek: " abschneiden
//                            String datum = title.substring(title.length() - 26, title.length() - 16);
//                            String thema = title.substring(0, title.indexOf(" - "));
//                            title = title.substring(title.indexOf(" - ") + 3, title.indexOf(" - ", thema.length() + 3));
                            int mpos, mpos2;
                            String urlRtmp = "";
                            String urlOrg = "";
                            String filmurl = "";
                            if ((mpos = seite3.indexOf("mp4:")) != -1) {
                                if ((mpos2 = seite3.indexOf("\"", mpos)) != -1) {
                                    filmurl = seite3.substring(mpos, mpos2);
                                    urlRtmp = "--host ondemand.rbb-online.de --app ondemand/ --playpath " + filmurl;
                                    urlOrg = addsUrl("rtmp://ondemand.rbb-online.de/ondemand/", filmurl);
                                }
                            }
                            String urlMp4 = "";
                            int pos1, pos2;
                            if ((pos1 = seite3.indexOf("http://http-stream")) != -1) {
                                pos1 += "http://http-stream".length();
                                if ((pos2 = seite3.indexOf("\"", pos1)) != -1) {
                                    urlMp4 = "http://http-stream" + seite3.substring(pos1, pos2);
                                }
                            }
                            if (urlMp4.isEmpty() && filmurl.isEmpty()) {
                                MSLog.fehlerMeldung(-316498587, MSLog.FEHLER_ART_MREADER, "MediathekRBB.addFilme", "keine URL für: " + showurl);
                            } else if (urlMp4.isEmpty()) {
                                // DatenFilm film = new DatenFilm(nameSenderMReader, thema, showurl, title, urlOrg, urlRtmp, datum, ""/* zeit */);
                                DatenFilm film = new DatenFilm(nameSenderMReader, thema, showurl, title, urlOrg, urlRtmp,
                                        datum, ""/* zeit */, durationInSeconds, description,   imageUrl.isEmpty() ? thumbnailUrl : imageUrl, keywords);
                                addFilm(film);
                            } else {
                                DatenFilm film = new DatenFilm(nameSenderMReader, thema, showurl, title, urlMp4, "" /*urlRtmp*/,
                                        datum, ""/* zeit */, durationInSeconds, description,   imageUrl.isEmpty() ? thumbnailUrl : imageUrl, keywords);
                                addFilm(film);
                            }
                        }
                        rpos = rpos2; // hinter Element gehts weiter
                    }
                }
            } catch (Exception ex) {
                MSLog.fehlerMeldung(-934670894, MSLog.FEHLER_ART_MREADER, "MediathekRBB.addFilme", ex);
            }
        }

        private long extractDuration(MSStringBuilder page) {
            String duration = extractString(page, "<meta property=\"video:duration\" content=\"", "\"");
            if (duration == null) {
                return 0;
            }
            try {
                return Long.parseLong(duration);
            } catch (Exception ex) {
                MSLog.fehlerMeldung(-200145787, MSLog.FEHLER_ART_MREADER, "MediathekRBB.extractDuration", ex);
                return 0;
            }
        }

        private String extractDescription(MSStringBuilder page) {
            String desc = extractString(page, "<meta property=\"og:description\" content=\"", "\"");
            if (desc == null) {
                return "";
            }

            return desc;
        }

        private String[] extractKeywords(MSStringBuilder page) {
            String keywords = extractString(page, "<meta name=\"keywords\" content=\"", "\"");
            if (keywords == null) {
                return new String[]{""};
            }

            return keywords.split(", ");
        }

        private String extractThumbnailURL(MSStringBuilder page) {
            return extractString(page, "<meta itemprop=\"thumbnailURL\" content=\"", "\"");
        }

        private String extractImageURL(MSStringBuilder page) {
            return extractString(page, " <meta property=\"og:image\" content=\"", "\"");
        }

        private String extractString(MSStringBuilder source, String startMarker, String endMarker) {
            int start = source.indexOf(startMarker);
            if (start == -1) {
                return null;
            }

            start = start + startMarker.length();

            int end = source.indexOf(endMarker, start);
            if (end == -1) {
                return null;
            }

            return source.substring(start, end);
        }
    }
}