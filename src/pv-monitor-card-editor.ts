import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { PVMonitorCardConfig } from "./pv-monitor-card-types";

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
        // Get all entity IDs from hass
        const entities = this.hass ? Object.keys(this.hass.states).sort() : [];

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
                            .label=${'Entity auswählen'}
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
                            .label=${'Icon auswählen'}
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

    private _renderGeneralTab() {
        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:card-text"></ha-icon>
                    Karten-Header
                </div>
                ${this._renderTextfield('Titel', ['title'], this._config?.title, 'PV Monitor')}
                ${this._renderTextfield('Untertitel', ['subtitle'], this._config?.subtitle, 'Energieübersicht')}
                ${this._renderIconPicker('Icon', ['icon'], this._config?.icon, 'Wird nur angezeigt, wenn auch ein Titel vorhanden ist')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:grid"></ha-icon>
                    Layout
                </div>
                ${this._renderTextfield('Grid Abstand', ['grid_gap'], this._config?.grid_gap, '6px', 'Abstand zwischen den Karten (z.B. 6px, 0.5rem)')}
            </div>
        `;
    }

    private _renderInfoBarTab() {
        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:information"></ha-icon>
                    Info Bar Einstellungen
                </div>
                ${this._renderSwitch('Info Bar aktivieren', ['info_bar', 'show'], this._config?.info_bar?.show)}
            </div>

            ${this._config?.info_bar?.show ? html`
                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-1-box"></ha-icon>
                        Item 1
                    </div>
                    ${this._renderEntityPicker('Entity', ['info_bar', 'item1', 'entity'], this._config?.info_bar?.item1?.entity)}
                    ${this._renderIconPicker('Icon', ['info_bar', 'item1', 'icon'], this._config?.info_bar?.item1?.icon)}
                    ${this._renderTextfield('Label', ['info_bar', 'item1', 'label'], this._config?.info_bar?.item1?.label, 'Autarkie')}
                    ${this._renderTextfield('Einheit', ['info_bar', 'item1', 'unit'], this._config?.info_bar?.item1?.unit, '%')}
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-2-box"></ha-icon>
                        Item 2
                    </div>
                    ${this._renderEntityPicker('Entity', ['info_bar', 'item2', 'entity'], this._config?.info_bar?.item2?.entity)}
                    ${this._renderIconPicker('Icon', ['info_bar', 'item2', 'icon'], this._config?.info_bar?.item2?.icon)}
                    ${this._renderTextfield('Label', ['info_bar', 'item2', 'label'], this._config?.info_bar?.item2?.label, 'Restlaufzeit')}
                    ${this._renderTextfield('Einheit', ['info_bar', 'item2', 'unit'], this._config?.info_bar?.item2?.unit)}
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-3-box"></ha-icon>
                        Item 3
                    </div>
                    ${this._renderEntityPicker('Entity', ['info_bar', 'item3', 'entity'], this._config?.info_bar?.item3?.entity)}
                    ${this._renderIconPicker('Icon', ['info_bar', 'item3', 'icon'], this._config?.info_bar?.item3?.icon)}
                    ${this._renderTextfield('Label', ['info_bar', 'item3', 'label'], this._config?.info_bar?.item3?.label, 'Restladezeit')}
                    ${this._renderTextfield('Einheit', ['info_bar', 'item3', 'unit'], this._config?.info_bar?.item3?.unit)}
                </div>
            ` : ''}
        `;
    }

    private _renderPVTab() {
        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:solar-panel"></ha-icon>
                    PV-Anlage
                </div>
                ${this._renderEntityPicker('PV Entity', ['pv', 'entity'], this._config?.pv?.entity, 'Entity für PV-Leistung')}
                ${this._renderIconPicker('Icon', ['pv', 'icon'], this._config?.pv?.icon)}
                ${this._renderSwitch('Animation aktivieren', ['pv', 'animation'], this._config?.pv?.animation)}
                ${this._renderSwitch('Icon Rotation', ['pv', 'icon_rotation'], this._config?.pv?.icon_rotation, 'Icon dreht sich je nach Leistung')}
                ${this._renderNumberfield('Max. Leistung (W)', ['pv', 'max_power'], this._config?.pv?.max_power, 0, 100000, 100, 'Maximale PV-Leistung für Animation & Rotation')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    Zusätzliche Texte
                </div>
                ${this._renderEntityPicker('Sekundär Entity', ['pv', 'secondary_entity'], this._config?.pv?.secondary_entity, 'Optional: Entity für 2. Zeile')}
                ${this._renderTextfield('Sekundär Text', ['pv', 'secondary_text'], this._config?.pv?.secondary_text, 'Optional: Statischer Text für 2. Zeile')}
                ${this._renderEntityPicker('Tertiär Entity', ['pv', 'tertiary_entity'], this._config?.pv?.tertiary_entity)}
                ${this._renderTextfield('Tertiär Text', ['pv', 'tertiary_text'], this._config?.pv?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    Styling
                </div>
                ${this._renderTextfield('Hintergrundfarbe', ['pv', 'style', 'background_color'], this._config?.pv?.style?.background_color, 'rgba(21, 20, 27, 1)')}
                ${this._renderTextfield('Rahmenfarbe', ['pv', 'style', 'border_color'], this._config?.pv?.style?.border_color, 'rgba(255, 255, 255, 0.1)')}
                ${this._renderTextfield('Primärfarbe', ['pv', 'style', 'primary_color'], this._config?.pv?.style?.primary_color)}
                ${this._renderTextfield('Sekundärfarbe', ['pv', 'style', 'secondary_color'], this._config?.pv?.style?.secondary_color)}
                ${this._renderTextfield('Icon Farbe', ['pv', 'style', 'icon_color'], this._config?.pv?.style?.icon_color)}
            </div>
        `;
    }

    private _renderBatteryTab() {
        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:battery"></ha-icon>
                    Batterie
                </div>
                ${this._renderEntityPicker('Batterie Entity', ['batterie', 'entity'], this._config?.batterie?.entity, 'Entity für Batteriestand (%)')}
                ${this._renderEntityPicker('Ladung Entity', ['batterie', 'ladung_entity'], this._config?.batterie?.ladung_entity, 'Entity für Ladeleistung')}
                ${this._renderEntityPicker('Entladung Entity', ['batterie', 'entladung_entity'], this._config?.batterie?.entladung_entity, 'Entity für Entladeleistung')}
                ${this._renderNumberfield('Batteriekapazität (Wh)', ['batterie', 'battery_capacity'], this._config?.batterie?.battery_capacity, 0, 100000, 100, 'Kapazität der Batterie für Animation (z.B. 10000 für 10 kWh)')}
                ${this._renderSwitch('Rest-/Ladezeit berechnen', ['batterie', 'calculate_runtime'], this._config?.batterie?.calculate_runtime, 'Automatische Berechnung für Info Bar Item 2 & 3')}
                ${this._renderIconPicker('Icon', ['batterie', 'icon'], this._config?.batterie?.icon, 'Leer lassen für automatisches Icon')}
                ${this._renderSwitch('Animation aktivieren', ['batterie', 'animation'], this._config?.batterie?.animation)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    Zusätzliche Texte
                </div>
                ${this._renderEntityPicker('Sekundär Entity', ['batterie', 'secondary_entity'], this._config?.batterie?.secondary_entity)}
                ${this._renderTextfield('Sekundär Text', ['batterie', 'secondary_text'], this._config?.batterie?.secondary_text)}
                ${this._renderEntityPicker('Tertiär Entity', ['batterie', 'tertiary_entity'], this._config?.batterie?.tertiary_entity)}
                ${this._renderTextfield('Tertiär Text', ['batterie', 'tertiary_text'], this._config?.batterie?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    Styling
                </div>
                ${this._renderTextfield('Hintergrundfarbe', ['batterie', 'style', 'background_color'], this._config?.batterie?.style?.background_color)}
                ${this._renderTextfield('Rahmenfarbe', ['batterie', 'style', 'border_color'], this._config?.batterie?.style?.border_color)}
                ${this._renderTextfield('Primärfarbe', ['batterie', 'style', 'primary_color'], this._config?.batterie?.style?.primary_color)}
                ${this._renderTextfield('Sekundärfarbe', ['batterie', 'style', 'secondary_color'], this._config?.batterie?.style?.secondary_color)}
                ${this._renderTextfield('Icon Farbe', ['batterie', 'style', 'icon_color'], this._config?.batterie?.style?.icon_color)}
            </div>
        `;
    }

    private _renderHouseTab() {
        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:home"></ha-icon>
                    Hausverbrauch
                </div>
                ${this._renderEntityPicker('Haus Entity', ['haus', 'entity'], this._config?.haus?.entity, 'Entity für Hausverbrauch')}
                ${this._renderIconPicker('Icon', ['haus', 'icon'], this._config?.haus?.icon)}
                ${this._renderSwitch('Animation aktivieren', ['haus', 'animation'], this._config?.haus?.animation)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    Zusätzliche Texte
                </div>
                ${this._renderEntityPicker('Sekundär Entity', ['haus', 'secondary_entity'], this._config?.haus?.secondary_entity)}
                ${this._renderTextfield('Sekundär Text', ['haus', 'secondary_text'], this._config?.haus?.secondary_text)}
                ${this._renderEntityPicker('Tertiär Entity', ['haus', 'tertiary_entity'], this._config?.haus?.tertiary_entity)}
                ${this._renderTextfield('Tertiär Text', ['haus', 'tertiary_text'], this._config?.haus?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    Styling
                </div>
                ${this._renderTextfield('Hintergrundfarbe', ['haus', 'style', 'background_color'], this._config?.haus?.style?.background_color)}
                ${this._renderTextfield('Rahmenfarbe', ['haus', 'style', 'border_color'], this._config?.haus?.style?.border_color)}
                ${this._renderTextfield('Primärfarbe', ['haus', 'style', 'primary_color'], this._config?.haus?.style?.primary_color)}
                ${this._renderTextfield('Sekundärfarbe', ['haus', 'style', 'secondary_color'], this._config?.haus?.style?.secondary_color)}
                ${this._renderTextfield('Icon Farbe', ['haus', 'style', 'icon_color'], this._config?.haus?.style?.icon_color)}
            </div>
        `;
    }

    private _renderGridTab() {
        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:transmission-tower"></ha-icon>
                    Netz
                </div>
                ${this._renderEntityPicker('Netz Entity', ['netz', 'entity'], this._config?.netz?.entity, 'Entity für Netzbezug/Einspeisung')}
                ${this._renderIconPicker('Icon', ['netz', 'icon'], this._config?.netz?.icon)}
                ${this._renderSwitch('Animation aktivieren', ['netz', 'animation'], this._config?.netz?.animation)}
                ${this._renderNumberfield('Schwellwert (W)', ['netz', 'threshold'], this._config?.netz?.threshold, 0, 1000, 10, 'Unterhalb dieses Werts wird "Neutral" angezeigt')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text-box"></ha-icon>
                    Status-Texte
                </div>
                ${this._renderTextfield('Text bei Einspeisung', ['netz', 'text_einspeisen'], this._config?.netz?.text_einspeisen, 'Einspeisung')}
                ${this._renderTextfield('Text bei Neutral', ['netz', 'text_neutral'], this._config?.netz?.text_neutral, 'Neutral')}
                ${this._renderTextfield('Text bei Bezug', ['netz', 'text_bezug'], this._config?.netz?.text_bezug, 'Netzbezug')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    Zusätzliche Texte
                </div>
                ${this._renderEntityPicker('Sekundär Entity', ['netz', 'secondary_entity'], this._config?.netz?.secondary_entity)}
                ${this._renderTextfield('Sekundär Text', ['netz', 'secondary_text'], this._config?.netz?.secondary_text)}
                ${this._renderEntityPicker('Tertiär Entity', ['netz', 'tertiary_entity'], this._config?.netz?.tertiary_entity)}
                ${this._renderTextfield('Tertiär Text', ['netz', 'tertiary_text'], this._config?.netz?.tertiary_text)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    Styling
                </div>
                ${this._renderTextfield('Hintergrundfarbe', ['netz', 'style', 'background_color'], this._config?.netz?.style?.background_color)}
                ${this._renderTextfield('Rahmenfarbe', ['netz', 'style', 'border_color'], this._config?.netz?.style?.border_color)}
                ${this._renderTextfield('Primärfarbe', ['netz', 'style', 'primary_color'], this._config?.netz?.style?.primary_color)}
                ${this._renderTextfield('Sekundärfarbe', ['netz', 'style', 'secondary_color'], this._config?.netz?.style?.secondary_color)}
                ${this._renderTextfield('Icon Farbe', ['netz', 'style', 'icon_color'], this._config?.netz?.style?.icon_color)}
            </div>
        `;
    }

    private _renderStylingTab() {
        return html`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:card"></ha-icon>
                    Karten-Styling
                </div>
                ${this._renderTextfield('Hintergrundfarbe', ['style', 'card_background_color'], this._config?.style?.card_background_color, 'rgba(21, 20, 27, 1)')}
                ${this._renderTextfield('Rahmenfarbe', ['style', 'card_border_color'], this._config?.style?.card_border_color, 'rgba(255, 255, 255, 0.1)')}
                ${this._renderTextfield('Border Radius', ['style', 'card_border_radius'], this._config?.style?.card_border_radius, '16px')}
                ${this._renderTextfield('Textfarbe', ['style', 'card_text_color'], this._config?.style?.card_text_color, 'white')}
                ${this._renderTextfield('Padding', ['style', 'card_padding'], this._config?.style?.card_padding, '12px')}
                ${this._renderTextfield('Cursor', ['style', 'card_cursor'], this._config?.style?.card_cursor, 'pointer')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-title"></ha-icon>
                    Titel & Untertitel
                </div>
                ${this._renderTextfield('Titel Größe', ['style', 'title_size'], this._config?.style?.title_size, '1.5em')}
                ${this._renderTextfield('Titel Farbe', ['style', 'title_color'], this._config?.style?.title_color, 'white')}
                ${this._renderTextfield('Titel Ausrichtung', ['style', 'title_align'], this._config?.style?.title_align, 'center', 'left, center, right')}
                ${this._renderTextfield('Titel Font-Weight', ['style', 'title_font_weight'], this._config?.style?.title_font_weight, 'bold')}

                <div class="divider"></div>

                ${this._renderTextfield('Untertitel Größe', ['style', 'subtitle_size'], this._config?.style?.subtitle_size, '1em')}
                ${this._renderTextfield('Untertitel Farbe', ['style', 'subtitle_color'], this._config?.style?.subtitle_color)}
                ${this._renderTextfield('Untertitel Ausrichtung', ['style', 'subtitle_align'], this._config?.style?.subtitle_align, 'center')}
                ${this._renderTextfield('Untertitel Font-Weight', ['style', 'subtitle_font_weight'], this._config?.style?.subtitle_font_weight, 'normal')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:shape"></ha-icon>
                    Icons
                </div>
                ${this._renderTextfield('Icon Größe', ['style', 'icon_size'], this._config?.style?.icon_size, '2em')}
                ${this._renderTextfield('Icon Opacity', ['style', 'icon_opacity'], this._config?.style?.icon_opacity, '1')}
                ${this._renderTextfield('Icon Margin', ['style', 'icon_margin'], this._config?.style?.icon_margin, '6px')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    Primär-Text (Hauptwert)
                </div>
                ${this._renderTextfield('Primär Größe', ['style', 'primary_size'], this._config?.style?.primary_size, '1.2em')}
                ${this._renderTextfield('Primär Farbe', ['style', 'primary_color'], this._config?.style?.primary_color, 'white')}
                ${this._renderTextfield('Primär Opacity', ['style', 'primary_font_opacity'], this._config?.style?.primary_font_opacity, '1')}
                ${this._renderTextfield('Primär Font-Weight', ['style', 'primary_font_weight'], this._config?.style?.primary_font_weight, 'normal')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    Sekundär-Text (2. Zeile)
                </div>
                ${this._renderTextfield('Sekundär Größe', ['style', 'secondary_size'], this._config?.style?.secondary_size, '0.9em')}
                ${this._renderTextfield('Sekundär Farbe', ['style', 'secondary_color'], this._config?.style?.secondary_color, 'white')}
                ${this._renderTextfield('Sekundär Opacity', ['style', 'secondary_font_opacity'], this._config?.style?.secondary_font_opacity, '0.7')}
                ${this._renderTextfield('Sekundär Font-Weight', ['style', 'secondary_font_weight'], this._config?.style?.secondary_font_weight, 'normal')}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    Tertiär-Text (3. Zeile)
                </div>
                ${this._renderTextfield('Tertiär Größe', ['style', 'tertiary_size'], this._config?.style?.tertiary_size, '0.9em')}
                ${this._renderTextfield('Tertiär Farbe', ['style', 'tertiary_color'], this._config?.style?.tertiary_color, 'white')}
                ${this._renderTextfield('Tertiär Opacity', ['style', 'tertiary_font_opacity'], this._config?.style?.tertiary_font_opacity, '0.7')}
                ${this._renderTextfield('Tertiär Font-Weight', ['style', 'tertiary_font_weight'], this._config?.style?.tertiary_font_weight, 'normal')}
            </div>
        `;
    }

    render() {
        if (!this._config) {
            return html``;
        }

        return html`
            <div class="card-config">
                <div class="tabs">
                    ${this._renderTab('general', 'Allgemein', 'mdi:cog')}
                    ${this._renderTab('styling', 'Styling', 'mdi:palette')}
                    ${this._renderTab('infobar', 'Info Bar', 'mdi:information')}
                    ${this._renderTab('pv', 'PV-Anlage', 'mdi:solar-panel')}
                    ${this._renderTab('battery', 'Batterie', 'mdi:battery')}
                    ${this._renderTab('house', 'Haus', 'mdi:home')}
                    ${this._renderTab('grid', 'Netz', 'mdi:transmission-tower')}
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