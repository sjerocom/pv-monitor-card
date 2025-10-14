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

export function renderPVTab(
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
            'pv_main',
            'mdi:solar-panel',
            t.editor.pv_system,
            html`
                ${renderIconPicker(
                    t.editor.icon_label,
                    config.pv?.icon,
                    hass,
                    (value) => onChange(['pv', 'icon'], value),
                    { translations: { editor: t.editor } }
                )}
                ${renderSwitch(
                    t.editor.enable_animation,
                    config.pv?.animation,
                    (value) => onChange(['pv', 'animation'], value)
                )}
                ${renderAnimationSelector('pv', config.pv, onChange, t)}
                ${renderSwitch(
                    t.editor.icon_rotation,
                    config.pv?.icon_rotation,
                    (value) => onChange(['pv', 'icon_rotation'], value),
                    { helper: t.editor.icon_rotation_helper }
                )}
            `,
            expandedSections.has('pv_main'),
            () => onToggleSection('pv_main')
        )}

        <div class="divider"></div>

        ${renderCardTexts(
            'pv',
            config.pv,
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
            'pv',
            config.pv,
            expandedSections,
            onToggleSection,
            onTapActionChange,
            t
        )}

        <div class="divider"></div>

        ${renderCardStyling('pv', config.pv, expandedSections, onToggleSection, onChange, t)}
    `;
}
