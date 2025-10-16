export type ThemeId = 'dark' | 'light' | 'blue' | 'green' | 'monochrome' | 'solarized' | 'nord' | 'dracula' | 'catppuccin' | 'material' | 'minimalist' | 'slate' | 'sunset' | 'ocean' | 'purple' | 'matrix' | 'bobs_burgers' | 'simpsons' | 'family_guy' | 'hal9000' | 'terminator' | 'dr_who' | 'rick_morty' | 'frankenstein' | 'mr_robot' | 'breaking_bad' | 'squid_game' | string;

export interface ThemeColors {
    card_background_color: string;
    card_border_color: string;
    card_text_color: string;
    primary_color: string;
    secondary_color: string;
    title_color: string;
    subtitle_color: string;
    header_background_color: string;
    header_border_color: string;
    infobar_background_color: string;
    infobar_border_color: string;
    infobar_icon_color: string;
    infobar_label_color: string;
    infobar_value_color: string;
    consumer_background_color: string;
    consumer_border_color: string;
    consumer_primary_color: string;
    consumer_secondary_color: string;
}

export interface Theme {
    id: ThemeId;
    name: string;
    colors: ThemeColors;
}

export interface ThemeListItem {
    id: string;
    name: string;
}
