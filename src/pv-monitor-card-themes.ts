// Theme System for PV Monitor Card
// Supports predefined themes and custom theme files

export type ThemeId = 'dark' | 'light' | 'blue' | 'green' | 'monochrome' | 'solarized' | 'nord' | 'dracula' | 'catppuccin' | 'material' | 'minimalist' | 'slate' | 'sunset' | 'ocean' | 'purple' | 'matrix' | 'bobs_burgers' | 'simpsons' | 'family_guy' | 'hal9000' | 'terminator' | 'dr_who' | 'rick_morty' | 'frankenstein' | 'mr_robot' | 'breaking_bad' | 'squid_game' | string;

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

        consumer_background_color: string;
        consumer_border_color: string;
        consumer_primary_color: string;
        consumer_secondary_color: string;
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
            consumer_background_color: 'rgba(21, 20, 27, 1)',
            consumer_border_color: 'rgba(255, 255, 255, 0.1)',
            consumer_primary_color: 'white',
            consumer_secondary_color: 'rgba(255, 255, 255, 0.7)',
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
            consumer_background_color: 'rgba(250, 250, 250, 1)',
            consumer_border_color: 'rgba(0, 0, 0, 0.1)',
            consumer_primary_color: 'rgba(0, 0, 0, 0.87)',
            consumer_secondary_color: 'rgba(0, 0, 0, 0.6)',
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
            consumer_background_color: 'rgba(30, 41, 59, 1)',
            consumer_border_color: 'rgba(59, 130, 246, 0.3)',
            consumer_primary_color: 'rgba(96, 165, 250, 1)',
            consumer_secondary_color: 'rgba(148, 163, 184, 1)',
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
            consumer_background_color: 'rgba(22, 40, 25, 1)',
            consumer_border_color: 'rgba(34, 197, 94, 0.3)',
            consumer_primary_color: 'rgba(74, 222, 128, 1)',
            consumer_secondary_color: 'rgba(187, 247, 208, 0.7)',
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
            consumer_background_color: 'rgba(40, 40, 40, 1)',
            consumer_border_color: 'rgba(128, 128, 128, 0.3)',
            consumer_primary_color: 'rgba(240, 240, 240, 1)',
            consumer_secondary_color: 'rgba(180, 180, 180, 1)',
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
            consumer_background_color: 'rgba(7, 54, 66, 1)',
            consumer_border_color: 'rgba(88, 110, 117, 0.3)',
            consumer_primary_color: 'rgba(147, 161, 161, 1)',
            consumer_secondary_color: 'rgba(101, 123, 131, 1)',
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
            consumer_background_color: 'rgba(59, 66, 82, 1)',
            consumer_border_color: 'rgba(136, 192, 208, 0.3)',
            consumer_primary_color: 'rgba(216, 222, 233, 1)',
            consumer_secondary_color: 'rgba(216, 222, 233, 0.7)',
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
            consumer_background_color: 'rgba(68, 71, 90, 1)',
            consumer_border_color: 'rgba(189, 147, 249, 0.3)',
            consumer_primary_color: 'rgba(139, 233, 253, 1)',
            consumer_secondary_color: 'rgba(248, 248, 242, 0.7)',
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
            consumer_background_color: 'rgba(49, 50, 68, 1)',
            consumer_border_color: 'rgba(137, 180, 250, 0.3)',
            consumer_primary_color: 'rgba(137, 180, 250, 1)',
            consumer_secondary_color: 'rgba(186, 194, 222, 1)',
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
            consumer_background_color: 'rgba(33, 33, 33, 1)',
            consumer_border_color: 'rgba(3, 218, 198, 0.3)',
            consumer_primary_color: 'rgba(3, 218, 198, 1)',
            consumer_secondary_color: 'rgba(255, 255, 255, 0.6)',
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
            consumer_background_color: 'rgba(255, 255, 255, 1)',
            consumer_border_color: 'rgba(0, 0, 0, 0.1)',
            consumer_primary_color: 'rgba(33, 33, 33, 1)',
            consumer_secondary_color: 'rgba(117, 117, 117, 1)',
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
            consumer_background_color: 'rgba(51, 65, 85, 1)',
            consumer_border_color: 'rgba(148, 163, 184, 0.3)',
            consumer_primary_color: 'rgba(148, 163, 184, 1)',
            consumer_secondary_color: 'rgba(148, 163, 184, 0.8)',
        }
    },

    sunset: {
        id: 'sunset',
        name: 'Sunset',
        colors: {
            card_background_color: 'rgba(30, 20, 40, 1)',
            card_border_color: 'rgba(255, 120, 80, 0.3)',
            card_text_color: 'rgba(255, 230, 200, 1)',
            primary_color: 'rgba(255, 170, 100, 1)',
            secondary_color: 'rgba(255, 200, 150, 0.8)',
            title_color: 'rgba(255, 140, 80, 1)',
            subtitle_color: 'rgba(255, 180, 120, 0.7)',
            infobar_background_color: 'rgba(40, 30, 50, 1)',
            infobar_border_color: 'rgba(255, 120, 80, 0.3)',
            infobar_icon_color: 'rgba(255, 170, 100, 1)',
            infobar_label_color: 'rgba(255, 180, 120, 0.7)',
            infobar_value_color: 'rgba(255, 230, 200, 1)',
            consumer_background_color: 'rgba(40, 30, 50, 1)',
            consumer_border_color: 'rgba(255, 120, 80, 0.3)',
            consumer_primary_color: 'rgba(255, 170, 100, 1)',
            consumer_secondary_color: 'rgba(255, 180, 120, 0.7)',
        }
    },

    ocean: {
        id: 'ocean',
        name: 'Ocean',
        colors: {
            card_background_color: 'rgba(10, 25, 47, 1)',
            card_border_color: 'rgba(0, 180, 216, 0.3)',
            card_text_color: 'rgba(224, 242, 254, 1)',
            primary_color: 'rgba(56, 189, 248, 1)',
            secondary_color: 'rgba(125, 211, 252, 0.8)',
            title_color: 'rgba(14, 165, 233, 1)',
            subtitle_color: 'rgba(125, 211, 252, 0.7)',
            infobar_background_color: 'rgba(15, 35, 60, 1)',
            infobar_border_color: 'rgba(0, 180, 216, 0.3)',
            infobar_icon_color: 'rgba(56, 189, 248, 1)',
            infobar_label_color: 'rgba(125, 211, 252, 0.7)',
            infobar_value_color: 'rgba(224, 242, 254, 1)',
            consumer_background_color: 'rgba(15, 35, 60, 1)',
            consumer_border_color: 'rgba(0, 180, 216, 0.3)',
            consumer_primary_color: 'rgba(56, 189, 248, 1)',
            consumer_secondary_color: 'rgba(125, 211, 252, 0.7)',
        }
    },

    purple: {
        id: 'purple',
        name: 'Purple',
        colors: {
            card_background_color: 'rgba(24, 24, 40, 1)',
            card_border_color: 'rgba(168, 85, 247, 0.3)',
            card_text_color: 'rgba(250, 245, 255, 1)',
            primary_color: 'rgba(192, 132, 252, 1)',
            secondary_color: 'rgba(216, 180, 254, 0.8)',
            title_color: 'rgba(168, 85, 247, 1)',
            subtitle_color: 'rgba(216, 180, 254, 0.7)',
            infobar_background_color: 'rgba(30, 30, 50, 1)',
            infobar_border_color: 'rgba(168, 85, 247, 0.3)',
            infobar_icon_color: 'rgba(192, 132, 252, 1)',
            infobar_label_color: 'rgba(216, 180, 254, 0.7)',
            infobar_value_color: 'rgba(250, 245, 255, 1)',
            consumer_background_color: 'rgba(30, 30, 50, 1)',
            consumer_border_color: 'rgba(168, 85, 247, 0.3)',
            consumer_primary_color: 'rgba(192, 132, 252, 1)',
            consumer_secondary_color: 'rgba(216, 180, 254, 0.7)',
        }
    },

    matrix: {
        id: 'matrix',
        name: 'Matrix',
        colors: {
            card_background_color: 'rgba(0, 0, 0, 1)',
            card_border_color: 'rgba(0, 255, 65, 0.3)',
            card_text_color: 'rgba(0, 255, 65, 1)',
            primary_color: 'rgba(0, 255, 65, 1)',
            secondary_color: 'rgba(0, 200, 50, 0.8)',
            title_color: 'rgba(0, 255, 65, 1)',
            subtitle_color: 'rgba(0, 200, 50, 0.7)',
            infobar_background_color: 'rgba(0, 10, 0, 1)',
            infobar_border_color: 'rgba(0, 255, 65, 0.3)',
            infobar_icon_color: 'rgba(0, 255, 65, 1)',
            infobar_label_color: 'rgba(0, 200, 50, 0.7)',
            infobar_value_color: 'rgba(0, 255, 65, 1)',
            consumer_background_color: 'rgba(0, 10, 0, 1)',
            consumer_border_color: 'rgba(0, 255, 65, 0.3)',
            consumer_primary_color: 'rgba(0, 255, 65, 1)',
            consumer_secondary_color: 'rgba(0, 200, 50, 0.7)',
        }
    },

    bobs_burgers: {
        id: 'bobs_burgers',
        name: 'Bob\'s Burgers',
        colors: {
            card_background_color: 'rgba(235, 231, 213, 1)',
            card_border_color: 'rgba(206, 48, 45, 0.4)',
            card_text_color: 'rgba(42, 54, 59, 1)',
            primary_color: 'rgba(206, 48, 45, 1)',
            secondary_color: 'rgba(42, 54, 59, 0.8)',
            title_color: 'rgba(206, 48, 45, 1)',
            subtitle_color: 'rgba(249, 176, 58, 1)',
            infobar_background_color: 'rgba(249, 241, 230, 1)',
            infobar_border_color: 'rgba(206, 48, 45, 0.3)',
            infobar_icon_color: 'rgba(206, 48, 45, 1)',
            infobar_label_color: 'rgba(42, 54, 59, 0.7)',
            infobar_value_color: 'rgba(42, 54, 59, 1)',
            consumer_background_color: 'rgba(249, 241, 230, 1)',
            consumer_border_color: 'rgba(206, 48, 45, 0.3)',
            consumer_primary_color: 'rgba(206, 48, 45, 1)',
            consumer_secondary_color: 'rgba(42, 54, 59, 0.7)',
        }
    },

    simpsons: {
        id: 'simpsons',
        name: 'The Simpsons',
        colors: {
            card_background_color: '#FFD90F',
            card_border_color: '#FED41D',
            card_text_color: '#1A1A1A',
            primary_color: '#00A8E1',
            secondary_color: '#FF6B35',
            title_color: '#1A1A1A',
            subtitle_color: '#4A4A4A',
            infobar_background_color: '#FED41D',
            infobar_border_color: '#FFB300',
            infobar_icon_color: '#00A8E1',
            infobar_label_color: '#1A1A1A',
            infobar_value_color: '#4A4A4A',
            consumer_background_color: '#FFE55C',
            consumer_border_color: '#FFB300',
            consumer_primary_color: '#00A8E1',
            consumer_secondary_color: '#FF6B35'
        }
    },

    family_guy: {
        id: 'family_guy',
        name: 'Family Guy',
        colors: {
            card_background_color: '#FFFFFF',
            card_border_color: '#1E3A8A',
            card_text_color: '#1A1A1A',
            primary_color: '#DC2626',
            secondary_color: '#FBBF24',
            title_color: '#1E3A8A',
            subtitle_color: '#4A5568',
            infobar_background_color: '#F0F4FF',
            infobar_border_color: '#1E3A8A',
            infobar_icon_color: '#DC2626',
            infobar_label_color: '#1E3A8A',
            infobar_value_color: '#4A5568',
            consumer_background_color: '#E0E7FF',
            consumer_border_color: '#1E3A8A',
            consumer_primary_color: '#DC2626',
            consumer_secondary_color: '#FBBF24'
        }
    },

    hal9000: {
        id: 'hal9000',
        name: 'HAL 9000',
        colors: {
            card_background_color: '#0A0A0A',
            card_border_color: '#CC0000',
            card_text_color: '#E0E0E0',
            primary_color: '#FF0000',
            secondary_color: '#CC0000',
            title_color: '#FF0000',
            subtitle_color: '#CC0000',
            infobar_background_color: '#1A1A1A',
            infobar_border_color: '#CC0000',
            infobar_icon_color: '#FF0000',
            infobar_label_color: '#E0E0E0',
            infobar_value_color: '#CC0000',
            consumer_background_color: '#0F0F0F',
            consumer_border_color: '#990000',
            consumer_primary_color: '#FF0000',
            consumer_secondary_color: '#CC0000'
        }
    },

    terminator: {
        id: 'terminator',
        name: 'Terminator',
        colors: {
            card_background_color: '#1A1A1A',
            card_border_color: '#B91C1C',
            card_text_color: '#E0E0E0',
            primary_color: '#DC2626',
            secondary_color: '#7C3AED',
            title_color: '#DC2626',
            subtitle_color: '#9CA3AF',
            infobar_background_color: '#262626',
            infobar_border_color: '#991B1B',
            infobar_icon_color: '#EF4444',
            infobar_label_color: '#D1D5DB',
            infobar_value_color: '#9CA3AF',
            consumer_background_color: '#0F0F0F',
            consumer_border_color: '#7C2D12',
            consumer_primary_color: '#DC2626',
            consumer_secondary_color: '#7C3AED'
        }
    },

    dr_who: {
        id: 'dr_who',
        name: 'Doctor Who',
        colors: {
            card_background_color: '#003B6F',
            card_border_color: '#1E40AF',
            card_text_color: '#FFFFFF',
            primary_color: '#0EA5E9',
            secondary_color: '#F59E0B',
            title_color: '#38BDF8',
            subtitle_color: '#93C5FD',
            infobar_background_color: '#002347',
            infobar_border_color: '#1E3A8A',
            infobar_icon_color: '#38BDF8',
            infobar_label_color: '#DBEAFE',
            infobar_value_color: '#93C5FD',
            consumer_background_color: '#001529',
            consumer_border_color: '#1E40AF',
            consumer_primary_color: '#0EA5E9',
            consumer_secondary_color: '#F59E0B'
        }
    },

    rick_morty: {
        id: 'rick_morty',
        name: 'Rick & Morty',
        colors: {
            card_background_color: '#1A3A52',
            card_border_color: '#22C55E',
            card_text_color: '#F0F0F0',
            primary_color: '#22C55E',
            secondary_color: '#FACC15',
            title_color: '#10B981',
            subtitle_color: '#94A3B8',
            infobar_background_color: '#0F2537',
            infobar_border_color: '#16A34A',
            infobar_icon_color: '#22C55E',
            infobar_label_color: '#E0E0E0',
            infobar_value_color: '#94A3B8',
            consumer_background_color: '#0A1A28',
            consumer_border_color: '#15803D',
            consumer_primary_color: '#22C55E',
            consumer_secondary_color: '#FACC15'
        }
    },

    frankenstein: {
        id: 'frankenstein',
        name: 'Frankenstein',
        colors: {
            card_background_color: '#1C1C1C',
            card_border_color: '#4A5D23',
            card_text_color: '#D4D4D4',
            primary_color: '#84CC16',
            secondary_color: '#A78BFA',
            title_color: '#84CC16',
            subtitle_color: '#94A3B8',
            infobar_background_color: '#262626',
            infobar_border_color: '#3F5120',
            infobar_icon_color: '#A3E635',
            infobar_label_color: '#D4D4D4',
            infobar_value_color: '#94A3B8',
            consumer_background_color: '#0F0F0F',
            consumer_border_color: '#365314',
            consumer_primary_color: '#84CC16',
            consumer_secondary_color: '#A78BFA'
        }
    },

    mr_robot:  {
        id: 'mr_robot',
        name: 'Mr. Robot',
        colors: {
            card_background_color: '#0A0A0A',
            card_border_color: '#1F1F1F',
            card_text_color: '#00FF00',
            primary_color: '#00FF00',
            secondary_color: '#FF0000',
            title_color: '#00FF00',
            subtitle_color: '#00AA00',
            infobar_background_color: '#000000',
            infobar_border_color: '#1A1A1A',
            infobar_icon_color: '#00FF00',
            infobar_label_color: '#00DD00',
            infobar_value_color: '#00AA00',
            consumer_background_color: '#050505',
            consumer_border_color: '#0F0F0F',
            consumer_primary_color: '#00FF00',
            consumer_secondary_color: '#FF0000'
        }
    },

    breaking_bad: {
        id: 'breaking_bad',
        name: 'Breaking Bad',
        colors: {
            card_background_color: '#1A1A1A',
            card_border_color: '#065F46',
            card_text_color: '#E5E5E5',
            primary_color: '#10B981',
            secondary_color: '#EAB308',
            title_color: '#10B981',
            subtitle_color: '#9CA3AF',
            infobar_background_color: '#0F0F0F',
            infobar_border_color: '#047857',
            infobar_icon_color: '#10B981',
            infobar_label_color: '#D1D5DB',
            infobar_value_color: '#9CA3AF',
            consumer_background_color: '#050505',
            consumer_border_color: '#065F46',
            consumer_primary_color: '#10B981',
            consumer_secondary_color: '#EAB308'
        }
    },

    squid_game: {
        id: 'squid_game',
        name: 'Squid Game',
        colors: {
            card_background_color: '#1A1A1A',
            card_border_color: '#DC2626',
            card_text_color: '#F9FAFB',
            primary_color: '#EF4444',
            secondary_color: '#059669',
            title_color: '#DC2626',
            subtitle_color: '#F87171',
            infobar_background_color: '#0F0F0F',
            infobar_border_color: '#B91C1C',
            infobar_icon_color: '#EF4444',
            infobar_label_color: '#F3F4F6',
            infobar_value_color: '#FCA5A5',
            consumer_background_color: '#050505',
            consumer_border_color: '#991B1B',
            consumer_primary_color: '#DC2626',
            consumer_secondary_color: '#059669'
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

    const newConfig = {
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

    return newConfig;
}

export function getThemeDisplayName(themeId: ThemeId): string {
    const theme = getTheme(themeId);
    return theme ? theme.name : themeId;
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