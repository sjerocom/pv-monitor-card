import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass } from "../../types";
import { formatPower, getNetzColor } from "../../utils";
import { getTranslations } from "../../i18n";
import { renderCard } from "./card-renderer";

export function renderGrid(
    config: PVMonitorCardConfig,
    hass: Hass | undefined,
    style: any,
    getCardStyle: (cardStyle?: any) => string,
    getTextFromEntityOrConfig: (entity?: string, text?: string) => string,
    handleAction: (event: Event, actions: any, isHausCard?: boolean) => void
): TemplateResult {
    const entityId = config.netz?.entity || config.entities?.grid_power;
    if (!entityId || !hass) return html``;

    const entity = hass.states[entityId];
    const t = getTranslations(config.language);

    if (!entity) return html`<div class="card">⚠️ ${entityId} ${t.general.missing_entity}</div>`;

    const value = parseFloat(entity.state) || 0;
    const threshold = config.netz?.threshold || config.grid_threshold || 10;

    let statusText = '';
    if (value < -threshold) {
        statusText = config.netz?.text_einspeisen || t.status.feed_in;
    } else if (value > threshold) {
        statusText = config.netz?.text_bezug || t.status.grid_consumption;
    } else {
        statusText = config.netz?.text_neutral || t.status.neutral;
    }

    const secondaryText = getTextFromEntityOrConfig(config.netz.secondary_entity, config.netz.secondary_text) || statusText;
    const tertiaryText = getTextFromEntityOrConfig(config.netz.tertiary_entity, config.netz.tertiary_text);

    return renderCard({
        cardConfig: config.netz,
        icon: config.netz.icon || 'mdi:transmission-tower',
        primaryValue: formatPower(value),
        secondaryText,
        tertiaryText,
        animStyle: config.netz.animation ? getNetzColor(value, threshold) : { color: '', duration: 0, show: false }
    }, style, getCardStyle, handleAction);
}
