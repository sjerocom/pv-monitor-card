import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { EntityPickerState } from "../fields/entity-picker";
import { renderLayoutSubTab } from "./layout-sub-tab";
import { renderLanguageSubTab } from "./language-sub-tab";
import { renderThemeTab } from "./theme-tab";

export function renderGeneralMainTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    activeSubTab: string,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onSubTabChange: (subTab: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onConfigChange: (config: PVMonitorCardConfig) => void,
    t: any
) {
    const subTabs = [
        { id: 'layout', label: t.editor.tab_layout || 'Layout', icon: 'mdi:grid' },
        { id: 'language', label: t.editor.tab_language || 'Language', icon: 'mdi:translate' },
        { id: 'theme', label: t.editor.tab_theme || 'Theme', icon: 'mdi:palette-outline' }
    ];

    return html`
        <div class="sub-tabs">
            ${subTabs.map(tab => html`
                <button
                    class="sub-tab ${activeSubTab === tab.id ? 'active' : ''}"
                    @click=${() => onSubTabChange(tab.id)}
                >
                    <ha-icon icon="${tab.icon}"></ha-icon>
                    <span>${tab.label}</span>
                </button>
            `)}
        </div>

        <div class="sub-tab-content">
            ${activeSubTab === 'layout' ? renderLayoutSubTab(
                config,
                expandedSections,
                onToggleSection,
                onChange,
                t
            ) : ''}

            ${activeSubTab === 'language' ? renderLanguageSubTab(
                config,
                expandedSections,
                onToggleSection,
                onChange,
                t
            ) : ''}

            ${activeSubTab === 'theme' ? renderThemeTab(
                config,
                hass,
                expandedSections,
                onToggleSection,
                onChange,
                onConfigChange,
                t
            ) : ''}
        </div>
    `;
}
