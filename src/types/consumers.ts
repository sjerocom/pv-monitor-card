import { TapAction } from './actions';

export interface ConsumerItemStyle {
    icon_size?: string;
    icon_color?: string;
    icon_opacity?: string;
    primary_size?: string;
    primary_color?: string;
    primary_opacity?: string;
    primary_font_weight?: string;
    secondary_size?: string;
    secondary_color?: string;
    secondary_opacity?: string;
    secondary_font_weight?: string;
    background_color?: string;
    border_color?: string;
    border_radius?: string;
    padding?: string;
    margin?: string;
    box_shadow?: string;
}

export interface ConsumerItem {
    entity: string;
    icon?: string;
    label?: string;
    threshold?: number;
    auto_color?: boolean;
    primary_entity?: string;
    primary_text?: string;
    show_primary?: boolean;
    secondary_entity?: string;
    secondary_text?: string;
    show_secondary?: boolean;
    switch_entity?: string;
    tap_action?: TapAction;
    double_tap_action?: TapAction;
    hold_action?: TapAction;
    style?: ConsumerItemStyle;
}

export type ConsumerSortMode = 'highest_first' | 'lowest_first' | 'none' | 'alpha_asc' | 'alpha_desc';

export interface ConsumersConfig {
    show?: boolean;
    position?: 'bottom';
    sort_mode?: ConsumerSortMode;
    threshold?: number;
    style?: {
        gap?: string;
        item_background_color?: string;
        item_border_color?: string;
        item_border_radius?: string;
        item_padding?: string;
        item_margin?: string;
        item_box_shadow?: string;
        icon_size?: string;
        icon_opacity?: string;
        primary_size?: string;
        primary_font_weight?: string;
        primary_opacity?: string;
        secondary_size?: string;
        secondary_font_weight?: string;
        secondary_opacity?: string;
    };
    items?: ConsumerItem[];
}
