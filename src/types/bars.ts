export interface PVBarEntity {
    entity: string;
    name?: string;
    max_power?: number;
    icon?: string;
}

export interface BatteryBarEntity {
    entity: string;
    name?: string;
    capacity?: number;
    charge_entity?: string;
    discharge_entity?: string;
    icon?: string;
}

export interface BarStyle {
    background_color?: string;
    border_color?: string;
    border_radius?: string;
    padding?: string;
    gap?: string;
    height?: string;
    icon_size?: string;
    icon_color?: string;
    label_size?: string;
    label_color?: string;
    label_font_weight?: string;
    label_line_height?: string;
    value_size?: string;
    value_color?: string;
    value_font_weight?: string;
    value_line_height?: string;
    separator?: string;
    item_gap?: string;
}

export type BarPosition = 'above-cards' | 'below-cards' | 'above-consumers' | 'below-consumers' | 'bottom';

export interface PVBarConfig {
    show?: boolean;
    entities?: PVBarEntity[];
    position?: BarPosition;
    align?: 'left' | 'center' | 'right';
    style?: BarStyle;
}

export interface BatteryBarConfig {
    show?: boolean;
    entities?: BatteryBarEntity[];
    position?: BarPosition;
    align?: 'left' | 'center' | 'right';
    style?: BarStyle;
}
