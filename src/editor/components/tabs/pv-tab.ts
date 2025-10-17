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
    const pvEntities = config.pv_bar?.entities || [];

    return html`
        ${renderCollapsibleSection(
            'pv_entities',
            'mdi:solar-panel-large',
            'PV-Anlagen',
            html`
                ${pvEntities.length < 5 ? html`
                    <button
                        class="add-button"
                        @click=${() => {
                            const newEntities = [...pvEntities, { entity: '', name: '' }];
                            onChange(['pv_bar', 'entities'], newEntities);
                        }}
                    >
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t.editor.add_pv_entity}
                    </button>
                ` : html`
                    <div class="warning">${t.editor.pv_max_5}</div>
                `}

                ${pvEntities.map((entity: any, index: number) => html`
                    <div class="entity-item">
                        <div class="entity-item-header">
                            <span>PV ${index + 1}</span>
                            <button
                                class="remove-button"
                                @click=${() => {
                                    const newEntities = pvEntities.filter((_: any, i: number) => i !== index);
                                    onChange(['pv_bar', 'entities'], newEntities);
                                }}
                            >
                                <ha-icon icon="mdi:delete"></ha-icon>
                                ${t.editor.remove_entity}
                            </button>
                        </div>

                        ${renderEntityPicker(
                            t.editor.entity,
                            entity.entity || '',
                            hass,
                            entityPickerStates.get(`pv_entity_${index}`) || { results: [], show: false },
                            (value) => {
                                const newEntities = [...pvEntities];
                                newEntities[index] = { ...newEntities[index], entity: value };
                                onChange(['pv_bar', 'entities'], newEntities);
                            },
                            (state) => onEntityPickerStateChange(`pv_entity_${index}`, state)
                        )}

                        ${renderTextfield(
                            t.editor.entity_name,
                            entity.name,
                            (value) => {
                                const newEntities = [...pvEntities];
                                newEntities[index] = { ...newEntities[index], name: value };
                                onChange(['pv_bar', 'entities'], newEntities);
                            },
                            { helper: t.editor.entity_name_helper }
                        )}

                        ${renderTextfield(
                            t.editor.max_power,
                            entity.max_power,
                            (value) => {
                                const newEntities = [...pvEntities];
                                newEntities[index] = { ...newEntities[index], max_power: parseInt(value) || undefined };
                                onChange(['pv_bar', 'entities'], newEntities);
                            },
                            { placeholder: '10000', helper: t.editor.max_power_helper }
                        )}

                        ${renderIconPicker(
                            t.editor.icon_label,
                            entity.icon,
                            hass,
                            (value) => {
                                const newEntities = [...pvEntities];
                                newEntities[index] = { ...newEntities[index], icon: value };
                                onChange(['pv_bar', 'entities'], newEntities);
                            },
                            { translations: { editor: t.editor } }
                        )}
                    </div>
                `)}
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
