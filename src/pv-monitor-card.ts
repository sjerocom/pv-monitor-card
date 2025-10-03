import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import {
    formatPower,
    getBatteryIcon,
    getBatteryIconColor,
    getNetzColor,
    getPVRotation,
    getPVColor,
    getBatterieColor,
    getHausColor,
    getAnimationStyle
} from "./pv-monitor-utils";

interface HassEntity {
    state: string;
    attributes: Record<string, any>;
}

interface Hass {
    states: Record<string, HassEntity>;
    callService?: (domain: string, service: string, data?: any) => Promise<any>;
}

interface TapAction {
    action: string;
    navigation_path?: string;
    service?: string;
    service_data?: any;
    target?: any;  // NEU
    data?: any;     // NEU
}

export interface PVMonitorCardConfig {
    type: string;
    title?: string;
    show_title?: boolean;
    show_icons?: boolean;
    icon_size?: string;
    primary_size?: string;
    secondary_size?: string;
    card_padding?: string;

    netz_entity?: string;
    netz_animation?: boolean;
    netz_show_name?: boolean;
    netz_icon?: string;
    netz_tap_action?: TapAction;
    netz_text_einspeisen?: string;
    netz_text_neutral?: string;
    netz_text_bezug?: string;
    netz_threshold?: number;

    pv_entity?: string;
    pv_animation?: boolean;
    pv_show_name?: boolean;
    pv_icon?: string;
    pv_tap_action?: TapAction;
    pv_secondary_entity?: string;
    pv_secondary_text?: string;

    batterie_entity?: string;
    batterie_animation?: boolean;
    batterie_show_name?: boolean;
    batterie_tap_action?: TapAction;
    batterie_ladung_entity?: string;
    batterie_entladung_entity?: string;
    batterie_status_entity?: string;

    haus_entity?: string;
    haus_animation?: boolean;
    haus_show_name?: boolean;
    haus_icon?: string;
    haus_tap_action?: TapAction;
    haus_secondary_entity?: string;
    haus_secondary_text?: string;
}

const CARD_TAG = "pv-monitor-card";

export class PVMonitorCard extends LitElement {
    @property({ attribute: false }) public hass?: Hass;
    @property() private config!: PVMonitorCardConfig;

    static styles = css`
        :host {
            display: block;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            --ha-card-box-shadow: none !important;
            --ha-card-border-width: 0 !important;
        }
        ha-card {
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
        }
        .card {
            background: #15141b;
            border-radius: 16px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .card::after {
            content: "";
            position: absolute;
            inset: 2px;
            border-radius: inherit;
            background: rgba(21,20,27,1);
            z-index: 1;
        }
        .card > * {
            position: relative;
            z-index: 2;
        }
        .primary {
            font-weight: normal;
        }
        .secondary {
            opacity: 0.7;
            margin-top: 2px;
        }
        .icon {
            margin-bottom: 6px;
        }
        @keyframes spin {
            0%   { transform: rotate(0deg); }
            25%  { transform: rotate(120deg); }
            50%  { transform: rotate(200deg); }
            75%  { transform: rotate(300deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    public setConfig(config: PVMonitorCardConfig): void {
        if (!config) throw new Error("Fehlende Konfiguration");
        this.config = {
            ...config,
            show_title: config.show_title !== false,
            show_icons: config.show_icons !== false,
            icon_size: config.icon_size ?? '2em',
            primary_size: config.primary_size ?? '1.2em',
            secondary_size: config.secondary_size ?? '0.9em',
            card_padding: config.card_padding ?? '12px',
            netz_animation: config.netz_animation !== false,
            netz_show_name: config.netz_show_name !== false,
            netz_threshold: config.netz_threshold ?? 10,
            netz_text_einspeisen: config.netz_text_einspeisen ?? "Einspeisung",
            netz_text_neutral: config.netz_text_neutral ?? "Neutral",
            netz_text_bezug: config.netz_text_bezug ?? "Netzbezug",
            pv_animation: config.pv_animation !== false,
            pv_show_name: config.pv_show_name !== false,
            batterie_animation: config.batterie_animation !== false,
            batterie_show_name: config.batterie_show_name !== false,
            haus_animation: config.haus_animation !== false,
            haus_show_name: config.haus_show_name !== false
        };
    }

    getCardSize() {
        return 3;
    }

    private _handleTap(tapAction?: TapAction) {
        if (!tapAction || tapAction.action === 'none') return;

        if (tapAction.action === 'navigate' && tapAction.navigation_path) {
            history.pushState(null, '', tapAction.navigation_path);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else if (tapAction.action === 'call-service' && tapAction.service && this.hass) {
            const [domain, service] = tapAction.service.split('.');

            // Prüfe ob hass.callService existiert
            if (this.hass.callService) {
                this.hass.callService(domain, service, tapAction.service_data || {});
            } else {
                // Fallback: Verwende das alte Event-System
                window.dispatchEvent(new CustomEvent('hass-call-service', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        domain,
                        service,
                        serviceData: tapAction.service_data || {}
                    }
                }));
            }
        } else if (tapAction.action === 'more-info') {
            const entityId = tapAction.target?.entity_id;
            if (entityId) {
                this.dispatchEvent(new CustomEvent('hass-more-info', {
                    composed: true,
                    bubbles: true,
                    detail: { entityId }
                }));
            }
        }
    }

    private _renderNetz() {
        if (!this.config.netz_entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.netz_entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.netz_entity} fehlt</div>`;

