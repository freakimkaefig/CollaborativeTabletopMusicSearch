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

import msearch.filmeSuchen.MSFilmeSuchen;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import msearch.daten.MSConfig;
import msearch.tool.MSLog;
import msearch.io.MSGetUrl;
import msearch.daten.DatenFilm;
import msearch.tool.MSGuiFunktionen;
import msearch.tool.MSConst;
import msearch.tool.MSStringBuilder;

/**
 *
 * @author
 */
public class MediathekHr extends MediathekReader implements Runnable {

    public static final String SENDER = "HR";
    private MSStringBuilder seite = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);
    private MSStringBuilder rubrikSeite = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);

    /**
     *
     * @param ssearch
     * @param startPrio
     */
    public MediathekHr(MSFilmeSuchen ssearch, int startPrio) {
        super(ssearch, /* name */ SENDER, /* threads */ 2, /* urlWarten */ 500, startPrio);
    }

    /**
     *
     */
    @Override
    public void addToList() {
        final String MUSTER = "sendEvent('load','";
        meldungStart();
        seite = getUrlIo.getUri_Utf(nameSenderMReader, "http://www.hr-online.de/website/fernsehen/sendungen/index.jsp", seite, "");
        int pos = 0;
        int pos1;
        int pos2;
        String url;
        //TH 7.8.2012 Erst suchen nach Rubrik-URLs, die haben Thema
        final String RUBRIK_MUSTER = "<option value=\"/website/fernsehen/sendungen/index.jsp?rubrik=";
        final String RUBRIK_PREFIX = "http://www.hr-online.de/website/fernsehen/sendungen/index.jsp?rubrik=";
        while ((pos = seite.indexOf(RUBRIK_MUSTER, pos)) != -1) {
            pos += RUBRIK_MUSTER.length();
            pos2 = seite.indexOf("\"", pos);
            if (pos2 != -1) {
                url = seite.substring(pos, pos2);
                if (!url.equals("")) {
                    url = RUBRIK_PREFIX + url;
                    bearbeiteRubrik(url);
                }
            } else {
                MSLog.fehlerMeldung(-456933258, MSLog.FEHLER_ART_MREADER, "MediathekHr.addToList-1", "keine URL");
            }
        }
        pos = 0;

        while ((pos = seite.indexOf(MUSTER, pos)) != -1) {
            pos += MUSTER.length();
            pos1 = pos;
            pos2 = seite.indexOf("'", pos);
            if (pos1 != -1 && pos2 != -1) {
                url = seite.substring(pos1, pos2);
                if (!url.equals("")) {
                    String[] add = new String[]{url, ""};
                    if (!istInListe(listeThemen, url, 0)) {
                        listeThemen.add(add);
                    }
                } else {
                    MSLog.fehlerMeldung(-203659403, MSLog.FEHLER_ART_MREADER, "MediathekHr.addToList-2", "keine URL");
                }
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

    //TH 7.8.2012 Suchen in Seite von Rubrik-URL
    // z.B. http://www.hr-online.de/website/fernsehen/sendungen/index.jsp?rubrik=2254
    private void bearbeiteRubrik(String rubrikUrl) {
        final String RUBRIK_PREFIX = "http://www.hr-online.de/website/fernsehen/sendungen/index.jsp?rubrik=";
        final String MUSTER = "\"http%3A%2F%2Fwww.hr-online.de%2Fwebsite%2Fincludes%2Fmedianew-playlist.xml.jsp%3Flogic%3Dstart_multimedia_document_logic";
        final String MUSTER_TITEL = "<meta property=\"og:title\" content=\"";

        rubrikSeite = getUrlIo.getUri_Iso(nameSenderMReader, rubrikUrl, rubrikSeite, "");
        int pos = 0;
        int pos2;
        String url;
        String thema = "";

        // 1. Titel (= Thema) holen
        if ((pos = rubrikSeite.indexOf(MUSTER_TITEL, pos)) != -1) {
            pos += MUSTER_TITEL.length();
            pos2 = rubrikSeite.indexOf("\"", pos);
            int ppos = rubrikSeite.indexOf("|", pos);
            if (ppos != -1 && ppos < pos2) {
                pos2 = ppos;
            }
            if (pos2 != -1) {
                thema = rubrikSeite.substring(pos, pos2).trim();
            }
        }

        // 2. suchen nach XML Liste       
        pos = 0;
        if ((pos = rubrikSeite.indexOf(MUSTER, pos)) != -1) {
            pos += MUSTER.length();
            pos2 = rubrikSeite.indexOf("\"", pos);
            if (pos2 != -1) {
                url = rubrikSeite.substring(pos, pos2);
                if (!url.equals("")) {
                    try {
                        url = java.net.URLDecoder.decode(MUSTER.substring(1) + url, "UTF-8");
                        String[] add = new String[]{
                            url, thema
                        };
                        if (!istInListe(listeThemen, url, 0)) {
                            listeThemen.add(add);
                        }
                    } catch (UnsupportedEncodingException ex) {
                    }
                } else {
                    MSLog.fehlerMeldung(-653210697, MSLog.FEHLER_ART_MREADER, "MediathekHr.bearbeiteRubrik", "keine URL");
                }
            }
        }

        // 3. Test: Suchen nach extra-Seite "Videos"
        final String MEDIA_MUSTER = "<li class=\"navi\"><a href=\"index.jsp?rubrik=";
        String videoUrl = null;
        pos = 0;
        if ((pos = rubrikSeite.indexOf(MEDIA_MUSTER, pos)) != -1) {
            pos += MEDIA_MUSTER.length();
            pos2 = rubrikSeite.indexOf("\"", pos);
            if (pos2 != -1) {
                String key = rubrikSeite.substring(pos, pos2);
                pos = pos2;
                if (rubrikSeite.substring(pos, pos + 36).equals("\" class=\"navigation\" title=\"Videos\">")) {
                    videoUrl = RUBRIK_PREFIX + key;
                }
            }
        }

        if (videoUrl == null) {
            return;
        }

        // 4. dort Verweise auf XML Einträge finden
        rubrikSeite = getUrlIo.getUri_Iso(nameSenderMReader, videoUrl, rubrikSeite, "");
        pos = 0;
        final String PLAYER_MUSTER = "<a href=\"mediaplayer.jsp?mkey=";
        while ((pos = rubrikSeite.indexOf(PLAYER_MUSTER, pos)) != -1) {
            pos += PLAYER_MUSTER.length();
            pos2 = rubrikSeite.indexOf("&", pos);
            if (pos2 != -1) {
                url = rubrikSeite.substring(pos, pos2);
                if (!url.equals("") && url.matches("[0-9]*")) {
                    url = "http://www.hr-online.de/website/includes/medianew.xml.jsp?key=" + url + "&xsl=media2rss-nocopyright.xsl";

                    String[] add = new String[]{
                        url, thema
                    };
                    if (!istInListe(listeThemen, url, 0)) {
                        listeThemen.add(add);
                    }
                }
                pos = pos2;
            }
        }
    }

    private class ThemaLaden implements Runnable {

        MSGetUrl getUrl = new MSGetUrl(wartenSeiteLaden);
        private MSStringBuilder seite1 = new MSStringBuilder(MSConst.STRING_BUFFER_START_BUFFER);
        //private MVStringBuilder seite2 = new MVStringBuilder();

        @Override
        public void run() {
            try {
                meldungAddThread();
                String link[];
                while (!MSConfig.getStop() && (link = listeThemen.getListeThemen()) != null) {
                    meldungProgress(link[0] /* url */);
                    seite.setLength(0);
                    addFilme(link[1], link[0] /* url */);
                }
            } catch (Exception ex) {
                MSLog.fehlerMeldung(-894330854, MSLog.FEHLER_ART_MREADER, "MediathekHr.ThemaLaden.run", ex, "");
            }
            meldungThreadUndFertig();
        }

        private void addFilme(String thema, String filmWebsite) {
            final String MUSTER_TITEL = "<title>"; //<title>alle wetter! vom 03.01.2011</title>
            final String MUSTER_URL_1 = "<jwplayer:streamer>";//<jwplayer:streamer>rtmp://gffstream.fcod.llnwd.net/a792/e4</jwplayer:streamer>
            final String MUSTER_URL_2 = "\" url=\"";//<media:content duration="00:29:42" type="video/mp4" url="mp4:flash/fs/hessenschau/20110103_1930" />

            final String MUSTER_URL = "type=\"video/mp4\" url=\"";
            final String MUSTER_ITEM_1 = "<item>";
            final String MUSTER_DATUM = "<pubDate>"; //<pubDate>03.01.2011</pubDate>
            final String MUSTER_THEMA = "<jwplayer:author>"; //TH 7.8.2012

            final String MUSTER_DURATION = "<media:content duration=\"";
            final String MUSTER_DURATION_END = "\"";
            final String MUSTER_DESCRIPTION = "<description>";
            final String MUSTER_DESCRIPTIO_END = "</description>";
            final String MUSTER_IMAGE = "<media:thumbnail url=\"";
            final String MUSTER_IMAGE_END = "\"";
            meldung(filmWebsite);
            seite1 = getUrl.getUri_Utf(nameSenderMReader, filmWebsite, seite1, "");
            try {
                int posItem1 = 0;
                int pos1;
                int pos2;
                String url = "", furl = "";
                String url1;
                String url2;
                String datum = "";
                String titel = "";
                long duration = 0;
                String description = "";
                String image = "";
                while (!MSConfig.getStop() && (posItem1 = seite1.indexOf(MUSTER_ITEM_1, posItem1)) != -1) {
                    posItem1 += MUSTER_ITEM_1.length();
                    if ((pos1 = seite1.indexOf(MUSTER_DURATION, posItem1)) != -1) {
                        pos1 += MUSTER_DURATION.length();
                        if ((pos2 = seite1.indexOf(MUSTER_DURATION_END, pos1)) != -1) {
                            String d = "";
                            try {
                                d = seite1.substring(pos1, pos2);
                                if (!d.equals("")) {
                                    duration = 0;
                                    String[] parts = d.split(":");
                                    long power = 1;
                                    for (int i = parts.length - 1; i >= 0; i--) {
                                        duration += Long.parseLong(parts[i]) * power;
                                        power *= 60;
                                    }
                                }
                            } catch (Exception ex) {
                                MSLog.fehlerMeldung(-708096931, MSLog.FEHLER_ART_MREADER, "MediathekHr.addFilm", "d: " + d);
                            }
                        }
                    }
                    description = seite1.extract(MUSTER_DESCRIPTION, MUSTER_DESCRIPTIO_END, posItem1);
                    image = seite1.extract(MUSTER_IMAGE, MUSTER_IMAGE_END, posItem1);
                    image = image.replaceAll("&amp;", "&");
                    datum = seite1.extract(MUSTER_DATUM, "<", posItem1);
                    titel = seite1.extract(MUSTER_TITEL, "<", posItem1);
                    //TH 7.8.2012 Falls Thema doch nicht belegt, dann in XML Datei nehmen (leider weniger zuverlässig)
                    if (thema.isEmpty()) {
                        thema = seite1.extract(MUSTER_THEMA, "<", posItem1);
                        if (thema.isEmpty()) {
                            thema = titel;
                        }
                    }
                    url = seite1.extract(MUSTER_URL, "\"", posItem1); // <media:content duration="00:01:21" type="video/mp4" url="http://www.hr.gl-systemhaus.de/video/fs/allgemein/20100909_onkelotto.mp4" />
                    if (url.isEmpty()) {
                        // auf die alte Art
                        if ((pos1 = seite1.indexOf(MUSTER_URL_1, posItem1)) == -1) {
                            return; // nix is
                        }
                        pos1 += MUSTER_URL_1.length();
                        if ((pos2 = seite1.indexOf("<", pos1)) == -1) {
                            return; // nix is
                        }
                        url1 = seite1.substring(pos1, pos2);
                        if (url1.equals("")) {
                            return; // nix is
                        }
                        if ((pos1 = seite1.indexOf(MUSTER_URL_2, pos2)) == -1) {
                            return; // nix is
                        }
                        pos1 += MUSTER_URL_2.length();
                        if ((pos2 = seite1.indexOf("\"", pos1)) != -1) {
                            url2 = seite1.substring(pos1, pos2);
                            url = addsUrl(url1, url2);
                            furl = "-r " + url + " -y " + url2;
                        }
                    }
                    if (!url.isEmpty()) {
                        if (datum.equals("")) {
                            datum = getDate(url);
                        }
                        // DatenFilm(String ssender, String tthema, String urlThema, String ttitel, String uurl, String uurlorg, String uurlRtmp, String datum, String zeit) {
                        //DatenFilm film = new DatenFilm(nameSenderMReader, thema, strUrlFeed, titel, url, furl, datum, "");
                        DatenFilm film = new DatenFilm(nameSenderMReader, thema, filmWebsite, titel, url, furl, datum, "", duration, description,
                                image, new String[]{});
                        addFilm(film);
                    } else {
                        MSLog.fehlerMeldung(-649882036, MSLog.FEHLER_ART_MREADER, "MediathekHr.addFilme", "keine URL");
                    }
                }
                if (url.isEmpty()) {
                    MSLog.fehlerMeldung(-761236458, MSLog.FEHLER_ART_MREADER, "MediathekHr.addFilme", "keine URL für: " + filmWebsite);
                }
            } catch (Exception ex) {
                MSLog.fehlerMeldung(-487774126, MSLog.FEHLER_ART_MREADER, "MediathekHr.addFilme", ex, "");
            }
        }

        private String getDate(String url) {
            String ret = "";
            try {
                String tmp = MSGuiFunktionen.getDateiName(url);
                if (tmp.length() > 8) {
                    tmp = tmp.substring(0, 8);
                    SimpleDateFormat sdfIn = new SimpleDateFormat("yyyyMMdd");
                    Date filmDate = sdfIn.parse(tmp);
                    SimpleDateFormat sdfOut;
                    sdfOut = new SimpleDateFormat("dd.MM.yyyy");
                    ret = sdfOut.format(filmDate);
                }
            } catch (Exception ex) {
                ret = "";
                MSLog.fehlerMeldung(-356408790, MSLog.FEHLER_ART_MREADER, "MediathekHr.getDate", "kein Datum");
            }
            return ret;
        }
    }
}
