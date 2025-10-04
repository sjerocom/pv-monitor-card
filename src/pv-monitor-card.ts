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

interface CardStyle {
    background_color?: string;
    border_color?: string;
    primary_color?: string;
    secondary_color?: string;
    icon_color?: string;
}

interface InfoBarItem {
    entity?: string;
    icon?: string;
    label?: string;
    unit?: string;
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

    info_bar?: {
        show?: boolean;
        item1?: InfoBarItem;
        item2?: InfoBarItem;
        item3?: InfoBarItem;
        style?: {
            background_color?: string;
            border_color?: string;
            border_radius?: string;
            padding?: string;
            gap?: string;
            icon_size?: string;
            icon_color?: string;
            label_size?: string;
            label_color?: string;
            label_font_weight?: string;
            value_size?: string;
            value_color?: string;
            value_font_weight?: string;
        };
    };

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
        tertiary_size?: string;
        tertiary_color?: string;
        tertiary_font_weight?: string;
        tertiary_font_opacity?: string;
    };

    netz?: {
        entity?: string;
        animation?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        text_einspeisen?: string;
        text_neutral?: string;
        text_bezug?: string;
        threshold?: number;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };

    pv?: {
        entity?: string;
        animation?: boolean;
        icon?: string;
        icon_rotation?: boolean;
        max_power?: number;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };

    batterie?: {
        entity?: string;
        animation?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        ladung_entity?: string;
        entladung_entity?: string;
        status_entity?: string;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };

    haus?: {
        entity?: string;
        animation?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };
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
        .info-bar {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 6px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        .info-bar-item {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 1;
            justify-content: center;
        }
        .info-bar-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0px;
            margin: 0;
            padding: 0;
        }
        .info-bar-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .info-bar-icon ha-icon {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .info-bar-label {
            line-height: 1;
        }
        .info-bar-value {
            line-height: 1.2;
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
            background: inherit;
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
        .tertiary {
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
            show_subtitle: config.show_subtitle !== false,
            show_icon: config.show_icon !== false,
            grid_gap: config.grid_gap ?? '6px',

            info_bar: {
                show: config.info_bar?.show === true,
                item1: {
                    icon: config.info_bar?.item1?.icon ?? 'mdi:home-lightning-bolt',
                    label: config.info_bar?.item1?.label ?? 'Autarkie',
                    ...config.info_bar?.item1
                },
                item2: {
                    icon: config.info_bar?.item2?.icon ?? 'mdi:battery-clock',
                    label: config.info_bar?.item2?.label ?? 'Restlaufzeit',
                    ...config.info_bar?.item2
                },
                item3: {
                    icon: config.info_bar?.item3?.icon ?? 'mdi:battery-charging',
                    label: config.info_bar?.item3?.label ?? 'Restladezeit',
                    ...config.info_bar?.item3
                },
                style: {
                    background_color: config.info_bar?.style?.background_color ?? 'rgba(21, 20, 27, 1)',
                    border_color: config.info_bar?.style?.border_color ?? 'rgba(255, 255, 255, 0.1)',
                    border_radius: config.info_bar?.style?.border_radius ?? '16px',
                    padding: config.info_bar?.style?.padding ?? '12px',
                    gap: config.info_bar?.style?.gap ?? '8px',
                    icon_size: config.info_bar?.style?.icon_size ?? '1.5em',
                    icon_color: config.info_bar?.style?.icon_color ?? 'white',
                    label_size: config.info_bar?.style?.label_size ?? '0.8em',
                    label_color: config.info_bar?.style?.label_color ?? 'rgba(255, 255, 255, 0.7)',
                    label_font_weight: config.info_bar?.style?.label_font_weight ?? 'normal',
                    value_size: config.info_bar?.style?.value_size ?? '1em',
                    value_color: config.info_bar?.style?.value_color ?? 'white',
                    value_font_weight: config.info_bar?.style?.value_font_weight ?? 'bold',
                    ...config.info_bar?.style
                }
            },

            style: {
                card_background_color: config.style?.card_background_color ?? 'rgba(21, 20, 27, 1)',
                card_border_color: config.style?.card_border_color ?? 'rgba(255, 255, 255, 0.1)',
                card_boxshadow: config.style?.card_boxshadow ?? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                card_border_radius: config.style?.card_border_radius ?? '16px',
                card_text_color: config.style?.card_text_color ?? 'white',
                card_cursor: config.style?.card_cursor ?? 'pointer',
                card_padding: config.style?.card_padding ?? '12px',
                title_align: config.style?.title_align ?? 'center',
                title_size: config.style?.title_size ?? '1.5em',
                title_font_weight: config.style?.title_font_weight ?? 'bold',
                title_color: config.style?.title_color ?? 'white',
                subtitle_align: config.style?.subtitle_align ?? 'center',
                subtitle_size: config.style?.subtitle_size ?? '1em',
                subtitle_font_weight: config.style?.subtitle_font_weight ?? 'normal',
                subtitle_color: config.style?.subtitle_color ?? 'rgba(255, 255, 255, 0.7)',
                icon_size: config.style?.icon_size ?? '2em',
                icon_font_weight: config.style?.icon_font_weight ?? 'normal',
                icon_opacity: config.style?.icon_opacity ?? '1',
                icon_margin: config.style?.icon_margin ?? '6px',
                primary_size: config.style?.primary_size ?? '1.2em',
                primary_color: config.style?.primary_color ?? 'white',
                primary_font_opacity: config.style?.primary_font_opacity ?? '1',
                primary_font_weight: config.style?.primary_font_weight ?? 'normal',
                secondary_size: config.style?.secondary_size ?? '0.9em',
                secondary_color: config.style?.secondary_color ?? 'white',
                secondary_font_weight: config.style?.secondary_font_weight ?? 'normal',
                secondary_font_opacity: config.style?.secondary_font_opacity ?? '0.7',
                tertiary_size: config.style?.tertiary_size ?? '0.9em',
                tertiary_color: config.style?.tertiary_color ?? 'white',
                tertiary_font_weight: config.style?.tertiary_font_weight ?? 'normal',
                tertiary_font_opacity: config.style?.tertiary_font_opacity ?? '0.7',
                ...config.style
            },

            netz: {
                animation: config.netz?.animation !== false,
                threshold: config.netz?.threshold ?? 10,
                text_einspeisen: config.netz?.text_einspeisen ?? "Einspeisung",
                text_neutral: config.netz?.text_neutral ?? "Neutral",
                text_bezug: config.netz?.text_bezug ?? "Netzbezug",
                ...config.netz
            },

            pv: {
                animation: config.pv?.animation !== false,
                icon_rotation: config.pv?.icon_rotation === true,
                max_power: config.pv?.max_power ?? 10000,
                ...config.pv
            },

            batterie: {
                animation: config.batterie?.animation !== false,
                ...config.batterie
            },

            haus: {
                animation: config.haus?.animation !== false,
                ...config.haus
            }
        };
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

    private _getCardStyle(cardStyle?: CardStyle): string {
        const s = this.config.style!;
        const bgColor = cardStyle?.background_color || s.card_background_color || 'rgba(21, 20, 27, 1)';
        const borderColor = cardStyle?.border_color || s.card_border_color || 'rgba(255, 255, 255, 0.1)';

        return `background: ${bgColor}; border: 1px solid ${borderColor}; box-shadow: ${s.card_boxshadow}; border-radius: ${s.card_border_radius}; color: ${s.card_text_color}; cursor: ${s.card_cursor}; padding: ${s.card_padding};`;
    }

    private _calculatePVRotation(value: number, maxPower: number): number {
        if (value <= 0) return 0;
        if (value >= maxPower) return 360;
        return (value / maxPower) * 360;
    }

    private _renderInfoBar() {
        if (!this.config.info_bar?.show || !this.hass) return html``;

        const ib = this.config.info_bar;
        const s = ib.style!;

        const hasAnyEntity = ib.item1?.entity || ib.item2?.entity || ib.item3?.entity;
        if (!hasAnyEntity) return html``;

        const infoBarStyle = `
        background: ${s.background_color};
        border: 1px solid ${s.border_color};
        border-radius: ${s.border_radius};
        padding: ${s.padding};
        gap: ${s.gap};
        ${s.background_color !== 'transparent' ? `box-shadow: ${this.config.style!.card_boxshadow};` : ''}
    `;

        const renderItem = (item?: InfoBarItem) => {
            if (!item?.entity) return html``;

            const entity = this.hass!.states[item.entity];
            if (!entity) return html``;

            const value = entity.state;
            const unit = item.unit ?? entity.attributes.unit_of_measurement ?? '';

            const iconStyle = `
            --mdc-icon-size: ${s.icon_size};
            color: ${s.icon_color};
            width: ${s.icon_size};
            height: ${s.icon_size};
        `;

            const labelStyle = `
            font-size: ${s.label_size};
            color: ${s.label_color};
            font-weight: ${s.label_font_weight};
        `;

            const valueStyle = `
            font-size: ${s.value_size};
            color: ${s.value_color};
            font-weight: ${s.value_font_weight};
        `;

            return html`
            <div class="info-bar-item">
                ${item.icon ? html`
                    <div class="info-bar-icon">
                        <ha-icon .icon=${item.icon} style="${iconStyle}"></ha-icon>
                    </div>
                ` : ''}
                <div class="info-bar-content">
                    ${item.label ? html`
                        <div class="info-bar-label" style="${labelStyle}">${item.label}</div>
                    ` : ''}
                    <div class="info-bar-value" style="${valueStyle}">${value}${unit ? ' ' + unit : ''}</div>
                </div>
            </div>
        `;
        };

        return html`
        <div class="info-bar" style="${infoBarStyle}">
            ${renderItem(ib.item1)}
            ${renderItem(ib.item2)}
            ${renderItem(ib.item3)}
        </div>
    `;
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

        let secondaryText = '';
        if (this.config.netz.secondary_entity) {
            const secEntity = this.hass.states[this.config.netz.secondary_entity];
            if (secEntity) {
                secondaryText = `${secEntity.state} ${secEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.netz.secondary_text) {
            secondaryText = this.config.netz.secondary_text;
        } else {
            secondaryText = statusText;
        }

        let tertiaryText = '';
        if (this.config.netz.tertiary_entity) {
            const tertEntity = this.hass.states[this.config.netz.tertiary_entity];
            if (tertEntity) {
                tertiaryText = `${tertEntity.state} ${tertEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.netz.tertiary_text) {
            tertiaryText = this.config.netz.tertiary_text;
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.netz.animation) {
            animStyle = getNetzColor(value, threshold);
        }

        const icon = this.config.netz.icon || 'mdi:transmission-tower';
        const s = this.config.style!;
        const cardStyle = this.config.netz.style;

        const iconColor = cardStyle?.icon_color || (animStyle.show && animStyle.color ? animStyle.color : '');
        const primaryColor = cardStyle?.primary_color || s.primary_color;
        const secondaryColor = cardStyle?.secondary_color || s.secondary_color;

        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; ${iconColor ? `color: ${iconColor};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${primaryColor}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${secondaryColor}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;
        const tertiaryStyle = `font-size: ${s.tertiary_size}; color: ${s.tertiary_color}; opacity: ${s.tertiary_font_opacity}; font-weight: ${s.tertiary_font_weight}; line-height: calc(${s.tertiary_size} + 2px);`;

        return html`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.netz!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.netz!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.netz!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${tertiaryText ? html`<div class="tertiary" style="${tertiaryStyle}">${tertiaryText}</div>` : ''}
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

        let tertiaryText = '';
        if (this.config.pv.tertiary_entity) {
            const tertEntity = this.hass.states[this.config.pv.tertiary_entity];
            if (tertEntity) {
                tertiaryText = `${tertEntity.state} ${tertEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.pv.tertiary_text) {
            tertiaryText = this.config.pv.tertiary_text;
        }

        const maxPower = this.config.pv.max_power || 10000;

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.pv.animation) {
            animStyle = getPVColor(value, maxPower);
        }

        const shouldRotate = this.config.pv.icon_rotation === true;
        let rotation = 0;
        if (shouldRotate) {
            try {
                rotation = getPVRotation(value, maxPower);
            } catch (e) {
                rotation = this._calculatePVRotation(value, maxPower);
            }
        }

        const icon = this.config.pv.icon || 'mdi:white-balance-sunny';
        const s = this.config.style!;
        const cardStyle = this.config.pv.style;

        const iconColor = cardStyle?.icon_color || (animStyle.show && animStyle.color ? animStyle.color : '');
        const primaryColor = cardStyle?.primary_color || s.primary_color;
        const secondaryColor = cardStyle?.secondary_color || s.secondary_color;

        const rotationStyle = shouldRotate ? `transform: rotate(${rotation}deg); transition: transform 0.5s ease;` : '';
        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; ${rotationStyle} ${iconColor ? ` color: ${iconColor};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${primaryColor}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${secondaryColor}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;
        const tertiaryStyle = `font-size: ${s.tertiary_size}; color: ${s.tertiary_color}; opacity: ${s.tertiary_font_opacity}; font-weight: ${s.tertiary_font_weight}; line-height: calc(${s.tertiary_size} + 2px);`;

        return html`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.pv!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.pv!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.pv!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${tertiaryText ? html`<div class="tertiary" style="${tertiaryStyle}">${tertiaryText}</div>` : ''}
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

        let secondaryText = '';
        if (this.config.batterie.secondary_entity) {
            const secEntity = this.hass.states[this.config.batterie.secondary_entity];
            if (secEntity) {
                secondaryText = `${secEntity.state} ${secEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.batterie.secondary_text) {
            secondaryText = this.config.batterie.secondary_text;
        } else {
            secondaryText = statusText;
        }

        let tertiaryText = '';
        if (this.config.batterie.tertiary_entity) {
            const tertEntity = this.hass.states[this.config.batterie.tertiary_entity];
            if (tertEntity) {
                tertiaryText = `${tertEntity.state} ${tertEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.batterie.tertiary_text) {
            tertiaryText = this.config.batterie.tertiary_text;
        }

        const s = this.config.style!;
        const cardStyle = this.config.batterie.style;

        const finalIconColor = cardStyle?.icon_color || iconColor;
        const primaryColor = cardStyle?.primary_color || s.primary_color;
        const secondaryColor = cardStyle?.secondary_color || s.secondary_color;

        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; color: ${finalIconColor};`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${primaryColor}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${secondaryColor}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;
        const tertiaryStyle = `font-size: ${s.tertiary_size}; color: ${s.tertiary_color}; opacity: ${s.tertiary_font_opacity}; font-weight: ${s.tertiary_font_weight}; line-height: calc(${s.tertiary_size} + 2px);`;

        return html`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.batterie!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.batterie!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.batterie!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${Math.round(percentage)}%</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${tertiaryText ? html`<div class="tertiary" style="${tertiaryStyle}">${tertiaryText}</div>` : ''}
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

        let tertiaryText = '';
        if (this.config.haus.tertiary_entity) {
            const tertEntity = this.hass.states[this.config.haus.tertiary_entity];
            if (tertEntity) {
                tertiaryText = `${tertEntity.state} ${tertEntity.attributes.unit_of_measurement || ''}`;
            }
        } else if (this.config.haus.tertiary_text) {
            tertiaryText = this.config.haus.tertiary_text;
        }

        let animStyle = { color: '', duration: 0, show: false };
        if (this.config.haus.animation) {
            animStyle = getHausColor(value);
        }

        const icon = this.config.haus.icon || 'mdi:home';
        const s = this.config.style!;
        const cardStyle = this.config.haus.style;

        const iconColor = cardStyle?.icon_color || (animStyle.show && animStyle.color ? animStyle.color : '');
        const primaryColor = cardStyle?.primary_color || s.primary_color;
        const secondaryColor = cardStyle?.secondary_color || s.secondary_color;

        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; font-weight: ${s.icon_font_weight}; ${iconColor ? `color: ${iconColor};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${primaryColor}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${secondaryColor}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;
        const tertiaryStyle = `font-size: ${s.tertiary_size}; color: ${s.tertiary_color}; opacity: ${s.tertiary_font_opacity}; font-weight: ${s.tertiary_font_weight}; line-height: calc(${s.tertiary_size} + 2px);`;

        return html`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e: Event) => this._handleAction(e, { tap: this.config.haus!.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: this.config.haus!.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: this.config.haus!.hold_action })}>
                ${animStyle.show && animStyle.color ? html`
                    <div style="${getAnimationStyle(animStyle.color, animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${icon}></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${formattedValue}</div>
                ${secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                ${tertiaryText ? html`<div class="tertiary" style="${tertiaryStyle}">${tertiaryText}</div>` : ''}
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
            ${this._renderInfoBar()}
            <div class="grid" style="gap: ${this.config.grid_gap};">
                ${this._renderPV()}
                ${this._renderBatterie()}
                ${this._renderHaus()}
                ${this._renderNetz()}
            </div>
        `;
    }
}

if (!customElements.get(CARD_TAG)) {
    customElements.define(CARD_TAG, PVMonitorCard);
}