        const value = parseFloat(entity.state) || 0;
        const formattedValue = formatPower(value);
        const threshold = this.config.netz_threshold || 10;

        let statusText = '';
        if (value < -threshold) {
            statusText = this.config.netz_text_einspeisen || 'Einspeisung';
        } else if (value > threshold) {
            statusText = this.config.netz_text_bezug || 'Netzbezug';
        } else {
            statusText = this.config.netz_text_neutral || 'Neutral';
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.netz_animation) {
            animStyle = getNetzColor(value, threshold);
        }

        const cardStyle = `padding: ${this.config.card_padding};`;
        const icon = this.config.netz_icon || 'mdi:transmission-tower';
        const iconStyle = `font-size: ${this.config.icon_size}; ${animStyle.show && animStyle.color ? `color: ${animStyle.color};` : ''}`;
        const primaryStyle = `font-size: ${this.config.primary_size}; line-height: calc(${this.config.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${this.config.secondary_size}; line-height: calc(${this.config.secondary_size} + 2px);`;

        return html`
            <div class="card" style="${cardStyle}" @click=${() => this._handleTap(this.config.netz_tap_action)}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                ${this.config.show_icons ? html`
                    <div class="icon" style="${iconStyle}"><ha-icon .icon=${icon}></ha-icon></div>
                ` : ''}
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                <div class="secondary" style="${secondaryStyle}">${statusText}</div>
                ${this.config.netz_show_name ? html`<div class="secondary" style="${secondaryStyle}">Netz</div>` : ''}
            </div>
        `;
    }

    private _renderPV() {
        if (!this.config.pv_entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.pv_entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.pv_entity} fehlt</div>`;

        const value = parseFloat(entity.state) || 0;
        const formattedValue = formatPower(value);

        let secondaryText = '';
        if (this.config.pv_secondary_entity) {
            const secEntity = this.hass.states[this.config.pv_secondary_entity];
            if (secEntity) {
                secondaryText = `${secEntity.state} ${secEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.pv_secondary_text) {
            secondaryText = this.config.pv_secondary_text;
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.pv_animation) {
            animStyle = getPVColor(value);
        }

        const rotation = getPVRotation(value);  // NEU
        const cardStyle = `padding: ${this.config.card_padding};`;
        const icon = this.config.pv_icon || 'mdi:white-balance-sunny';  // Sonnen-Icon
        const iconStyle = `font-size: ${this.config.icon_size}; transform: rotate(${rotation}deg); transition: transform 0.5s ease; ${animStyle.show && animStyle.color ? `color: ${animStyle.color};` : ''}`;  // NEU: transform und transition
        const primaryStyle = `font-size: ${this.config.primary_size}; line-height: calc(${this.config.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${this.config.secondary_size}; line-height: calc(${this.config.secondary_size} + 2px);`;

        return html`
            <div class="card" style="${cardStyle}" @click=${() => this._handleTap(this.config.pv_tap_action)}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                ${this.config.show_icons ? html`
                    <div class="icon" style="${iconStyle}"><ha-icon .icon=${icon}></ha-icon></div>
                ` : ''}
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${this.config.pv_show_name ? html`<div class="secondary" style="${secondaryStyle}">PV</div>` : ''}
            </div>
        `;
    }

    private _renderBatterie() {
        if (!this.config.batterie_entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.batterie_entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.batterie_entity} fehlt</div>`;

        const percentage = parseFloat(entity.state) || 0;
        const icon = getBatteryIcon(percentage);
        const iconColor = getBatteryIconColor(percentage);

        const charge = this.config.batterie_ladung_entity
            ? parseFloat(this.hass.states[this.config.batterie_ladung_entity]?.state) || 0
            : 0;
        const discharge = this.config.batterie_entladung_entity
            ? parseFloat(this.hass.states[this.config.batterie_entladung_entity]?.state) || 0
            : 0;

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.batterie_animation) {
            animStyle = getBatterieColor(charge, discharge);
        }

        let statusText = '';
        if (charge > 1) {
            statusText = formatPower(charge);
        } else if (discharge > 1) {
            statusText = '-' + formatPower(discharge);
        } else {
            statusText = 'Inaktiv';
        }

        const cardStyle = `padding: ${this.config.card_padding};`;
        const iconStyle = `font-size: ${this.config.icon_size}; color: ${iconColor};`;  // KORRIGIERT: iconColor immer verwenden
        const primaryStyle = `font-size: ${this.config.primary_size}; line-height: calc(${this.config.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${this.config.secondary_size}; line-height: calc(${this.config.secondary_size} + 2px);`;

        return html`
            <div class="card" style="${cardStyle}" @click=${() => this._handleTap(this.config.batterie_tap_action)}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                ${this.config.show_icons ? html`
                    <div class="icon" style="${iconStyle}"><ha-icon .icon=${icon}></ha-icon></div>
                ` : ''}
                <div class="primary" style="${primaryStyle}">${Math.round(percentage)}%</div>
                ${statusText ? html`<div class="secondary" style="${secondaryStyle}">${statusText}</div>` : ''}
                ${this.config.batterie_show_name ? html`<div class="secondary" style="${secondaryStyle}">Batterie</div>` : ''}
            </div>
        `;
    }

    private _renderHaus() {
        if (!this.config.haus_entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.haus_entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.haus_entity} fehlt</div>`;

        const value = parseFloat(entity.state) || 0;
        const formattedValue = formatPower(value);

        let secondaryText = '';
        if (this.config.haus_secondary_entity) {
            const secEntity = this.hass.states[this.config.haus_secondary_entity];
            if (secEntity) {
                secondaryText = `${secEntity.state} ${secEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.haus_secondary_text) {
            secondaryText = this.config.haus_secondary_text;
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.haus_animation) {
            animStyle = getHausColor(value);
        }

        const cardStyle = `padding: ${this.config.card_padding};`;
        const icon = this.config.haus_icon || 'mdi:home';
        const iconStyle = `font-size: ${this.config.icon_size}; ${animStyle.show && animStyle.color ? `color: ${animStyle.color};` : ''}`;
        const primaryStyle = `font-size: ${this.config.primary_size}; line-height: calc(${this.config.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${this.config.secondary_size}; line-height: calc(${this.config.secondary_size} + 2px);`;

        return html`
            <div class="card" style="${cardStyle}" @click=${() => this._handleTap(this.config.haus_tap_action)}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                ${this.config.show_icons ? html`
                    <div class="icon" style="${iconStyle}"><ha-icon .icon=${icon}></ha-icon></div>
                ` : ''}
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${this.config.haus_show_name ? html`<div class="secondary" style="${secondaryStyle}">Haus</div>` : ''}
            </div>
        `;
    }

    render() {
        const showTitle = this.config.show_title !== false;
        const title = showTitle ? (this.config.title || "PV Monitor") : undefined;

        return html`
                <div class="grid">
                    ${this._renderNetz()}
                    ${this._renderPV()}
                    ${this._renderBatterie()}
                    ${this._renderHaus()}
                </div>
        `;
    }
}

if (!customElements.get(CARD_TAG)) {
    customElements.define(CARD_TAG, PVMonitorCard);
}