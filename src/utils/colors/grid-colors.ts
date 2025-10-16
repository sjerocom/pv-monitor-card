import { ColorAnimationConfig } from './battery-colors';

/**
 * Berechnet die Animations-Farbe für das Netz basierend auf Bezug/Einspeisung
 * @param power Netzleistung in W (positiv = Bezug, negativ = Einspeisung)
 * @param threshold Schwellwert für neutralen Status
 * @returns Konfiguration für Animation (Farbe, Dauer, Sichtbarkeit)
 */
export function getNetzColor(
    power: number,
    threshold: number
): ColorAnimationConfig {
    const abs_w = Math.abs(power);
    const dur = Math.max(1, 15 - (abs_w / 6000 * 6));

    if (abs_w < threshold) {
        return { color: '', duration: dur, show: false };
    }

    let color = '';
    if (power > threshold) {
        // Netzbezug (rot-violett)
        if (abs_w < 250) color = 'rgba(255,235,59,1)';
        else if (abs_w < 300) color = 'rgba(255,202,40,1)';
        else if (abs_w < 350) color = 'rgba(255,167,38,1)';
        else if (abs_w < 400) color = 'rgba(255,138,101,1)';
        else if (abs_w < 450) color = 'rgba(255,112,67,1)';
        else if (abs_w < 500) color = 'rgba(244,67,54,1)';
        else if (abs_w < 550) color = 'rgba(229,57,53,1)';
        else if (abs_w < 600) color = 'rgba(211,47,47,1)';
        else if (abs_w < 650) color = 'rgba(198,40,40,1)';
        else if (abs_w < 700) color = 'rgba(183,28,28,1)';
        else if (abs_w < 750) color = 'rgba(156,39,176,1)';
        else if (abs_w < 1000) color = 'rgba(142,36,170,1)';
        else if (abs_w < 1250) color = 'rgba(123,31,162,1)';
        else if (abs_w < 1500) color = 'rgba(106,27,154,1)';
        else if (abs_w < 1750) color = 'rgba(94,53,177,1)';
        else if (abs_w < 2000) color = 'rgba(81,45,168,1)';
        else if (abs_w < 2500) color = 'rgba(74,20,140,1)';
        else if (abs_w < 3000) color = 'rgba(49,27,146,1)';
        else color = 'rgba(26,35,126,1)';
    } else {
        // Einspeisung (gelb-grün)
        if (abs_w < 250) color = 'rgba(255,235,59,1)';
        else if (abs_w < 300) color = 'rgba(238,233,52,1)';
        else if (abs_w < 350) color = 'rgba(220,231,47,1)';
        else if (abs_w < 400) color = 'rgba(205,220,57,1)';
        else if (abs_w < 450) color = 'rgba(174,213,89,1)';
        else if (abs_w < 500) color = 'rgba(156,204,101,1)';
        else if (abs_w < 550) color = 'rgba(139,195,74,1)';
        else if (abs_w < 600) color = 'rgba(124,179,66,1)';
        else if (abs_w < 650) color = 'rgba(104,159,56,1)';
        else if (abs_w < 700) color = 'rgba(85,139,47,1)';
        else if (abs_w < 750) color = 'rgba(76,175,80,1)';
        else if (abs_w < 1000) color = 'rgba(67,160,71,1)';
        else if (abs_w < 1250) color = 'rgba(56,142,60,1)';
        else if (abs_w < 1500) color = 'rgba(46,125,50,1)';
        else if (abs_w < 1750) color = 'rgba(35,94,39,1)';
        else if (abs_w < 2000) color = 'rgba(27,94,32,1)';
        else if (abs_w < 2500) color = 'rgba(20,83,28,1)';
        else if (abs_w < 3000) color = 'rgba(15,71,24,1)';
        else color = 'rgba(10,50,20,1)';
    }
    
    return { color, duration: dur, show: true };
}
