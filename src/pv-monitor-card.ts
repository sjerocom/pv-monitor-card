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
    target?: any;
    data?: any;
}

export interface PVMonitorCardConfig {
    type: string;
    title?: string;
    show_title?: boolean;
    subtitle?: string;
    show_subtitle?: boolean;
    icon?: string;
    show_icon?: boolean;
    grid_gap?: string;

    style?: {
        card_background_color?: string;
        card_border_color?: string;
        card_boxshadow?: string;
        card_border_radius?: string;
        card_text_color?: string;
        card_cursor?: string;
        card_padding?: string;
        title_align?: "left" | "center" | "right";
        title_size?: string;
        title_font_weight?: string;
        title_color?: string;
        subtitle_align?: "left" | "center" | "right";
        subtitle_size?: string;
        subtitle_font_weight?: string;
        subtitle_color?: string;
        icon_size?: string;
        icon_font_weight?: string;
        icon_opacity?: string;
        icon_margin?: string;
        primary_size?: string;
        primary_color?: string;
        primary_font_opacity?: string;
        primary_font_weight?: string;
        secondary_size?: string;
        secondary_color?: string;
        secondary_font_weight?: string;
        secondary_font_opacity?: string;
    };

    netz?: {
        entity?: string;
        animation?: boolean;
        show_name?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        text_einspeisen?: string;
        text_neutral?: string;
        text_bezug?: string;
        threshold?: number;
    };

    pv?: {
        entity?: string;
        animation?: boolean;
        show_name?: boolean;
        icon?: string;
        icon_animation?: boolean;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        secondary_entity?: string;
        secondary_text?: string;
    };

    batterie?: {
        entity?: string;
        animation?: boolean;
        show_name?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        ladung_entity?: string;
        entladung_entity?: string;
        status_entity?: string;
    };

    haus?: {
        entity?: string;
        animation?: boolean;
        show_name?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        secondary_entity?: string;
        secondary_text?: string;
    };

