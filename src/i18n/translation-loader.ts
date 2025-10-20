import { SupportedLanguage, Translations } from './types';
import { detectLanguage } from './language-detection';

/**
 * Cache für geladene Übersetzungen
 */
const translationsCache: Map<SupportedLanguage, Translations> = new Map();

/**
 * Lade Übersetzung dynamisch
 * @param lang Sprache zum Laden
 * @returns Promise mit Übersetzungen
 */
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

/**
 * Synchrone Funktion die cached translations zurückgibt oder English fallback
 * @param language Optional: Gewünschte Sprache (Standard: Browser-Sprache)
 * @returns Übersetzungen für die angegebene Sprache
 */
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

/**
 * Async Version für initiales Laden
 * @param language Optional: Gewünschte Sprache (Standard: Browser-Sprache)
 * @returns Promise mit Übersetzungen
 */
export async function loadTranslationsAsync(language?: SupportedLanguage): Promise<Translations> {
    const lang = language || detectLanguage();
    return await loadTranslation(lang);
}

/**
 * Initialisiere alle Übersetzungen beim Modulimport
 */
export async function preloadAllTranslations(): Promise<void> {
    try {
        await Promise.all([
            loadTranslation('de'),
            loadTranslation('en'),
            loadTranslation('fr'),
            loadTranslation('it'),
            loadTranslation('es'),
            loadTranslation('nl'),
            loadTranslation('pt'),
            loadTranslation('sv'),
            loadTranslation('fi'),
            loadTranslation('cs'),
            loadTranslation('sl'),
            loadTranslation('sk'),
            loadTranslation('bs'),
            loadTranslation('sr')
        ]);
    } catch (error) {
        console.error('Error preloading translations:', error);
    }
}

/**
 * Hilfsfunktion für leere Translations als Fallback
 * Basiert auf de.json Struktur
 */
