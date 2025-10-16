export type ThemeId =
// Basis-Themes
    | 'dark'
    | 'light'

    // Farb- und Stil-Themes
    | 'blue'
    | 'brown'
    | 'catppuccin'
    | 'cyan'
    | 'dracula'
    | 'gold'
    | 'green'
    | 'indigo'
    | 'lime'
    | 'magenta'
    | 'material'
    | 'minimalist'
    | 'monochrome'
    | 'nord'
    | 'ocean'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'silver'
    | 'slate'
    | 'solarized'
    | 'sunset'
    | 'turkis'
    | 'yellow'

    // Film-Themes
    | 'avatar'
    | 'batman'
    | 'blade_runner'
    | 'dune'
    | 'frozen'
    | 'ghostbusters'
    | 'guardians'
    | 'inception'
    | 'jurassic_park'
    | 'lotr'
    | 'mad_max'
    | 'matrix'
    | 'pirates'
    | 'star_trek'
    | 'star_wars'
    | 'tron'
    | 'terminator'

    // Serien-Themes
    | 'bobs_burgers'
    | 'breaking_bad'
    | 'dr_who'
    | 'family_guy'
    | 'frankenstein'
    | 'game_of_thrones'
    | 'hal9000'
    | 'mr_robot'
    | 'rick_morty'
    | 'simpsons'
    | 'spiderverse'
    | 'stranger_things'
    | 'the_expanse'
    | 'the_office'
    | 'x_files'

    | string;


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
