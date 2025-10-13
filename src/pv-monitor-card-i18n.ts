// Internationalization (i18n) for PV Monitor Card
// Supported languages: de, en, fr, it, es

export type SupportedLanguage = 'de' | 'en' | 'fr' | 'it' | 'es';

export interface Translations {
    general: {
        missing_entity: string;
        inactive: string;
    };

    editor: {
        tab_general: string;
        tab_styling: string;
        tab_infobar: string;
        tab_pv: string;
        tab_battery: string;
        tab_house: string;
        tab_grid: string;

        card_header: string;
        title: string;
        title_placeholder: string;
        title_helper: string;
        subtitle: string;
        subtitle_placeholder: string;
        subtitle_helper: string;
        title_subtitle_gap: string;
        title_subtitle_gap_helper: string;
        icon: string;
        icon_helper: string;
        header_icon_size: string;
        header_icon_size_helper: string;
        header_icon_color: string;
        header_icon_margin: string;
        layout: string;
        grid_gap: string;
        grid_gap_placeholder: string;
        grid_gap_helper: string;
        header_margin_bottom: string;
        header_margin_bottom_helper: string;
        infobar_gap: string;
        infobar_gap_helper: string;
        language: string;
        language_helper: string;

        central_entities: string;
        central_entities_helper: string;
        entity_pv_production: string;
        entity_pv_production_helper: string;
        entity_battery_soc: string;
        entity_battery_soc_helper: string;
        entity_battery_charge: string;
        entity_battery_charge_helper: string;
        entity_battery_discharge: string;
        entity_battery_discharge_helper: string;
        entity_house_consumption: string;
        entity_house_consumption_helper: string;
        entity_grid_power: string;
        entity_grid_power_helper: string;

        central_config: string;
        central_config_helper: string;
        pv_max_power_label: string;
        pv_max_power_helper: string;
        battery_capacity_label: string;
        battery_capacity_label_helper: string;
        grid_threshold_label: string;
        grid_threshold_helper: string;

        card_visibility: string;
        show_pv_card: string;
        show_battery_card: string;
        show_house_card: string;
        show_grid_card: string;

        infobar_settings: string;
        enable_infobar: string;
        infobar_position: string;
        position_top: string;
        position_bottom: string;
        calculation_mode: string;
        calculation_mode_helper: string;
        mode_autarky: string;
        mode_self_consumption: string;
        calculate_battery_times: string;
        calculate_battery_times_helper: string;
        item: string;
        entity: string;
        icon_label: string;
        label: string;
        unit: string;

        default_autarky: string;
        default_runtime: string;
        default_chargetime: string;

        pv_system: string;
        pv_entity: string;
        pv_entity_helper: string;
        enable_animation: string;
        animation_style: string;
        animation_style_helper: string;
        animation_rotating_dots: string;
        animation_particle_field: string;
        animation_electric_arc: string;
        icon_rotation: string;
        icon_rotation_helper: string;
        max_power: string;
        max_power_helper: string;

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

        house_consumption: string;
        house_entity: string;
        house_entity_helper: string;

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

        card_styling: string;
        header_background: string;
        enable_header_background: string;
        enable_header_background_helper: string;
        header_background_color: string;
        header_border_color: string;
        header_border_radius: string;
        header_padding: string;
        header_width: string;
        header_width_helper: string;
        header_width_auto: string;
        header_width_full: string;
        header_box_shadow: string;
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

        select_entity: string;
        select_icon: string;

        action_none: string;
        action_more_info: string;
        action_navigate: string;
        action_url: string;
        action_call_service: string;

        theme: string;
        theme_helper: string;
        select_theme: string;

        tab_consumers: string;
        consumers_settings: string;
        enable_consumers: string;
        consumers_position: string;
        consumers_sort_mode: string;
        sort_highest_first: string;
        sort_lowest_first: string;
        sort_none: string;
        sort_alpha_asc: string;
        sort_alpha_desc: string;
        consumers_threshold: string;
        consumers_threshold_helper: string;
        add_consumer: string;
        remove_consumer: string;
        consumer_entity: string;
        consumer_icon: string;
        consumer_label: string;
        consumer_threshold: string;
        consumer_auto_color: string;
        consumer_auto_color_helper: string;
        consumer_item_styling: string;
        consumer_primary_entity: string;
        consumer_primary_text: string;
        consumer_show_primary: string;
        consumer_secondary_entity: string;
        consumer_secondary_text: string;
        consumer_show_secondary: string;
        consumer_switch_entity: string;
        consumer_switch_entity_helper: string;
        consumer_tap_actions: string;
        show_consumer_total_in_house: string;
        show_consumer_total_helper: string;

        show_title: string;
        show_subtitle: string;
        show_icon: string;

        title_line_height: string;
        subtitle_line_height: string;
        primary_line_height: string;
        secondary_line_height: string;
        tertiary_line_height: string;
        label_line_height: string;
        value_line_height: string;

        item_calc_type: string;
        calc_type_entity: string;
        calc_type_autarky: string;
        calc_type_self_consumption: string;
        calc_type_runtime: string;
        calc_type_chargetime: string;
    };

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

