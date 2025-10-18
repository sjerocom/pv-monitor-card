import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderBatteryBarItem } from "../sections/battery-bar-item";
import { renderIconPicker } from "../fields/icon-picker";
import { renderSwitch } from "../fields/switch";
import { renderEntityPicker, EntityPickerState } from "../fields/entity-picker";
import { renderTextfield } from "../fields/textfield";
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
    expandedBatteryBarIndex: number | null,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onToggleBatteryBarItem: (index: number) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    onAddBatteryBarItem: () => void,
    onDuplicateBatteryBarItem: (index: number) => void,
    onMoveBatteryBarItemUp: (index: number) => void,
    onMoveBatteryBarItemDown: (index: number) => void,
    onRemoveBatteryBarItem: (index: number) => void,
    t: any
) {
    const batteryBar = config.battery_bar || { show: false, entities: [] };
    const canAddMore = (batteryBar.entities?.length || 0) < 5;

    return html`
        ${renderCollapsibleSection(
            'battery_entities',
            'mdi:battery-high',
            t.editor.bar_entities,
            html`
                ${(batteryBar.entities || []).map((item, index) => {
                    const isExpanded = expandedBatteryBarIndex === index;
                    return renderBatteryBarItem(
                        item,
                        index,
                        isExpanded,
                        hass,
                        entityPickerStates,
                        () => onToggleBatteryBarItem(index),
                        onEntityPickerStateChange,
                        onChange,
                        () => onMoveBatteryBarItemUp(index),
                        () => onMoveBatteryBarItemDown(index),
                        () => onDuplicateBatteryBarItem(index),
                        () => onRemoveBatteryBarItem(index),
                        index === 0,
                        index === (batteryBar.entities?.length || 0) - 1,
                        t
                    );
                })}

                ${canAddMore ? html`
                    <ha-button @click=${onAddBatteryBarItem}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t.editor.add_battery_entity}
                    </ha-button>
                ` : html`
                    <div class="info-text" style="padding: 8px; opacity: 0.7;">
                        ${t.editor.battery_max_5}
                    </div>
                `}
            `,
            expandedSections.has('battery_entities'),
            () => onToggleSection('battery_entities')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'battery_main',
            'mdi:cog',
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
