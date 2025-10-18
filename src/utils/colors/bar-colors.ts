export function getPVBarItemColor(power: number, maxPower: number): string {
    if (!maxPower || power === 0) return 'rgba(255, 255, 255, 0.3)'; // ausgegraut

    const percentage = (power / maxPower) * 100;

    if (percentage >= 80) return '#4caf50'; // grün
    if (percentage >= 50) return '#8bc34a'; // hellgrün
    if (percentage >= 20) return '#ffc107'; // gelb
    if (percentage > 0) return '#ff9800'; // orange
    return 'rgba(255, 255, 255, 0.3)'; // ausgegraut
}

export function getBatteryBarItemColor(soc: number): string {
    if (isNaN(soc) || soc < 0) return 'rgba(255, 255, 255, 0.3)'; // ausgegraut

    if (soc >= 80) return '#4caf50'; // grün
    if (soc >= 50) return '#8bc34a'; // hellgrün
    if (soc >= 20) return '#ffc107'; // gelb
    return '#f44336'; // rot
}
