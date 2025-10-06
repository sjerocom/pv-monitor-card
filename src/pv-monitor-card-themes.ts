// Theme System for PV Monitor Card
// Supports predefined themes and custom theme files

export type ThemeId = 'dark' | 'light' | 'blue' | 'green' | 'monochrome' | 'solarized' | 'nord' | 'dracula' | 'catppuccin' | 'material' | 'minimalist' | 'slate' | string;

export interface Theme {
    id: ThemeId;
    name: string;
    colors: {
        card_background_color: string;
        card_border_color: string;
        card_text_color: string;

        primary_color: string;
        secondary_color: string;

        title_color: string;
        subtitle_color: string;

        infobar_background_color: string;
        infobar_border_color: string;
        infobar_icon_color: string;
        infobar_label_color: string;
        infobar_value_color: string;
    };
}

export const defaultThemes: Record<string, Theme> = {
    dark: {
        id: 'dark',
        name: 'Dark',
        colors: {
            card_background_color: 'rgba(21, 20, 27, 1)',
            card_border_color: 'rgba(255, 255, 255, 0.1)',
            card_text_color: 'white',
            primary_color: 'white',
            secondary_color: 'white',
            title_color: 'white',
            subtitle_color: 'rgba(255, 255, 255, 0.7)',
            infobar_background_color: 'rgba(21, 20, 27, 1)',
            infobar_border_color: 'rgba(255, 255, 255, 0.1)',
            infobar_icon_color: 'white',
            infobar_label_color: 'rgba(255, 255, 255, 0.7)',
            infobar_value_color: 'white',
        }
    },

    light: {
        id: 'light',
        name: 'Light',
        colors: {
            card_background_color: 'rgba(255, 255, 255, 1)',
            card_border_color: 'rgba(0, 0, 0, 0.1)',
            card_text_color: 'rgba(0, 0, 0, 0.87)',
            primary_color: 'rgba(0, 0, 0, 0.87)',
            secondary_color: 'rgba(0, 0, 0, 0.6)',
            title_color: 'rgba(0, 0, 0, 0.87)',
            subtitle_color: 'rgba(0, 0, 0, 0.6)',
            infobar_background_color: 'rgba(250, 250, 250, 1)',
            infobar_border_color: 'rgba(0, 0, 0, 0.1)',
            infobar_icon_color: 'rgba(0, 0, 0, 0.6)',
            infobar_label_color: 'rgba(0, 0, 0, 0.6)',
            infobar_value_color: 'rgba(0, 0, 0, 0.87)',
        }
    },

    blue: {
        id: 'blue',
        name: 'Blue',
        colors: {
            card_background_color: 'rgba(15, 23, 42, 1)',
            card_border_color: 'rgba(59, 130, 246, 0.3)',
            card_text_color: 'rgba(226, 232, 240, 1)',
            primary_color: 'rgba(96, 165, 250, 1)',
            secondary_color: 'rgba(147, 197, 253, 0.8)',
            title_color: 'rgba(96, 165, 250, 1)',
            subtitle_color: 'rgba(148, 163, 184, 1)',
            infobar_background_color: 'rgba(30, 41, 59, 1)',
            infobar_border_color: 'rgba(59, 130, 246, 0.3)',
            infobar_icon_color: 'rgba(96, 165, 250, 1)',
            infobar_label_color: 'rgba(148, 163, 184, 1)',
            infobar_value_color: 'rgba(226, 232, 240, 1)',
        }
    },

    green: {
        id: 'green',
        name: 'Green',
        colors: {
            card_background_color: 'rgba(20, 30, 20, 1)',
            card_border_color: 'rgba(34, 197, 94, 0.3)',
            card_text_color: 'rgba(240, 253, 244, 1)',
            primary_color: 'rgba(74, 222, 128, 1)',
            secondary_color: 'rgba(134, 239, 172, 0.8)',
            title_color: 'rgba(74, 222, 128, 1)',
            subtitle_color: 'rgba(187, 247, 208, 0.7)',
            infobar_background_color: 'rgba(22, 40, 25, 1)',
            infobar_border_color: 'rgba(34, 197, 94, 0.3)',
            infobar_icon_color: 'rgba(74, 222, 128, 1)',
            infobar_label_color: 'rgba(187, 247, 208, 0.7)',
            infobar_value_color: 'rgba(240, 253, 244, 1)',
        }
    },

    monochrome: {
        id: 'monochrome',
        name: 'Monochrome',
        colors: {
            card_background_color: 'rgba(30, 30, 30, 1)',
            card_border_color: 'rgba(128, 128, 128, 0.3)',
            card_text_color: 'rgba(220, 220, 220, 1)',
            primary_color: 'rgba(240, 240, 240, 1)',
            secondary_color: 'rgba(180, 180, 180, 1)',
            title_color: 'rgba(255, 255, 255, 1)',
            subtitle_color: 'rgba(160, 160, 160, 1)',
            infobar_background_color: 'rgba(40, 40, 40, 1)',
            infobar_border_color: 'rgba(128, 128, 128, 0.3)',
            infobar_icon_color: 'rgba(200, 200, 200, 1)',
            infobar_label_color: 'rgba(160, 160, 160, 1)',
            infobar_value_color: 'rgba(220, 220, 220, 1)',
        }
    },

    solarized: {
        id: 'solarized',
        name: 'Solarized Dark',
        colors: {
            card_background_color: 'rgba(0, 43, 54, 1)',
            card_border_color: 'rgba(88, 110, 117, 0.3)',
            card_text_color: 'rgba(131, 148, 150, 1)',
            primary_color: 'rgba(147, 161, 161, 1)',
            secondary_color: 'rgba(131, 148, 150, 0.8)',
            title_color: 'rgba(38, 139, 210, 1)',
            subtitle_color: 'rgba(101, 123, 131, 1)',
            infobar_background_color: 'rgba(7, 54, 66, 1)',
            infobar_border_color: 'rgba(88, 110, 117, 0.3)',
            infobar_icon_color: 'rgba(42, 161, 152, 1)',
            infobar_label_color: 'rgba(101, 123, 131, 1)',
            infobar_value_color: 'rgba(147, 161, 161, 1)',
        }
    },

    nord: {
        id: 'nord',
        name: 'Nord',
        colors: {
            card_background_color: 'rgba(46, 52, 64, 1)',
            card_border_color: 'rgba(136, 192, 208, 0.3)',
            card_text_color: 'rgba(236, 239, 244, 1)',
            primary_color: 'rgba(216, 222, 233, 1)',
            secondary_color: 'rgba(229, 233, 240, 0.8)',
            title_color: 'rgba(136, 192, 208, 1)',
            subtitle_color: 'rgba(216, 222, 233, 0.7)',
            infobar_background_color: 'rgba(59, 66, 82, 1)',
            infobar_border_color: 'rgba(136, 192, 208, 0.3)',
            infobar_icon_color: 'rgba(143, 188, 187, 1)',
            infobar_label_color: 'rgba(216, 222, 233, 0.7)',
            infobar_value_color: 'rgba(236, 239, 244, 1)',
        }
    },

    dracula: {
        id: 'dracula',
        name: 'Dracula',
        colors: {
            card_background_color: 'rgba(40, 42, 54, 1)',
            card_border_color: 'rgba(189, 147, 249, 0.3)',
            card_text_color: 'rgba(248, 248, 242, 1)',
            primary_color: 'rgba(139, 233, 253, 1)',
            secondary_color: 'rgba(248, 248, 242, 0.8)',
            title_color: 'rgba(189, 147, 249, 1)',
            subtitle_color: 'rgba(248, 248, 242, 0.7)',
            infobar_background_color: 'rgba(68, 71, 90, 1)',
            infobar_border_color: 'rgba(189, 147, 249, 0.3)',
            infobar_icon_color: 'rgba(255, 121, 198, 1)',
            infobar_label_color: 'rgba(248, 248, 242, 0.7)',
            infobar_value_color: 'rgba(248, 248, 242, 1)',
        }
    },

    catppuccin: {
        id: 'catppuccin',
        name: 'Catppuccin Mocha',
        colors: {
            card_background_color: 'rgba(30, 30, 46, 1)',
            card_border_color: 'rgba(137, 180, 250, 0.3)',
            card_text_color: 'rgba(205, 214, 244, 1)',
            primary_color: 'rgba(137, 180, 250, 1)',
            secondary_color: 'rgba(205, 214, 244, 0.8)',
            title_color: 'rgba(203, 166, 247, 1)',
            subtitle_color: 'rgba(186, 194, 222, 1)',
            infobar_background_color: 'rgba(49, 50, 68, 1)',
            infobar_border_color: 'rgba(137, 180, 250, 0.3)',
            infobar_icon_color: 'rgba(148, 226, 213, 1)',
            infobar_label_color: 'rgba(186, 194, 222, 1)',
            infobar_value_color: 'rgba(205, 214, 244, 1)',
        }
    },

    material: {
        id: 'material',
        name: 'Material Design',
        colors: {
            card_background_color: 'rgba(18, 18, 18, 1)',
            card_border_color: 'rgba(3, 218, 198, 0.3)',
            card_text_color: 'rgba(255, 255, 255, 0.87)',
            primary_color: 'rgba(3, 218, 198, 1)',
            secondary_color: 'rgba(255, 255, 255, 0.6)',
            title_color: 'rgba(3, 218, 198, 1)',
            subtitle_color: 'rgba(255, 255, 255, 0.6)',
            infobar_background_color: 'rgba(33, 33, 33, 1)',
            infobar_border_color: 'rgba(3, 218, 198, 0.3)',
            infobar_icon_color: 'rgba(3, 218, 198, 1)',
            infobar_label_color: 'rgba(255, 255, 255, 0.6)',
            infobar_value_color: 'rgba(255, 255, 255, 0.87)',
        }
    },

    minimalist: {
        id: 'minimalist',
        name: 'Minimalist',
        colors: {
            card_background_color: 'rgba(242, 242, 242, 1)',
            card_border_color: 'rgba(0, 0, 0, 0.1)',
            card_text_color: 'rgba(33, 33, 33, 1)',
            primary_color: 'rgba(33, 33, 33, 1)',
            secondary_color: 'rgba(117, 117, 117, 1)',
            title_color: 'rgba(33, 33, 33, 1)',
            subtitle_color: 'rgba(117, 117, 117, 1)',
            infobar_background_color: 'rgba(255, 255, 255, 1)',
            infobar_border_color: 'rgba(0, 0, 0, 0.1)',
            infobar_icon_color: 'rgba(66, 66, 66, 1)',
            infobar_label_color: 'rgba(117, 117, 117, 1)',
            infobar_value_color: 'rgba(33, 33, 33, 1)',
        }
    },

    slate: {
        id: 'slate',
        name: 'Slate',
        colors: {
            card_background_color: 'rgba(30, 41, 59, 1)',
            card_border_color: 'rgba(148, 163, 184, 0.3)',
            card_text_color: 'rgba(226, 232, 240, 1)',
            primary_color: 'rgba(100, 116, 139, 1)',
            secondary_color: 'rgba(148, 163, 184, 1)',
            title_color: 'rgba(148, 163, 184, 1)',
            subtitle_color: 'rgba(148, 163, 184, 0.8)',
            infobar_background_color: 'rgba(51, 65, 85, 1)',
            infobar_border_color: 'rgba(148, 163, 184, 0.3)',
            infobar_icon_color: 'rgba(148, 163, 184, 1)',
            infobar_label_color: 'rgba(148, 163, 184, 0.8)',
            infobar_value_color: 'rgba(226, 232, 240, 1)',
        }
    }
};

