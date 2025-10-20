import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, BatteryBarEntity } from "../../types";
import { formatPower, getBatteryIcon } from "../../utils";
import { getBatteryIconColor } from "../../utils/colors/battery-colors";

export function renderBatteryBar(
    config: PVMonitorCardConfig,
    hass: any
): TemplateResult {
    const batteryBar = config.battery_bar;

    if (!batteryBar?.show || !batteryBar?.entities || batteryBar.entities.length === 0) {
        return html``;
    }

    const style = batteryBar.style || {};
    const align = batteryBar.align || 'left';

    const entityData: Array<{entity: BatteryBarEntity, soc: number, charge: number, discharge: number, state: any}> = [];

    batteryBar.entities.forEach((entity) => {
        if (entity.entity && hass?.states[entity.entity]) {
            const state = hass.states[entity.entity];
            const soc = parseFloat(state.state) || 0;

            let charge = 0;
            if (entity.charge_entity && hass.states[entity.charge_entity]) {
                charge = parseFloat(hass.states[entity.charge_entity].state) || 0;
            }

            let discharge = 0;
            if (entity.discharge_entity && hass.states[entity.discharge_entity]) {
                discharge = parseFloat(hass.states[entity.discharge_entity].state) || 0;
            }

            entityData.push({ entity, soc, charge, discharge, state });
        }
    });

    const barStyle = `
        background-color: ${style.background_color || 'transparent'};
        border: 1px solid ${style.border_color || 'rgba(127, 127, 127, 0.3)'};
        border-radius: ${style.border_radius || '8px'};
        padding: ${style.padding || '12px'};
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: ${style.gap || '12px'};
        justify-content: ${align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start'};
        align-items: center;
    `;

    const itemGap = style.item_gap || '0.5rem';
    const separator = style.separator || '|';
    const iconSize = style.icon_size || '1.5em';

    return html`
        <div class="battery-bar" style="${barStyle}">
            ${entityData.map((data, index) => {
                // Wenn kein Custom-Icon gesetzt ist UND use_dynamic_icon nicht explizit false → dynamisches Icon
                const useDynamicIcon = data.entity.use_dynamic_icon !== false && !data.entity.icon;
                const icon = useDynamicIcon ? getBatteryIcon(data.soc) : data.entity.icon;

                // Icon-Farbe: Nutze dynamische Farbe wenn kein style.icon_color überschrieben ist
                // Oder wenn explizit dynamisches Icon verwendet wird
                const iconColor = (useDynamicIcon || !style.icon_color)
                    ? getBatteryIconColor(data.soc)
                    : style.icon_color;

                return html`
                <div class="battery-bar-item" style="display: flex; align-items: center; gap: ${itemGap};">
                    ${icon ? html`
                        <ha-icon
                            .icon="${icon}"
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: ${iconSize};
                                height: ${iconSize};
                                --mdc-icon-size: ${iconSize};
                                color: ${iconColor};
                            "
                        ></ha-icon>
                    ` : ''}
                    <span class="battery-bar-label" style="
                        font-size: ${style.label_size || '0.9em'};
                        color: ${style.label_color || '#7f7f7f'};
                        font-weight: ${style.label_font_weight || 'normal'};
                        line-height: ${style.label_line_height || '1.4'};
                    ">
                        ${data.entity.name || data.state.attributes.friendly_name || data.entity.entity}
                    </span>
                    <span class="battery-bar-value" style="
                        font-size: ${style.value_size || '1em'};
                        color: ${style.value_color || '#ffffff'};
                        font-weight: ${style.value_font_weight || 'bold'};
                        line-height: ${style.value_line_height || '1.4'};
                    ">
                        ${data.soc.toFixed(0)}%
                        ${data.charge > 0 ? html` (+${formatPower(data.charge)})` : ''}
                        ${data.discharge > 0 ? html` (-${formatPower(data.discharge)})` : ''}
                    </span>
                </div>
                ${index < entityData.length - 1 ? html`<span style="color: rgba(127, 127, 127, 0.3);">${separator}</span>` : ''}
                `;
            })}
        </div>
    `;
}
