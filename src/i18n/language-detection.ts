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
    if (browserLang.startsWith('nl')) return 'nl';
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('sv')) return 'sv';
    if (browserLang.startsWith('fi')) return 'fi';
    if (browserLang.startsWith('cs')) return 'cs';
    if (browserLang.startsWith('sl')) return 'sl';
    if (browserLang.startsWith('sk')) return 'sk';
    if (browserLang.startsWith('bs')) return 'bs';
    if (browserLang.startsWith('sr')) return 'sr';

    return 'en';
}
