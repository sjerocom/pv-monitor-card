import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { EntityPickerState } from "../fields/entity-picker";
import { renderHeaderTab } from "./header-tab";
import { renderInfoBarTab } from "./infobar-tab";
import { renderConsumersTab } from "./consumers-tab";

export function renderElementsMainTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    activeSubTab: string,
    expandedConsumerIndex: number | null,
    expandedConsumerSubsections: Map<string, Set<string>>,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onSubTabChange: (subTab: string) => void,
    onToggleConsumer: (index: number) => void,
    onToggleConsumerSubsection: (index: number, subsectionId: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    onAddConsumer: () => void,
    onDuplicateConsumer: (index: number) => void,
    onMoveConsumerUp: (index: number) => void,
    onMoveConsumerDown: (index: number) => void,
    onRemoveConsumer: (index: number) => void,
    t: any
) {
    const subTabs = [
        { id: 'header', label: t.editor.tab_header || 'Header', icon: 'mdi:page-layout-header' },
        { id: 'infobar', label: t.editor.tab_infobar || 'Info Bar', icon: 'mdi:information' },
        { id: 'consumers', label: t.editor.tab_consumers || 'Consumers', icon: 'mdi:flash' }
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
            ${activeSubTab === 'header' ? renderHeaderTab(
                config,
                hass,
                expandedSections,
                onToggleSection,
                onChange,
                t
            ) : ''}

            ${activeSubTab === 'infobar' ? renderInfoBarTab(
                config,
                hass,
                expandedSections,
                entityPickerStates,
                onToggleSection,
                onEntityPickerStateChange,
                onChange,
                t
            ) : ''}

            ${activeSubTab === 'consumers' ? renderConsumersTab(
                config,
                hass,
                expandedSections,
                expandedConsumerIndex,
                expandedConsumerSubsections,
                entityPickerStates,
                onToggleSection,
                onToggleConsumer,
                onToggleConsumerSubsection,
                onEntityPickerStateChange,
                onChange,
                onTapActionChange,
                onAddConsumer,
                onDuplicateConsumer,
                onMoveConsumerUp,
                onMoveConsumerDown,
                onRemoveConsumer,
                t
            ) : ''}
        </div>
    `;
}
