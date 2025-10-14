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

export function renderHouseTab(
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
            'house_main',
            'mdi:home',
            t.editor.house_consumption,
            html`
                ${renderIconPicker(
                    t.editor.icon_label,
                    config.haus?.icon,
                    hass,
                    (value) => onChange(['haus', 'icon'], value),
                    { translations: { editor: t.editor } }
                )}
                ${renderSwitch(
                    t.editor.enable_animation,
                    config.haus?.animation,
                    (value) => onChange(['haus', 'animation'], value)
                )}
                ${renderAnimationSelector('haus', config.haus, onChange, t)}
            `,
            expandedSections.has('house_main'),
            () => onToggleSection('house_main')
        )}

        <div class="divider"></div>

        ${renderCardTexts(
            'haus',
            config.haus,
            hass,
            expandedSections,
            entityPickerStates,
            onToggleSection,
            onEntityPickerStateChange,
            onChange,
            t,
            renderSwitch(
                t.editor.show_consumer_total_in_house,
                config.haus?.show_consumer_total,
                (value) => onChange(['haus', 'show_consumer_total'], value),
                { helper: t.editor.show_consumer_total_helper }
            )
        )}

        <div class="divider"></div>

        ${renderCardTapActions(
            'haus',
            config.haus,
            expandedSections,
            onToggleSection,
            onTapActionChange,
            t
        )}

        <div class="divider"></div>

        ${renderCardStyling('haus', config.haus, expandedSections, onToggleSection, onChange, t)}
    `;
}
