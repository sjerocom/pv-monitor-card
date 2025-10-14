import { html } from "lit";
import { PVMonitorCardConfig } from "../../../pv-monitor-card-types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderSwitch } from "../fields/switch";
import { renderNumberfield } from "../fields/numberfield";
import { renderTextfield } from "../fields/textfield";
import { renderColorPicker } from "../fields/color-picker";
import { EntityPickerState } from "../fields/entity-picker";
import { renderConsumerItem } from "../sections/consumer-item";

export function renderConsumersTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    expandedConsumerIndex: number | null,
    expandedConsumerSubsections: Map<string, Set<string>>,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onToggleConsumer: (index: number) => void,
    onToggleConsumerSubsection: (index: number, subsectionId: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    onAddConsumer: () => void,
    onDuplicateConsumer: (index: number) => void,
    onMoveConsumerUp: (index: number) => void,
    onMoveConsumerDown: (index: number) => void,
    onRemoveConsumer: (index: number) => void,
    t: any
) {
    return html`
        ${renderCollapsibleSection(
            'consumers_main',
            'mdi:flash',
            t.editor.consumers_settings,
            html`
                ${renderSwitch(
                    t.editor.enable_consumers,
                    config.consumers?.show,
                    (value) => onChange(['consumers', 'show'], value)
                )}

                ${config.consumers?.show ? html`
                    <div class="option">
                        <div class="option-label">${t.editor.consumers_position}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.consumers?.position || 'bottom'}
                                .items=${[
                                    { value: 'bottom', label: t.editor.position_bottom }
                                ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev: any) => {
                                    const newValue = ev.detail?.value;
                                    if (newValue) onChange(['consumers', 'position'], newValue);
                                }}
                            ></ha-combo-box>
                        </div>
                    </div>

                    <div class="option">
                        <div class="option-label">${t.editor.consumers_sort_mode}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.consumers?.sort_mode || 'highest_first'}
                                .items=${[
                                    { value: 'highest_first', label: t.editor.sort_highest_first },
                                    { value: 'lowest_first', label: t.editor.sort_lowest_first },
                                    { value: 'none', label: t.editor.sort_none },
                                    { value: 'alpha_asc', label: t.editor.sort_alpha_asc },
                                    { value: 'alpha_desc', label: t.editor.sort_alpha_desc }
                                ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev: any) => {
                                    const newValue = ev.detail?.value;
                                    if (newValue) onChange(['consumers', 'sort_mode'], newValue);
                                }}
                            ></ha-combo-box>
                        </div>
                    </div>

                    ${renderNumberfield(
                        t.editor.consumers_threshold,
                        config.consumers?.threshold,
                        (value) => onChange(['consumers', 'threshold'], value),
                        { min: 0, max: 10000, step: 1, helper: t.editor.consumers_threshold_helper }
                    )}
                ` : ''}
            `,
            expandedSections.has('consumers_main'),
            () => onToggleSection('consumers_main')
        )}

        ${config.consumers?.show ? html`
            <div class="divider"></div>

            ${renderCollapsibleSection(
                'consumers_items',
                'mdi:format-list-bulleted',
                t.editor.add_consumer,
                html`
                    ${(config.consumers?.items || []).map((item, index) => {
                        const isExpanded = expandedConsumerIndex === index;
                        const consumerKey = `consumer-${index}`;
                        const expandedSubsections = expandedConsumerSubsections.get(consumerKey) || new Set<string>();

                        return renderConsumerItem(
                            item,
                            index,
                            isExpanded,
                            expandedSubsections,
                            hass,
                            entityPickerStates,
                            () => onToggleConsumer(index),
                            (subsectionId) => onToggleConsumerSubsection(index, subsectionId),
                            onEntityPickerStateChange,
                            onChange,
                            onTapActionChange,
                            () => onMoveConsumerUp(index),
                            () => onMoveConsumerDown(index),
                            () => onDuplicateConsumer(index),
                            () => onRemoveConsumer(index),
                            index === 0,
                            index === (config.consumers?.items?.length || 0) - 1,
                            t
                        );
                    })}

                    <ha-button @click=${onAddConsumer}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t.editor.add_consumer}
                    </ha-button>
                `,
                expandedSections.has('consumers_items'),
                () => onToggleSection('consumers_items')
            )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
                'consumers_styling',
                'mdi:palette',
                `${t.editor.styling} (Global)`,
                html`
                    ${renderTextfield(
                        t.editor.grid_gap,
                        config.consumers?.style?.gap,
                        (value) => onChange(['consumers', 'style', 'gap'], value),
                        { placeholder: '6px' }
                    )}
                    ${renderColorPicker(
                        t.editor.background_color,
                        config.consumers?.style?.item_background_color,
                        (value) => onChange(['consumers', 'style', 'item_background_color'], value),
                        { placeholder: 'rgba(21, 20, 27, 1)' }
                    )}
                    ${renderColorPicker(
                        t.editor.border_color,
                        config.consumers?.style?.item_border_color,
                        (value) => onChange(['consumers', 'style', 'item_border_color'], value),
                        { placeholder: 'rgba(255, 255, 255, 0.1)' }
                    )}
                    ${renderTextfield(
                        t.editor.border_radius,
                        config.consumers?.style?.item_border_radius,
                        (value) => onChange(['consumers', 'style', 'item_border_radius'], value),
                        { placeholder: '12px' }
                    )}
                    ${renderTextfield(
                        t.editor.padding,
                        config.consumers?.style?.item_padding,
                        (value) => onChange(['consumers', 'style', 'item_padding'], value),
                        { placeholder: '8px' }
                    )}
                    ${renderTextfield(
                        t.editor.icon_size,
                        config.consumers?.style?.icon_size,
                        (value) => onChange(['consumers', 'style', 'icon_size'], value),
                        { placeholder: '1.5em' }
                    )}
                    ${renderTextfield(
                        t.editor.icon_opacity,
                        config.consumers?.style?.icon_opacity,
                        (value) => onChange(['consumers', 'style', 'icon_opacity'], value),
                        { placeholder: '1' }
                    )}
                    ${renderTextfield(
                        t.editor.primary_size,
                        config.consumers?.style?.primary_size,
                        (value) => onChange(['consumers', 'style', 'primary_size'], value),
                        { placeholder: '1em' }
                    )}
                    ${renderTextfield(
                        t.editor.primary_font_weight,
                        config.consumers?.style?.primary_font_weight,
                        (value) => onChange(['consumers', 'style', 'primary_font_weight'], value),
                        { placeholder: 'bold' }
                    )}
                    ${renderTextfield(
                        t.editor.primary_opacity,
                        config.consumers?.style?.primary_opacity,
                        (value) => onChange(['consumers', 'style', 'primary_opacity'], value),
                        { placeholder: '1' }
                    )}
                    ${renderTextfield(
                        t.editor.secondary_size,
                        config.consumers?.style?.secondary_size,
                        (value) => onChange(['consumers', 'style', 'secondary_size'], value),
                        { placeholder: '0.8em' }
                    )}
                    ${renderTextfield(
                        t.editor.secondary_font_weight,
                        config.consumers?.style?.secondary_font_weight,
                        (value) => onChange(['consumers', 'style', 'secondary_font_weight'], value),
                        { placeholder: 'normal' }
                    )}
                    ${renderTextfield(
                        t.editor.secondary_opacity,
                        config.consumers?.style?.secondary_opacity,
                        (value) => onChange(['consumers', 'style', 'secondary_opacity'], value),
                        { placeholder: '0.7' }
                    )}
                `,
                expandedSections.has('consumers_styling'),
                () => onToggleSection('consumers_styling')
            )}
        ` : ''}
    `;
}
