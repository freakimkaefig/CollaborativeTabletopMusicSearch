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
package mediathek.tool;

import com.jidesoft.utils.SystemInfo;
import mediathek.controller.Log;
import mediathek.controller.starter.Start;
import mediathek.daten.Daten;
import mediathek.daten.DatenDownload;
import mediathek.res.GetIcon;

import javax.swing.*;
import javax.swing.border.Border;
import javax.swing.plaf.basic.BasicProgressBarUI;
import javax.swing.table.DefaultTableCellRenderer;
import java.awt.*;

public class CellRendererDownloads extends DefaultTableCellRenderer {

    private final static String DOWNLOAD_STARTEN = "Download starten";
    private final static String DOWNLOAD_LOESCHEN = "Download löschen";
    private final static String DOWNLOAD_STOPPEN = "Download stoppen";
    private final static String DOWNLOAD_ENTFERNEN = "Download entfernen";
    private final static String PLAY_DOWNLOADED_FILM = "gespeicherten Film abspielen";
    private static ImageIcon ja_16 = null;
    private static ImageIcon nein_12 = null;
    private static ImageIcon film_start_tab = null;
    private static ImageIcon download_stop_tab = null;
    private static ImageIcon download_start_tab = null;
    private static ImageIcon film_start_sw_tab = null;
    private static ImageIcon download_stop_sw_tab = null;
    private static ImageIcon download_start_sw_tab = null;
    private static ImageIcon download_clear_tab = null;
    private static ImageIcon download_clear_sw_tab = null;
    private static ImageIcon download_del_tab = null;
    private static ImageIcon download_del_sw_tab = null;
    private boolean geoMelden = false;
    private JProgressBar progressBar;
    private final Border emptyBorder = BorderFactory.createEmptyBorder();
    private final Border largeBorder = BorderFactory.createEmptyBorder(9, 2, 9, 2);
    private JPanel panel;
    private MVSenderIconCache senderIconCache;

    public CellRendererDownloads() {
        ja_16 = GetIcon.getIcon("ja_16.png");
        nein_12 = GetIcon.getIcon("nein_12.png");
        film_start_tab = GetIcon.getIcon("film_start_tab.png");
        film_start_sw_tab = GetIcon.getIcon("film_start_sw_tab.png");
        download_stop_tab = GetIcon.getIcon("download_stop_tab.png");
        download_stop_sw_tab = GetIcon.getIcon("download_stop_sw_tab.png");
        download_start_tab = GetIcon.getIcon("download_start_tab.png");
        download_start_sw_tab = GetIcon.getIcon("download_start_sw_tab.png");
        download_clear_tab = GetIcon.getIcon("download_clear_tab.png");
        download_clear_sw_tab = GetIcon.getIcon("download_clear_sw_tab.png");
        download_del_tab = GetIcon.getIcon("download_del_tab.png");
        download_del_sw_tab = GetIcon.getIcon("download_del_sw_tab.png");
        geoMelden = Boolean.parseBoolean(Daten.mVConfig.get(MVConfig.SYSTEM_GEO_MELDEN));
        ListenerMediathekView.addListener(new ListenerMediathekView(ListenerMediathekView.EREIGNIS_GEO, CellRendererDownloads.class.getSimpleName()) {
            @Override
            public void ping() {
                geoMelden = Boolean.parseBoolean(Daten.mVConfig.get(MVConfig.SYSTEM_GEO_MELDEN));
            }
        });

        progressBar = new JProgressBar(0, 1000);
        progressBar.setStringPainted(true);
        //on OSX the OS provided progress bar looks much better...
        if (!SystemInfo.isMacOSX()) {
            progressBar.setUI(new BasicProgressBarUI() {
                @Override
                protected Color getSelectionBackground() {
                    return UIManager.getDefaults().getColor("Table.foreground");
                }

                @Override
                protected Color getSelectionForeground() {
                    return Color.white;
                }
            });
        }

        panel = new JPanel(new BorderLayout());
        panel.add(progressBar);

        senderIconCache = new MVSenderIconCache();
    }

