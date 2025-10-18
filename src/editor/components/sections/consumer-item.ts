import { html } from "lit";
import { EntityPickerState, renderEntityPicker } from "../fields/entity-picker";
import { renderIconPicker } from "../fields/icon-picker";
import { renderTextfield } from "../fields/textfield";
import { renderNumberfield } from "../fields/numberfield";
import { renderSwitch } from "../fields/switch";
import { renderActionSelector } from "../fields/action-selector";
import { renderActionTargetSelector } from "../fields/action-target-selector";
import { renderColorPicker } from "../fields/color-picker";

export function renderConsumerItem(
    item: any,
    index: number,
    isExpanded: boolean,
    expandedSubsections: Set<string>,
    hass: any,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggle: () => void,
    onToggleSubsection: (subsectionId: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    onMoveUp: () => void,
    onMoveDown: () => void,
    onDuplicate: () => void,
    onRemove: () => void,
    isFirst: boolean,
    isLast: boolean,
    t: any
) {
    const entityLabel = item.entity || t.editor.consumer_entity;
    const basePath = ['consumers', 'items', index.toString()];

    return html`
        <div class="consumer-section">
            <div class="consumer-header" @click=${onToggle}>
                <div class="consumer-title">
                    <ha-icon
                        class="expand-icon ${isExpanded ? 'expanded' : ''}"
                        icon="mdi:chevron-down"
                    ></ha-icon>
                    <span class="consumer-title-text">
                        ${t.editor.consumer_entity} ${index + 1}
                        ${item.entity ? html` <span style="opacity: 0.6; font-weight: normal; font-size: 0.9em;">(${entityLabel})</span>` : ''}
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
                    t.editor.consumer_entity,
                    item.entity,
                    hass,
                    entityPickerStates.get(`${basePath.join('.')}.entity`) || { results: [], show: false },
                    (value) => onChange([...basePath, 'entity'], value),
                    (state) => onEntityPickerStateChange(`${basePath.join('.')}.entity`, state),
                    { required: true, translations: { editor: t.editor } }
                )}
                ${renderIconPicker(
                    t.editor.consumer_icon,
                    item.icon,
                    hass,
                    (value) => onChange([...basePath, 'icon'], value),
                    { translations: { editor: t.editor } }
                )}
                ${renderTextfield(
                    t.editor.consumer_label,
                    item.label,
                    (value) => onChange([...basePath, 'label'], value)
                )}
                ${renderNumberfield(
                    t.editor.consumer_threshold,
                    item.threshold,
                    (value) => onChange([...basePath, 'threshold'], value),
                    { min: 0, max: 10000, step: 1 }
                )}
                ${renderSwitch(
                    t.editor.consumer_auto_color,
                    item.auto_color !== false,
                    (value) => onChange([...basePath, 'auto_color'], value),
                    { helper: t.editor.consumer_auto_color_helper }
                )}

                <div class="consumer-subsection">
                    <div class="consumer-subsection-header" @click=${() => onToggleSubsection('texts')}>
                        <ha-icon icon="mdi:text"></ha-icon>
                        ${t.editor.additional_texts}
                        <ha-icon
                            class="expand-icon ${expandedSubsections.has('texts') ? 'expanded' : ''}"
                            icon="mdi:chevron-down"
                            style="margin-left: auto;"
                        ></ha-icon>
                    </div>
                    <div class="consumer-subsection-content ${expandedSubsections.has('texts') ? '' : 'collapsed'}">
                        ${renderSwitch(
                            t.editor.consumer_show_primary,
                            item.show_primary !== false,
                            (value) => onChange([...basePath, 'show_primary'], value)
                        )}
                        ${renderEntityPicker(
                            t.editor.consumer_primary_entity,
                            item.primary_entity,
                            hass,
                            entityPickerStates.get(`${basePath.join('.')}.primary_entity`) || { results: [], show: false },
                            (value) => onChange([...basePath, 'primary_entity'], value),
                            (state) => onEntityPickerStateChange(`${basePath.join('.')}.primary_entity`, state),
                            { translations: { editor: t.editor } }
                        )}
                        ${renderTextfield(
                            t.editor.consumer_primary_text,
                            item.primary_text,
                            (value) => onChange([...basePath, 'primary_text'], value)
                        )}

                        ${renderSwitch(
                            t.editor.consumer_show_secondary,
                            item.show_secondary !== false,
                            (value) => onChange([...basePath, 'show_secondary'], value)
                        )}
                        ${renderEntityPicker(
                            t.editor.consumer_secondary_entity,
                            item.secondary_entity,
                            hass,
                            entityPickerStates.get(`${basePath.join('.')}.secondary_entity`) || { results: [], show: false },
                            (value) => onChange([...basePath, 'secondary_entity'], value),
                            (state) => onEntityPickerStateChange(`${basePath.join('.')}.secondary_entity`, state),
                            { translations: { editor: t.editor } }
                        )}
                        ${renderTextfield(
                            t.editor.consumer_secondary_text,
                            item.secondary_text,
                            (value) => onChange([...basePath, 'secondary_text'], value)
                        )}
                    </div>
                </div>

                <div class="consumer-subsection">
                    <div class="consumer-subsection-header" @click=${() => onToggleSubsection('actions')}>
                        <ha-icon icon="mdi:gesture-tap"></ha-icon>
                        ${t.editor.consumer_tap_actions}
                        <ha-icon
                            class="expand-icon ${expandedSubsections.has('actions') ? 'expanded' : ''}"
                            icon="mdi:chevron-down"
                            style="margin-left: auto;"
                        ></ha-icon>
                    </div>
                    <div class="consumer-subsection-content ${expandedSubsections.has('actions') ? '' : 'collapsed'}">
                        ${renderActionTargetSelector(
                            t.editor.tap_action_target,
                            item.tap_action_target,
                            (value) => onChange([...basePath, 'tap_action_target'], value),
                            { helper: t.editor.consumer_tap_actions, translations: t }
                        )}
                        ${item.tap_action_target === 'custom_entity' ? renderEntityPicker(
                            t.editor.custom_entity_toggle,
                            item.tap_action_custom_entity,
                            hass,
                            entityPickerStates.get(`${basePath.join('.')}.tap_action_custom_entity`) || { results: [], show: false },
                            (value) => onChange([...basePath, 'tap_action_custom_entity'], value),
                            (state) => onEntityPickerStateChange(`${basePath.join('.')}.tap_action_custom_entity`, state),
                            { 
                                helper: t.editor.custom_entity_toggle_helper,
                                translations: { editor: t.editor },
                                include_domains: ['switch', 'input_boolean', 'light', 'fan', 'cover']
                            }
                        ) : ''}
                        ${item.tap_action_target === 'custom_action' ? renderActionSelector(
                            'Tap Action',
                            item.tap_action,
                            (key, value) => onTapActionChange([...basePath, 'tap_action'], key, value),
                            { translations: t }
                        ) : ''}
                        
                        ${renderActionTargetSelector(
                            t.editor.double_tap_action_target,
                            item.double_tap_action_target,
                            (value) => onChange([...basePath, 'double_tap_action_target'], value),
                            { translations: t }
                        )}
                        ${item.double_tap_action_target === 'custom_entity' ? renderEntityPicker(
                            t.editor.custom_entity_toggle,
                            item.double_tap_action_custom_entity,
                            hass,
                            entityPickerStates.get(`${basePath.join('.')}.double_tap_action_custom_entity`) || { results: [], show: false },
                            (value) => onChange([...basePath, 'double_tap_action_custom_entity'], value),
                            (state) => onEntityPickerStateChange(`${basePath.join('.')}.double_tap_action_custom_entity`, state),
                            { 
                                helper: t.editor.custom_entity_toggle_helper,
                                translations: { editor: t.editor },
                                include_domains: ['switch', 'input_boolean', 'light', 'fan', 'cover']
                            }
                        ) : ''}
                        ${item.double_tap_action_target === 'custom_action' ? renderActionSelector(
                            'Double Tap',
                            item.double_tap_action,
                            (key, value) => onTapActionChange([...basePath, 'double_tap_action'], key, value),
                            { translations: t }
                        ) : ''}
                        
                        ${renderActionTargetSelector(
                            t.editor.hold_action_target,
                            item.hold_action_target,
                            (value) => onChange([...basePath, 'hold_action_target'], value),
                            { translations: t }
                        )}
                        ${item.hold_action_target === 'custom_entity' ? renderEntityPicker(
                            t.editor.custom_entity_toggle,
                            item.hold_action_custom_entity,
                            hass,
                            entityPickerStates.get(`${basePath.join('.')}.hold_action_custom_entity`) || { results: [], show: false },
                            (value) => onChange([...basePath, 'hold_action_custom_entity'], value),
                            (state) => onEntityPickerStateChange(`${basePath.join('.')}.hold_action_custom_entity`, state),
                            { 
                                helper: t.editor.custom_entity_toggle_helper,
                                translations: { editor: t.editor },
                                include_domains: ['switch', 'input_boolean', 'light', 'fan', 'cover']
                            }
                        ) : ''}
                        ${item.hold_action_target === 'custom_action' ? renderActionSelector(
                            'Hold Action',
                            item.hold_action,
                            (key, value) => onTapActionChange([...basePath, 'hold_action'], key, value),
                            { translations: t }
                        ) : ''}
                    </div>
                </div>

                <div class="consumer-subsection">
                    <div class="consumer-subsection-header" @click=${() => onToggleSubsection('styling')}>
                        <ha-icon icon="mdi:palette"></ha-icon>
                        ${t.editor.consumer_item_styling}
                        <ha-icon
                            class="expand-icon ${expandedSubsections.has('styling') ? 'expanded' : ''}"
                            icon="mdi:chevron-down"
                            style="margin-left: auto;"
                        ></ha-icon>
                    </div>
                    <div class="consumer-subsection-content ${expandedSubsections.has('styling') ? '' : 'collapsed'}">
                        ${renderTextfield(
                            t.editor.icon_size,
                            item.style?.icon_size,
                            (value) => onChange([...basePath, 'style', 'icon_size'], value),
                            { placeholder: '1.5em' }
                        )}
                        ${renderColorPicker(
                            t.editor.icon_color,
                            item.style?.icon_color,
                            (value) => onChange([...basePath, 'style', 'icon_color'], value)
                        )}
                        ${renderTextfield(
                            t.editor.icon_opacity,
                            item.style?.icon_opacity,
                            (value) => onChange([...basePath, 'style', 'icon_opacity'], value),
                            { placeholder: '1' }
                        )}
                        ${renderTextfield(
                            t.editor.primary_size,
                            item.style?.primary_size,
                            (value) => onChange([...basePath, 'style', 'primary_size'], value),
                            { placeholder: '1em' }
                        )}
                        ${renderColorPicker(
                            t.editor.primary_color_label,
                            item.style?.primary_color,
                            (value) => onChange([...basePath, 'style', 'primary_color'], value),
                            { placeholder: 'white' }
                        )}
                        ${renderTextfield(
                            t.editor.primary_opacity,
                            item.style?.primary_opacity,
                            (value) => onChange([...basePath, 'style', 'primary_opacity'], value),
                            { placeholder: '1' }
                        )}
                        ${renderTextfield(
                            t.editor.primary_font_weight,
                            item.style?.primary_font_weight,
                            (value) => onChange([...basePath, 'style', 'primary_font_weight'], value),
                            { placeholder: 'bold' }
                        )}
                        ${renderTextfield(
                            t.editor.secondary_size,
                            item.style?.secondary_size,
                            (value) => onChange([...basePath, 'style', 'secondary_size'], value),
                            { placeholder: '0.8em' }
                        )}
                        ${renderColorPicker(
                            t.editor.secondary_color_label,
                            item.style?.secondary_color,
                            (value) => onChange([...basePath, 'style', 'secondary_color'], value),
                            { placeholder: 'white' }
                        )}
                        ${renderTextfield(
                            t.editor.secondary_opacity,
                            item.style?.secondary_opacity,
                            (value) => onChange([...basePath, 'style', 'secondary_opacity'], value),
                            { placeholder: '0.7' }
                        )}
                        ${renderTextfield(
                            t.editor.secondary_font_weight,
                            item.style?.secondary_font_weight,
                            (value) => onChange([...basePath, 'style', 'secondary_font_weight'], value),
                            { placeholder: 'normal' }
                        )}
                        ${renderColorPicker(
                            t.editor.background_color,
                            item.style?.background_color,
                            (value) => onChange([...basePath, 'style', 'background_color'], value)
                        )}
                        ${renderColorPicker(
                            t.editor.border_color,
                            item.style?.border_color,
                            (value) => onChange([...basePath, 'style', 'border_color'], value)
                        )}
                        ${renderTextfield(
                            t.editor.border_radius,
                            item.style?.border_radius,
                            (value) => onChange([...basePath, 'style', 'border_radius'], value),
                            { placeholder: '12px' }
                        )}
                        ${renderTextfield(
                            t.editor.padding,
                            item.style?.padding,
                            (value) => onChange([...basePath, 'style', 'padding'], value),
                            { placeholder: '8px' }
                        )}
                    </div>
                </div>
            </div>
        </div>
    `;
}
