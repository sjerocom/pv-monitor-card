import { Hass, CardStyle } from "../types";

export function getCardStyle(
    cardStyle: CardStyle | undefined,
    style: any
): string {
    const s = style;
    const bgColor = cardStyle?.background_color || s.card_background_color || 'rgba(21, 20, 27, 1)';
    const borderColor = cardStyle?.border_color || s.card_border_color || 'rgba(255, 255, 255, 0.1)';

    return `background: ${bgColor}; border: 1px solid ${borderColor}; box-shadow: ${s.card_boxshadow}; border-radius: ${s.card_border_radius}; color: ${s.card_text_color}; cursor: ${s.card_cursor}; padding: ${s.card_padding};`;
}

export function getTextFromEntityOrConfig(
    hass: Hass | undefined,
    entity?: string,
    text?: string
): string {
    if (entity && hass) {
        const entityObj = hass.states[entity];
        if (entityObj) {
            return `${entityObj.state} ${entityObj.attributes.unit_of_measurement || ''}`;
        }
    }
    return text || '';
}

export function calculateTotalConsumerPower(
    hass: Hass | undefined,
    consumerItems: any[] | undefined,
    globalThreshold: number
): number {
    if (!consumerItems || !hass) return 0;

    let total = 0;
    for (const item of consumerItems) {
        const entity = hass.states[item.entity];
        if (!entity) continue;

        const value = parseFloat(entity.state) || 0;
        const threshold = item.threshold !== undefined ? item.threshold : globalThreshold;

        if (value > threshold) {
            total += value;
        }
    }

    return total;
}

export function calculateGridColumns(config: any): string {
    // Prüfe cards_visibility wenn vorhanden, sonst fallback auf show
    const visibility = config.layout?.cards_visibility || {
        pv: config.pv?.show !== false,
        battery: config.batterie?.show !== false,
        house: config.haus?.show !== false,
        grid: config.netz?.show !== false
    };

    let visibleCards = 0;
    if (visibility.pv) visibleCards++;
    if (visibility.battery) visibleCards++;
    if (visibility.house) visibleCards++;
    if (visibility.grid) visibleCards++;

    if (visibleCards === 3) return 'repeat(3, 1fr)';
    if (visibleCards === 2) return 'repeat(2, 1fr)';
    if (visibleCards === 1) return '1fr';
    return 'repeat(4, 1fr)';
}
