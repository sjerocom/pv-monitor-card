import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass } from "../../types";
import { formatPower, getPVColor, getPVRotationSpeed } from "../../utils";
import { aggregatePVPower, getTotalPVMaxPower } from "../../utils/calculators";
import { getTranslations } from "../../i18n";
import { renderCard } from "./card-renderer";

export function renderPV(
    config: PVMonitorCardConfig,
    hass: Hass | undefined,
    style: any,
    getCardStyle: (cardStyle?: any) => string,
    getTextFromEntityOrConfig: (entity?: string, text?: string) => string,
    handleAction: (event: Event, actions: any, isHausCard?: boolean) => void
): TemplateResult {
    if (!hass) return html``;

    const t = getTranslations(config.language);

    // Verwende pv_bar.entities für die Werte
    if (config.pv_bar?.entities && config.pv_bar.entities.length > 0) {
        const value = aggregatePVPower(config.pv_bar.entities, hass);
        const maxPower = getTotalPVMaxPower(config.pv_bar.entities);

        const shouldRotate = config.pv.icon_rotation === true;
        let customIconStyle = '';

        if (shouldRotate && maxPower > 0) {
            const rotationSpeed = getPVRotationSpeed(value, maxPower);
            customIconStyle = `animation: continuousRotation ${rotationSpeed}s linear infinite;`;
        }

        return renderCard({
            cardConfig: config.pv,
            icon: config.pv.icon || 'mdi:white-balance-sunny',
            primaryValue: formatPower(value),
            secondaryText: getTextFromEntityOrConfig(config.pv.secondary_entity, config.pv.secondary_text),
            tertiaryText: getTextFromEntityOrConfig(config.pv.tertiary_entity, config.pv.tertiary_text),
            animStyle: config.pv.animation ? getPVColor(value, maxPower) : { color: '', duration: 0, show: false },
            customIconStyle: customIconStyle
        }, style, getCardStyle, handleAction);
    }

    // Alte Logik wird ignoriert - Warnung wird durch Validator angezeigt
    return html`<div class="card">⚠️ ${t.general.missing_entity}</div>`;
}
