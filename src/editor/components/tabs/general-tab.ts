import { html } from "lit";
import { PVMonitorCardConfig } from "../../../pv-monitor-card-types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderEntityPicker, EntityPickerState } from "../fields/entity-picker";
import { renderNumberfield } from "../fields/numberfield";
import { renderSwitch } from "../fields/switch";
import { renderTextfield } from "../fields/textfield";
import { renderIconPicker } from "../fields/icon-picker";
import { renderLanguageSelector } from "../fields/language-selector";

export function renderGeneralTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    return html`
        ${renderCollapsibleSection(
            'entities',
            'mdi:link-variant',
            t.editor.central_entities,
            html`
                ${renderEntityPicker(
                    t.editor.entity_pv_production,
                    config.entities?.pv_production,
                    hass,
                    entityPickerStates.get('entities.pv_production') || { results: [], show: false },
                    (value) => onChange(['entities', 'pv_production'], value),
                    (state) => onEntityPickerStateChange('entities.pv_production', state),
                    { helper: t.editor.entity_pv_production_helper, required: true, translations: { editor: t.editor } }
                )}
                ${renderEntityPicker(
                    t.editor.entity_battery_soc,
                    config.entities?.battery_soc,
                    hass,
                    entityPickerStates.get('entities.battery_soc') || { results: [], show: false },
                    (value) => onChange(['entities', 'battery_soc'], value),
                    (state) => onEntityPickerStateChange('entities.battery_soc', state),
                    { helper: t.editor.entity_battery_soc_helper, translations: { editor: t.editor } }
                )}
                ${renderEntityPicker(
                    t.editor.entity_battery_charge,
                    config.entities?.battery_charge,
                    hass,
                    entityPickerStates.get('entities.battery_charge') || { results: [], show: false },
                    (value) => onChange(['entities', 'battery_charge'], value),
                    (state) => onEntityPickerStateChange('entities.battery_charge', state),
                    { helper: t.editor.entity_battery_charge_helper, translations: { editor: t.editor } }
                )}
                ${renderEntityPicker(
                    t.editor.entity_battery_discharge,
                    config.entities?.battery_discharge,
                    hass,
                    entityPickerStates.get('entities.battery_discharge') || { results: [], show: false },
                    (value) => onChange(['entities', 'battery_discharge'], value),
                    (state) => onEntityPickerStateChange('entities.battery_discharge', state),
                    { helper: t.editor.entity_battery_discharge_helper, translations: { editor: t.editor } }
                )}
                ${renderEntityPicker(
                    t.editor.entity_house_consumption,
                    config.entities?.house_consumption,
                    hass,
                    entityPickerStates.get('entities.house_consumption') || { results: [], show: false },
                    (value) => onChange(['entities', 'house_consumption'], value),
                    (state) => onEntityPickerStateChange('entities.house_consumption', state),
                    { helper: t.editor.entity_house_consumption_helper, required: true, translations: { editor: t.editor } }
                )}
                ${renderEntityPicker(
                    t.editor.entity_grid_power,
                    config.entities?.grid_power,
                    hass,
                    entityPickerStates.get('entities.grid_power') || { results: [], show: false },
                    (value) => onChange(['entities', 'grid_power'], value),
                    (state) => onEntityPickerStateChange('entities.grid_power', state),
                    { helper: t.editor.entity_grid_power_helper, required: true, translations: { editor: t.editor } }
                )}
            `,
            expandedSections.has('entities'),
            () => onToggleSection('entities'),
            t.editor.central_entities_helper
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'config',
            'mdi:cog',
            t.editor.central_config,
            html`
                ${renderNumberfield(
                    t.editor.pv_max_power_label,
                    config.pv_max_power,
                    (value) => onChange(['pv_max_power'], value),
                    { min: 0, max: 100000, step: 100, helper: t.editor.pv_max_power_helper }
                )}
                ${renderNumberfield(
                    t.editor.battery_capacity_label,
                    config.battery_capacity,
                    (value) => onChange(['battery_capacity'], value),
                    { min: 0, max: 100000, step: 100, helper: t.editor.battery_capacity_label_helper }
                )}
                ${renderNumberfield(
                    t.editor.grid_threshold_label,
                    config.grid_threshold,
                    (value) => onChange(['grid_threshold'], value),
                    { min: 0, max: 1000, step: 10, helper: t.editor.grid_threshold_helper }
                )}
            `,
            expandedSections.has('config'),
            () => onToggleSection('config'),
            t.editor.central_config_helper
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'visibility',
            'mdi:eye',
            t.editor.card_visibility,
            html`
                ${renderSwitch(
                    t.editor.show_pv_card,
                    config.pv?.show !== false,
                    (value) => onChange(['pv', 'show'], value)
                )}
                ${renderSwitch(
                    t.editor.show_battery_card,
                    config.batterie?.show !== false,
                    (value) => onChange(['batterie', 'show'], value)
                )}
                ${renderSwitch(
                    t.editor.show_house_card,
                    config.haus?.show !== false,
                    (value) => onChange(['haus', 'show'], value)
                )}
                ${renderSwitch(
                    t.editor.show_grid_card,
                    config.netz?.show !== false,
                    (value) => onChange(['netz', 'show'], value)
                )}
            `,
            expandedSections.has('visibility'),
            () => onToggleSection('visibility')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'header',
            'mdi:card-text',
            'Titelbereich',
            html`
                ${renderSwitch(
                    t.editor.show_title,
                    config.show_title !== false,
                    (value) => onChange(['show_title'], value)
                )}
                ${renderTextfield(
                    t.editor.title,
                    config.title,
                    (value) => onChange(['title'], value),
                    { placeholder: t.editor.title_placeholder, helper: t.editor.title_helper }
                )}
                ${renderSwitch(
                    t.editor.show_subtitle,
                    config.show_subtitle !== false,
                    (value) => onChange(['show_subtitle'], value)
                )}
                ${renderTextfield(
                    t.editor.subtitle,
                    config.subtitle,
                    (value) => onChange(['subtitle'], value),
                    { placeholder: t.editor.subtitle_placeholder, helper: t.editor.subtitle_helper }
                )}
                ${renderSwitch(
                    t.editor.show_icon,
                    config.show_icon !== false,
                    (value) => onChange(['show_icon'], value)
                )}
                ${renderIconPicker(
                    t.editor.icon,
                    config.icon,
                    hass,
                    (value) => onChange(['icon'], value),
                    { helper: t.editor.icon_helper, translations: { editor: t.editor } }
                )}
            `,
            expandedSections.has('header'),
            () => onToggleSection('header')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'language',
            'mdi:translate',
            t.editor.language,
            html`
                ${renderLanguageSelector(
                    config.language,
                    (value) => onChange(['language'], value),
                    { translations: t }
                )}
            `,
            expandedSections.has('language'),
            () => onToggleSection('language')
        )}
    `;
}
