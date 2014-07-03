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
package msearch.filmeSuchen;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedList;
import javax.swing.event.EventListenerList;
import msearch.daten.ListeFilme;
import msearch.daten.MSConfig;
import msearch.filmeSuchen.sender.Mediathek3Sat;
import msearch.filmeSuchen.sender.MediathekArd;
import msearch.filmeSuchen.sender.MediathekArte_de;
import msearch.filmeSuchen.sender.MediathekArte_fr;
import msearch.filmeSuchen.sender.MediathekBr;
import msearch.filmeSuchen.sender.MediathekHr;
import msearch.filmeSuchen.sender.MediathekKika;
import msearch.filmeSuchen.sender.MediathekMdr;
import msearch.filmeSuchen.sender.MediathekNdr;
import msearch.filmeSuchen.sender.MediathekOrf;
import msearch.filmeSuchen.sender.MediathekRbb;
import msearch.filmeSuchen.sender.MediathekReader;
import msearch.filmeSuchen.sender.MediathekSrf;
import msearch.filmeSuchen.sender.MediathekSrfPod;
import msearch.filmeSuchen.sender.MediathekSwr;
import msearch.filmeSuchen.sender.MediathekWdr;
import msearch.filmeSuchen.sender.MediathekZdf;
import msearch.filmeSuchen.sender.MediathekZdfTivi;
import msearch.io.MSGetUrl;
import msearch.tool.DatumZeit;
import msearch.tool.GermanStringSorter;
import msearch.tool.MSLog;
import msearch.tool.MSUrlDateiGroesse;

public class MSFilmeSuchen {

    public ListeFilme listeFilmeNeu; // neu angelegte Liste und da kommen die neu gesuchten Filme rein
    public ListeFilme listeFilmeAlt; // ist die "alte" Liste, wird beim Aufruf übergeben und enthält am Ende das Ergebnis
    // private
    private final LinkedList<MediathekReader> mediathekListe = new LinkedList<>();
    private final EventListenerList listeners = new EventListenerList();
    private final MSListeRunSender listeSenderLaufen = new MSListeRunSender();
    private Date startZeit = null;
    private final ArrayList<String> runde1 = new ArrayList<>();
    private final ArrayList<String> runde2 = new ArrayList<>();
    private final ArrayList<String> runde3 = new ArrayList<>();
    private final String[] titel1 = {"Sender laden ", "[min]", "Seiten", "Filme", "Fehler", "FVersuche", "FZeit[s]", "AnzÜberProxy"};
    private final String[] titel2 = {"Sender laden ", "Geladen[MB]", "Nix", "Deflaet", "Gzip", "noBuff[s]"};
    private final String[] titel3 = {"Dateigroesse ", "getGroesse:", "mit_403", "OkMitProxy"};
    private final static String TRENNER = " | ";
    private final static String TTRENNER = " || ";
    private boolean allStarted = false;

    /**
     * ###########################################################################################################
     * Ablauf:
     * die gefundenen Filme kommen in die "listeFilme"
     * -> bei einem vollen Suchlauf: passiert nichts weiter
     * -> bei einem Update: "listeFilme" mit alter Filmliste auffüllen, URLs die es schon gibt werden verworfen
     * "listeFilme" ist dann die neue komplette Liste mit Filmen
     * ##########################################################################################################
     */
    public MSFilmeSuchen() {
        //Reader laden Spaltenweises Laden
        mediathekListe.add(new MediathekArd(this, 0));
        mediathekListe.add(new MediathekZdf(this, 0));
        mediathekListe.add(new MediathekZdfTivi(this, 0));
        mediathekListe.add(new MediathekArte_de(this, 0));
        mediathekListe.add(new MediathekArte_fr(this, 0));
        mediathekListe.add(new Mediathek3Sat(this, 1));
        mediathekListe.add(new MediathekSwr(this, 0));
        mediathekListe.add(new MediathekNdr(this, 1));
        mediathekListe.add(new MediathekKika(this, 0));
        // Spalte 2
        mediathekListe.add(new MediathekMdr(this, 0));
        mediathekListe.add(new MediathekWdr(this, 1));
        mediathekListe.add(new MediathekHr(this, 0));
        mediathekListe.add(new MediathekRbb(this, 1));
        mediathekListe.add(new MediathekBr(this, 0));
        mediathekListe.add(new MediathekSrf(this, 1));
        mediathekListe.add(new MediathekSrfPod(this, 0));
        mediathekListe.add(new MediathekOrf(this, 1));
    }

