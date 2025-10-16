import { TapAction } from './actions';

export interface InfoBarItem {
    entity?: string;
    icon?: string;
    label?: string;
    unit?: string;
}

export interface InfoBarConfig {
    show?: boolean;
    position?: 'top' | 'bottom';
    calculation_mode?: 'autarky' | 'self_consumption';
    calculate_battery_times?: boolean;
    item1_calc_type?: 'autarky' | 'self_consumption' | 'runtime' | 'chargetime' | 'entity';
    item2_calc_type?: 'autarky' | 'self_consumption' | 'runtime' | 'chargetime' | 'entity';
    item3_calc_type?: 'autarky' | 'self_consumption' | 'runtime' | 'chargetime' | 'entity';
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
        label_line_height?: string;
        value_size?: string;
        value_color?: string;
        value_font_weight?: string;
        value_line_height?: string;
    };
}
