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
    getPVRotationSpeed,
    getPVColor,
    getBatterieColor,
    getHausColor,
    getAnimationStyle,
    getAnimationStyleByType,
    calculateBatteryRuntime,
    calculateBatteryChargeTime,
    calculateAutarky,
    calculateSelfConsumption,
    getConsumerColor
} from "./pv-monitor-card-utils";

declare const __BUILD_TIMESTAMP__: string;
declare const __CARD_NAME__: string;

const CARD_TAG = typeof __CARD_NAME__ !== 'undefined' ? __CARD_NAME__ : 'pv-monitor-card';

export class PVMonitorCard extends LitElement {
    @property({ attribute: false }) public hass?: Hass;
    @property() private config!: PVMonitorCardConfig;
    @property() private _consumersVisible: boolean = true;

    static styles = pvMonitorCardStyles;

    public static async getConfigElement() {
        await import('./pv-monitor-card-editor');
        return document.createElement(`${CARD_TAG}-editor`);
    }

    public static getStubConfig() {
        return {
            type: `custom:${CARD_TAG}`,
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

    private _handleAction(event: Event, actions: { tap?: TapAction; double_tap?: TapAction; hold?: TapAction }, isHausCard: boolean = false) {
        // Check if we should toggle consumers instead of normal tap action
        if (isHausCard && this.config.consumers?.show && (this.config.consumers?.items?.length ?? 0) > 0) {
            if (event.type === 'click') {
                this._consumersVisible = !this._consumersVisible;
                this.requestUpdate();
                return;
            }
        }

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

            // Merge service_data and target into serviceData
            const serviceData: any = { ...(tapAction.service_data || {}) };

            // If target is specified, merge it into serviceData
            if (tapAction.target) {
                Object.assign(serviceData, tapAction.target);
            }

            if (this.hass.callService) {
                this.hass.callService(domain, service, serviceData);
            } else {
                window.dispatchEvent(new CustomEvent('hass-call-service', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        domain,
                        service,
                        serviceData
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
        isHausCard?: boolean;
    }) {
        const s = this.config.style!;
        const cardStyle = config.cardConfig?.style;

        const iconColor = config.iconColor || (config.animStyle.show && config.animStyle.color ? config.animStyle.color : '');
        const primaryColor = cardStyle?.primary_color || s.primary_color;
        const secondaryColor = cardStyle?.secondary_color || s.secondary_color;

        const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; ${config.customIconStyle || ''} ${iconColor ? `color: ${iconColor};` : ''}`;
        const primaryStyle = `font-size: ${s.primary_size}; color: ${primaryColor}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: ${s.primary_line_height};`;
        const secondaryStyle = `font-size: ${s.secondary_size}; color: ${secondaryColor}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: ${s.secondary_line_height};`;
        const tertiaryStyle = `font-size: ${s.tertiary_size}; color: ${s.tertiary_color}; opacity: ${s.tertiary_font_opacity}; font-weight: ${s.tertiary_font_weight}; line-height: ${s.tertiary_line_height};`;

        // Get animation style type from card config, default to 'rotating-dots'
        const animationType = config.cardConfig?.animation_style || 'rotating-dots';
        const isHaus = config.isHausCard || false;

        return html`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e: Event) => this._handleAction(e, { tap: config.cardConfig?.tap_action }, isHaus)}
                 @dblclick=${(e: Event) => this._handleAction(e, { double_tap: config.cardConfig?.double_tap_action }, isHaus)}
                 @contextmenu=${(e: Event) => this._handleAction(e, { hold: config.cardConfig?.hold_action }, isHaus)}>
                ${config.animStyle.show && config.animStyle.color ? html`
                    <div style="${getAnimationStyleByType(animationType, config.animStyle.color, config.animStyle.duration)}"></div>
                ` : ''}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${config.icon} style="--mdc-icon-size: ${s.icon_size}; width: ${s.icon_size}; height: ${s.icon_size};"></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${config.primaryValue}</div>
                ${config.secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${config.secondaryText}</div>` : ''}
                ${config.tertiaryText ? html`<div class="tertiary" style="${tertiaryStyle}">${config.tertiaryText}</div>` : ''}
            </div>
        `;
    }

    private _renderInfoBarItem(item?: InfoBarItem, s?: any, itemCalcType?: string): any {
        if (!item || !this.hass) return html``;

        let value = '';
        let unit = '';

        const getCentralEntityValue = (entityKey: string): number => {
            const entityId = this.config.entities?.[entityKey as keyof typeof this.config.entities];
            if (!entityId) return 0;
            return parseFloat(this.hass!.states[entityId]?.state) || 0;
        };

        if (itemCalcType === 'autarky') {
            const pvProd = getCentralEntityValue('pv_production');
            const batteryDischarge = getCentralEntityValue('battery_discharge');
            const gridPower = getCentralEntityValue('grid_power');
            const houseConsumption = getCentralEntityValue('house_consumption');
            value = calculateAutarky(pvProd, batteryDischarge, gridPower, houseConsumption);
            unit = '';
        } else if (itemCalcType === 'self_consumption') {
            const pvProd = getCentralEntityValue('pv_production');
            const gridPower = getCentralEntityValue('grid_power');
            value = calculateSelfConsumption(pvProd, gridPower);
            unit = '';
        } else if (itemCalcType === 'runtime') {
            const batteryCapacity = this.config.battery_capacity || 10000;
            const socPercent = getCentralEntityValue('battery_soc');
            const charge = getCentralEntityValue('battery_charge');
            const discharge = getCentralEntityValue('battery_discharge');
            value = calculateBatteryRuntime(batteryCapacity, socPercent, charge, discharge);
            unit = '';
        } else if (itemCalcType === 'chargetime') {
            const batteryCapacity = this.config.battery_capacity || 10000;
            const socPercent = getCentralEntityValue('battery_soc');
            const charge = getCentralEntityValue('battery_charge');
            const discharge = getCentralEntityValue('battery_discharge');
            value = calculateBatteryChargeTime(batteryCapacity, socPercent, charge, discharge);
            unit = '';
        } else if (item.entity) {
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
                    ${item.label ? html`<div class="info-bar-label" style="font-size: ${s.label_size}; color: ${s.label_color}; font-weight: ${s.label_font_weight}; line-height: ${s.label_line_height};">${item.label}</div>` : ''}
                    <div class="info-bar-value" style="font-size: ${s.value_size}; color: ${s.value_color}; font-weight: ${s.value_font_weight}; line-height: ${s.value_line_height};">${value}${unit ? ' ' + unit : ''}</div>
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
                ${this._renderInfoBarItem(ib.item1, s, ib.item1_calc_type || ib.calculation_mode)}
                ${this._renderInfoBarItem(ib.item2, s, ib.item2_calc_type)}
                ${this._renderInfoBarItem(ib.item3, s, ib.item3_calc_type)}
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

        // Calculate rotation speed based on power
        const shouldRotate = this.config.pv.icon_rotation === true;
        let customIconStyle = '';

        if (shouldRotate) {
            const rotationSpeed = getPVRotationSpeed(value, maxPower);
            customIconStyle = `animation: continuousRotation ${rotationSpeed}s linear infinite;`;
        }

        return this._renderCard({
            cardConfig: this.config.pv,
            icon: this.config.pv.icon || 'mdi:white-balance-sunny',
            primaryValue: formatPower(value),
            secondaryText: this._getTextFromEntityOrConfig(this.config.pv.secondary_entity, this.config.pv.secondary_text),
            tertiaryText: this._getTextFromEntityOrConfig(this.config.pv.tertiary_entity, this.config.pv.tertiary_text),
            animStyle: this.config.pv.animation ? getPVColor(value, maxPower) : { color: '', duration: 0, show: false },
            customIconStyle: customIconStyle
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

        // Calculate total consumer consumption if enabled
        let secondaryText = this._getTextFromEntityOrConfig(this.config.haus.secondary_entity, this.config.haus.secondary_text);

        if (this.config.haus.show_consumer_total && this.config.consumers?.show && this.config.consumers.items) {
            const totalConsumerPower = this._calculateTotalConsumerPower();
            if (totalConsumerPower > 0) {
                secondaryText = formatPower(totalConsumerPower);
            }
        }

        return this._renderCard({
            cardConfig: this.config.haus,
            icon: this.config.haus.icon || 'mdi:home',
            primaryValue: formatPower(value),
            secondaryText,
            tertiaryText: this._getTextFromEntityOrConfig(this.config.haus.tertiary_entity, this.config.haus.tertiary_text),
            animStyle: this.config.haus.animation ? getHausColor(value) : { color: '', duration: 0, show: false },
            isHausCard: true
        });
    }

    private _calculateTotalConsumerPower(): number {
        if (!this.config.consumers?.items || !this.hass) return 0;

        const items = this.config.consumers.items;
        const globalThreshold = this.config.consumers.threshold ?? 0;

        let total = 0;
        for (const item of items) {
            const entity = this.hass.states[item.entity];
            if (!entity) continue;

            const value = parseFloat(entity.state) || 0;
            const threshold = item.threshold !== undefined ? item.threshold : globalThreshold;

            if (value > threshold) {
                total += value;
            }
        }

        return total;
    }

    private _renderConsumers() {
        if (!this.config.consumers?.show || !this.hass || !this._consumersVisible) return html``;

        const items = this.config.consumers.items || [];
        if (items.length === 0) return html``;

        const globalThreshold = this.config.consumers.threshold ?? 0;
        const globalStyle = this.config.consumers.style!;

        // Prepare consumer data with values
        const consumerData = items.map(item => {
            const entity = this.hass!.states[item.entity];
            if (!entity) return null;

            const value = parseFloat(entity.state) || 0;
            const threshold = item.threshold !== undefined ? item.threshold : globalThreshold;

            // Skip if below threshold
            if (value <= threshold) return null;

            return {
                item,
                entity,
                value,
                label: item.label || entity.attributes.friendly_name || item.entity
            };
        }).filter(d => d !== null);

        if (consumerData.length === 0) return html``;

        // Sort consumers based on sort_mode
        const sortMode = this.config.consumers.sort_mode || 'highest_first';
        if (sortMode === 'highest_first') {
            consumerData.sort((a, b) => b!.value - a!.value);
        } else if (sortMode === 'lowest_first') {
            consumerData.sort((a, b) => a!.value - b!.value);
        } else if (sortMode === 'alpha_asc') {
            consumerData.sort((a, b) => a!.label.localeCompare(b!.label));
        } else if (sortMode === 'alpha_desc') {
            consumerData.sort((a, b) => b!.label.localeCompare(a!.label));
        }
        // 'none' keeps the original order

        return html`
            <div class="consumers-bar" style="gap: ${globalStyle.gap};">
                ${consumerData.map(data => this._renderConsumerItem(data!))}
            </div>
        `;
    }

    private _renderConsumerItem(data: { item: any; entity: any; value: number; label: string }) {
        const { item, entity, value, label } = data;
        const globalStyle = this.config.consumers!.style!;

        // Determine styles - item-specific overrides global
        const itemStyle = item.style || {};
        const bgColor = itemStyle.background_color || globalStyle.item_background_color;
        const borderColor = itemStyle.border_color || globalStyle.item_border_color;
        const borderRadius = itemStyle.border_radius || globalStyle.item_border_radius;
        const padding = itemStyle.padding || globalStyle.item_padding;
        const margin = itemStyle.margin || globalStyle.item_margin;
        const boxShadow = itemStyle.box_shadow || globalStyle.item_box_shadow;

        const iconSize = itemStyle.icon_size || globalStyle.icon_size;
        const iconOpacity = itemStyle.icon_opacity || globalStyle.icon_opacity;

        const primarySize = itemStyle.primary_size || globalStyle.primary_size;
        const primaryFontWeight = itemStyle.primary_font_weight || globalStyle.primary_font_weight;
        const primaryOpacity = itemStyle.primary_opacity || globalStyle.primary_opacity;

        const secondarySize = itemStyle.secondary_size || globalStyle.secondary_size;
        const secondaryFontWeight = itemStyle.secondary_font_weight || globalStyle.secondary_font_weight;
        const secondaryOpacity = itemStyle.secondary_opacity || globalStyle.secondary_opacity;

        // Determine icon color
        let iconColor = '';
        if (item.auto_color !== false) {
            iconColor = getConsumerColor(value);
        } else {
            iconColor = itemStyle.icon_color || '';
        }

        const primaryColor = itemStyle.primary_color || 'white';
        const secondaryColor = itemStyle.secondary_color || 'white';

        const containerStyle = `
            background: ${bgColor};
            border: 1px solid ${borderColor};
            border-radius: ${borderRadius};
            padding: ${padding};
            margin: ${margin};
            box-shadow: ${boxShadow};
        `;

        const iconStyle = `
            font-size: ${iconSize};
            opacity: ${iconOpacity};
            ${iconColor ? `color: ${iconColor};` : ''}
        `;

        const primaryStyle = `
            font-size: ${primarySize};
            font-weight: ${primaryFontWeight};
            opacity: ${primaryOpacity};
            color: ${primaryColor};
        `;

        const secondaryStyle = `
            font-size: ${secondarySize};
            font-weight: ${secondaryFontWeight};
            opacity: ${secondaryOpacity};
            color: ${secondaryColor};
        `;

        const icon = item.icon || 'mdi:flash';

        // Determine primary text (value line)
        let primaryText = '';
        const showPrimary = item.show_primary !== false;
        if (showPrimary) {
            if (item.primary_text) {
                primaryText = item.primary_text;
            } else if (item.primary_entity && this.hass) {
                const primaryEntity = this.hass.states[item.primary_entity];
                if (primaryEntity) {
                    primaryText = `${primaryEntity.state} ${primaryEntity.attributes.unit_of_measurement || ''}`;
                } else {
                    primaryText = formatPower(value);
                }
            } else {
                primaryText = formatPower(value);
            }
        }

        // Determine secondary text (label line)
        let secondaryText = '';
        const showSecondary = item.show_secondary !== false;
        if (showSecondary) {
            if (item.secondary_text) {
                secondaryText = item.secondary_text;
            } else if (item.secondary_entity && this.hass) {
                const secondaryEntity = this.hass.states[item.secondary_entity];
                if (secondaryEntity) {
                    secondaryText = `${secondaryEntity.state} ${secondaryEntity.attributes.unit_of_measurement || ''}`;
                } else {
                    secondaryText = label;
                }
            } else {
                secondaryText = label;
            }
        }

        // Prepare tap actions - if switch_entity is set, use toggle action by default
        const hasSwitchEntity = !!item.switch_entity;
        const tapAction = item.tap_action || (hasSwitchEntity ? { action: 'call-service', service: 'switch.toggle', target: { entity_id: item.switch_entity } } : { action: 'none' });
        const doubleTapAction = item.double_tap_action || { action: 'none' };
        const holdAction = item.hold_action || { action: 'none' };

        return html`
            <div class="consumer-item"
                 style="${containerStyle}"
                 @click=${(e: Event) => this._handleConsumerAction(e, tapAction)}
                 @dblclick=${(e: Event) => this._handleConsumerAction(e, doubleTapAction)}
                 @contextmenu=${(e: Event) => {
                     e.preventDefault();
                     this._handleConsumerAction(e, holdAction);
                 }}>
                <div class="icon" style="${iconStyle}">
                    <ha-icon .icon=${icon} style="--mdc-icon-size: ${iconSize}; width: ${iconSize}; height: ${iconSize};"></ha-icon>
                </div>
                <div class="consumer-content">
                    ${showPrimary ? html`<div class="primary" style="${primaryStyle}">${primaryText}</div>` : ''}
                    ${showSecondary ? html`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ''}
                </div>
            </div>
        `;
    }

    private _handleConsumerAction(event: Event, action?: TapAction) {
        if (!action || action.action === 'none') return;
        this._handleTap(action);
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
            line-height: ${s.title_line_height};
            font-weight: ${s.title_font_weight};
            color: ${s.title_color};
            margin: 0;
        `;

        const subtitleStyle = `
            text-align: ${s.subtitle_align};
            font-size: ${s.subtitle_size};
            line-height: ${s.subtitle_line_height};
            font-weight: ${s.subtitle_font_weight};
            color: ${s.subtitle_color};
            margin: ${s.title_subtitle_gap || '4px'} 0 0 0;
        `;
        let visibleCards = 0;
        if (this.config.pv?.show !== false) visibleCards++;
        if (this.config.batterie?.show !== false) visibleCards++;
        if (this.config.haus?.show !== false) visibleCards++;
        if (this.config.netz?.show !== false) visibleCards++;

// Definiere Grid-Template-Columns
        let gridTemplateColumns = 'repeat(4, 1fr)';
        if (visibleCards === 3) gridTemplateColumns = 'repeat(3, 1fr)';
        else if (visibleCards === 2) gridTemplateColumns = 'repeat(2, 1fr)';
        else if (visibleCards === 1) gridTemplateColumns = '1fr';

// Header Icon Styling
        const headerIconStyle = `
            font-size: ${s.header_icon_size};
            color: ${s.header_icon_color};
            margin-right: ${s.header_icon_margin};
        `;

        const headerBackgroundEnabled = s.header_background_enabled ?? false;
        const headerWidth = s.header_width ?? 'auto';

        let headerStyle = '';

        if (headerBackgroundEnabled) {
            headerStyle = `
                background: ${s.header_background_color};
                border: 1px solid ${s.header_border_color};
                border-radius: ${s.header_border_radius};
                padding: ${s.header_padding};
                box-shadow: ${s.header_box_shadow};
                width: ${headerWidth === 'full' ? 'calc(100% - 2 * var(--ha-card-border-width, 1px))' : 'fit-content'};
                ${headerWidth === 'auto' ? 'margin-left: auto; margin-right: auto;' : ''}
                box-sizing: border-box;
                margin-bottom: ${s.header_margin_bottom || '12px'};
            `;
        } else {
            headerStyle = `margin-bottom: ${s.header_margin_bottom || '12px'};`;
        }

        return html`
            ${showTitle || showSubtitle ? html`
                <div class="card-header" style="${headerStyle}">
                    ${showIcon ? html`
                        <div class="card-header-with-icon">
                            <ha-icon .icon=${this.config.icon} style="${headerIconStyle} --mdc-icon-size: ${s.header_icon_size}; width: ${s.header_icon_size}; height: ${s.header_icon_size};"></ha-icon>
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
            <div class="grid" style="gap: ${this.config.grid_gap}; grid-template-columns: ${gridTemplateColumns}; ...">
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
            ${this._renderConsumers()}
        `;
    }
}

if (!customElements.get(CARD_TAG)) {
    customElements.define(CARD_TAG, PVMonitorCard);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: `custom:${CARD_TAG}`,
    name: "PV Monitor Card",
    description: "Monitor your PV-System with Battery-Info, Calculations, Grid status and Devices Power Consumtion",
    preview: true,
    documentationURL: "https://github.com/sjerocom/pv-monitor-card"
});

const buildInfo = typeof __BUILD_TIMESTAMP__ !== 'undefined'
    ? ` [DEV: ${__BUILD_TIMESTAMP__}]`
    : ' Version: 0.0.107';

console.info(
    '%c PV-MONITOR-CARD %c' + buildInfo,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray'
);