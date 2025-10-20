import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderLanguageSelector } from "../fields/language-selector";

export function renderLanguageSubTab(
    config: PVMonitorCardConfig,
    expandedSections: Set<string>,
    onToggleSection: (id: string) => void,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    return html`
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
