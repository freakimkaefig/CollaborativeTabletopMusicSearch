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
package mediathek.controller;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import javax.swing.JFrame;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamReader;
import mediathek.daten.Daten;
import mediathek.daten.DatenAbo;
import mediathek.daten.DatenBlacklist;
import mediathek.daten.DatenDownload;
import mediathek.daten.DatenProg;
import mediathek.daten.DatenPset;
import mediathek.daten.ListeBlacklist;
import mediathek.daten.ListePset;
import mediathek.tool.GuiFunktionen;
import mediathek.tool.Konstanten;
import mediathek.tool.MVConfig;
import mediathek.tool.MVReplaceList;
import msearch.filmeLaden.DatenFilmlistenServer;
import msearch.filmeLaden.DatenUrlFilmliste;
import msearch.filmeLaden.MSFilmlistenSuchen;

public class IoXmlLesen {
    public boolean datenLesen(Daten daten, Path xmlFilePath) {
        boolean ret = false;
        if (Files.exists(xmlFilePath)) {
            int event;
            XMLInputFactory inFactory = XMLInputFactory.newInstance();
            inFactory.setProperty(XMLInputFactory.IS_COALESCING, Boolean.FALSE);
            DatenPset datenPset = null;
            try (InputStreamReader in = new InputStreamReader(Files.newInputStream(xmlFilePath), Konstanten.KODIERUNG_UTF)) {
                XMLStreamReader parser = inFactory.createXMLStreamReader(in);
                while (parser.hasNext()) {
                    event = parser.next();
                    if (event == XMLStreamConstants.START_ELEMENT) {
                        //String t = parser.getLocalName();
                        if (parser.getLocalName().equals(MVConfig.SYSTEM)) {
                            //System
                            getConfig(parser, MVConfig.SYSTEM, Daten.mVConfig, true);
                        } else if (parser.getLocalName().equals(DatenPset.PROGRAMMSET)) {
                            //Programmgruppen
                            datenPset = new DatenPset();
                            if (get(parser, DatenPset.PROGRAMMSET, DatenPset.COLUMN_NAMES_, datenPset.arr)) {
                                daten.listePset.add(datenPset);
                            }
                        } else if (parser.getLocalName().equals(DatenProg.PROGRAMM)) {
                            DatenProg datenProg = new DatenProg();
                            if (get(parser, DatenProg.PROGRAMM, DatenProg.COLUMN_NAMES_, datenProg.arr)) {
                                if (datenPset != null) {
                                    datenPset.addProg(datenProg);
                                }
                            }
                            //ende Programgruppen
                        } else if (parser.getLocalName().equals(MVReplaceList.REPLACELIST)) {
                            // Ersetzungstabelle
                            String[] sa = new String[MVReplaceList.MAX_ELEM];
                            if (get(parser, MVReplaceList.REPLACELIST, MVReplaceList.COLUMN_NAMES, sa)) {
                                Daten.mVReplaceList.liste.add(sa);
                            }
                        } else if (parser.getLocalName().equals(DatenAbo.ABO)) {
                            //Abo
                            DatenAbo datenAbo = new DatenAbo();
                            if (get(parser, DatenAbo.ABO, DatenAbo.COLUMN_NAMES, datenAbo.arr)) {
                                Daten.listeAbo.addAbo(datenAbo);
                            }
                        } else if (parser.getLocalName().equals(DatenDownload.DOWNLOAD)) {
                            //Downloads
                            DatenDownload d = new DatenDownload();
                            if (get(parser, DatenDownload.DOWNLOAD, DatenDownload.COLUMN_NAMES_, d.arr)) {
                                d.init();
                                Daten.listeDownloads.add(d);
                            }
                        } else if (parser.getLocalName().equals(DatenBlacklist.BLACKLIST)) {
                            //Blacklist
                            ListeBlacklist blacklist = Daten.listeBlacklist;
                            DatenBlacklist datenBlacklist = new DatenBlacklist();
                            if (get(parser, DatenBlacklist.BLACKLIST, DatenBlacklist.BLACKLIST_COLUMN_NAMES, datenBlacklist.arr)) {
                                blacklist.add(datenBlacklist);
                            }
                        } else if (parser.getLocalName().equals(MSFilmlistenSuchen.FILM_UPDATE_SERVER)) {
                            //Urls Filmlisten
                            DatenUrlFilmliste datenUrlFilmliste = new DatenUrlFilmliste();
                            if (get(parser, MSFilmlistenSuchen.FILM_UPDATE_SERVER, MSFilmlistenSuchen.FILM_UPDATE_SERVER_COLUMN_NAMES, datenUrlFilmliste.arr)) {
                                Daten.filmeLaden.getDownloadUrlsFilmlisten(false, false /*diffs*/).addWithCheck(datenUrlFilmliste);
                            }
                        } else if (parser.getLocalName().equals(DatenFilmlistenServer.FILM_LISTEN_SERVER)) {
                            //Filmlisteserver
                            DatenFilmlistenServer datenFilmlistenServer = new DatenFilmlistenServer();
                            if (get(parser, DatenFilmlistenServer.FILM_LISTEN_SERVER, DatenFilmlistenServer.FILM_LISTEN_SERVER_COLUMN_NAMES, datenFilmlistenServer.arr)) {
                                Daten.filmeLaden.getListeFilmlistnServer().add(datenFilmlistenServer);
                            }
                        }
                    }
                }
                parser.close();
                ret = true;
            } catch (Exception ex) {
                ret = false;
                Log.fehlerMeldung(392840096, Log.FEHLER_ART_PROG, "IoXml.xmlDatenLesen", ex);
            }
            Daten.listeDownloads.listeNummerieren();
            //ListeFilmUpdateServer aufbauen
            Daten.filmeLaden.getDownloadUrlsFilmlisten(false, false /*diffs*/).sort();
        }
        return ret;
    }