            card_header: 'Karten Header',
            title: 'Titel',
            title_placeholder: 'PV Monitor',
            title_helper: 'Leer lassen um auszublenden.',
            subtitle: 'Untertitel',
            subtitle_placeholder: 'Energieübersicht',
            subtitle_helper: 'Leer lassen um auszublenden.',
            title_subtitle_gap: 'Abstand Titel-Untertitel',
            title_subtitle_gap_helper: 'Abstand zwischen Titel und Untertitel',
            header_icon_size: 'Header Icon Größe',
            header_icon_size_helper: 'Größe des Icons neben dem Titel',
            header_icon_color: 'Header Icon Farbe',
            header_icon_margin: 'Header Icon Abstand',
            icon: 'Icon',
            icon_helper: 'Wird nur angezeigt, wenn auch ein Titel vorhanden ist, leer lassen um auszublenden.',
            layout: 'Layout',
            grid_gap: 'Grid Abstand',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Abstand zwischen den Karten.',
            header_margin_bottom: 'Abstand Header zu Karten/Info Bar',
            header_margin_bottom_helper: 'Abstand zwischen Titel/Untertitel und Info Bar/Karten',
            infobar_gap: 'Abstand Info Bar zu Karten',
            infobar_gap_helper: 'Abstand zwischen Info Bar und den 4 Karten',
            language: 'Sprache',
            language_helper: 'Wählen Sie die Anzeigesprache',

            central_entities: 'Zentrale Entities',
            central_entities_helper: 'Definieren Sie hier die Haupt-Entities für Berechnungen',
            entity_pv_production: 'PV-Produktion Entity',
            entity_pv_production_helper: 'Entity für PV-Leistung (wird für Berechnungen verwendet)',
            entity_battery_soc: 'Batterie SOC Entity',
            entity_battery_soc_helper: 'Entity für Batterieladezustand in % (für Berechnungen)',
            entity_battery_charge: 'Batterie Laden Entity',
            entity_battery_charge_helper: 'Entity für Batterie-Ladeleistung (für Berechnungen)',
            entity_battery_discharge: 'Batterie Entladen Entity',
            entity_battery_discharge_helper: 'Entity für Batterie-Entladeleistung (für Berechnungen)',
            entity_house_consumption: 'Hausverbrauch Entity',
            entity_house_consumption_helper: 'Entity für Hausverbrauch (für Autarkie-Berechnung, optional)',
            entity_grid_power: 'Netz Entity',
            entity_grid_power_helper: 'Entity für Netzbezug/Einspeisung (für Berechnungen)',

            central_config: 'Zentrale Konfiguration',
            central_config_helper: 'Diese Werte gelten für alle Karten',
            pv_max_power_label: 'PV Max. Leistung (W)',
            pv_max_power_helper: 'Maximale PV-Leistung für Animationen',
            battery_capacity_label: 'Batteriekapazität (Wh)',
            battery_capacity_label_helper: 'Kapazität der Batterie (z.B. 10000 für 10 kWh)',
            grid_threshold_label: 'Netz-Schwellwert (W)',
            grid_threshold_helper: 'Unterhalb dieses Werts wird "Neutral" angezeigt',

            card_visibility: 'Karten-Sichtbarkeit',
            show_pv_card: 'PV-Karte anzeigen',
            show_battery_card: 'Batterie-Karte anzeigen',
            show_house_card: 'Haus-Karte anzeigen',
            show_grid_card: 'Netz-Karte anzeigen',

            infobar_settings: 'Info Bar Einstellungen',
            enable_infobar: 'Info Bar aktivieren',
            infobar_position: 'Info Bar Position',
            position_top: 'Oben (über den Karten)',
            position_bottom: 'Unten (unter den Karten)',
            calculation_mode: 'Berechnung für Item 1',
            calculation_mode_helper: 'Wählen Sie: Autarkie oder Eigenverbrauch',
            mode_autarky: 'Autarkie (Selbstversorgungsgrad)',
            mode_self_consumption: 'Eigenverbrauch (Selbstnutzungsgrad)',
            calculate_battery_times: 'Batteriezeiten berechnen',
            calculate_battery_times_helper: 'Automatische Berechnung für Item 2 (Restlaufzeit) und Item 3 (Restladezeit)',
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
            animation_style: 'Animationsstil',
            animation_style_helper: 'Wählen Sie den Animationseffekt',
            animation_rotating_dots: 'Rotierende Punkte',
            animation_particle_field: 'Partikelfeld',
            animation_electric_arc: 'Elektrische Bögen',
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
            header_background: 'Header-Hintergrund',
            enable_header_background: 'Header-Hintergrund aktivieren',
            enable_header_background_helper: 'Hintergrund für Titel/Untertitel-Bereich aktivieren',
            header_background_color: 'Header Hintergrundfarbe',
            header_border_color: 'Header Rahmenfarbe',
            header_border_radius: 'Header Border Radius',
            header_padding: 'Header Padding',
            header_width: 'Header Breite',
            header_width_helper: 'Auto = zentriert mit Inhaltsgröße, Full = volle Breite',
            header_width_auto: 'Auto (Inhaltsgröße)',
            header_width_full: 'Full (100% Breite)',
            header_box_shadow: 'Header Box Shadow',
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

            action_none: 'Keine',
            action_more_info: 'Mehr Info',
            action_navigate: 'Navigieren',
            action_url: 'URL',
            action_call_service: 'Service aufrufen',

            theme: 'Theme',
            theme_helper: 'Wählen Sie ein vordefiniertes Farbthema',
            select_theme: 'Theme auswählen',

