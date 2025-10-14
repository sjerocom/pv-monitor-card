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

                <div style="font-weight: 500; margin-bottom: 8px;">Theme Editor (Karten)</div>
                <div class="info-text" style="margin-bottom: 12px;">Ändert nur die Karten-Farben, nicht den Titelbereich.</div>

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
            'Titelbereich',
            html`
                ${renderTextfield(
                    'Titel Größe',
                    config.style?.title_size,
                    (value) => onChange(['style', 'title_size'], value),
                    { placeholder: '1.5em' }
                )}
                ${renderTextfield(
                    'Titel Line-Height',
                    config.style?.title_line_height,
                    (value) => onChange(['style', 'title_line_height'], value),
                    { placeholder: '1.2' }
                )}
                ${renderColorPicker(
                    'Titel Farbe',
                    config.style?.title_color,
                    (value) => onChange(['style', 'title_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    'Titel Font-Weight',
                    config.style?.title_font_weight,
                    (value) => onChange(['style', 'title_font_weight'], value),
                    { placeholder: 'bold' }
                )}
                ${renderTextfield(
                    'Titel Ausrichtung',
                    config.style?.title_align,
                    (value) => onChange(['style', 'title_align'], value),
                    { placeholder: 'center', helper: 'left, center, right' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                ${renderTextfield(
                    'Untertitel Größe',
                    config.style?.subtitle_size,
                    (value) => onChange(['style', 'subtitle_size'], value),
                    { placeholder: '1em' }
                )}
                ${renderTextfield(
                    'Untertitel Line-Height',
                    config.style?.subtitle_line_height,
                    (value) => onChange(['style', 'subtitle_line_height'], value),
                    { placeholder: '1.4' }
                )}
                ${renderColorPicker(
                    'Untertitel Farbe',
                    config.style?.subtitle_color,
                    (value) => onChange(['style', 'subtitle_color'], value),
                    { placeholder: 'rgba(255,255,255,0.7)' }
                )}
                ${renderTextfield(
                    'Untertitel Font-Weight',
                    config.style?.subtitle_font_weight,
                    (value) => onChange(['style', 'subtitle_font_weight'], value),
                    { placeholder: 'normal' }
                )}
                ${renderTextfield(
                    'Untertitel Ausrichtung',
                    config.style?.subtitle_align,
                    (value) => onChange(['style', 'subtitle_align'], value),
                    { placeholder: 'center' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                ${renderTextfield(
                    'Titel-Untertitel Abstand',
                    config.style?.title_subtitle_gap,
                    (value) => onChange(['style', 'title_subtitle_gap'], value),
                    { placeholder: '4px' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                ${renderTextfield(
                    'Header Icon Größe',
                    config.style?.header_icon_size,
                    (value) => onChange(['style', 'header_icon_size'], value),
                    { placeholder: '1.5em' }
                )}
                ${renderColorPicker(
                    'Header Icon Farbe',
                    config.style?.header_icon_color,
                    (value) => onChange(['style', 'header_icon_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    'Header Icon Margin',
                    config.style?.header_icon_margin,
                    (value) => onChange(['style', 'header_icon_margin'], value),
                    { placeholder: '8px' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div class="subsection">
                    <div style="font-weight: 500; margin-bottom: 12px;">Header-Hintergrund</div>
                    ${renderSwitch(
                        'Hintergrund aktivieren',
                        config.style?.header_background_enabled,
                        (value) => onChange(['style', 'header_background_enabled'], value)
                    )}

                    ${config.style?.header_background_enabled ? html`
                        <div class="option">
                            <div class="option-label">Header Breite</div>
                            <div class="option-control">
                                <ha-combo-box
                                    .value=${config.style?.header_width || 'auto'}
                                    .items=${[
                                        { value: 'auto', label: 'Auto (Inhaltsgröße)' },
                                        { value: 'full', label: 'Full (100% Breite)' }
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
                            'Header Hintergrundfarbe',
                            config.style?.header_background_color,
                            (value) => onChange(['style', 'header_background_color'], value),
                            { placeholder: 'rgba(21, 20, 27, 1)' }
                        )}
                        ${renderColorPicker(
                            'Header Rahmenfarbe',
                            config.style?.header_border_color,
                            (value) => onChange(['style', 'header_border_color'], value),
                            { placeholder: 'rgba(255, 255, 255, 0.1)' }
                        )}
                        ${renderTextfield(
                            'Header Border Radius',
                            config.style?.header_border_radius,
                            (value) => onChange(['style', 'header_border_radius'], value),
                            { placeholder: '16px' }
                        )}
                        ${renderTextfield(
                            'Header Padding',
                            config.style?.header_padding,
                            (value) => onChange(['style', 'header_padding'], value),
                            { placeholder: '12px' }
                        )}
                        ${renderTextfield(
                            'Header Box Shadow',
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
            'Karten Styling',
            html`
                <div style="font-weight: 500; margin-bottom: 8px;">Icon</div>
                ${renderTextfield(
                    'Icon Größe',
                    config.style?.icon_size,
                    (value) => onChange(['style', 'icon_size'], value),
                    { placeholder: '2em' }
                )}
                ${renderTextfield(
                    'Icon Opacity',
                    config.style?.icon_opacity,
                    (value) => onChange(['style', 'icon_opacity'], value),
                    { placeholder: '1' }
                )}
                ${renderTextfield(
                    'Icon Margin',
                    config.style?.icon_margin,
                    (value) => onChange(['style', 'icon_margin'], value),
                    { placeholder: '6px' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div style="font-weight: 500; margin-bottom: 8px;">Primär-Text (Hauptwert)</div>
                ${renderTextfield(
                    'Primär Größe',
                    config.style?.primary_size,
                    (value) => onChange(['style', 'primary_size'], value),
                    { placeholder: '1.2em' }
                )}
                ${renderTextfield(
                    'Primär Line-Height',
                    config.style?.primary_line_height,
                    (value) => onChange(['style', 'primary_line_height'], value),
                    { placeholder: '1.2' }
                )}
                ${renderColorPicker(
                    'Primär Farbe',
                    config.style?.primary_color,
                    (value) => onChange(['style', 'primary_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    'Primär Opacity',
                    config.style?.primary_font_opacity,
                    (value) => onChange(['style', 'primary_font_opacity'], value),
                    { placeholder: '1' }
                )}
                ${renderTextfield(
                    'Primär Font-Weight',
                    config.style?.primary_font_weight,
                    (value) => onChange(['style', 'primary_font_weight'], value),
                    { placeholder: 'normal' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div style="font-weight: 500; margin-bottom: 8px;">Sekundär-Text (2. Zeile)</div>
                ${renderTextfield(
                    'Sekundär Größe',
                    config.style?.secondary_size,
                    (value) => onChange(['style', 'secondary_size'], value),
                    { placeholder: '0.9em' }
                )}
                ${renderTextfield(
                    'Sekundär Line-Height',
                    config.style?.secondary_line_height,
                    (value) => onChange(['style', 'secondary_line_height'], value),
                    { placeholder: '1.4' }
                )}
                ${renderColorPicker(
                    'Sekundär Farbe',
                    config.style?.secondary_color,
                    (value) => onChange(['style', 'secondary_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    'Sekundär Opacity',
                    config.style?.secondary_font_opacity,
                    (value) => onChange(['style', 'secondary_font_opacity'], value),
                    { placeholder: '0.7' }
                )}
                ${renderTextfield(
                    'Sekundär Font-Weight',
                    config.style?.secondary_font_weight,
                    (value) => onChange(['style', 'secondary_font_weight'], value),
                    { placeholder: 'normal' }
                )}

                <div class="divider" style="margin: 16px 0;"></div>

                <div style="font-weight: 500; margin-bottom: 8px;">Tertiär-Text (3. Zeile)</div>
                ${renderTextfield(
                    'Tertiär Größe',
                    config.style?.tertiary_size,
                    (value) => onChange(['style', 'tertiary_size'], value),
                    { placeholder: '0.9em' }
                )}
                ${renderTextfield(
                    'Tertiär Line-Height',
                    config.style?.tertiary_line_height,
                    (value) => onChange(['style', 'tertiary_line_height'], value),
                    { placeholder: '1.4' }
                )}
                ${renderColorPicker(
                    'Tertiär Farbe',
                    config.style?.tertiary_color,
                    (value) => onChange(['style', 'tertiary_color'], value),
                    { placeholder: 'white' }
                )}
                ${renderTextfield(
                    'Tertiär Opacity',
                    config.style?.tertiary_font_opacity,
                    (value) => onChange(['style', 'tertiary_font_opacity'], value),
                    { placeholder: '0.7' }
                )}
                ${renderTextfield(
                    'Tertiär Font-Weight',
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
