// Theme System for PV Monitor Card
// Supports predefined themes and custom theme files

export type ThemeId = 'dark' | 'light' | 'blue' | 'green' | 'monochrome' | 'solarized' | 'nord' | 'dracula' | 'catppuccin' | 'material' | 'minimalist' | 'slate' | string;

export interface Theme {
    id: ThemeId;
    name: string;
    colors: {
        // Card styling
        card_background_color: string;
        card_border_color: string;
        card_text_color: string;

        // Primary/Secondary colors (for values)
        primary_color: string;
        secondary_color: string;

        // Title & Subtitle
        title_color: string;
        subtitle_color: string;

        // Info Bar
        infobar_background_color: string;
        infobar_border_color: string;
        infobar_icon_color: string;
        infobar_label_color: string;
        infobar_value_color: string;
    };
}

// Predefined themes
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
            card_background_color: 'rgba(0, 43, 54, 1)',           // base03
            card_border_color: 'rgba(88, 110, 117, 0.3)',          // base01
            card_text_color: 'rgba(131, 148, 150, 1)',             // base0
            primary_color: 'rgba(147, 161, 161, 1)',               // base1
            secondary_color: 'rgba(131, 148, 150, 0.8)',           // base0
            title_color: 'rgba(38, 139, 210, 1)',                  // blue
            subtitle_color: 'rgba(101, 123, 131, 1)',              // base00
            infobar_background_color: 'rgba(7, 54, 66, 1)',        // base02
            infobar_border_color: 'rgba(88, 110, 117, 0.3)',       // base01
            infobar_icon_color: 'rgba(42, 161, 152, 1)',           // cyan
            infobar_label_color: 'rgba(101, 123, 131, 1)',         // base00
            infobar_value_color: 'rgba(147, 161, 161, 1)',         // base1
        }
    },

    nord: {
        id: 'nord',
        name: 'Nord',
        colors: {
            card_background_color: 'rgba(46, 52, 64, 1)',          // nord0
            card_border_color: 'rgba(136, 192, 208, 0.3)',         // nord8
            card_text_color: 'rgba(236, 239, 244, 1)',             // nord6
            primary_color: 'rgba(216, 222, 233, 1)',               // nord5
            secondary_color: 'rgba(229, 233, 240, 0.8)',           // nord4
            title_color: 'rgba(136, 192, 208, 1)',                 // nord8
            subtitle_color: 'rgba(216, 222, 233, 0.7)',            // nord5
            infobar_background_color: 'rgba(59, 66, 82, 1)',       // nord1
            infobar_border_color: 'rgba(136, 192, 208, 0.3)',      // nord8
            infobar_icon_color: 'rgba(143, 188, 187, 1)',          // nord7
            infobar_label_color: 'rgba(216, 222, 233, 0.7)',       // nord5
            infobar_value_color: 'rgba(236, 239, 244, 1)',         // nord6
        }
    },

    dracula: {
        id: 'dracula',
        name: 'Dracula',
        colors: {
            card_background_color: 'rgba(40, 42, 54, 1)',          // background
            card_border_color: 'rgba(189, 147, 249, 0.3)',         // purple
            card_text_color: 'rgba(248, 248, 242, 1)',             // foreground
            primary_color: 'rgba(139, 233, 253, 1)',               // cyan
            secondary_color: 'rgba(248, 248, 242, 0.8)',           // foreground
            title_color: 'rgba(189, 147, 249, 1)',                 // purple
            subtitle_color: 'rgba(248, 248, 242, 0.7)',            // foreground
            infobar_background_color: 'rgba(68, 71, 90, 1)',       // current line
            infobar_border_color: 'rgba(189, 147, 249, 0.3)',      // purple
            infobar_icon_color: 'rgba(255, 121, 198, 1)',          // pink
            infobar_label_color: 'rgba(248, 248, 242, 0.7)',       // foreground
            infobar_value_color: 'rgba(248, 248, 242, 1)',         // foreground
        }
    },

    catppuccin: {
        id: 'catppuccin',
        name: 'Catppuccin Mocha',
        colors: {
            card_background_color: 'rgba(30, 30, 46, 1)',          // base
            card_border_color: 'rgba(137, 180, 250, 0.3)',         // blue
            card_text_color: 'rgba(205, 214, 244, 1)',             // text
            primary_color: 'rgba(137, 180, 250, 1)',               // blue
            secondary_color: 'rgba(205, 214, 244, 0.8)',           // text
            title_color: 'rgba(203, 166, 247, 1)',                 // mauve
            subtitle_color: 'rgba(186, 194, 222, 1)',              // subtext0
            infobar_background_color: 'rgba(49, 50, 68, 1)',       // surface0
            infobar_border_color: 'rgba(137, 180, 250, 0.3)',      // blue
            infobar_icon_color: 'rgba(148, 226, 213, 1)',          // teal
            infobar_label_color: 'rgba(186, 194, 222, 1)',         // subtext0
            infobar_value_color: 'rgba(205, 214, 244, 1)',         // text
        }
    },

    material: {
        id: 'material',
        name: 'Material Design',
        colors: {
            card_background_color: 'rgba(18, 18, 18, 1)',          // Material dark background
            card_border_color: 'rgba(3, 218, 198, 0.3)',           // teal accent
            card_text_color: 'rgba(255, 255, 255, 0.87)',          // high emphasis text
            primary_color: 'rgba(3, 218, 198, 1)',                 // teal accent
            secondary_color: 'rgba(255, 255, 255, 0.6)',           // medium emphasis
            title_color: 'rgba(3, 218, 198, 1)',                   // teal accent
            subtitle_color: 'rgba(255, 255, 255, 0.6)',            // medium emphasis
            infobar_background_color: 'rgba(33, 33, 33, 1)',       // elevated surface
            infobar_border_color: 'rgba(3, 218, 198, 0.3)',        // teal accent
            infobar_icon_color: 'rgba(3, 218, 198, 1)',            // teal accent
            infobar_label_color: 'rgba(255, 255, 255, 0.6)',       // medium emphasis
            infobar_value_color: 'rgba(255, 255, 255, 0.87)',      // high emphasis
        }
    },

    minimalist: {
        id: 'minimalist',
        name: 'Minimalist',
        colors: {
            card_background_color: 'rgba(242, 242, 242, 1)',       // light gray background
            card_border_color: 'rgba(0, 0, 0, 0.1)',               // subtle border
            card_text_color: 'rgba(33, 33, 33, 1)',                // almost black text
            primary_color: 'rgba(33, 33, 33, 1)',                  // black
            secondary_color: 'rgba(117, 117, 117, 1)',             // gray
            title_color: 'rgba(33, 33, 33, 1)',                    // black
            subtitle_color: 'rgba(117, 117, 117, 1)',              // gray
            infobar_background_color: 'rgba(255, 255, 255, 1)',    // white
            infobar_border_color: 'rgba(0, 0, 0, 0.1)',            // subtle border
            infobar_icon_color: 'rgba(66, 66, 66, 1)',             // dark gray
            infobar_label_color: 'rgba(117, 117, 117, 1)',         // gray
            infobar_value_color: 'rgba(33, 33, 33, 1)',            // black
        }
    },

    slate: {
        id: 'slate',
        name: 'Slate',
        colors: {
            card_background_color: 'rgba(30, 41, 59, 1)',          // slate-800
            card_border_color: 'rgba(148, 163, 184, 0.3)',         // slate-400
            card_text_color: 'rgba(226, 232, 240, 1)',             // slate-200
            primary_color: 'rgba(100, 116, 139, 1)',               // slate-500
            secondary_color: 'rgba(148, 163, 184, 1)',             // slate-400
            title_color: 'rgba(148, 163, 184, 1)',                 // slate-400
            subtitle_color: 'rgba(148, 163, 184, 0.8)',            // slate-400
            infobar_background_color: 'rgba(51, 65, 85, 1)',       // slate-700
            infobar_border_color: 'rgba(148, 163, 184, 0.3)',      // slate-400
            infobar_icon_color: 'rgba(148, 163, 184, 1)',          // slate-400
            infobar_label_color: 'rgba(148, 163, 184, 0.8)',       // slate-400
            infobar_value_color: 'rgba(226, 232, 240, 1)',         // slate-200
        }
    }
};