            tab_consumers: 'Verbraucher',
            consumers_settings: 'Verbraucher-Einstellungen',
            enable_consumers: 'Verbraucher-Leiste aktivieren',
            consumers_position: 'Position',
            consumers_sort_mode: 'Sortierung',
            sort_highest_first: 'Höchster zuerst',
            sort_lowest_first: 'Niedrigster zuerst',
            sort_none: 'Keine Sortierung (Eingabe-Reihenfolge)',
            sort_alpha_asc: 'Alphabetisch aufsteigend',
            sort_alpha_desc: 'Alphabetisch absteigend',
            consumers_threshold: 'Globaler Schwellwert (W)',
            consumers_threshold_helper: 'Verbraucher unter diesem Wert werden nicht angezeigt',
            add_consumer: 'Verbraucher hinzufügen',
            remove_consumer: 'Verbraucher entfernen',
            consumer_entity: 'Nr:',
            consumer_icon: 'Icon',
            consumer_label: 'Bezeichnung',
            consumer_threshold: 'Individueller Schwellwert (W)',
            consumer_auto_color: 'Automatische Farbanpassung',
            consumer_auto_color_helper: 'Farbe basierend auf Verbrauch (grün bis purple)',
            consumer_item_styling: 'Verbraucher Styling',
            consumer_primary_entity: 'Primär Entity (für Wert)',
            consumer_primary_text: 'Primär Text (überschreibt Wert)',
            consumer_show_primary: 'Primär-Zeile anzeigen',
            consumer_secondary_entity: 'Sekundär Entity (für Label)',
            consumer_secondary_text: 'Sekundär Text (überschreibt Label)',
            consumer_show_secondary: 'Sekundär-Zeile anzeigen',
            consumer_switch_entity: 'Switch Entity (für Toggle)',
            consumer_switch_entity_helper: 'Optional: Switch zum Ein-/Ausschalten',
            consumer_tap_actions: 'Tap Actions',
            show_consumer_total_in_house: 'Gesamtverbrauch als Sekundär-Text',
            show_consumer_total_helper: 'Zeigt Summe aller Consumer unter Hausverbrauch',

            show_title: 'Titel anzeigen',
            show_subtitle: 'Untertitel anzeigen',
            show_icon: 'Icon anzeigen',

            title_line_height: 'Titel Line-Height',
            subtitle_line_height: 'Untertitel Line-Height',
            primary_line_height: 'Primär Line-Height',
            secondary_line_height: 'Sekundär Line-Height',
            tertiary_line_height: 'Tertiär Line-Height',
            label_line_height: 'Label Line-Height',
            value_line_height: 'Value Line-Height',

            item_calc_type: 'Berechnung wählen',
            calc_type_entity: 'Manuelle Entity',
            calc_type_autarky: 'Autarkie',
            calc_type_self_consumption: 'Eigenverbrauch',
            calc_type_runtime: 'Restlaufzeit',
            calc_type_chargetime: 'Restladezeit',
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
            title_subtitle_gap: 'Title-Subtitle Gap',
            title_subtitle_gap_helper: 'Space between title and subtitle',
            header_icon_size: 'Header Icon Size',
            header_icon_size_helper: 'Size of the icon next to title',
            header_icon_color: 'Header Icon Color',
            header_icon_margin: 'Header Icon Margin',
            icon: 'Icon',
            icon_helper: 'Only shown when a title is present, leave empty to hide.',
            layout: 'Layout',
            grid_gap: 'Grid Gap',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Space between cards.',
            header_margin_bottom: 'Header to Cards/Info Bar Gap',
            header_margin_bottom_helper: 'Space between title/subtitle and info bar/cards',
            infobar_gap: 'Info Bar to Cards Gap',
            infobar_gap_helper: 'Space between info bar and the 4 cards',
            language: 'Language',
            language_helper: 'Select display language',

            central_entities: 'Central Entities',
            central_entities_helper: 'Define the main entities for calculations here',
            entity_pv_production: 'PV Production Entity',
            entity_pv_production_helper: 'Entity for PV power (used for calculations)',
            entity_battery_soc: 'Battery SOC Entity',
            entity_battery_soc_helper: 'Entity for battery state of charge in % (for calculations)',
            entity_battery_charge: 'Battery Charge Entity',
            entity_battery_charge_helper: 'Entity for battery charging power (for calculations)',
            entity_battery_discharge: 'Battery Discharge Entity',
            entity_battery_discharge_helper: 'Entity for battery discharging power (for calculations)',
            entity_house_consumption: 'House Consumption Entity',
            entity_house_consumption_helper: 'Entity for house consumption (for autarky calculation, optional)',
            entity_grid_power: 'Grid Entity',
            entity_grid_power_helper: 'Entity for grid consumption/feed-in (for calculations)',

            central_config: 'Central Configuration',
            central_config_helper: 'These values apply to all cards',
            pv_max_power_label: 'PV Max Power (W)',
            pv_max_power_helper: 'Maximum PV power for animations',
            battery_capacity_label: 'Battery Capacity (Wh)',
            battery_capacity_label_helper: 'Battery capacity (e.g. 10000 for 10 kWh)',
            grid_threshold_label: 'Grid Threshold (W)',
            grid_threshold_helper: 'Below this value "Neutral" is displayed',

            card_visibility: 'Card Visibility',
            show_pv_card: 'Show PV Card',
            show_battery_card: 'Show Battery Card',
            show_house_card: 'Show House Card',
            show_grid_card: 'Show Grid Card',