    public void addAdListener(MSListenerFilmeLaden listener) {
        listeners.add(MSListenerFilmeLaden.class, listener);
    }

    /**
     * es werden alle Filme gesucht
     *
     * @param listeFilme
     */
    public synchronized void filmeBeimSenderLaden(ListeFilme listeFilme) {
        allStarted = false;
        initStart(listeFilme);
        // die mReader nach Prio starten
        mrStarten(0);
        if (!MSConfig.getStop()) {
            mrWarten();
            mrStarten(1);
            allStarted = true;
        }
    }

    /**
     * es wird nur ein Sender aktualisiert
     *
     */
    /*    public void updateSender(String nameSenderFilmliste, ListeFilme listeFilme) {
     updateSender(new String[]{nameSenderFilmliste}, listeFilme);
     }
     */
    /**
     * es wird nur einige Sender aktualisiert
     *
     */
    public void updateSender(String[] nameSender, ListeFilme listeFilme) {
        // nur für den Mauskontext "Sender aktualisieren"
        allStarted = false;
        boolean starten = false;
        initStart(listeFilme);
        for (MediathekReader reader : mediathekListe) {
            for (String s : nameSender) {
                if (reader.checkNameSenderFilmliste(s)) {
                    starten = true;
                    new Thread(reader).start();
                }
            }
        }
        allStarted = true;
        if (!starten) {
            // dann fertig
            meldenFertig("");
        }
    }

    public String[] getNamenSender() {
        // liefert eine Array mit allen Sendernamen
        LinkedList<String> liste = new LinkedList<>();
        for (MediathekReader aMediathekListe : mediathekListe) {
            liste.add(aMediathekListe.getNameSender());
        }
        GermanStringSorter sorter = GermanStringSorter.getInstance();
        Collections.sort(liste, sorter);
        return liste.toArray(new String[liste.size()]);
    }

    public synchronized void melden(String sender, int max, int progress, String text) {
        MSRunSender runSender = listeSenderLaufen.getSender(sender);
        if (runSender != null) {
            runSender.max = max;
            runSender.progress = progress;
        } else {
            // Sender startet
            listeSenderLaufen.add(new MSRunSender(sender, max, progress));
            //wird beim Start des Senders aufgerufen, 1x
            if (listeSenderLaufen.size() <= 1 /* erster Aufruf */) {
                notifyStart(new MSListenerFilmeLadenEvent(sender, text, listeSenderLaufen.getMax(), listeSenderLaufen.getProgress(), false));
            }
        }
        notifyProgress(new MSListenerFilmeLadenEvent(sender, text, listeSenderLaufen.getMax(), listeSenderLaufen.getProgress(), false));
        progressBar();
    }

