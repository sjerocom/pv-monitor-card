import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderEntityPicker, EntityPickerState } from "../fields/entity-picker";
import { renderIconPicker } from "../fields/icon-picker";
import { renderSwitch } from "../fields/switch";
import { renderTextfield } from "../fields/textfield";
import { renderNumberfield } from "../fields/numberfield";
import {
    renderAnimationSelector,
    renderCardTapActions,
    renderCardTexts,
    renderCardStyling
} from "./card-tab-helpers";

export function renderGridTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    t: any
) {
    return html`
        ${renderCollapsibleSection(
            'grid_main',
            'mdi:transmission-tower',
            t.editor.grid,
            html`
                ${renderEntityPicker(
                    t.editor.entity,
                    config.netz?.entity,
                    hass,
                    entityPickerStates.get('netz.entity') || { results: [], show: false },
                    (value) => onChange(['netz', 'entity'], value),
                    (state) => onEntityPickerStateChange('netz.entity', state),
                    { helper: t.editor.grid_entity_helper, translations: { editor: t.editor } }
                )}
                ${renderNumberfield(
                    t.editor.threshold,
                    config.netz?.threshold ?? 10,
                    (value) => onChange(['netz', 'threshold'], value),
                    { 
                        min: 0, 
                        max: 100, 
                        step: 1,
                        helper: t.editor.grid_threshold_helper || 'Schwellwert für Neutral-Status (-threshold bis +threshold Watt)'
                    }
                )}
                ${renderIconPicker(
                    t.editor.icon_label,
                    config.netz?.icon,
                    hass,
                    (value) => onChange(['netz', 'icon'], value),
                    { translations: { editor: t.editor } }
                )}
                ${renderSwitch(
                    t.editor.enable_animation,
                    config.netz?.animation,
                    (value) => onChange(['netz', 'animation'], value)
                )}
                ${renderAnimationSelector('netz', config.netz, onChange, t)}
            `,
            expandedSections.has('grid_main'),
            () => onToggleSection('grid_main')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'grid_status',
            'mdi:text-box',
            t.editor.status_texts,
            html`
                ${renderTextfield(
                    t.editor.text_feed_in,
                    config.netz?.text_einspeisen,
                    (value) => onChange(['netz', 'text_einspeisen'], value),
                    { placeholder: t.editor.text_feed_in_placeholder }
                )}
                ${renderTextfield(
                    t.editor.text_neutral,
                    config.netz?.text_neutral,
                    (value) => onChange(['netz', 'text_neutral'], value),
                    { placeholder: t.editor.text_neutral_placeholder }
                )}
                ${renderTextfield(
                    t.editor.text_consumption,
                    config.netz?.text_bezug,
                    (value) => onChange(['netz', 'text_bezug'], value),
                    { placeholder: t.editor.text_consumption_placeholder }
                )}
            `,
            expandedSections.has('grid_status'),
            () => onToggleSection('grid_status')
        )}

        <div class="divider"></div>

        ${renderCardTexts(
            'netz',
            config.netz,
            hass,
            expandedSections,
            entityPickerStates,
            onToggleSection,
            onEntityPickerStateChange,
            onChange,
            t
        )}

        <div class="divider"></div>

        ${renderCardTapActions(
            'netz',
            config.netz,
            expandedSections,
            onToggleSection,
            onTapActionChange,
            t
        )}

        <div class="divider"></div>

        ${renderCardStyling('netz', config.netz, expandedSections, onToggleSection, onChange, t)}
    `;
}
