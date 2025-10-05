// Internationalization (i18n) for PV Monitor Card
// Supported languages: de, en, fr, it, es

export type SupportedLanguage = 'de' | 'en' | 'fr' | 'it' | 'es';

export interface Translations {
    // General
    general: {
        missing_entity: string;
        inactive: string;
    };

    // Editor Labels
    editor: {
        // Tabs
        tab_general: string;
        tab_styling: string;
        tab_infobar: string;
        tab_pv: string;
        tab_battery: string;
        tab_house: string;
        tab_grid: string;

        // General Tab
        card_header: string;
        title: string;
        title_placeholder: string;
        title_helper: string;
        subtitle: string;
        subtitle_placeholder: string;
        subtitle_helper: string;
        icon: string;
        icon_helper: string;
        layout: string;
        grid_gap: string;
        grid_gap_placeholder: string;
        grid_gap_helper: string;
        language: string;
        language_helper: string;

        // Info Bar Tab
        infobar_settings: string;
        enable_infobar: string;
        item: string;
        entity: string;
        icon_label: string;
        label: string;
        unit: string;

        // Info Bar Default Labels
        default_autarky: string;
        default_runtime: string;
        default_chargetime: string;

        // PV Tab
        pv_system: string;
        pv_entity: string;
        pv_entity_helper: string;
        enable_animation: string;
        icon_rotation: string;
        icon_rotation_helper: string;
        max_power: string;
        max_power_helper: string;

        // Battery Tab
        battery: string;
        battery_entity: string;
        battery_entity_helper: string;
        charge_entity: string;
        charge_entity_helper: string;
        discharge_entity: string;
        discharge_entity_helper: string;
        battery_capacity: string;
        battery_capacity_helper: string;
        calculate_runtime: string;
        calculate_runtime_helper: string;
        icon_auto_helper: string;

        // House Tab
        house_consumption: string;
        house_entity: string;
        house_entity_helper: string;

        // Grid Tab
        grid: string;
        grid_entity: string;
        grid_entity_helper: string;
        threshold: string;
        threshold_helper: string;
        status_texts: string;
        text_feed_in: string;
        text_feed_in_placeholder: string;
        text_neutral: string;
        text_neutral_placeholder: string;
        text_consumption: string;
        text_consumption_placeholder: string;

        // Common
        additional_texts: string;
        secondary_entity: string;
        secondary_entity_helper: string;
        secondary_text: string;
        secondary_text_helper: string;
        tertiary_entity: string;
        tertiary_text: string;
        styling: string;
        background_color: string;
        border_color: string;
        primary_color: string;
        secondary_color: string;
        icon_color: string;

        // Styling Tab
        card_styling: string;
        border_radius: string;
        text_color: string;
        padding: string;
        cursor: string;
        title_subtitle: string;
        title_size: string;
        title_color: string;
        title_alignment: string;
        title_alignment_helper: string;
        title_font_weight: string;
        subtitle_size: string;
        subtitle_color: string;
        subtitle_alignment: string;
        subtitle_font_weight: string;
        icons: string;
        icon_size: string;
        icon_opacity: string;
        icon_margin: string;
        primary_text_styling: string;
        primary_size: string;
        primary_color_label: string;
        primary_opacity: string;
        primary_font_weight: string;
        secondary_text_styling: string;
        secondary_size: string;
        secondary_color_label: string;
        secondary_opacity: string;
        secondary_font_weight: string;
        tertiary_text_styling: string;
        tertiary_size: string;
        tertiary_color_label: string;
        tertiary_opacity: string;
        tertiary_font_weight: string;

        // Picker Labels
        select_entity: string;
        select_icon: string;

        // Theme
        theme: string;
        theme_helper: string;
        select_theme: string;
    };

    // Runtime Status Texts
    status: {
        feed_in: string;
        neutral: string;
        grid_consumption: string;
        inactive: string;
    };
}

