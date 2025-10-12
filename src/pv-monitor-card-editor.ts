import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { PVMonitorCardConfig } from "./pv-monitor-card-types";
import { getTranslations, SupportedLanguage, detectLanguage } from "./pv-monitor-card-i18n";
import { getAllThemes, getTheme } from "./pv-monitor-card-themes";

export class PVMonitorCardEditor extends LitElement {
    @property({ attribute: false }) public hass?: any;
    @state() private _config?: PVMonitorCardConfig;
    @state() private _activeTab: string = 'general';
    @state() private _isInteracting: boolean = false;
    private _debounceTimer?: number;
    private _localValues: Map<string, string> = new Map();
    @state() private _autocompleteResults: Map<string, string[]> = new Map();
    @state() private _showAutocomplete: Map<string, boolean> = new Map();
    @state() private _expandedConsumerIndex: number | null = null;
    @state() private _expandedSections: Set<string> = new Set(['entities']);
    @state() private _expandedConsumerSubsections: Map<string, Set<string>> = new Map();

    static styles = css`
        :host {
            display: block;
            position: relative;
            z-index: 1;
        }

        :host ::slotted(*),
        :host * {
            --ha-entity-picker-z-index: 9999;
            --mdc-menu-z-index: 9999;
            --mdc-dialog-z-index: 9999;
        }

        .card-config {
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: relative;
        }
        .tabs {
            display: flex;
            gap: 8px;
            border-bottom: 2px solid rgba(127, 127, 127, 0.3);
            margin-bottom: 16px;
            flex-wrap: wrap;
        }
        .tab {
            padding: 8px 16px;
            cursor: pointer;
            border: none;
            background: none;
            color: inherit;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            font-size: 14px;
            transition: all 0.2s;
        }
        .tab:hover {
            background: rgba(127, 127, 127, 0.1);
        }
        .tab.active {
            border-bottom-color: #3b82f6;
            color: #3b82f6;
            font-weight: 500;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .section {
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
        }
        .section-header {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
            color: inherit;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
            padding: 8px;
            margin: -8px;
            border-radius: 8px;
            transition: background 0.2s;
        }
        .section-header:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        .section-header ha-icon {
            --mdc-icon-size: 20px;
        }
        .section-header .expand-icon {
            margin-left: auto;
            transition: transform 0.2s;
        }
        .section-header .expand-icon.expanded {
            transform: rotate(180deg);
        }
        .section-content {
            margin-top: 12px;
            overflow: hidden;
        }
        .section-content.collapsed {
            display: none;
        }
        .option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            gap: 16px;
            position: relative;
            z-index: 1;
        }
        .option-label {
            flex: 1;
            font-size: 14px;
            color: inherit;
        }
        .option-label.required::after {
            content: " *";
            color: #ff5252;
            font-weight: bold;
        }
        .option-control {
            flex: 0 0 auto;
            min-width: 200px;
            position: relative;
        }

        ha-entity-picker,
        ha-selector-entity {
            position: relative;
            z-index: 100;
        }

        ha-entity-picker[opened],
        ha-selector-entity[opened] {
            z-index: 1000;
        }

        ha-combo-box {
            position: relative;
        }

        ha-textfield, ha-select {
            width: 100%;
        }

        ha-combo-box {
            color: #e1e1e1 !important;
        }

        ha-combo-box mwc-list-item {
            color: #e1e1e1 !important;
            background-color: #2c2c2c !important;
        }

        ha-combo-box mwc-menu {
            background-color: #2c2c2c !important;
        }

        .autocomplete-wrapper {
            position: relative;
            width: 100%;
            z-index: 100;
        }

        .autocomplete-dropdown {
            position: fixed;
            top: auto;
            left: auto;
            min-width: 400px;
            max-height: 200px;
            overflow-y: auto;
            background: #1c1c1c;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 4px;
            margin-top: 4px;
            z-index: 99999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .autocomplete-item {
            padding: 8px 12px;
            cursor: pointer;
            color: #e1e1e1;
            font-size: 14px;
            background: #1c1c1c;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .autocomplete-item:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .subsection {
            margin-left: 16px;
            padding-left: 16px;
            border-left: 2px solid rgba(127, 127, 127, 0.3);
            margin-top: 8px;
        }
        .info-text {
            font-size: 12px;
            color: rgba(127, 127, 127, 0.8);
            margin-top: 4px;
            font-style: italic;
        }
        .divider {
            height: 1px;
            background: rgba(127, 127, 127, 0.3);
            margin: 16px 0;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        .consumer-section {
            position: relative;
            margin-bottom: 16px;
            border: 1px solid rgba(127, 127, 127, 0.3);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.1);
            padding: 12px;
        }
        .consumer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            padding: 8px;
            margin: -8px;
            border-radius: 8px;
            user-select: none;
        }
        .consumer-header:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        .consumer-title {
            font-weight: bold;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
            min-width: 0;
        }
        .consumer-title-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .consumer-header-actions {
            display: flex;
            align-items: center;
            gap: 4px;
            flex-shrink: 0;
        }
        .consumer-header-actions ha-icon-button {
            --mdc-icon-button-size: 32px;
            --mdc-icon-size: 18px;
        }
        .consumer-content {
            margin-top: 12px;
            overflow: hidden;
        }
        .consumer-content.collapsed {
            display: none;
        }
        .consumer-subsection {
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid rgba(127, 127, 127, 0.2);
        }
        .consumer-subsection-header {
            font-weight: 500;
            margin-bottom: 12px;
            cursor: pointer;
            padding: 8px;
            margin: -8px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            user-select: none;
        }
        .consumer-subsection-header:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        .consumer-subsection-content {
            margin-top: 12px;
        }
        .consumer-subsection-content.collapsed {
            display: none;
        }
        .expand-icon {
            transition: transform 0.2s;
        }
        .expand-icon.expanded {
            transform: rotate(180deg);
        }
    `;

    public setConfig(config: PVMonitorCardConfig): void {
        this._config = config;
    }

    private _valueChanged(ev: CustomEvent, path: string[]): void {
        if (!this._config) return;

        const target = ev.target as any;
        let value: any;

        if (target.type === 'checkbox') {
            value = target.checked;
        } else if (target.type === 'number') {
            value = target.value ? Number(target.value) : undefined;
        } else {
            value = target.value || undefined;
        }

        const newConfig = { ...this._config };
        let current: any = newConfig;

        for (let i = 0; i < path.length - 1; i++) {
            if (!current[path[i]]) {
                current[path[i]] = {};
            }
            current = current[path[i]];
        }

        if (value === undefined || value === '') {
            delete current[path[path.length - 1]];
        } else {
            current[path[path.length - 1]] = value;
        }

        this._config = newConfig;
        this._fireEvent();
    }

