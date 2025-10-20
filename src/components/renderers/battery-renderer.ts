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
    if (!entities || entities.length === 0) {
        return html`<div class="card">⚠️ ${t.general.missing_entity}</div>`;
    }

    const soc = aggregateBatterySOC(entities, hass);
    const { charge, discharge } = aggregateBatteryPower(entities, hass);
    const totalCapacity = getTotalBatteryCapacity(entities);

    // Icon-Logik: Prüfe ob mindestens eine Entity use_dynamic_icon nutzt oder kein Custom-Icon hat
    let icon = config.batterie?.icon;
    let iconColor = getBatteryIconColor(soc); // Standard: dynamische Farbe

    if (!icon) {
        // Kein globales Icon definiert → prüfe erste Entity oder nutze dynamisches Icon
        const firstEntity = entities[0];

        if (firstEntity?.icon) {
            // Custom-Icon auf Entity → nutze dieses mit dynamischer Farbe
            icon = firstEntity.icon;
        } else {
            // Kein Custom-Icon → nutze dynamisches Icon mit Farbe
            icon = getBatteryIcon(soc);
        }
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
