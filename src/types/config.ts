import { AnimationStyle, CardStyle } from './base';
import { TapAction } from './actions';
import { InfoBarConfig } from './info-bar';
import { ConsumersConfig } from './consumers';

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

    info_bar?: InfoBarConfig;

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
        header_background_enabled?: boolean;
        header_background_color?: string;
        header_border_color?: string;
        header_border_radius?: string;
        header_padding?: string;
        header_width?: 'auto' | 'full';
        header_box_shadow?: string;
        title_align?: "left" | "center" | "right";
        title_size?: string;
        title_font_weight?: string;
        title_color?: string;
        title_line_height?: string;
        title_subtitle_gap?: string;
        subtitle_align?: "left" | "center" | "right";
        subtitle_size?: string;
        subtitle_font_weight?: string;
        subtitle_color?: string;
        subtitle_line_height?: string;
        header_icon_size?: string;
        header_icon_color?: string;
        header_icon_margin?: string;
        icon_size?: string;
        icon_opacity?: string;
        icon_margin?: string;
        primary_size?: string;
        primary_color?: string;
        primary_font_opacity?: string;
        primary_font_weight?: string;
        primary_line_height?: string;
        secondary_size?: string;
        secondary_color?: string;
        secondary_font_weight?: string;
        secondary_font_opacity?: string;
        secondary_line_height?: string;
        tertiary_size?: string;
        tertiary_color?: string;
        tertiary_font_weight?: string;
        tertiary_font_opacity?: string;
        tertiary_line_height?: string;
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
