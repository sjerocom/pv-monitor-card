import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { PVMonitorCardConfig } from "./pv-monitor-card-types";
import { getTranslations, SupportedLanguage, detectLanguage } from "./pv-monitor-card-i18n";
import { getAllThemes, getTheme } from "./pv-monitor-card-themes";

export class PVMonitorCardEditor extends LitElement {
    @property({ attribute: false }) public hass?: any;
    @state() private _config?: PVMonitorCardConfig;
    @state() private _activeTab: string = 'general';

    static styles = css`
        :host {
            display: block;
        }
        .card-config {
            display: flex;
            flex-direction: column;
            gap: 16px;
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
        }
        .section-header {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
            color: inherit;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .section-header ha-icon {
            --mdc-icon-size: 20px;
        }
        .option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            gap: 16px;
        }
        .option-label {
            flex: 1;
            font-size: 14px;
            color: inherit;
        }
        .option-control {
            flex: 0 0 auto;
            min-width: 200px;
        }
        ha-textfield, ha-select {
            width: 100%;
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

    private _renderEntityPicker(label: string, path: string[], value?: string, helper?: string) {
        const entities = this.hass ? Object.keys(this.hass.states).sort() : [];
        const t = this._getT();

        return html`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? html`<div class="info-text">${helper}</div>` : ''}
                </div>
                <div class="option-control">
                    <ha-combo-box
                            .hass=${this.hass}
                            .value=${value || ''}
                            .items=${entities}
                            .label=${t.editor.select_entity}
                            item-value-path=""
                            item-label-path=""
                            allow-custom-value
                            @value-changed=${(ev: any) => {
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
                    ></ha-combo-box>
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

                                // Update config
                                const newConfig = { ...this._config };
                                if (!newValue || newValue === '') {
                                    delete newConfig.theme;
                                } else {
                                    newConfig.theme = newValue;
                                }
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

    private _renderGeneralTab() {
        const t = this._getT();

        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:translate"></ha-icon>
                    ${t.editor.language}
                </div>
                ${this._renderLanguageSelector()}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t.editor.theme}
                </div>
                ${this._renderThemeSelector()}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:card-text"></ha-icon>
                    ${t.editor.card_header}
                </div>
                ${this._renderTextfield(t.editor.title, ['title'], this._config?.title, t.editor.title_placeholder, t.editor.title_helper)}
                ${this._renderTextfield(t.editor.subtitle, ['subtitle'], this._config?.subtitle, t.editor.subtitle_placeholder, t.editor.subtitle_helper)}
                ${this._renderIconPicker(t.editor.icon, ['icon'], this._config?.icon, t.editor.icon_helper)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:grid"></ha-icon>
                    ${t.editor.layout}
                </div>
                ${this._renderTextfield(t.editor.grid_gap, ['grid_gap'], this._config?.grid_gap, t.editor.grid_gap_placeholder, t.editor.grid_gap_helper)}
            </div>
        `;
    }

    private _renderInfoBarTab() {
        const t = this._getT();

        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:information"></ha-icon>
                    ${t.editor.infobar_settings}
                </div>
                ${this._renderSwitch(t.editor.enable_infobar, ['info_bar', 'show'], this._config?.info_bar?.show)}
            </div>

            ${this._config?.info_bar?.show ? html`
                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-1-box"></ha-icon>
                        ${t.editor.item} 1
                    </div>
                    ${this._renderEntityPicker(t.editor.entity, ['info_bar', 'item1', 'entity'], this._config?.info_bar?.item1?.entity)}
                    ${this._renderIconPicker(t.editor.icon_label, ['info_bar', 'item1', 'icon'], this._config?.info_bar?.item1?.icon)}
                    ${this._renderTextfield(t.editor.label, ['info_bar', 'item1', 'label'], this._config?.info_bar?.item1?.label, t.editor.default_autarky)}
                    ${this._renderTextfield(t.editor.unit, ['info_bar', 'item1', 'unit'], this._config?.info_bar?.item1?.unit, '%')}
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-2-box"></ha-icon>
                        ${t.editor.item} 2
                    </div>
                    ${this._renderEntityPicker(t.editor.entity, ['info_bar', 'item2', 'entity'], this._config?.info_bar?.item2?.entity)}
                    ${this._renderIconPicker(t.editor.icon_label, ['info_bar', 'item2', 'icon'], this._config?.info_bar?.item2?.icon)}
                    ${this._renderTextfield(t.editor.label, ['info_bar', 'item2', 'label'], this._config?.info_bar?.item2?.label, t.editor.default_runtime)}
                    ${this._renderTextfield(t.editor.unit, ['info_bar', 'item2', 'unit'], this._config?.info_bar?.item2?.unit)}
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-3-box"></ha-icon>
                        ${t.editor.item} 3
                    </div>
                    ${this._renderEntityPicker(t.editor.entity, ['info_bar', 'item3', 'entity'], this._config?.info_bar?.item3?.entity)}
                    ${this._renderIconPicker(t.editor.icon_label, ['info_bar', 'item3', 'icon'], this._config?.info_bar?.item3?.icon)}
                    ${this._renderTextfield(t.editor.label, ['info_bar', 'item3', 'label'], this._config?.info_bar?.item3?.label, t.editor.default_chargetime)}
                    ${this._renderTextfield(t.editor.unit, ['info_bar', 'item3', 'unit'], this._config?.info_bar?.item3?.unit)}
                </div>
            ` : ''}
        `;
    }

    private _renderPVTab() {
        const t = this._getT();

        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:solar-panel"></ha-icon>
                    ${t.editor.pv_system}
                </div>
                ${this._renderEntityPicker(t.editor.pv_entity, ['pv', 'entity'], this._config?.pv?.entity, t.editor.pv_entity_helper)}
                ${this._renderIconPicker(t.editor.icon_label, ['pv', 'icon'], this._config?.pv?.icon)}
                ${this._renderSwitch(t.editor.enable_animation, ['pv', 'animation'], this._config?.pv?.animation)}
                ${this._renderSwitch(t.editor.icon_rotation, ['pv', 'icon_rotation'], this._config?.pv?.icon_rotation, t.editor.icon_rotation_helper)}
                ${this._renderNumberfield(t.editor.max_power, ['pv', 'max_power'], this._config?.pv?.max_power, 0, 100000, 100, t.editor.max_power_helper)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t.editor.secondary_entity, ['pv', 'secondary_entity'], this._config?.pv?.secondary_entity, t.editor.secondary_entity_helper)}
                ${this._renderTextfield(t.editor.secondary_text, ['pv', 'secondary_text'], this._config?.pv?.secondary_text, '', t.editor.secondary_text_helper)}
                ${this._renderEntityPicker(t.editor.tertiary_entity, ['pv', 'tertiary_entity'], this._config?.pv?.tertiary_entity)}
                ${this._renderTextfield(t.editor.tertiary_text, ['pv', 'tertiary_text'], this._config?.pv?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t.editor.styling}
                </div>
                ${this._renderTextfield(t.editor.background_color, ['pv', 'style', 'background_color'], this._config?.pv?.style?.background_color, 'rgba(21, 20, 27, 1)')}
                ${this._renderTextfield(t.editor.border_color, ['pv', 'style', 'border_color'], this._config?.pv?.style?.border_color, 'rgba(255, 255, 255, 0.1)')}
                ${this._renderTextfield(t.editor.primary_color, ['pv', 'style', 'primary_color'], this._config?.pv?.style?.primary_color)}
                ${this._renderTextfield(t.editor.secondary_color, ['pv', 'style', 'secondary_color'], this._config?.pv?.style?.secondary_color)}
                ${this._renderTextfield(t.editor.icon_color, ['pv', 'style', 'icon_color'], this._config?.pv?.style?.icon_color)}
            </div>
        `;
    }

    private _renderBatteryTab() {
        const t = this._getT();

        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:battery"></ha-icon>
                    ${t.editor.battery}
                </div>
                ${this._renderEntityPicker(t.editor.battery_entity, ['batterie', 'entity'], this._config?.batterie?.entity, t.editor.battery_entity_helper)}
                ${this._renderEntityPicker(t.editor.charge_entity, ['batterie', 'ladung_entity'], this._config?.batterie?.ladung_entity, t.editor.charge_entity_helper)}
                ${this._renderEntityPicker(t.editor.discharge_entity, ['batterie', 'entladung_entity'], this._config?.batterie?.entladung_entity, t.editor.discharge_entity_helper)}
                ${this._renderNumberfield(t.editor.battery_capacity, ['batterie', 'battery_capacity'], this._config?.batterie?.battery_capacity, 0, 100000, 100, t.editor.battery_capacity_helper)}
                ${this._renderSwitch(t.editor.calculate_runtime, ['batterie', 'calculate_runtime'], this._config?.batterie?.calculate_runtime, t.editor.calculate_runtime_helper)}
                ${this._renderIconPicker(t.editor.icon_label, ['batterie', 'icon'], this._config?.batterie?.icon, t.editor.icon_auto_helper)}
                ${this._renderSwitch(t.editor.enable_animation, ['batterie', 'animation'], this._config?.batterie?.animation)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t.editor.secondary_entity, ['batterie', 'secondary_entity'], this._config?.batterie?.secondary_entity)}
                ${this._renderTextfield(t.editor.secondary_text, ['batterie', 'secondary_text'], this._config?.batterie?.secondary_text)}
                ${this._renderEntityPicker(t.editor.tertiary_entity, ['batterie', 'tertiary_entity'], this._config?.batterie?.tertiary_entity)}
                ${this._renderTextfield(t.editor.tertiary_text, ['batterie', 'tertiary_text'], this._config?.batterie?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t.editor.styling}
                </div>
                ${this._renderTextfield(t.editor.background_color, ['batterie', 'style', 'background_color'], this._config?.batterie?.style?.background_color)}
                ${this._renderTextfield(t.editor.border_color, ['batterie', 'style', 'border_color'], this._config?.batterie?.style?.border_color)}
                ${this._renderTextfield(t.editor.primary_color, ['batterie', 'style', 'primary_color'], this._config?.batterie?.style?.primary_color)}
                ${this._renderTextfield(t.editor.secondary_color, ['batterie', 'style', 'secondary_color'], this._config?.batterie?.style?.secondary_color)}
                ${this._renderTextfield(t.editor.icon_color, ['batterie', 'style', 'icon_color'], this._config?.batterie?.style?.icon_color)}
            </div>
        `;
    }

    private _renderHouseTab() {
        const t = this._getT();

        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:home"></ha-icon>
                    ${t.editor.house_consumption}
                </div>
                ${this._renderEntityPicker(t.editor.house_entity, ['haus', 'entity'], this._config?.haus?.entity, t.editor.house_entity_helper)}
                ${this._renderIconPicker(t.editor.icon_label, ['haus', 'icon'], this._config?.haus?.icon)}
                ${this._renderSwitch(t.editor.enable_animation, ['haus', 'animation'], this._config?.haus?.animation)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t.editor.secondary_entity, ['haus', 'secondary_entity'], this._config?.haus?.secondary_entity)}
                ${this._renderTextfield(t.editor.secondary_text, ['haus', 'secondary_text'], this._config?.haus?.secondary_text)}
                ${this._renderEntityPicker(t.editor.tertiary_entity, ['haus', 'tertiary_entity'], this._config?.haus?.tertiary_entity)}
                ${this._renderTextfield(t.editor.tertiary_text, ['haus', 'tertiary_text'], this._config?.haus?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t.editor.styling}
                </div>
                ${this._renderTextfield(t.editor.background_color, ['haus', 'style', 'background_color'], this._config?.haus?.style?.background_color)}
                ${this._renderTextfield(t.editor.border_color, ['haus', 'style', 'border_color'], this._config?.haus?.style?.border_color)}
                ${this._renderTextfield(t.editor.primary_color, ['haus', 'style', 'primary_color'], this._config?.haus?.style?.primary_color)}
                ${this._renderTextfield(t.editor.secondary_color, ['haus', 'style', 'secondary_color'], this._config?.haus?.style?.secondary_color)}
                ${this._renderTextfield(t.editor.icon_color, ['haus', 'style', 'icon_color'], this._config?.haus?.style?.icon_color)}
            </div>
        `;
    }

    private _renderGridTab() {
        const t = this._getT();

        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:transmission-tower"></ha-icon>
                    ${t.editor.grid}
                </div>
                ${this._renderEntityPicker(t.editor.grid_entity, ['netz', 'entity'], this._config?.netz?.entity, t.editor.grid_entity_helper)}
                ${this._renderIconPicker(t.editor.icon_label, ['netz', 'icon'], this._config?.netz?.icon)}
                ${this._renderSwitch(t.editor.enable_animation, ['netz', 'animation'], this._config?.netz?.animation)}
                ${this._renderNumberfield(t.editor.threshold, ['netz', 'threshold'], this._config?.netz?.threshold, 0, 1000, 10, t.editor.threshold_helper)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text-box"></ha-icon>
                    ${t.editor.status_texts}
                </div>
                ${this._renderTextfield(t.editor.text_feed_in, ['netz', 'text_einspeisen'], this._config?.netz?.text_einspeisen, t.editor.text_feed_in_placeholder)}
                ${this._renderTextfield(t.editor.text_neutral, ['netz', 'text_neutral'], this._config?.netz?.text_neutral, t.editor.text_neutral_placeholder)}
                ${this._renderTextfield(t.editor.text_consumption, ['netz', 'text_bezug'], this._config?.netz?.text_bezug, t.editor.text_consumption_placeholder)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t.editor.secondary_entity, ['netz', 'secondary_entity'], this._config?.netz?.secondary_entity)}
                ${this._renderTextfield(t.editor.secondary_text, ['netz', 'secondary_text'], this._config?.netz?.secondary_text)}
                ${this._renderEntityPicker(t.editor.tertiary_entity, ['netz', 'tertiary_entity'], this._config?.netz?.tertiary_entity)}
                ${this._renderTextfield(t.editor.tertiary_text, ['netz', 'tertiary_text'], this._config?.netz?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t.editor.styling}
                </div>
                ${this._renderTextfield(t.editor.background_color, ['netz', 'style', 'background_color'], this._config?.netz?.style?.background_color)}
                ${this._renderTextfield(t.editor.border_color, ['netz', 'style', 'border_color'], this._config?.netz?.style?.border_color)}
                ${this._renderTextfield(t.editor.primary_color, ['netz', 'style', 'primary_color'], this._config?.netz?.style?.primary_color)}
                ${this._renderTextfield(t.editor.secondary_color, ['netz', 'style', 'secondary_color'], this._config?.netz?.style?.secondary_color)}
                ${this._renderTextfield(t.editor.icon_color, ['netz', 'style', 'icon_color'], this._config?.netz?.style?.icon_color)}
            </div>
        `;
    }

    private _renderStylingTab() {
        const t = this._getT();

        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:card"></ha-icon>
                    ${t.editor.card_styling}
                </div>
                ${this._renderTextfield(t.editor.background_color, ['style', 'card_background_color'], this._config?.style?.card_background_color, 'rgba(21, 20, 27, 1)')}
                ${this._renderTextfield(t.editor.border_color, ['style', 'card_border_color'], this._config?.style?.card_border_color, 'rgba(255, 255, 255, 0.1)')}
                ${this._renderTextfield(t.editor.border_radius, ['style', 'card_border_radius'], this._config?.style?.card_border_radius, '16px')}
                ${this._renderTextfield(t.editor.text_color, ['style', 'card_text_color'], this._config?.style?.card_text_color, 'white')}
                ${this._renderTextfield(t.editor.padding, ['style', 'card_padding'], this._config?.style?.card_padding, '12px')}
                ${this._renderTextfield(t.editor.cursor, ['style', 'card_cursor'], this._config?.style?.card_cursor, 'pointer')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-title"></ha-icon>
                    ${t.editor.title_subtitle}
                </div>
                ${this._renderTextfield(t.editor.title_size, ['style', 'title_size'], this._config?.style?.title_size, '1.5em')}
                ${this._renderTextfield(t.editor.title_color, ['style', 'title_color'], this._config?.style?.title_color, 'white')}
                ${this._renderTextfield(t.editor.title_alignment, ['style', 'title_align'], this._config?.style?.title_align, 'center', t.editor.title_alignment_helper)}
                ${this._renderTextfield(t.editor.title_font_weight, ['style', 'title_font_weight'], this._config?.style?.title_font_weight, 'bold')}

                <div class="divider"></div>

                ${this._renderTextfield(t.editor.subtitle_size, ['style', 'subtitle_size'], this._config?.style?.subtitle_size, '1em')}
                ${this._renderTextfield(t.editor.subtitle_color, ['style', 'subtitle_color'], this._config?.style?.subtitle_color)}
                ${this._renderTextfield(t.editor.subtitle_alignment, ['style', 'subtitle_align'], this._config?.style?.subtitle_align, 'center')}
                ${this._renderTextfield(t.editor.subtitle_font_weight, ['style', 'subtitle_font_weight'], this._config?.style?.subtitle_font_weight, 'normal')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:shape"></ha-icon>
                    ${t.editor.icons}
                </div>
                ${this._renderTextfield(t.editor.icon_size, ['style', 'icon_size'], this._config?.style?.icon_size, '2em')}
                ${this._renderTextfield(t.editor.icon_opacity, ['style', 'icon_opacity'], this._config?.style?.icon_opacity, '1')}
                ${this._renderTextfield(t.editor.icon_margin, ['style', 'icon_margin'], this._config?.style?.icon_margin, '6px')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    ${t.editor.primary_text_styling}
                </div>
                ${this._renderTextfield(t.editor.primary_size, ['style', 'primary_size'], this._config?.style?.primary_size, '1.2em')}
                ${this._renderTextfield(t.editor.primary_color_label, ['style', 'primary_color'], this._config?.style?.primary_color, 'white')}
                ${this._renderTextfield(t.editor.primary_opacity, ['style', 'primary_font_opacity'], this._config?.style?.primary_font_opacity, '1')}
                ${this._renderTextfield(t.editor.primary_font_weight, ['style', 'primary_font_weight'], this._config?.style?.primary_font_weight, 'normal')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    ${t.editor.secondary_text_styling}
                </div>
                ${this._renderTextfield(t.editor.secondary_size, ['style', 'secondary_size'], this._config?.style?.secondary_size, '0.9em')}
                ${this._renderTextfield(t.editor.secondary_color_label, ['style', 'secondary_color'], this._config?.style?.secondary_color, 'white')}
                ${this._renderTextfield(t.editor.secondary_opacity, ['style', 'secondary_font_opacity'], this._config?.style?.secondary_font_opacity, '0.7')}
                ${this._renderTextfield(t.editor.secondary_font_weight, ['style', 'secondary_font_weight'], this._config?.style?.secondary_font_weight, 'normal')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    ${t.editor.tertiary_text_styling}
                </div>
                ${this._renderTextfield(t.editor.tertiary_size, ['style', 'tertiary_size'], this._config?.style?.tertiary_size, '0.9em')}
                ${this._renderTextfield(t.editor.tertiary_color_label, ['style', 'tertiary_color'], this._config?.style?.tertiary_color, 'white')}
                ${this._renderTextfield(t.editor.tertiary_opacity, ['style', 'tertiary_font_opacity'], this._config?.style?.tertiary_font_opacity, '0.7')}
                ${this._renderTextfield(t.editor.tertiary_font_weight, ['style', 'tertiary_font_weight'], this._config?.style?.tertiary_font_weight, 'normal')}
            </div>
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

customElements.define('pv-monitor-card-editor', PVMonitorCardEditor);