const customThemes: Record<string, Theme> = {};

export function registerTheme(theme: Theme): void {
    customThemes[theme.id] = theme;
}

export function getAllThemes(): Theme[] {
    return [
        ...Object.values(defaultThemes),
        ...Object.values(customThemes)
    ];
}

export function getTheme(themeId?: ThemeId): Theme | null {
    if (!themeId) return null;

    if (defaultThemes[themeId]) {
        return defaultThemes[themeId];
    }

    if (customThemes[themeId]) {
        return customThemes[themeId];
    }

    return null;
}

export function applyThemeToConfig(config: any, themeId?: ThemeId): any {
    const theme = getTheme(themeId);
    if (!theme) return config;

    return {
        ...config,
        style: {
            card_background_color: theme.colors.card_background_color,
            card_border_color: theme.colors.card_border_color,
            card_text_color: theme.colors.card_text_color,
            primary_color: theme.colors.primary_color,
            secondary_color: theme.colors.secondary_color,
            title_color: theme.colors.title_color,
            subtitle_color: theme.colors.subtitle_color,

            ...config.style,
        },
        info_bar: {
            ...config.info_bar,
            style: {
                background_color: theme.colors.infobar_background_color,
                border_color: theme.colors.infobar_border_color,
                icon_color: theme.colors.infobar_icon_color,
                label_color: theme.colors.infobar_label_color,
                value_color: theme.colors.infobar_value_color,

                ...config.info_bar?.style,
            }
        }
    };
}

export function getThemeDisplayName(themeId: ThemeId): string {
    const theme = getTheme(themeId);
    return theme ? theme.name : themeId;
}

export const themeNames: Record<string, string> = {
    dark: 'Dark',
    light: 'Light',
    blue: 'Blue',
    green: 'Green',
    monochrome: 'Monochrome',
    solarized: "Solarized",
    nord: "Nord",
    dracula: "Dracula",
    catppuccin: "Catppuccin",
    material: "Material",
    minimalist: "Minimalist",
    slate: "Slate"
};