    public static boolean einstellungenExistieren() {
        Path xmlFilePath = Daten.getMediathekXmlFilePath();
        return Files.exists(xmlFilePath);
    }

    public static int[] importAboBlacklist(String datei, boolean abo, boolean black) {
        int[] found = new int[]{0, 0};
        try {
            int event;
            XMLInputFactory inFactory = XMLInputFactory.newInstance();
            inFactory.setProperty(XMLInputFactory.IS_COALESCING, Boolean.FALSE);
            XMLStreamReader parser;
            InputStreamReader in;
            in = new InputStreamReader(new FileInputStream(datei), Konstanten.KODIERUNG_UTF);
            parser = inFactory.createXMLStreamReader(in);
            while (parser.hasNext()) {
                event = parser.next();
                if (event == XMLStreamConstants.START_ELEMENT) {
                    //String t = parser.getLocalName();
                    if (abo && parser.getLocalName().equals(DatenAbo.ABO)) {
                        //Abo
                        DatenAbo datenAbo = new DatenAbo();
                        if (get(parser, DatenAbo.ABO, DatenAbo.COLUMN_NAMES, datenAbo.arr)) {
                            ++found[0];
                            Daten.listeAbo.addAbo(datenAbo);
                        }
                    } else if (black && parser.getLocalName().equals(DatenBlacklist.BLACKLIST)) {
                        //Blacklist
                        ListeBlacklist blacklist = Daten.listeBlacklist;
                        DatenBlacklist datenBlacklist = new DatenBlacklist();
                        if (get(parser, DatenBlacklist.BLACKLIST, DatenBlacklist.BLACKLIST_COLUMN_NAMES, datenBlacklist.arr)) {
                            ++found[1];
                            blacklist.add(datenBlacklist);
                        }
                    }
                }
            }
            in.close();
        } catch (Exception ex) {
            Log.fehlerMeldung(302045698, Log.FEHLER_ART_PROG, "IoXml.importAboBlacklist", ex);
        }
        if (found[0] > 0) {
            Daten.listeAbo.aenderungMelden();
        }
        return found;
    }

    public static ListePset importPset(JFrame parent, Daten dd, String dateiUrl, boolean log) {
        int timeout = 10000; //10 Sekunden
        try {
            if (GuiFunktionen.istUrl(dateiUrl)) {
                URLConnection conn;
                conn = new URL(dateiUrl).openConnection();
                conn.setConnectTimeout(timeout);
                conn.setReadTimeout(timeout);
                conn.setRequestProperty("User-Agent", Daten.getUserAgent());
                return importPset(parent, dd, conn.getInputStream(), log);
            } else {
                return importPset(parent, dd, new FileInputStream(dateiUrl), log);
            }
        } catch (Exception ex) {
            if (log) {
                Log.fehlerMeldung(630048926, Log.FEHLER_ART_PROG, "IoXml.importPset", ex);
            }
            return null;
        }
    }

    public static ListePset importPset(JFrame parent, Daten dd, InputStream inStream, boolean log) {
        DatenPset datenPset = null;
        ListePset liste = new ListePset();
        try {
            int event;
            XMLInputFactory inFactory = XMLInputFactory.newInstance();
            inFactory.setProperty(XMLInputFactory.IS_COALESCING, Boolean.FALSE);
            XMLStreamReader parser;
            InputStreamReader in;
            in = new InputStreamReader(inStream, Konstanten.KODIERUNG_UTF);
            parser = inFactory.createXMLStreamReader(in);
            while (parser.hasNext()) {
                event = parser.next();
                if (event == XMLStreamConstants.START_ELEMENT) {
                    //String t = parser.getLocalName();
                    if (parser.getLocalName().equals(DatenPset.PROGRAMMSET)) {
                        datenPset = new DatenPset();
                        if (!get(parser, DatenPset.PROGRAMMSET, DatenPset.COLUMN_NAMES_, datenPset.arr, false)) {
                            datenPset = null;
                        } else {
                            liste.add(datenPset);
                        }
                    } else if (parser.getLocalName().equals(DatenProg.PROGRAMM)) {
                        if (datenPset != null) {
                            DatenProg datenProg = new DatenProg();
                            if (get(parser, DatenProg.PROGRAMM, DatenProg.COLUMN_NAMES_, datenProg.arr, false)) {
                                datenPset.addProg(datenProg);
                            }
                        }
                    }
                }
            }
            in.close();
        } catch (Exception ex) {
            if (log) {
                Log.fehlerMeldung(467810360, Log.FEHLER_ART_PROG, "IoXml.importPset", ex);
            }
            return null;
        }
        if (liste.isEmpty()) {
            return null;
        } else {
            // damit die Variablen ersetzt werden
            ListePset ll = new ListePset();
            ll.progMusterErsetzen(parent, dd, liste);
            return ll;
        }
    }

