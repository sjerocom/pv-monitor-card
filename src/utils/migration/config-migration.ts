import { PVMonitorCardConfig } from '../../types';

/**
 * Migriert alte Config-Struktur zur neuen
 * @param config Alte oder neue Config
 * @returns Migrierte Config
 */
export function migrateConfig(config: PVMonitorCardConfig): PVMonitorCardConfig {
    // Deep copy um Frozen-Objekte zu vermeiden
    const migratedConfig: PVMonitorCardConfig = JSON.parse(JSON.stringify(config));

    // Migration: entities.* → card.entity
    if (migratedConfig.entities) {
        // PV Migration
        if (migratedConfig.entities.pv_production && !migratedConfig.pv?.entity) {
            if (!migratedConfig.pv) migratedConfig.pv = {};
            migratedConfig.pv.entity = migratedConfig.entities.pv_production;
        }

        // Battery Migration
        if (migratedConfig.entities.battery_soc && !migratedConfig.batterie?.entity) {
            if (!migratedConfig.batterie) migratedConfig.batterie = {};
            migratedConfig.batterie.entity = migratedConfig.entities.battery_soc;
        }

        if (migratedConfig.entities.battery_charge && !migratedConfig.batterie?.ladung_entity) {
            if (!migratedConfig.batterie) migratedConfig.batterie = {};
            migratedConfig.batterie.ladung_entity = migratedConfig.entities.battery_charge;
        }

        if (migratedConfig.entities.battery_discharge && !migratedConfig.batterie?.entladung_entity) {
            if (!migratedConfig.batterie) migratedConfig.batterie = {};
            migratedConfig.batterie.entladung_entity = migratedConfig.entities.battery_discharge;
        }

        // House Migration
        if (migratedConfig.entities.house_consumption && !migratedConfig.haus?.entity) {
            if (!migratedConfig.haus) migratedConfig.haus = {};
            migratedConfig.haus.entity = migratedConfig.entities.house_consumption;
        }

        // Grid Migration
        if (migratedConfig.entities.grid_power && !migratedConfig.netz?.entity) {
            if (!migratedConfig.netz) migratedConfig.netz = {};
            migratedConfig.netz.entity = migratedConfig.entities.grid_power;
        }

        // Entferne alte entities nach Migration
        delete migratedConfig.entities;
    }

    // Migration: Alte pv_max_power → pv.max_power
    if (migratedConfig.pv_max_power !== undefined && !migratedConfig.pv?.max_power) {
        if (!migratedConfig.pv) migratedConfig.pv = {};
        migratedConfig.pv.max_power = migratedConfig.pv_max_power;
        delete migratedConfig.pv_max_power;
    }

    // Migration: Alte battery_capacity → batterie.battery_capacity
    if (migratedConfig.battery_capacity !== undefined && !migratedConfig.batterie?.battery_capacity) {
        if (!migratedConfig.batterie) migratedConfig.batterie = {};
        migratedConfig.batterie.battery_capacity = migratedConfig.battery_capacity;
        delete migratedConfig.battery_capacity;
    }

    // Migration: Alte grid_threshold → netz.threshold
    if (migratedConfig.grid_threshold !== undefined && !migratedConfig.netz?.threshold) {
        if (!migratedConfig.netz) migratedConfig.netz = {};
        migratedConfig.netz.threshold = migratedConfig.grid_threshold;
        delete migratedConfig.grid_threshold;
    }

    return migratedConfig;
}