function createEmptyTranslations(): Translations {
    return {
        general: {
            missing_entity: 'missing',
            inactive: 'Inactive'
        },
        editor: {
            tab_general: 'General',
            tab_header: 'Header',
            tab_theme: 'Theme',
            tab_infobar: 'Info Bar',
            tab_pv: 'PV System',
            tab_battery: 'Battery',
            tab_house: 'House',
            tab_grid: 'Grid',
            tab_consumers: 'Consumers',
            tab_pv_bar: 'PV Bar',
            tab_battery_bar: 'Battery Bar',
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
            header_icon_size_helper: 'Size of icon next to title',
            header_icon_color: 'Header Icon Color',
            header_icon_margin: 'Header Icon Margin',
            icon: 'Icon',
            icon_helper: 'Only shown when title is present, leave empty to hide.',
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
            central_entities_helper: 'Define main entities for calculations',
            entity_pv_production: 'PV Production Entity',
            entity_pv_production_helper: 'Entity for PV power (used for calculations)',
            entity_battery_soc: 'Battery SOC Entity',
            entity_battery_soc_helper: 'Entity for battery charge in % (for calculations)',
            entity_battery_charge: 'Battery Charge Entity',
            entity_battery_charge_helper: 'Entity for battery charge power (for calculations)',
            entity_battery_discharge: 'Battery Discharge Entity',
            entity_battery_discharge_helper: 'Entity for battery discharge power (for calculations)',
            entity_house_consumption: 'House Consumption Entity',
            entity_house_consumption_helper: 'Entity for house consumption (for autarky calculation, optional)',
            entity_grid_power: 'Grid Entity',
            entity_grid_power_helper: 'Entity for grid import/export (for calculations)',
            central_config: 'Central Configuration',
            central_config_helper: 'These values apply to all cards',
            pv_max_power_label: 'PV Max Power (W)',
            pv_max_power_helper: 'Maximum PV power for animations',
            battery_capacity_label: 'Battery Capacity (Wh)',
            battery_capacity_label_helper: 'Battery capacity (e.g. 10000 for 10 kWh)',
            grid_threshold_label: 'Grid Threshold (W)',
            grid_threshold_helper: 'Below this value "Neutral" is displayed',
            card_visibility: 'Card Visibility',
            cards_order: 'Cards Order',
            cards_order_helper: 'Change order and visibility of the 4 cards',
            card_pv: 'PV System',
            card_battery: 'Battery',
            card_house: 'House',
            card_grid: 'Grid',
            show_pv_card: 'Show PV Card',
            show_battery_card: 'Show Battery Card',
            show_house_card: 'Show House Card',
            show_grid_card: 'Show Grid Card',
            infobar_settings: 'Info Bar Settings',
            enable_infobar: 'Enable Info Bar',
            infobar_position: 'Info Bar Position',
            position_top: 'Top (above cards)',
            position_bottom: 'Bottom',
            calculation_mode: 'Calculation for Item 1',
            calculation_mode_helper: 'Choose: Autarky or Self-Consumption',
            mode_autarky: 'Autarky (Self-Sufficiency)',
            mode_self_consumption: 'Self-Consumption (Self-Use)',
            calculate_battery_times: 'Calculate Battery Times',
            calculate_battery_times_helper: 'Automatic calculation for Item 2 (remaining runtime) and 3 (remaining charge time)',
            item: 'Item',
            entity: 'Entity',
            icon_label: 'Icon',
            label: 'Label',
            unit: 'Unit',
            default_autarky: 'Autarky',
            default_runtime: 'Remaining Runtime',
            default_chargetime: 'Remaining Charge Time',
            pv_system: 'PV System',
            pv_entity: 'PV Entity',
            pv_entity_helper: 'Entity for PV power',
            enable_animation: 'Enable Animation',
            animation_style: 'Animation Style',
            animation_style_helper: 'Choose animation effect',
            animation_rotating_dots: 'Rotating Dots',
            animation_particle_field: 'Particle Field',
            animation_electric_arc: 'Electric Arcs',
            icon_rotation: 'Icon Rotation',
            icon_rotation_helper: 'Icon rotates based on power',
            max_power: 'Max Power (W)',
            max_power_helper: 'Maximum PV power for animation & rotation',
            battery: 'Battery',
            battery_entity: 'Battery Entity',
            battery_entity_helper: 'Entity for battery level (%)',
            charge_entity: 'Charge Entity',
            charge_entity_helper: 'Entity for charge power',
            discharge_entity: 'Discharge Entity',
            discharge_entity_helper: 'Entity for discharge power',
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
            grid_entity_helper: 'Entity for grid import/export',
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
            header_width_auto: 'Auto (content size)',
            header_width_full: 'Full (100% width)',
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
            title_font_weight: 'Title Font-Weight',
            subtitle_size: 'Subtitle Size',
            subtitle_color: 'Subtitle Color',
            subtitle_alignment: 'Subtitle Alignment',
            subtitle_font_weight: 'Subtitle Font-Weight',
            icons: 'Icons',
            icon_size: 'Icon Size',
            icon_opacity: 'Icon Opacity',
            icon_margin: 'Icon Margin',
            primary_text_styling: 'Primary Text (Main Value)',
            primary_size: 'Primary Size',
            primary_color_label: 'Primary Color',
            primary_opacity: 'Primary Opacity',
            primary_font_weight: 'Primary Font-Weight',
            secondary_text_styling: 'Secondary Text (2nd Line)',
            secondary_size: 'Secondary Size',
            secondary_color_label: 'Secondary Color',
            secondary_opacity: 'Secondary Opacity',
            secondary_font_weight: 'Secondary Font-Weight',
            tertiary_text_styling: 'Tertiary Text (3rd Line)',
            tertiary_size: 'Tertiary Size',
            tertiary_color_label: 'Tertiary Color',
            tertiary_opacity: 'Tertiary Opacity',
            tertiary_font_weight: 'Tertiary Font-Weight',
            select_entity: 'Select Entity',
            select_icon: 'Select Icon',
            action_none: 'None',
            action_more_info: 'More Info',
            action_navigate: 'Navigate',
            action_url: 'URL',
            action_call_service: 'Call Service',
            theme: 'Theme',
            theme_helper: 'Choose a predefined color theme',
            select_theme: 'Select Theme',
            consumers_settings: 'Consumer Settings',
            enable_consumers: 'Enable Consumer Bar',
            consumers_position: 'Position',
            consumers_sort_mode: 'Sorting',
            sort_highest_first: 'Highest First',
            sort_lowest_first: 'Lowest First',
            sort_none: 'No Sorting (Input Order)',
            sort_alpha_asc: 'Alphabetically Ascending',
            sort_alpha_desc: 'Alphabetically Descending',
            consumers_threshold: 'Global Threshold (W)',
            consumers_threshold_helper: 'Consumers below this value are not displayed',
            add_consumer: 'Add Consumer',
            remove_consumer: 'Remove Consumer',
            consumer_entity: 'No:',
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
            tap_action_target: 'Tap Action Target',
            double_tap_action_target: 'Double Tap Action Target',
            hold_action_target: 'Hold Action Target',
            action_target_none: 'No Action',
            action_target_entity: 'Entity Toggle',
            action_target_custom_entity: 'Custom Entity Toggle',
            action_target_custom_action: 'Custom Action',
            custom_entity_toggle: 'Custom Entity (Toggle)',
            custom_entity_toggle_helper: 'Entity to be toggled',
            show_consumer_total_in_house: 'Total Consumption as Secondary Text',
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
            calc_type_runtime: 'Remaining Runtime',
            calc_type_chargetime: 'Remaining Charge Time',
            header_section: 'Title Area',
            header_visibility: 'Visibility',
            header_content: 'Content',
            header_title_styling: 'Title Styling',
            header_subtitle_styling: 'Subtitle Styling',
            header_icon_styling: 'Icon Styling',
            infobar_styling: 'Info Bar Styling',
            card_styling_section: 'Card Styling',
            theme_editor_cards: 'Theme Editor (Cards)',
            theme_editor_cards_note: 'Changes only card colors, not title area.',
            header_background_subsection: 'Header Background',
            icon_subsection: 'Icon',
            primary_text_subsection: 'Primary Text (Main Value)',
            secondary_text_subsection: 'Secondary Text (2nd Line)',
            tertiary_text_subsection: 'Tertiary Text (3rd Line)',
            action_navigation_path: 'Navigation Path',
            action_url_label: 'URL',
            action_service: 'Service',
            layout_order: 'Layout Order',
            layout_order_helper: 'Determine the order of elements',
            pv_bar_settings: 'PV Bar Settings',
            battery_bar_settings: 'Battery Bar Settings',
            enable_pv_bar: 'Enable PV Bar',
            enable_battery_bar: 'Enable Battery Bar',
            bar_position: 'Position',
            bar_align: 'Alignment',
            align_left: 'Left',
            align_center: 'Centered',
            align_right: 'Right',
            bar_entities: 'Systems/Batteries',
            add_pv_entity: 'Add PV System',
            add_battery_entity: 'Add Battery',
            remove_entity: 'Remove',
            entity_name: 'Name',
            entity_name_helper: 'Display name in bar',
            pv_max_5: 'Max 5 PV Systems',
            battery_max_5: 'Max 5 Batteries',
            bar_styling: 'Bar Styling',
            bar_separator: 'Separator',
            bar_separator_helper: 'Character between items (e.g. | or •)',
            bar_item_gap: 'Item Gap',
            bar_item_gap_helper: 'Space between items',
            position_above_cards: 'Above Cards',
            position_below_cards: 'Below Cards',
            position_above_consumers: 'Above Consumers',
            position_below_consumers: 'Below Consumers',
            pv_bar_gap: 'PV Bar Gap',
            pv_bar_gap_helper: 'Space between PV bar and other elements',
            battery_bar_gap: 'Battery Bar Gap',
            battery_bar_gap_helper: 'Space between battery bar and other elements',
            move_up: 'Move Up',
            move_down: 'Move Down',
            duplicate: 'Duplicate',
            delete: 'Delete',
            tap_action: 'Tap Action',
            double_tap: 'Double Tap',
            hold_action: 'Hold Action'
        },
        status: {
            feed_in: 'Feed-in',
            neutral: 'Neutral',
            grid_consumption: 'Grid Consumption',
            inactive: 'Inactive'
        }
    };
}

// Auto-Initialisierung beim Import
(async () => {
    await preloadAllTranslations();
})();
