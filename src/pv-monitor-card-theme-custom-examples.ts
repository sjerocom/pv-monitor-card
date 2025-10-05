// Example Custom Theme for PV Monitor Card
// Copy this file and modify it to create your own themes!
//
// Instructions:
// 1. Copy this file and rename it (e.g., pv-monitor-card-theme-sunset.ts)
// 2. Modify the theme definition below
// 3. Import this file in your main card file
// 4. The theme will automatically appear in the theme selector

import { registerTheme } from './pv-monitor-card-themes';

// Example: Sunset Theme
registerTheme({
    id: 'sunset',  // Must be unique!
    name: 'Sunset',  // Display name in the selector
    colors: {
        // Card styling
        card_background_color: 'rgba(30, 20, 40, 1)',  // Deep purple-ish background
        card_border_color: 'rgba(255, 120, 80, 0.3)',   // Orange border
        card_text_color: 'rgba(255, 230, 200, 1)',      // Warm white text

        // Primary/Secondary colors (for values)
        primary_color: 'rgba(255, 170, 100, 1)',        // Warm orange
        secondary_color: 'rgba(255, 200, 150, 0.8)',    // Light orange

        // Title & Subtitle
        title_color: 'rgba(255, 140, 80, 1)',           // Vibrant orange
        subtitle_color: 'rgba(255, 180, 120, 0.7)',     // Soft orange

        // Info Bar
        infobar_background_color: 'rgba(40, 30, 50, 1)',     // Slightly lighter than card
        infobar_border_color: 'rgba(255, 120, 80, 0.3)',     // Same as card border
        infobar_icon_color: 'rgba(255, 170, 100, 1)',        // Warm orange
        infobar_label_color: 'rgba(255, 180, 120, 0.7)',     // Soft orange
        infobar_value_color: 'rgba(255, 230, 200, 1)',       // Warm white
    }
});

// Example: Ocean Theme
registerTheme({
    id: 'ocean',
    name: 'Ocean',
    colors: {
        card_background_color: 'rgba(10, 25, 47, 1)',       // Deep blue
        card_border_color: 'rgba(0, 180, 216, 0.3)',        // Cyan border
        card_text_color: 'rgba(224, 242, 254, 1)',          // Light blue-white

        primary_color: 'rgba(56, 189, 248, 1)',             // Sky blue
        secondary_color: 'rgba(125, 211, 252, 0.8)',        // Light cyan

        title_color: 'rgba(14, 165, 233, 1)',               // Vibrant blue
        subtitle_color: 'rgba(125, 211, 252, 0.7)',         // Soft cyan

        infobar_background_color: 'rgba(15, 35, 60, 1)',
        infobar_border_color: 'rgba(0, 180, 216, 0.3)',
        infobar_icon_color: 'rgba(56, 189, 248, 1)',
        infobar_label_color: 'rgba(125, 211, 252, 0.7)',
        infobar_value_color: 'rgba(224, 242, 254, 1)',
    }
});

// Example: Purple Dream Theme
registerTheme({
    id: 'purple',
    name: 'Purple Dream',
    colors: {
        card_background_color: 'rgba(24, 24, 40, 1)',       // Dark purple-gray
        card_border_color: 'rgba(168, 85, 247, 0.3)',       // Purple border
        card_text_color: 'rgba(250, 245, 255, 1)',          // Very light purple

        primary_color: 'rgba(192, 132, 252, 1)',            // Light purple
        secondary_color: 'rgba(216, 180, 254, 0.8)',        // Lighter purple

        title_color: 'rgba(168, 85, 247, 1)',               // Vibrant purple
        subtitle_color: 'rgba(216, 180, 254, 0.7)',         // Soft purple

        infobar_background_color: 'rgba(30, 30, 50, 1)',
        infobar_border_color: 'rgba(168, 85, 247, 0.3)',
        infobar_icon_color: 'rgba(192, 132, 252, 1)',
        infobar_label_color: 'rgba(216, 180, 254, 0.7)',
        infobar_value_color: 'rgba(250, 245, 255, 1)',
    }
});

/*
 * Color Picker Tips:
 *
 * 1. Use rgba() format for consistency and transparency support
 * 2. Keep good contrast between background and text colors
 * 3. Use semi-transparent borders (0.2-0.4 alpha) for a modern look
 * 4. Test your theme in both bright and dark environments
 *
 * Recommended color combinations:
 * - Dark background (rgba(20-40, 20-40, 40-60, 1))
 * - Border with 0.3 alpha of your accent color
 * - Text at 0.8-1.0 alpha for readability
 * - Secondary text at 0.6-0.7 alpha
 *
 * Online color tools:
 * - coolors.co - Color palette generator
 * - color.adobe.com - Adobe Color Wheel
 * - tailwindcss.com/docs/customizing-colors - Tailwind color palette
 */