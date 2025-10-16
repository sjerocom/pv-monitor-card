export interface ColorAnimationConfig {
    color: string;
    duration: number;
    show: boolean;
}

/**
 * Gibt die Icon-Farbe basierend auf dem Batteriestand zurück
 * @param percentage Batteriestand in Prozent (0-100)
 * @returns Farbe als rgba-String
 */
export function getBatteryIconColor(percentage: number): string {
    if (percentage >= 80) return 'rgba(76,175,80,1)';
    else if (percentage >= 70) return 'rgba(139,195,74,1)';
    else if (percentage >= 60) return 'rgba(205,220,57,1)';
    else if (percentage >= 50) return 'rgba(255,235,59,1)';
    else if (percentage >= 40) return 'rgba(255,193,7,1)';
    else if (percentage >= 30) return 'rgba(255,152,0,1)';
    else if (percentage >= 20) return 'rgba(255,87,34,1)';
    else if (percentage >= 10) return 'rgba(244,67,54,1)';
    else return 'rgba(211,47,47,1)';
}

/**
 * Berechnet die Animations-Farbe für die Batterie basierend auf Lade-/Entladeleistung
 * @param charge Ladeleistung in W
 * @param discharge Entladeleistung in W
 * @param batteryCapacity Batteriekapazität in Wh
 * @returns Konfiguration für Animation (Farbe, Dauer, Sichtbarkeit)
 */
export function getBatterieColor(
    charge: number,
    discharge: number,
    batteryCapacity: number = 10000
): ColorAnimationConfig {
    const net_w = charge - discharge;
    const abs_w = Math.abs(net_w);
    const threshold = 10;

    const dur = Math.max(1, 15 - (abs_w / (batteryCapacity * 0.6) * 6));

    if (Math.abs(net_w) < threshold) {
        return { color: '', duration: dur, show: false };
    }

    const step1 = batteryCapacity * 0.025;
    const step2 = batteryCapacity * 0.03;
    const step3 = batteryCapacity * 0.035;
    const step4 = batteryCapacity * 0.04;
    const step5 = batteryCapacity * 0.045;
    const step6 = batteryCapacity * 0.05;
    const step7 = batteryCapacity * 0.055;
    const step8 = batteryCapacity * 0.06;
    const step9 = batteryCapacity * 0.065;
    const step10 = batteryCapacity * 0.075;
    const step11 = batteryCapacity * 0.1;
    const step12 = batteryCapacity * 0.125;
    const step13 = batteryCapacity * 0.15;
    const step14 = batteryCapacity * 0.175;
    const step15 = batteryCapacity * 0.2;
    const step16 = batteryCapacity * 0.25;
    const step17 = batteryCapacity * 0.3;

    let color = '';
    if (net_w > threshold) {
        if (abs_w < step1) color = 'rgba(255,235,59,0.4)';
        else if (abs_w < step2) color = 'rgba(238,233,52,0.6)';
        else if (abs_w < step3) color = 'rgba(220,231,47,0.8)';
        else if (abs_w < step4) color = 'rgba(205,220,57,1)';
        else if (abs_w < step5) color = 'rgba(174,213,89,1)';
        else if (abs_w < step6) color = 'rgba(156,204,101,1)';
        else if (abs_w < step7) color = 'rgba(139,195,74,1)';
        else if (abs_w < step8) color = 'rgba(124,179,66,1)';
        else if (abs_w < step9) color = 'rgba(104,159,56,1)';
        else if (abs_w < step10) color = 'rgba(85,139,47,1)';
        else if (abs_w < step11) color = 'rgba(76,175,80,1)';
        else if (abs_w < step12) color = 'rgba(67,160,71,1)';
        else if (abs_w < step13) color = 'rgba(56,142,60,1)';
        else if (abs_w < step14) color = 'rgba(46,125,50,1)';
        else if (abs_w < step15) color = 'rgba(35,94,39,1)';
        else if (abs_w < step16) color = 'rgba(27,94,32,1)';
        else if (abs_w < step17) color = 'rgba(20,83,28,1)';
        else color = 'rgba(10,50,20,1)';
    } else {
        if (abs_w < step1) color = 'rgba(255,235,59,0.5)';
        else if (abs_w < step2) color = 'rgba(255,202,40,0.6)';
        else if (abs_w < step3) color = 'rgba(255,167,38,0.7)';
        else if (abs_w < step4) color = 'rgba(255,138,101,0.8)';
        else if (abs_w < step5) color = 'rgba(255,112,67,0.9)';
        else if (abs_w < step6) color = 'rgba(244,67,54,1)';
        else if (abs_w < step7) color = 'rgba(229,57,53,1)';
        else if (abs_w < step8) color = 'rgba(211,47,47,1)';
        else if (abs_w < step9) color = 'rgba(198,40,40,1)';
        else if (abs_w < step10) color = 'rgba(183,28,28,1)';
        else if (abs_w < step11) color = 'rgba(156,39,176,1)';
        else if (abs_w < step12) color = 'rgba(142,36,170,1)';
        else if (abs_w < step13) color = 'rgba(123,31,162,1)';
        else if (abs_w < step14) color = 'rgba(106,27,154,1)';
        else if (abs_w < step15) color = 'rgba(94,53,177,1)';
        else if (abs_w < step16) color = 'rgba(81,45,168,1)';
        else if (abs_w < step17) color = 'rgba(49,27,146,1)';
        else color = 'rgba(26,35,126,1)';
    }
    
    return { color, duration: dur, show: true };
}
