import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass } from "../../types";
import { formatPower, getHausColor } from "../../utils";
import { getTranslations } from "../../i18n";
import { renderCard } from "./card-renderer";

export function renderHouse(
    config: PVMonitorCardConfig,
    hass: Hass | undefined,
    style: any,
    getCardStyle: (cardStyle?: any) => string,
    getTextFromEntityOrConfig: (entity?: string, text?: string) => string,
    calculateTotalConsumerPower: () => number,
    handleAction: (event: Event, actions: any, isHausCard?: boolean) => void
): TemplateResult {
    const entityId = config.haus?.entity || config.entities?.house_consumption;
    if (!entityId || !hass) return html``;

    const entity = hass.states[entityId];
    const t = getTranslations(config.language);

    if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

    const value = parseFloat(entity.state) || 0;

    let secondaryText = getTextFromEntityOrConfig(config.haus.secondary_entity, config.haus.secondary_text);

    if (config.haus.show_consumer_total && config.consumers?.show && config.consumers.items) {
        const totalConsumerPower = calculateTotalConsumerPower();
        if (totalConsumerPower > 0) {
            secondaryText = formatPower(totalConsumerPower);
        }
    }

    return renderCard({
        cardConfig: config.haus,
        icon: config.haus.icon || 'mdi:home',
        primaryValue: formatPower(value),
        secondaryText,
        tertiaryText: getTextFromEntityOrConfig(config.haus.tertiary_entity, config.haus.tertiary_text),
        animStyle: config.haus.animation ? getHausColor(value) : { color: '', duration: 0, show: false },
        isHausCard: true
    }, style, getCardStyle, handleAction);
}
