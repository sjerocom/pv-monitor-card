import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass } from "../../types";
import { BatteryBarEntity } from "../../types/bars";
import { formatPower, getBatteryIcon } from "../../utils";
import { getBatterieColor, getBatteryIconColor } from "../../utils/colors/battery-colors";
import { aggregateBatteryPower, aggregateBatterySOC, getTotalBatteryCapacity } from "../../utils/calculators";
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
    if (!hass) return html``;

    const t = getTranslations(config.language);

    // Multi-Battery Support: Verwende batterie.entities Array
    const entities = (config.batterie as any)?.entities as BatteryBarEntity[] | undefined;
    if (entities && entities.length > 0) {
        const soc = aggregateBatterySOC(entities, hass);
        const { charge, discharge } = aggregateBatteryPower(entities, hass);
        const totalCapacity = getTotalBatteryCapacity(entities);

        // Icon-Logik: Prüfe ob mindestens eine Entity use_dynamic_icon nutzt oder kein Custom-Icon hat
        let icon = config.batterie?.icon;
        let iconColor = '#7f7f7f';

        if (!icon) {
            // Kein globales Icon definiert → prüfe erste Entity oder nutze dynamisches Icon
            const firstEntity = entities[0];
            const useDynamicIcon = firstEntity && (firstEntity.use_dynamic_icon !== false && !firstEntity.icon);

            if (useDynamicIcon) {
                icon = getBatteryIcon(soc);
                iconColor = getBatteryIconColor(soc);
            } else if (firstEntity?.icon) {
                icon = firstEntity.icon;
            } else {
                icon = getBatteryIcon(soc);
                iconColor = getBatteryIconColor(soc);
            }
        } else {
            iconColor = getBatteryIconColor(soc);
        }

        // Automatische Berechnung der Lade-/Entladeleistung falls kein secondary_entity/text konfiguriert
        let secondaryText = getTextFromEntityOrConfig(config.batterie?.secondary_entity, config.batterie?.secondary_text);
        if (!secondaryText || secondaryText === '') {
            const netPower = charge - discharge;
            // Idle: -10W bis +10W → kein Text
            if (netPower > 10) {
                // Laden: +500 W oder +2.50 kW
                secondaryText = `+${formatPower(netPower)}`;
            } else if (netPower < -10) {
                // Entladen: -800 W oder -3.20 kW
                const formatted = formatPower(Math.abs(netPower));
                secondaryText = `-${formatted}`;
            }
            // else: Idle (-10 bis +10) → secondaryText bleibt leer
        }

        return renderCard({
            cardConfig: config.batterie,
            icon: icon,
            primaryValue: `${soc.toFixed(0)}%`,
            secondaryText: secondaryText,
            tertiaryText: getTextFromEntityOrConfig(config.batterie?.tertiary_entity, config.batterie?.tertiary_text),
            animStyle: config.batterie?.animation ? getBatterieColor(charge, discharge, totalCapacity) : { color: '', duration: 0, show: false },
            iconColor: iconColor,
            customIconStyle: ''
        }, style, getCardStyle, handleAction);
    }

    // Fallback: Single-Entity Logik
    const entityId = config.batterie?.entity || config.entities?.battery_soc;
    if (!entityId) {
        return html`<div class="card">⚠️ ${t.general.missing_entity}</div>`;
    }

    const entity = hass.states[entityId];
    if (!entity) {
        return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;
    }

    const soc = parseFloat(entity.state) || 0;
    const icon = config.batterie?.icon || getBatteryIcon(soc);

    const chargeEntityId = config.batterie?.ladung_entity || config.entities?.battery_charge;
    const dischargeEntityId = config.batterie?.entladung_entity || config.entities?.battery_discharge;

    const charge = chargeEntityId && hass.states[chargeEntityId]
        ? parseFloat(hass.states[chargeEntityId]?.state) || 0
        : 0;
    const discharge = dischargeEntityId && hass.states[dischargeEntityId]
        ? parseFloat(hass.states[dischargeEntityId]?.state) || 0
        : 0;

    const batteryCapacity = config.batterie?.battery_capacity || config.battery_capacity || 10000;

    let secondaryText = getTextFromEntityOrConfig(config.batterie?.secondary_entity, config.batterie?.secondary_text);
    if (!secondaryText || secondaryText === '') {
        const netPower = charge - discharge;
        if (netPower > 10) {
            secondaryText = `+${formatPower(netPower)}`;
        } else if (netPower < -10) {
            secondaryText = `-${formatPower(Math.abs(netPower))}`;
        }
    }

    return renderCard({
        cardConfig: config.batterie,
        icon: icon,
        primaryValue: `${soc.toFixed(0)}%`,
        secondaryText: secondaryText,
        tertiaryText: getTextFromEntityOrConfig(config.batterie?.tertiary_entity, config.batterie?.tertiary_text),
        animStyle: config.batterie?.animation ? getBatterieColor(charge, discharge, batteryCapacity) : { color: '', duration: 0, show: false },
        iconColor: getBatteryIconColor(soc),
        customIconStyle: ''
    }, style, getCardStyle, handleAction);
}