            infobar_settings: 'Info Bar Settings',
            enable_infobar: 'Enable Info Bar',
            infobar_position: 'Info Bar Position',
            position_top: 'Top (above cards)',
            position_bottom: 'Bottom (below cards)',
            calculation_mode: 'Calculation for Item 1',
            calculation_mode_helper: 'Choose: Autarky or Self-Consumption',
            mode_autarky: 'Autarky (Self-Sufficiency)',
            mode_self_consumption: 'Self-Consumption (Self-Usage)',
            calculate_battery_times: 'Calculate Battery Times',
            calculate_battery_times_helper: 'Automatic calculation for Item 2 (runtime) and Item 3 (charge time)',
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
            animation_style: 'Animation Style',
            animation_style_helper: 'Choose the animation effect',
            animation_rotating_dots: 'Rotating Dots',
            animation_particle_field: 'Particle Field',
            animation_electric_arc: 'Electric Arc',
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
            header_background: 'Header Background',
            enable_header_background: 'Enable Header Background',
            enable_header_background_helper: 'Enable background for title/subtitle area',
            header_background_color: 'Header Background Color',
            header_border_color: 'Header Border Color',
            header_border_radius: 'Header Border Radius',
            header_padding: 'Header Padding',
            header_width: 'Header Width',
            header_width_helper: 'Auto = centered with content size, Full = full width',
            header_width_auto: 'Auto (Content Size)',
            header_width_full: 'Full (100% Width)',
            header_box_shadow: 'Header Box Shadow',
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

            action_none: 'None',
            action_more_info: 'More Info',
            action_navigate: 'Navigate',
            action_url: 'URL',
            action_call_service: 'Call Service',

            theme: 'Theme',
            theme_helper: 'Select a predefined color theme',
            select_theme: 'Select Theme',

            tab_consumers: 'Consumers',
            consumers_settings: 'Consumer Settings',
            enable_consumers: 'Enable Consumer Bar',
            consumers_position: 'Position',
            consumers_sort_mode: 'Sort Mode',
            sort_highest_first: 'Highest First',
            sort_lowest_first: 'Lowest First',
            sort_none: 'No Sorting (Input Order)',
            sort_alpha_asc: 'Alphabetical Ascending',
            sort_alpha_desc: 'Alphabetical Descending',
            consumers_threshold: 'Global Threshold (W)',
            consumers_threshold_helper: 'Consumers below this value won\'t be displayed',
            add_consumer: 'Add Consumer',
            remove_consumer: 'Remove Consumer',
            consumer_entity: 'Nr:',
            consumer_icon: 'Icon',
            consumer_label: 'Label',
            consumer_threshold: 'Individual Threshold (W)',
            consumer_auto_color: 'Automatic Color',
            consumer_auto_color_helper: 'Color based on consumption (green to purple)',
            consumer_item_styling: 'Consumer Styling',
            consumer_primary_entity: 'Primary Entity (for value)',
            consumer_primary_text: 'Primary Text (overrides value)',
            consumer_show_primary: 'Show Primary Line',
            consumer_secondary_entity: 'Secondary Entity (for label)',
            consumer_secondary_text: 'Secondary Text (overrides label)',
            consumer_show_secondary: 'Show Secondary Line',
            consumer_switch_entity: 'Switch Entity (for toggle)',
            consumer_switch_entity_helper: 'Optional: Switch to turn on/off',
            consumer_tap_actions: 'Tap Actions',
            show_consumer_total_in_house: 'Show Total as Secondary Text',
            show_consumer_total_helper: 'Shows sum of all consumers under house consumption',

            show_title: 'Show Title',
            show_subtitle: 'Show Subtitle',
            show_icon: 'Show Icon',

            title_line_height: 'Title Line-Height',
            subtitle_line_height: 'Subtitle Line-Height',
            primary_line_height: 'Primary Line-Height',
            secondary_line_height: 'Secondary Line-Height',
            tertiary_line_height: 'Tertiary Line-Height',
            label_line_height: 'Label Line-Height',
            value_line_height: 'Value Line-Height',

            item_calc_type: 'Select Calculation',
            calc_type_entity: 'Manual Entity',
            calc_type_autarky: 'Autarky',
            calc_type_self_consumption: 'Self-Consumption',
            calc_type_runtime: 'Runtime',
            calc_type_chargetime: 'Charge Time',
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
            title_subtitle_gap: 'Écart Titre-Sous-titre',
            title_subtitle_gap_helper: 'Espace entre le titre et le sous-titre',
            header_icon_size: 'Taille de l\'icône d\'en-tête',
            header_icon_size_helper: 'Taille de l\'icône à côté du titre',
            header_icon_color: 'Couleur de l\'icône d\'en-tête',
            header_icon_margin: 'Marge de l\'icône d\'en-tête',
            icon: 'Icône',
            icon_helper: 'Affiché uniquement si un titre est présent, laisser vide pour masquer.',
            layout: 'Disposition',
            grid_gap: 'Espacement Grille',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Espace entre les cartes.',
            header_margin_bottom: 'Espace En-tête vers Cartes/Barre Info',
            header_margin_bottom_helper: 'Espace entre titre/sous-titre et barre info/cartes',
            infobar_gap: 'Espace Barre Info vers Cartes',
            infobar_gap_helper: 'Espace entre la barre info et les 4 cartes',
            language: 'Langue',
            language_helper: 'Sélectionner la langue d\'affichage',

            central_entities: 'Entités Centrales',
            central_entities_helper: 'Définissez ici les entités principales pour les calculs',
            entity_pv_production: 'Entité Production PV',
            entity_pv_production_helper: 'Entité pour la puissance PV (utilisée pour les calculs)',
            entity_battery_soc: 'Entité SOC Batterie',
            entity_battery_soc_helper: 'Entité pour l\'état de charge de la batterie en % (pour les calculs)',
            entity_battery_charge: 'Entité Charge Batterie',
            entity_battery_charge_helper: 'Entité pour la puissance de charge (pour les calculs)',
            entity_battery_discharge: 'Entité Décharge Batterie',
            entity_battery_discharge_helper: 'Entité pour la puissance de décharge (pour les calculs)',
            entity_house_consumption: 'Entité Consommation Maison',
            entity_house_consumption_helper: 'Entité pour la consommation maison (pour calcul autosuffisance, optionnel)',
            entity_grid_power: 'Entité Réseau',
            entity_grid_power_helper: 'Entité pour consommation/injection réseau (pour les calculs)',

