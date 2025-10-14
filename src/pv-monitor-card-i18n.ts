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

// Cache für geladene Übersetzungen
const translationsCache: Map<SupportedLanguage, Translations> = new Map();

// Lade Übersetzung dynamisch
async function loadTranslation(lang: SupportedLanguage): Promise<Translations> {
    if (translationsCache.has(lang)) {
        return translationsCache.get(lang)!;
    }

    try {
        const module = await import(`./locales/${lang}.json`);
        const translation = module.default as Translations;
        translationsCache.set(lang, translation);
        return translation;
    } catch (error) {
        console.error(`Failed to load translation for ${lang}:`, error);
        // Fallback zu Englisch
        if (lang !== 'en') {
            return loadTranslation('en');
        }
        throw error;
    }
}

export function detectLanguage(): SupportedLanguage {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('it')) return 'it';
    if (browserLang.startsWith('es')) return 'es';

    return 'en';
}

// Synchrone Funktion die cached translations zurückgibt oder English fallback
export function getTranslations(language?: SupportedLanguage): Translations {
    const lang = language || detectLanguage();

    // Versuche aus Cache zu laden
    if (translationsCache.has(lang)) {
        return translationsCache.get(lang)!;
    }

    // Wenn nicht im Cache, initiiere async load (für nächstes Mal)
    loadTranslation(lang).catch(err => console.error('Translation load error:', err));

    // Fallback zu English falls vorhanden
    if (lang !== 'en' && translationsCache.has('en')) {
        return translationsCache.get('en')!;
    }

    // Letzter Fallback: Leeres Objekt (sollte nicht passieren)
    console.warn(`No translations available for ${lang}, using empty fallback`);
    return createEmptyTranslations();
}

// Async Version für initiales Laden
export async function loadTranslationsAsync(language?: SupportedLanguage): Promise<Translations> {
    const lang = language || detectLanguage();
    return await loadTranslation(lang);
}

// Initialisiere Übersetzungen beim Modulimport
(async () => {
    try {
        await Promise.all([
            loadTranslation('de'),
            loadTranslation('en'),
            loadTranslation('fr'),
            loadTranslation('it'),
            loadTranslation('es')
        ]);
    } catch (error) {
        console.error('Error preloading translations:', error);
    }
})();

export const languageNames: Record<SupportedLanguage, string> = {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    it: 'Italiano',
    es: 'Español',
};