    private _fireEvent(): void {
        const event = new CustomEvent('config-changed', {
            detail: { config: this._config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    private _debouncedFireEvent(): void {
        if (this._debounceTimer) {
            window.clearTimeout(this._debounceTimer);
        }

        this._debounceTimer = window.setTimeout(() => {
            this._fireEvent();
            this._debounceTimer = undefined;
        }, 1000);
    }

    private _renderAnimationSelector(cardType: 'pv' | 'batterie' | 'haus' | 'netz', animationEnabled?: boolean, currentStyle?: string) {
        const t = this._getT();

        if (!animationEnabled) return html``;

        const animationOptions = [
            { value: 'rotating-dots', label: t.editor.animation_rotating_dots || 'Rotating Dots' },
            { value: 'particle-field', label: t.editor.animation_particle_field || 'Particle Field' },
            { value: 'electric-arc', label: t.editor.animation_electric_arc || 'Electric Arc' }
        ];

        return html`
            <div class="option">
                <div class="option-label">
                    ${t.editor.animation_style || 'Animation Style'}
                    <div class="info-text">${t.editor.animation_style_helper || 'Choose the animation effect'}</div>
                </div>
                <div class="option-control">
                    <ha-combo-box
                            .value=${currentStyle || 'rotating-dots'}
                            .items=${animationOptions}
                            item-value-path="value"
                            item-label-path="label"
                            @value-changed=${(ev: any) => {
                                if (!this._config) return;
                                const newValue = ev.detail?.value;
                                if (!newValue) return;

                                const newConfig = { ...this._config };
                                if (!newConfig[cardType]) newConfig[cardType] = {};
                                newConfig[cardType].animation_style = newValue;
                                this._config = newConfig;
                                this._fireEvent();
                            }}
                    ></ha-combo-box>
                </div>
            </div>
        `;
    }

    private _renderTapActions(cardType: 'pv' | 'batterie' | 'haus' | 'netz' | 'info_bar') {
        const t = this._getT();
        const config = cardType === 'info_bar' ? this._config?.info_bar : this._config?.[cardType];

        return this._renderCollapsibleSection(
            `${cardType}_tap_actions`,
            'mdi:gesture-tap',
            'Tap Actions',
            html`
                ${this._renderActionSelector('Tap Action', [cardType, 'tap_action'], config?.tap_action)}
                ${this._renderActionSelector('Double Tap', [cardType, 'double_tap_action'], config?.double_tap_action)}
                ${this._renderActionSelector('Hold Action', [cardType, 'hold_action'], config?.hold_action)}
            `
        );
    }

    private _renderActionSelector(label: string, path: string[], action?: any) {
        const t = this._getT();

        const actions = [
            { value: 'none', label: t.editor.action_none || 'None' },
            { value: 'more-info', label: t.editor.action_more_info || 'More Info' },
            { value: 'navigate', label: t.editor.action_navigate || 'Navigate' },
            { value: 'url', label: t.editor.action_url || 'URL' },
            { value: 'call-service', label: t.editor.action_call_service || 'Call Service' }
        ];

        return html`
            <div class="option">
                <div class="option-label">${label}</div>
                <div class="option-control">
                    <ha-combo-box
                            .value=${action?.action || 'none'}
                            .items=${actions}
                            item-value-path="value"
                            item-label-path="label"
                            @value-changed=${(ev: any) => this._updateTapAction(path, 'action', ev.detail.value)}
                    ></ha-combo-box>
                </div>
            </div>

            ${action?.action === 'navigate' ? html`
                <div class="option">
                    <div class="option-label">Navigation Path</div>
                    <div class="option-control">
                        <ha-textfield
                                .value=${action.navigation_path || ''}
                                placeholder="/lovelace/view"
                                @input=${(ev: any) => this._updateTapAction(path, 'navigation_path', ev.target.value)}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ''}

            ${action?.action === 'url' ? html`
                <div class="option">
                    <div class="option-label">URL</div>
                    <div class="option-control">
                        <ha-textfield
                                .value=${action.url_path || ''}
                                placeholder="https://example.com"
                                @input=${(ev: any) => this._updateTapAction(path, 'url_path', ev.target.value)}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ''}

            ${action?.action === 'call-service' ? html`
                <div class="option">
                    <div class="option-label">Service</div>
                    <div class="option-control">
                        <ha-textfield
                                .value=${action.service || ''}
                                placeholder="light.turn_on"
                                @input=${(ev: any) => this._updateTapAction(path, 'service', ev.target.value)}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ''}
        `;
    }

    private _updateTapAction(path: string[], key: string, value: any) {
        if (!this._config) return;

        const newConfig = JSON.parse(JSON.stringify(this._config));
        let current: any = newConfig;

        for (let i = 0; i < path.length; i++) {
            if (i === path.length - 1) {
                // Last element is the action object (tap_action, double_tap_action, etc)
                if (!current[path[i]]) current[path[i]] = {};
                current[path[i]][key] = value;
            } else {
                if (!current[path[i]]) current[path[i]] = {};
                current = current[path[i]];
            }
        }

        this._config = newConfig;
        this._fireEvent();
    }

    private _getT() {
        return getTranslations(this._config?.language);
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

    private _renderTextfield(label: string, path: string[], value?: string, placeholder?: string, helper?: string) {
        return html`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? html`<div class="info-text">${helper}</div>` : ''}
                </div>
                <div class="option-control">
                    <ha-textfield
                            .value=${value || ''}
                            .placeholder=${placeholder || ''}
                            @input=${(ev: CustomEvent) => this._valueChanged(ev, path)}
                    ></ha-textfield>
                </div>
            </div>
        `;
    }

    private _renderColorPicker(label: string, path: string[], value?: string, placeholder?: string, helper?: string) {
        return html`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? html`<div class="info-text">${helper}</div>` : ''}
                </div>
                <div class="option-control">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input
                                type="color"
                                .value=${this._convertToHex(value || '')}
                                @input=${(ev: Event) => {
                                    const target = ev.target as HTMLInputElement;
                                    const hexColor = target.value;

                                    if (!this._config) return;
                                    const newConfig = JSON.parse(JSON.stringify(this._config));
                                    let current: any = newConfig;
                                    for (let i = 0; i < path.length - 1; i++) {
                                        if (!current[path[i]]) current[path[i]] = {};
                                        current = current[path[i]];
                                    }
                                    current[path[path.length - 1]] = hexColor;
                                    this._config = newConfig;
                                    this._fireEvent();
                                }}
                                style="width: 50px; height: 36px; cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px;"
                        />
                        <ha-textfield
                                .value=${value || ''}
                                .placeholder=${placeholder || 'rgba(255, 255, 255, 1) or #ffffff'}
                                @input=${(ev: CustomEvent) => this._valueChanged(ev, path)}
                                style="flex: 1;"
                        ></ha-textfield>
                    </div>
                </div>
            </div>
        `;
    }

    private _convertToHex(color: string): string {
        if (!color) return '#ffffff';

        // If already hex, return it
        if (color.startsWith('#')) {
            return color.length === 7 ? color : '#ffffff';
        }

        // If rgba/rgb, try to convert
        if (color.startsWith('rgba') || color.startsWith('rgb')) {
            const match = color.match(/\d+/g);
            if (match && match.length >= 3) {
                const r = parseInt(match[0]);
                const g = parseInt(match[1]);
                const b = parseInt(match[2]);
                return '#' + [r, g, b].map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');
            }
        }

        return '#ffffff';
    }

    private _renderNumberfield(label: string, path: string[], value?: number, min?: number, max?: number, step?: number, helper?: string) {
        return html`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? html`<div class="info-text">${helper}</div>` : ''}
                </div>
                <div class="option-control">
                    <ha-textfield
                            type="number"
                            .value=${value?.toString() || ''}
                            .min=${min?.toString()}
                            .max=${max?.toString()}
                            .step=${step?.toString() || '1'}
                            @input=${(ev: CustomEvent) => this._valueChanged(ev, path)}
                    ></ha-textfield>
                </div>
            </div>
        `;
    }

    private _renderSwitch(label: string, path: string[], value?: boolean, helper?: string) {
        return html`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? html`<div class="info-text">${helper}</div>` : ''}
                </div>
                <div class="option-control">
                    <ha-switch
                            .checked=${value === true}
                            @change=${(ev: CustomEvent) => {
                                if (!this._config) return;
                                const target = ev.target as any;
                                const newValue = target.checked;
                                const newConfig = { ...this._config };
                                let current: any = newConfig;
                                for (let i = 0; i < path.length - 1; i++) {
                                    if (!current[path[i]]) current[path[i]] = {};
                                    current = current[path[i]];
                                }
                                current[path[path.length - 1]] = newValue;
                                this._config = newConfig;
                                this._fireEvent();
                            }}
                    ></ha-switch>
                </div>
            </div>
        `;
    }

    private _renderEntityPicker(label: string, path: string[], value?: string, helper?: string, required: boolean = false) {
        if (!this.hass) return html``;

        const entities = Object.keys(this.hass.states).sort();
        const t = this._getT();
        const pathKey = path.join('.');

        const filteredEntities = this._autocompleteResults.get(pathKey) || [];
        const showDropdown = this._showAutocomplete.get(pathKey) || false;

        return html`
            <div class="option" style="${showDropdown ? 'z-index: 1000; position: relative;' : ''}">
                <div class="option-label ${required ? 'required' : ''}">
                    ${label}
                    ${helper ? html`<div class="info-text">${helper}</div>` : ''}
                </div>
                <div class="option-control">
                    <div class="autocomplete-wrapper">
                        <ha-textfield
                                .value=${value || ''}
                                .placeholder=${t.editor.select_entity}
                                @input=${(ev: CustomEvent) => {
                                    const target = ev.target as any;
                                    const inputValue = target.value;

                                    const filtered = inputValue
                                            ? entities.filter(e => e.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 50)
                                            : [];

                                    this._autocompleteResults.set(pathKey, filtered);
                                    this._showAutocomplete.set(pathKey, filtered.length > 0);
                                    this.requestUpdate();

                                    if (!this._config) return;
                                    const newConfig = JSON.parse(JSON.stringify(this._config));
                                    let current: any = newConfig;
                                    for (let i = 0; i < path.length - 1; i++) {
                                        if (!current[path[i]]) current[path[i]] = {};
                                        current = current[path[i]];
                                    }

                                    if (inputValue === '') {
                                        delete current[path[path.length - 1]];
                                    } else {
                                        current[path[path.length - 1]] = inputValue;
                                    }

                                    this._config = newConfig;
                                    this._debouncedFireEvent();
                                }}
                                @focus=${(ev: Event) => {
                                    const currentValue = value || '';
                                    if (!currentValue) {
                                        this._autocompleteResults.set(pathKey, entities.slice(0, 50));
                                        this._showAutocomplete.set(pathKey, true);
                                        this.requestUpdate();
                                    }

                                    // Position dropdown
                                    setTimeout(() => {
                                        const target = ev.target as HTMLElement;
                                        const dropdown = target.parentElement?.querySelector('.autocomplete-dropdown') as HTMLElement;
                                        if (dropdown) {
                                            const rect = target.getBoundingClientRect();
                                            dropdown.style.top = `${rect.bottom + 4}px`;
                                            dropdown.style.left = `${rect.left}px`;
                                            dropdown.style.width = `${Math.max(rect.width, 400)}px`;
                                        }
                                    }, 10);
                                }}
                                @blur=${() => {
                                    setTimeout(() => {
                                        this._showAutocomplete.set(pathKey, false);
                                        this.requestUpdate();
                                    }, 200);
                                }}
                        ></ha-textfield>

