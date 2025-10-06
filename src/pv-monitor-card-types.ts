export type AnimationStyle = 'none' | 'rotating-dots' | 'particle-field' | 'electric-arc';

export interface HassEntity {
    state: string;
    attributes: Record<string, any>;
}

export interface Hass {
    states: Record<string, HassEntity>;
    callService?: (domain: string, service: string, data?: any) => Promise<any>;
}

export interface TapAction {
    action: string;
    navigation_path?: string;
    url_path?: string;
    service?: string;
    service_data?: any;
    target?: any;
    data?: any;
}

export interface CardStyle {
    background_color?: string;
    border_color?: string;
    primary_color?: string;
    secondary_color?: string;
    icon_color?: string;
}

export interface InfoBarItem {
    entity?: string;
    icon?: string;
    label?: string;
    unit?: string;
}

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

export interface PVMonitorCardConfig {
    type: string;
    language?: 'de' | 'en' | 'fr' | 'it' | 'es';
    theme?: string;
    title?: string;
    show_title?: boolean;
    subtitle?: string;
    show_subtitle?: boolean;
    icon?: string;
    show_icon?: boolean;
    grid_gap?: string;

    entities?: {
        pv_production?: string;
        battery_soc?: string;
        battery_charge?: string;
        battery_discharge?: string;
        house_consumption?: string;
        grid_power?: string;
    };

    pv_max_power?: number;
    battery_capacity?: number;
    grid_threshold?: number;

    info_bar?: {
        show?: boolean;
        position?: 'top' | 'bottom';
        calculation_mode?: 'autarky' | 'self_consumption';
        calculate_battery_times?: boolean;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        item1?: InfoBarItem;
        item2?: InfoBarItem;
        item3?: InfoBarItem;
        style?: {
            background_color?: string;
            border_color?: string;
            border_radius?: string;
            padding?: string;
            gap?: string;
            icon_size?: string;
            icon_color?: string;
            label_size?: string;
            label_color?: string;
            label_font_weight?: string;
            value_size?: string;
            value_color?: string;
            value_font_weight?: string;
        };
    };
    style?: {
        card_background_color?: string;
        card_border_color?: string;
        card_boxshadow?: string;
        card_border_radius?: string;
        card_text_color?: string;
        card_cursor?: string;
        card_padding?: string;
        header_margin_bottom?: string;
        infobar_gap?: string;
        title_align?: "left" | "center" | "right";
        title_size?: string;
        title_font_weight?: string;
        title_color?: string;
        subtitle_align?: "left" | "center" | "right";
        subtitle_size?: string;
        subtitle_font_weight?: string;
        subtitle_color?: string;
        icon_size?: string;
        icon_opacity?: string;
        icon_margin?: string;
        primary_size?: string;
        primary_color?: string;
        primary_font_opacity?: string;
        primary_font_weight?: string;
        secondary_size?: string;
        secondary_color?: string;
        secondary_font_weight?: string;
        secondary_font_opacity?: string;
        tertiary_size?: string;
        tertiary_color?: string;
        tertiary_font_weight?: string;
        tertiary_font_opacity?: string;
    };
    netz?: {
        show?: boolean;
        entity?: string;
        animation?: boolean;
        animation_style?: AnimationStyle;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        text_einspeisen?: string;
        text_neutral?: string;
        text_bezug?: string;
        threshold?: number;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };
    pv?: {
        show?: boolean;
        entity?: string;
        animation?: boolean;
        animation_style?: AnimationStyle;
        icon?: string;
        icon_rotation?: boolean;
        max_power?: number;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };
    batterie?: {
        show?: boolean;
        entity?: string;
        animation?: boolean;
        animation_style?: AnimationStyle;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        ladung_entity?: string;
        entladung_entity?: string;
        status_entity?: string;
        battery_capacity?: number;
        calculate_runtime?: boolean;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };
    haus?: {
        show?: boolean;
        entity?: string;
        animation?: boolean;
        animation_style?: AnimationStyle;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        secondary_entity?: string;
        secondary_text?: string;
        show_consumer_total?: boolean;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };
    consumers?: ConsumersConfig;
}