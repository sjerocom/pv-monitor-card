// Utility-Funktionen für PV Monitor Card

export function formatPower(value: number): string {
    const absValue = Math.abs(value);
    if (absValue >= 1000) {
        return `${(value / 1000).toFixed(2)} kW`;
    }
    return `${Math.round(value)} W`;
}

export function getBatteryIcon(percentage: number): string {
    if (percentage >= 95) return 'mdi:battery';
    else if (percentage >= 85) return 'mdi:battery-90';
    else if (percentage >= 75) return 'mdi:battery-80';
    else if (percentage >= 65) return 'mdi:battery-70';
    else if (percentage >= 55) return 'mdi:battery-60';
    else if (percentage >= 45) return 'mdi:battery-50';
    else if (percentage >= 35) return 'mdi:battery-40';
    else if (percentage >= 25) return 'mdi:battery-30';
    else if (percentage >= 15) return 'mdi:battery-20';
    else if (percentage >= 5) return 'mdi:battery-10';
    else return 'mdi:battery-outline';
}

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

export function getNetzColor(power: number, threshold: number): { color: string; duration: number; show: boolean } {
    const abs_w = Math.abs(power);
    const dur = Math.max(1, 15 - (abs_w / 6000 * 6));

    if (abs_w < threshold) return { color: '', duration: dur, show: false };

    let color = '';
    if (power > threshold) {
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

export function getPVRotation(power: number, maxPower: number = 10000): number {
    const abs_w = Math.abs(power);
    // Berechne Rotation von 0° bis 360° basierend auf maxPower
    return Math.min((abs_w / maxPower) * 360, 360);
}

export function getPVColor(power: number, maxPower: number = 10000): { color: string; duration: number; show: boolean } {
    const abs_w = Math.abs(power);
    const dur_glow = Math.max(1, 15 - (abs_w / (maxPower * 0.6) * 6));

    if (abs_w < 10) return { color: '', duration: dur_glow, show: false };

    // Berechne Farbstufen basierend auf maxPower
    const step1 = maxPower * 0.01;   // 1%
    const step2 = maxPower * 0.05;   // 5%
    const step3 = maxPower * 0.1;    // 10%
    const step4 = maxPower * 0.2;    // 20%
    const step5 = maxPower * 0.4;    // 40%
    const step6 = maxPower * 0.6;    // 60%
    const step7 = maxPower * 0.8;    // 80%
    const step8 = maxPower * 1.0;    // 100%
    const step9 = maxPower * 1.2;    // 120%
    const step10 = maxPower * 1.4;   // 140%

    let baseColor = '';
    if (abs_w < step1) baseColor = 'rgba(156,39,176,';        // Lila (sehr niedrig)
    else if (abs_w < step2) baseColor = 'rgba(244,67,54,';    // Rot (niedrig)
    else if (abs_w < step3) baseColor = 'rgba(255,111,0,';    // Orange-Rot
    else if (abs_w < step4) baseColor = 'rgba(255,152,0,';    // Orange
    else if (abs_w < step5) baseColor = 'rgba(255,193,7,';    // Gelb-Orange
    else if (abs_w < step6) baseColor = 'rgba(255,214,0,';    // Gelb
    else if (abs_w < step7) baseColor = 'rgba(255,235,59,';   // Hellgelb
    else if (abs_w < step8) baseColor = 'rgba(255,249,196,';  // Fast Weiß
    else if (abs_w < step9) baseColor = 'rgba(255,255,224,';  // Sehr hell
    else if (abs_w < step10) baseColor = 'rgba(255,255,240,'; // Extrem hell
    else baseColor = 'rgba(255,255,255,';                      // Weiß (Maximum)

    // Alpha-Wert basierend auf Leistung (0.5 bis 1.0)
    const alpha = Math.min(1, 0.5 + (abs_w / (maxPower * 1.3)) * 0.8);
    const color = baseColor + alpha.toFixed(2) + ')';

    return { color, duration: dur_glow, show: true };
}

export function getBatterieColor(charge: number, discharge: number): { color: string; duration: number; show: boolean } {
    const net_w = charge - discharge;
    const abs_w = Math.abs(net_w);
    const threshold = 10;
    const dur = Math.max(1, 15 - (abs_w / 6000 * 6));

    if (Math.abs(net_w) < threshold) return { color: '', duration: dur, show: false };

    let color = '';
    if (net_w > threshold) {
        if (abs_w < 250) color = 'rgba(255,235,59,0.4)';
        else if (abs_w < 300) color = 'rgba(238,233,52,0.6)';
        else if (abs_w < 350) color = 'rgba(220,231,47,0.8)';
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
    } else {
        if (abs_w < 250) color = 'rgba(255,235,59,0.5)';
        else if (abs_w < 300) color = 'rgba(255,202,40,0.6)';
        else if (abs_w < 350) color = 'rgba(255,167,38,0.7)';
        else if (abs_w < 400) color = 'rgba(255,138,101,0.8)';
        else if (abs_w < 450) color = 'rgba(255,112,67,0.9)';
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
    }
    return { color, duration: dur, show: true };
}

export function getHausColor(power: number): { color: string; duration: number; show: boolean } {
    const w = Math.abs(power);
    const threshold = 50;
    const dur = Math.max(1, 6 - (w / 6000 * 4));

    if (w < threshold) return { color: '', duration: dur, show: false };

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

export function getAnimationStyle(color: string, duration: number): string {
    return `
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border-radius: 50%;
        background: conic-gradient(
            rgba(0,0,0,0.2) 30deg,
            ${color} 88deg,
            rgba(255,255,255,1) 90deg,
            ${color} 92deg,
            rgba(0,0,0,0.2) 94deg,
            rgba(0,0,0,0.2) 160deg,
            ${color} 208deg,
            rgba(255,255,255,1) 210deg,
            ${color} 212deg,
            rgba(0,0,0,0.2) 214deg,
            rgba(0,0,0,0.2) 280deg,
            ${color} 328deg,
            rgba(255,255,255,1) 330deg,
            ${color} 332deg,
            rgba(0,0,0,0.2) 334deg,
            rgba(0,0,0,0.2) 360deg
        );
        animation: spin ${duration}s linear infinite;
        z-index: 0;
    `;
}