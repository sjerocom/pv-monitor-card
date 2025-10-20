import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig, Hass, InfoBarItem } from "../../types";
import { 
    calculateAutarky, 
    calculateSelfConsumption, 
    calculateBatteryRuntime, 
    calculateBatteryChargeTime,
    aggregatePVPower,
    aggregateBatterySOC,
    aggregateBatteryPower,
    getTotalBatteryCapacity
} from "../../utils";

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

    // Aggregierte Werte holen
    const getAggregatedPVPower = (): number => {
        const pvEntities = (config.pv as any)?.entities;
        if (pvEntities && pvEntities.length > 0) {
            return aggregatePVPower(pvEntities, hass);
        }
        return 0;
    };

    const getAggregatedBatteryValues = (): { soc: number; charge: number; discharge: number; capacity: number } => {
        const batteryEntities = (config.batterie as any)?.entities;
        if (batteryEntities && batteryEntities.length > 0) {
            const soc = aggregateBatterySOC(batteryEntities, hass);
            const power = aggregateBatteryPower(batteryEntities, hass);
            const capacity = getTotalBatteryCapacity(batteryEntities);
            return { soc, charge: power.charge, discharge: power.discharge, capacity };
        }
        return { soc: 0, charge: 0, discharge: 0, capacity: 0 };
    };

    const getGridPower = (): number => {
        if (config.netz?.entity) {
            return parseFloat(hass.states[config.netz.entity]?.state) || 0;
        }
        return getCentralEntityValue('grid_power');
    };

    const getHouseConsumption = (): number => {
        if (config.haus?.entity) {
            return parseFloat(hass.states[config.haus.entity]?.state) || 0;
        }
        return getCentralEntityValue('house_consumption');
    };

    if (itemCalcType === 'autarky') {
        const pvProd = getAggregatedPVPower();
        const battery = getAggregatedBatteryValues();
        const gridPower = getGridPower();
        const houseConsumption = getHouseConsumption();
        value = calculateAutarky(pvProd, battery.discharge, gridPower, houseConsumption);
        unit = '';
    } else if (itemCalcType === 'self_consumption') {
        const pvProd = getAggregatedPVPower();
        const gridPower = getGridPower();
        value = calculateSelfConsumption(pvProd, gridPower);
        unit = '';
    } else if (itemCalcType === 'runtime') {
        const battery = getAggregatedBatteryValues();
        value = calculateBatteryRuntime(battery.capacity, battery.soc, battery.charge, battery.discharge);
        unit = '';
    } else if (itemCalcType === 'chargetime') {
        const battery = getAggregatedBatteryValues();
        value = calculateBatteryChargeTime(battery.capacity, battery.soc, battery.charge, battery.discharge);
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
