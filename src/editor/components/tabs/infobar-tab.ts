import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderSwitch } from "../fields/switch";
import { renderEntityPicker, EntityPickerState } from "../fields/entity-picker";
import { renderIconPicker } from "../fields/icon-picker";
import { renderTextfield } from "../fields/textfield";
import { renderColorPicker } from "../fields/color-picker";
import { renderActionSelector } from "../fields/action-selector";

export function renderInfoBarTab(
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
    const renderTapActions = (cardType: string) => {
        const actionConfig = config.info_bar;
        
        return renderCollapsibleSection(
            `${cardType}_tap_actions`,
            'mdi:gesture-tap',
            'Tap Actions',
            html`
                ${renderActionSelector(
                    'Tap Action',
                    actionConfig?.tap_action,
                    (key, value) => onTapActionChange([cardType, 'tap_action'], key, value),
                    { translations: t }
                )}
                ${renderActionSelector(
                    'Double Tap',
                    actionConfig?.double_tap_action,
                    (key, value) => onTapActionChange([cardType, 'double_tap_action'], key, value),
                    { translations: t }
                )}
                ${renderActionSelector(
                    'Hold Action',
                    actionConfig?.hold_action,
                    (key, value) => onTapActionChange([cardType, 'hold_action'], key, value),
                    { translations: t }
                )}
            `,
            expandedSections.has(`${cardType}_tap_actions`),
            () => onToggleSection(`${cardType}_tap_actions`)
        );
    };

    return html`
        ${renderCollapsibleSection(
            'infobar_main',
            'mdi:information',
            t.editor.infobar_settings,
            html`
                ${renderSwitch(
                    t.editor.enable_infobar,
                    config.info_bar?.show,
                    (value) => onChange(['info_bar', 'show'], value)
                )}
            `,
            expandedSections.has('infobar_main'),
            () => onToggleSection('infobar_main')
        )}

        ${config.info_bar?.show ? html`
            <div class="divider"></div>

            ${renderTapActions('info_bar')}

            <div class="divider"></div>

            ${renderCollapsibleSection(
                'infobar_item1',
                'mdi:numeric-1-box',
                `${t.editor.item} 1`,
                html`
                    <div class="option">
                        <div class="option-label">${t.editor.item_calc_type}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.info_bar?.item1_calc_type || config.info_bar?.calculation_mode || 'autarky'}
                                .items=${[
                                    { value: 'entity', label: t.editor.calc_type_entity },
                                    { value: 'autarky', label: t.editor.calc_type_autarky },
                                    { value: 'self_consumption', label: t.editor.calc_type_self_consumption },
                                    { value: 'runtime', label: t.editor.calc_type_runtime },
                                    { value: 'chargetime', label: t.editor.calc_type_chargetime }
                                ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev: any) => {
                                    const newValue = ev.detail?.value;
                                    if (newValue) onChange(['info_bar', 'item1_calc_type'], newValue);
                                }}
                            ></ha-combo-box>
                        </div>
                    </div>
                    ${renderEntityPicker(
                        t.editor.entity,
                        config.info_bar?.item1?.entity,
                        hass,
                        entityPickerStates.get('info_bar.item1.entity') || { results: [], show: false },
                        (value) => onChange(['info_bar', 'item1', 'entity'], value),
                        (state) => onEntityPickerStateChange('info_bar.item1.entity', state),
                        { translations: { editor: t.editor } }
                    )}
                    ${renderIconPicker(
                        t.editor.icon_label,
                        config.info_bar?.item1?.icon,
                        hass,
                        (value) => onChange(['info_bar', 'item1', 'icon'], value),
                        { translations: { editor: t.editor } }
                    )}
                    ${renderTextfield(
                        t.editor.label,
                        config.info_bar?.item1?.label,
                        (value) => onChange(['info_bar', 'item1', 'label'], value),
                        { placeholder: t.editor.default_autarky }
                    )}
                    ${renderTextfield(
                        t.editor.unit,
                        config.info_bar?.item1?.unit,
                        (value) => onChange(['info_bar', 'item1', 'unit'], value),
                        { placeholder: '%' }
                    )}
                `,
                expandedSections.has('infobar_item1'),
                () => onToggleSection('infobar_item1')
            )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
                'infobar_item2',
                'mdi:numeric-2-box',
                `${t.editor.item} 2`,
                html`
                    <div class="option">
                        <div class="option-label">${t.editor.item_calc_type}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.info_bar?.item2_calc_type || 'runtime'}
                                .items=${[
                                    { value: 'entity', label: t.editor.calc_type_entity },
                                    { value: 'autarky', label: t.editor.calc_type_autarky },
                                    { value: 'self_consumption', label: t.editor.calc_type_self_consumption },
                                    { value: 'runtime', label: t.editor.calc_type_runtime },
                                    { value: 'chargetime', label: t.editor.calc_type_chargetime }
                                ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev: any) => {
                                    const newValue = ev.detail?.value;
                                    if (newValue) onChange(['info_bar', 'item2_calc_type'], newValue);
                                }}
                            ></ha-combo-box>
                        </div>
                    </div>
                    ${renderEntityPicker(
                        t.editor.entity,
                        config.info_bar?.item2?.entity,
                        hass,
                        entityPickerStates.get('info_bar.item2.entity') || { results: [], show: false },
                        (value) => onChange(['info_bar', 'item2', 'entity'], value),
                        (state) => onEntityPickerStateChange('info_bar.item2.entity', state),
                        { translations: { editor: t.editor } }
                    )}
                    ${renderIconPicker(
                        t.editor.icon_label,
                        config.info_bar?.item2?.icon,
                        hass,
                        (value) => onChange(['info_bar', 'item2', 'icon'], value),
                        { translations: { editor: t.editor } }
                    )}
                    ${renderTextfield(
                        t.editor.label,
                        config.info_bar?.item2?.label,
                        (value) => onChange(['info_bar', 'item2', 'label'], value),
                        { placeholder: t.editor.default_runtime }
                    )}
                    ${renderTextfield(
                        t.editor.unit,
                        config.info_bar?.item2?.unit,
                        (value) => onChange(['info_bar', 'item2', 'unit'], value)
                    )}
                `,
                expandedSections.has('infobar_item2'),
                () => onToggleSection('infobar_item2')
            )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
                'infobar_item3',
                'mdi:numeric-3-box',
                `${t.editor.item} 3`,
                html`
                    <div class="option">
                        <div class="option-label">${t.editor.item_calc_type}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.info_bar?.item3_calc_type || 'chargetime'}
                                .items=${[
                                    { value: 'entity', label: t.editor.calc_type_entity },
                                    { value: 'autarky', label: t.editor.calc_type_autarky },
                                    { value: 'self_consumption', label: t.editor.calc_type_self_consumption },
                                    { value: 'runtime', label: t.editor.calc_type_runtime },
                                    { value: 'chargetime', label: t.editor.calc_type_chargetime }
                                ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev: any) => {
                                    const newValue = ev.detail?.value;
                                    if (newValue) onChange(['info_bar', 'item3_calc_type'], newValue);
                                }}
                            ></ha-combo-box>
                        </div>
                    </div>
                    ${renderEntityPicker(
                        t.editor.entity,
                        config.info_bar?.item3?.entity,
                        hass,
                        entityPickerStates.get('info_bar.item3.entity') || { results: [], show: false },
                        (value) => onChange(['info_bar', 'item3', 'entity'], value),
                        (state) => onEntityPickerStateChange('info_bar.item3.entity', state),
                        { translations: { editor: t.editor } }
                    )}
                    ${renderIconPicker(
                        t.editor.icon_label,
                        config.info_bar?.item3?.icon,
                        hass,
                        (value) => onChange(['info_bar', 'item3', 'icon'], value),
                        { translations: { editor: t.editor } }
                    )}
                    ${renderTextfield(
                        t.editor.label,
                        config.info_bar?.item3?.label,
                        (value) => onChange(['info_bar', 'item3', 'label'], value),
                        { placeholder: t.editor.default_chargetime }
                    )}
                    ${renderTextfield(
                        t.editor.unit,
                        config.info_bar?.item3?.unit,
                        (value) => onChange(['info_bar', 'item3', 'unit'], value)
                    )}
                `,
                expandedSections.has('infobar_item3'),
                () => onToggleSection('infobar_item3')
            )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
                'infobar_styling',
                'mdi:palette',
                'Info Bar Styling',
                html`
                    ${renderColorPicker(
                        t.editor.background_color,
                        config.info_bar?.style?.background_color,
                        (value) => onChange(['info_bar', 'style', 'background_color'], value)
                    )}
                    ${renderColorPicker(
                        t.editor.border_color,
                        config.info_bar?.style?.border_color,
                        (value) => onChange(['info_bar', 'style', 'border_color'], value)
                    )}
                    ${renderTextfield(
                        t.editor.border_radius,
                        config.info_bar?.style?.border_radius,
                        (value) => onChange(['info_bar', 'style', 'border_radius'], value),
                        { placeholder: '16px' }
                    )}
                    ${renderTextfield(
                        t.editor.padding,
                        config.info_bar?.style?.padding,
                        (value) => onChange(['info_bar', 'style', 'padding'], value),
                        { placeholder: '12px' }
                    )}
                    ${renderTextfield(
                        'Gap',
                        config.info_bar?.style?.gap,
                        (value) => onChange(['info_bar', 'style', 'gap'], value),
                        { placeholder: '8px' }
                    )}
                    ${renderTextfield(
                        'Icon Size',
                        config.info_bar?.style?.icon_size,
                        (value) => onChange(['info_bar', 'style', 'icon_size'], value),
                        { placeholder: '1.5em' }
                    )}
                    ${renderColorPicker(
                        'Icon Color',
                        config.info_bar?.style?.icon_color,
                        (value) => onChange(['info_bar', 'style', 'icon_color'], value)
                    )}
                    ${renderTextfield(
                        'Label Size',
                        config.info_bar?.style?.label_size,
                        (value) => onChange(['info_bar', 'style', 'label_size'], value),
                        { placeholder: '0.8em' }
                    )}
                    ${renderTextfield(
                        t.editor.label_line_height,
                        config.info_bar?.style?.label_line_height,
                        (value) => onChange(['info_bar', 'style', 'label_line_height'], value),
                        { placeholder: '1.2' }
                    )}
                    ${renderColorPicker(
                        'Label Color',
                        config.info_bar?.style?.label_color,
                        (value) => onChange(['info_bar', 'style', 'label_color'], value)
                    )}
                    ${renderTextfield(
                        'Label Font Weight',
                        config.info_bar?.style?.label_font_weight,
                        (value) => onChange(['info_bar', 'style', 'label_font_weight'], value),
                        { placeholder: 'normal' }
                    )}
                    ${renderTextfield(
                        'Value Size',
                        config.info_bar?.style?.value_size,
                        (value) => onChange(['info_bar', 'style', 'value_size'], value),
                        { placeholder: '1em' }
                    )}
                    ${renderTextfield(
                        t.editor.value_line_height,
                        config.info_bar?.style?.value_line_height,
                        (value) => onChange(['info_bar', 'style', 'value_line_height'], value),
                        { placeholder: '1.4' }
                    )}
                    ${renderColorPicker(
                        'Value Color',
                        config.info_bar?.style?.value_color,
                        (value) => onChange(['info_bar', 'style', 'value_color'], value)
                    )}
                    ${renderTextfield(
                        'Value Font Weight',
                        config.info_bar?.style?.value_font_weight,
                        (value) => onChange(['info_bar', 'style', 'value_font_weight'], value),
                        { placeholder: 'bold' }
                    )}
                `,
                expandedSections.has('infobar_styling'),
                () => onToggleSection('infobar_styling')
            )}
        ` : ''}
    `;
}
