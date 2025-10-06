import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { pvMonitorCardStyles } from "./pv-monitor-card-styles";
import { PVMonitorCardConfig, Hass, TapAction, CardStyle, InfoBarItem } from "./pv-monitor-card-types";
import { getDefaultConfig } from "./pv-monitor-card-defaults";
import { getTranslations, detectLanguage, SupportedLanguage } from "./pv-monitor-card-i18n";
import {
    formatPower,
    getBatteryIcon,
    getBatteryIconColor,
    getNetzColor,
    getPVRotation,
    getPVColor,
    getBatterieColor,
    getHausColor,
    getAnimationStyle,
    calculateBatteryRuntime,
    calculateBatteryChargeTime,
    calculateAutarky,
    calculateSelfConsumption
} from "./pv-monitor-card-utils";

const CARD_TAG = "pv-monitor-card";

export class PVMonitorCard extends LitElement {
    @property({ attribute: false }) public hass?: Hass;
    @property() private config!: PVMonitorCardConfig;

    static styles = pvMonitorCardStyles;

    public static async getConfigElement() {
        await import("./pv-monitor-card-editor");
        return document.createElement("pv-monitor-card-editor");
    }

    public static getStubConfig() {
        return {
            type: 'custom:pv-monitor-card',
            title: 'PV Monitor',
            show_title: true,
            pv: {
                entity: '',
                animation: true,
                max_power: 10000
            },
            batterie: {
                entity: '',
                animation: true
            },
            haus: {
                entity: '',
                animation: true
            },
            netz: {
                entity: '',
                animation: true,
                threshold: 10
            }
        };
    }