// Hilfsfunktion für leere Translations als Fallback
function createEmptyTranslations(): Translations {
    return {
        general: {
            missing_entity: 'missing',
            inactive: 'Inactive'
        },
        editor: {
            tab_general: 'General',
            tab_styling: 'Styling',
            tab_infobar: 'Info Bar',
            tab_pv: 'PV',
            tab_battery: 'Battery',
            tab_house: 'House',
            tab_grid: 'Grid',
            card_header: 'Card Header',
            title: 'Title',
            title_placeholder: 'PV Monitor',
            title_helper: '',
            subtitle: 'Subtitle',
            subtitle_placeholder: 'Energy Overview',
            subtitle_helper: '',
            title_subtitle_gap: 'Gap',
            title_subtitle_gap_helper: '',
            icon: 'Icon',
            icon_helper: '',
            header_icon_size: 'Size',
            header_icon_size_helper: '',
            header_icon_color: 'Color',
            header_icon_margin: 'Margin',
            layout: 'Layout',
            grid_gap: 'Gap',
            grid_gap_placeholder: '6px',
            grid_gap_helper: '',
            header_margin_bottom: 'Margin',
            header_margin_bottom_helper: '',
            infobar_gap: 'Gap',
            infobar_gap_helper: '',
            language: 'Language',
            language_helper: '',
            central_entities: 'Entities',
            central_entities_helper: '',
            entity_pv_production: 'PV Production',
            entity_pv_production_helper: '',
            entity_battery_soc: 'Battery SOC',
            entity_battery_soc_helper: '',
            entity_battery_charge: 'Battery Charge',
            entity_battery_charge_helper: '',
            entity_battery_discharge: 'Battery Discharge',
            entity_battery_discharge_helper: '',
            entity_house_consumption: 'House Consumption',
            entity_house_consumption_helper: '',
            entity_grid_power: 'Grid Power',
            entity_grid_power_helper: '',
            central_config: 'Configuration',
            central_config_helper: '',
            pv_max_power_label: 'Max Power (W)',
            pv_max_power_helper: '',
            battery_capacity_label: 'Capacity (Wh)',
            battery_capacity_label_helper: '',
            grid_threshold_label: 'Threshold (W)',
            grid_threshold_helper: '',
            card_visibility: 'Visibility',
            show_pv_card: 'Show PV',
            show_battery_card: 'Show Battery',
            show_house_card: 'Show House',
            show_grid_card: 'Show Grid',
            infobar_settings: 'Info Bar',
            enable_infobar: 'Enable',
            infobar_position: 'Position',
            position_top: 'Top',
            position_bottom: 'Bottom',
            calculation_mode: 'Mode',
            calculation_mode_helper: '',
            mode_autarky: 'Autarky',
            mode_self_consumption: 'Self-Consumption',
            calculate_battery_times: 'Calculate Times',
            calculate_battery_times_helper: '',
            item: 'Item',
            entity: 'Entity',
            icon_label: 'Icon',
            label: 'Label',
            unit: 'Unit',
            default_autarky: 'Autarky',
            default_runtime: 'Runtime',
            default_chargetime: 'Charge Time',
            pv_system: 'PV System',
            pv_entity: 'Entity',
            pv_entity_helper: '',
            enable_animation: 'Animation',
            animation_style: 'Style',
            animation_style_helper: '',
            animation_rotating_dots: 'Rotating Dots',
            animation_particle_field: 'Particles',
            animation_electric_arc: 'Electric Arc',
            icon_rotation: 'Rotation',
            icon_rotation_helper: '',
            max_power: 'Max Power',
            max_power_helper: '',
            battery: 'Battery',
            battery_entity: 'Entity',
            battery_entity_helper: '',
            charge_entity: 'Charge',
            charge_entity_helper: '',
            discharge_entity: 'Discharge',
            discharge_entity_helper: '',
            battery_capacity: 'Capacity',
            battery_capacity_helper: '',
            calculate_runtime: 'Calculate',
            calculate_runtime_helper: '',
            icon_auto_helper: '',
            house_consumption: 'House',
            house_entity: 'Entity',
            house_entity_helper: '',
            grid: 'Grid',
            grid_entity: 'Entity',
            grid_entity_helper: '',
            threshold: 'Threshold',
            threshold_helper: '',
            status_texts: 'Status Texts',
            text_feed_in: 'Feed-in',
            text_feed_in_placeholder: 'Feed-in',
            text_neutral: 'Neutral',
            text_neutral_placeholder: 'Neutral',
            text_consumption: 'Consumption',
            text_consumption_placeholder: 'Consumption',
            additional_texts: 'Texts',
            secondary_entity: 'Secondary',
            secondary_entity_helper: '',
            secondary_text: 'Text',
            secondary_text_helper: '',
            tertiary_entity: 'Tertiary',
            tertiary_text: 'Text',
            styling: 'Styling',
            background_color: 'Background',
            border_color: 'Border',
            primary_color: 'Primary',
            secondary_color: 'Secondary',
            icon_color: 'Icon Color',
            card_styling: 'Styling',
            header_background: 'Background',
            enable_header_background: 'Enable',
            enable_header_background_helper: '',
            header_background_color: 'Color',
            header_border_color: 'Border',
            header_border_radius: 'Radius',
            header_padding: 'Padding',
            header_width: 'Width',
            header_width_helper: '',
            header_width_auto: 'Auto',
            header_width_full: 'Full',
            header_box_shadow: 'Shadow',
            border_radius: 'Radius',
            text_color: 'Text',
            padding: 'Padding',
            cursor: 'Cursor',
            title_subtitle: 'Title',
            title_size: 'Size',
            title_color: 'Color',
            title_alignment: 'Align',
            title_alignment_helper: '',
            title_font_weight: 'Weight',
            subtitle_size: 'Size',
            subtitle_color: 'Color',
            subtitle_alignment: 'Align',
            subtitle_font_weight: 'Weight',
            icons: 'Icons',
            icon_size: 'Size',
            icon_opacity: 'Opacity',
            icon_margin: 'Margin',
            primary_text_styling: 'Primary',
            primary_size: 'Size',
            primary_color_label: 'Color',
            primary_opacity: 'Opacity',
            primary_font_weight: 'Weight',
            secondary_text_styling: 'Secondary',
            secondary_size: 'Size',
            secondary_color_label: 'Color',
            secondary_opacity: 'Opacity',
            secondary_font_weight: 'Weight',
            tertiary_text_styling: 'Tertiary',
            tertiary_size: 'Size',
            tertiary_color_label: 'Color',
            tertiary_opacity: 'Opacity',
            tertiary_font_weight: 'Weight',
            select_entity: 'Select Entity',
            select_icon: 'Select Icon',
            action_none: 'None',
            action_more_info: 'More Info',
            action_navigate: 'Navigate',
            action_url: 'URL',
            action_call_service: 'Service',
            theme: 'Theme',
            theme_helper: '',
            select_theme: 'Select',
            tab_consumers: 'Consumers',
            consumers_settings: 'Settings',
            enable_consumers: 'Enable',
            consumers_position: 'Position',
            consumers_sort_mode: 'Sort',
            sort_highest_first: 'Highest',
            sort_lowest_first: 'Lowest',
            sort_none: 'None',
            sort_alpha_asc: 'A-Z',
            sort_alpha_desc: 'Z-A',
            consumers_threshold: 'Threshold',
            consumers_threshold_helper: '',
            add_consumer: 'Add',
            remove_consumer: 'Remove',
            consumer_entity: 'Entity',
            consumer_icon: 'Icon',
            consumer_label: 'Label',
            consumer_threshold: 'Threshold',
            consumer_auto_color: 'Auto Color',
            consumer_auto_color_helper: '',
            consumer_item_styling: 'Styling',
            consumer_primary_entity: 'Primary',
            consumer_primary_text: 'Text',
            consumer_show_primary: 'Show',
            consumer_secondary_entity: 'Secondary',
            consumer_secondary_text: 'Text',
            consumer_show_secondary: 'Show',
            consumer_switch_entity: 'Switch',
            consumer_switch_entity_helper: '',
            consumer_tap_actions: 'Actions',
            show_consumer_total_in_house: 'Show Total',
            show_consumer_total_helper: '',
            show_title: 'Show Title',
            show_subtitle: 'Show Subtitle',
            show_icon: 'Show Icon',
            title_line_height: 'Height',
            subtitle_line_height: 'Height',
            primary_line_height: 'Height',
            secondary_line_height: 'Height',
            tertiary_line_height: 'Height',
            label_line_height: 'Height',
            value_line_height: 'Height',
            item_calc_type: 'Type',
            calc_type_entity: 'Entity',
            calc_type_autarky: 'Autarky',
            calc_type_self_consumption: 'Self-Consumption',
            calc_type_runtime: 'Runtime',
            calc_type_chargetime: 'Charge Time'
        },
        status: {
            feed_in: 'Feed-in',
            neutral: 'Neutral',
            grid_consumption: 'Consumption',
            inactive: 'Inactive'
        }
    };
}