import { html } from "lit";
import { PVMonitorCardConfig } from "../../../pv-monitor-card-types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderIconPicker } from "../fields/icon-picker";
import { renderSwitch } from "../fields/switch";
import { EntityPickerState } from "../fields/entity-picker";
import {
    renderAnimationSelector,
    renderCardTapActions,
    renderCardTexts,
    renderCardStyling
} from "./card-tab-helpers";

export function renderBatteryTab(
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
            'battery_main',
            'mdi:battery',
            t.editor.battery,
            html`
                ${renderIconPicker(
                    t.editor.icon_label,
                    config.batterie?.icon,
                    hass,
                    (value) => onChange(['batterie', 'icon'], value),
                    { helper: t.editor.icon_auto_helper, translations: { editor: t.editor } }
                )}
                ${renderSwitch(
                    t.editor.enable_animation,
                    config.batterie?.animation,
                    (value) => onChange(['batterie', 'animation'], value)
                )}
                ${renderAnimationSelector('batterie', config.batterie, onChange, t)}
            `,
            expandedSections.has('battery_main'),
            () => onToggleSection('battery_main')
        )}

        <div class="divider"></div>

        ${renderCardTexts(
            'batterie',
            config.batterie,
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
            'batterie',
            config.batterie,
            expandedSections,
            onToggleSection,
            onTapActionChange,
            t
        )}

        <div class="divider"></div>

        ${renderCardStyling('batterie', config.batterie, expandedSections, onToggleSection, onChange, t)}
    `;
}
