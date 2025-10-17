import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass } from "../../types";
import { formatPower, getBatteryIcon } from "../../utils";
import { getBatterieColor } from "../../utils/colors/battery-colors";
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

    // Verwende battery_bar.entities für die Werte
    if (config.battery_bar?.entities && config.battery_bar.entities.length > 0) {
        const soc = aggregateBatterySOC(config.battery_bar.entities, hass);
        const { charge, discharge } = aggregateBatteryPower(config.battery_bar.entities, hass);
        const totalCapacity = getTotalBatteryCapacity(config.battery_bar.entities);

        const icon = config.batterie?.icon || getBatteryIcon(soc);

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
            customIconStyle: ''
        }, style, getCardStyle, handleAction);
    }

    // Alte Logik wird ignoriert - Warnung wird durch Validator angezeigt
    return html`<div class="card">⚠️ ${t.general.missing_entity}</div>`;
}
