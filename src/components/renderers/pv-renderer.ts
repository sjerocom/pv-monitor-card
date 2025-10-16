import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass } from "../../types";
import { formatPower, getPVColor, getPVRotationSpeed } from "../../utils";
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
    const entityId = config.pv?.entity || config.entities?.pv_production;
    if (!entityId || !hass) return html``;

    const entity = hass.states[entityId];
    const t = getTranslations(config.language);

    if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

    const value = parseFloat(entity.state) || 0;
    const maxPower = config.pv?.max_power || config.pv_max_power || 10000;

    const shouldRotate = config.pv.icon_rotation === true;
    let customIconStyle = '';

    if (shouldRotate) {
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
