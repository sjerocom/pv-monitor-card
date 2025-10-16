import { ColorAnimationConfig } from './battery-colors';

/**
 * Berechnet die Animations-Farbe für das Haus basierend auf dem Verbrauch
 * @param power Hausverbrauch in W
 * @returns Konfiguration für Animation (Farbe, Dauer, Sichtbarkeit)
 */
export function getHausColor(power: number): ColorAnimationConfig {
    const w = Math.abs(power);
    const threshold = 50;
    const dur = Math.max(1, 6 - (w / 6000 * 4));

    if (w < threshold) {
        return { color: '', duration: dur, show: false };
    }

    let color = '';
    if (w < 80) color = 'rgba(255,235,59,1)';
    else if (w < 100) color = 'rgba(255,202,40,1)';
    else if (w < 150) color = 'rgba(255,167,38,1)';
    else if (w < 250) color = 'rgba(244,81,30,1)';
    else if (w < 500) color = 'rgba(229,57,53,1)';
    else if (w < 1000) color = 'rgba(198,40,40,1)';
    else if (w < 1500) color = 'rgba(233,30,99,1)';
    else if (w < 2500) color = 'rgba(216,27,96,1)';
    else if (w < 3000) color = 'rgba(194,24,91,1)';
    else if (w < 4000) color = 'rgba(156,39,176,1)';
    else if (w < 5000) color = 'rgba(123,31,162,1)';
    else color = 'rgba(74,20,140,1)';

    return { color, duration: dur, show: true };
}
