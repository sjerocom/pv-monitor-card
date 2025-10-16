import { Theme, ThemeId, ThemeListItem } from './themes';
import { PVMonitorCardConfig } from '../pv-monitor-card-types';

const themeCache = new Map<string, Theme>();
const customThemes = new Map<string, Theme>();

async function loadThemeFromFile(themeId: string): Promise<Theme | null> {
    if (themeCache.has(themeId)) {
        return themeCache.get(themeId)!;
    }

    try {
        const module = await import(`./data/${themeId}.json`);
        const theme = module.default || module;
        themeCache.set(themeId, theme);
        return theme;
    } catch (error) {
        console.warn(`Failed to load theme ${themeId}:`, error);
        return null;
    }
}

export function registerTheme(theme: Theme): void {
    customThemes.set(theme.id, theme);
}

export function getAllThemes(): ThemeListItem[] {
    const builtInThemes: ThemeListItem[] = [
        { id: 'dark', name: 'Dark' },
        { id: 'light', name: 'Light' },
        { id: 'blue', name: 'Blue' },
        { id: 'green', name: 'Green' },
        { id: 'monochrome', name: 'Monochrome' },
        { id: 'solarized', name: 'Solarized' },
        { id: 'nord', name: 'Nord' },
        { id: 'dracula', name: 'Dracula' },
        { id: 'catppuccin', name: 'Catppuccin' },
        { id: 'material', name: 'Material' },
        { id: 'minimalist', name: 'Minimalist' },
        { id: 'slate', name: 'Slate' },
        { id: 'sunset', name: 'Sunset' },
        { id: 'ocean', name: 'Ocean' },
        { id: 'purple', name: 'Purple' },
        { id: 'matrix', name: 'Matrix' },
        { id: 'bobs_burgers', name: "Bob's Burgers" },
        { id: 'simpsons', name: 'The Simpsons' },
        { id: 'family_guy', name: 'Family Guy' },
        { id: 'hal9000', name: 'HAL 9000' },
        { id: 'terminator', name: 'Terminator' },
        { id: 'dr_who', name: 'Doctor Who' },
        { id: 'rick_morty', name: 'Rick & Morty' },
        { id: 'frankenstein', name: 'Frankenstein' },
        { id: 'mr_robot', name: 'Mr. Robot' },
        { id: 'breaking_bad', name: 'Breaking Bad' },
        { id: 'squid_game', name: 'Squid Game' }
    ];

    const customThemesList = Array.from(customThemes.values()).map(theme => ({
        id: theme.id,
        name: theme.name
    }));

    return [...builtInThemes, ...customThemesList];
}

export async function getTheme(themeId?: ThemeId): Promise<Theme | null> {
    if (!themeId) return null;

    if (customThemes.has(themeId)) {
        return customThemes.get(themeId)!;
    }

    return await loadThemeFromFile(themeId);
}

export function getThemeSync(themeId?: ThemeId): Theme | null {
    if (!themeId) return null;

    if (customThemes.has(themeId)) {
        return customThemes.get(themeId)!;
    }

    if (themeCache.has(themeId)) {
        return themeCache.get(themeId)!;
    }

    // Trigger async load for next time
    loadThemeFromFile(themeId);
    return null;
}

function applyThemeColors(config: PVMonitorCardConfig, theme: Theme): PVMonitorCardConfig {
    return {
        ...config,
        style: {
            ...config.style,
            card_background_color: theme.colors.card_background_color,
            card_border_color: theme.colors.card_border_color,
            card_text_color: theme.colors.card_text_color,
            primary_color: theme.colors.primary_color,
            secondary_color: theme.colors.secondary_color,
            title_color: theme.colors.title_color,
            subtitle_color: theme.colors.subtitle_color,
            header_icon_color: theme.colors.title_color,
            header_background_color: theme.colors.header_background_color,
            header_border_color: theme.colors.header_border_color,
        },
        info_bar: {
            ...config.info_bar,
            style: {
                ...config.info_bar?.style,
                background_color: theme.colors.infobar_background_color,
                border_color: theme.colors.infobar_border_color,
                icon_color: theme.colors.infobar_icon_color,
                label_color: theme.colors.infobar_label_color,
                value_color: theme.colors.infobar_value_color,
            }
        },
        consumers: {
            ...config.consumers,
            style: {
                ...config.consumers?.style,
                item_background_color: theme.colors.consumer_background_color,
                item_border_color: theme.colors.consumer_border_color,
            }
        }
    };
}

export async function applyThemeToConfig(config: PVMonitorCardConfig, themeId?: ThemeId): Promise<PVMonitorCardConfig> {
    const theme = await getTheme(themeId);
    if (!theme) return config;
    return applyThemeColors(config, theme);
}

export function applyThemeToConfigSync(config: PVMonitorCardConfig, themeId?: ThemeId): PVMonitorCardConfig {
    if (!themeId) return config;

    const theme = getThemeSync(themeId);
    if (!theme) {
        console.warn(`Theme ${themeId} not loaded yet, loading async...`);
        return config;
    }

    return applyThemeColors(config, theme);
}

export function getThemeDisplayName(themeId: ThemeId): string {
    const theme = themeCache.get(themeId) || customThemes.get(themeId);
    return theme ? theme.name : themeNames[themeId] || themeId;
}

export const themeNames: Record<string, string> = {
    dark: 'Dark',
    light: 'Light',
    solarized: "Solarized",
    monochrome: 'Monochrome',
    purple: "Purple",
    blue: 'Blue',
    green: 'Green',
    sunset: "Sunset",
    nord: "Nord",
    dracula: "Dracula",
    catppuccin: "Catppuccin",
    material: "Material",
    minimalist: "Minimalist",
    slate: "Slate",
    ocean: "Ocean",
    matrix: "Matrix",
    bobs_burgers: "Bob's Burgers",
    simpsons: "The Simpsons",
    family_guy: "Family Guy",
    hal9000: "HAL 9000",
    terminator: "Terminator",
    dr_who: "Doctor Who",
    rick_morty: "Rick & Morty",
    frankenstein: "Frankenstein",
    mr_robot: "Mr. Robot",
    breaking_bad: "Breaking Bad",
    squid_game: "Squid Game"
};