            central_config: 'Configuration Centrale',
            central_config_helper: 'Ces valeurs s\'appliquent à toutes les cartes',
            pv_max_power_label: 'Puissance Max PV (W)',
            pv_max_power_helper: 'Puissance PV maximale pour les animations',
            battery_capacity_label: 'Capacité Batterie (Wh)',
            battery_capacity_label_helper: 'Capacité de la batterie (ex: 10000 pour 10 kWh)',
            grid_threshold_label: 'Seuil Réseau (W)',
            grid_threshold_helper: 'En dessous de cette valeur "Neutre" est affiché',

            card_visibility: 'Visibilité des Cartes',
            show_pv_card: 'Afficher Carte PV',
            show_battery_card: 'Afficher Carte Batterie',
            show_house_card: 'Afficher Carte Maison',
            show_grid_card: 'Afficher Carte Réseau',

            infobar_settings: 'Paramètres Barre d\'Info',
            enable_infobar: 'Activer la Barre d\'Info',
            infobar_position: 'Position Barre d\'Info',
            position_top: 'Haut (au-dessus des cartes)',
            position_bottom: 'Bas (en dessous des cartes)',
            calculation_mode: 'Calcul pour Élément 1',
            calculation_mode_helper: 'Choisir: Autosuffisance ou Autoconsommation',
            mode_autarky: 'Autosuffisance',
            mode_self_consumption: 'Autoconsommation',
            calculate_battery_times: 'Calculer Temps Batterie',
            calculate_battery_times_helper: 'Calcul automatique pour Élément 2 (autonomie) et Élément 3 (temps de charge)',
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
            animation_style: 'Style d\'Animation',
            animation_style_helper: 'Choisir l\'effet d\'animation',
            animation_rotating_dots: 'Points Rotatifs',
            animation_particle_field: 'Champ de Particules',
            animation_electric_arc: 'Arc Électrique',
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
            header_background: 'Arrière-plan En-tête',
            enable_header_background: 'Activer Arrière-plan En-tête',
            enable_header_background_helper: 'Activer l\'arrière-plan pour la zone titre/sous-titre',
            header_background_color: 'Couleur Arrière-plan En-tête',
            header_border_color: 'Couleur Bordure En-tête',
            header_border_radius: 'Rayon Bordure En-tête',
            header_padding: 'Espacement En-tête',
            header_width: 'Largeur En-tête',
            header_width_helper: 'Auto = centré avec taille du contenu, Full = pleine largeur',
            header_width_auto: 'Auto (Taille Contenu)',
            header_width_full: 'Full (100% Largeur)',
            header_box_shadow: 'Ombre En-tête',
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

            action_none: 'Aucune',
            action_more_info: 'Plus d\'Info',
            action_navigate: 'Naviguer',
            action_url: 'URL',
            action_call_service: 'Appeler Service',

            theme: 'Thème',
            theme_helper: 'Sélectionner un thème de couleur prédéfini',
            select_theme: 'Sélectionner Thème',

            tab_consumers: 'Consommateurs',
            consumers_settings: 'Paramètres Consommateurs',
            enable_consumers: 'Activer Barre Consommateurs',
            consumers_position: 'Position',
            consumers_sort_mode: 'Mode de Tri',
            sort_highest_first: 'Plus Élevé en Premier',
            sort_lowest_first: 'Plus Faible en Premier',
            sort_none: 'Pas de Tri (Ordre de Saisie)',
            sort_alpha_asc: 'Alphabétique Croissant',
            sort_alpha_desc: 'Alphabétique Décroissant',
            consumers_threshold: 'Seuil Global (W)',
            consumers_threshold_helper: 'Les consommateurs en dessous ne seront pas affichés',
            add_consumer: 'Ajouter Consommateur',
            remove_consumer: 'Supprimer Consommateur',
            consumer_entity: 'Nr:',
            consumer_icon: 'Icône',
            consumer_label: 'Libellé',
            consumer_threshold: 'Seuil Individuel (W)',
            consumer_auto_color: 'Couleur Automatique',
            consumer_auto_color_helper: 'Couleur basée sur la consommation (vert à violet)',
            consumer_item_styling: 'Style Consommateur',
            consumer_primary_entity: 'Entité Primaire (pour valeur)',
            consumer_primary_text: 'Texte Primaire (remplace valeur)',
            consumer_show_primary: 'Afficher Ligne Primaire',
            consumer_secondary_entity: 'Entité Secondaire (pour libellé)',
            consumer_secondary_text: 'Texte Secondaire (remplace libellé)',
            consumer_show_secondary: 'Afficher Ligne Secondaire',
            consumer_switch_entity: 'Entité Switch (pour basculer)',
            consumer_switch_entity_helper: 'Optionnel: Switch pour activer/désactiver',
            consumer_tap_actions: 'Actions Tactiles',
            show_consumer_total_in_house: 'Afficher Total comme Texte Secondaire',
            show_consumer_total_helper: 'Affiche la somme de tous les consommateurs sous la consommation maison',

            show_title: 'Afficher Titre',
            show_subtitle: 'Afficher Sous-titre',
            show_icon: 'Afficher Icône',

            title_line_height: 'Line-Height Titre',
            subtitle_line_height: 'Line-Height Sous-titre',
            primary_line_height: 'Line-Height Primaire',
            secondary_line_height: 'Line-Height Secondaire',
            tertiary_line_height: 'Line-Height Tertiaire',
            label_line_height: 'Line-Height Label',
            value_line_height: 'Line-Height Valeur',

