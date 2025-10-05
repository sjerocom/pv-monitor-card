// Theme System for PV Monitor Card
// Supports predefined themes and custom theme files

export type ThemeId = 'dark' | 'light' | 'blue' | 'green' | 'monochrome' | string;

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