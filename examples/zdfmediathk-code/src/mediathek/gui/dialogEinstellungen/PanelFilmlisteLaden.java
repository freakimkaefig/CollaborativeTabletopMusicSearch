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
package mediathek.gui.dialogEinstellungen;

import com.jidesoft.utils.SystemInfo;
import java.awt.Cursor;
import java.awt.FileDialog;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.File;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.ListSelectionEvent;
import mediathek.controller.Log;
import mediathek.daten.Daten;
import mediathek.gui.PanelVorlage;
import mediathek.res.GetIcon;
import mediathek.tool.GuiFunktionen;
import mediathek.tool.GuiKonstanten;
import mediathek.tool.ListenerMediathekView;
import mediathek.tool.MVColor;
import mediathek.tool.MVConfig;
import mediathek.tool.TModel;
import msearch.filmeLaden.DatenUrlFilmliste;
import msearch.filmeLaden.MSFilmlistenSuchen;

public class PanelFilmlisteLaden extends PanelVorlage {

    private JDialog dialog = null;

    public PanelFilmlisteLaden(Daten d, JFrame parentComponent, JDialog ddialog) {
        super(d, parentComponent);
        dialog = ddialog;
        initComponents();
        init();
    }

    public PanelFilmlisteLaden(Daten d, JFrame parentComponent) {
        super(d, parentComponent);
        initComponents();
        init();
    }

