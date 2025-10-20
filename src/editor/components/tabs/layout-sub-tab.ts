import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderTextfield } from "../fields/textfield";
import { renderLayoutOrderSelector } from "../fields/layout-order-selector";
import { renderCardOrderSelector } from "../fields/card-order-selector";

export function renderLayoutSubTab(
    config: PVMonitorCardConfig,
    expandedSections: Set<string>,
    onToggleSection: (id: string) => void,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    return html`
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
            'layout',
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
                    t.editor.pv_bar_gap,
                    config.style?.pv_bar_gap,
                    (value) => onChange(['style', 'pv_bar_gap'], value),
                    { placeholder: '6px', helper: t.editor.pv_bar_gap_helper }
                )}
                ${renderTextfield(
                    t.editor.battery_bar_gap,
                    config.style?.battery_bar_gap,
                    (value) => onChange(['style', 'battery_bar_gap'], value),
                    { placeholder: '6px', helper: t.editor.battery_bar_gap_helper }
                )}
                ${renderTextfield(
                    t.editor.cursor,
                    config.style?.card_cursor,
                    (value) => onChange(['style', 'card_cursor'], value),
                    { placeholder: 'pointer' }
                )}
            `,
            expandedSections.has('layout'),
            () => onToggleSection('layout')
        )}
    `;
}
