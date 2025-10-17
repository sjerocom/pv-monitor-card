import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { PVMonitorCardConfig } from "../types";
import { getTranslations } from "../i18n";
import { editorStyles } from "./styles/editor-styles";
import { EventManager } from "./utils/event-handlers";
import { updateConfigValue, updateTapAction } from "./utils/config-helpers";
import { EntityPickerState } from "./components/fields/entity-picker";
import { renderGeneralTab } from "./components/tabs/general-tab";
import { renderStylingTab } from "./components/tabs/styling-tab";
import { renderInfoBarTab } from "./components/tabs/infobar-tab";
import { renderConsumersTab } from "./components/tabs/consumers-tab";
import { renderPVTab } from "./components/tabs/pv-tab";
import { renderPVBarTab } from "./components/tabs/pv-bar-tab";
import { renderBatteryTab } from "./components/tabs/battery-tab";
import { renderBatteryBarTab } from "./components/tabs/battery-bar-tab";
import { renderHouseTab } from "./components/tabs/house-tab";
import { renderGridTab } from "./components/tabs/grid-tab";

declare const __CARD_NAME__: string;
const EDITOR_TAG = typeof __CARD_NAME__ !== 'undefined' ? `${__CARD_NAME__}-editor` : 'pv-monitor-card-editor';

export class PVMonitorCardEditor extends LitElement {
    @property({ attribute: false }) public hass?: any;
    @state() private _config?: PVMonitorCardConfig;
    @state() private _activeTab: string = 'general';
    @state() private _expandedSections: Set<string> = new Set(['entities']);
    @state() private _expandedConsumerIndex: number | null = null;
    @state() private _expandedConsumerSubsections: Map<string, Set<string>> = new Map();
    @state() private _entityPickerStates: Map<string, EntityPickerState> = new Map();

    private _eventManager?: EventManager;

    static styles = editorStyles;