            item_calc_type: 'Sélectionner Calcul',
            calc_type_entity: 'Entité Manuelle',
            calc_type_autarky: 'Autosuffisance',
            calc_type_self_consumption: 'Autoconsommation',
            calc_type_runtime: 'Autonomie',
            calc_type_chargetime: 'Temps de Charge',
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
            title_subtitle_gap: 'Distanza Titolo-Sottotitolo',
            title_subtitle_gap_helper: 'Spazio tra titolo e sottotitolo',
            header_icon_size: 'Dimensione icona intestazione',
            header_icon_size_helper: 'Dimensione dell\'icona accanto al titolo',
            header_icon_color: 'Colore icona intestazione',
            header_icon_margin: 'Margine icona intestazione',
            icon: 'Icona',
            icon_helper: 'Mostrato solo se è presente un titolo, lasciare vuoto per nascondere.',
            layout: 'Layout',
            grid_gap: 'Spaziatura Griglia',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Spazio tra le schede.',
            header_margin_bottom: 'Spazio Intestazione a Schede/Barra Info',
            header_margin_bottom_helper: 'Spazio tra titolo/sottotitolo e barra info/schede',
            infobar_gap: 'Spazio Barra Info a Schede',
            infobar_gap_helper: 'Spazio tra barra info e le 4 schede',
            language: 'Lingua',
            language_helper: 'Seleziona lingua di visualizzazione',

            central_entities: 'Entità Centrali',
            central_entities_helper: 'Definisci qui le entità principali per i calcoli',
            entity_pv_production: 'Entità Produzione FV',
            entity_pv_production_helper: 'Entità per potenza FV (usata per i calcoli)',
            entity_battery_soc: 'Entità SOC Batteria',
            entity_battery_soc_helper: 'Entità per stato di carica batteria in % (per i calcoli)',
            entity_battery_charge: 'Entità Carica Batteria',
            entity_battery_charge_helper: 'Entità per potenza di carica (per i calcoli)',
            entity_battery_discharge: 'Entità Scarica Batteria',
            entity_battery_discharge_helper: 'Entità per potenza di scarica (per i calcoli)',
            entity_house_consumption: 'Entità Consumo Casa',
            entity_house_consumption_helper: 'Entità per consumo casa (per calcolo autosufficienza, opzionale)',
            entity_grid_power: 'Entità Rete',
            entity_grid_power_helper: 'Entità per consumo/immissione rete (per i calcoli)',

            central_config: 'Configurazione Centrale',
            central_config_helper: 'Questi valori si applicano a tutte le schede',
            pv_max_power_label: 'Potenza Max FV (W)',
            pv_max_power_helper: 'Potenza FV massima per le animazioni',
            battery_capacity_label: 'Capacità Batteria (Wh)',
            battery_capacity_label_helper: 'Capacità della batteria (es: 10000 per 10 kWh)',
            grid_threshold_label: 'Soglia Rete (W)',
            grid_threshold_helper: 'Sotto questo valore viene visualizzato "Neutrale"',

            card_visibility: 'Visibilità Schede',
            show_pv_card: 'Mostra Scheda FV',
            show_battery_card: 'Mostra Scheda Batteria',
            show_house_card: 'Mostra Scheda Casa',
            show_grid_card: 'Mostra Scheda Rete',

            infobar_settings: 'Impostazioni Barra Info',
            enable_infobar: 'Attiva Barra Info',
            infobar_position: 'Posizione Barra Info',
            position_top: 'Alto (sopra le schede)',
            position_bottom: 'Basso (sotto le schede)',
            calculation_mode: 'Calcolo per Elemento 1',
            calculation_mode_helper: 'Scegli: Autosufficienza o Autoconsumo',
            mode_autarky: 'Autosufficienza',
            mode_self_consumption: 'Autoconsumo',
            calculate_battery_times: 'Calcola Tempi Batteria',
            calculate_battery_times_helper: 'Calcolo automatico per Elemento 2 (autonomia) e Elemento 3 (tempo di ricarica)',
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
            animation_style: 'Stile Animazione',
            animation_style_helper: 'Scegli l\'effetto di animazione',
            animation_rotating_dots: 'Punti Rotanti',
            animation_particle_field: 'Campo di Particelle',
            animation_electric_arc: 'Arco Elettrico',
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
            header_background: 'Sfondo Intestazione',
            enable_header_background: 'Attiva Sfondo Intestazione',
            enable_header_background_helper: 'Attiva sfondo per l\'area titolo/sottotitolo',
            header_background_color: 'Colore Sfondo Intestazione',
            header_border_color: 'Colore Bordo Intestazione',
            header_border_radius: 'Raggio Bordo Intestazione',
            header_padding: 'Spaziatura Intestazione',
            header_width: 'Larghezza Intestazione',
            header_width_helper: 'Auto = centrato con dimensione contenuto, Full = larghezza completa',
            header_width_auto: 'Auto (Dimensione Contenuto)',
            header_width_full: 'Full (100% Larghezza)',
            header_box_shadow: 'Ombra Intestazione',
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

            action_none: 'Nessuna',
            action_more_info: 'Più Info',
            action_navigate: 'Naviga',
            action_url: 'URL',
            action_call_service: 'Chiama Servizio',

            theme: 'Tema',
            theme_helper: 'Seleziona un tema di colori predefinito',
            select_theme: 'Seleziona Tema',

