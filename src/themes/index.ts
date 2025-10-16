import { Theme, ThemeId, ThemeListItem } from './themes';
import { PVMonitorCardConfig } from '../types/';

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
        // Basis-Themes
        { id: 'dark', name: 'Dark' },
        { id: 'light', name: 'Light' },

        // Farb- und Stil-Themes
        { id: 'blue', name: 'Blue' },
        { id: 'brown', name: 'Brown' },
        { id: 'catppuccin', name: 'Catppuccin' },
        { id: 'cyan', name: 'Cyan' },
        { id: 'dracula', name: 'Dracula' },
        { id: 'gold', name: 'Gold' },
        { id: 'green', name: 'Green' },
        { id: 'indigo', name: 'Indigo' },
        { id: 'lime', name: 'Lime' },
        { id: 'magenta', name: 'Magenta' },
        { id: 'material', name: 'Material' },
        { id: 'minimalist', name: 'Minimalist' },
        { id: 'monochrome', name: 'Monochrome' },
        { id: 'nord', name: 'Nord' },
        { id: 'ocean', name: 'Ocean' },
        { id: 'orange', name: 'Orange' },
        { id: 'pink', name: 'Pink' },
        { id: 'purple', name: 'Purple' },
        { id: 'red', name: 'Red' },
        { id: 'silver', name: 'Silver' },
        { id: 'slate', name: 'Slate' },
        { id: 'solarized', name: 'Solarized' },
        { id: 'sunset', name: 'Sunset' },
        { id: 'turkis', name: 'Turkis' },
        { id: 'yellow', name: 'Yellow' },

        // Film-Themes
        { id: 'avatar', name: 'Avatar' },
        { id: 'batman', name: 'Batman' },
        { id: 'blade_runner', name: 'Blade Runner' },
        { id: 'dune', name: 'Dune' },
        { id: 'frozen', name: 'Frozen' },
        { id: 'ghostbusters', name: 'Ghostbusters' },
        { id: 'guardians', name: 'Guardians of the Galaxy' },
        { id: 'inception', name: 'Inception' },
        { id: 'jurassic_park', name: 'Jurassic Park' },
        { id: 'lotr', name: 'Lord of the Rings' },
        { id: 'mad_max', name: 'Mad Max' },
        { id: 'matrix', name: 'Matrix' },
        { id: 'pirates', name: 'Pirates of the Caribbean' },
        { id: 'star_trek', name: 'Star Trek' },
        { id: 'star_wars', name: 'Star Wars' },
        { id: 'tron', name: 'Tron' },
        { id: 'terminator', name: 'Terminator' },

        // Serien-Themes
        { id: 'bobs_burgers', name: "Bob's Burgers" },
        { id: 'breaking_bad', name: 'Breaking Bad' },
        { id: 'dr_who', name: 'Doctor Who' },
        { id: 'family_guy', name: 'Family Guy' },
        { id: 'frankenstein', name: 'Frankenstein' },
        { id: 'game_of_thrones', name: 'Game of Thrones' },
        { id: 'hal9000', name: 'HAL 9000' },
        { id: 'mr_robot', name: 'Mr. Robot' },
        { id: 'rick_morty', name: 'Rick & Morty' },
        { id: 'simpsons', name: 'The Simpsons' },
        { id: 'spiderverse', name: 'Spider-Verse' },
        { id: 'stranger_things', name: 'Stranger Things' },
        { id: 'the_expanse', name: 'The Expanse' },
        { id: 'the_office', name: 'The Office' },
        { id: 'x_files', name: 'The X-Files' }
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
