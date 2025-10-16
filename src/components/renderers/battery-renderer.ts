import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass } from "../../types";
import { formatPower, getBatteryIcon, getBatteryIconColor, getBatterieColor } from "../../utils";
import { getTranslations } from "../../i18n";
import { renderCard } from "./card-renderer";

export function renderBattery(
    config: PVMonitorCardConfig,
    hass: Hass | undefined,
    style: any,
    getCardStyle: (cardStyle?: any) => string,
    getTextFromEntityOrConfig: (entity?: string, text?: string) => string,
    handleAction: (event: Event, actions: any, isHausCard?: boolean) => void
): TemplateResult {
    const entityId = config.batterie?.entity || config.entities?.battery_soc;
    if (!entityId || !hass) return html``;

    const entity = hass.states[entityId];
    const t = getTranslations(config.language);

    if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

    const percentage = parseFloat(entity.state) || 0;
    const icon = config.batterie.icon || getBatteryIcon(percentage);
    const iconColor = getBatteryIconColor(percentage);

    const chargeEntityId = config.batterie.ladung_entity || config.entities?.battery_charge;
    const dischargeEntityId = config.batterie.entladung_entity || config.entities?.battery_discharge;

    const charge = chargeEntityId && hass.states[chargeEntityId]
        ? parseFloat(hass.states[chargeEntityId]?.state) || 0
        : 0;
    const discharge = dischargeEntityId && hass.states[dischargeEntityId]
        ? parseFloat(hass.states[dischargeEntityId]?.state) || 0
        : 0;

    const batteryCapacity = config.batterie.battery_capacity || config.battery_capacity || 10000;

    let statusText = '';
    if (charge > 1) {
        statusText = formatPower(charge);
    } else if (discharge > 1) {
        statusText = '-' + formatPower(discharge);
    } else {
        statusText = t.general.inactive;
    }

    const secondaryText = getTextFromEntityOrConfig(config.batterie.secondary_entity, config.batterie.secondary_text) || statusText;
    const tertiaryText = getTextFromEntityOrConfig(config.batterie.tertiary_entity, config.batterie.tertiary_text);

    return renderCard({
        cardConfig: config.batterie,
        icon,
        primaryValue: `${Math.round(percentage)}%`,
        secondaryText,
        tertiaryText,
        animStyle: config.batterie.animation ? getBatterieColor(charge, discharge, batteryCapacity) : { color: '', duration: 0, show: false },
        iconColor: config.batterie.style?.icon_color || iconColor
    }, style, getCardStyle, handleAction);
}
