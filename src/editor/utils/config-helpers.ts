import { PVMonitorCardConfig } from "../../pv-monitor-card-types";

export function updateConfigValue(
    config: PVMonitorCardConfig,
    path: string[],
    value: any
): PVMonitorCardConfig {
    const newConfig = JSON.parse(JSON.stringify(config));
    let current: any = newConfig;

    for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
            current[path[i]] = {};
        }
        current = current[path[i]];
    }

    if (value === undefined || value === '') {
        delete current[path[path.length - 1]];
    } else {
        current[path[path.length - 1]] = value;
    }

    return newConfig;
}

export function updateTapAction(
    config: PVMonitorCardConfig,
    path: string[],
    key: string,
    value: any
): PVMonitorCardConfig {
    const newConfig = JSON.parse(JSON.stringify(config));
    let current: any = newConfig;

    for (let i = 0; i < path.length; i++) {
        if (i === path.length - 1) {
            if (!current[path[i]]) current[path[i]] = {};
            current[path[i]][key] = value;
        } else {
            if (!current[path[i]]) current[path[i]] = {};
            current = current[path[i]];
        }
    }

    return newConfig;
}

export function getConfigValue(config: PVMonitorCardConfig, path: string[]): any {
    let current: any = config;
    for (const key of path) {
        if (current === undefined || current === null) return undefined;
        current = current[key];
    }
    return current;
}