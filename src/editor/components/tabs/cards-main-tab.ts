import { html } from "lit";
import { PVMonitorCardConfig } from "../../../types";
import { EntityPickerState } from "../fields/entity-picker";

export function renderCardsMainTab(
    config: PVMonitorCardConfig,
    hass: any,
    expandedSections: Set<string>,
    activeSubTab: string,
    activeContextTab: string,
    expandedPVBarIndex: number | null,
    expandedBatteryIndex: number | null,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onSubTabChange: (subTab: string) => void,
    onContextTabChange: (contextTab: string) => void,
    onTogglePVBarItem: (index: number) => void,
    onToggleBatteryBarItem: (index: number) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    onAddPVBarItem: () => void,
    onDuplicatePVBarItem: (index: number) => void,
    onMovePVBarItemUp: (index: number) => void,
    onMovePVBarItemDown: (index: number) => void,
    onRemovePVBarItem: (index: number) => void,
    onAddBatteryBarItem: () => void,
    onDuplicateBatteryBarItem: (index: number) => void,
    onMoveBatteryBarItemUp: (index: number) => void,
    onMoveBatteryBarItemDown: (index: number) => void,
    onRemoveBatteryBarItem: (index: number) => void,
    renderPVTab: any,
    renderPVBarTab: any,
    renderBatteryTab: any,
    renderBatteryBarTab: any,
    renderHouseTab: any,
    renderGridTab: any,
    t: any
) {
    const subTabs = [
        { id: 'pv', label: t.editor.tab_pv || 'PV System', icon: 'mdi:solar-panel' },
        { id: 'battery', label: t.editor.tab_battery || 'Battery', icon: 'mdi:battery' },
        { id: 'house', label: t.editor.tab_house || 'House', icon: 'mdi:home' },
        { id: 'grid', label: t.editor.tab_grid || 'Grid', icon: 'mdi:transmission-tower' }
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

        ${(activeSubTab === 'pv' || activeSubTab === 'battery') ? html`
            <div class="context-tabs">
                ${activeSubTab === 'pv' ? html`
                    <button
                        class="context-tab ${activeContextTab === 'card' ? 'active' : ''}"
                        @click=${() => onContextTabChange('card')}
                    >
                        ${t.editor.card_pv || 'PV Card'}
                    </button>
                    <button
                        class="context-tab ${activeContextTab === 'bar' ? 'active' : ''}"
                        @click=${() => onContextTabChange('bar')}
                    >
                        ${t.editor.tab_pv_bar || 'PV Bar'}
                    </button>
                ` : ''}
                ${activeSubTab === 'battery' ? html`
                    <button
                        class="context-tab ${activeContextTab === 'card' ? 'active' : ''}"
                        @click=${() => onContextTabChange('card')}
                    >
                        ${t.editor.card_battery || 'Battery Card'}
                    </button>
                    <button
                        class="context-tab ${activeContextTab === 'bar' ? 'active' : ''}"
                        @click=${() => onContextTabChange('bar')}
                    >
                        ${t.editor.tab_battery_bar || 'Battery Bar'}
                    </button>
                ` : ''}
            </div>
        ` : ''}

        <div class="sub-tab-content">
            ${activeSubTab === 'pv' && activeContextTab === 'card' ? renderPVTab(
                config,
                hass,
                expandedSections,
                expandedPVBarIndex,
                entityPickerStates,
                onToggleSection,
                onTogglePVBarItem,
                onEntityPickerStateChange,
                onChange,
                onTapActionChange,
                onAddPVBarItem,
                onDuplicatePVBarItem,
                onMovePVBarItemUp,
                onMovePVBarItemDown,
                onRemovePVBarItem,
                t
            ) : ''}

            ${activeSubTab === 'pv' && activeContextTab === 'bar' ? renderPVBarTab(
                config,
                hass,
                expandedSections,
                expandedPVBarIndex,
                entityPickerStates,
                onToggleSection,
                onTogglePVBarItem,
                onEntityPickerStateChange,
                onChange,
                onAddPVBarItem,
                onDuplicatePVBarItem,
                onMovePVBarItemUp,
                onMovePVBarItemDown,
                onRemovePVBarItem,
                t
            ) : ''}

            ${activeSubTab === 'battery' && activeContextTab === 'card' ? renderBatteryTab(
                config,
                hass,
                expandedSections,
                expandedBatteryIndex,
                entityPickerStates,
                onToggleSection,
                onToggleBatteryBarItem,
                onEntityPickerStateChange,
                onChange,
                onTapActionChange,
                onAddBatteryBarItem,
                onDuplicateBatteryBarItem,
                onMoveBatteryBarItemUp,
                onMoveBatteryBarItemDown,
                onRemoveBatteryBarItem,
                t
            ) : ''}

            ${activeSubTab === 'battery' && activeContextTab === 'bar' ? renderBatteryBarTab(
                config,
                hass,
                expandedSections,
                expandedBatteryIndex,
                entityPickerStates,
                onToggleSection,
                onToggleBatteryBarItem,
                onEntityPickerStateChange,
                onChange,
                onAddBatteryBarItem,
                onDuplicateBatteryBarItem,
                onMoveBatteryBarItemUp,
                onMoveBatteryBarItemDown,
                onRemoveBatteryBarItem,
                t
            ) : ''}

            ${activeSubTab === 'house' ? renderHouseTab(
                config,
                hass,
                expandedSections,
                entityPickerStates,
                onToggleSection,
                onEntityPickerStateChange,
                onChange,
                onTapActionChange,
                t
            ) : ''}

            ${activeSubTab === 'grid' ? renderGridTab(
                config,
                hass,
                expandedSections,
                entityPickerStates,
                onToggleSection,
                onEntityPickerStateChange,
                onChange,
                onTapActionChange,
                t
            ) : ''}
        </div>
    `;
}
