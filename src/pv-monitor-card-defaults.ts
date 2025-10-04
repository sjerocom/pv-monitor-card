import { PVMonitorCardConfig } from "./pv-monitor-card-types";

export function getDefaultConfig(config: PVMonitorCardConfig): PVMonitorCardConfig {
    return {
        ...config,
        show_title: config.show_title !== false,
        show_subtitle: config.show_subtitle !== false,
        show_icon: config.show_icon !== false,
        grid_gap: config.grid_gap ?? '6px',

        info_bar: {
            show: config.info_bar?.show === true,
            item1: {
                icon: config.info_bar?.item1?.icon ?? 'mdi:home-lightning-bolt',
                label: config.info_bar?.item1?.label ?? 'Autarkie',
                ...config.info_bar?.item1
            },
            item2: {
                icon: config.info_bar?.item2?.icon ?? 'mdi:battery-clock',
                label: config.info_bar?.item2?.label ?? 'Restlaufzeit',
                ...config.info_bar?.item2
            },
            item3: {
                icon: config.info_bar?.item3?.icon ?? 'mdi:battery-charging',
                label: config.info_bar?.item3?.label ?? 'Restladezeit',
                ...config.info_bar?.item3
            },
            style: {
                background_color: config.info_bar?.style?.background_color ?? 'rgba(21, 20, 27, 1)',
                border_color: config.info_bar?.style?.border_color ?? 'rgba(255, 255, 255, 0.1)',
                border_radius: config.info_bar?.style?.border_radius ?? '16px',
                padding: config.info_bar?.style?.padding ?? '12px',
                gap: config.info_bar?.style?.gap ?? '8px',
                icon_size: config.info_bar?.style?.icon_size ?? '1.5em',
                icon_color: config.info_bar?.style?.icon_color ?? 'white',
                label_size: config.info_bar?.style?.label_size ?? '0.8em',
                label_color: config.info_bar?.style?.label_color ?? 'rgba(255, 255, 255, 0.7)',
                label_font_weight: config.info_bar?.style?.label_font_weight ?? 'normal',
                value_size: config.info_bar?.style?.value_size ?? '1em',
                value_color: config.info_bar?.style?.value_color ?? 'white',
                value_font_weight: config.info_bar?.style?.value_font_weight ?? 'bold',
                ...config.info_bar?.style
            }
        },

        style: {
            card_background_color: config.style?.card_background_color ?? 'rgba(21, 20, 27, 1)',
            card_border_color: config.style?.card_border_color ?? 'rgba(255, 255, 255, 0.1)',
            card_boxshadow: config.style?.card_boxshadow ?? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            card_border_radius: config.style?.card_border_radius ?? '16px',
            card_text_color: config.style?.card_text_color ?? 'white',
            card_cursor: config.style?.card_cursor ?? 'pointer',
            card_padding: config.style?.card_padding ?? '12px',
            title_align: config.style?.title_align ?? 'center',
            title_size: config.style?.title_size ?? '1.5em',
            title_font_weight: config.style?.title_font_weight ?? 'bold',
            title_color: config.style?.title_color ?? 'white',
            subtitle_align: config.style?.subtitle_align ?? 'center',
            subtitle_size: config.style?.subtitle_size ?? '1em',
            subtitle_font_weight: config.style?.subtitle_font_weight ?? 'normal',
            subtitle_color: config.style?.subtitle_color ?? 'rgba(255, 255, 255, 0.7)',
            icon_size: config.style?.icon_size ?? '2em',
            icon_font_weight: config.style?.icon_font_weight ?? 'normal',
            icon_opacity: config.style?.icon_opacity ?? '1',
            icon_margin: config.style?.icon_margin ?? '6px',
            primary_size: config.style?.primary_size ?? '1.2em',
            primary_color: config.style?.primary_color ?? 'white',
            primary_font_opacity: config.style?.primary_font_opacity ?? '1',
            primary_font_weight: config.style?.primary_font_weight ?? 'normal',
            secondary_size: config.style?.secondary_size ?? '0.9em',
            secondary_color: config.style?.secondary_color ?? 'white',
            secondary_font_weight: config.style?.secondary_font_weight ?? 'normal',
            secondary_font_opacity: config.style?.secondary_font_opacity ?? '0.7',
            tertiary_size: config.style?.tertiary_size ?? '0.9em',
            tertiary_color: config.style?.tertiary_color ?? 'white',
            tertiary_font_weight: config.style?.tertiary_font_weight ?? 'normal',
            tertiary_font_opacity: config.style?.tertiary_font_opacity ?? '0.7',
            ...config.style
        },

        netz: {
            animation: config.netz?.animation !== false,
            threshold: config.netz?.threshold ?? 10,
            text_einspeisen: config.netz?.text_einspeisen ?? "Einspeisung",
            text_neutral: config.netz?.text_neutral ?? "Neutral",
            text_bezug: config.netz?.text_bezug ?? "Netzbezug",
            ...config.netz
        },

        pv: {
            animation: config.pv?.animation !== false,
            icon_rotation: config.pv?.icon_rotation === true,
            max_power: config.pv?.max_power ?? 10000,
            ...config.pv
        },

        batterie: {
            animation: config.batterie?.animation !== false,
            ...config.batterie
        },

        haus: {
            animation: config.haus?.animation !== false,
            ...config.haus
        }
    };
}