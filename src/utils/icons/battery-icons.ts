/**
 * Gibt das passende Batterie-Icon basierend auf dem Ladestand zurück
 * @param percentage Batteriestand in Prozent (0-100)
 * @returns Material Design Icon Name
 */
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

/**
 * Berechnet die Rotationsgeschwindigkeit für das PV-Icon
 * @param power Aktuelle PV-Leistung in W
 * @param maxPower Maximale PV-Leistung in W
 * @returns Rotationsdauer in Sekunden
 */
export function getPVRotationSpeed(power: number, maxPower: number = 10000): number {
    const abs_w = Math.abs(power);

    if (abs_w < 10) return 60;

    const ratio = abs_w / maxPower;
    const speed = Math.max(2, 30 - (ratio * 28));

    return speed;
}
