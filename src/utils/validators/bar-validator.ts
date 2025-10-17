import { PVMonitorCardConfig, Hass } from '../../types';

export interface ValidationWarning {
    type: 'pv_bar' | 'battery_bar' | 'pv_card' | 'battery_card';
    message: string;
}

export function validatePVBar(config: PVMonitorCardConfig, hass: Hass): ValidationWarning[] {
    const warnings: ValidationWarning[] = [];
    const pvBar = config.pv_bar;

    if (!pvBar?.show || !pvBar?.entities?.length) return warnings;

    if (pvBar.entities.length > 5) {
        warnings.push({
            type: 'pv_bar',
            message: 'Max. 5 PV-Anlagen erlaubt - nur erste 5 werden angezeigt'
        });
    }

    pvBar.entities.slice(0, 5).forEach((entity, index) => {
        if (!entity.max_power) {
            warnings.push({
                type: 'pv_bar',
                message: `PV ${index + 1} (${entity.name || entity.entity}): max_power fehlt`
            });
        }
        if (!hass.states[entity.entity]) {
            warnings.push({
                type: 'pv_bar',
                message: `PV ${index + 1}: Entity ${entity.entity} nicht gefunden`
            });
        }
    });

    return warnings;
}

export function validateBatteryBar(config: PVMonitorCardConfig, hass: Hass): ValidationWarning[] {
    const warnings: ValidationWarning[] = [];
    const batteryBar = config.battery_bar;

    if (!batteryBar?.show || !batteryBar?.entities?.length) return warnings;

    if (batteryBar.entities.length > 5) {
        warnings.push({
            type: 'battery_bar',
            message: 'Max. 5 Batterien erlaubt - nur erste 5 werden angezeigt'
        });
    }

    batteryBar.entities.slice(0, 5).forEach((entity, index) => {
        if (!entity.capacity) {
            warnings.push({
                type: 'battery_bar',
                message: `Batterie ${index + 1} (${entity.name || entity.entity}): capacity fehlt`
            });
        }
        if (!hass.states[entity.entity]) {
            warnings.push({
                type: 'battery_bar',
                message: `Batterie ${index + 1}: Entity ${entity.entity} nicht gefunden`
            });
        }
    });

    return warnings;
}

export function validatePVCard(config: PVMonitorCardConfig, hass: Hass): ValidationWarning[] {
    const warnings: ValidationWarning[] = [];
    const pv = config.pv;

    if (!pv?.show || !pv?.entities?.length) return warnings;

    pv.entities.forEach((entity, index) => {
        if (!entity.max_power) {
            warnings.push({
                type: 'pv_card',
                message: `PV-Anlage ${index + 1}: max_power fehlt - Berechnungen nicht möglich`
            });
        }
    });

    return warnings;
}

export function validateBatteryCard(config: PVMonitorCardConfig, hass: Hass): ValidationWarning[] {
    const warnings: ValidationWarning[] = [];
    const batterie = config.batterie;

    if (!batterie?.show || !batterie?.entities?.length) return warnings;

    batterie.entities.forEach((entity, index) => {
        if (!entity.capacity) {
            warnings.push({
                type: 'battery_card',
                message: `Batterie ${index + 1}: capacity fehlt - Berechnungen nicht möglich`
            });
        }
    });

    return warnings;
}

export function validateOldConfig(config: PVMonitorCardConfig): ValidationWarning[] {
    const warnings: ValidationWarning[] = [];

    // Check alte PV Config
    if (config.pv?.entity && !config.pv?.entities?.length) {
        warnings.push({
            type: 'pv_card',
            message: '⚠️ Config ungültig - verwende entities[] statt entity'
        });
    }

    // Check alte Batterie Config
    if (config.batterie?.entity && !config.batterie?.entities?.length) {
        warnings.push({
            type: 'battery_card',
            message: '⚠️ Config ungültig - verwende entities[] statt entity'
        });
    }

    return warnings;
}

export function getAllValidationWarnings(config: PVMonitorCardConfig, hass: Hass): ValidationWarning[] {
    return [
        ...validateOldConfig(config),
        ...validatePVBar(config, hass),
        ...validateBatteryBar(config, hass),
        ...validatePVCard(config, hass),
        ...validateBatteryCard(config, hass)
    ];
}
