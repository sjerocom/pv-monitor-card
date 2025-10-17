import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderSwitch } from "../fields/switch";
import { renderTextfield } from "../fields/textfield";
import { renderColorPicker } from "../fields/color-picker";
import { EntityPickerState } from "../fields/entity-picker";

export function renderPVBarTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    const pvBar = config.pv_bar || { show: false, entities: [] };

    return html`
        ${renderCollapsibleSection(
                'pv_bar_settings',
                'mdi:chart-bar',
                t.editor.pv_bar_settings,
                html`
                    ${renderSwitch(
                            t.editor.enable_pv_bar,
                            pvBar.show,
                            (value) => onChange(['pv_bar', 'show'], value)
                    )}
                `,
                expandedSections.has('pv_bar_settings'),
                () => onToggleSection('pv_bar_settings')
        )}

        ${pvBar.show ? html`
            <div class="divider"></div>

            ${renderCollapsibleSection(
                    'pv_bar_styling',
                    'mdi:palette',
                    t.editor.bar_styling,
                    html`
                        ${renderColorPicker(
                                t.editor.background_color,
                                pvBar.style?.background_color,
                                (value) => onChange(['pv_bar', 'style', 'background_color'], value)
                        )}
                        ${renderColorPicker(
                                t.editor.border_color,
                                pvBar.style?.border_color,
                                (value) => onChange(['pv_bar', 'style', 'border_color'], value)
                        )}
                        ${renderTextfield(
                                t.editor.border_radius,
                                pvBar.style?.border_radius,
                                (value) => onChange(['pv_bar', 'style', 'border_radius'], value),
                                { placeholder: '16px' }
                        )}
                        ${renderTextfield(
                                t.editor.padding,
                                pvBar.style?.padding,
                                (value) => onChange(['pv_bar', 'style', 'padding'], value),
                                { placeholder: '12px' }
                        )}
                        ${renderTextfield(
                                t.editor.bar_separator,
                                pvBar.style?.separator,
                                (value) => onChange(['pv_bar', 'style', 'separator'], value),
                                { placeholder: '|', helper: t.editor.bar_separator_helper }
                        )}
                        ${renderTextfield(
                                t.editor.bar_item_gap,
                                pvBar.style?.item_gap,
                                (value) => onChange(['pv_bar', 'style', 'item_gap'], value),
                                { placeholder: '0.5rem', helper: t.editor.bar_item_gap_helper }
                        )}
                        ${renderTextfield(
                                t.editor.icon_size,
                                pvBar.style?.icon_size,
                                (value) => onChange(['pv_bar', 'style', 'icon_size'], value),
                                { placeholder: '1.5em' }
                        )}
                        ${renderColorPicker(
                                t.editor.icon_color,
                                pvBar.style?.icon_color,
                                (value) => onChange(['pv_bar', 'style', 'icon_color'], value)
                        )}
                        ${renderTextfield(
                                'Label Size',
                                pvBar.style?.label_size,
                                (value) => onChange(['pv_bar', 'style', 'label_size'], value),
                                { placeholder: '0.9em' }
                        )}
                        ${renderTextfield(
                                t.editor.label_line_height,
                                pvBar.style?.label_line_height,
                                (value) => onChange(['pv_bar', 'style', 'label_line_height'], value),
                                { placeholder: '1.4' }
                        )}
                        ${renderColorPicker(
                                'Label Color',
                                pvBar.style?.label_color,
                                (value) => onChange(['pv_bar', 'style', 'label_color'], value)
                        )}
                        ${renderTextfield(
                                'Label Font Weight',
                                pvBar.style?.label_font_weight,
                                (value) => onChange(['pv_bar', 'style', 'label_font_weight'], value),
                                { placeholder: 'normal' }
                        )}
                        ${renderTextfield(
                                'Value Size',
                                pvBar.style?.value_size,
                                (value) => onChange(['pv_bar', 'style', 'value_size'], value),
                                { placeholder: '1em' }
                        )}
                        ${renderTextfield(
                                t.editor.value_line_height,
                                pvBar.style?.value_line_height,
                                (value) => onChange(['pv_bar', 'style', 'value_line_height'], value),
                                { placeholder: '1.4' }
                        )}
                        ${renderColorPicker(
                                'Value Color',
                                pvBar.style?.value_color,
                                (value) => onChange(['pv_bar', 'style', 'value_color'], value)
                        )}
                        ${renderTextfield(
                                'Value Font Weight',
                                pvBar.style?.value_font_weight,
                                (value) => onChange(['pv_bar', 'style', 'value_font_weight'], value),
                                { placeholder: 'bold' }
                        )}
                    `,
                    expandedSections.has('pv_bar_styling'),
                    () => onToggleSection('pv_bar_styling')
            )}
        ` : ''}
    `;
}