            tab_consumers: 'Consumatori',
            consumers_settings: 'Impostazioni Consumatori',
            enable_consumers: 'Attiva Barra Consumatori',
            consumers_position: 'Posizione',
            consumers_sort_mode: 'Modalità Ordinamento',
            sort_highest_first: 'Più Alto per Primo',
            sort_lowest_first: 'Più Basso per Primo',
            sort_none: 'Nessun Ordinamento (Ordine di Inserimento)',
            sort_alpha_asc: 'Alfabetico Crescente',
            sort_alpha_desc: 'Alfabetico Decrescente',
            consumers_threshold: 'Soglia Globale (W)',
            consumers_threshold_helper: 'I consumatori sotto questo valore non verranno visualizzati',
            add_consumer: 'Aggiungi Consumatore',
            remove_consumer: 'Rimuovi Consumatore',
            consumer_entity: 'Nr:',
            consumer_icon: 'Icona',
            consumer_label: 'Etichetta',
            consumer_threshold: 'Soglia Individuale (W)',
            consumer_auto_color: 'Colore Automatico',
            consumer_auto_color_helper: 'Colore basato sul consumo (verde a viola)',
            consumer_item_styling: 'Stile Consumatore',
            consumer_primary_entity: 'Entità Primaria (per valore)',
            consumer_primary_text: 'Testo Primario (sostituisce valore)',
            consumer_show_primary: 'Mostra Riga Primaria',
            consumer_secondary_entity: 'Entità Secondaria (per etichetta)',
            consumer_secondary_text: 'Testo Secondario (sostituisce etichetta)',
            consumer_show_secondary: 'Mostra Riga Secondaria',
            consumer_switch_entity: 'Entità Switch (per commutare)',
            consumer_switch_entity_helper: 'Opzionale: Switch per accendere/spegnere',
            consumer_tap_actions: 'Azioni Tocco',
            show_consumer_total_in_house: 'Mostra Totale come Testo Secondario',
            show_consumer_total_helper: 'Mostra la somma di tutti i consumatori sotto il consumo casa',

            show_title: 'Mostra Titolo',
            show_subtitle: 'Mostra Sottotitolo',
            show_icon: 'Mostra Icona',

            title_line_height: 'Line-Height Titolo',
            subtitle_line_height: 'Line-Height Sottotitolo',
            primary_line_height: 'Line-Height Primario',
            secondary_line_height: 'Line-Height Secondario',
            tertiary_line_height: 'Line-Height Terziario',
            label_line_height: 'Line-Height Etichetta',
            value_line_height: 'Line-Height Valore',

            item_calc_type: 'Seleziona Calcolo',
            calc_type_entity: 'Entità Manuale',
            calc_type_autarky: 'Autosufficienza',
            calc_type_self_consumption: 'Autoconsumo',
            calc_type_runtime: 'Autonomia',
            calc_type_chargetime: 'Tempo di Ricarica',
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
            title_subtitle_gap: 'Espacio Título-Subtítulo',
            title_subtitle_gap_helper: 'Espacio entre título y subtítulo',
            header_icon_size: 'Tamaño del icono de encabezado',
            header_icon_size_helper: 'Tamaño del icono junto al título',
            header_icon_color: 'Color del icono de encabezado',
            header_icon_margin: 'Margen del icono de encabezado',
            icon: 'Icono',
            icon_helper: 'Solo se muestra cuando hay un título, dejar vacío para ocultar.',
            layout: 'Diseño',
            grid_gap: 'Espaciado Cuadrícula',
            grid_gap_placeholder: '6px',
            grid_gap_helper: 'Espacio entre tarjetas.',
            header_margin_bottom: 'Espacio Encabezado a Tarjetas/Barra Info',
            header_margin_bottom_helper: 'Espacio entre título/subtítulo y barra info/tarjetas',
            infobar_gap: 'Espacio Barra Info a Tarjetas',
            infobar_gap_helper: 'Espacio entre barra info y las 4 tarjetas',
            language: 'Idioma',
            language_helper: 'Seleccionar idioma de visualización',

            central_entities: 'Entidades Centrales',
            central_entities_helper: 'Defina aquí las entidades principales para los cálculos',
            entity_pv_production: 'Entidad Producción FV',
            entity_pv_production_helper: 'Entidad para potencia FV (usada para cálculos)',
            entity_battery_soc: 'Entidad SOC Batería',
            entity_battery_soc_helper: 'Entidad para estado de carga de batería en % (para cálculos)',
            entity_battery_charge: 'Entidad Carga Batería',
            entity_battery_charge_helper: 'Entidad para potencia de carga (para cálculos)',
            entity_battery_discharge: 'Entidad Descarga Batería',
            entity_battery_discharge_helper: 'Entidad para potencia de descarga (para cálculos)',
            entity_house_consumption: 'Entidad Consumo Casa',
            entity_house_consumption_helper: 'Entidad para consumo casa (para cálculo autosuficiencia, opcional)',
            entity_grid_power: 'Entidad Red',
            entity_grid_power_helper: 'Entidad para consumo/inyección red (para cálculos)',

            central_config: 'Configuración Central',
            central_config_helper: 'Estos valores se aplican a todas las tarjetas',
            pv_max_power_label: 'Potencia Máx FV (W)',
            pv_max_power_helper: 'Potencia FV máxima para animaciones',
            battery_capacity_label: 'Capacidad Batería (Wh)',
            battery_capacity_label_helper: 'Capacidad de la batería (ej: 10000 para 10 kWh)',
            grid_threshold_label: 'Umbral Red (W)',
            grid_threshold_helper: 'Por debajo de este valor se muestra "Neutro"',

            card_visibility: 'Visibilidad Tarjetas',
            show_pv_card: 'Mostrar Tarjeta FV',
            show_battery_card: 'Mostrar Tarjeta Batería',
            show_house_card: 'Mostrar Tarjeta Casa',
            show_grid_card: 'Mostrar Tarjeta Red',