                        ${showDropdown ? html`
                            <div class="autocomplete-dropdown" @mousedown=${(ev: Event) => ev.preventDefault()}>
                                ${filteredEntities.map(entity => html`
                                    <div
                                            class="autocomplete-item"
                                            @click=${() => {
                                                if (!this._config) return;

                                                const newConfig = JSON.parse(JSON.stringify(this._config));
                                                let current: any = newConfig;
                                                for (let i = 0; i < path.length - 1; i++) {
                                                    if (!current[path[i]]) current[path[i]] = {};
                                                    current = current[path[i]];
                                                }
                                                current[path[path.length - 1]] = entity;

                                                this._config = newConfig;
                                                this._showAutocomplete.set(pathKey, false);
                                                this._fireEvent();
                                                this.requestUpdate();
                                            }}
                                    >
                                        ${entity}
                                    </div>
                                `)}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    private _renderIconPicker(label: string, path: string[], value?: string, helper?: string) {
        const t = this._getT();

        return html`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? html`<div class="info-text">${helper}</div>` : ''}
                </div>
                <div class="option-control">
                    <ha-icon-picker
                            .hass=${this.hass}
                            .value=${value || ''}
                            .label=${t.editor.select_icon}
                            @value-changed=${(ev: any) => {
                                ev.stopPropagation();
                                if (!this._config) return;
                                const newValue = ev.detail?.value || '';
                                const newConfig = JSON.parse(JSON.stringify(this._config));
                                let current: any = newConfig;
                                for (let i = 0; i < path.length - 1; i++) {
                                    if (!current[path[i]]) current[path[i]] = {};
                                    current = current[path[i]];
                                }
                                if (newValue === '') {
                                    delete current[path[path.length - 1]];
                                } else {
                                    current[path[path.length - 1]] = newValue;
                                }
                                this._config = newConfig;
                                this._fireEvent();
                            }}
                    ></ha-icon-picker>
                </div>
            </div>
        `;
    }

    private _renderLanguageSelector() {
        const t = this._getT();
        const currentLang = this._config?.language || detectLanguage();

        return html`
            <div class="option">
                <div class="option-label">
                    ${t.editor.language}
                    <div class="info-text">${t.editor.language_helper}</div>
                </div>
                <div class="option-control">
                    <ha-combo-box
                            .value=${currentLang}
                            .items=${[
                                { value: 'de', label: 'Deutsch' },
                                { value: 'en', label: 'English' },
                                { value: 'fr', label: 'Français' },
                                { value: 'it', label: 'Italiano' },
                                { value: 'es', label: 'Español' }
                            ]}
                            item-value-path="value"
                            item-label-path="label"
                            @value-changed=${(ev: any) => {
                                if (!this._config) return;
                                const newValue = ev.detail?.value;

                                // Ignore if no value or same value
                                if (!newValue || newValue === this._config.language) return;

                                // Update config
                                const newConfig = { ...this._config };
                                newConfig.language = newValue as SupportedLanguage;
                                this._config = newConfig;

                                // Fire event and re-render
                                this._fireEvent();
                                this.requestUpdate();
                            }}
                    ></ha-combo-box>
                </div>
            </div>
        `;
    }

    private _renderThemeSelector() {
        const t = this._getT();
        const allThemes = getAllThemes();
        const themeItems = allThemes.map(theme => ({
            value: theme.id,
            label: theme.name
        }));

        return html`
            <div class="option">
                <div class="option-label">
                    ${t.editor.theme}
                    <div class="info-text">${t.editor.theme_helper}</div>
                </div>
                <div class="option-control">
                    <ha-combo-box
                            .value=${this._config?.theme || ''}
                            .items=${themeItems}
                            item-value-path="value"
                            item-label-path="label"
                            allow-custom-value
                            @value-changed=${(ev: any) => {
                                if (!this._config) return;
                                const newValue = ev.detail?.value;

                                const newConfig = { ...this._config };
                                if (!newValue || newValue === '') {
                                    delete newConfig.theme;
                                } else {
                                    newConfig.theme = newValue;
                                }
                                this._config = newConfig;

                                this._fireEvent();
                                this.requestUpdate();
                            }}
                    ></ha-combo-box>
                </div>
            </div>
        `;
    }

    private _renderGeneralTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'entities',
                    'mdi:link-variant',
                    t.editor.central_entities,
                    html`
                        ${this._renderEntityPicker(t.editor.entity_pv_production, ['entities', 'pv_production'], this._config?.entities?.pv_production, t.editor.entity_pv_production_helper, true)}
                        ${this._renderEntityPicker(t.editor.entity_battery_soc, ['entities', 'battery_soc'], this._config?.entities?.battery_soc, t.editor.entity_battery_soc_helper)}
                        ${this._renderEntityPicker(t.editor.entity_battery_charge, ['entities', 'battery_charge'], this._config?.entities?.battery_charge, t.editor.entity_battery_charge_helper)}
                        ${this._renderEntityPicker(t.editor.entity_battery_discharge, ['entities', 'battery_discharge'], this._config?.entities?.battery_discharge, t.editor.entity_battery_discharge_helper)}
                        ${this._renderEntityPicker(t.editor.entity_house_consumption, ['entities', 'house_consumption'], this._config?.entities?.house_consumption, t.editor.entity_house_consumption_helper, true)}
                        ${this._renderEntityPicker(t.editor.entity_grid_power, ['entities', 'grid_power'], this._config?.entities?.grid_power, t.editor.entity_grid_power_helper, true)}
                    `,
                    t.editor.central_entities_helper
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'config',
                    'mdi:cog',
                    t.editor.central_config,
                    html`
                        ${this._renderNumberfield(t.editor.pv_max_power_label, ['pv_max_power'], this._config?.pv_max_power, 0, 100000, 100, t.editor.pv_max_power_helper)}
                        ${this._renderNumberfield(t.editor.battery_capacity_label, ['battery_capacity'], this._config?.battery_capacity, 0, 100000, 100, t.editor.battery_capacity_label_helper)}
                        ${this._renderNumberfield(t.editor.grid_threshold_label, ['grid_threshold'], this._config?.grid_threshold, 0, 1000, 10, t.editor.grid_threshold_helper)}
                    `,
                    t.editor.central_config_helper
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'visibility',
                    'mdi:eye',
                    t.editor.card_visibility,
                    html`
                        ${this._renderSwitch(t.editor.show_pv_card, ['pv', 'show'], this._config?.pv?.show !== false)}
                        ${this._renderSwitch(t.editor.show_battery_card, ['batterie', 'show'], this._config?.batterie?.show !== false)}
                        ${this._renderSwitch(t.editor.show_house_card, ['haus', 'show'], this._config?.haus?.show !== false)}
                        ${this._renderSwitch(t.editor.show_grid_card, ['netz', 'show'], this._config?.netz?.show !== false)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'header',
                    'mdi:card-text',
                    t.editor.card_header,
                    html`
                        ${this._renderTextfield(t.editor.title, ['title'], this._config?.title, t.editor.title_placeholder, t.editor.title_helper)}
                        ${this._renderTextfield(t.editor.subtitle, ['subtitle'], this._config?.subtitle, t.editor.subtitle_placeholder, t.editor.subtitle_helper)}
                        ${this._renderIconPicker(t.editor.icon, ['icon'], this._config?.icon, t.editor.icon_helper)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'language',
                    'mdi:translate',
                    t.editor.language,
                    html`${this._renderLanguageSelector()}`
            )}
        `;
    }