    public setConfig(config: PVMonitorCardConfig): void {
        this._config = config;
        this._eventManager = new EventManager(this.dispatchEvent.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._eventManager?.cleanup();
    }

    private _getT() {
        return getTranslations(this._config?.language);
    }

    private _onChange(path: string[], value: any): void {
        if (!this._config || !this._eventManager) return;
        this._config = updateConfigValue(this._config, path, value);
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _onConfigChange(config: PVMonitorCardConfig): void {
        if (!this._eventManager) return;
        this._config = config;
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _onTapActionChange(path: string[], key: string, value: any): void {
        if (!this._config || !this._eventManager) return;
        this._config = updateTapAction(this._config, path, key, value);
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _toggleSection(sectionId: string): void {
        if (this._expandedSections.has(sectionId)) {
            this._expandedSections.delete(sectionId);
        } else {
            this._expandedSections.add(sectionId);
        }
        this.requestUpdate();
    }

    private _onEntityPickerStateChange(key: string, state: EntityPickerState): void {
        this._entityPickerStates.set(key, state);
        this.requestUpdate();
    }

    private _toggleConsumer(index: number): void {
        this._expandedConsumerIndex = this._expandedConsumerIndex === index ? null : index;
        this.requestUpdate();
    }

    private _toggleConsumerSubsection(consumerIndex: number, subsectionId: string): void {
        const key = `consumer-${consumerIndex}`;
        if (!this._expandedConsumerSubsections.has(key)) {
            this._expandedConsumerSubsections.set(key, new Set());
        }
        const subsections = this._expandedConsumerSubsections.get(key)!;
        if (subsections.has(subsectionId)) {
            subsections.delete(subsectionId);
        } else {
            subsections.add(subsectionId);
        }
        this.requestUpdate();
    }

    private _addConsumer(): void {
        if (!this._config || !this._eventManager) return;
        const newConfig = JSON.parse(JSON.stringify(this._config));
        if (!newConfig.consumers) newConfig.consumers = { items: [] };
        if (!newConfig.consumers.items) newConfig.consumers.items = [];
        newConfig.consumers.items.push({ entity: '', auto_color: true });
        this._config = newConfig;
        this._expandedConsumerIndex = newConfig.consumers.items.length - 1;
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _duplicateConsumer(index: number): void {
        if (!this._config?.consumers?.items || !this._eventManager) return;
        const newConfig = JSON.parse(JSON.stringify(this._config));
        const itemToDuplicate = JSON.parse(JSON.stringify(newConfig.consumers.items[index]));
        newConfig.consumers.items.splice(index + 1, 0, itemToDuplicate);
        this._config = newConfig;
        this._expandedConsumerIndex = index + 1;
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _moveConsumerUp(index: number): void {
        if (!this._config?.consumers?.items || index === 0 || !this._eventManager) return;
        const newConfig = JSON.parse(JSON.stringify(this._config));
        const items = newConfig.consumers.items;
        [items[index - 1], items[index]] = [items[index], items[index - 1]];
        this._config = newConfig;
        if (this._expandedConsumerIndex === index) {
            this._expandedConsumerIndex = index - 1;
        } else if (this._expandedConsumerIndex === index - 1) {
            this._expandedConsumerIndex = index;
        }
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _moveConsumerDown(index: number): void {
        if (!this._config?.consumers?.items || index === this._config.consumers.items.length - 1 || !this._eventManager) return;
        const newConfig = JSON.parse(JSON.stringify(this._config));
        const items = newConfig.consumers.items;
        [items[index], items[index + 1]] = [items[index + 1], items[index]];
        this._config = newConfig;
        if (this._expandedConsumerIndex === index) {
            this._expandedConsumerIndex = index + 1;
        } else if (this._expandedConsumerIndex === index + 1) {
            this._expandedConsumerIndex = index;
        }
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _removeConsumer(index: number): void {
        if (!this._config?.consumers?.items || !this._eventManager) return;
        const newConfig = JSON.parse(JSON.stringify(this._config));
        newConfig.consumers.items.splice(index, 1);
        this._config = newConfig;
        if (this._expandedConsumerIndex === index) {
            this._expandedConsumerIndex = null;
        } else if (this._expandedConsumerIndex !== null && this._expandedConsumerIndex > index) {
            this._expandedConsumerIndex--;
        }
        this._eventManager.fireEvent(this._config);
        this.requestUpdate();
    }

    private _renderTab(id: string, label: string, icon: string) {
        return html`
            <button
                class="tab ${this._activeTab === id ? 'active' : ''}"
                @click=${() => this._activeTab = id}
            >
                <ha-icon .icon=${icon}></ha-icon>
                ${label}
            </button>
        `;
    }

    render() {
        if (!this._config) return html``;

        const t = this._getT();

        return html`
            <div class="card-config">
                <div class="tabs">
                    ${this._renderTab('general', t.editor.tab_general, 'mdi:cog')}
                    ${this._renderTab('styling', t.editor.tab_styling, 'mdi:palette')}
                    ${this._renderTab('infobar', t.editor.tab_infobar, 'mdi:information')}
                    ${this._renderTab('consumers', t.editor.tab_consumers, 'mdi:flash')}
                    ${this._renderTab('pv', t.editor.tab_pv, 'mdi:solar-panel')}
                    ${this._renderTab('pv_bar', t.editor.tab_pv_bar || 'PV Bar', 'mdi:chart-bar')}
                    ${this._renderTab('battery', t.editor.tab_battery, 'mdi:battery')}
                    ${this._renderTab('battery_bar', t.editor.tab_battery_bar || 'Battery Bar', 'mdi:battery-charging')}
                    ${this._renderTab('house', t.editor.tab_house, 'mdi:home')}
                    ${this._renderTab('grid', t.editor.tab_grid, 'mdi:transmission-tower')}
                </div>

                <div class="tab-content ${this._activeTab === 'general' ? 'active' : ''}">
                    ${renderGeneralTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'styling' ? 'active' : ''}">
                    ${renderStylingTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        (id) => this._toggleSection(id),
                        (path, value) => this._onChange(path, value),
                        (config) => this._onConfigChange(config),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'infobar' ? 'active' : ''}">
                    ${renderInfoBarTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        (path, key, value) => this._onTapActionChange(path, key, value),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'consumers' ? 'active' : ''}">
                    ${renderConsumersTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._expandedConsumerIndex,
                        this._expandedConsumerSubsections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (index) => this._toggleConsumer(index),
                        (index, subsectionId) => this._toggleConsumerSubsection(index, subsectionId),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        (path, key, value) => this._onTapActionChange(path, key, value),
                        () => this._addConsumer(),
                        (index) => this._duplicateConsumer(index),
                        (index) => this._moveConsumerUp(index),
                        (index) => this._moveConsumerDown(index),
                        (index) => this._removeConsumer(index),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'pv' ? 'active' : ''}">
                    ${renderPVTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        (path, key, value) => this._onTapActionChange(path, key, value),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'pv_bar' ? 'active' : ''}">
                    ${renderPVBarTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'battery' ? 'active' : ''}">
                    ${renderBatteryTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        (path, key, value) => this._onTapActionChange(path, key, value),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'battery_bar' ? 'active' : ''}">
                    ${renderBatteryBarTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'house' ? 'active' : ''}">
                    ${renderHouseTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        (path, key, value) => this._onTapActionChange(path, key, value),
                        t
                    )}
                </div>

                <div class="tab-content ${this._activeTab === 'grid' ? 'active' : ''}">
                    ${renderGridTab(
                        this._config,
                        this.hass,
                        this._expandedSections,
                        this._entityPickerStates,
                        (id) => this._toggleSection(id),
                        (key, state) => this._onEntityPickerStateChange(key, state),
                        (path, value) => this._onChange(path, value),
                        (path, key, value) => this._onTapActionChange(path, key, value),
                        t
                    )}
                </div>
            </div>
        `;
    }
}

if (!customElements.get(EDITOR_TAG)) {
    customElements.define(EDITOR_TAG, PVMonitorCardEditor);
}