// Custom themes registry
const customThemes: Record<string, Theme> = {};

/**
 * Register a custom theme
 * This allows users to add their own themes programmatically or via separate files
 *
 * @example
 * // In a separate file: pv-monitor-card-theme-custom.ts
 * import { registerTheme } from './pv-monitor-card-themes';
 *
 * registerTheme({
 *   id: 'sunset',
 *   name: 'Sunset',
 *   colors: {
 *     card_background_color: 'rgba(30, 20, 40, 1)',
 *     // ... other colors
 *   }
 * });
 */
export function registerTheme(theme: Theme): void {
    customThemes[theme.id] = theme;
}

/**
 * Get all available themes (default + custom)
 */
export function getAllThemes(): Theme[] {
    return [
        ...Object.values(defaultThemes),
        ...Object.values(customThemes)
    ];
}

/**
 * Get a specific theme by ID
 */
export function getTheme(themeId?: ThemeId): Theme | null {
    if (!themeId) return null;

    // Check default themes first
    if (defaultThemes[themeId]) {
        return defaultThemes[themeId];
    }

    // Check custom themes
    if (customThemes[themeId]) {
        return customThemes[themeId];
    }

    return null;
}

/**
 * Apply theme colors to config
 * This merges theme colors with existing config, allowing manual overrides
 */
export function applyThemeToConfig(config: any, themeId?: ThemeId): any {
    const theme = getTheme(themeId);
    if (!theme) return config;

    return {
        ...config,
        style: {
            // Apply theme colors
            card_background_color: theme.colors.card_background_color,
            card_border_color: theme.colors.card_border_color,
            card_text_color: theme.colors.card_text_color,
            primary_color: theme.colors.primary_color,
            secondary_color: theme.colors.secondary_color,
            title_color: theme.colors.title_color,
            subtitle_color: theme.colors.subtitle_color,

            // Preserve any manual overrides from existing config
            ...config.style,
        },
        info_bar: {
            ...config.info_bar,
            style: {
                // Apply theme colors
                background_color: theme.colors.infobar_background_color,
                border_color: theme.colors.infobar_border_color,
                icon_color: theme.colors.infobar_icon_color,
                label_color: theme.colors.infobar_label_color,
                value_color: theme.colors.infobar_value_color,

                // Preserve any manual overrides
                ...config.info_bar?.style,
            }
        }
    };
}

/**
 * Get theme display name for a given language
 * Currently themes use English names, but you could expand this for i18n
 */
export function getThemeDisplayName(themeId: ThemeId): string {
    const theme = getTheme(themeId);
    return theme ? theme.name : themeId;
}

// Export theme names for dropdown/selector
export const themeNames: Record<string, string> = {
    dark: 'Dark',
    light: 'Light',
    blue: 'Blue',
    green: 'Green',
    monochrome: 'Monochrome'
};