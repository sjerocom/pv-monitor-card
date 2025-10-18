import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass, ConsumerItem } from "../../types";
import { formatPower, getConsumerColor } from "../../utils";

export function renderConsumers(
    config: PVMonitorCardConfig,
    hass: Hass | undefined,
    consumersVisible: boolean,
    handleConsumerAction: (event: Event, consumer: ConsumerItem) => void
): TemplateResult {
    console.log('renderConsumers called:', {
        show: config.consumers?.show,
        hasHass: !!hass,
        consumersVisible,
        itemsLength: config.consumers?.items?.length || 0
    });

    if (!config.consumers?.show || !hass || !consumersVisible) {
        console.log('renderConsumers: Early return');
        return html``;
    }

    const items = config.consumers.items || [];
    if (items.length === 0) {
        console.log('renderConsumers: No items');
        return html``;
    }

    const globalThreshold = config.consumers.threshold ?? 0;
    const globalStyle = config.consumers.style!;

    console.log('renderConsumers: Processing items', { itemsCount: items.length, globalThreshold });

    const consumerData = items.map(item => {
        const entity = hass.states[item.entity];
        console.log('Processing consumer item:', {
            entity: item.entity,
            entityExists: !!entity,
            state: entity?.state
        });

        if (!entity) {
            console.warn('Consumer entity not found:', item.entity);
            return null;
        }

        const value = parseFloat(entity.state) || 0;
        const threshold = item.threshold !== undefined ? item.threshold : globalThreshold;

        console.log('Consumer value check:', {
            entity: item.entity,
            value,
            threshold,
            passes: value > threshold
        });

        if (value <= threshold) return null;

        return {
            item,
            entity,
            value,
            label: item.label || entity.attributes.friendly_name || item.entity
        };
    }).filter(d => d !== null);

    console.log('renderConsumers: Filtered consumer data', { count: consumerData.length });

    if (consumerData.length === 0) {
        console.log('renderConsumers: No consumers pass threshold');
        return html``;
    }

    const sortMode = config.consumers.sort_mode || 'highest_first';
    if (sortMode === 'highest_first') {
        consumerData.sort((a, b) => b!.value - a!.value);
    } else if (sortMode === 'lowest_first') {
        consumerData.sort((a, b) => a!.value - b!.value);
    } else if (sortMode === 'alpha_asc') {
        consumerData.sort((a, b) => a!.label.localeCompare(b!.label));
    } else if (sortMode === 'alpha_desc') {
        consumerData.sort((a, b) => b!.label.localeCompare(a!.label));
    }

    console.log('renderConsumers: Rendering consumers', { count: consumerData.length });

    return html`
        <div class="consumers-bar" style="gap: ${globalStyle.gap};">
            ${consumerData.map(data => renderConsumerItem(data!, config, hass, handleConsumerAction))}
        </div>
    `;
}

function renderConsumerItem(
    data: { item: ConsumerItem; entity: any; value: number; label: string },
    config: PVMonitorCardConfig,
    hass: Hass,
    handleConsumerAction: (event: Event, consumer: ConsumerItem) => void
): TemplateResult {
    const { item, value, label } = data;
    const globalStyle = config.consumers!.style!;

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

    let primaryText = '';
    const showPrimary = item.show_primary !== false;
    if (showPrimary) {
        if (item.primary_text) {
            primaryText = item.primary_text;
        } else if (item.primary_entity && hass) {
            const primaryEntity = hass.states[item.primary_entity];
            if (primaryEntity) {
                primaryText = `${primaryEntity.state} ${primaryEntity.attributes.unit_of_measurement || ''}`;
            } else {
                primaryText = formatPower(value);
            }
        } else {
            primaryText = formatPower(value);
        }
    }

    let secondaryText = '';
    const showSecondary = item.show_secondary !== false;
    if (showSecondary) {
        if (item.secondary_text) {
            secondaryText = item.secondary_text;
        } else if (item.secondary_entity && hass) {
            const secondaryEntity = hass.states[item.secondary_entity];
            if (secondaryEntity) {
                secondaryText = `${secondaryEntity.state} ${secondaryEntity.attributes.unit_of_measurement || ''}`;
            } else {
                secondaryText = label;
            }
        } else {
            secondaryText = label;
        }
    }

    console.log('Rendering consumer item:', {
        entity: item.entity,
        value,
        primaryText,
        secondaryText
    });

    return html`
        <div class="consumer-item"
             style="${containerStyle}"
             @click=${(e: Event) => handleConsumerAction(e, item)}
             @dblclick=${(e: Event) => handleConsumerAction(e, item)}
             @contextmenu=${(e: Event) => handleConsumerAction(e, item)}>
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
