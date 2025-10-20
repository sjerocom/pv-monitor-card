import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderThemeSelector } from "../fields/theme-selector";
import { renderColorPicker } from "../fields/color-picker";
import { renderTextfield } from "../fields/textfield";

export function renderThemeTab(
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
            'theme_selector',
            'mdi:palette',
            t.editor.theme,
            html`
                ${renderThemeSelector(
                    config.theme,
                    config,
                    (newConfig) => onConfigChange(newConfig),
                    { translations: t }
                )}
            `,
            expandedSections.has('theme_selector'),
            () => onToggleSection('theme_selector')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'theme_cards_basic',
            'mdi:card-multiple',
            t.editor.theme_cards_basic || 'Cards - Basic',
            html`
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
            expandedSections.has('theme_cards_basic'),
            () => onToggleSection('theme_cards_basic')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'theme_icons',
            'mdi:image-outline',
            t.editor.icon_subsection || 'Icons',
            html`
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
            `,
            expandedSections.has('theme_icons'),
            () => onToggleSection('theme_icons')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'theme_primary_text',
            'mdi:format-text',
            t.editor.primary_text_subsection || 'Primary Text',
            html`
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
            `,
            expandedSections.has('theme_primary_text'),
            () => onToggleSection('theme_primary_text')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'theme_secondary_text',
            'mdi:format-text-variant',
            t.editor.secondary_text_subsection || 'Secondary Text',
            html`
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
            `,
            expandedSections.has('theme_secondary_text'),
            () => onToggleSection('theme_secondary_text')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'theme_tertiary_text',
            'mdi:format-text-variant-outline',
            t.editor.tertiary_text_subsection || 'Tertiary Text',
            html`
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
            expandedSections.has('theme_tertiary_text'),
            () => onToggleSection('theme_tertiary_text')
        )}
    `;
}
