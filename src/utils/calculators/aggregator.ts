import { PVBarEntity, BatteryBarEntity, Hass } from '../../types';

export function aggregatePVPower(entities: PVBarEntity[], hass: Hass): number {
    if (!entities || entities.length === 0) return 0;

    return entities.reduce((sum, entity) => {
        const state = hass.states[entity.entity];
        if (!state || state.state === 'unavailable' || state.state === 'unknown') return sum;
        const value = parseFloat(state.state);
        return sum + (isNaN(value) ? 0 : value);
    }, 0);
}

export function aggregateBatterySOC(entities: BatteryBarEntity[], hass: Hass): number {
    if (!entities || entities.length === 0) return 0;

    const values = entities
        .map(e => {
            const state = hass.states[e.entity];
            if (!state || state.state === 'unavailable' || state.state === 'unknown') return null;
            const value = parseFloat(state.state);
            return isNaN(value) ? null : value;
        })
        .filter((v): v is number => v !== null);

    if (values.length === 0) return 0;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function aggregateBatteryPower(entities: BatteryBarEntity[], hass: Hass): { charge: number; discharge: number } {
    let totalCharge = 0;
    let totalDischarge = 0;

    if (!entities || entities.length === 0) {
        return { charge: 0, discharge: 0 };
    }

    entities.forEach(entity => {
        if (entity.charge_entity) {
            const chargeState = hass.states[entity.charge_entity];
            if (chargeState && chargeState.state !== 'unavailable' && chargeState.state !== 'unknown') {
                const value = parseFloat(chargeState.state);
                if (!isNaN(value)) {
                    totalCharge += value;
                }
            }
        }
        if (entity.discharge_entity) {
            const dischargeState = hass.states[entity.discharge_entity];
            if (dischargeState && dischargeState.state !== 'unavailable' && dischargeState.state !== 'unknown') {
                const value = parseFloat(dischargeState.state);
                if (!isNaN(value)) {
                    totalDischarge += value;
                }
            }
        }
    });

    return { charge: totalCharge, discharge: totalDischarge };
}

export function getTotalBatteryCapacity(entities: BatteryBarEntity[]): number {
    if (!entities || entities.length === 0) return 0;

    return entities.reduce((sum, entity) => {
        return sum + (entity.capacity || 0);
    }, 0);
}

export function getTotalPVMaxPower(entities: PVBarEntity[]): number {
    if (!entities || entities.length === 0) return 0;

    return entities.reduce((sum, entity) => {
        return sum + (entity.max_power || 0);
    }, 0);
}