    public setConfig(config: PVMonitorCardConfig): void {
        if (!config) throw new Error("Fehlende Konfiguration");
        this.config = getDefaultConfig(config);
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
        } else if (tapAction.action === 'url' && tapAction.url_path) {
            window.open(tapAction.url_path, '_blank');
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

    private _getTextFromEntityOrConfig(entity?: string, text?: string): string {
        if (entity && this.hass) {
            const entityObj = this.hass.states[entity];
            if (entityObj) {
                return `${entityObj.state} ${entityObj.attributes.unit_of_measurement || ''}`;
            }
        }
        return text || '';
    }

    private _renderCard(config: {
        cardConfig: any;
        icon: string;
        primaryValue: string;
        secondaryText?: string;
        tertiaryText?: string;
        animStyle: { color: string; duration: number; show: boolean };
        iconColor?: string;
        customIconStyle?: string;
    }) {
        const s = this.config.style!;
        const cardStyle = config.cardConfig?.style;

        const iconColor = config.iconColor || (config.animStyle.show && config.animStyle.color ? config.animStyle.color : '');
        const primaryColor = cardStyle?.primary_color || s.primary_color;
        const secondaryColor = cardStyle?.secondary_color || s.secondary_color;

        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; ${config.customIconStyle || ''} ${iconColor ? `color: ${iconColor};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${primaryColor}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: calc(${s.primary_size} + 2px);`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${secondaryColor}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: calc(${s.secondary_size} + 2px);`;
        const tertiaryStyle = `font-size: ${s.tertiary_size}; color: ${s.tertiary_color}; opacity: ${s.tertiary_font_opacity}; font-weight: ${s.tertiary_font_weight}; line-height: calc(${s.tertiary_size} + 2px);`;

        return html`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e: Event) => this._handleAction(e, { tap: config.cardConfig?.tap_action })}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: config.cardConfig?.double_tap_action })}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: config.cardConfig?.hold_action })}>
                ${config.animStyle.show && config.animStyle.color ? html`
                    <div style="${getAnimationStyle(config.animStyle.color, config.animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${config.icon} style="--mdc-icon-size: ${s.icon_size}; width: ${s.icon_size}; height: ${s.icon_size};"></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${config.primaryValue}</div>
                ${config.secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${config.secondaryText}</div>` : ''}
                ${config.tertiaryText ? html`<div class="tertiary" style="${tertiaryStyle}">${config.tertiaryText}</div>` : ''}
            </div>
        `;
    }

    private _renderInfoBarItem(item?: InfoBarItem, s?: any, itemType?: string): any {
        if (!item || !this.hass) return html``;

        let value = '';
        let unit = '';

        const getCentralEntityValue = (entityKey: string): number => {
            const entityId = this.config.entities?.[entityKey as keyof typeof this.config.entities];
            if (!entityId) return 0;
            return parseFloat(this.hass!.states[entityId]?.state) || 0;
        };

        if (itemType === 'calculation') {
            const mode = this.config.info_bar?.calculation_mode || 'autarky';

            if (mode === 'autarky') {
                const pvProd = getCentralEntityValue('pv_production');
                const batteryDischarge = getCentralEntityValue('battery_discharge');
                const gridPower = getCentralEntityValue('grid_power');
                const houseConsumption = getCentralEntityValue('house_consumption');

                value = calculateAutarky(pvProd, batteryDischarge, gridPower, houseConsumption);
                unit = '';
            } else {
                const pvProd = getCentralEntityValue('pv_production');
                const gridPower = getCentralEntityValue('grid_power');

                value = calculateSelfConsumption(pvProd, gridPower);
                unit = '';
            }
        }
        else if (itemType === 'runtime' && this.config.info_bar?.calculate_battery_times) {
            const batteryCapacity = this.config.battery_capacity || 10000;
            const socPercent = getCentralEntityValue('battery_soc');
            const charge = getCentralEntityValue('battery_charge');
            const discharge = getCentralEntityValue('battery_discharge');

            value = calculateBatteryRuntime(batteryCapacity, socPercent, charge, discharge);
            unit = '';
        }
        else if (itemType === 'chargetime' && this.config.info_bar?.calculate_battery_times) {
            const batteryCapacity = this.config.battery_capacity || 10000;
            const socPercent = getCentralEntityValue('battery_soc');
            const charge = getCentralEntityValue('battery_charge');
            const discharge = getCentralEntityValue('battery_discharge');

            value = calculateBatteryChargeTime(batteryCapacity, socPercent, charge, discharge);
            unit = '';
        }
        else if (item.entity) {
            const entity = this.hass.states[item.entity];
            if (!entity) return html``;
            value = entity.state;
            unit = item.unit ?? entity.attributes.unit_of_measurement ?? '';
        } else {
            return html``;
        }

        return html`
            <div class="info-bar-item">
                ${item.icon ? html`
                    <div class="info-bar-icon">
                        <ha-icon .icon=${item.icon} style="--mdc-icon-size: ${s.icon_size}; color: ${s.icon_color}; width: ${s.icon_size}; height: ${s.icon_size};"></ha-icon>
                    </div>
                ` : ''}
                <div class="info-bar-content">
                    ${item.label ? html`<div class="info-bar-label" style="font-size: ${s.label_size}; color: ${s.label_color}; font-weight: ${s.label_font_weight};">${item.label}</div>` : ''}
                    <div class="info-bar-value" style="font-size: ${s.value_size}; color: ${s.value_color}; font-weight: ${s.value_font_weight};">${value}${unit ? ' ' + unit : ''}</div>
                </div>
            </div>
        `;
    }

    private _renderInfoBar() {
        if (!this.config.info_bar?.show || !this.hass) return html``;

        const ib = this.config.info_bar;
        const s = ib.style!;

        const hasAnyContent = ib.calculation_mode || ib.calculate_battery_times ||
            ib.item1?.entity || ib.item2?.entity || ib.item3?.entity;
        if (!hasAnyContent) return html``;

        const hasActions = ib.tap_action || ib.double_tap_action || ib.hold_action;
        const cursor = hasActions ? 'pointer' : 'default';

        const infoBarStyle = `
            background: ${s.background_color};
            border: 1px solid ${s.border_color};
            border-radius: ${s.border_radius};
            padding: ${s.padding};
            gap: ${s.gap};
            cursor: ${cursor};
            ${s.background_color !== 'transparent' ? `box-shadow: ${this.config.style!.card_boxshadow};` : ''}
        `;

        return html`
            <div class="info-bar"
                 style="${infoBarStyle}"
                 @click=${() => hasActions && this._handleTap(ib.tap_action)}
                 @dblclick=${() => hasActions && this._handleTap(ib.double_tap_action)}
                 @contextmenu=${(ev: Event) => {
                     if (hasActions && ib.hold_action) {
                         ev.preventDefault();
                         this._handleTap(ib.hold_action);
                     }
                 }}
            >
                ${this._renderInfoBarItem(ib.item1, s, 'calculation')}
                ${this._renderInfoBarItem(ib.item2, s, 'runtime')}
                ${this._renderInfoBarItem(ib.item3, s, 'chargetime')}
            </div>
        `;
    }

    private _renderNetz() {
        const entityId = this.config.netz?.entity || this.config.entities?.grid_power;
        if (!entityId || !this.hass) return html``;

        const entity = this.hass.states[entityId];
        const t = getTranslations(this.config.language);

        if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

        const value = parseFloat(entity.state) || 0;
        const threshold = this.config.netz?.threshold || this.config.grid_threshold || 10;

        let statusText = '';
        if (value < -threshold) {
            statusText = this.config.netz?.text_einspeisen || t.status.feed_in;
        } else if (value > threshold) {
            statusText = this.config.netz?.text_bezug || t.status.grid_consumption;
        } else {
            statusText = this.config.netz?.text_neutral || t.status.neutral;
        }

        const secondaryText = this._getTextFromEntityOrConfig(this.config.netz.secondary_entity, this.config.netz.secondary_text) || statusText;
        const tertiaryText = this._getTextFromEntityOrConfig(this.config.netz.tertiary_entity, this.config.netz.tertiary_text);

        return this._renderCard({
            cardConfig: this.config.netz,
            icon: this.config.netz.icon || 'mdi:transmission-tower',
            primaryValue: formatPower(value),
            secondaryText,
            tertiaryText,
            animStyle: this.config.netz.animation ? getNetzColor(value, threshold) : { color: '', duration: 0, show: false }
        });
    }

    private _renderPV() {
        const entityId = this.config.pv?.entity || this.config.entities?.pv_production;
        if (!entityId || !this.hass) return html``;

        const entity = this.hass.states[entityId];
        const t = getTranslations(this.config.language);

        if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

        const value = parseFloat(entity.state) || 0;
        const maxPower = this.config.pv?.max_power || this.config.pv_max_power || 10000;

        const shouldRotate = this.config.pv.icon_rotation === true;
        let rotation = 0;
        if (shouldRotate) {
            try {
                rotation = getPVRotation(value, maxPower);
            } catch (e) {
                rotation = this._calculatePVRotation(value, maxPower);
            }
        }

        return this._renderCard({
            cardConfig: this.config.pv,
            icon: this.config.pv.icon || 'mdi:white-balance-sunny',
            primaryValue: formatPower(value),
            secondaryText: this._getTextFromEntityOrConfig(this.config.pv.secondary_entity, this.config.pv.secondary_text),
            tertiaryText: this._getTextFromEntityOrConfig(this.config.pv.tertiary_entity, this.config.pv.tertiary_text),
            animStyle: this.config.pv.animation ? getPVColor(value, maxPower) : { color: '', duration: 0, show: false },
            customIconStyle: shouldRotate ? `transform: rotate(${rotation}deg); transition: transform 0.5s ease;` : ''
        });
    }

    private _renderBatterie() {
        const entityId = this.config.batterie?.entity || this.config.entities?.battery_soc;
        if (!entityId || !this.hass) return html``;

        const entity = this.hass.states[entityId];
        const t = getTranslations(this.config.language);

        if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

        const percentage = parseFloat(entity.state) || 0;
        const icon = this.config.batterie.icon || getBatteryIcon(percentage);
        const iconColor = getBatteryIconColor(percentage);

        const chargeEntityId = this.config.batterie.ladung_entity || this.config.entities?.battery_charge;
        const dischargeEntityId = this.config.batterie.entladung_entity || this.config.entities?.battery_discharge;

        const charge = chargeEntityId && this.hass.states[chargeEntityId]
            ? parseFloat(this.hass.states[chargeEntityId]?.state) || 0
            : 0;
        const discharge = dischargeEntityId && this.hass.states[dischargeEntityId]
            ? parseFloat(this.hass.states[dischargeEntityId]?.state) || 0
            : 0;

        const batteryCapacity = this.config.batterie.battery_capacity || this.config.battery_capacity || 10000;

        let statusText = '';
        if (charge > 1) {
            statusText = formatPower(charge);
        } else if (discharge > 1) {
            statusText = '-' + formatPower(discharge);
        } else {
            statusText = t.general.inactive;
        }

        const secondaryText = this._getTextFromEntityOrConfig(this.config.batterie.secondary_entity, this.config.batterie.secondary_text) || statusText;
        const tertiaryText = this._getTextFromEntityOrConfig(this.config.batterie.tertiary_entity, this.config.batterie.tertiary_text);

        return this._renderCard({
            cardConfig: this.config.batterie,
            icon,
            primaryValue: `${Math.round(percentage)}%`,
            secondaryText,
            tertiaryText,
            animStyle: this.config.batterie.animation ? getBatterieColor(charge, discharge, batteryCapacity) : { color: '', duration: 0, show: false },
            iconColor: this.config.batterie.style?.icon_color || iconColor
        });
    }

    private _renderHaus() {
        const entityId = this.config.haus?.entity || this.config.entities?.house_consumption;
        if (!entityId || !this.hass) return html``;

        const entity = this.hass.states[entityId];
        const t = getTranslations(this.config.language);

        if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

        const value = parseFloat(entity.state) || 0;

        return this._renderCard({
            cardConfig: this.config.haus,
            icon: this.config.haus.icon || 'mdi:home',
            primaryValue: formatPower(value),
            secondaryText: this._getTextFromEntityOrConfig(this.config.haus.secondary_entity, this.config.haus.secondary_text),
            tertiaryText: this._getTextFromEntityOrConfig(this.config.haus.tertiary_entity, this.config.haus.tertiary_text),
            animStyle: this.config.haus.animation ? getHausColor(value) : { color: '', duration: 0, show: false }
        });
    }

    render() {
        const s = this.config.style!;
        const showTitle = this.config.show_title && this.config.title;
        const showSubtitle = this.config.show_subtitle && this.config.subtitle;
        const showIcon = this.config.show_icon && this.config.icon;

        const infoBarPosition = this.config.info_bar?.position || 'top';

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

        const headerStyle = `
            margin-bottom: ${s.header_margin_bottom || '12px'};
        `;

        return html`
            ${showTitle || showSubtitle ? html`
                <div class="card-header" style="${headerStyle}">
                    ${showIcon ? html`
                        <div class="card-header-with-icon">
                            <ha-icon .icon=${this.config.icon} style="${headerIconStyle}"></ha-icon>
                            <div class="card-header-text">
                                ${showTitle ? html`<h2 style="${titleStyle}">${this.config.title}</h2>` : ''}
                                ${showSubtitle ? html`<p style="${subtitleStyle}">${this.config.subtitle}</p>` : ''}
                            </div>
                        </div>
                    ` : html`
                        ${showTitle ? html`<h2 style="${titleStyle}">${this.config.title}</h2>` : ''}
                        ${showSubtitle ? html`<p style="${subtitleStyle}">${this.config.subtitle}</p>` : ''}
                    `}
                </div>
            ` : ''}
            ${infoBarPosition === 'top' ? this._renderInfoBar() : ''}
            <div class="grid" style="gap: ${this.config.grid_gap}; ${infoBarPosition === 'top' && this.config.info_bar?.show ? `margin-top: ${s.infobar_gap || '6px'};` : ''}">
                ${this.config.pv?.show !== false ? this._renderPV() : ''}
                ${this.config.batterie?.show !== false ? this._renderBatterie() : ''}
                ${this.config.haus?.show !== false ? this._renderHaus() : ''}
                ${this.config.netz?.show !== false ? this._renderNetz() : ''}
            </div>
            ${infoBarPosition === 'bottom' ? html`
                <div style="margin-top: ${s.infobar_gap || '6px'};">
                    ${this._renderInfoBar()}
                </div>
            ` : ''}
        `;
    }
}

if (!customElements.get(CARD_TAG)) {
    customElements.define(CARD_TAG, PVMonitorCard);
}