    // Legacy-Support (alte Struktur)
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
        .card-header {
            text-align: center;
            margin-bottom: 12px;
        }
        .card-header-with-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
        }
        .card {
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
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

        // Migration: Alte Config-Struktur in neue überführen
        const migratedConfig = this._migrateConfig(config);

        this.config = {
            ...migratedConfig,
            show_title: migratedConfig.show_title !== false,
            show_subtitle: migratedConfig.show_subtitle !== false,
            show_icon: migratedConfig.show_icon !== false,
            grid_gap: migratedConfig.grid_gap ?? '6px',

            style: {
                card_background_color: migratedConfig.style?.card_background_color ?? 'rgba(21, 20, 27, 0.6)',
                card_border_color: migratedConfig.style?.card_border_color ?? 'rgba(255, 255, 255, 0.1)',
                card_boxshadow: migratedConfig.style?.card_boxshadow ?? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                card_border_radius: migratedConfig.style?.card_border_radius ?? '16px',
                card_text_color: migratedConfig.style?.card_text_color ?? 'white',
                card_cursor: migratedConfig.style?.card_cursor ?? 'pointer',
                card_padding: migratedConfig.style?.card_padding ?? '12px',
                title_align: migratedConfig.style?.title_align ?? 'center',
                title_size: migratedConfig.style?.title_size ?? '1.5em',
                title_font_weight: migratedConfig.style?.title_font_weight ?? 'bold',
                title_color: migratedConfig.style?.title_color ?? 'white',
                subtitle_align: migratedConfig.style?.subtitle_align ?? 'center',
                subtitle_size: migratedConfig.style?.subtitle_size ?? '1em',
                subtitle_font_weight: migratedConfig.style?.subtitle_font_weight ?? 'normal',
                subtitle_color: migratedConfig.style?.subtitle_color ?? 'rgba(255, 255, 255, 0.7)',
                icon_size: migratedConfig.style?.icon_size ?? '2em',
                icon_font_weight: migratedConfig.style?.icon_font_weight ?? 'normal',
                icon_opacity: migratedConfig.style?.icon_opacity ?? '1',
                icon_margin: migratedConfig.style?.icon_margin ?? '6px',
                primary_size: migratedConfig.style?.primary_size ?? '1.2em',
                primary_color: migratedConfig.style?.primary_color ?? 'white',
                primary_font_opacity: migratedConfig.style?.primary_font_opacity ?? '1',
                primary_font_weight: migratedConfig.style?.primary_font_weight ?? 'normal',
                secondary_size: migratedConfig.style?.secondary_size ?? '0.9em',
                secondary_color: migratedConfig.style?.secondary_color ?? 'white',
                secondary_font_weight: migratedConfig.style?.secondary_font_weight ?? 'normal',
                secondary_font_opacity: migratedConfig.style?.secondary_font_opacity ?? '0.7',
                ...migratedConfig.style
            },

            netz: {
                animation: migratedConfig.netz?.animation !== false,
                show_name: migratedConfig.netz?.show_name !== false,
                threshold: migratedConfig.netz?.threshold ?? 10,
                text_einspeisen: migratedConfig.netz?.text_einspeisen ?? "Einspeisung",
                text_neutral: migratedConfig.netz?.text_neutral ?? "Neutral",
                text_bezug: migratedConfig.netz?.text_bezug ?? "Netzbezug",
                ...migratedConfig.netz
            },

            pv: {
                animation: migratedConfig.pv?.animation !== false,
                show_name: migratedConfig.pv?.show_name !== false,
                icon_animation: migratedConfig.pv?.icon_animation !== false,
                ...migratedConfig.pv
            },

            batterie: {
                animation: migratedConfig.batterie?.animation !== false,
                show_name: migratedConfig.batterie?.show_name !== false,
                ...migratedConfig.batterie
            },

            haus: {
                animation: migratedConfig.haus?.animation !== false,
                show_name: migratedConfig.haus?.show_name !== false,
                ...migratedConfig.haus
            }
        };
    }

    // Migration von alter zu neuer Config-Struktur
    private _migrateConfig(config: PVMonitorCardConfig): PVMonitorCardConfig {
        const migrated: PVMonitorCardConfig = { ...config };

        // Wenn alte Struktur verwendet wird, in neue überführen
        if (config.netz_entity && !config.netz) {
            migrated.netz = {
                entity: config.netz_entity,
                animation: config.netz_animation,
                show_name: config.netz_show_name,
                icon: config.netz_icon,
                tap_action: config.netz_tap_action,
                text_einspeisen: config.netz_text_einspeisen,
                text_neutral: config.netz_text_neutral,
                text_bezug: config.netz_text_bezug,
                threshold: config.netz_threshold
            };
        }

        if (config.pv_entity && !config.pv) {
            migrated.pv = {
                entity: config.pv_entity,
                animation: config.pv_animation,
                show_name: config.pv_show_name,
                icon: config.pv_icon,
                tap_action: config.pv_tap_action,
                secondary_entity: config.pv_secondary_entity,
                secondary_text: config.pv_secondary_text
            };
        }

        if (config.batterie_entity && !config.batterie) {
            migrated.batterie = {
                entity: config.batterie_entity,
                animation: config.batterie_animation,
                show_name: config.batterie_show_name,
                tap_action: config.batterie_tap_action,
                ladung_entity: config.batterie_ladung_entity,
                entladung_entity: config.batterie_entladung_entity,
                status_entity: config.batterie_status_entity
            };
        }

        if (config.haus_entity && !config.haus) {
            migrated.haus = {
                entity: config.haus_entity,
                animation: config.haus_animation,
                show_name: config.haus_show_name,
                icon: config.haus_icon,
                tap_action: config.haus_tap_action,
                secondary_entity: config.haus_secondary_entity,
                secondary_text: config.haus_secondary_text
            };
        }

        // Style-Migration
        if (!config.style && (config.icon_size || config.primary_size || config.secondary_size || config.card_padding)) {
            migrated.style = {
                icon_size: config.icon_size,
                primary_size: config.primary_size,
                secondary_size: config.secondary_size,
                card_padding: config.card_padding
            };
        }

        return migrated;
    }

    getCardSize() {
        return 3;
    }

    private _handleAction(event: Event, actions: { tap?: TapAction; double_tap?: TapAction; hold?: TapAction }) {
        const actionType = event.type === 'dblclick' ? 'double_tap' : event.type === 'contextmenu' ? 'hold' : 'tap';
        const action = actions[actionType];

        if (event.type === 'contextmenu') {
            event.preventDefault();
        }

        this._handleTap(action);
    }

    private _handleTap(tapAction?: TapAction) {
        if (!tapAction || tapAction.action === 'none') return;

        if (tapAction.action === 'navigate' && tapAction.navigation_path) {
            history.pushState(null, '', tapAction.navigation_path);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else if (tapAction.action === 'call-service' && tapAction.service && this.hass) {
            const [domain, service] = tapAction.service.split('.');

            if (this.hass.callService) {
                this.hass.callService(domain, service, tapAction.service_data || {});
            } else {
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

    private _getCardStyle(): string {
        const s = this.config.style!;
        return `
            background: ${s.card_background_color};
            border: 1px solid ${s.card_border_color};
            box-shadow: ${s.card_boxshadow};
            border-radius: ${s.card_border_radius};
            color: ${s.card_text_color};
            cursor: ${s.card_cursor};
            padding: ${s.card_padding};
        `;
    }

    private _getCardAfterStyle(): string {
        const s = this.config.style!;
        return `background: ${s.card_background_color};`;
    }

    private _renderNetz() {
        if (!this.config.netz?.entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.netz.entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.netz.entity} fehlt</div>`;

        const value = parseFloat(entity.state) || 0;
        const formattedValue = formatPower(value);
        const threshold = this.config.netz.threshold || 10;

        let statusText = '';
        if (value < -threshold) {
            statusText = this.config.netz.text_einspeisen || 'Einspeisung';
        } else if (value > threshold) {
            statusText = this.config.netz.text_bezug || 'Netzbezug';
        } else {
            statusText = this.config.netz.text_neutral || 'Neutral';
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.netz.animation) {
            animStyle = getNetzColor(value, threshold);
        }

        const icon = this.config.netz.icon || 'mdi:transmission-tower';
        const s = this.config.style!;
        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; ${animStyle.show && animStyle.color ? `color: ${animStyle.color};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${s.primary_color}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${s.secondary_color}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;

        return html`
            <div class="card" 
                 style="${this._getCardStyle()}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.netz!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.netz!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.netz!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                <div class="secondary" style="${secondaryStyle}">${statusText}</div>
                ${this.config.netz.show_name ? html`<div class="secondary" style="${secondaryStyle}">Netz</div>` : ''}
            </div>
        `;
    }

    private _renderPV() {
        if (!this.config.pv?.entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.pv.entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.pv.entity} fehlt</div>`;

        const value = parseFloat(entity.state) || 0;
        const formattedValue = formatPower(value);

        let secondaryText = '';
        if (this.config.pv.secondary_entity) {
            const secEntity = this.hass.states[this.config.pv.secondary_entity];
            if (secEntity) {
                secondaryText = `${secEntity.state} ${secEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.pv.secondary_text) {
            secondaryText = this.config.pv.secondary_text;
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.pv.animation) {
            animStyle = getPVColor(value);
        }

        const rotation = this.config.pv.icon_animation ? getPVRotation(value) : 0;
        const icon = this.config.pv.icon || 'mdi:white-balance-sunny';
        const s = this.config.style!;
        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; transform: rotate(${rotation}deg); transition: transform 0.5s ease; ${animStyle.show && animStyle.color ? `color: ${animStyle.color};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${s.primary_color}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${s.secondary_color}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;

        return html`
            <div class="card" 
                 style="${this._getCardStyle()}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.pv!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.pv!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.pv!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${this.config.pv.show_name ? html`<div class="secondary" style="${secondaryStyle}">PV</div>` : ''}
            </div>
        `;
    }

    private _renderBatterie() {
        if (!this.config.batterie?.entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.batterie.entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.batterie.entity} fehlt</div>`;

        const percentage = parseFloat(entity.state) || 0;
        const icon = this.config.batterie.icon || getBatteryIcon(percentage);
        const iconColor = getBatteryIconColor(percentage);

        const charge = this.config.batterie.ladung_entity
            ? parseFloat(this.hass.states[this.config.batterie.ladung_entity]?.state) || 0
            : 0;
        const discharge = this.config.batterie.entladung_entity
            ? parseFloat(this.hass.states[this.config.batterie.entladung_entity]?.state) || 0
            : 0;

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.batterie.animation) {
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

        const s = this.config.style!;
        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; color: ${iconColor};`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${s.primary_color}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${s.secondary_color}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;

        return html`
            <div class="card" 
                 style="${this._getCardStyle()}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.batterie!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.batterie!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.batterie!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${Math.round(percentage)}%</div>
                ${statusText ? html`<div class="secondary" style="${secondaryStyle}">${statusText}</div>` : ''}
                ${this.config.batterie.show_name ? html`<div class="secondary" style="${secondaryStyle}">Batterie</div>` : ''}
            </div>
        `;
    }

    private _renderHaus() {
        if (!this.config.haus?.entity || !this.hass) return html``;
        const entity = this.hass.states[this.config.haus.entity];
        if (!entity) return html`<div class="card">⚠️ ${this.config.haus.entity} fehlt</div>`;

        const value = parseFloat(entity.state) || 0;
        const formattedValue = formatPower(value);

        let secondaryText = '';
        if (this.config.haus.secondary_entity) {
            const secEntity = this.hass.states[this.config.haus.secondary_entity];
            if (secEntity) {
                secondaryText = `${secEntity.state} ${secEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.haus.secondary_text) {
            secondaryText = this.config.haus.secondary_text;
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.haus.animation) {
            animStyle = getHausColor(value);
        }

        const icon = this.config.haus.icon || 'mdi:home';
        const s = this.config.style!;
        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; ${animStyle.show && animStyle.color ? `color: ${animStyle.color};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${s.primary_color}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${s.secondary_color}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;

        return html`
            <div class="card" 
                 style="${this._getCardStyle()}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.haus!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.haus!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.haus!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${this.config.haus.show_name ? html`<div class="secondary" style="${secondaryStyle}">Haus</div>` : ''}
            </div>
        `;
    }

    render() {
        const s = this.config.style!;
        const showTitle = this.config.show_title && this.config.title;
        const showSubtitle = this.config.show_subtitle && this.config.subtitle;
        const showIcon = this.config.show_icon && this.config.icon;

        const titleStyle = `
            text-align: ${s.title_align};
            font-size: ${s.title_size};
            font-weight: ${s.title_font_weight};
            color: ${s.title_color};
            margin: 0;
        `;

        const subtitleStyle = `
            text-align: ${s.subtitle_align};
            font-size: ${s.subtitle_size};
            font-weight: ${s.subtitle_font_weight};
            color: ${s.subtitle_color};
            margin: 4px 0 0 0;
        `;

        const headerIconStyle = `
            font-size: ${s.title_size};
            color: ${s.title_color};
        `;

        return html`
            ${showTitle || showSubtitle ? html`
                <div class="card-header">
                    ${showIcon && showTitle ? html`
                        <div class="card-header-with-icon">
                            <ha-icon .icon=${this.config.icon} style="${headerIconStyle}"></ha-icon>
                            <h2 style="${titleStyle}">${this.config.title}</h2>
                        </div>
                    ` : showTitle ? html`
                        <h2 style="${titleStyle}">${this.config.title}</h2>
                    ` : ''}
                    ${showSubtitle ? html`
                        <p style="${subtitleStyle}">${this.config.subtitle}</p>
                    ` : ''}
                </div>
            ` : ''}
            <div class="grid" style="gap: ${this.config.grid_gap};">
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