            infobar_settings: 'Configuración Barra Info',
            enable_infobar: 'Activar Barra Info',
            infobar_position: 'Posición Barra Info',
            position_top: 'Arriba (sobre las tarjetas)',
            position_bottom: 'Abajo (debajo de las tarjetas)',
            calculation_mode: 'Cálculo para Elemento 1',
            calculation_mode_helper: 'Elegir: Autosuficiencia o Autoconsumo',
            mode_autarky: 'Autosuficiencia',
            mode_self_consumption: 'Autoconsumo',
            calculate_battery_times: 'Calcular Tiempos Batería',
            calculate_battery_times_helper: 'Cálculo automático para Elemento 2 (autonomía) y Elemento 3 (tiempo de carga)',
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
            animation_style: 'Estilo de Animación',
            animation_style_helper: 'Elige el efecto de animación',
            animation_rotating_dots: 'Puntos Rotatorios',
            animation_particle_field: 'Campo de Partículas',
            animation_electric_arc: 'Arco Eléctrico',
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
            header_background: 'Fondo Encabezado',
            enable_header_background: 'Activar Fondo Encabezado',
            enable_header_background_helper: 'Activar fondo para el área título/subtítulo',
            header_background_color: 'Color Fondo Encabezado',
            header_border_color: 'Color Borde Encabezado',
            header_border_radius: 'Radio Borde Encabezado',
            header_padding: 'Espaciado Encabezado',
            header_width: 'Ancho Encabezado',
            header_width_helper: 'Auto = centrado con tamaño del contenido, Full = ancho completo',
            header_width_auto: 'Auto (Tamaño Contenido)',
            header_width_full: 'Full (100% Ancho)',
            header_box_shadow: 'Sombra Encabezado',
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

            action_none: 'Ninguna',
            action_more_info: 'Más Info',
            action_navigate: 'Navegar',
            action_url: 'URL',
            action_call_service: 'Llamar Servicio',

            theme: 'Tema',
            theme_helper: 'Seleccionar un tema de colores predefinido',
            select_theme: 'Seleccionar Tema',

            tab_consumers: 'Consumidores',
            consumers_settings: 'Configuración Consumidores',
            enable_consumers: 'Activar Barra Consumidores',
            consumers_position: 'Posición',
            consumers_sort_mode: 'Modo de Ordenación',
            sort_highest_first: 'Más Alto Primero',
            sort_lowest_first: 'Más Bajo Primero',
            sort_none: 'Sin Ordenación (Orden de Entrada)',
            sort_alpha_asc: 'Alfabético Ascendente',
            sort_alpha_desc: 'Alfabético Descendente',
            consumers_threshold: 'Umbral Global (W)',
            consumers_threshold_helper: 'Los consumidores por debajo no se mostrarán',
            add_consumer: 'Añadir Consumidor',
            remove_consumer: 'Eliminar Consumidor',
            consumer_entity: 'Nr:',
            consumer_icon: 'Icono',
            consumer_label: 'Etiqueta',
            consumer_threshold: 'Umbral Individual (W)',
            consumer_auto_color: 'Color Automático',
            consumer_auto_color_helper: 'Color basado en consumo (verde a púrpura)',
            consumer_item_styling: 'Estilo Consumidor',
            consumer_primary_entity: 'Entidad Primaria (para valor)',
            consumer_primary_text: 'Texto Primario (sobrescribe valor)',
            consumer_show_primary: 'Mostrar Línea Primaria',
            consumer_secondary_entity: 'Entidad Secundaria (para etiqueta)',
            consumer_secondary_text: 'Texto Secundario (sobrescribe etiqueta)',
            consumer_show_secondary: 'Mostrar Línea Secundaria',
            consumer_switch_entity: 'Entidad Switch (para conmutar)',
            consumer_switch_entity_helper: 'Opcional: Switch para encender/apagar',
            consumer_tap_actions: 'Acciones Táctiles',
            show_consumer_total_in_house: 'Mostrar Total como Texto Secundario',
            show_consumer_total_helper: 'Muestra la suma de todos los consumidores bajo el consumo casa',

            show_title: 'Mostrar Título',
            show_subtitle: 'Mostrar Subtítulo',
            show_icon: 'Mostrar Icono',

            title_line_height: 'Line-Height Título',
            subtitle_line_height: 'Line-Height Subtítulo',
            primary_line_height: 'Line-Height Primario',
            secondary_line_height: 'Line-Height Secundario',
            tertiary_line_height: 'Line-Height Terciario',
            label_line_height: 'Line-Height Etiqueta',
            value_line_height: 'Line-Height Valor',

            item_calc_type: 'Seleccionar Cálculo',
            calc_type_entity: 'Entidad Manual',
            calc_type_autarky: 'Autosuficiencia',
            calc_type_self_consumption: 'Autoconsumo',
            calc_type_runtime: 'Autonomía',
            calc_type_chargetime: 'Tiempo de Carga',
        },
        status: {
            feed_in: 'Inyección',
            neutral: 'Neutro',
            grid_consumption: 'Consumo Red',
            inactive: 'Inactivo',
        },
    },
};

export function detectLanguage(): SupportedLanguage {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('it')) return 'it';
    if (browserLang.startsWith('es')) return 'es';

    return 'en';
}

export function getTranslations(language?: SupportedLanguage): Translations {
    const lang = language || detectLanguage();
    return translations[lang] || translations.en;
}

export const languageNames: Record<SupportedLanguage, string> = {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    it: 'Italiano',
    es: 'Español',
};