import { html } from "lit";
import { PVMonitorCardConfig } from "../../../pv-monitor-card-types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderThemeSelector } from "../fields/theme-selector";
import { renderColorPicker } from "../fields/color-picker";
import { renderTextfield } from "../fields/textfield";
import { renderSwitch } from "../fields/switch";

export function renderStylingTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    onToggleSection: (id: string) => void,
    onChange: (path: string[], value: any) => void,
    onConfigChange: (config: PVMonitorCardConfig) => void,
    t: any
) {
    return html`
        ${renderCollapsibleSection(
            'styling_theme',
            'mdi:palette',
            t.editor.theme,
            html`
                ${renderThemeSelector(
                    config.theme,
                    config,
                    (newConfig) => onConfigChange(newConfig),
                    { translations: t }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div style="font-weight: 500; margin-bottom: 8px;">${t.editor.theme_editor_cards}</div>
                <div class="info-text" style="margin-bottom: 12px;">${t.editor.theme_editor_cards_note}</div>

                ${renderColorPicker(
                    t.editor.background_color,
                    config.style?.card_background_color,
                    (value) => onChange(['style', 'card_background_color'], value),
                    { placeholder: 'rgba(21, 20, 27, 1)' }
                )}
                ${renderColorPicker(
                    t.editor.border_color,
                    config.style?.card_border_color,
                    (value) => onChange(['style', 'card_border_color'], value),
                    { placeholder: 'rgba(255, 255, 255, 0.1)' }
                )}
                ${renderColorPicker(
                    t.editor.text_color,
                    config.style?.card_text_color,
                    (value) => onChange(['style', 'card_text_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    t.editor.border_radius,
                    config.style?.card_border_radius,
                    (value) => onChange(['style', 'card_border_radius'], value),
                    { placeholder: '16px' }
                )}
                ${renderTextfield(
                    t.editor.padding,
                    config.style?.card_padding,
                    (value) => onChange(['style', 'card_padding'], value),
                    { placeholder: '12px' }
                )}
            `,
            expandedSections.has('styling_theme'),
            () => onToggleSection('styling_theme')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'styling_titelbereich',
            'mdi:format-title',
            t.editor.header_section,
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

                <div class="divider" style="margin: 16px 0;"></div>

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

                <div class="divider" style="margin: 16px 0;"></div>

                ${renderTextfield(
                    t.editor.title_subtitle_gap,
                    config.style?.title_subtitle_gap,
                    (value) => onChange(['style', 'title_subtitle_gap'], value),
                    { placeholder: '4px' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

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

                <div class="divider" style="margin: 16px 0;"></div>

                <div class="subsection">
                    <div style="font-weight: 500; margin-bottom: 12px;">${t.editor.header_background_subsection}</div>
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
                </div>
            `,
            expandedSections.has('styling_titelbereich'),
            () => onToggleSection('styling_titelbereich')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'styling_karten',
            'mdi:card-multiple',
            t.editor.card_styling_section,
            html`
                <div style="font-weight: 500; margin-bottom: 8px;">${t.editor.icon_subsection}</div>
                ${renderTextfield(
                    t.editor.icon_size,
                    config.style?.icon_size,
                    (value) => onChange(['style', 'icon_size'], value),
                    { placeholder: '2em' }
                )}
                ${renderTextfield(
                    t.editor.icon_opacity,
                    config.style?.icon_opacity,
                    (value) => onChange(['style', 'icon_opacity'], value),
                    { placeholder: '1' }
                )}
                ${renderTextfield(
                    t.editor.icon_margin,
                    config.style?.icon_margin,
                    (value) => onChange(['style', 'icon_margin'], value),
                    { placeholder: '6px' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div style="font-weight: 500; margin-bottom: 8px;">${t.editor.primary_text_subsection}</div>
                ${renderTextfield(
                    t.editor.primary_size,
                    config.style?.primary_size,
                    (value) => onChange(['style', 'primary_size'], value),
                    { placeholder: '1.2em' }
                )}
                ${renderTextfield(
                    t.editor.primary_line_height,
                    config.style?.primary_line_height,
                    (value) => onChange(['style', 'primary_line_height'], value),
                    { placeholder: '1.2' }
                )}
                ${renderColorPicker(
                    t.editor.primary_color_label,
                    config.style?.primary_color,
                    (value) => onChange(['style', 'primary_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    t.editor.primary_opacity,
                    config.style?.primary_font_opacity,
                    (value) => onChange(['style', 'primary_font_opacity'], value),
                    { placeholder: '1' }
                )}
                ${renderTextfield(
                    t.editor.primary_font_weight,
                    config.style?.primary_font_weight,
                    (value) => onChange(['style', 'primary_font_weight'], value),
                    { placeholder: 'normal' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div style="font-weight: 500; margin-bottom: 8px;">${t.editor.secondary_text_subsection}</div>
                ${renderTextfield(
                    t.editor.secondary_size,
                    config.style?.secondary_size,
                    (value) => onChange(['style', 'secondary_size'], value),
                    { placeholder: '0.9em' }
                )}
                ${renderTextfield(
                    t.editor.secondary_line_height,
                    config.style?.secondary_line_height,
                    (value) => onChange(['style', 'secondary_line_height'], value),
                    { placeholder: '1.4' }
                )}
                ${renderColorPicker(
                    t.editor.secondary_color_label,
                    config.style?.secondary_color,
                    (value) => onChange(['style', 'secondary_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    t.editor.secondary_opacity,
                    config.style?.secondary_font_opacity,
                    (value) => onChange(['style', 'secondary_font_opacity'], value),
                    { placeholder: '0.7' }
                )}
                ${renderTextfield(
                    t.editor.secondary_font_weight,
                    config.style?.secondary_font_weight,
                    (value) => onChange(['style', 'secondary_font_weight'], value),
                    { placeholder: 'normal' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div style="font-weight: 500; margin-bottom: 8px;">${t.editor.tertiary_text_subsection}</div>
                ${renderTextfield(
                    t.editor.tertiary_size,
                    config.style?.tertiary_size,
                    (value) => onChange(['style', 'tertiary_size'], value),
                    { placeholder: '0.9em' }
                )}
                ${renderTextfield(
                    t.editor.tertiary_line_height,
                    config.style?.tertiary_line_height,
                    (value) => onChange(['style', 'tertiary_line_height'], value),
                    { placeholder: '1.4' }
                )}
                ${renderColorPicker(
                    t.editor.tertiary_color_label,
                    config.style?.tertiary_color,
                    (value) => onChange(['style', 'tertiary_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    t.editor.tertiary_opacity,
                    config.style?.tertiary_font_opacity,
                    (value) => onChange(['style', 'tertiary_font_opacity'], value),
                    { placeholder: '0.7' }
                )}
                ${renderTextfield(
                    t.editor.tertiary_font_weight,
                    config.style?.tertiary_font_weight,
                    (value) => onChange(['style', 'tertiary_font_weight'], value),
                    { placeholder: 'normal' }
                )}
            `,
            expandedSections.has('styling_karten'),
            () => onToggleSection('styling_karten')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'styling_layout',
            'mdi:grid',
            t.editor.layout,
            html`
                ${renderTextfield(
                    t.editor.grid_gap,
                    config.grid_gap,
                    (value) => onChange(['grid_gap'], value),
                    { placeholder: t.editor.grid_gap_placeholder, helper: t.editor.grid_gap_helper }
                )}
                ${renderTextfield(
                    t.editor.header_margin_bottom,
                    config.style?.header_margin_bottom,
                    (value) => onChange(['style', 'header_margin_bottom'], value),
                    { placeholder: '12px', helper: t.editor.header_margin_bottom_helper }
                )}
                ${renderTextfield(
                    t.editor.infobar_gap,
                    config.style?.infobar_gap,
                    (value) => onChange(['style', 'infobar_gap'], value),
                    { placeholder: '6px', helper: t.editor.infobar_gap_helper }
                )}
                ${renderTextfield(
                    t.editor.cursor,
                    config.style?.card_cursor,
                    (value) => onChange(['style', 'card_cursor'], value),
                    { placeholder: 'pointer' }
                )}
            `,
            expandedSections.has('styling_layout'),
            () => onToggleSection('styling_layout')
        )}
    `;
}