    private void init() {
        jButtonAkualisieren.setIcon(GetIcon.getIcon("view-refresh_16.png"));
        jButtonDateiAuswaehlen.setIcon(GetIcon.getIcon("fileopen_16.png"));
        initRadio();
        tabelleLaden();
        jButtonAkualisieren.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                listeFilmlistenSuchen();
            }
        });
        jButtonDateiAuswaehlen.addActionListener(new BeobPfad());
        jButtonFilmeLaden.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (jCheckBoxUpdate.isSelected()) {
                    Daten.filmeLaden.updateFilmliste(jTextFieldUrl.getText());
                } else {
                    Daten.filmeLaden.importFilmliste(jTextFieldUrl.getText());
                }
            }
        });
        jRadioButtonUpdateAus.addActionListener(new BeobOption());
        jRadioButtonAuto.addActionListener(new BeobOption());
        jRadioButtonKomplett.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                jCheckBoxUpdate.setSelected(jRadioButtonDiffs.isSelected());
                tabelleLaden();
            }
        });
        jRadioButtonDiffs.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent e) {
                jCheckBoxUpdate.setSelected(jRadioButtonDiffs.isSelected());
                tabelleLaden();
            }
        });
        //jTable1.getSelectionModel().addListSelectionListener(new BeobachterTableSelect());
        jTable1.addMouseListener(new BeobachterTableSelect());
        jTextFieldUrl.getDocument().addDocumentListener(new BeobDateiUrl());
        ListenerMediathekView.addListener(new ListenerMediathekView(ListenerMediathekView.EREIGNIS_LISTE_URL_FILMLISTEN, PanelFilmlisteLaden.class.getSimpleName()) {
            @Override
            public void ping() {
                tabelleLaden();
            }
        });
        ListenerMediathekView.addListener(new ListenerMediathekView(ListenerMediathekView.EREIGNIS_ART_IMPORT_FILMLISTE, PanelFilmlisteLaden.class.getSimpleName()) {
            @Override
            public void ping() {
                initRadio();
            }
        });
    }

    private void initRadio() {
        if (GuiFunktionen.getImportArtFilme() == GuiKonstanten.UPDATE_FILME_AUS) {
            jRadioButtonUpdateAus.setSelected(true);
        } else {
            jRadioButtonAuto.setSelected(true);
        }
        jTextFieldUrl.setText(Daten.mVConfig.get(MVConfig.SYSTEM_IMPORT_URL_MANUELL));
        setPanelTabelle(jRadioButtonUpdateAus.isSelected());
    }

    private void listeFilmlistenSuchen() {
        this.setCursor(Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR));
        Daten.filmeLaden.getDownloadUrlsFilmlisten(true, jRadioButtonDiffs.isSelected() /*diffs*/); // Liste neu laden und eine URL auswählen
        stopBeob = true;
        tabelleLaden();
        stopBeob = false;
        this.setCursor(Cursor.getDefaultCursor());
    }

    private void tabelleLaden() {
        jTable1.setModel(new TModel(Daten.filmeLaden.getDownloadUrlsFilmlisten(false, jRadioButtonDiffs.isSelected() /*diffs*/).getTableObjectData(), MSFilmlistenSuchen.FILM_UPDATE_SERVER_COLUMN_NAMES_ANZEIGE));
        for (int i = 0; i < jTable1.getColumnCount(); ++i) {
            if (i == MSFilmlistenSuchen.FILM_UPDATE_SERVER_URL_NR) {
                jTable1.getColumnModel().getColumn(i).setMinWidth(10);
                jTable1.getColumnModel().getColumn(i).setMaxWidth(3000);
                jTable1.getColumnModel().getColumn(i).setPreferredWidth(350);
            } else if (!Daten.debug && i == MSFilmlistenSuchen.FILM_UPDATE_SERVER_PRIO_NR) {
                jTable1.getColumnModel().getColumn(i).setMinWidth(0);
                jTable1.getColumnModel().getColumn(i).setMaxWidth(0);
                jTable1.getColumnModel().getColumn(i).setPreferredWidth(0);
            } else {
                jTable1.getColumnModel().getColumn(i).setMinWidth(10);
                jTable1.getColumnModel().getColumn(i).setMaxWidth(3000);
                jTable1.getColumnModel().getColumn(i).setPreferredWidth(100);
            }
        }
        if (jRadioButtonDiffs.isSelected() /*diffs*/) {
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_DATUM_NR)).setMinWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_DATUM_NR)).setPreferredWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_DATUM_NR)).setMaxWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_ZEIT_NR)).setMinWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_ZEIT_NR)).setPreferredWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_ZEIT_NR)).setMaxWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_PRIO_NR)).setMinWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_PRIO_NR)).setPreferredWidth(0);
            jTable1.getColumnModel().getColumn(jTable1.convertColumnIndexToView(MSFilmlistenSuchen.FILM_UPDATE_SERVER_PRIO_NR)).setMaxWidth(0);
        }
    }

    private void table1Select(boolean doppel) {
        stopBeob = true;
        DatenUrlFilmliste datenUrlFilmliste = null;
        int selectedTableRow = jTable1.getSelectedRow();
        if (selectedTableRow >= 0) {
            datenUrlFilmliste = Daten.filmeLaden.getDownloadUrlsFilmlisten(false, jRadioButtonDiffs.isSelected() /*diffs*/).getDatenUrlFilmliste(jTable1.getModel().getValueAt(jTable1.convertRowIndexToModel(selectedTableRow),
                    MSFilmlistenSuchen.FILM_UPDATE_SERVER_URL_NR).toString());
        }
        if (datenUrlFilmliste != null) {
            //jRadioButtonUpdateAus.setSelected(true);
            //daten.system[Konstanten.SYSTEM_IMPORT_ART_FILME_NR] = String.valueOf(Konstanten.UPDATE_FILME_AUS);
            jTextFieldUrl.setText(datenUrlFilmliste.arr[MSFilmlistenSuchen.FILM_UPDATE_SERVER_URL_NR]);
            if (doppel) {
                // dann wars ein Doppelklick, gleich laden
                if (jCheckBoxUpdate.isSelected()) {
                    Daten.filmeLaden.updateFilmliste(jTextFieldUrl.getText());
                } else {
                    Daten.filmeLaden.importFilmliste(jTextFieldUrl.getText());
                }
            }
        }
        stopBeob = false;
        if (doppel && dialog != null) {
            dialog.dispose();
        }
    }

    private void setPanelTabelle(boolean manuell) {
        if (manuell) {
            jTextAreaManuell.setBackground(MVColor.FILMLISTE_LADEN_AKTIV.color);
            jTextAreaAuto.setBackground(null);
        } else {
            jTextAreaManuell.setBackground(null);
            jTextAreaAuto.setBackground(MVColor.FILMLISTE_LADEN_AKTIV.color);
        }
    }

    /** This method is called from within the constructor to
     * initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is
     * always regenerated by the Form Editor.
     */
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        javax.swing.ButtonGroup buttonGroup1 = new javax.swing.ButtonGroup();
        jCheckBox1 = new javax.swing.JCheckBox();
        buttonGroup2 = new javax.swing.ButtonGroup();
        javax.swing.JPanel jPanel3 = new javax.swing.JPanel();
        javax.swing.JScrollPane jScrollPane2 = new javax.swing.JScrollPane();
        jTextAreaAuto = new javax.swing.JTextArea();
        javax.swing.JPanel jPanel2 = new javax.swing.JPanel();
        javax.swing.JScrollPane jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        javax.swing.JLabel jLabel2 = new javax.swing.JLabel();
        jButtonAkualisieren = new javax.swing.JButton();
        javax.swing.JLabel jLabel1 = new javax.swing.JLabel();
        jTextFieldUrl = new javax.swing.JTextField();
        jButtonDateiAuswaehlen = new javax.swing.JButton();
        jButtonFilmeLaden = new javax.swing.JButton();
        javax.swing.JScrollPane jScrollPane3 = new javax.swing.JScrollPane();
        jTextAreaManuell = new javax.swing.JTextArea();
        jCheckBoxUpdate = new javax.swing.JCheckBox();
        jRadioButtonKomplett = new javax.swing.JRadioButton();
        jRadioButtonDiffs = new javax.swing.JRadioButton();
        jRadioButtonAuto = new javax.swing.JRadioButton();
        jRadioButtonUpdateAus = new javax.swing.JRadioButton();

        jCheckBox1.setText("jCheckBox1");

        jPanel3.setBorder(javax.swing.BorderFactory.createTitledBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 255)), "Die Filmliste automatisch laden"));

        jTextAreaAuto.setEditable(false);
        jTextAreaAuto.setColumns(20);
        jTextAreaAuto.setRows(4);
        jTextAreaAuto.setText("Die Filmliste wird beim Programmstart automatisch geladen (wenn sie\nälter als 3h ist). Zusätzlich kann sie über den Button \"Neue Filmliste laden\"\naktualisiert werden. Zum Update werden dann nur noch die Differenzlisten geladen (enthalten\nnur die neuen Filme).");
        jTextAreaAuto.setMargin(new java.awt.Insets(4, 4, 4, 4));
        jScrollPane2.setViewportView(jTextAreaAuto);

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jScrollPane2)
                .addContainerGap())
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );

        jPanel2.setBorder(javax.swing.BorderFactory.createTitledBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 255)), "Filmliste nur manuell laden"));

        jTable1.setAutoCreateRowSorter(true);
        jTable1.setBorder(javax.swing.BorderFactory.createEtchedBorder());
        jTable1.setModel(new TModel());
        jTable1.setAutoResizeMode(javax.swing.JTable.AUTO_RESIZE_OFF);
        jScrollPane1.setViewportView(jTable1);

        jLabel2.setText("Liste der Downloadserver (URLs) aktualisieren:");

        jButtonAkualisieren.setIcon(new javax.swing.ImageIcon(getClass().getResource("/mediathek/res/view-refresh_16.png"))); // NOI18N

        jLabel1.setText("URL/Datei:");

        jButtonDateiAuswaehlen.setIcon(new javax.swing.ImageIcon(getClass().getResource("/mediathek/res/fileopen_16.png"))); // NOI18N

        jButtonFilmeLaden.setText("Filme jetzt laden");

        jTextAreaManuell.setEditable(false);
        jTextAreaManuell.setColumns(20);
        jTextAreaManuell.setRows(4);
        jTextAreaManuell.setText("Die Filmliste wird nur manuell über den Button \"Neue Filmliste laden\"\ngeladen. Es wird dann dieser Dialog angezeigt und es kann eine URL/Datei zum\nLaden ausgewählt werden.\nIst die Filmliste nicht älter als 1 Tag, reicht eine Differenzliste (enthält nur die neuen Filme).");
        jTextAreaManuell.setMargin(new java.awt.Insets(4, 4, 4, 4));
        jScrollPane3.setViewportView(jTextAreaManuell);

        jCheckBoxUpdate.setText("alte Filmliste nicht löschen, nur erweitern");

        buttonGroup2.add(jRadioButtonKomplett);
        jRadioButtonKomplett.setSelected(true);
        jRadioButtonKomplett.setText("komplette Listen");

        buttonGroup2.add(jRadioButtonDiffs);
        jRadioButtonDiffs.setText("Differenzlisten");

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addComponent(jRadioButtonDiffs)
                        .addGap(0, 0, Short.MAX_VALUE))
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 690, Short.MAX_VALUE)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                        .addComponent(jLabel1)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jTextFieldUrl)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButtonDateiAuswaehlen))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                        .addComponent(jRadioButtonKomplett)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(jLabel2)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButtonAkualisieren))
                    .addComponent(jScrollPane3)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                        .addComponent(jCheckBoxUpdate)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(jButtonFilmeLaden)))
                .addContainerGap())
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addComponent(jScrollPane3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.CENTER)
                    .addComponent(jRadioButtonKomplett)
                    .addComponent(jLabel2)
                    .addComponent(jButtonAkualisieren))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jRadioButtonDiffs)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 231, Short.MAX_VALUE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jTextFieldUrl, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel1)
                    .addComponent(jButtonDateiAuswaehlen))
                .addGap(18, 18, 18)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jButtonFilmeLaden)
                    .addComponent(jCheckBoxUpdate))
                .addContainerGap())
        );

        jPanel2Layout.linkSize(javax.swing.SwingConstants.VERTICAL, new java.awt.Component[] {jButtonDateiAuswaehlen, jLabel1, jTextFieldUrl});

        buttonGroup1.add(jRadioButtonAuto);

        buttonGroup1.add(jRadioButtonUpdateAus);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jRadioButtonAuto)
                    .addComponent(jRadioButtonUpdateAus))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jPanel3, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jRadioButtonAuto)
                    .addComponent(jPanel3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jRadioButtonUpdateAus)
                        .addGap(0, 0, Short.MAX_VALUE)))
                .addContainerGap())
        );
    }// </editor-fold>//GEN-END:initComponents
    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.ButtonGroup buttonGroup2;
    private javax.swing.JButton jButtonAkualisieren;
    private javax.swing.JButton jButtonDateiAuswaehlen;
    private javax.swing.JButton jButtonFilmeLaden;
    private javax.swing.JCheckBox jCheckBox1;
    private javax.swing.JCheckBox jCheckBoxUpdate;
    private javax.swing.JRadioButton jRadioButtonAuto;
    private javax.swing.JRadioButton jRadioButtonDiffs;
    private javax.swing.JRadioButton jRadioButtonKomplett;
    private javax.swing.JRadioButton jRadioButtonUpdateAus;
    private javax.swing.JTable jTable1;
    private javax.swing.JTextArea jTextAreaAuto;
    private javax.swing.JTextArea jTextAreaManuell;
    private javax.swing.JTextField jTextFieldUrl;
    // End of variables declaration//GEN-END:variables

    private class BeobOption implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            if (!stopBeob) {
                if (jRadioButtonUpdateAus.isSelected()) {
                    Daten.mVConfig.add(MVConfig.SYSTEM_IMPORT_ART_FILME, String.valueOf(GuiKonstanten.UPDATE_FILME_AUS));
                } else {
                    Daten.mVConfig.add(MVConfig.SYSTEM_IMPORT_ART_FILME, String.valueOf(GuiKonstanten.UPDATE_FILME_AUTO));
                }                // den Dialog gibts 2x
                ListenerMediathekView.notify(ListenerMediathekView.EREIGNIS_ART_IMPORT_FILMLISTE, this.getClass().getSimpleName());
            }
        }
    }

    private class BeobachterTableSelect implements MouseListener {

        public void valueChanged(ListSelectionEvent event) {
            if (!stopBeob) {
                if (!event.getValueIsAdjusting()) {
                    table1Select(false);
                }
            }
        }

        @Override
        public void mouseClicked(MouseEvent e) {
            if (e.getClickCount() == 2) {
                table1Select(true);
            } else {
                table1Select(false);
            }
        }

        @Override
        public void mousePressed(MouseEvent e) {
        }

        @Override
        public void mouseReleased(MouseEvent e) {
        }

        @Override
        public void mouseEntered(MouseEvent e) {
        }

        @Override
        public void mouseExited(MouseEvent e) {
        }
    }

    private class BeobPfad implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            //we can use native chooser on Mac...
            if (SystemInfo.isMacOSX()) {
                FileDialog chooser = new FileDialog(daten.mediathekGui, "Filmliste laden");
                chooser.setMode(FileDialog.LOAD);
                chooser.setVisible(true);
                if (chooser.getFile() != null) {
                    try {
                        File destination = new File(chooser.getDirectory() + chooser.getFile());
                        jTextFieldUrl.setText(destination.getAbsolutePath());
                    } catch (Exception ex) {
                        Log.fehlerMeldung(102036579, Log.FEHLER_ART_PROG, "PanelImportFilme.BeobPfad", ex);
                    }
                }
            } else {
                int returnVal;
                JFileChooser chooser = new JFileChooser();
                if (!jTextFieldUrl.getText().equals("")) {
                    chooser.setCurrentDirectory(new File(jTextFieldUrl.getText()));
                }
                chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
                chooser.setFileHidingEnabled(false);
                returnVal = chooser.showOpenDialog(null);
                if (returnVal == JFileChooser.APPROVE_OPTION) {
                    try {
                        jTextFieldUrl.setText(chooser.getSelectedFile().getAbsolutePath());
                    } catch (Exception ex) {
                        Log.fehlerMeldung(733025319, Log.FEHLER_ART_PROG, "PanelImportFilme.BeobPfad", ex);
                    }
                }
            }
        }
    }

    private class BeobDateiUrl implements DocumentListener {

        @Override
        public void insertUpdate(DocumentEvent e) {
            tus();
        }

        @Override
        public void removeUpdate(DocumentEvent e) {
            tus();
        }

        @Override
        public void changedUpdate(DocumentEvent e) {
            tus();
        }

        private void tus() {
            Daten.mVConfig.add(MVConfig.SYSTEM_IMPORT_URL_MANUELL, jTextFieldUrl.getText());
        }
    }
}
