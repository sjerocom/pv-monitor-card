export interface HassEntity {
    state: string;
    attributes: Record<string, any>;
}

export interface Hass {
    states: Record<string, HassEntity>;
    callService?: (domain: string, service: string, data?: any) => Promise<any>;
}
