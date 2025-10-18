import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { EntityPickerState } from "../fields/entity-picker";
import { renderSwitch } from "../fields/switch";
import { renderTextfield } from "../fields/textfield";
import { renderIconPicker } from "../fields/icon-picker";
import { renderLanguageSelector } from "../fields/language-selector";
import { renderLayoutOrderSelector } from "../fields/layout-order-selector";
import { renderCardOrderSelector } from "../fields/card-order-selector";

export function renderGeneralTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    return html`

        ${renderCollapsibleSection(
            'header',
            'mdi:card-text',
            t.editor.header_section,
            html`
                ${renderSwitch(
                    t.editor.show_title,
                    config.show_title !== false,
                    (value) => onChange(['show_title'], value)
                )}
                ${renderTextfield(
                    t.editor.title,
                    config.title,
                    (value) => onChange(['title'], value),
                    { placeholder: t.editor.title_placeholder, helper: t.editor.title_helper }
                )}
                ${renderSwitch(
                    t.editor.show_subtitle,
                    config.show_subtitle !== false,
                    (value) => onChange(['show_subtitle'], value)
                )}
                ${renderTextfield(
                    t.editor.subtitle,
                    config.subtitle,
                    (value) => onChange(['subtitle'], value),
                    { placeholder: t.editor.subtitle_placeholder, helper: t.editor.subtitle_helper }
                )}
                ${renderSwitch(
                    t.editor.show_icon,
                    config.show_icon !== false,
                    (value) => onChange(['show_icon'], value)
                )}
                ${renderIconPicker(
                    t.editor.icon,
                    config.icon,
                    hass,
                    (value) => onChange(['icon'], value),
                    { helper: t.editor.icon_helper, translations: { editor: t.editor } }
                )}
            `,
            expandedSections.has('header'),
            () => onToggleSection('header')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'layout_order',
            'mdi:order-bool-ascending',
            t.editor.layout_order,
            html`
                <div style="padding: 8px 0;">
                    <p style="margin: 0 0 12px; font-size: 0.9em; opacity: 0.7;">${t.editor.layout_order_helper}</p>
                    ${renderLayoutOrderSelector(
                        config.layout?.order || ['header', 'pv_bar', 'cards', 'info_bar', 'battery_bar', 'consumers'],
                        (value) => onChange(['layout', 'order'], value),
                        t
                    )}
                </div>
            `,
            expandedSections.has('layout_order'),
            () => onToggleSection('layout_order')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'cards_order',
            'mdi:card-multiple',
            t.editor.cards_order,
            html`
                <div style="padding: 8px 0;">
                    <p style="margin: 0 0 12px; font-size: 0.9em; opacity: 0.7;">${t.editor.cards_order_helper}</p>
                    ${renderCardOrderSelector(
                        t.editor.cards_order,
                        config,
                        onChange,
                        t
                    )}
                </div>
            `,
            expandedSections.has('cards_order'),
            () => onToggleSection('cards_order')
        )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
            'language',
            'mdi:translate',
            t.editor.language,
            html`
                ${renderLanguageSelector(
                    config.language,
                    (value) => onChange(['language'], value),
                    { translations: t }
                )}
            `,
            expandedSections.has('language'),
            () => onToggleSection('language')
        )}
    `;
}