export const translations: Record<SupportedLanguage, Translations> = {
    de: {
        general: {
            missing_entity: 'fehlt',
            inactive: 'Inaktiv',
        },
        editor: {
            tab_general: 'Allgemein',
            tab_styling: 'Styling',
            tab_infobar: 'Info Bar',
            tab_pv: 'PV-Anlage',
            tab_battery: 'Batterie',
            tab_house: 'Haus',
            tab_grid: 'Netz',

            card_header: 'Karten-Header',
            title: 'Titel',
            title_placeholder: 'PV Monitor',
            title_helper: 'Leer lassen um auszublenden.',
            subtitle: 'Untertitel',
            subtitle_placeholder: 'Energieübersicht',
            subtitle_helper: 'Leer lassen um auszublenden.',
            icon: 'Icon',
            icon_helper: 'Wird nur angezeigt, wenn auch ein Titel vorhanden ist, leer lassen um auszublenden.',
            layout: 'Layout',
            grid_gap: 'Grid Abstand',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Abstand zwischen den Karten.',
            language: 'Sprache',
            language_helper: 'Wählen Sie die Anzeigesprache',

            infobar_settings: 'Info Bar Einstellungen',
            enable_infobar: 'Info Bar aktivieren',
            item: 'Item',
            entity: 'Entity',
            icon_label: 'Icon',
            label: 'Label',
            unit: 'Einheit',

            default_autarky: 'Autarkie',
            default_runtime: 'Restlaufzeit',
            default_chargetime: 'Restladezeit',

            pv_system: 'PV-Anlage',
            pv_entity: 'PV Entity',
            pv_entity_helper: 'Entity für PV-Leistung',
            enable_animation: 'Animation aktivieren',
            icon_rotation: 'Icon Rotation',
            icon_rotation_helper: 'Icon dreht sich je nach Leistung',
            max_power: 'Max. Leistung (W)',
            max_power_helper: 'Maximale PV-Leistung für Animation & Rotation',

            battery: 'Batterie',
            battery_entity: 'Batterie Entity',
            battery_entity_helper: 'Entity für Batteriestand (%)',
            charge_entity: 'Ladung Entity',
            charge_entity_helper: 'Entity für Ladeleistung',
            discharge_entity: 'Entladung Entity',
            discharge_entity_helper: 'Entity für Entladeleistung',
            battery_capacity: 'Batteriekapazität (Wh)',
            battery_capacity_helper: 'Kapazität der Batterie für Animation (z.B. 10000 für 10 kWh)',
            calculate_runtime: 'Rest-/Ladezeit berechnen',
            calculate_runtime_helper: 'Automatische Berechnung für Info Bar Item 2 & 3',
            icon_auto_helper: 'Leer lassen für automatisches Icon',

            house_consumption: 'Hausverbrauch',
            house_entity: 'Haus Entity',
            house_entity_helper: 'Entity für Hausverbrauch',

            grid: 'Netz',
            grid_entity: 'Netz Entity',
            grid_entity_helper: 'Entity für Netzbezug/Einspeisung',
            threshold: 'Schwellwert (W)',
            threshold_helper: 'Unterhalb dieses Werts wird "Neutral" angezeigt',
            status_texts: 'Status-Texte',
            text_feed_in: 'Text bei Einspeisung',
            text_feed_in_placeholder: 'Einspeisung',
            text_neutral: 'Text bei Neutral',
            text_neutral_placeholder: 'Neutral',
            text_consumption: 'Text bei Bezug',
            text_consumption_placeholder: 'Netzbezug',

            additional_texts: 'Zusätzliche Texte',
            secondary_entity: 'Sekundär Entity',
            secondary_entity_helper: 'Optional: Entity für 2. Zeile',
            secondary_text: 'Sekundär Text',
            secondary_text_helper: 'Optional: Statischer Text für 2. Zeile',
            tertiary_entity: 'Tertiär Entity',
            tertiary_text: 'Tertiär Text',
            styling: 'Styling',
            background_color: 'Hintergrundfarbe',
            border_color: 'Rahmenfarbe',
            primary_color: 'Primärfarbe',
            secondary_color: 'Sekundärfarbe',
            icon_color: 'Icon Farbe',

            card_styling: 'Karten-Styling',
            border_radius: 'Border Radius',
            text_color: 'Textfarbe',
            padding: 'Padding',
            cursor: 'Cursor',
            title_subtitle: 'Titel & Untertitel',
            title_size: 'Titel Größe',
            title_color: 'Titel Farbe',
            title_alignment: 'Titel Ausrichtung',
            title_alignment_helper: 'left, center, right',
            title_font_weight: 'Titel Font-Weight',
            subtitle_size: 'Untertitel Größe',
            subtitle_color: 'Untertitel Farbe',
            subtitle_alignment: 'Untertitel Ausrichtung',
            subtitle_font_weight: 'Untertitel Font-Weight',
            icons: 'Icons',
            icon_size: 'Icon Größe',
            icon_opacity: 'Icon Opacity',
            icon_margin: 'Icon Margin',
            primary_text_styling: 'Primär-Text (Hauptwert)',
            primary_size: 'Primär Größe',
            primary_color_label: 'Primär Farbe',
            primary_opacity: 'Primär Opacity',
            primary_font_weight: 'Primär Font-Weight',
            secondary_text_styling: 'Sekundär-Text (2. Zeile)',
            secondary_size: 'Sekundär Größe',
            secondary_color_label: 'Sekundär Farbe',
            secondary_opacity: 'Sekundär Opacity',
            secondary_font_weight: 'Sekundär Font-Weight',
            tertiary_text_styling: 'Tertiär-Text (3. Zeile)',
            tertiary_size: 'Tertiär Größe',
            tertiary_color_label: 'Tertiär Farbe',
            tertiary_opacity: 'Tertiär Opacity',
            tertiary_font_weight: 'Tertiär Font-Weight',

            select_entity: 'Entity auswählen',
            select_icon: 'Icon auswählen',

            theme: 'Theme',
            theme_helper: 'Wählen Sie ein vordefiniertes Farbthema',
            select_theme: 'Theme auswählen',
        },
        status: {
            feed_in: 'Einspeisung',
            neutral: 'Neutral',
            grid_consumption: 'Netzbezug',
            inactive: 'Inaktiv',
        },
    },

    en: {
        general: {
            missing_entity: 'missing',
            inactive: 'Inactive',
        },
        editor: {
            tab_general: 'General',
            tab_styling: 'Styling',
            tab_infobar: 'Info Bar',
            tab_pv: 'PV System',
            tab_battery: 'Battery',
            tab_house: 'House',
            tab_grid: 'Grid',

            card_header: 'Card Header',
            title: 'Title',
            title_placeholder: 'PV Monitor',
            title_helper: 'Leave empty to hide.',
            subtitle: 'Subtitle',
            subtitle_placeholder: 'Energy Overview',
            subtitle_helper: 'Leave empty to hide.',
            icon: 'Icon',
            icon_helper: 'Only shown when a title is present, leave empty to hide.',
            layout: 'Layout',
            grid_gap: 'Grid Gap',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Space between cards.',
            language: 'Language',
            language_helper: 'Select display language',

            infobar_settings: 'Info Bar Settings',
            enable_infobar: 'Enable Info Bar',
            item: 'Item',
            entity: 'Entity',
            icon_label: 'Icon',
            label: 'Label',
            unit: 'Unit',

            default_autarky: 'Self-Sufficiency',
            default_runtime: 'Battery Runtime',
            default_chargetime: 'Charge Time',

            pv_system: 'PV System',
            pv_entity: 'PV Entity',
            pv_entity_helper: 'Entity for PV power',
            enable_animation: 'Enable Animation',
            icon_rotation: 'Icon Rotation',
            icon_rotation_helper: 'Icon rotates based on power',
            max_power: 'Max. Power (W)',
            max_power_helper: 'Maximum PV power for animation & rotation',

            battery: 'Battery',
            battery_entity: 'Battery Entity',
            battery_entity_helper: 'Entity for battery level (%)',
            charge_entity: 'Charge Entity',
            charge_entity_helper: 'Entity for charging power',
            discharge_entity: 'Discharge Entity',
            discharge_entity_helper: 'Entity for discharging power',
            battery_capacity: 'Battery Capacity (Wh)',
            battery_capacity_helper: 'Battery capacity for animation (e.g. 10000 for 10 kWh)',
            calculate_runtime: 'Calculate Runtime/Charge Time',
            calculate_runtime_helper: 'Automatic calculation for Info Bar Item 2 & 3',
            icon_auto_helper: 'Leave empty for automatic icon',

            house_consumption: 'House Consumption',
            house_entity: 'House Entity',
            house_entity_helper: 'Entity for house consumption',

            grid: 'Grid',
            grid_entity: 'Grid Entity',
            grid_entity_helper: 'Entity for grid consumption/feed-in',
            threshold: 'Threshold (W)',
            threshold_helper: 'Below this value "Neutral" is displayed',
            status_texts: 'Status Texts',
            text_feed_in: 'Text for Feed-in',
            text_feed_in_placeholder: 'Feed-in',
            text_neutral: 'Text for Neutral',
            text_neutral_placeholder: 'Neutral',
            text_consumption: 'Text for Consumption',
            text_consumption_placeholder: 'Grid Consumption',

            additional_texts: 'Additional Texts',
            secondary_entity: 'Secondary Entity',
            secondary_entity_helper: 'Optional: Entity for 2nd line',
            secondary_text: 'Secondary Text',
            secondary_text_helper: 'Optional: Static text for 2nd line',
            tertiary_entity: 'Tertiary Entity',
            tertiary_text: 'Tertiary Text',
            styling: 'Styling',
            background_color: 'Background Color',
            border_color: 'Border Color',
            primary_color: 'Primary Color',
            secondary_color: 'Secondary Color',
            icon_color: 'Icon Color',

            card_styling: 'Card Styling',
            border_radius: 'Border Radius',
            text_color: 'Text Color',
            padding: 'Padding',
            cursor: 'Cursor',
            title_subtitle: 'Title & Subtitle',
            title_size: 'Title Size',
            title_color: 'Title Color',
            title_alignment: 'Title Alignment',
            title_alignment_helper: 'left, center, right',
            title_font_weight: 'Title Font Weight',
            subtitle_size: 'Subtitle Size',
            subtitle_color: 'Subtitle Color',
            subtitle_alignment: 'Subtitle Alignment',
            subtitle_font_weight: 'Subtitle Font Weight',
            icons: 'Icons',
            icon_size: 'Icon Size',
            icon_opacity: 'Icon Opacity',
            icon_margin: 'Icon Margin',
            primary_text_styling: 'Primary Text (Main Value)',
            primary_size: 'Primary Size',
            primary_color_label: 'Primary Color',
            primary_opacity: 'Primary Opacity',
            primary_font_weight: 'Primary Font Weight',
            secondary_text_styling: 'Secondary Text (2nd Line)',
            secondary_size: 'Secondary Size',
            secondary_color_label: 'Secondary Color',
            secondary_opacity: 'Secondary Opacity',
            secondary_font_weight: 'Secondary Font Weight',
            tertiary_text_styling: 'Tertiary Text (3rd Line)',
            tertiary_size: 'Tertiary Size',
            tertiary_color_label: 'Tertiary Color',
            tertiary_opacity: 'Tertiary Opacity',
            tertiary_font_weight: 'Tertiary Font Weight',

            select_entity: 'Select Entity',
            select_icon: 'Select Icon',

            theme: 'Theme',
            theme_helper: 'Select a predefined color theme',
            select_theme: 'Select Theme',
        },
        status: {
            feed_in: 'Feed-in',
            neutral: 'Neutral',
            grid_consumption: 'Grid Consumption',
            inactive: 'Inactive',
        },
    },

    fr: {
        general: {
            missing_entity: 'manquant',
            inactive: 'Inactif',
        },
        editor: {
            tab_general: 'Général',
            tab_styling: 'Style',
            tab_infobar: 'Barre d\'Info',
            tab_pv: 'Installation PV',
            tab_battery: 'Batterie',
            tab_house: 'Maison',
            tab_grid: 'Réseau',

            card_header: 'En-tête de Carte',
            title: 'Titre',
            title_placeholder: 'Moniteur PV',
            title_helper: 'Laisser vide pour masquer.',
            subtitle: 'Sous-titre',
            subtitle_placeholder: 'Aperçu Énergétique',
            subtitle_helper: 'Laisser vide pour masquer.',
            icon: 'Icône',
            icon_helper: 'Affiché uniquement si un titre est présent, laisser vide pour masquer.',
            layout: 'Disposition',
            grid_gap: 'Espacement Grille',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Espace entre les cartes.',
            language: 'Langue',
            language_helper: 'Sélectionner la langue d\'affichage',

            infobar_settings: 'Paramètres Barre d\'Info',
            enable_infobar: 'Activer la Barre d\'Info',
            item: 'Élément',
            entity: 'Entité',
            icon_label: 'Icône',
            label: 'Libellé',
            unit: 'Unité',

            default_autarky: 'Autosuffisance',
            default_runtime: 'Autonomie Batterie',
            default_chargetime: 'Temps de Charge',

            pv_system: 'Installation PV',
            pv_entity: 'Entité PV',
            pv_entity_helper: 'Entité pour la puissance PV',
            enable_animation: 'Activer l\'Animation',
            icon_rotation: 'Rotation d\'Icône',
            icon_rotation_helper: 'L\'icône tourne selon la puissance',
            max_power: 'Puissance Max. (W)',
            max_power_helper: 'Puissance PV maximale pour animation & rotation',

            battery: 'Batterie',
            battery_entity: 'Entité Batterie',
            battery_entity_helper: 'Entité pour le niveau de batterie (%)',
            charge_entity: 'Entité Charge',
            charge_entity_helper: 'Entité pour la puissance de charge',
            discharge_entity: 'Entité Décharge',
            discharge_entity_helper: 'Entité pour la puissance de décharge',
            battery_capacity: 'Capacité Batterie (Wh)',
            battery_capacity_helper: 'Capacité de la batterie pour animation (ex: 10000 pour 10 kWh)',
            calculate_runtime: 'Calculer Autonomie/Temps de Charge',
            calculate_runtime_helper: 'Calcul automatique pour Barre d\'Info Élément 2 & 3',
            icon_auto_helper: 'Laisser vide pour icône automatique',

            house_consumption: 'Consommation Maison',
            house_entity: 'Entité Maison',
            house_entity_helper: 'Entité pour consommation de la maison',

            grid: 'Réseau',
            grid_entity: 'Entité Réseau',
            grid_entity_helper: 'Entité pour consommation/injection réseau',
            threshold: 'Seuil (W)',
            threshold_helper: 'En dessous de cette valeur "Neutre" est affiché',
            status_texts: 'Textes de Statut',
            text_feed_in: 'Texte pour Injection',
            text_feed_in_placeholder: 'Injection',
            text_neutral: 'Texte pour Neutre',
            text_neutral_placeholder: 'Neutre',
            text_consumption: 'Texte pour Consommation',
            text_consumption_placeholder: 'Consommation Réseau',

            additional_texts: 'Textes Supplémentaires',
            secondary_entity: 'Entité Secondaire',
            secondary_entity_helper: 'Optionnel: Entité pour 2ème ligne',
            secondary_text: 'Texte Secondaire',
            secondary_text_helper: 'Optionnel: Texte statique pour 2ème ligne',
            tertiary_entity: 'Entité Tertiaire',
            tertiary_text: 'Texte Tertiaire',
            styling: 'Style',
            background_color: 'Couleur de Fond',
            border_color: 'Couleur de Bordure',
            primary_color: 'Couleur Primaire',
            secondary_color: 'Couleur Secondaire',
            icon_color: 'Couleur d\'Icône',

            card_styling: 'Style de Carte',
            border_radius: 'Rayon de Bordure',
            text_color: 'Couleur de Texte',
            padding: 'Espacement',
            cursor: 'Curseur',
            title_subtitle: 'Titre & Sous-titre',
            title_size: 'Taille Titre',
            title_color: 'Couleur Titre',
            title_alignment: 'Alignement Titre',
            title_alignment_helper: 'left, center, right',
            title_font_weight: 'Épaisseur Police Titre',
            subtitle_size: 'Taille Sous-titre',
            subtitle_color: 'Couleur Sous-titre',
            subtitle_alignment: 'Alignement Sous-titre',
            subtitle_font_weight: 'Épaisseur Police Sous-titre',
            icons: 'Icônes',
            icon_size: 'Taille Icône',
            icon_opacity: 'Opacité Icône',
            icon_margin: 'Marge Icône',
            primary_text_styling: 'Texte Primaire (Valeur Principale)',
            primary_size: 'Taille Primaire',
            primary_color_label: 'Couleur Primaire',
            primary_opacity: 'Opacité Primaire',
            primary_font_weight: 'Épaisseur Police Primaire',
            secondary_text_styling: 'Texte Secondaire (2ème Ligne)',
            secondary_size: 'Taille Secondaire',
            secondary_color_label: 'Couleur Secondaire',
            secondary_opacity: 'Opacité Secondaire',
            secondary_font_weight: 'Épaisseur Police Secondaire',
            tertiary_text_styling: 'Texte Tertiaire (3ème Ligne)',
            tertiary_size: 'Taille Tertiaire',
            tertiary_color_label: 'Couleur Tertiaire',
            tertiary_opacity: 'Opacité Tertiaire',
            tertiary_font_weight: 'Épaisseur Police Tertiaire',

            select_entity: 'Sélectionner Entité',
            select_icon: 'Sélectionner Icône',

            theme: 'Thème',
            theme_helper: 'Sélectionner un thème de couleur prédéfini',
            select_theme: 'Sélectionner Thème',
        },
        status: {
            feed_in: 'Injection',
            neutral: 'Neutre',
            grid_consumption: 'Consommation Réseau',
            inactive: 'Inactif',
        },
    },

    it: {
        general: {
            missing_entity: 'mancante',
            inactive: 'Inattivo',
        },
        editor: {
            tab_general: 'Generale',
            tab_styling: 'Stile',
            tab_infobar: 'Barra Info',
            tab_pv: 'Impianto FV',
            tab_battery: 'Batteria',
            tab_house: 'Casa',
            tab_grid: 'Rete',

            card_header: 'Intestazione Scheda',
            title: 'Titolo',
            title_placeholder: 'Monitor FV',
            title_helper: 'Lasciare vuoto per nascondere.',
            subtitle: 'Sottotitolo',
            subtitle_placeholder: 'Panoramica Energia',
            subtitle_helper: 'Lasciare vuoto per nascondere.',
            icon: 'Icona',
            icon_helper: 'Mostrato solo se è presente un titolo, lasciare vuoto per nascondere.',
            layout: 'Layout',
            grid_gap: 'Spaziatura Griglia',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Spazio tra le schede.',
            language: 'Lingua',
            language_helper: 'Seleziona lingua di visualizzazione',

            infobar_settings: 'Impostazioni Barra Info',
            enable_infobar: 'Attiva Barra Info',
            item: 'Elemento',
            entity: 'Entità',
            icon_label: 'Icona',
            label: 'Etichetta',
            unit: 'Unità',

            default_autarky: 'Autosufficienza',
            default_runtime: 'Autonomia Batteria',
            default_chargetime: 'Tempo di Ricarica',

            pv_system: 'Impianto FV',
            pv_entity: 'Entità FV',
            pv_entity_helper: 'Entità per potenza FV',
            enable_animation: 'Attiva Animazione',
            icon_rotation: 'Rotazione Icona',
            icon_rotation_helper: 'L\'icona ruota in base alla potenza',
            max_power: 'Potenza Max. (W)',
            max_power_helper: 'Potenza FV massima per animazione & rotazione',

            battery: 'Batteria',
            battery_entity: 'Entità Batteria',
            battery_entity_helper: 'Entità per livello batteria (%)',
            charge_entity: 'Entità Carica',
            charge_entity_helper: 'Entità per potenza di carica',
            discharge_entity: 'Entità Scarica',
            discharge_entity_helper: 'Entità per potenza di scarica',
            battery_capacity: 'Capacità Batteria (Wh)',
            battery_capacity_helper: 'Capacità della batteria per animazione (es. 10000 per 10 kWh)',
            calculate_runtime: 'Calcola Autonomia/Tempo di Ricarica',
            calculate_runtime_helper: 'Calcolo automatico per Barra Info Elemento 2 & 3',
            icon_auto_helper: 'Lasciare vuoto per icona automatica',

            house_consumption: 'Consumo Casa',
            house_entity: 'Entità Casa',
            house_entity_helper: 'Entità per consumo casa',

            grid: 'Rete',
            grid_entity: 'Entità Rete',
            grid_entity_helper: 'Entità per consumo/immissione rete',
            threshold: 'Soglia (W)',
            threshold_helper: 'Sotto questo valore viene visualizzato "Neutrale"',
            status_texts: 'Testi di Stato',
            text_feed_in: 'Testo per Immissione',
            text_feed_in_placeholder: 'Immissione',
            text_neutral: 'Testo per Neutrale',
            text_neutral_placeholder: 'Neutrale',
            text_consumption: 'Testo per Consumo',
            text_consumption_placeholder: 'Consumo Rete',

            additional_texts: 'Testi Aggiuntivi',
            secondary_entity: 'Entità Secondaria',
            secondary_entity_helper: 'Opzionale: Entità per 2a riga',
            secondary_text: 'Testo Secondario',
            secondary_text_helper: 'Opzionale: Testo statico per 2a riga',
            tertiary_entity: 'Entità Terziaria',
            tertiary_text: 'Testo Terziario',
            styling: 'Stile',
            background_color: 'Colore Sfondo',
            border_color: 'Colore Bordo',
            primary_color: 'Colore Primario',
            secondary_color: 'Colore Secondario',
            icon_color: 'Colore Icona',

            card_styling: 'Stile Scheda',
            border_radius: 'Raggio Bordo',
            text_color: 'Colore Testo',
            padding: 'Spaziatura',
            cursor: 'Cursore',
            title_subtitle: 'Titolo & Sottotitolo',
            title_size: 'Dimensione Titolo',
            title_color: 'Colore Titolo',
            title_alignment: 'Allineamento Titolo',
            title_alignment_helper: 'left, center, right',
            title_font_weight: 'Spessore Font Titolo',
            subtitle_size: 'Dimensione Sottotitolo',
            subtitle_color: 'Colore Sottotitolo',
            subtitle_alignment: 'Allineamento Sottotitolo',
            subtitle_font_weight: 'Spessore Font Sottotitolo',
            icons: 'Icone',
            icon_size: 'Dimensione Icona',
            icon_opacity: 'Opacità Icona',
            icon_margin: 'Margine Icona',
            primary_text_styling: 'Testo Primario (Valore Principale)',
            primary_size: 'Dimensione Primaria',
            primary_color_label: 'Colore Primario',
            primary_opacity: 'Opacità Primaria',
            primary_font_weight: 'Spessore Font Primario',
            secondary_text_styling: 'Testo Secondario (2a Riga)',
            secondary_size: 'Dimensione Secondaria',
            secondary_color_label: 'Colore Secondario',
            secondary_opacity: 'Opacità Secondaria',
            secondary_font_weight: 'Spessore Font Secondario',
            tertiary_text_styling: 'Testo Terziario (3a Riga)',
            tertiary_size: 'Dimensione Terziaria',
            tertiary_color_label: 'Colore Terziario',
            tertiary_opacity: 'Opacità Terziaria',
            tertiary_font_weight: 'Spessore Font Terziario',

            select_entity: 'Seleziona Entità',
            select_icon: 'Seleziona Icona',

            theme: 'Tema',
            theme_helper: 'Seleziona un tema di colori predefinito',
            select_theme: 'Seleziona Tema',
        },
        status: {
            feed_in: 'Immissione',
            neutral: 'Neutrale',
            grid_consumption: 'Consumo Rete',
            inactive: 'Inattivo',
        },
    },

    es: {
        general: {
            missing_entity: 'falta',
            inactive: 'Inactivo',
        },
        editor: {
            tab_general: 'General',
            tab_styling: 'Estilo',
            tab_infobar: 'Barra Info',
            tab_pv: 'Sistema FV',
            tab_battery: 'Batería',
            tab_house: 'Casa',
            tab_grid: 'Red',

            card_header: 'Encabezado de Tarjeta',
            title: 'Título',
            title_placeholder: 'Monitor FV',
            title_helper: 'Dejar vacío para ocultar.',
            subtitle: 'Subtítulo',
            subtitle_placeholder: 'Resumen de Energía',
            subtitle_helper: 'Dejar vacío para ocultar.',
            icon: 'Icono',
            icon_helper: 'Solo se muestra cuando hay un título, dejar vacío para ocultar.',
            layout: 'Diseño',
            grid_gap: 'Espaciado Cuadrícula',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Espacio entre tarjetas.',
            language: 'Idioma',
            language_helper: 'Seleccionar idioma de visualización',

            infobar_settings: 'Configuración Barra Info',
            enable_infobar: 'Activar Barra Info',
            item: 'Elemento',
            entity: 'Entidad',
            icon_label: 'Icono',
            label: 'Etiqueta',
            unit: 'Unidad',

            default_autarky: 'Autosuficiencia',
            default_runtime: 'Autonomía Batería',
            default_chargetime: 'Tiempo de Carga',

            pv_system: 'Sistema FV',
            pv_entity: 'Entidad FV',
            pv_entity_helper: 'Entidad para potencia FV',
            enable_animation: 'Activar Animación',
            icon_rotation: 'Rotación Icono',
            icon_rotation_helper: 'El icono gira según la potencia',
            max_power: 'Potencia Máx. (W)',
            max_power_helper: 'Potencia FV máxima para animación y rotación',

            battery: 'Batería',
            battery_entity: 'Entidad Batería',
            battery_entity_helper: 'Entidad para nivel de batería (%)',
            charge_entity: 'Entidad Carga',
            charge_entity_helper: 'Entidad para potencia de carga',
            discharge_entity: 'Entidad Descarga',
            discharge_entity_helper: 'Entidad para potencia de descarga',
            battery_capacity: 'Capacidad Batería (Wh)',
            battery_capacity_helper: 'Capacidad de la batería para animación (ej: 10000 para 10 kWh)',
            calculate_runtime: 'Calcular Autonomía/Tiempo de Carga',
            calculate_runtime_helper: 'Cálculo automático para Barra Info Elemento 2 y 3',
            icon_auto_helper: 'Dejar vacío para icono automático',

            house_consumption: 'Consumo Casa',
            house_entity: 'Entidad Casa',
            house_entity_helper: 'Entidad para consumo de la casa',

            grid: 'Red',
            grid_entity: 'Entidad Red',
            grid_entity_helper: 'Entidad para consumo/inyección de red',
            threshold: 'Umbral (W)',
            threshold_helper: 'Por debajo de este valor se muestra "Neutro"',
            status_texts: 'Textos de Estado',
            text_feed_in: 'Texto para Inyección',
            text_feed_in_placeholder: 'Inyección',
            text_neutral: 'Texto para Neutro',
            text_neutral_placeholder: 'Neutro',
            text_consumption: 'Texto para Consumo',
            text_consumption_placeholder: 'Consumo Red',

            additional_texts: 'Textos Adicionales',
            secondary_entity: 'Entidad Secundaria',
            secondary_entity_helper: 'Opcional: Entidad para 2ª línea',
            secondary_text: 'Texto Secundario',
            secondary_text_helper: 'Opcional: Texto estático para 2ª línea',
            tertiary_entity: 'Entidad Terciaria',
            tertiary_text: 'Texto Terciario',
            styling: 'Estilo',
            background_color: 'Color de Fondo',
            border_color: 'Color de Borde',
            primary_color: 'Color Primario',
            secondary_color: 'Color Secundario',
            icon_color: 'Color Icono',

            card_styling: 'Estilo de Tarjeta',
            border_radius: 'Radio de Borde',
            text_color: 'Color de Texto',
            padding: 'Espaciado',
            cursor: 'Cursor',
            title_subtitle: 'Título y Subtítulo',
            title_size: 'Tamaño Título',
            title_color: 'Color Título',
            title_alignment: 'Alineación Título',
            title_alignment_helper: 'left, center, right',
            title_font_weight: 'Grosor Fuente Título',
            subtitle_size: 'Tamaño Subtítulo',
            subtitle_color: 'Color Subtítulo',
            subtitle_alignment: 'Alineación Subtítulo',
            subtitle_font_weight: 'Grosor Fuente Subtítulo',
            icons: 'Iconos',
            icon_size: 'Tamaño Icono',
            icon_opacity: 'Opacidad Icono',
            icon_margin: 'Margen Icono',
            primary_text_styling: 'Texto Primario (Valor Principal)',
            primary_size: 'Tamaño Primario',
            primary_color_label: 'Color Primario',
            primary_opacity: 'Opacidad Primaria',
            primary_font_weight: 'Grosor Fuente Primaria',
            secondary_text_styling: 'Texto Secundario (2ª Línea)',
            secondary_size: 'Tamaño Secundario',
            secondary_color_label: 'Color Secundario',
            secondary_opacity: 'Opacidad Secundaria',
            secondary_font_weight: 'Grosor Fuente Secundaria',
            tertiary_text_styling: 'Texto Terciario (3ª Línea)',
            tertiary_size: 'Tamaño Terciario',
            tertiary_color_label: 'Color Terciario',
            tertiary_opacity: 'Opacidad Terciaria',
            tertiary_font_weight: 'Grosor Fuente Terciaria',

            select_entity: 'Seleccionar Entidad',
            select_icon: 'Seleccionar Icono',

            theme: 'Tema',
            theme_helper: 'Seleccionar un tema de colores predefinido',
            select_theme: 'Seleccionar Tema',
        },
        status: {
            feed_in: 'Inyección',
            neutral: 'Neutro',
            grid_consumption: 'Consumo Red',
            inactive: 'Inactivo',
        },
    },
};

/**
 * Detects the browser's language and returns a supported language code
 */
export function detectLanguage(): SupportedLanguage {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('it')) return 'it';
    if (browserLang.startsWith('es')) return 'es';

    return 'en'; // Default to English
}

/**
 * Gets translations for a specific language
 */
export function getTranslations(language?: SupportedLanguage): Translations {
    const lang = language || detectLanguage();
    return translations[lang] || translations.en;
}

/**
 * Language display names for the language selector
 */
export const languageNames: Record<SupportedLanguage, string> = {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    it: 'Italiano',
    es: 'Español',
};