import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
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
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    t: any
) {
    const batteryEntities = config.battery_bar?.entities || [];

    return html`
        ${renderCollapsibleSection(
            'battery_entities',
            'mdi:battery-high',
            'Batterien',
            html`
                ${batteryEntities.length < 5 ? html`
                    <button
                        class="add-button"
                        @click=${() => {
                            const newEntities = [...batteryEntities, { entity: '', name: '' }];
                            onChange(['battery_bar', 'entities'], newEntities);
                        }}
                    >
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t.editor.add_battery_entity}
                    </button>
                ` : html`
                    <div class="warning">${t.editor.battery_max_5}</div>
                `}

                ${batteryEntities.map((entity: any, index: number) => html`
                    <div class="entity-item">
                        <div class="entity-item-header">
                            <span>Battery ${index + 1}</span>
                            <button
                                class="remove-button"
                                @click=${() => {
                                    const newEntities = batteryEntities.filter((_: any, i: number) => i !== index);
                                    onChange(['battery_bar', 'entities'], newEntities);
                                }}
                            >
                                <ha-icon icon="mdi:delete"></ha-icon>
                                ${t.editor.remove_entity}
                            </button>
                        </div>

                        ${renderEntityPicker(
                            t.editor.battery_entity,
                            entity.entity || '',
                            hass,
                            entityPickerStates.get(`battery_entity_${index}`) || { results: [], show: false },
                            (value) => {
                                const newEntities = [...batteryEntities];
                                newEntities[index] = { ...newEntities[index], entity: value };
                                onChange(['battery_bar', 'entities'], newEntities);
                            },
                            (state) => onEntityPickerStateChange(`battery_entity_${index}`, state),
                            { helper: t.editor.battery_entity_helper }
                        )}

                        ${renderTextfield(
                            t.editor.entity_name,
                            entity.name,
                            (value) => {
                                const newEntities = [...batteryEntities];
                                newEntities[index] = { ...newEntities[index], name: value };
                                onChange(['battery_bar', 'entities'], newEntities);
                            },
                            { helper: t.editor.entity_name_helper }
                        )}

                        ${renderTextfield(
                            t.editor.battery_capacity,
                            entity.capacity,
                            (value) => {
                                const newEntities = [...batteryEntities];
                                newEntities[index] = { ...newEntities[index], capacity: parseInt(value) || undefined };
                                onChange(['battery_bar', 'entities'], newEntities);
                            },
                            { placeholder: '10000', helper: t.editor.battery_capacity_helper }
                        )}

                        ${renderEntityPicker(
                            t.editor.charge_entity,
                            entity.charge_entity || '',
                            hass,
                            entityPickerStates.get(`battery_charge_${index}`) || { results: [], show: false },
                            (value) => {
                                const newEntities = [...batteryEntities];
                                newEntities[index] = { ...newEntities[index], charge_entity: value };
                                onChange(['battery_bar', 'entities'], newEntities);
                            },
                            (state) => onEntityPickerStateChange(`battery_charge_${index}`, state),
                            { helper: t.editor.charge_entity_helper }
                        )}

                        ${renderEntityPicker(
                            t.editor.discharge_entity,
                            entity.discharge_entity || '',
                            hass,
                            entityPickerStates.get(`battery_discharge_${index}`) || { results: [], show: false },
                            (value) => {
                                const newEntities = [...batteryEntities];
                                newEntities[index] = { ...newEntities[index], discharge_entity: value };
                                onChange(['battery_bar', 'entities'], newEntities);
                            },
                            (state) => onEntityPickerStateChange(`battery_discharge_${index}`, state),
                            { helper: t.editor.discharge_entity_helper }
                        )}

                        ${renderIconPicker(
                            t.editor.icon_label,
                            entity.icon,
                            hass,
                            (value) => {
                                const newEntities = [...batteryEntities];
                                newEntities[index] = { ...newEntities[index], icon: value };
                                onChange(['battery_bar', 'entities'], newEntities);
                            },
                            { translations: { editor: t.editor }, helper: t.editor.icon_auto_helper }
                        )}
                    </div>
                `)}
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