    public void meldenFertig(String sender) {
        //wird ausgeführt wenn Sender beendet ist
        String zeile;
        MSRunSender run = listeSenderLaufen.senderFertig(sender);
        if (allStarted && listeSenderLaufen.listeFertig()) {
            MSLog.progress(""); // zum löschen der Progressbar
        }
        zeile = "" + "\n";
        zeile += "-------------------------------------------------------------------------------------" + "\n";
        zeile += "Fertig " + sender + ": " + DatumZeit.getJetzt_HH_MM_SS() + " Uhr, Filme: " + listeFilmeNeu.countSender(sender) + "\n";
        int sekunden = getDauerSekunden();
        zeile += "     -> Dauer[Min]: " + (sekunden / 60 == 0 ? "<1" : sekunden / 60) + "\n";
        zeile += "     ->       Rest: " + listeSenderLaufen.getSenderRun() + "\n";
        zeile += "-------------------------------------------------------------------------------------" + "\n";
        MSLog.systemMeldung(zeile);

        if (run != null) {
            String groesse = (MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SUMME_BYTE, run.sender) == 0) ? "<1" : Long.toString(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SUMME_BYTE, run.sender));
            String[] ladeart = MSGetUrl.getZaehlerLadeArt(run.sender);
            // =================================
            // Zeile1
            zeile = textLaenge(titel1[0].length(), run.sender) + TTRENNER;
            zeile += textLaenge(titel1[1].length(), run.getLaufzeitMinuten()) + TRENNER;
            zeile += textLaenge(titel1[2].length(), String.valueOf(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_ZAEHLER, run.sender))) + TRENNER;
            zeile += textLaenge(titel1[3].length(), String.valueOf(listeFilmeNeu.countSender(run.sender))) + TRENNER;
            zeile += textLaenge(titel1[4].length(), String.valueOf(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_ZAEHLER_FEHlER, run.sender))) + TRENNER;
            zeile += textLaenge(titel1[5].length(), String.valueOf(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_ZAEHLER_FEHLERVERSUCHE, run.sender))) + TRENNER;
            zeile += textLaenge(titel1[6].length(), String.valueOf(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_ZAEHLER_WARTEZEIT_FEHLVERSUCHE, run.sender))) + TRENNER;
            zeile += textLaenge(titel1[7].length(), String.valueOf(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_PROXY, run.sender))) + TRENNER;
            runde1.add(zeile);
            // =================================
            // Zeile2
            zeile = textLaenge(titel2[0].length(), run.sender) + TTRENNER;
            zeile += textLaenge(titel2[1].length(), groesse) + TRENNER;
            zeile += textLaenge(titel2[2].length(), ladeart[0]) + TRENNER;
            zeile += textLaenge(titel2[3].length(), ladeart[1]) + TRENNER;
            zeile += textLaenge(titel2[4].length(), ladeart[2]) + TRENNER;
            zeile += textLaenge(titel2[5].length(), String.valueOf(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_NO_BUFFER, run.sender))) + TRENNER;
            runde2.add(zeile);
            // =================================
            // Zeile3
            zeile = textLaenge(titel3[0].length(), run.sender) + TTRENNER;
            zeile += textLaenge(titel3[1].length(), String.valueOf(MSUrlDateiGroesse.getZaehler(run.sender))) + TRENNER;
            zeile += textLaenge(titel3[2].length(), String.valueOf(MSUrlDateiGroesse.getZaehler403(run.sender))) + TRENNER;
            zeile += textLaenge(titel3[3].length(), String.valueOf(MSUrlDateiGroesse.getZaehlerProxy(run.sender))) + TRENNER;
            runde3.add(zeile
            );
        }
        if (!allStarted || !listeSenderLaufen.listeFertig()) {
            //nur ein Sender fertig oder noch nicht alle gestartet
            notifyProgress(new MSListenerFilmeLadenEvent(sender, "", listeSenderLaufen.getMax(), listeSenderLaufen.getProgress(), false));
        } else {
            // wird einmal aufgerufen, wenn alle Sender fertig sind
            endeMeldung();
            notifyFertig(new MSListenerFilmeLadenEvent(sender, "", listeSenderLaufen.getMax(), listeSenderLaufen.getProgress(), false));
        }
    }

    public ListeFilme getErgebnis() {
        return listeFilmeNeu;
    }

    //===================================
    // private
    //===================================
    private synchronized void mrStarten(int prio) {
        // Prio 0 laden
        for (MediathekReader mr : mediathekListe) {
            if (mr.getStartPrio() == prio) {
                new Thread(mr).start();
            }
        }
    }

    private synchronized void mrWarten() {
        // 4 Minuten warten, alle 10 Sekunden auf STOP prüfen
        try {
            for (int i = 0; i < 4 * 60; ++i) {
                if (MSConfig.getStop()) {
                    break;
                }
                this.wait(1000); // warten, Sender nach der Gesamtlaufzeit starten
            }
        } catch (Exception ex) {
            MSLog.fehlerMeldung(978754213, MSLog.FEHLER_ART_PROG, "FilmeSuchenSender.mrWarten", ex);
        }
    }

    private void endeMeldung() {
        // wird einmal aufgerufen, wenn alle Sender fertig sind
        String zeile;
        if (MSConfig.getStop()) {
            // Abbruch melden
            MSLog.systemMeldung("                                                                                     ");
            MSLog.systemMeldung("                                                                                     ");
            MSLog.systemMeldung("*************************************************************************************");
            MSLog.systemMeldung("*************************************************************************************");
            MSLog.systemMeldung("     ----- Abbruch -----                                                             ");
            MSLog.systemMeldung("*************************************************************************************");
            MSLog.systemMeldung("*************************************************************************************");
            MSLog.systemMeldung("                                                                                     ");
            MSLog.systemMeldung("                                                                                     ");
        }
        // Sender ===============================================
        // ======================================================
        MSLog.systemMeldung("");
        MSLog.systemMeldung("");
        MSLog.systemMeldung("=================================================================================");
        MSLog.systemMeldung("==  Sender  =====================================================================");
        MSLog.systemMeldung("");
        // Zeile 1 =============================================
        zeile = titel1[0] + TTRENNER + titel1[1] + TRENNER + titel1[2] + TRENNER + titel1[3] + TRENNER + titel1[4] + TRENNER + titel1[5] + TRENNER + titel1[6] + TRENNER + titel1[7] + TRENNER;
        MSLog.systemMeldung(zeile);
        MSLog.systemMeldung("----------------------------------------------------------------------------------------");
        for (String s : runde1) {
            MSLog.systemMeldung(s);
        }
        MSLog.systemMeldung("");
        MSLog.systemMeldung("");
        // Zeile 2 =============================================
        zeile = titel2[0] + TTRENNER + titel2[1] + TRENNER + titel2[2] + TRENNER + titel2[3] + TRENNER + titel2[4] + TRENNER + titel2[5] + TRENNER;
        MSLog.systemMeldung(zeile);
        MSLog.systemMeldung("-----------------------------------------------------------------");
        for (String s : runde2) {
            MSLog.systemMeldung(s);
        }
        MSLog.systemMeldung("");
        MSLog.systemMeldung("");
        // Zeile 3 =============================================
        zeile = titel3[0] + TTRENNER + titel3[1] + TRENNER + titel3[2] + TRENNER + titel3[3] + TRENNER;
        MSLog.systemMeldung(zeile);
        MSLog.systemMeldung("-----------------------------------------------------");
        for (String s : runde3) {
            MSLog.systemMeldung(s);
        }
        // Gesamt ===============================================
        // ======================================================
        int anzFilme = listeFilmeNeu.size();
        if (MSConfig.updateFilmliste) {
            // alte Filme eintragen wenn angefordert oder nur ein update gesucht wurde
            //////toDo
            listeFilmeNeu.updateListe(listeFilmeAlt, true /* über den Index vergleichen */, false /*ersetzen*/);
        }
        listeFilmeNeu.sort();
        // FilmlisteMetaDaten
        listeFilmeNeu.metaDatenSchreiben();
        Date stopZeit = new Date(System.currentTimeMillis());
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
        int sekunden = getDauerSekunden();
        MSLog.systemMeldung("");
        MSLog.systemMeldung("=================================================================================");
        MSLog.systemMeldung("=================================================================================");
        MSLog.systemMeldung("");
        MSLog.systemMeldung("        Filme geladen: " + anzFilme);
        MSLog.systemMeldung("       Seiten geladen: " + MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_ZAEHLER));
        String groesse = (MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SUMME_BYTE) == 0) ? "<1" : Long.toString(MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SUMME_BYTE));
        MSLog.systemMeldung("   Summe geladen[MiB]: " + groesse);
        MSLog.systemMeldung("        Traffic [MiB]: " + MSGetUrl.getSummeMegaByte());
        // Durchschnittswerte ausgeben
        long kb = (MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SUMME_BYTE) * 1024) / sekunden;
        MSLog.systemMeldung("     ->   Rate[KiB/s]: " + (kb == 0 ? "<1" : kb));
        MSLog.systemMeldung("     ->    Dauer[Min]: " + (sekunden / 60 == 0 ? "<1" : sekunden / 60));
        MSLog.systemMeldung("            ->  Start: " + sdf.format(startZeit));
        MSLog.systemMeldung("            ->   Ende: " + sdf.format(stopZeit));
        MSLog.systemMeldung("");
        MSLog.systemMeldung("=================================================================================");
        MSLog.systemMeldung("=================================================================================");
    }

    private int getDauerSekunden() {
        int sekunden;
        try {
            sekunden = Math.round((new Date(System.currentTimeMillis()).getTime() - startZeit.getTime()) / (1000));
        } catch (Exception ex) {
            sekunden = 1;
        }
        if (sekunden <= 0) {
            sekunden = 1;
        }
        return sekunden;
    }

    private void initStart(ListeFilme listeFilme) {
        listeFilmeAlt = listeFilme;
        MSConfig.setStop(false);
        startZeit = new Date(System.currentTimeMillis());
        listeFilmeNeu = new ListeFilme();
        listeFilmeNeu.liveStreamEintragen();
        runde1.clear();
        runde2.clear();
        runde3.clear();
        MSGetUrl.resetZaehler();
        MSUrlDateiGroesse.resetZaehler(getNamenSender());
        MSLog.systemMeldung("");
        MSLog.systemMeldung("=======================================");
        MSLog.systemMeldung("Start Filme laden:");
        if (MSConfig.senderAllesLaden) {
            MSLog.systemMeldung("Filme laden: alle laden");
        } else {
            MSLog.systemMeldung("Filme laden: nur update laden");
        }
        if (MSConfig.updateFilmliste) {
            MSLog.systemMeldung("Filmliste: aktualisieren");
        } else {
            MSLog.systemMeldung("Filmliste: neue erstellen");
        }
        MSLog.systemMeldung("=======================================");
        MSLog.systemMeldung("");
    }

    private void progressBar() {
        int max = listeSenderLaufen.getMax();
        int progress = listeSenderLaufen.getProgress();
        int proz = 0;
        String text;
        int sekunden = 0;
        try {
            sekunden = Math.round((new Date(System.currentTimeMillis()).getTime() - startZeit.getTime()) / (1000));
        } catch (Exception ignored) {
        }

        if (max != 0) {
            if (progress != 0) {
                proz = progress * 100 / max;
            }
            if (max > 0 && proz == 100) {
                proz = 99;
            }
            text = "  [ ";
            int a = proz / 10;
            for (int i = 0; i < a; ++i) {
                text += "#";
            }
            for (int i = 0; i < (10 - a); ++i) {
                text += "-";
            }
            text += " ]  " + MSGetUrl.getSeitenZaehler(MSGetUrl.LISTE_SEITEN_ZAEHLER) + " Seiten  /  "
                    + proz + "% von " + max + " Themen  /  Filme: " + listeFilmeNeu.size()
                    + "  /  Dauer[Min]: " + (sekunden / 60 == 0 ? "<1" : sekunden / 60)
                    + "  /  R-Sender: " + listeSenderLaufen.getAnzSenderRun();
            MSLog.progress(text);
        }
    }

    private String textLaenge(int max, String text) {
        if (text.length() > max) {
            text = text.substring(0, max - 1);
        }
        while (text.length() < max) {
            text = text + " ";
        }
        return text;
    }

    private void notifyStart(MSListenerFilmeLadenEvent event) {
        for (Object l : listeners.getListenerList()) {
            if (l instanceof MSListenerFilmeLaden) {
                ((MSListenerFilmeLaden) l).start(event);
            }
        }
    }

    private void notifyProgress(MSListenerFilmeLadenEvent event) {
        for (Object l : listeners.getListenerList()) {
            if (l instanceof MSListenerFilmeLaden) {
                ((MSListenerFilmeLaden) l).progress(event);
            }
        }
    }

    private void notifyFertig(MSListenerFilmeLadenEvent event) {
        for (Object l : listeners.getListenerList()) {
            if (l instanceof MSListenerFilmeLaden) {
                ((MSListenerFilmeLaden) l).fertig(event);
            }
        }
    }
}
