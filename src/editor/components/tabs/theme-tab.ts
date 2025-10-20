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
            'theme_cards',
            'mdi:card-multiple',
            t.editor.theme_editor_cards,
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
            expandedSections.has('theme_cards'),
            () => onToggleSection('theme_cards')
        )}
    `;
}
