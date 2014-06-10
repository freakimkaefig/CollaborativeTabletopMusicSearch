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
package mediathek.daten;

import mediathek.MediathekGui;
import mediathek.controller.*;
import mediathek.controller.starter.StarterClass;
import mediathek.gui.GuiAbo;
import mediathek.gui.GuiDownloads;
import mediathek.gui.GuiFilme;
import mediathek.gui.dialog.MVFilmInformation;
import mediathek.tool.*;
import msearch.daten.DatenFilm;
import msearch.daten.ListeFilme;
import msearch.daten.MSConfig;
import msearch.io.MSFilmlisteLesen;
import msearch.io.MSFilmlisteSchreiben;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;

public class Daten {

    public static final String LINE_SEPARATOR = System.getProperty("line.separator");
    // flags
    public static boolean debug = false; // Debugmodus
    public static boolean auto = false; // Version: MediathekAuto
    public static boolean RESET = false; // Programm auf Starteinstellungen zurücksetzen
    //alle Programmeinstellungen
    public static MVConfig mVConfig = new MVConfig();
    public static int aktFilter = 0; // welcher Filter ausgewählt ist 1 ... 5

    // zentrale Klassen
    public static MVColor mVColor = new MVColor(); // verwendete Farben
    public static MVReplaceList mVReplaceList = new MVReplaceList(); // Ersetzungsliste für die Namen der Downloads
    public static FilmeLaden filmeLaden; // erledigt das updaten der Filmliste
    public static ListeFilme listeFilme = null;
    public static ListeFilme listeFilmeNachBlackList = null; // ist DIE Filmliste
    public static ListeFilme listeFilmeHistory = null; // für die HEUTIGE HISTORY
    public static ListeDownloads listeDownloads = null; // Filme die als "Download: Tab Download" geladen werden sollen
    public static ListeDownloads listeDownloadsButton = null; // Filme die über "Tab Filme" als Button/Film abspielen gestartet werden
    public static ListeBlacklist listeBlacklist = null;
    public static ListeAbo listeAbo = null;
    // Verzeichnis zum Speichern der Programmeinstellungen
    private static String basisverzeichnis = "";
    public ListePset listePset = null;
    public MVUsedUrls history = null; // alle angesehenen Filme
    public MVUsedUrls erledigteAbos = null; // erfolgreich geladenen Abos

    public IoXmlLesen ioXmlLesen = null; // Konfig laden
    public IoXmlSchreiben ioXmlSchreiben = null; //Konfig speichern
    public StarterClass starterClass = null; // Klasse zum Ausführen der Programme (für die Downloads): VLC, flvstreamer, ...

    // Gui
    public MediathekGui mediathekGui = null; // JFrame der Gui
    public GuiFilme guiFilme = null; // Tab mit den Filmen
    public GuiDownloads guiDownloads = null; // Tab mit den Downloads
    public GuiAbo guiAbo = null; // Tab mit den Abos
    public MVFilmInformation filmInfoHud = null; // Infos zum Film

    private boolean configCopy = false;

