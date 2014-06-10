/*    
 *    MediathekView
 *    Copyright (C) 2008   W. Xaver
 *    W.Xaver[at]googlemail.com
 *    http://zdfmediathk.sourceforge.net/
 *    
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package mediathek.daten;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.LinkedList;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamReader;
import mediathek.controller.IoXmlLesen;
import mediathek.controller.Log;
import mediathek.file.GetFile;
import mediathek.gui.dialog.DialogOkCancel;
import mediathek.tool.Funktionen;
import mediathek.tool.GuiFunktionenProgramme;
import mediathek.tool.Konstanten;
import mediathek.tool.MVConfig;
import mediathek.tool.TModel;

public class ListePsetVorlagen extends LinkedList<String[]> {

    public static final String BS_WIN_32 = "Windows-32Bit";
    public static final String BS_WIN_64 = "Windows-64Bit";
    public static final String BS_LINUX = "Linux";
    public static final String BS_MAC = "Mac";
    public static final String[] BS = {"", BS_WIN_32, BS_WIN_64, BS_LINUX, BS_MAC};
    //
    public static final String PGR = "Vorlage";
    public static final String PGR_NAME = "Name";
    public static final int PGR_NAME_NR = 0;
    public static final String PGR_BESCHREIBUNG = "Beschreibung";
    public static final int PGR_BESCHREIBUNG_NR = 1;
    public static final String PGR_VERSION = "Version";
    public static final int PGR_VERSION_NR = 2;
    public static final String PGR_BS = "Bs";
    public static final int PGR_BS_NR = 3;
    public static final String PGR_URL = "URL";
    public static final int PGR_URL_NR = 4;
    public static final String PGR_INFO = "Info";
    public static final int PGR_INFO_NR = 5;
    public static final int PGR_MAX_ELEM = 6;
    public static final String[] PGR_COLUMN_NAMES = {PGR_NAME, PGR_BESCHREIBUNG, PGR_VERSION, PGR_BS, PGR_URL, PGR_INFO};
    private final static int TIMEOUT = 10000;

    public TModel getTModel(String bs) {
        LinkedList<String[]> tmp = new LinkedList<>();
        String[][] object;
        if (this.size() > 0) {
            if (!bs.equals("")) {
                for (int i = 0; i < this.size(); i++) {
                    if (this.get(i)[PGR_BS_NR].contains(bs)) {
                        tmp.add(this.get(i));
                    }
                }
                object = new String[tmp.size()][PGR_MAX_ELEM];
                for (int i = 0; i < tmp.size(); i++) {
                    object[i] = tmp.get(i);
                }
            } else {
                object = new String[this.size()][PGR_MAX_ELEM];
                for (int i = 0; i < this.size(); i++) {
                    object[i] = this.get(i);
                }
            }
            return new TModel(object, PGR_COLUMN_NAMES);
        } else {
            return new TModel(new Object[][]{}, PGR_COLUMN_NAMES);
        }
    }

    public boolean getListe() {
        try {
            this.clear();
            int event;
            XMLInputFactory inFactory = XMLInputFactory.newInstance();
            inFactory.setProperty(XMLInputFactory.IS_COALESCING, Boolean.FALSE);
            XMLStreamReader parser;
            InputStreamReader inReader;
            URLConnection conn;
            conn = new URL(Konstanten.ADRESSE_VORLAGE_PROGRAMMGRUPPEN).openConnection();
            conn.setRequestProperty("User-Agent", Daten.getUserAgent());
            conn.setReadTimeout(TIMEOUT);
            conn.setConnectTimeout(TIMEOUT);
            inReader = new InputStreamReader(conn.getInputStream(), Konstanten.KODIERUNG_UTF);
            parser = inFactory.createXMLStreamReader(inReader);
            while (parser.hasNext()) {
                event = parser.next();
                if (event == XMLStreamConstants.START_ELEMENT) {
                    if (parser.getLocalName().equals(PGR)) {
                        //wieder ein neuer Server, toll
                        String[] p = new String[PGR_MAX_ELEM];
                        get(parser, PGR, PGR_COLUMN_NAMES, p);
                        if (!p[PGR_URL_NR].equals("")) {
                            this.add(p);
                        }
                    }
                }
            }
        } catch (Exception ex) {
            Log.fehlerMeldung(398001963, Log.FEHLER_ART_PROG, "VorlageProgrammgruppen.getListe", ex);
            return false;
        }
        return true;
    }

    public static void getNeuVersionStandarset(JFrame parent, Daten ddaten, String bs) {
        ListePset listePsetStandard = getStandarset(parent, ddaten);
        SwingUtilities.invokeLater(new GetNeuVersion(parent, ddaten, bs, listePsetStandard));
    }

    private static class GetNeuVersion implements Runnable {

        Daten ddaten;
        String bs;
        ListePset listePsetStandard;
        JFrame parent;

        public GetNeuVersion(JFrame pparent, Daten dd, String bbs, ListePset llp) {
            ddaten = dd;
            bs = bbs;
            listePsetStandard = llp;
            parent = pparent;
        }

        @Override
        public synchronized void run() {
            String version = Daten.mVConfig.get(MVConfig.SYSTEM_VERSION_PROGRAMMSET);
            if (listePsetStandard != null) {
                if (ddaten.listePset.size() > 0) {
                    // ansonsten ist die Liste leer und dann gibts immer was
                    if (version.equals(listePsetStandard.version)) {
                        // dann passt alles
                        return;
                    } else {
                        String titel = "Das Standardset wurde aktualisert";
                        String text = "   ==================================================\n\n"
                                + "   Es gibt ein neues Standardset der Videoplayer\n"
                                + "   für den Download und das Abspielen der Filme\n"
                                + "   \n"
                                + "   Wenn bei Ihnen das Abspielen und Speichern aller Filme\n"
                                + "   klappt, brauchen Sie nichts ändern.\n"
                                + "   \n"
                                + "   \n"
                                + "   ==================================================\n"
                                + "   \n"
                                + "   Soll das neue Set installiert werden?\n"
                                + "   \n"
                                + "   ==================================================\n"
                                + "   \n"
                                + "   Die bestehenden Einstellungen werden nicht verändert.\n"
                                + "   Das neue Set muss dann erst noch in den\n"
                                + "   \"Einstellungen->Videoplayer\"\n"
                                + "   aktiviert werden\n"
                                + "   \n"
                                + "   \n"
                                + "   \n";
                        DialogOkCancel dialogOkCancel = new DialogOkCancel(parent, ddaten, true, titel, text);
                        dialogOkCancel.setVisible(true);
                        if (!dialogOkCancel.ok) {
                            if (!dialogOkCancel.morgen) {
                                // dann auch die Versionsnummer aktualisieren
                                Daten.mVConfig.add(MVConfig.SYSTEM_VERSION_PROGRAMMSET, listePsetStandard.version);
                            }
                            // dann halt nicht
                            return;
                        }
                    }
                }
                Daten.mVConfig.add(MVConfig.SYSTEM_VERSION_PROGRAMMSET, listePsetStandard.version);
                // die Zielpafade anpassen
                ListePset listePsetOrgSpeichern = ddaten.listePset.getListeSpeichern();
                if (listePsetOrgSpeichern.size() > 0) {
                    for (DatenPset ps : listePsetStandard.getListeSpeichern()) {
                        ps.arr[DatenPset.PROGRAMMSET_ZIEL_PFAD_NR] = listePsetOrgSpeichern.get(0).arr[DatenPset.PROGRAMMSET_ZIEL_PFAD_NR];
                        ps.arr[DatenPset.PROGRAMMSET_THEMA_ANLEGEN_NR] = listePsetOrgSpeichern.get(0).arr[DatenPset.PROGRAMMSET_THEMA_ANLEGEN_NR];
                        ps.arr[DatenPset.PROGRAMMSET_LAENGE_BESCHRAENKEN_NR] = listePsetOrgSpeichern.get(0).arr[DatenPset.PROGRAMMSET_LAENGE_BESCHRAENKEN_NR];
                        ps.arr[DatenPset.PROGRAMMSET_MAX_LAENGE_NR] = listePsetOrgSpeichern.get(0).arr[DatenPset.PROGRAMMSET_MAX_LAENGE_NR];
                    }
                }
                if (!ddaten.listePset.isEmpty()) {
                    // wenn leer, dann gibt immer die Neuen und die sind dann auch aktiv
                    for (DatenPset ps : listePsetStandard) {
                        // die bestehenden Sets sollen nicht gestört werden
                        ps.arr[DatenPset.PROGRAMMSET_IST_ABSPIELEN_NR] = Boolean.FALSE.toString();
                        ps.arr[DatenPset.PROGRAMMSET_IST_ABO_NR] = Boolean.FALSE.toString();
                        ps.arr[DatenPset.PROGRAMMSET_IST_BUTTON_NR] = Boolean.FALSE.toString();
                        ps.arr[DatenPset.PROGRAMMSET_IST_SPEICHERN_NR] = Boolean.FALSE.toString();
                    }
                }
                GuiFunktionenProgramme.addSetVorlagen(ddaten.mediathekGui, ddaten, listePsetStandard, true /*auto*/, true /*setVersion*/); // damit auch AddOns geladen werden
                ddaten.listePset.addPset(listePsetStandard);
            }
        }
    }

    public static ListePset getStandarset(JFrame parent, Daten ddaten) {
        ListePset pSet = null;
        String[] vorlage = null;
        ListePsetVorlagen lv = new ListePsetVorlagen();
        if (lv.getListe()) {
            for (String[] ar : lv) {
                if (ar[PGR_NAME_NR].equalsIgnoreCase("Standardset " + Funktionen.getOsString())) {
                    vorlage = ar;
                    break;
                }
            }
            if (vorlage != null) {
                if (!vorlage[PGR_URL_NR].equals("")) {
                    pSet = IoXmlLesen.importPset(parent, ddaten, vorlage[ListePsetVorlagen.PGR_URL_NR], true);
                    if (pSet != null) {
                        pSet.version = vorlage[PGR_VERSION_NR];
                    }
                }
            }
        }
        if (pSet == null) {
            // dann nehmen wir halt die im jar-File
            pSet = getStandardprogramme(parent, ddaten);
        }
        return pSet;
    }

    private static ListePset getStandardprogramme(JFrame parent, Daten ddaten) {
        // liefert das Standard Programmset für das entsprechende BS
        ListePset pSet;
        InputStream datei;
        switch (Funktionen.getOs()) {
            case Funktionen.OS_LINUX:
                datei = new GetFile().getPsetVorlageLinux();
                break;
            case Funktionen.OS_MAC:
                datei = new GetFile().getPsetVorlageMac();
                break;
            case Funktionen.OS_WIN_32BIT:
            case Funktionen.OS_WIN_64BIT:
            case Funktionen.OS_UNKNOWN:
            default:
                datei = new GetFile().getPsetVorlageWindows();
        }
        // Standardgruppen laden
        pSet = IoXmlLesen.importPset(parent, ddaten, datei, true);
        return pSet;
    }

    private boolean get(XMLStreamReader parser, String xmlElem, String[] xmlNames, String[] strRet) {
        boolean ret = true;
        int maxElem = strRet.length;
        for (int i = 0; i < maxElem; ++i) {
            strRet[i] = "";
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
            Log.fehlerMeldung(467256394, Log.FEHLER_ART_PROG, "VorlageProgrammgruppen.get", ex);
        }
        return ret;
    }
}
