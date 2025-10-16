import { SupportedLanguage } from './types';

/**
 * Erkennt die Browser-Sprache und gibt die passende unterstützte Sprache zurück
 * @returns Unterstützte Sprache basierend auf Browser-Einstellung
 */
export function detectLanguage(): SupportedLanguage {
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('it')) return 'it';
    if (browserLang.startsWith('es')) return 'es';

    return 'en';
}