    public static ListePset importPsetText(JFrame parent, Daten dd, String text, boolean log) {
        DatenPset datenPset;
        ListePset liste = new ListePset();
        try {
            int event;
            XMLInputFactory inFactory = XMLInputFactory.newInstance();
            inFactory.setProperty(XMLInputFactory.IS_COALESCING, Boolean.FALSE);
            XMLStreamReader parser;
            InputStreamReader in = new InputStreamReader(new ByteArrayInputStream(text.getBytes()));
            parser = inFactory.createXMLStreamReader(in);
            while (parser.hasNext()) {
                event = parser.next();
                if (event == XMLStreamConstants.START_ELEMENT) {
                    //String t = parser.getLocalName();
                    if (parser.getLocalName().equals(DatenPset.PROGRAMMSET)) {
                        datenPset = new DatenPset();
                        if (!get(parser, DatenPset.PROGRAMMSET, DatenPset.COLUMN_NAMES_, datenPset.arr, false)) {
                            datenPset = null;
                        } else {
                            liste.add(datenPset);
                        }
//                    } else if (parser.getLocalName().equals(Konstanten__old.PROGRAMMGRUPPE_BUTTON)) {
//                        DatenPgruppe__old datenPgruppe__old = new DatenPgruppe__old();
//                        if (!get(parser, event, Konstanten__old.PROGRAMMGRUPPE_BUTTON, Konstanten__old.PROGRAMMGRUPPE_COLUMN_NAMES, datenPgruppe__old.arr, false)) {
//                            datenPset = null;
//                        } else {
//                            datenPset = datenPgruppe__old.getNewVersion();
//                            liste.add(datenPset);
//                        }
//                    } else if (parser.getLocalName().equals(DatenProg.PROGRAMM)) {
                        if (datenPset != null) {
                            DatenProg datenProg = new DatenProg();
                            if (get(parser, DatenProg.PROGRAMM, DatenProg.COLUMN_NAMES_, datenProg.arr, false)) {
                                datenPset.addProg(datenProg);
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            if (log) {
                Log.fehlerMeldung(100298325, Log.FEHLER_ART_PROG, "IoXml.importPset", ex);
            }
            return null;
        }
        if (liste.isEmpty()) {
            return null;
        } else {
            ListePset ll = new ListePset();
            ll.progMusterErsetzen(parent, dd, liste);
            return ll;
        }
    }

    // ##############################
    // private
    // ##############################
    private static boolean get(XMLStreamReader parser, String xmlElem, String[] xmlNames, String[] strRet) {
        return get(parser, xmlElem, xmlNames, strRet, true);
    }

    private static boolean get(XMLStreamReader parser, String xmlElem, String[] xmlNames, String[] strRet, boolean log) {
        boolean ret = true;
        int maxElem = strRet.length;
        for (int i = 0; i < maxElem; ++i) {
            if (strRet[i] == null) {
                // damit Vorgaben nicht verschwinden!
                strRet[i] = "";
            }
        }
        try {
            while (parser.hasNext()) {
                int event = parser.next();
                if (event == XMLStreamConstants.END_ELEMENT) {
                    if (parser.getLocalName().equals(xmlElem)) {
                        break;
                    }
                }
                if (event == XMLStreamConstants.START_ELEMENT) {
                    for (int i = 0; i < maxElem; ++i) {
                        if (parser.getLocalName().equals(xmlNames[i])) {
                            strRet[i] = parser.getElementText();
                            break;
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ret = false;
            if (log) {
                Log.fehlerMeldung(739530149, Log.FEHLER_ART_PROG, "IoXmlLesen.get", ex);
            }
        }
        return ret;
    }

    private static boolean getConfig(XMLStreamReader parser, String xmlElem, MVConfig mVConfig, boolean log) {
        boolean ret = true;
        try {
            while (parser.hasNext()) {
                int event = parser.next();
                if (event == XMLStreamConstants.END_ELEMENT) {
                    if (parser.getLocalName().equals(xmlElem)) {
                        break;
                    }
                }
                if (event == XMLStreamConstants.START_ELEMENT) {
                    String s = parser.getLocalName();
                    String n = parser.getElementText();
                    mVConfig.add(s, n);
                }
            }
        } catch (Exception ex) {
            ret = false;
            if (log) {
                Log.fehlerMeldung(945120369, Log.FEHLER_ART_PROG, "IoXmlLesen.getConfig", ex);
            }
        }
        return ret;
    }
}
