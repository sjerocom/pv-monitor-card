import { getRotatingDotsStyle, getParticleFieldStyle, getElectricArcStyle } from './animation-types';

/**
 * Legacy-Funktion für rotierende Punkte (wird durch getRotatingDotsStyle ersetzt)
 * @deprecated Nutze stattdessen getRotatingDotsStyle
 */
export function getAnimationStyle(color: string, duration: number): string {
    return getRotatingDotsStyle(color, duration);
}

/**
 * Gibt den passenden Animations-Style basierend auf dem Typ zurück
 * @param type Animationstyp ('rotating-dots', 'particle-field', 'electric-arc')
 * @param color Farbe der Animation
 * @param duration Animationsdauer in Sekunden
 * @returns CSS-Style-String
 */
export function getAnimationStyleByType(type: string, color: string, duration: number): string {
    switch (type) {
        case 'particle-field':
            return getParticleFieldStyle(color, duration);
        case 'electric-arc':
            return getElectricArcStyle(color, duration);
        case 'rotating-dots':
        default:
            return getRotatingDotsStyle(color, duration);
    }
}