    @Override
    public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus,
            int row, int column) {
        try {
            setBackground(null);
            setForeground(null);
            setIcon(null);
            setToolTipText(null);
            setHorizontalAlignment(SwingConstants.LEADING);

            super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);

            final int rowModelIndex = table.convertRowIndexToModel(row);
            final int columnModelIndex = table.convertColumnIndexToModel(column);

            DatenDownload datenDownload = (DatenDownload) table.getModel().getValueAt(rowModelIndex, DatenDownload.DOWNLOAD_REF_NR);
            if (isSelected) {
                setFont(new java.awt.Font("Dialog", Font.BOLD, getFont().getSize()));
            } else {
                setFont(getFont());
            }

            switch (columnModelIndex) {
                case DatenDownload.DOWNLOAD_PROGRESS_NR:
                    setHorizontalAlignment(SwingConstants.CENTER);
                    if (((MVTable) table).iconAnzeigen && !((MVTable) table).iconKlein) {
                        progressBar.setBorder(largeBorder);
                    } else {
                        progressBar.setBorder(emptyBorder);
                    }
                    if (datenDownload.start != null) {
                        if (1 < datenDownload.start.percent && datenDownload.start.percent < Start.PROGRESS_FERTIG) {

                            setColor(panel, datenDownload.start, isSelected);
                            setColor(progressBar, datenDownload.start, isSelected);

                            progressBar.setValue(datenDownload.start.percent);

                            final double progressValue = datenDownload.start.percent / 10.0;
                            progressBar.setString(Double.toString(progressValue) + "%");

                            return panel;
                        } else {
                            setText(Start.getTextProgress(datenDownload.start));
                        }
                    } else {
                        setText("");
                    }
                    break;

                case DatenDownload.DOWNLOAD_RESTZEIT_NR:
                    setHorizontalAlignment(SwingConstants.CENTER);
                    if (datenDownload.start != null && datenDownload.start.beginnAnschauen) {
                        setForeground(MVColor.DOWNLOAD_ANSEHEN.color);
                    }
                    break;

                case DatenDownload.DOWNLOAD_FILM_NR_NR:
                    if ((int) table.getModel().getValueAt(rowModelIndex, DatenDownload.DOWNLOAD_FILM_NR_NR) == 0) {
                        setText("");
                    }
                    setHorizontalAlignment(SwingConstants.CENTER);
                    break;

                case DatenDownload.DOWNLOAD_PROGRAMM_RESTART_NR:
                    setHorizontalAlignment(SwingConstants.CENTER);
                    if (datenDownload.isRestart()) {
                        setIcon(ja_16);
                    } else {
                        setIcon(nein_12);
                    }
                    break;

                case DatenDownload.DOWNLOAD_UNTERBROCHEN_NR:
                    setHorizontalAlignment(SwingConstants.CENTER);
                    if (datenDownload.interrupted()) {
                        setIcon(ja_16);
                    } else {
                        setIcon(nein_12);
                    }
                    break;

                case DatenDownload.DOWNLOAD_BUTTON_START_NR:
                    handleButtonStartColumn(datenDownload, isSelected);
                    break;

                case DatenDownload.DOWNLOAD_BUTTON_DEL_NR:
                    handleButtonDeleteColumn(datenDownload, isSelected);
                    break;

                case DatenDownload.DOWNLOAD_GROESSE_NR:
                    setHorizontalAlignment(SwingConstants.RIGHT);
                    break;

                case DatenDownload.DOWNLOAD_ABO_NR:
                    handleAboColumn(datenDownload);
                    break;

                case DatenDownload.DOWNLOAD_NR_NR:
                case DatenDownload.DOWNLOAD_DATUM_NR:
                case DatenDownload.DOWNLOAD_ZEIT_NR:
                case DatenDownload.DOWNLOAD_DAUER_NR:
                case DatenDownload.DOWNLOAD_BANDBREITE_NR:
                    setHorizontalAlignment(SwingConstants.CENTER);
                    break;

                case DatenDownload.DOWNLOAD_SENDER_NR:
                    if (((MVTable) table).iconAnzeigen) {
                        handleSenderColumn((String) value, ((MVTable) table).iconKlein);
                    }
                    break;
            }

            setColor(this, datenDownload.start, isSelected);
            handleGeoBlocking(datenDownload, isSelected);
        } catch (Exception ex) {
            Log.fehlerMeldung(758200166, Log.FEHLER_ART_PROG, this.getClass().getName(), ex);
        }
        return this;
    }

    /**
     * Draws the sender icon in the sender model column.
     *
     * @param sender Name of the sender.
     */
    private void handleSenderColumn(String sender, boolean small) {
        setHorizontalAlignment(SwingConstants.CENTER);
        ImageIcon icon = senderIconCache.get(sender, small);
        if (icon != null) {
            setText("");
            setIcon(icon);
        }
    }

    private void handleButtonStartColumn(final DatenDownload datenDownload, final boolean isSelected) {
        setHorizontalAlignment(SwingConstants.CENTER);
        if (isSelected) {
            if (datenDownload.start != null) {
                if (datenDownload.start.status == Start.STATUS_FERTIG) {
                    setIcon(film_start_tab);
                    setToolTipText(PLAY_DOWNLOADED_FILM);
                } else if (datenDownload.start.status == Start.STATUS_ERR) {
                    setIcon(download_start_tab);
                    setToolTipText(DOWNLOAD_STARTEN);
                } else {
                    setIcon(download_stop_tab);
                    setToolTipText(DOWNLOAD_STOPPEN);
                }
            } else {
                setIcon(download_start_tab);
                setToolTipText(DOWNLOAD_STARTEN);
            }
        } else {
            if (datenDownload.start != null) {
                if (datenDownload.start.status == Start.STATUS_FERTIG) {
                    setIcon(film_start_sw_tab);
                    setToolTipText(PLAY_DOWNLOADED_FILM);
                } else if (datenDownload.start.status == Start.STATUS_ERR) {
                    setIcon(download_start_sw_tab);
                    setToolTipText(DOWNLOAD_STARTEN);
                } else {
                    setIcon(download_stop_sw_tab);
                    setToolTipText(DOWNLOAD_STOPPEN);
                }
            } else {
                setIcon(download_start_sw_tab);
                setToolTipText(DOWNLOAD_STARTEN);
            }
        }
    }

    private void handleButtonDeleteColumn(final DatenDownload datenDownload, final boolean isSelected) {
        setHorizontalAlignment(SwingConstants.CENTER);
        if (datenDownload.start != null) {
            if (datenDownload.start.status >= Start.STATUS_FERTIG) {
                if (isSelected) {
                    setIcon(download_clear_tab);
                    setToolTipText(DOWNLOAD_ENTFERNEN);
                } else {
                    setIcon(download_clear_sw_tab);
                    setToolTipText(DOWNLOAD_ENTFERNEN);
                }
            } else {
                setupDownloadLoeschen(isSelected);
            }
        } else {
            setupDownloadLoeschen(isSelected);
        }
    }

    private void handleAboColumn(final DatenDownload datenDownload) {
        setHorizontalAlignment(SwingConstants.CENTER);
        if (!datenDownload.arr[DatenDownload.DOWNLOAD_ABO_NR].equals("")) {
            setForeground(MVColor.DOWNLOAD_IST_ABO.color);
        } else {
            setForeground(MVColor.DOWNLOAD_IST_DIREKTER_DOWNLOAD.color);
            setText("Download");
        }
    }

    private void handleGeoBlocking(final DatenDownload datenDownload, final boolean isSelected) {
        if (datenDownload.start == null
                && geoMelden
                && !datenDownload.arr[DatenDownload.DOWNLOAD_GEO_NR].isEmpty()
                && !datenDownload.arr[DatenDownload.DOWNLOAD_GEO_NR].contains(Daten.mVConfig.get(MVConfig.SYSTEM_GEO_STANDORT))) {
            if (isSelected) {
                setBackground(MVColor.FILM_GEOBLOCK_BACKGROUND_SEL.color);
            } else {
                setBackground(MVColor.FILM_GEOBLOCK_BACKGROUND.color);
            }
        }
    }

    private void setupDownloadLoeschen(final boolean isSelected) {
        if (isSelected) {
            setIcon(download_del_tab);
            setToolTipText(DOWNLOAD_LOESCHEN);
        } else {
            setIcon(download_del_sw_tab);
            setToolTipText(DOWNLOAD_LOESCHEN);
        }
    }

    private void setColor(Component c, Start s, boolean isSelected) {
        if (s != null) {
            switch (s.status) {
                case Start.STATUS_INIT:
                    if (isSelected) {
                        c.setBackground(MVColor.DOWNLOAD_WAIT_SEL.color);
                    } else {
                        c.setBackground(MVColor.DOWNLOAD_WAIT.color);
                    }
                    break;
                case Start.STATUS_RUN:
                    if (isSelected) {
                        c.setBackground(MVColor.DOWNLOAD_RUN_SEL.color);
                    } else {
                        c.setBackground(MVColor.DOWNLOAD_RUN.color);
                    }
                    break;
                case Start.STATUS_FERTIG:
                    if (isSelected) {
                        c.setBackground(MVColor.DOWNLOAD_FERTIG_SEL.color);
                    } else {
                        c.setBackground(MVColor.DOWNLOAD_FERTIG.color);
                    }
                    break;
                case Start.STATUS_ERR:
                    if (isSelected) {
                        c.setBackground(MVColor.DOWNLOAD_FEHLER_SEL.color);
                    } else {
                        c.setBackground(MVColor.DOWNLOAD_FEHLER.color);
                    }
                    break;
            }
        }
    }
}
