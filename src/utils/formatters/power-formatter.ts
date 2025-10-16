/**
 * Formatiert Leistungswerte in eine lesbare Darstellung
 * @param value Leistung in Watt
 * @returns Formatierte Leistung (W oder kW)
 */
export function formatPower(value: number): string {
    const absValue = Math.abs(value);
    if (absValue >= 1000) {
        return `${(value / 1000).toFixed(2)} kW`;
    }
    return `${Math.round(value)} W`;
}
