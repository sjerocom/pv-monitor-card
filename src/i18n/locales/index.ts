/**
 * Central export file for all translation locales
 * Note: These exports are optional - translations are loaded dynamically via translation-loader.ts
 * This file is mainly for type-checking and organization purposes
 */

// Language files are loaded dynamically in translation-loader.ts
// This index file is kept for organizational purposes and IDE support

// Type-safe re-exports (optional, for development convenience)
// Actual runtime loading happens dynamically via: import(`./locales/${lang}.json`)

export type { Translations } from '../types';
