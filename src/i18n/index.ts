// Types
export type { SupportedLanguage, Translations } from './types';
export { languageNames } from './types';

// Language Detection
export { detectLanguage } from './language-detection';

// Translation Loading
export {
    getTranslations,
    loadTranslationsAsync,
    preloadAllTranslations
} from './translation-loader';

// Locales (optional, for direct access)
export * as locales from './locales';
