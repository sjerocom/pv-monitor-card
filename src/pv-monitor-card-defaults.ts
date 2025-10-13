import { PVMonitorCardConfig } from "./pv-monitor-card-types";
import { getTranslations, detectLanguage } from "./pv-monitor-card-i18n";
import { applyThemeToConfig } from "./pv-monitor-card-themes";

export function getDefaultConfig(config: PVMonitorCardConfig): PVMonitorCardConfig {
    const t = getTranslations(config.language || detectLanguage());

    let themedConfig = config;
    if (config.theme) {
        themedConfig = applyThemeToConfig(config, config.theme);
    }

    return {
        ...themedConfig,
        language: themedConfig.language || detectLanguage(),
        theme: themedConfig.theme,
        show_title: themedConfig.show_title !== false,
        show_subtitle: themedConfig.show_subtitle !== false,
        show_icon: themedConfig.show_icon !== false,
        grid_gap: themedConfig.grid_gap ?? '6px',

        entities: themedConfig.entities,

        pv_max_power: themedConfig.pv_max_power ?? 10000,
        battery_capacity: themedConfig.battery_capacity ?? 10000,
        grid_threshold: themedConfig.grid_threshold ?? 10,

        info_bar: {
            show: themedConfig.info_bar?.show === true,
            position: themedConfig.info_bar?.position || 'top',
            calculation_mode: themedConfig.info_bar?.calculation_mode || 'autarky',
            calculate_battery_times: themedConfig.info_bar?.calculate_battery_times === true,
            item1_calc_type: themedConfig.info_bar?.item1_calc_type ??
                (themedConfig.info_bar?.calculation_mode || 'autarky'),
            item2_calc_type: themedConfig.info_bar?.item2_calc_type ?? 'runtime',
            item3_calc_type: themedConfig.info_bar?.item3_calc_type ?? 'chargetime',
            item1: {
                icon: themedConfig.info_bar?.item1?.icon ?? 'mdi:home-lightning-bolt',
                label: themedConfig.info_bar?.item1?.label ?? t.editor.default_autarky,
                ...themedConfig.info_bar?.item1
            },
            item2: {
                icon: themedConfig.info_bar?.item2?.icon ?? 'mdi:battery-clock',
                label: themedConfig.info_bar?.item2?.label ?? t.editor.default_runtime,
                ...themedConfig.info_bar?.item2
            },
            item3: {
                icon: themedConfig.info_bar?.item3?.icon ?? 'mdi:battery-charging',
                label: themedConfig.info_bar?.item3?.label ?? t.editor.default_chargetime,
                ...themedConfig.info_bar?.item3
            },
            style: {
                background_color: themedConfig.info_bar?.style?.background_color ?? 'rgba(21, 20, 27, 1)',
                border_color: themedConfig.info_bar?.style?.border_color ?? 'rgba(255, 255, 255, 0.1)',
                border_radius: themedConfig.info_bar?.style?.border_radius ?? '16px',
                padding: themedConfig.info_bar?.style?.padding ?? '12px',
                gap: themedConfig.info_bar?.style?.gap ?? '8px',
                icon_size: themedConfig.info_bar?.style?.icon_size ?? '1.5em',
                icon_color: themedConfig.info_bar?.style?.icon_color ?? 'white',
                label_size: themedConfig.info_bar?.style?.label_size ?? '0.8em',
                label_color: themedConfig.info_bar?.style?.label_color ?? 'rgba(255, 255, 255, 0.7)',
                label_font_weight: themedConfig.info_bar?.style?.label_font_weight ?? 'normal',
                label_line_height: themedConfig.info_bar?.style?.label_line_height ?? '1.2',
                value_size: themedConfig.info_bar?.style?.value_size ?? '1em',
                value_color: themedConfig.info_bar?.style?.value_color ?? 'white',
                value_font_weight: themedConfig.info_bar?.style?.value_font_weight ?? 'bold',
                value_line_height: themedConfig.info_bar?.style?.value_line_height ?? '1.4',
                ...themedConfig.info_bar?.style
            }
        },

        style: {
            card_background_color: themedConfig.style?.card_background_color ?? 'rgba(21, 20, 27, 1)',
            card_border_color: themedConfig.style?.card_border_color ?? 'rgba(255, 255, 255, 0.1)',
            card_boxshadow: themedConfig.style?.card_boxshadow ?? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            card_border_radius: themedConfig.style?.card_border_radius ?? '16px',
            card_text_color: themedConfig.style?.card_text_color ?? 'white',
            card_cursor: themedConfig.style?.card_cursor ?? 'pointer',
            card_padding: themedConfig.style?.card_padding ?? '12px',
            header_margin_bottom: themedConfig.style?.header_margin_bottom ?? '12px',
            infobar_gap: themedConfig.style?.infobar_gap ?? '6px',
            header_background_enabled: themedConfig.style?.header_background_enabled ?? false,
            header_background_color: themedConfig.style?.header_background_color ?? 'rgba(21, 20, 27, 1)',
            header_border_color: themedConfig.style?.header_border_color ?? 'rgba(255, 255, 255, 0.1)',
            header_border_radius: themedConfig.style?.header_border_radius ?? '16px',
            header_padding: themedConfig.style?.header_padding ?? '12px',
            header_width: themedConfig.style?.header_width ?? 'auto',
            header_box_shadow: themedConfig.style?.header_box_shadow ?? '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
            title_align: themedConfig.style?.title_align ?? 'center',
            title_size: themedConfig.style?.title_size ?? '1.5em',
            title_font_weight: themedConfig.style?.title_font_weight ?? 'bold',
            title_color: themedConfig.style?.title_color ?? 'white',
            title_line_height: themedConfig.style?.title_line_height ?? '1.2',
            title_subtitle_gap: themedConfig.style?.title_subtitle_gap ?? '4px',
            subtitle_align: themedConfig.style?.subtitle_align ?? 'center',
            subtitle_size: themedConfig.style?.subtitle_size ?? '1em',
            subtitle_font_weight: themedConfig.style?.subtitle_font_weight ?? 'normal',
            subtitle_color: themedConfig.style?.subtitle_color ?? 'rgba(255, 255, 255, 0.7)',
            subtitle_line_height: themedConfig.style?.subtitle_line_height ?? '1.4',
            header_icon_size: themedConfig.style?.header_icon_size ?? '1.5em',
            header_icon_color: themedConfig.style?.header_icon_color ?? 'white',
            header_icon_margin: themedConfig.style?.header_icon_margin ?? '8px',
            icon_size: themedConfig.style?.icon_size ?? '2em',
            icon_opacity: themedConfig.style?.icon_opacity ?? '1',
            icon_margin: themedConfig.style?.icon_margin ?? '6px',
            primary_size: themedConfig.style?.primary_size ?? '1.2em',
            primary_color: themedConfig.style?.primary_color ?? 'white',
            primary_font_opacity: themedConfig.style?.primary_font_opacity ?? '1',
            primary_font_weight: themedConfig.style?.primary_font_weight ?? 'normal',
            primary_line_height: themedConfig.style?.primary_line_height ?? '1.2',
            secondary_size: themedConfig.style?.secondary_size ?? '0.9em',
            secondary_color: themedConfig.style?.secondary_color ?? 'white',
            secondary_font_weight: themedConfig.style?.secondary_font_weight ?? 'normal',
            secondary_font_opacity: themedConfig.style?.secondary_font_opacity ?? '0.7',
            secondary_line_height: themedConfig.style?.secondary_line_height ?? '1.4',
            tertiary_size: themedConfig.style?.tertiary_size ?? '0.9em',
            tertiary_color: themedConfig.style?.tertiary_color ?? 'white',
            tertiary_font_weight: themedConfig.style?.tertiary_font_weight ?? 'normal',
            tertiary_font_opacity: themedConfig.style?.tertiary_font_opacity ?? '0.7',
            tertiary_line_height: themedConfig.style?.tertiary_line_height ?? '1.4',
            ...themedConfig.style
        },

        netz: {
            show: themedConfig.netz?.show !== false,
            animation: themedConfig.netz?.animation !== false,
            animation_style: themedConfig.netz?.animation_style || 'rotating-dots',
            threshold: themedConfig.netz?.threshold ?? 10,
            text_einspeisen: themedConfig.netz?.text_einspeisen ?? t.status.feed_in,
            text_neutral: themedConfig.netz?.text_neutral ?? t.status.neutral,
            text_bezug: themedConfig.netz?.text_bezug ?? t.status.grid_consumption,
            ...themedConfig.netz
        },

        pv: {
            show: themedConfig.pv?.show !== false,
            animation: themedConfig.pv?.animation !== false,
            animation_style: themedConfig.pv?.animation_style || 'rotating-dots',
            icon_rotation: themedConfig.pv?.icon_rotation === true,
            max_power: themedConfig.pv?.max_power ?? 10000,
            ...themedConfig.pv
        },

        batterie: {
            show: themedConfig.batterie?.show !== false,
            animation: themedConfig.batterie?.animation !== false,
            animation_style: themedConfig.batterie?.animation_style || 'rotating-dots',
            battery_capacity: themedConfig.batterie?.battery_capacity ?? 10000,
            calculate_runtime: themedConfig.batterie?.calculate_runtime === true,
            ...themedConfig.batterie
        },

        haus: {
            show: themedConfig.haus?.show !== false,
            animation: themedConfig.haus?.animation !== false,
            animation_style: themedConfig.haus?.animation_style || 'rotating-dots',
            ...themedConfig.haus
        },

        consumers: {
            show: themedConfig.consumers?.show === true,
            position: themedConfig.consumers?.position || 'bottom',
            sort_mode: themedConfig.consumers?.sort_mode || 'highest_first',
            threshold: themedConfig.consumers?.threshold ?? 0,
            style: {
                gap: themedConfig.consumers?.style?.gap ?? '6px',
                item_background_color: themedConfig.consumers?.style?.item_background_color ?? 'rgba(21, 20, 27, 1)',
                item_border_color: themedConfig.consumers?.style?.item_border_color ?? 'rgba(255, 255, 255, 0.1)',
                item_border_radius: themedConfig.consumers?.style?.item_border_radius ?? '18px',
                item_padding: themedConfig.consumers?.style?.item_padding ?? '6px 12px',
                item_margin: themedConfig.consumers?.style?.item_margin ?? '2px',
                item_box_shadow: themedConfig.consumers?.style?.item_box_shadow ?? '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
                icon_size: themedConfig.consumers?.style?.icon_size ?? '1.2em',
                icon_opacity: themedConfig.consumers?.style?.icon_opacity ?? '1',
                primary_size: themedConfig.consumers?.style?.primary_size ?? '0.9em',
                primary_font_weight: themedConfig.consumers?.style?.primary_font_weight ?? 'bold',
                primary_opacity: themedConfig.consumers?.style?.primary_opacity ?? '1',
                secondary_size: themedConfig.consumers?.style?.secondary_size ?? '0.7em',
                secondary_font_weight: themedConfig.consumers?.style?.secondary_font_weight ?? 'normal',
                secondary_opacity: themedConfig.consumers?.style?.secondary_opacity ?? '0.7',
                ...themedConfig.consumers?.style
            },
            items: themedConfig.consumers?.items || []
        }
    };
}