import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderColorPicker } from "../fields/color-picker";
import { renderTextfield } from "../fields/textfield";
import { renderSwitch } from "../fields/switch";

export function renderHeaderTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    onToggleSection: (id: string) => void,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    return html`
        ${renderCollapsibleSection(
            'header_visibility',
            'mdi:eye',
            t.editor.header_visibility || 'Visibility',
            html`
                ${renderSwitch(
                    t.editor.show_title,
                    config.show_title,
                    (value) => onChange(['show_title'], value)
                )}
                ${renderSwitch(
                    t.editor.show_subtitle,
                    config.show_subtitle,
                    (value) => onChange(['show_subtitle'], value)
                )}
                ${renderSwitch(
                    t.editor.show_icon,
                    config.show_icon,
                    (value) => onChange(['show_icon'], value)
                )}
            `,
            expandedSections.has('header_visibility'),
            () => onToggleSection('header_visibility')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'header_content',
            'mdi:text',
            t.editor.header_content || 'Content',
            html`
                ${renderTextfield(
                    t.editor.title,
                    config.title,
                    (value) => onChange(['title'], value),
                    { placeholder: t.editor.title_placeholder, helper: t.editor.title_helper }
                )}
                ${renderTextfield(
                    t.editor.subtitle,
                    config.subtitle,
                    (value) => onChange(['subtitle'], value),
                    { placeholder: t.editor.subtitle_placeholder, helper: t.editor.subtitle_helper }
                )}
                ${renderTextfield(
                    t.editor.icon,
                    config.icon,
                    (value) => onChange(['icon'], value),
                    { placeholder: t.editor.icon_placeholder, helper: t.editor.icon_helper }
                )}
            `,
            expandedSections.has('header_content'),
            () => onToggleSection('header_content')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'header_title_styling',
            'mdi:format-title',
            t.editor.header_title_styling || 'Title Styling',
            html`
                ${renderTextfield(
                    t.editor.title_size,
                    config.style?.title_size,
                    (value) => onChange(['style', 'title_size'], value),
                    { placeholder: '1.5em' }
                )}
                ${renderTextfield(
                    t.editor.title_line_height,
                    config.style?.title_line_height,
                    (value) => onChange(['style', 'title_line_height'], value),
                    { placeholder: '1.2' }
                )}
                ${renderColorPicker(
                    t.editor.title_color,
                    config.style?.title_color,
                    (value) => onChange(['style', 'title_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    t.editor.title_font_weight,
                    config.style?.title_font_weight,
                    (value) => onChange(['style', 'title_font_weight'], value),
                    { placeholder: 'bold' }
                )}
                ${renderTextfield(
                    t.editor.title_alignment,
                    config.style?.title_align,
                    (value) => onChange(['style', 'title_align'], value),
                    { placeholder: 'center', helper: t.editor.title_alignment_helper }
                )}
            `,
            expandedSections.has('header_title_styling'),
            () => onToggleSection('header_title_styling')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'header_subtitle_styling',
            'mdi:format-title',
            t.editor.header_subtitle_styling || 'Subtitle Styling',
            html`
                ${renderTextfield(
                    t.editor.subtitle_size,
                    config.style?.subtitle_size,
                    (value) => onChange(['style', 'subtitle_size'], value),
                    { placeholder: '1em' }
                )}
                ${renderTextfield(
                    t.editor.subtitle_line_height,
                    config.style?.subtitle_line_height,
                    (value) => onChange(['style', 'subtitle_line_height'], value),
                    { placeholder: '1.4' }
                )}
                ${renderColorPicker(
                    t.editor.subtitle_color,
                    config.style?.subtitle_color,
                    (value) => onChange(['style', 'subtitle_color'], value),
                    { placeholder: 'rgba(255,255,255,0.7)' }
                )}
                ${renderTextfield(
                    t.editor.subtitle_font_weight,
                    config.style?.subtitle_font_weight,
                    (value) => onChange(['style', 'subtitle_font_weight'], value),
                    { placeholder: 'normal' }
                )}
                ${renderTextfield(
                    t.editor.subtitle_alignment,
                    config.style?.subtitle_align,
                    (value) => onChange(['style', 'subtitle_align'], value),
                    { placeholder: 'center' }
                )}
                ${renderTextfield(
                    t.editor.title_subtitle_gap,
                    config.style?.title_subtitle_gap,
                    (value) => onChange(['style', 'title_subtitle_gap'], value),
                    { placeholder: '4px' }
                )}
            `,
            expandedSections.has('header_subtitle_styling'),
            () => onToggleSection('header_subtitle_styling')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'header_icon_styling',
            'mdi:image',
            t.editor.header_icon_styling || 'Icon Styling',
            html`
                ${renderTextfield(
                    t.editor.header_icon_size,
                    config.style?.header_icon_size,
                    (value) => onChange(['style', 'header_icon_size'], value),
                    { placeholder: '1.5em' }
                )}
                ${renderColorPicker(
                    t.editor.header_icon_color,
                    config.style?.header_icon_color,
                    (value) => onChange(['style', 'header_icon_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    t.editor.header_icon_margin,
                    config.style?.header_icon_margin,
                    (value) => onChange(['style', 'header_icon_margin'], value),
                    { placeholder: '8px' }
                )}
            `,
            expandedSections.has('header_icon_styling'),
            () => onToggleSection('header_icon_styling')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'header_background',
            'mdi:palette',
            t.editor.header_background_subsection || 'Header Background',
            html`
                ${renderSwitch(
                    t.editor.enable_header_background,
                    config.style?.header_background_enabled,
                    (value) => onChange(['style', 'header_background_enabled'], value)
                )}

                ${config.style?.header_background_enabled ? html`
                    <div class="option">
                        <div class="option-label">${t.editor.header_width}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.style?.header_width || 'auto'}
                                .items=${[
                                    { value: 'auto', label: t.editor.header_width_auto },
                                    { value: 'full', label: t.editor.header_width_full }
                                ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev: any) => {
                                    const newValue = ev.detail?.value;
                                    if (newValue) onChange(['style', 'header_width'], newValue);
                                }}
                            ></ha-combo-box>
                        </div>
                    </div>

                    ${renderColorPicker(
                        t.editor.header_background_color,
                        config.style?.header_background_color,
                        (value) => onChange(['style', 'header_background_color'], value),
                        { placeholder: 'rgba(21, 20, 27, 1)' }
                    )}
                    ${renderColorPicker(
                        t.editor.header_border_color,
                        config.style?.header_border_color,
                        (value) => onChange(['style', 'header_border_color'], value),
                        { placeholder: 'rgba(255, 255, 255, 0.1)' }
                    )}
                    ${renderTextfield(
                        t.editor.header_border_radius,
                        config.style?.header_border_radius,
                        (value) => onChange(['style', 'header_border_radius'], value),
                        { placeholder: '16px' }
                    )}
                    ${renderTextfield(
                        t.editor.header_padding,
                        config.style?.header_padding,
                        (value) => onChange(['style', 'header_padding'], value),
                        { placeholder: '12px' }
                    )}
                    ${renderTextfield(
                        t.editor.header_box_shadow,
                        config.style?.header_box_shadow,
                        (value) => onChange(['style', 'header_box_shadow'], value),
                        { placeholder: '0 2px 8px 0 rgba(0, 0, 0, 0.15)' }
                    )}
                ` : ''}
            `,
            expandedSections.has('header_background'),
            () => onToggleSection('header_background')
        )}
    `;
}
