import { PVBarEntity, BatteryBarEntity, Hass } from '../../types';

/**
 * Summiert alle PV-Entities aus der PV-Bar
 */
export function sumPVBarEntities(entities: PVBarEntity[] | undefined, hass: Hass | undefined): number {
    if (!entities || entities.length === 0 || !hass) return 0;
    
    return entities.reduce((total, entity) => {
        if (entity.entity && hass.states[entity.entity]) {
            const value = parseFloat(hass.states[entity.entity].state) || 0;
            return total + value;
        }
        return total;
    }, 0);
}

/**
 * Summiert alle Battery-Entities aus der Battery-Bar
 * Gibt ein Objekt mit aggregierten Werten zurück
 */
export function sumBatteryBarEntities(
    entities: BatteryBarEntity[] | undefined, 
    hass: Hass | undefined
): {
    avgSoc: number;
    totalCharge: number;
    totalDischarge: number;
    totalCapacity: number;
    count: number;
} {
    if (!entities || entities.length === 0 || !hass) {
        return { avgSoc: 0, totalCharge: 0, totalDischarge: 0, totalCapacity: 0, count: 0 };
    }
    
    let totalSoc = 0;
    let totalCharge = 0;
    let totalDischarge = 0;
    let totalCapacity = 0;
    let count = 0;
    
    entities.forEach((entity) => {
        if (entity.entity && hass.states[entity.entity]) {
            const soc = parseFloat(hass.states[entity.entity].state) || 0;
            totalSoc += soc;
            count++;
            
            if (entity.capacity) {
                totalCapacity += entity.capacity;
            }
            
            if (entity.charge_entity && hass.states[entity.charge_entity]) {
                totalCharge += parseFloat(hass.states[entity.charge_entity].state) || 0;
            }
            
            if (entity.discharge_entity && hass.states[entity.discharge_entity]) {
                totalDischarge += parseFloat(hass.states[entity.discharge_entity].state) || 0;
            }
        }
    });
    
    return {
        avgSoc: count > 0 ? totalSoc / count : 0,
        totalCharge,
        totalDischarge,
        totalCapacity,
        count
    };
}
