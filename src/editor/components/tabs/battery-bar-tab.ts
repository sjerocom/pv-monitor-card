import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderSwitch } from "../fields/switch";
import { renderTextfield } from "../fields/textfield";
import { renderColorPicker } from "../fields/color-picker";
import { EntityPickerState } from "../fields/entity-picker";

export function renderBatteryBarTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    expandedBatteryBarIndex: number | null,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onToggleBatteryBarItem: (index: number) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onAddBatteryBarItem: () => void,
    onDuplicateBatteryBarItem: (index: number) => void,
    onMoveBatteryBarItemUp: (index: number) => void,
    onMoveBatteryBarItemDown: (index: number) => void,
    onRemoveBatteryBarItem: (index: number) => void,
    t: any
) {
    const batteryBar = config.battery_bar || { show: false, entities: [] };

    return html`
        ${renderCollapsibleSection(
            'battery_bar_settings',
            'mdi:battery-charging',
            t.editor.battery_bar_settings,
            html`
                ${renderSwitch(
                    t.editor.enable_battery_bar,
                    batteryBar.show,
                    (value) => onChange(['battery_bar', 'show'], value)
                )}
            `,
            expandedSections.has('battery_bar_settings'),
            () => onToggleSection('battery_bar_settings')
        )}

        ${batteryBar.show ? html`
            <div class="divider"></div>

            ${renderCollapsibleSection(
                'battery_bar_styling',
                'mdi:palette',
                t.editor.bar_styling,
                html`
                    ${renderColorPicker(
                        t.editor.background_color,
                        batteryBar.style?.background_color,
                        (value) => onChange(['battery_bar', 'style', 'background_color'], value)
                    )}
                    ${renderColorPicker(
                        t.editor.border_color,
                        batteryBar.style?.border_color,
                        (value) => onChange(['battery_bar', 'style', 'border_color'], value)
                    )}
                    ${renderTextfield(
                        t.editor.border_radius,
                        batteryBar.style?.border_radius,
                        (value) => onChange(['battery_bar', 'style', 'border_radius'], value),
                        { placeholder: '16px' }
                    )}
                    ${renderTextfield(
                        t.editor.padding,
                        batteryBar.style?.padding,
                        (value) => onChange(['battery_bar', 'style', 'padding'], value),
                        { placeholder: '12px' }
                    )}
                    ${renderTextfield(
                        t.editor.bar_separator,
                        batteryBar.style?.separator,
                        (value) => onChange(['battery_bar', 'style', 'separator'], value),
                        { placeholder: '|', helper: t.editor.bar_separator_helper }
                    )}
                    ${renderTextfield(
                        t.editor.bar_item_gap,
                        batteryBar.style?.item_gap,
                        (value) => onChange(['battery_bar', 'style', 'item_gap'], value),
                        { placeholder: '0.5rem', helper: t.editor.bar_item_gap_helper }
                    )}
                    ${renderTextfield(
                        t.editor.icon_size,
                        batteryBar.style?.icon_size,
                        (value) => onChange(['battery_bar', 'style', 'icon_size'], value),
                        { placeholder: '1.5em' }
                    )}
                    ${renderColorPicker(
                        t.editor.icon_color,
                        batteryBar.style?.icon_color,
                        (value) => onChange(['battery_bar', 'style', 'icon_color'], value)
                    )}
                    ${renderTextfield(
                        'Label Size',
                        batteryBar.style?.label_size,
                        (value) => onChange(['battery_bar', 'style', 'label_size'], value),
                        { placeholder: '0.9em' }
                    )}
                    ${renderTextfield(
                        t.editor.label_line_height,
                        batteryBar.style?.label_line_height,
                        (value) => onChange(['battery_bar', 'style', 'label_line_height'], value),
                        { placeholder: '1.4' }
                    )}
                    ${renderColorPicker(
                        'Label Color',
                        batteryBar.style?.label_color,
                        (value) => onChange(['battery_bar', 'style', 'label_color'], value)
                    )}
                    ${renderTextfield(
                        'Label Font Weight',
                        batteryBar.style?.label_font_weight,
                        (value) => onChange(['battery_bar', 'style', 'label_font_weight'], value),
                        { placeholder: 'normal' }
                    )}
                    ${renderTextfield(
                        'Value Size',
                        batteryBar.style?.value_size,
                        (value) => onChange(['battery_bar', 'style', 'value_size'], value),
                        { placeholder: '1em' }
                    )}
                    ${renderTextfield(
                        t.editor.value_line_height,
                        batteryBar.style?.value_line_height,
                        (value) => onChange(['battery_bar', 'style', 'value_line_height'], value),
                        { placeholder: '1.4' }
                    )}
                    ${renderColorPicker(
                        'Value Color',
                        batteryBar.style?.value_color,
                        (value) => onChange(['battery_bar', 'style', 'value_color'], value)
                    )}
                    ${renderTextfield(
                        'Value Font Weight',
                        batteryBar.style?.value_font_weight,
                        (value) => onChange(['battery_bar', 'style', 'value_font_weight'], value),
                        { placeholder: 'bold' }
                    )}
                `,
                expandedSections.has('battery_bar_styling'),
                () => onToggleSection('battery_bar_styling')
            )}
        ` : ''}
    `;
}
