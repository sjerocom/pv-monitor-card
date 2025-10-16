import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass, InfoBarItem } from "../../types";
import { calculateAutarky, calculateSelfConsumption, calculateBatteryRuntime, calculateBatteryChargeTime } from "../../utils";

export function renderInfoBar(
    config: PVMonitorCardConfig,
    hass: Hass | undefined,
    handleTap: (action?: any) => void
): TemplateResult {
    if (!config.info_bar?.show || !hass) return html``;

    const ib = config.info_bar;
    const s = ib.style!;

    const hasAnyContent = ib.calculation_mode || ib.calculate_battery_times ||
        ib.item1?.entity || ib.item2?.entity || ib.item3?.entity;
    if (!hasAnyContent) return html``;

    const hasActions = ib.tap_action || ib.double_tap_action || ib.hold_action;
    const cursor = hasActions ? 'pointer' : 'default';

    const infoBarStyle = `
        background: ${s.background_color};
        border: 1px solid ${s.border_color};
        border-radius: ${s.border_radius};
        padding: ${s.padding};
        gap: ${s.gap};
        cursor: ${cursor};
        ${s.background_color !== 'transparent' ? `box-shadow: ${config.style!.card_boxshadow};` : ''}
    `;

    return html`
        <div class="info-bar"
             style="${infoBarStyle}"
             @click=${() => hasActions && handleTap(ib.tap_action)}
             @dblclick=${() => hasActions && handleTap(ib.double_tap_action)}
             @contextmenu=${(ev: Event) => {
                 if (hasActions && ib.hold_action) {
                     ev.preventDefault();
                     handleTap(ib.hold_action);
                 }
             }}
        >
            ${renderInfoBarItem(config, hass, ib.item1, s, ib.item1_calc_type || ib.calculation_mode)}
            ${renderInfoBarItem(config, hass, ib.item2, s, ib.item2_calc_type)}
            ${renderInfoBarItem(config, hass, ib.item3, s, ib.item3_calc_type)}
        </div>
    `;
}

function renderInfoBarItem(
    config: PVMonitorCardConfig,
    hass: Hass,
    item?: InfoBarItem,
    s?: any,
    itemCalcType?: string
): TemplateResult {
    if (!item) return html``;

    let value = '';
    let unit = '';

    const getCentralEntityValue = (entityKey: string): number => {
        const entityId = config.entities?.[entityKey as keyof typeof config.entities];
        if (!entityId) return 0;
        return parseFloat(hass.states[entityId]?.state) || 0;
    };

    if (itemCalcType === 'autarky') {
        const pvProd = getCentralEntityValue('pv_production');
        const batteryDischarge = getCentralEntityValue('battery_discharge');
        const gridPower = getCentralEntityValue('grid_power');
        const houseConsumption = getCentralEntityValue('house_consumption');
        value = calculateAutarky(pvProd, batteryDischarge, gridPower, houseConsumption);
        unit = '';
    } else if (itemCalcType === 'self_consumption') {
        const pvProd = getCentralEntityValue('pv_production');
        const gridPower = getCentralEntityValue('grid_power');
        value = calculateSelfConsumption(pvProd, gridPower);
        unit = '';
    } else if (itemCalcType === 'runtime') {
        const batteryCapacity = config.battery_capacity || 10000;
        const socPercent = getCentralEntityValue('battery_soc');
        const charge = getCentralEntityValue('battery_charge');
        const discharge = getCentralEntityValue('battery_discharge');
        value = calculateBatteryRuntime(batteryCapacity, socPercent, charge, discharge);
        unit = '';
    } else if (itemCalcType === 'chargetime') {
        const batteryCapacity = config.battery_capacity || 10000;
        const socPercent = getCentralEntityValue('battery_soc');
        const charge = getCentralEntityValue('battery_charge');
        const discharge = getCentralEntityValue('battery_discharge');
        value = calculateBatteryChargeTime(batteryCapacity, socPercent, charge, discharge);
        unit = '';
    } else if (item.entity) {
        const entity = hass.states[item.entity];
        if (!entity) return html``;
        value = entity.state;
        unit = item.unit ?? entity.attributes.unit_of_measurement ?? '';
    } else {
        return html``;
    }

    return html`
        <div class="info-bar-item">
            ${item.icon ? html`
                <div class="info-bar-icon">
                    <ha-icon .icon=${item.icon} style="--mdc-icon-size: ${s.icon_size}; color: ${s.icon_color}; width: ${s.icon_size}; height: ${s.icon_size};"></ha-icon>
                </div>
            ` : ''}
            <div class="info-bar-content">
                ${item.label ? html`<div class="info-bar-label" style="font-size: ${s.label_size}; color: ${s.label_color}; font-weight: ${s.label_font_weight}; line-height: ${s.label_line_height};">${item.label}</div>` : ''}
                <div class="info-bar-value" style="font-size: ${s.value_size}; color: ${s.value_color}; font-weight: ${s.value_font_weight}; line-height: ${s.value_line_height};">${value}${unit ? ' ' + unit : ''}</div>
            </div>
        </div>
    `;
}
