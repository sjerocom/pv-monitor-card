import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderPVBarItem } from "../sections/pv-bar-item";
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

export function renderPVTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    expandedPVBarIndex: number | null,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onTogglePVBarItem: (index: number) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    onAddPVBarItem: () => void,
    onDuplicatePVBarItem: (index: number) => void,
    onMovePVBarItemUp: (index: number) => void,
    onMovePVBarItemDown: (index: number) => void,
    onRemovePVBarItem: (index: number) => void,
    t: any
) {
    const pvBar = config.pv_bar || { show: false, entities: [] };
    const canAddMore = (pvBar.entities?.length || 0) < 5;

    return html`
        ${renderCollapsibleSection(
            'pv_entities',
            'mdi:solar-panel-large',
            t.editor.bar_entities,
            html`
                ${(pvBar.entities || []).map((item, index) => {
                    const isExpanded = expandedPVBarIndex === index;
                    return renderPVBarItem(
                        item,
                        index,
                        isExpanded,
                        hass,
                        entityPickerStates,
                        () => onTogglePVBarItem(index),
                        onEntityPickerStateChange,
                        onChange,
                        () => onMovePVBarItemUp(index),
                        () => onMovePVBarItemDown(index),
                        () => onDuplicatePVBarItem(index),
                        () => onRemovePVBarItem(index),
                        index === 0,
                        index === (pvBar.entities?.length || 0) - 1,
                        t
                    );
                })}

                ${canAddMore ? html`
                    <ha-button @click=${onAddPVBarItem}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t.editor.add_pv_entity}
                    </ha-button>
                ` : html`
                    <div class="info-text" style="padding: 8px; opacity: 0.7;">
                        ${t.editor.pv_max_5}
                    </div>
                `}
            `,
            expandedSections.has('pv_entities'),
            () => onToggleSection('pv_entities')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'pv_main',
            'mdi:cog',
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