    public Daten(String basis, MediathekGui gui) {
        basisverzeichnis = basis;
        mediathekGui = gui;

        init();

        listeFilme = new ListeFilme();
        filmeLaden = new FilmeLaden();
        listeFilmeHistory = new ListeFilme();

        updateSplashScreen("Lade Blacklist...");
        listeFilmeNachBlackList = new ListeFilme();
        listeBlacklist = new ListeBlacklist();

        updateSplashScreen("Lade Programmsets...");
        listePset = new ListePset();

        updateSplashScreen("Lade Abos...");
        listeAbo = new ListeAbo(this);

        updateSplashScreen("Lade Downloads...");
        listeDownloads = new ListeDownloads(this);
        listeDownloadsButton = new ListeDownloads(this);

        updateSplashScreen("Lade erledigte Abos...");
        //erledigteAbos = new ErledigteAbos();
        erledigteAbos = new MVUsedUrls(Konstanten.FILE_ERLEDIGTE_ABOS, ListenerMediathekView.EREIGNIS_LISTE_ERLEDIGTE_ABOS);

        //initialisieren
        updateSplashScreen("Lade Filmliste...");
        ioXmlLesen = new IoXmlLesen();
        ioXmlSchreiben = new IoXmlSchreiben();

        updateSplashScreen("Lade History...");
        history = new MVUsedUrls(Konstanten.FILE_HISTORY, ListenerMediathekView.EREIGNIS_LISTE_HISTORY_GEAENDERT);

        starterClass = new StarterClass(this);
        Timer timer = new Timer(1000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                ListenerMediathekView.notify(ListenerMediathekView.EREIGNIS_TIMER, Daten.class.getName());
                DatumZeit.set(); // die Zeitkonstanten setzen

            }
        });
        timer.setInitialDelay(4000); // damit auch alles geladen ist
        timer.start();
    }

    public static void setUserAgentAuto() {
        // Useragent wird vom Programm verwaltet
        Daten.mVConfig.add(MVConfig.SYSTEM_USER_AGENT_AUTO, Boolean.TRUE.toString());
        Daten.mVConfig.add(MVConfig.SYSTEM_USER_AGENT, Konstanten.USER_AGENT_DEFAULT);
    }

    public static void setUserAgentManuel(String ua) {
        // Useragent den der Benutzer vorgegeben hat
        Daten.mVConfig.add(MVConfig.SYSTEM_USER_AGENT_AUTO, Boolean.FALSE.toString());
        Daten.mVConfig.add(MVConfig.SYSTEM_USER_AGENT, ua);
    }

    public static boolean isUserAgentAuto() {
        if (Daten.mVConfig.get(MVConfig.SYSTEM_USER_AGENT_AUTO).equals("")) {
            Daten.mVConfig.add(MVConfig.SYSTEM_USER_AGENT_AUTO, Boolean.TRUE.toString());
            return true;
        } else {
            return Boolean.parseBoolean(Daten.mVConfig.get(MVConfig.SYSTEM_USER_AGENT_AUTO));
        }
    }

    public static String getUserAgent() {
        if (isUserAgentAuto()) {
            return Konstanten.USER_AGENT_DEFAULT;
        } else {
            return Daten.mVConfig.get(MVConfig.SYSTEM_USER_AGENT);
        }
    }

    /**
     * Liefert den Pfad zur Filmliste
     *
     * @return Den Pfad als String
     */
    public static String getDateiFilmliste() {
        return getSettingsDirectory_String() + File.separator + Konstanten.JSON_DATEI_FILME;
    }

    /**
     * Return the location of the settings directory.
     * If it does not exist, create one.
     *
     * @return Path to the settings directory
     * @throws IOException
     */
    public static Path getSettingsDirectory() throws IOException {
        final String baseDirectoryString;
        if (basisverzeichnis.equals("")) {
            baseDirectoryString = System.getProperty("user.home") + File.separator + Konstanten.VERZEICHNISS_EINSTELLUNGEN + File.separator;
        } else {
            baseDirectoryString = basisverzeichnis;
        }

        Path baseDirectoryPath = Paths.get(baseDirectoryString);

        if (Files.notExists(baseDirectoryPath)) {
            Files.createDirectory(baseDirectoryPath);
        }

        return baseDirectoryPath;
    }

    public static String getSettingsDirectory_String() {
        try {
            return getSettingsDirectory().toString();
        } catch (Exception ignored) {
        }
        return "";
    }

    /**
     * Return the path to "mediathek.xml"
     *
     * @return Path object to mediathek.xml file
     */
    public static Path getMediathekXmlFilePath() {
        Path xmlFilePath = null;
        try {
            xmlFilePath = Daten.getSettingsDirectory().resolve(Konstanten.CONFIG_FILE);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return xmlFilePath;
    }

    public static void filmlisteSpeichern() {
        new MSFilmlisteSchreiben().filmlisteSchreibenJson(getDateiFilmliste(), listeFilme);
    }

    private void init() {
        //MVConfig initialisieren
        mVConfig.add(MVConfig.SYSTEM_MAX_DOWNLOAD, "1");
        mVConfig.add(MVConfig.SYSTEM_USER_AGENT, Konstanten.USER_AGENT_DEFAULT);
        mVConfig.add(MVConfig.SYSTEM_LOOK, "0");
        mVConfig.add(MVConfig.SYSTEM_UPDATE_SUCHEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_ABOS_SOFORT_SUCHEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_DOWNLOAD_SOFORT_STARTEN, Boolean.FALSE.toString());
        mVConfig.add(MVConfig.SYSTEM_ZIELNAMEN_ANPASSEN, Konstanten.ZIELNAMEN_ANPASSEN_NORMAL);
        mVConfig.add(MVConfig.SYSTEM_ZIELNAMEN_UNICODE, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_ECHTZEITSUCHE, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_ICON_STANDARD, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_PANEL_BESCHREIBUNG_ANZEIGEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_BLACKLIST_FILMLAENGE, "0");
        mVConfig.add(MVConfig.SYSTEM_ICON_PFAD, Funktionen.getPathJar() + File.separator + "Icons" + File.separator + "SchwarzWeiss");
        mVConfig.add(MVConfig.SYSTEM_BANDBREITE_KBYTE, String.valueOf(0));
        mVConfig.add(MVConfig.SYSTEM_NOTIFICATION, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_DIALOG_DOWNLOAD_D_STARTEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_TOOLBAR_ALLES_ANZEIGEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_VIS_DOWNLOAD, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_VIS_ABO, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_VIS_FILTER, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_GEO_MELDEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_GEO_STANDORT, DatenFilm.GEO_DE);
        mVConfig.add(MVConfig.SYSTEM_PANEL_FILME_DIVIDER, Konstanten.GUIFILME_DIVIDER_LOCATION);
        mVConfig.add(MVConfig.SYSTEM_TAB_DOWNLOAD_ICON_ANZEIGEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_TAB_FILME_ICON_ANZEIGEN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_TAB_DOWNLOAD_ICON_KLEIN, Boolean.TRUE.toString());
        mVConfig.add(MVConfig.SYSTEM_TAB_FILME_ICON_KLEIN, Boolean.TRUE.toString());
        try {
            Daten.mVConfig.add(MVConfig.SYSTEM_PFAD_MPLAYER, GuiFunktionenProgramme.getMusterPfadMplayer());
            Daten.mVConfig.add(MVConfig.SYSTEM_PFAD_VLC, GuiFunktionenProgramme.getMusterPfadVlc());
            Daten.mVConfig.add(MVConfig.SYSTEM_PFAD_FLVSTREAMER, GuiFunktionenProgramme.getMusterPfadFlv());
            Daten.mVConfig.add(MVConfig.SYSTEM_PFAD_FFMPEG, GuiFunktionenProgramme.getMusterPfadFFmpeg());
        } catch (Exception ignored) {
        }
        if (Daten.debug) {
            mVConfig.add(MVConfig.SYSTEM_IMPORT_ART_FILME, String.valueOf(GuiKonstanten.UPDATE_FILME_AUS));
        }
        MSConfig.setUserAgent(Konstanten.USER_AGENT_DEFAULT);
    }

    /**
     * Update the {@link java.awt.SplashScreen} only if we have a Swing UI.
     *
     * @param text The displayed text on the splash graphics.
     */
    private void updateSplashScreen(String text) {
        if (mediathekGui != null) {
            mediathekGui.updateSplashScreenText(text);
        }
    }

    public void allesLaden() {
        updateSplashScreen("Lade Konfigurationsdaten...");

        Path xmlFilePath = Daten.getMediathekXmlFilePath();
        if (!ioXmlLesen.datenLesen(this, xmlFilePath)) {
            // dann hat das Laden nicht geklappt
            listePset.clear();
            GuiFunktionenProgramme.addSetVorlagen(mediathekGui, this, ListePsetVorlagen.getStandarset(mediathekGui, this), true /*auto*/, true /*setVersion*/);
            init();
        }

        mVColor.load(); // Farben einrichten
        // erst die Systemdaten, dann die Filmliste
        updateSplashScreen("Lade Filmliste...");
        new MSFilmlisteLesen().filmlisteLesenJson(Daten.getDateiFilmliste(), "", Daten.listeFilme);
        Daten.listeFilme.themenLaden();
        Daten.listeAbo.setAboFuerFilm(Daten.listeFilme, false /*aboLoeschen*/);
        MVListeFilme.checkBlacklist();
        MSConfig.setUserAgent(getUserAgent());
    }

    public void allesSpeichern() {
        konfigCopy();
        ioXmlSchreiben.datenSchreiben(this);
        if (Daten.RESET) {
            // das Programm soll beim nächsten Start mit den Standardeinstellungen gestartet werden
            // dazu wird den Ordner mit den Einstellungen umbenannt
            String dir1 = getSettingsDirectory_String();
            if (dir1.endsWith(File.separator)) {
                dir1 = dir1.substring(0, dir1.length() - 1);
            }
            String dir2 = dir1 + "--" + DatumZeit.getJetzt_yyyy_MM_dd__HH_mm_ss();
            try {
                if (new File(dir1).renameTo(new File(dir2))) {
                    // erster Versuch
                    return;
                }
                // für Win weitere Versuche
                if (new File(dir1).delete()) {
                    return;
                }
                Log.systemMeldung("Die Einstellungen konnten nicht zurückgesetzt werden.");
                MVMessageDialog.showMessageDialog(this.mediathekGui, "Die Einstellungen konnten nicht zurückgesetzt werden.\n"
                        + "Sie müssen jetzt das Programm beenden und dann den Ordner:\n"
                        + getSettingsDirectory_String() + "\n"
                        + "von Hand löschen und dann das Programm wieder starten.\n\n"
                        + "Im Forum finden Sie weitere Hilfe.", "Fehler", JOptionPane.ERROR_MESSAGE);
            } catch (Exception e) {
                Log.fehlerMeldung(465690123, Log.FEHLER_ART_PROG, Daten.class.getName(), e);
            }
        }
    }

    private void konfigCopy() {
        final int MAX_COPY = 5;
        boolean renameOk = true;
        long creatTime = -1;
        if (!configCopy) {
            // nur einmal pro Programmstart machen
            Log.systemMeldung("-------------------------------------------------------");
            Log.systemMeldung("Einstellungen sichern");
            try {
                Path xmlFilePath = Daten.getMediathekXmlFilePath();
                Path xmlFilePathCopy_1;
                Path xmlFilePathCopy_2;
                xmlFilePathCopy_1 = Daten.getSettingsDirectory().resolve(Konstanten.CONFIG_FILE_COPY + 1);
                if (xmlFilePathCopy_1.toFile().exists()) {
                    BasicFileAttributes attrs = Files.readAttributes(xmlFilePathCopy_1, BasicFileAttributes.class);
                    FileTime d = attrs.lastModifiedTime();
                    creatTime = d.toMillis();
                }
                if (creatTime == -1 || creatTime < DatumZeit.getHeute_0Uhr()) {
                    // nur dann ist die letzte Kopie älter als einen Tag
                    xmlFilePathCopy_1 = Daten.getSettingsDirectory().resolve(Konstanten.CONFIG_FILE_COPY + MAX_COPY);
                    if (xmlFilePathCopy_1.toFile().exists()) {
                        // das letzte File löschen, sonst klappt das umbenenen unter Win nicht
                        xmlFilePathCopy_1.toFile().delete();
                    }
                    for (int i = MAX_COPY; i > 1; --i) {
                        xmlFilePathCopy_1 = Daten.getSettingsDirectory().resolve(Konstanten.CONFIG_FILE_COPY + (i - 1));
                        xmlFilePathCopy_2 = Daten.getSettingsDirectory().resolve(Konstanten.CONFIG_FILE_COPY + i);
                        if (xmlFilePathCopy_1.toFile().exists()) {
                            if (!xmlFilePathCopy_1.toFile().renameTo(xmlFilePathCopy_2.toFile())) {
                                renameOk = false;
                            }
                        }
                    }
                    if (xmlFilePath.toFile().exists()) {
                        xmlFilePath.toFile().renameTo(Daten.getSettingsDirectory().resolve(Konstanten.CONFIG_FILE_COPY + 1).toFile());
                    }
                    Log.systemMeldung("Einstellungen wurden gesichert");
                } else {
                    Log.systemMeldung("Einstellungen wurden heute schon gesichert");
                }
            } catch (Exception e) {
                Log.fehlerMeldung(795623147, Log.FEHLER_ART_PROG, Daten.class.getName(), e);
            }
            if (!renameOk) {
                Log.systemMeldung("Die Einstellungen konnten nicht komplett gesichert werden!");
            }
            configCopy = true;
            Log.systemMeldung("-------------------------------------------------------");
        }
    }
}