    private _renderInfoBarTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'infobar_main',
                    'mdi:information',
                    t.editor.infobar_settings,
                    html`
                        ${this._renderSwitch(t.editor.enable_infobar, ['info_bar', 'show'], this._config?.info_bar?.show)}

                        ${this._config?.info_bar?.show ? html`
                            <div class="option">
                                <div class="option-label">${t.editor.infobar_position}</div>
                                <div class="option-control">
                                    <ha-combo-box
                                            .value=${this._config?.info_bar?.position || 'top'}
                                            .items=${[
                                                { value: 'top', label: t.editor.position_top },
                                                { value: 'bottom', label: t.editor.position_bottom }
                                            ]}
                                            item-value-path="value"
                                            item-label-path="label"
                                            @value-changed=${(ev: any) => {
                                                if (!this._config) return;
                                                const newValue = ev.detail?.value;
                                                if (!newValue) return;
                                                const newConfig = { ...this._config };
                                                if (!newConfig.info_bar) newConfig.info_bar = {};
                                                newConfig.info_bar.position = newValue;
                                                this._config = newConfig;
                                                this._fireEvent();
                                            }}
                                    ></ha-combo-box>
                                </div>
                            </div>
                        ` : ''}
                    `
            )}

            ${this._config?.info_bar?.show ? html`
                <div class="divider"></div>

                ${this._renderTapActions('info_bar')}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
                        'infobar_calculation',
                        'mdi:calculator',
                        t.editor.calculation_mode,
                        html`
                            <div class="option">
                                <div class="option-label">${t.editor.calculation_mode}</div>
                                <div class="option-control">
                                    <ha-combo-box
                                            .value=${this._config?.info_bar?.calculation_mode || 'autarky'}
                                            .items=${[
                                                { value: 'autarky', label: t.editor.mode_autarky },
                                                { value: 'self_consumption', label: t.editor.mode_self_consumption }
                                            ]}
                                            item-value-path="value"
                                            item-label-path="label"
                                            @value-changed=${(ev: any) => {
                                                if (!this._config) return;
                                                const newValue = ev.detail?.value;
                                                if (!newValue) return;
                                                const newConfig = { ...this._config };
                                                if (!newConfig.info_bar) newConfig.info_bar = {};
                                                newConfig.info_bar.calculation_mode = newValue;
                                                this._config = newConfig;
                                                this._fireEvent();
                                            }}
                                    ></ha-combo-box>
                                </div>
                            </div>

                            ${this._renderSwitch(t.editor.calculate_battery_times, ['info_bar', 'calculate_battery_times'], this._config?.info_bar?.calculate_battery_times, t.editor.calculate_battery_times_helper)}
                        `,
                        t.editor.calculation_mode_helper
                )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
                        'infobar_item1',
                        'mdi:numeric-1-box',
                        `${t.editor.item} 1`,
                        html`
                            ${this._renderEntityPicker(t.editor.entity, ['info_bar', 'item1', 'entity'], this._config?.info_bar?.item1?.entity)}
                            ${this._renderIconPicker(t.editor.icon_label, ['info_bar', 'item1', 'icon'], this._config?.info_bar?.item1?.icon)}
                            ${this._renderTextfield(t.editor.label, ['info_bar', 'item1', 'label'], this._config?.info_bar?.item1?.label, t.editor.default_autarky)}
                            ${this._renderTextfield(t.editor.unit, ['info_bar', 'item1', 'unit'], this._config?.info_bar?.item1?.unit, '%')}
                        `
                )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
                        'infobar_item2',
                        'mdi:numeric-2-box',
                        `${t.editor.item} 2`,
                        html`
                            ${this._renderEntityPicker(t.editor.entity, ['info_bar', 'item2', 'entity'], this._config?.info_bar?.item2?.entity)}
                            ${this._renderIconPicker(t.editor.icon_label, ['info_bar', 'item2', 'icon'], this._config?.info_bar?.item2?.icon)}
                            ${this._renderTextfield(t.editor.label, ['info_bar', 'item2', 'label'], this._config?.info_bar?.item2?.label, t.editor.default_runtime)}
                            ${this._renderTextfield(t.editor.unit, ['info_bar', 'item2', 'unit'], this._config?.info_bar?.item2?.unit)}
                        `
                )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
                        'infobar_item3',
                        'mdi:numeric-3-box',
                        `${t.editor.item} 3`,
                        html`
                            ${this._renderEntityPicker(t.editor.entity, ['info_bar', 'item3', 'entity'], this._config?.info_bar?.item3?.entity)}
                            ${this._renderIconPicker(t.editor.icon_label, ['info_bar', 'item3', 'icon'], this._config?.info_bar?.item3?.icon)}
                            ${this._renderTextfield(t.editor.label, ['info_bar', 'item3', 'label'], this._config?.info_bar?.item3?.label, t.editor.default_chargetime)}
                            ${this._renderTextfield(t.editor.unit, ['info_bar', 'item3', 'unit'], this._config?.info_bar?.item3?.unit)}
                        `
                )}
            ` : ''}
        `;
    }

    private _renderPVTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'pv_main',
                    'mdi:solar-panel',
                    t.editor.pv_system,
                    html`
                        ${this._renderIconPicker(t.editor.icon_label, ['pv', 'icon'], this._config?.pv?.icon)}
                        ${this._renderSwitch(t.editor.enable_animation, ['pv', 'animation'], this._config?.pv?.animation)}
                        ${this._renderAnimationSelector('pv', this._config?.pv?.animation, this._config?.pv?.animation_style)}
                        ${this._renderSwitch(t.editor.icon_rotation, ['pv', 'icon_rotation'], this._config?.pv?.icon_rotation, t.editor.icon_rotation_helper)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'pv_texts',
                    'mdi:text',
                    t.editor.additional_texts,
                    html`
                        ${this._renderEntityPicker(t.editor.secondary_entity, ['pv', 'secondary_entity'], this._config?.pv?.secondary_entity, t.editor.secondary_entity_helper)}
                        ${this._renderTextfield(t.editor.secondary_text, ['pv', 'secondary_text'], this._config?.pv?.secondary_text, '', t.editor.secondary_text_helper)}
                        ${this._renderEntityPicker(t.editor.tertiary_entity, ['pv', 'tertiary_entity'], this._config?.pv?.tertiary_entity)}
                        ${this._renderTextfield(t.editor.tertiary_text, ['pv', 'tertiary_text'], this._config?.pv?.tertiary_text)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderTapActions('pv')}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'pv_styling',
                    'mdi:palette',
                    t.editor.styling,
                    html`
                        ${this._renderColorPicker(t.editor.background_color, ['pv', 'style', 'background_color'], this._config?.pv?.style?.background_color, 'rgba(21, 20, 27, 1)')}
                        ${this._renderColorPicker(t.editor.border_color, ['pv', 'style', 'border_color'], this._config?.pv?.style?.border_color, 'rgba(255, 255, 255, 0.1)')}
                        ${this._renderColorPicker(t.editor.primary_color, ['pv', 'style', 'primary_color'], this._config?.pv?.style?.primary_color)}
                        ${this._renderColorPicker(t.editor.secondary_color, ['pv', 'style', 'secondary_color'], this._config?.pv?.style?.secondary_color)}
                        ${this._renderColorPicker(t.editor.icon_color, ['pv', 'style', 'icon_color'], this._config?.pv?.style?.icon_color)}
                    `
            )}
        `;
    }

    private _renderBatteryTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'battery_main',
                    'mdi:battery',
                    t.editor.battery,
                    html`
                        ${this._renderIconPicker(t.editor.icon_label, ['batterie', 'icon'], this._config?.batterie?.icon, t.editor.icon_auto_helper)}
                        ${this._renderSwitch(t.editor.enable_animation, ['batterie', 'animation'], this._config?.batterie?.animation)}
                        ${this._renderAnimationSelector('batterie', this._config?.batterie?.animation, this._config?.batterie?.animation_style)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'battery_texts',
                    'mdi:text',
                    t.editor.additional_texts,
                    html`
                        ${this._renderEntityPicker(t.editor.secondary_entity, ['batterie', 'secondary_entity'], this._config?.batterie?.secondary_entity)}
                        ${this._renderTextfield(t.editor.secondary_text, ['batterie', 'secondary_text'], this._config?.batterie?.secondary_text)}
                        ${this._renderEntityPicker(t.editor.tertiary_entity, ['batterie', 'tertiary_entity'], this._config?.batterie?.tertiary_entity)}
                        ${this._renderTextfield(t.editor.tertiary_text, ['batterie', 'tertiary_text'], this._config?.batterie?.tertiary_text)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderTapActions('batterie')}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'battery_styling',
                    'mdi:palette',
                    t.editor.styling,
                    html`
                        ${this._renderColorPicker(t.editor.background_color, ['batterie', 'style', 'background_color'], this._config?.batterie?.style?.background_color)}
                        ${this._renderColorPicker(t.editor.border_color, ['batterie', 'style', 'border_color'], this._config?.batterie?.style?.border_color)}
                        ${this._renderColorPicker(t.editor.primary_color, ['batterie', 'style', 'primary_color'], this._config?.batterie?.style?.primary_color)}
                        ${this._renderColorPicker(t.editor.secondary_color, ['batterie', 'style', 'secondary_color'], this._config?.batterie?.style?.secondary_color)}
                        ${this._renderColorPicker(t.editor.icon_color, ['batterie', 'style', 'icon_color'], this._config?.batterie?.style?.icon_color)}
                    `
            )}
        `;
    }

    private _renderHouseTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'house_main',
                    'mdi:home',
                    t.editor.house_consumption,
                    html`
                        ${this._renderIconPicker(t.editor.icon_label, ['haus', 'icon'], this._config?.haus?.icon)}
                        ${this._renderSwitch(t.editor.enable_animation, ['haus', 'animation'], this._config?.haus?.animation)}
                        ${this._renderAnimationSelector('haus', this._config?.haus?.animation, this._config?.haus?.animation_style)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'house_texts',
                    'mdi:text',
                    t.editor.additional_texts,
                    html`
                        ${this._renderSwitch(t.editor.show_consumer_total_in_house, ['haus', 'show_consumer_total'], this._config?.haus?.show_consumer_total, t.editor.show_consumer_total_helper)}
                        ${this._renderEntityPicker(t.editor.secondary_entity, ['haus', 'secondary_entity'], this._config?.haus?.secondary_entity)}
                        ${this._renderTextfield(t.editor.secondary_text, ['haus', 'secondary_text'], this._config?.haus?.secondary_text)}
                        ${this._renderEntityPicker(t.editor.tertiary_entity, ['haus', 'tertiary_entity'], this._config?.haus?.tertiary_entity)}
                        ${this._renderTextfield(t.editor.tertiary_text, ['haus', 'tertiary_text'], this._config?.haus?.tertiary_text)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderTapActions('haus')}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'house_styling',
                    'mdi:palette',
                    t.editor.styling,
                    html`
                        ${this._renderColorPicker(t.editor.background_color, ['haus', 'style', 'background_color'], this._config?.haus?.style?.background_color)}
                        ${this._renderColorPicker(t.editor.border_color, ['haus', 'style', 'border_color'], this._config?.haus?.style?.border_color)}
                        ${this._renderColorPicker(t.editor.primary_color, ['haus', 'style', 'primary_color'], this._config?.haus?.style?.primary_color)}
                        ${this._renderColorPicker(t.editor.secondary_color, ['haus', 'style', 'secondary_color'], this._config?.haus?.style?.secondary_color)}
                        ${this._renderColorPicker(t.editor.icon_color, ['haus', 'style', 'icon_color'], this._config?.haus?.style?.icon_color)}
                    `
            )}
        `;
    }

    private _renderGridTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'grid_main',
                    'mdi:transmission-tower',
                    t.editor.grid,
                    html`
                        ${this._renderIconPicker(t.editor.icon_label, ['netz', 'icon'], this._config?.netz?.icon)}
                        ${this._renderSwitch(t.editor.enable_animation, ['netz', 'animation'], this._config?.netz?.animation)}
                        ${this._renderAnimationSelector('netz', this._config?.netz?.animation, this._config?.netz?.animation_style)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'grid_status',
                    'mdi:text-box',
                    t.editor.status_texts,
                    html`
                        ${this._renderTextfield(t.editor.text_feed_in, ['netz', 'text_einspeisen'], this._config?.netz?.text_einspeisen, t.editor.text_feed_in_placeholder)}
                        ${this._renderTextfield(t.editor.text_neutral, ['netz', 'text_neutral'], this._config?.netz?.text_neutral, t.editor.text_neutral_placeholder)}
                        ${this._renderTextfield(t.editor.text_consumption, ['netz', 'text_bezug'], this._config?.netz?.text_bezug, t.editor.text_consumption_placeholder)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'grid_texts',
                    'mdi:text',
                    t.editor.additional_texts,
                    html`
                        ${this._renderEntityPicker(t.editor.secondary_entity, ['netz', 'secondary_entity'], this._config?.netz?.secondary_entity)}
                        ${this._renderTextfield(t.editor.secondary_text, ['netz', 'secondary_text'], this._config?.netz?.secondary_text)}
                        ${this._renderEntityPicker(t.editor.tertiary_entity, ['netz', 'tertiary_entity'], this._config?.netz?.tertiary_entity)}
                        ${this._renderTextfield(t.editor.tertiary_text, ['netz', 'tertiary_text'], this._config?.netz?.tertiary_text)}
                    `
            )}

            <div class="divider"></div>

            ${this._renderTapActions('netz')}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'grid_styling',
                    'mdi:palette',
                    t.editor.styling,
                    html`
                        ${this._renderColorPicker(t.editor.background_color, ['netz', 'style', 'background_color'], this._config?.netz?.style?.background_color)}
                        ${this._renderColorPicker(t.editor.border_color, ['netz', 'style', 'border_color'], this._config?.netz?.style?.border_color)}
                        ${this._renderColorPicker(t.editor.primary_color, ['netz', 'style', 'primary_color'], this._config?.netz?.style?.primary_color)}
                        ${this._renderColorPicker(t.editor.secondary_color, ['netz', 'style', 'secondary_color'], this._config?.netz?.style?.secondary_color)}
                        ${this._renderColorPicker(t.editor.icon_color, ['netz', 'style', 'icon_color'], this._config?.netz?.style?.icon_color)}
                    `
            )}
        `;
    }

    private _renderConsumersTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'consumers_main',
                    'mdi:flash',
                    t.editor.consumers_settings,
                    html`
                        ${this._renderSwitch(t.editor.enable_consumers, ['consumers', 'show'], this._config?.consumers?.show)}

                        ${this._config?.consumers?.show ? html`
                            <div class="option">
                                <div class="option-label">${t.editor.consumers_position}</div>
                                <div class="option-control">
                                    <ha-combo-box
                                            .value=${this._config?.consumers?.position || 'bottom'}
                                            .items=${[
                                                { value: 'bottom', label: t.editor.position_bottom }
                                            ]}
                                            item-value-path="value"
                                            item-label-path="label"
                                            @value-changed=${(ev: any) => {
                                                if (!this._config) return;
                                                const newValue = ev.detail?.value;
                                                if (!newValue) return;
                                                const newConfig = { ...this._config };
                                                if (!newConfig.consumers) newConfig.consumers = {};
                                                newConfig.consumers.position = newValue;
                                                this._config = newConfig;
                                                this._fireEvent();
                                            }}
                                    ></ha-combo-box>
                                </div>
                            </div>

                            <div class="option">
                                <div class="option-label">${t.editor.consumers_sort_mode}</div>
                                <div class="option-control">
                                    <ha-combo-box
                                            .value=${this._config?.consumers?.sort_mode || 'highest_first'}
                                            .items=${[
                                                { value: 'highest_first', label: t.editor.sort_highest_first },
                                                { value: 'lowest_first', label: t.editor.sort_lowest_first },
                                                { value: 'none', label: t.editor.sort_none },
                                                { value: 'alpha_asc', label: t.editor.sort_alpha_asc },
                                                { value: 'alpha_desc', label: t.editor.sort_alpha_desc }
                                            ]}
                                            item-value-path="value"
                                            item-label-path="label"
                                            @value-changed=${(ev: any) => {
                                                if (!this._config) return;
                                                const newValue = ev.detail?.value;
                                                if (!newValue) return;
                                                const newConfig = { ...this._config };
                                                if (!newConfig.consumers) newConfig.consumers = {};
                                                newConfig.consumers.sort_mode = newValue;
                                                this._config = newConfig;
                                                this._fireEvent();
                                            }}
                                    ></ha-combo-box>
                                </div>
                            </div>

                            ${this._renderNumberfield(t.editor.consumers_threshold, ['consumers', 'threshold'], this._config?.consumers?.threshold, 0, 10000, 1, t.editor.consumers_threshold_helper)}
                        ` : ''}
                    `
            )}

            ${this._config?.consumers?.show ? html`
                <div class="divider"></div>

                ${this._renderCollapsibleSection(
                        'consumers_items',
                        'mdi:format-list-bulleted',
                        t.editor.add_consumer,
                        html`
                            ${(this._config?.consumers?.items || []).map((item, index) => {
                                const isExpanded = this._expandedConsumerIndex === index;
                                const entityLabel = item.entity || t.editor.consumer_entity;

                                return html`
                                    <div class="consumer-section">
                                        <div class="consumer-header" @click=${() => this._toggleConsumer(index)}>
                                            <div class="consumer-title">
                                                <ha-icon
                                                        class="expand-icon ${isExpanded ? 'expanded' : ''}"
                                                        icon="mdi:chevron-down"
                                                ></ha-icon>
                                                <span class="consumer-title-text">
                                                ${t.editor.consumer_entity} ${index + 1}
                                                ${item.entity ? html` <span style="opacity: 0.6; font-weight: normal; font-size: 0.9em;">(${entityLabel})</span>` : ''}
                                            </span>
                                            </div>
                                            <div class="consumer-header-actions" @click=${(e: Event) => e.stopPropagation()}>
                                                ${index > 0 ? html`
                                                    <ha-icon-button
                                                            .path=${'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z'}
                                                            @click=${() => this._moveConsumerUp(index)}
                                                            title="Nach oben"
                                                    ></ha-icon-button>
                                                ` : ''}
                                                ${index < (this._config?.consumers?.items?.length || 0) - 1 ? html`
                                                    <ha-icon-button
                                                            .path=${'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'}
                                                            @click=${() => this._moveConsumerDown(index)}
                                                            title="Nach unten"
                                                    ></ha-icon-button>
                                                ` : ''}
                                                <ha-icon-button
                                                        .path=${'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'}
                                                        @click=${() => this._duplicateConsumer(index)}
                                                        title="Duplizieren"
                                                        style="color: rgba(33, 150, 243, 1);"
                                                ></ha-icon-button>
                                                <ha-icon-button
                                                        .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'}
                                                        @click=${() => this._removeConsumer(index)}
                                                        title="Löschen"
                                                        style="color: rgba(244,67,54,1);"
                                                ></ha-icon-button>
                                            </div>
                                        </div>

                                        <div class="consumer-content ${isExpanded ? '' : 'collapsed'}">
                                            ${this._renderEntityPicker(t.editor.consumer_entity, ['consumers', 'items', index.toString(), 'entity'], item.entity, undefined, true)}
                                            ${this._renderIconPicker(t.editor.consumer_icon, ['consumers', 'items', index.toString(), 'icon'], item.icon)}
                                            ${this._renderTextfield(t.editor.consumer_label, ['consumers', 'items', index.toString(), 'label'], item.label)}
                                            ${this._renderNumberfield(t.editor.consumer_threshold, ['consumers', 'items', index.toString(), 'threshold'], item.threshold, 0, 10000, 1)}
                                            ${this._renderSwitch(t.editor.consumer_auto_color, ['consumers', 'items', index.toString(), 'auto_color'], item.auto_color !== false, t.editor.consumer_auto_color_helper)}

                                            <!-- Additional Texts Subsection -->
                                            <div class="consumer-subsection">
                                                <div class="consumer-subsection-header" @click=${() => this._toggleConsumerSubsection(index, 'texts')}>
                                                    <ha-icon icon="mdi:text"></ha-icon>
                                                    ${t.editor.additional_texts}
                                                    <ha-icon
                                                            class="expand-icon ${this._isConsumerSubsectionExpanded(index, 'texts') ? 'expanded' : ''}"
                                                            icon="mdi:chevron-down"
                                                            style="margin-left: auto;"
                                                    ></ha-icon>
                                                </div>
                                                <div class="consumer-subsection-content ${this._isConsumerSubsectionExpanded(index, 'texts') ? '' : 'collapsed'}">
                                                    ${this._renderSwitch(t.editor.consumer_show_primary, ['consumers', 'items', index.toString(), 'show_primary'], item.show_primary !== false)}
                                                    ${this._renderEntityPicker(t.editor.consumer_primary_entity, ['consumers', 'items', index.toString(), 'primary_entity'], item.primary_entity)}
                                                    ${this._renderTextfield(t.editor.consumer_primary_text, ['consumers', 'items', index.toString(), 'primary_text'], item.primary_text)}

                                                    ${this._renderSwitch(t.editor.consumer_show_secondary, ['consumers', 'items', index.toString(), 'show_secondary'], item.show_secondary !== false)}
                                                    ${this._renderEntityPicker(t.editor.consumer_secondary_entity, ['consumers', 'items', index.toString(), 'secondary_entity'], item.secondary_entity)}
                                                    ${this._renderTextfield(t.editor.consumer_secondary_text, ['consumers', 'items', index.toString(), 'secondary_text'], item.secondary_text)}
                                                </div>
                                            </div>

                                            <!-- Tap Actions Subsection -->
                                            <div class="consumer-subsection">
                                                <div class="consumer-subsection-header" @click=${() => this._toggleConsumerSubsection(index, 'actions')}>
                                                    <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                                    ${t.editor.consumer_tap_actions}
                                                    <ha-icon
                                                            class="expand-icon ${this._isConsumerSubsectionExpanded(index, 'actions') ? 'expanded' : ''}"
                                                            icon="mdi:chevron-down"
                                                            style="margin-left: auto;"
                                                    ></ha-icon>
                                                </div>
                                                <div class="consumer-subsection-content ${this._isConsumerSubsectionExpanded(index, 'actions') ? '' : 'collapsed'}">
                                                    ${this._renderEntityPicker(t.editor.consumer_switch_entity, ['consumers', 'items', index.toString(), 'switch_entity'], item.switch_entity, t.editor.consumer_switch_entity_helper)}
                                                    ${this._renderActionSelector('Tap Action', ['consumers', 'items', index.toString(), 'tap_action'], item.tap_action)}
                                                    ${this._renderActionSelector('Double Tap', ['consumers', 'items', index.toString(), 'double_tap_action'], item.double_tap_action)}
                                                    ${this._renderActionSelector('Hold Action', ['consumers', 'items', index.toString(), 'hold_action'], item.hold_action)}
                                                </div>
                                            </div>

                                            <!-- Styling Subsection -->
                                            <div class="consumer-subsection">
                                                <div class="consumer-subsection-header" @click=${() => this._toggleConsumerSubsection(index, 'styling')}>
                                                    <ha-icon icon="mdi:palette"></ha-icon>
                                                    ${t.editor.consumer_item_styling}
                                                    <ha-icon
                                                            class="expand-icon ${this._isConsumerSubsectionExpanded(index, 'styling') ? 'expanded' : ''}"
                                                            icon="mdi:chevron-down"
                                                            style="margin-left: auto;"
                                                    ></ha-icon>
                                                </div>
                                                <div class="consumer-subsection-content ${this._isConsumerSubsectionExpanded(index, 'styling') ? '' : 'collapsed'}">
                                                    ${this._renderTextfield(t.editor.icon_size, ['consumers', 'items', index.toString(), 'style', 'icon_size'], item.style?.icon_size, '1.5em')}
                                                    ${this._renderColorPicker(t.editor.icon_color, ['consumers', 'items', index.toString(), 'style', 'icon_color'], item.style?.icon_color)}
                                                    ${this._renderTextfield(t.editor.icon_opacity, ['consumers', 'items', index.toString(), 'style', 'icon_opacity'], item.style?.icon_opacity, '1')}
                                                    ${this._renderTextfield(t.editor.primary_size, ['consumers', 'items', index.toString(), 'style', 'primary_size'], item.style?.primary_size, '1em')}
                                                    ${this._renderColorPicker(t.editor.primary_color_label, ['consumers', 'items', index.toString(), 'style', 'primary_color'], item.style?.primary_color, 'white')}
                                                    ${this._renderTextfield(t.editor.primary_opacity, ['consumers', 'items', index.toString(), 'style', 'primary_opacity'], item.style?.primary_opacity, '1')}
                                                    ${this._renderTextfield(t.editor.primary_font_weight, ['consumers', 'items', index.toString(), 'style', 'primary_font_weight'], item.style?.primary_font_weight, 'bold')}
                                                    ${this._renderTextfield(t.editor.secondary_size, ['consumers', 'items', index.toString(), 'style', 'secondary_size'], item.style?.secondary_size, '0.8em')}
                                                    ${this._renderColorPicker(t.editor.secondary_color_label, ['consumers', 'items', index.toString(), 'style', 'secondary_color'], item.style?.secondary_color, 'white')}
                                                    ${this._renderTextfield(t.editor.secondary_opacity, ['consumers', 'items', index.toString(), 'style', 'secondary_opacity'], item.style?.secondary_opacity, '0.7')}
                                                    ${this._renderTextfield(t.editor.secondary_font_weight, ['consumers', 'items', index.toString(), 'style', 'secondary_font_weight'], item.style?.secondary_font_weight, 'normal')}
                                                    ${this._renderColorPicker(t.editor.background_color, ['consumers', 'items', index.toString(), 'style', 'background_color'], item.style?.background_color)}
                                                    ${this._renderColorPicker(t.editor.border_color, ['consumers', 'items', index.toString(), 'style', 'border_color'], item.style?.border_color)}
                                                    ${this._renderTextfield(t.editor.border_radius, ['consumers', 'items', index.toString(), 'style', 'border_radius'], item.style?.border_radius, '12px')}
                                                    ${this._renderTextfield(t.editor.padding, ['consumers', 'items', index.toString(), 'style', 'padding'], item.style?.padding, '8px')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            })}

                            <ha-button @click=${this._addConsumer}>
                                <ha-icon icon="mdi:plus"></ha-icon>
                                ${t.editor.add_consumer}
                            </ha-button>
                        `
                )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
                        'consumers_styling',
                        'mdi:palette',
                        `${t.editor.styling} (Global)`,
                        html`
                            ${this._renderTextfield(t.editor.grid_gap, ['consumers', 'style', 'gap'], this._config?.consumers?.style?.gap, '6px')}
                            ${this._renderColorPicker(t.editor.background_color, ['consumers', 'style', 'item_background_color'], this._config?.consumers?.style?.item_background_color, 'rgba(21, 20, 27, 1)')}
                            ${this._renderColorPicker(t.editor.border_color, ['consumers', 'style', 'item_border_color'], this._config?.consumers?.style?.item_border_color, 'rgba(255, 255, 255, 0.1)')}
                            ${this._renderTextfield(t.editor.border_radius, ['consumers', 'style', 'item_border_radius'], this._config?.consumers?.style?.item_border_radius, '12px')}
                            ${this._renderTextfield(t.editor.padding, ['consumers', 'style', 'item_padding'], this._config?.consumers?.style?.item_padding, '8px')}
                            ${this._renderTextfield(t.editor.icon_size, ['consumers', 'style', 'icon_size'], this._config?.consumers?.style?.icon_size, '1.5em')}
                            ${this._renderTextfield(t.editor.icon_opacity, ['consumers', 'style', 'icon_opacity'], this._config?.consumers?.style?.icon_opacity, '1')}
                            ${this._renderTextfield(t.editor.primary_size, ['consumers', 'style', 'primary_size'], this._config?.consumers?.style?.primary_size, '1em')}
                            ${this._renderTextfield(t.editor.primary_font_weight, ['consumers', 'style', 'primary_font_weight'], this._config?.consumers?.style?.primary_font_weight, 'bold')}
                            ${this._renderTextfield(t.editor.primary_opacity, ['consumers', 'style', 'primary_opacity'], this._config?.consumers?.style?.primary_opacity, '1')}
                            ${this._renderTextfield(t.editor.secondary_size, ['consumers', 'style', 'secondary_size'], this._config?.consumers?.style?.secondary_size, '0.8em')}
                            ${this._renderTextfield(t.editor.secondary_font_weight, ['consumers', 'style', 'secondary_font_weight'], this._config?.consumers?.style?.secondary_font_weight, 'normal')}
                            ${this._renderTextfield(t.editor.secondary_opacity, ['consumers', 'style', 'secondary_opacity'], this._config?.consumers?.style?.secondary_opacity, '0.7')}
                        `
                )}
            ` : ''}
        `;
    }

    private _addConsumer() {
        if (!this._config) return;

        const newConfig = JSON.parse(JSON.stringify(this._config));
        if (!newConfig.consumers) newConfig.consumers = { items: [] };
        if (!newConfig.consumers.items) newConfig.consumers.items = [];

        newConfig.consumers.items.push({
            entity: '',
            auto_color: true
        });

        this._config = newConfig;
        this._expandedConsumerIndex = newConfig.consumers.items.length - 1;
        this._fireEvent();
    }

    private _duplicateConsumer(index: number) {
        if (!this._config || !this._config.consumers?.items) return;

        const newConfig = JSON.parse(JSON.stringify(this._config));
        const itemToDuplicate = JSON.parse(JSON.stringify(newConfig.consumers.items[index]));

        // Insert duplicate right after the original
        newConfig.consumers.items.splice(index + 1, 0, itemToDuplicate);

        this._config = newConfig;
        this._expandedConsumerIndex = index + 1;
        this._fireEvent();
    }

    private _moveConsumerUp(index: number) {
        if (!this._config || !this._config.consumers?.items || index === 0) return;

        const newConfig = JSON.parse(JSON.stringify(this._config));
        const items = newConfig.consumers.items;

        // Swap with previous item
        [items[index - 1], items[index]] = [items[index], items[index - 1]];

        this._config = newConfig;

        // Update expanded index if needed
        if (this._expandedConsumerIndex === index) {
            this._expandedConsumerIndex = index - 1;
        } else if (this._expandedConsumerIndex === index - 1) {
            this._expandedConsumerIndex = index;
        }

        this._fireEvent();
    }

    private _moveConsumerDown(index: number) {
        if (!this._config || !this._config.consumers?.items || index === this._config.consumers.items.length - 1) return;

        const newConfig = JSON.parse(JSON.stringify(this._config));
        const items = newConfig.consumers.items;

        // Swap with next item
        [items[index], items[index + 1]] = [items[index + 1], items[index]];

        this._config = newConfig;

        // Update expanded index if needed
        if (this._expandedConsumerIndex === index) {
            this._expandedConsumerIndex = index + 1;
        } else if (this._expandedConsumerIndex === index + 1) {
            this._expandedConsumerIndex = index;
        }

        this._fireEvent();
    }

    private _removeConsumer(index: number) {
        if (!this._config) return;

        const newConfig = JSON.parse(JSON.stringify(this._config));
        if (!newConfig.consumers?.items) return;

        newConfig.consumers.items.splice(index, 1);

        this._config = newConfig;
        if (this._expandedConsumerIndex === index) {
            this._expandedConsumerIndex = null;
        } else if (this._expandedConsumerIndex !== null && this._expandedConsumerIndex > index) {
            this._expandedConsumerIndex--;
        }
        this._fireEvent();
    }

    private _toggleConsumer(index: number) {
        if (this._expandedConsumerIndex === index) {
            this._expandedConsumerIndex = null;
        } else {
            this._expandedConsumerIndex = index;
        }
        this.requestUpdate();
    }

    private _toggleConsumerSubsection(consumerIndex: number, subsectionId: string) {
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

    private _isConsumerSubsectionExpanded(consumerIndex: number, subsectionId: string): boolean {
        const key = `consumer-${consumerIndex}`;
        return this._expandedConsumerSubsections.get(key)?.has(subsectionId) || false;
    }

    private _toggleSection(sectionId: string) {
        if (this._expandedSections.has(sectionId)) {
            this._expandedSections.delete(sectionId);
        } else {
            this._expandedSections.add(sectionId);
        }
        this.requestUpdate();
    }

    private _renderCollapsibleSection(
        sectionId: string,
        icon: string,
        title: string,
        content: any,
        infoText?: string
    ) {
        const isExpanded = this._expandedSections.has(sectionId);

        return html`
            <div class="section">
                <div class="section-header" @click=${() => this._toggleSection(sectionId)}>
                    <ha-icon icon="${icon}"></ha-icon>
                    ${title}
                    <ha-icon
                            class="expand-icon ${isExpanded ? 'expanded' : ''}"
                            icon="mdi:chevron-down"
                    ></ha-icon>
                </div>
                <div class="section-content ${isExpanded ? '' : 'collapsed'}">
                    ${infoText ? html`<div class="info-text" style="margin-bottom: 12px;">${infoText}</div>` : ''}
                    ${content}
                </div>
            </div>
        `;
    }

    private _renderStylingTab() {
        const t = this._getT();

        return html`
            ${this._renderCollapsibleSection(
                    'styling_theme',
                    'mdi:palette',
                    t.editor.theme,
                    html`
                        ${this._renderThemeSelector()}

                        <div class="divider" style="margin: 16px 0;"></div>

                        <div style="font-weight: 500; margin-bottom: 8px;">Theme Editor</div>
                        <div class="info-text" style="margin-bottom: 12px;">Passe alle Farben des Themes an. Ändert nicht die Karten-spezifischen Styles.</div>

                        ${this._renderColorPicker(t.editor.background_color, ['style', 'card_background_color'], this._config?.style?.card_background_color, 'rgba(21, 20, 27, 1)')}
                        ${this._renderColorPicker(t.editor.border_color, ['style', 'card_border_color'], this._config?.style?.card_border_color, 'rgba(255, 255, 255, 0.1)')}
                        ${this._renderColorPicker(t.editor.text_color, ['style', 'card_text_color'], this._config?.style?.card_text_color, 'white')}
                        ${this._renderTextfield(t.editor.border_radius, ['style', 'card_border_radius'], this._config?.style?.card_border_radius, '16px')}
                        ${this._renderTextfield(t.editor.padding, ['style', 'card_padding'], this._config?.style?.card_padding, '12px')}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t.editor.title_color, ['style', 'title_color'], this._config?.style?.title_color, 'white')}
                        ${this._renderTextfield(t.editor.title_size, ['style', 'title_size'], this._config?.style?.title_size, '1.5em')}
                        ${this._renderTextfield(t.editor.title_font_weight, ['style', 'title_font_weight'], this._config?.style?.title_font_weight, 'bold')}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t.editor.subtitle_color, ['style', 'subtitle_color'], this._config?.style?.subtitle_color)}
                        ${this._renderTextfield(t.editor.subtitle_size, ['style', 'subtitle_size'], this._config?.style?.subtitle_size, '1em')}
                        ${this._renderTextfield(t.editor.subtitle_font_weight, ['style', 'subtitle_font_weight'], this._config?.style?.subtitle_font_weight, 'normal')}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderTextfield(t.editor.icon_size, ['style', 'icon_size'], this._config?.style?.icon_size, '2em')}
                        ${this._renderTextfield(t.editor.icon_opacity, ['style', 'icon_opacity'], this._config?.style?.icon_opacity, '1')}
                        ${this._renderTextfield(t.editor.icon_margin, ['style', 'icon_margin'], this._config?.style?.icon_margin, '6px')}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t.editor.primary_color_label, ['style', 'primary_color'], this._config?.style?.primary_color, 'white')}
                        ${this._renderTextfield(t.editor.primary_size, ['style', 'primary_size'], this._config?.style?.primary_size, '1.2em')}
                        ${this._renderTextfield(t.editor.primary_opacity, ['style', 'primary_font_opacity'], this._config?.style?.primary_font_opacity, '1')}
                        ${this._renderTextfield(t.editor.primary_font_weight, ['style', 'primary_font_weight'], this._config?.style?.primary_font_weight, 'normal')}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t.editor.secondary_color_label, ['style', 'secondary_color'], this._config?.style?.secondary_color, 'white')}
                        ${this._renderTextfield(t.editor.secondary_size, ['style', 'secondary_size'], this._config?.style?.secondary_size, '0.9em')}
                        ${this._renderTextfield(t.editor.secondary_opacity, ['style', 'secondary_font_opacity'], this._config?.style?.secondary_font_opacity, '0.7')}
                        ${this._renderTextfield(t.editor.secondary_font_weight, ['style', 'secondary_font_weight'], this._config?.style?.secondary_font_weight, 'normal')}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t.editor.tertiary_color_label, ['style', 'tertiary_color'], this._config?.style?.tertiary_color, 'white')}
                        ${this._renderTextfield(t.editor.tertiary_size, ['style', 'tertiary_size'], this._config?.style?.tertiary_size, '0.9em')}
                        ${this._renderTextfield(t.editor.tertiary_opacity, ['style', 'tertiary_font_opacity'], this._config?.style?.tertiary_font_opacity, '0.7')}
                        ${this._renderTextfield(t.editor.tertiary_font_weight, ['style', 'tertiary_font_weight'], this._config?.style?.tertiary_font_weight, 'normal')}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'styling_header_background',
                    'mdi:rectangle',
                    t.editor.header_background,
                    html`
                        ${this._renderSwitch(t.editor.enable_header_background, ['style', 'header_background_enabled'], this._config?.style?.header_background_enabled, t.editor.enable_header_background_helper)}

                        ${this._config?.style?.header_background_enabled ? html`
                            <div class="option">
                                <div class="option-label">${t.editor.header_width}</div>
                                <div class="option-control">
                                    <ha-combo-box
                                            .value=${this._config?.style?.header_width || 'auto'}
                                            .items=${[
                                                { value: 'auto', label: t.editor.header_width_auto },
                                                { value: 'full', label: t.editor.header_width_full }
                                            ]}
                                            item-value-path="value"
                                            item-label-path="label"
                                            @value-changed=${(ev: any) => {
                                                if (!this._config) return;
                                                const newValue = ev.detail?.value;
                                                if (!newValue) return;
                                                const newConfig = { ...this._config };
                                                if (!newConfig.style) newConfig.style = {};
                                                newConfig.style.header_width = newValue;
                                                this._config = newConfig;
                                                this._fireEvent();
                                            }}
                                    ></ha-combo-box>
                                </div>
                            </div>

                            ${this._renderColorPicker(t.editor.header_background_color, ['style', 'header_background_color'], this._config?.style?.header_background_color, 'rgba(21, 20, 27, 1)')}
                            ${this._renderColorPicker(t.editor.header_border_color, ['style', 'header_border_color'], this._config?.style?.header_border_color, 'rgba(255, 255, 255, 0.1)')}
                            ${this._renderTextfield(t.editor.header_border_radius, ['style', 'header_border_radius'], this._config?.style?.header_border_radius, '16px')}
                            ${this._renderTextfield(t.editor.header_padding, ['style', 'header_padding'], this._config?.style?.header_padding, '12px')}
                            ${this._renderTextfield(t.editor.header_box_shadow, ['style', 'header_box_shadow'], this._config?.style?.header_box_shadow, '0 2px 8px 0 rgba(0, 0, 0, 0.15)')}
                        ` : ''}
                    `
            )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
                    'styling_layout',
                    'mdi:grid',
                    t.editor.layout,
                    html`
                        ${this._renderTextfield(t.editor.grid_gap, ['grid_gap'], this._config?.grid_gap, t.editor.grid_gap_placeholder, t.editor.grid_gap_helper)}
                        ${this._renderTextfield(t.editor.header_margin_bottom, ['style', 'header_margin_bottom'], this._config?.style?.header_margin_bottom, '12px', t.editor.header_margin_bottom_helper)}
                        ${this._renderTextfield(t.editor.infobar_gap, ['style', 'infobar_gap'], this._config?.style?.infobar_gap, '6px', t.editor.infobar_gap_helper)}
                        ${this._renderTextfield(t.editor.title_alignment, ['style', 'title_align'], this._config?.style?.title_align, 'center', t.editor.title_alignment_helper)}
                        ${this._renderTextfield(t.editor.subtitle_alignment, ['style', 'subtitle_align'], this._config?.style?.subtitle_align, 'center')}
                        ${this._renderTextfield(t.editor.cursor, ['style', 'card_cursor'], this._config?.style?.card_cursor, 'pointer')}
                    `
            )}
        `;
    }

    render() {
        if (!this._config) {
            return html``;
        }

        const t = this._getT();

        return html`
            <div class="card-config">
                <div class="tabs">
                    ${this._renderTab('general', t.editor.tab_general, 'mdi:cog')}
                    ${this._renderTab('styling', t.editor.tab_styling, 'mdi:palette')}
                    ${this._renderTab('infobar', t.editor.tab_infobar, 'mdi:information')}
                    ${this._renderTab('consumers', t.editor.tab_consumers, 'mdi:flash')}
                    ${this._renderTab('pv', t.editor.tab_pv, 'mdi:solar-panel')}
                    ${this._renderTab('battery', t.editor.tab_battery, 'mdi:battery')}
                    ${this._renderTab('house', t.editor.tab_house, 'mdi:home')}
                    ${this._renderTab('grid', t.editor.tab_grid, 'mdi:transmission-tower')}
                </div>

                <div class="tab-content ${this._activeTab === 'general' ? 'active' : ''}">
                    ${this._renderGeneralTab()}
                </div>

                <div class="tab-content ${this._activeTab === 'styling' ? 'active' : ''}">
                    ${this._renderStylingTab()}
                </div>

                <div class="tab-content ${this._activeTab === 'infobar' ? 'active' : ''}">
                    ${this._renderInfoBarTab()}
                </div>

                <div class="tab-content ${this._activeTab === 'consumers' ? 'active' : ''}">
                    ${this._renderConsumersTab()}
                </div>

                <div class="tab-content ${this._activeTab === 'pv' ? 'active' : ''}">
                    ${this._renderPVTab()}
                </div>

                <div class="tab-content ${this._activeTab === 'battery' ? 'active' : ''}">
                    ${this._renderBatteryTab()}
                </div>

                <div class="tab-content ${this._activeTab === 'house' ? 'active' : ''}">
                    ${this._renderHouseTab()}
                </div>

                <div class="tab-content ${this._activeTab === 'grid' ? 'active' : ''}">
                    ${this._renderGridTab()}
                </div>
            </div>
        `;
    }
}

declare const __CARD_NAME__: string;

const EDITOR_TAG = typeof __CARD_NAME__ !== 'undefined' ? `${__CARD_NAME__}-editor` : 'pv-monitor-card-editor';

if (!customElements.get(EDITOR_TAG)) {
    customElements.define(EDITOR_TAG, PVMonitorCardEditor);
}