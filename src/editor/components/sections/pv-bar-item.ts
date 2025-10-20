import { html } from "lit";
import { EntityPickerState, renderEntityPicker } from "../fields/entity-picker";
import { renderIconPicker } from "../fields/icon-picker";
import { renderTextfield } from "../fields/textfield";
import { renderNumberfield } from "../fields/numberfield";

export function renderPVBarItem(
    item: any,
    index: number,
    isExpanded: boolean,
    hass: any,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggle: () => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onMoveUp: () => void,
    onMoveDown: () => void,
    onDuplicate: () => void,
    onRemove: () => void,
    isFirst: boolean,
    isLast: boolean,
    t: any
) {
    const entityLabel = item.name || item.entity || `PV ${index + 1}`;
    const basePath = ['pv', 'entities', index.toString()];

    return html`
        <div class="consumer-section">
            <div class="consumer-header" @click=${onToggle}>
                <div class="consumer-title">
                    <ha-icon
                        class="expand-icon ${isExpanded ? 'expanded' : ''}"
                        icon="mdi:chevron-down"
                    ></ha-icon>
                    <span class="consumer-title-text">
                        PV ${index + 1}
                        ${item.name ? html` <span style="opacity: 0.6; font-weight: normal; font-size: 0.9em;">(${entityLabel})</span>` : ''}
                    </span>
                </div>
                <div class="consumer-header-actions" @click=${(e: Event) => e.stopPropagation()}>
                    ${!isFirst ? html`
                        <ha-icon-button
                            .path=${'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z'}
                            @click=${onMoveUp}
                            title="${t.editor.move_up}"
                        ></ha-icon-button>
                    ` : ''}
                    ${!isLast ? html`
                        <ha-icon-button
                            .path=${'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'}
                            @click=${onMoveDown}
                            title="${t.editor.move_down}"
                        ></ha-icon-button>
                    ` : ''}
                    <ha-icon-button
                        .path=${'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'}
                        @click=${onDuplicate}
                        title="${t.editor.duplicate}"
                        style="color: rgba(33, 150, 243, 1);"
                    ></ha-icon-button>
                    <ha-icon-button
                        .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'}
                        @click=${onRemove}
                        title="${t.editor.delete}"
                        style="color: rgba(244,67,54,1);"
                    ></ha-icon-button>
                </div>
            </div>

            <div class="consumer-content ${isExpanded ? '' : 'collapsed'}">
                ${renderEntityPicker(
                    'Entity',
                    item.entity,
                    hass,
                    entityPickerStates.get(`${basePath.join('.')}.entity`) || { results: [], show: false },
                    (value) => onChange([...basePath, 'entity'], value),
                    (state) => onEntityPickerStateChange(`${basePath.join('.')}.entity`, state),
                    { required: true, translations: { editor: t.editor } }
                )}
                ${renderTextfield(
                    t.editor.entity_name,
                    item.name,
                    (value) => onChange([...basePath, 'name'], value),
                    { helper: t.editor.entity_name_helper }
                )}
                ${renderNumberfield(
                    t.editor.max_power,
                    item.max_power,
                    (value) => onChange([...basePath, 'max_power'], value),
                    { min: 0, max: 50000, step: 100, helper: t.editor.max_power_helper }
                )}
                ${renderIconPicker(
                    t.editor.icon_label,
                    item.icon,
                    hass,
                    (value) => onChange([...basePath, 'icon'], value),
                    { translations: { editor: t.editor } }
                )}
            </div>
        </div>
    `;
}
