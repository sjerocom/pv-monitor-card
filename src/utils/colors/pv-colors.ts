import { ColorAnimationConfig } from './battery-colors';

/**
 * Berechnet die Animations-Farbe für PV basierend auf der aktuellen Produktion
 * @param power Aktuelle PV-Leistung in W
 * @param maxPower Maximale PV-Leistung in W
 * @returns Konfiguration für Animation (Farbe, Dauer, Sichtbarkeit)
 */
export function getPVColor(
    power: number,
    maxPower: number = 10000
): ColorAnimationConfig {
    const abs_w = Math.abs(power);
    const dur_glow = Math.max(1, 15 - (abs_w / (maxPower * 0.6) * 6));

    if (abs_w < 10) {
        return { color: '', duration: dur_glow, show: false };
    }

    const step1 = maxPower * 0.01;
    const step2 = maxPower * 0.05;
    const step3 = maxPower * 0.1;
    const step4 = maxPower * 0.2;
    const step5 = maxPower * 0.4;
    const step6 = maxPower * 0.6;
    const step7 = maxPower * 0.8;
    const step8 = maxPower;
    const step9 = maxPower * 1.2;
    const step10 = maxPower * 1.4;

    let baseColor = '';
    if (abs_w < step1) baseColor = 'rgba(156,39,176,';
    else if (abs_w < step2) baseColor = 'rgba(244,67,54,';
    else if (abs_w < step3) baseColor = 'rgba(255,111,0,';
    else if (abs_w < step4) baseColor = 'rgba(255,152,0,';
    else if (abs_w < step5) baseColor = 'rgba(255,193,7,';
    else if (abs_w < step6) baseColor = 'rgba(255,214,0,';
    else if (abs_w < step7) baseColor = 'rgba(255,235,59,';
    else if (abs_w < step8) baseColor = 'rgba(255,249,196,';
    else if (abs_w < step9) baseColor = 'rgba(255,255,224,';
    else if (abs_w < step10) baseColor = 'rgba(255,255,240,';
    else baseColor = 'rgba(255,255,255,';

    const alpha = Math.min(1, 0.5 + (abs_w / (maxPower * 1.3)) * 0.8);
    const color = baseColor + alpha.toFixed(2) + ')';

    return { color, duration: dur_glow, show: true };
}
