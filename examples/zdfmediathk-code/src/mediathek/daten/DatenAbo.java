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

import mediathek.tool.GermanStringSorter;
import mediathek.controller.Log;
import msearch.daten.DatenFilm;

public class DatenAbo implements Comparable<DatenAbo> {
    //Tags Abo

    private static GermanStringSorter sorter = GermanStringSorter.getInstance();
    public static final String ABO = "Abonnement";
    public static final String ABO_NR = "Nr";
    public static final int ABO_NR_NR = 0;
    public static final String ABO_EINGESCHALTET = "aktiv";
    public static final int ABO_EINGESCHALTET_NR = 1;
    public static final String ABO_NAME = "Name";
    public static final int ABO_NAME_NR = 2;
    public static final String ABO_SENDER = DatenFilm.FILM_SENDER;
    public static final int ABO_SENDER_NR = 3;
    public static final String ABO_THEMA = DatenFilm.FILM_THEMA;
    public static final int ABO_THEMA_NR = 4;
    public static final String ABO_TITEL = DatenFilm.FILM_TITEL;
    public static final int ABO_TITEL_NR = 5;
    public static final String ABO_THEMA_TITEL = DatenFilm.FILM_THEMA + "-" + DatenFilm.FILM_TITEL;
    public static final int ABO_THEMA_TITEL_NR = 6;
    public static final String ABO_IRGENDWO = "Irgendwo";
    public static final int ABO_IRGENDWO_NR = 7;
    public static final String ABO_MINDESTDAUER = "Mindestdauer";
    public static final int ABO_MINDESTDAUER_NR = 8;
    public static final String ABO_ZIELPFAD = "Zielpfad";
    public static final int ABO_ZIELPFAD_NR = 9;
    public static final String ABO_DOWN_DATUM = "letztes_Abo";
    public static final int ABO_DOWN_DATUM_NR = 10;
    public static final String ABO_PSET = "Programmset";
    public static final int ABO_PSET_NR = 11;
    public static final int MAX_ELEM = 12;
    public static final String[] COLUMN_NAMES = {ABO_NR, ABO_EINGESCHALTET, ABO_NAME, ABO_SENDER, ABO_THEMA, ABO_TITEL, ABO_THEMA_TITEL,
        ABO_IRGENDWO, ABO_MINDESTDAUER, ABO_ZIELPFAD, ABO_DOWN_DATUM, ABO_PSET};
    //public static final String[] COLUMN_NAMES_ = COLUMN_NAMES;
    public int mindestdauerMinuten = 0;
    public static boolean[] spaltenAnzeigen = new boolean[MAX_ELEM];
    public String[] arr;
    public int nr = 0;

    public DatenAbo() {
        makeArr();
    }

    public DatenAbo(String name, String sender, String thema, String titel, String themaTitel, String irgendwo, int mmindestdauerMinuten, String ziel, String pset) {
        makeArr();
        arr[ABO_NAME_NR] = name;
        arr[ABO_SENDER_NR] = sender;
        arr[ABO_THEMA_NR] = thema;
        arr[ABO_TITEL_NR] = titel;
        arr[ABO_THEMA_TITEL_NR] = themaTitel;
        arr[ABO_IRGENDWO_NR] = irgendwo;
        setMindestDauerMinuten(mmindestdauerMinuten);
        arr[ABO_ZIELPFAD_NR] = ziel;
        arr[ABO_PSET_NR] = pset;
    }

    public DatenAbo getCopy() {
        DatenAbo ret = new DatenAbo();
        System.arraycopy(this.arr, 0, ret.arr, 0, arr.length);
        ret.mindestdauerMinuten = this.mindestdauerMinuten;
        return ret;
    }

    public final void setMindestDauerMinuten(int d) {
        mindestdauerMinuten = d;
        arr[ABO_MINDESTDAUER_NR] = String.valueOf(d);
    }

    public void setMindestDauerMinuten() {
        if (this.arr[DatenAbo.ABO_MINDESTDAUER_NR].equals("")) {
            // für den ProgUpdate
            mindestdauerMinuten = 0;
            arr[ABO_MINDESTDAUER_NR] = "0";
        }
        try {
            mindestdauerMinuten = Integer.parseInt(this.arr[DatenAbo.ABO_MINDESTDAUER_NR]);
        } catch (Exception ex) {
            Log.fehlerMeldung(462558700, Log.FEHLER_ART_PROG, "DatenAbo.setMindestDauerMinuten", ex);
            mindestdauerMinuten = 0;
            arr[ABO_MINDESTDAUER_NR] = "0";
        }
    }

    public boolean aboIstEingeschaltet() {
        if (arr[DatenAbo.ABO_EINGESCHALTET_NR].equals("")) {
            aboEin();
            return true;
        }
        return Boolean.parseBoolean(arr[DatenAbo.ABO_EINGESCHALTET_NR]);
    }

    public static boolean anzeigen(int i) {
        return spaltenAnzeigen == null || spaltenAnzeigen[i];
    }

/*
    public boolean toggleAboEinAus() {
        // Abo EinAus wird geändert und der Zustand NACH der Änderung
        // wird zurückgegeben
        if (arr[DatenAbo.ABO_EINGESCHALTET_NR].equals("")) {
            aboEin();
        }
        arr[DatenAbo.ABO_EINGESCHALTET_NR] = String.valueOf(!Boolean.parseBoolean(arr[DatenAbo.ABO_EINGESCHALTET_NR]));
        return Boolean.parseBoolean(arr[DatenAbo.ABO_EINGESCHALTET_NR]);
    }
*/

/*
    public void aboAus() {
        arr[DatenAbo.ABO_EINGESCHALTET_NR] = String.valueOf(false);
    }
*/

    public void aboEin() {
        arr[DatenAbo.ABO_EINGESCHALTET_NR] = String.valueOf(true);
    }

    public void aufMichKopieren(DatenAbo datenAbo) {
        System.arraycopy(datenAbo.arr, 0, arr, 0, arr.length);
        this.mindestdauerMinuten = datenAbo.mindestdauerMinuten;
    }

/*
    public String aboPfadAnhaengen(String pfad) {
        String ret = pfad;
        if (!arr[ABO_ZIELPFAD_NR].equals("")) {
            ret = GuiFunktionen.addsPfad(pfad, arr[ABO_ZIELPFAD_NR]);
        }
        return ret;
    }
*/

    private void makeArr() {
        arr = new String[MAX_ELEM];
        for (int i = 0; i < arr.length; ++i) {
            arr[i] = "";
        }
        // neue Abos sind immer ein
        aboEin();
    }

    @Override
    public int compareTo(DatenAbo arg0) {
        return sorter.compare(arr[ABO_NAME_NR], arg0.arr[ABO_NAME_NR]);
    }
}
