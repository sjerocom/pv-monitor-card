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

export interface PVMonitorCardConfig {
    type: string;
    title?: string;
    show_title?: boolean;
    subtitle?: string;
    show_subtitle?: boolean;
    icon?: string;
    show_icon?: boolean;
    grid_gap?: string;
    info_bar?: {
        show?: boolean;
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
        title_align?: "left" | "center" | "right";
        title_size?: string;
        title_font_weight?: string;
        title_color?: string;
        subtitle_align?: "left" | "center" | "right";
        subtitle_size?: string;
        subtitle_font_weight?: string;
        subtitle_color?: string;
        icon_size?: string;
        icon_font_weight?: string;
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
        entity?: string;
        animation?: boolean;
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
        entity?: string;
        animation?: boolean;
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
        entity?: string;
        animation?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        ladung_entity?: string;
        entladung_entity?: string;
        status_entity?: string;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };
    haus?: {
        entity?: string;
        animation?: boolean;
        icon?: string;
        tap_action?: TapAction;
        double_tap_action?: TapAction;
        hold_action?: TapAction;
        secondary_entity?: string;
        secondary_text?: string;
        tertiary_entity?: string;
        tertiary_text?: string;
        style?: CardStyle;
    };
}