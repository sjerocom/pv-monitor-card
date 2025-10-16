/**
 * Berechnet die Farbe für einen Consumer basierend auf seinem Verbrauch
 * @param powerW Verbrauch in Watt
 * @returns Farbe als rgba-String
 */
export function getConsumerColor(powerW: number): string {
    const w = Math.abs(powerW);

    if (w <= 10) return 'rgba(76,175,80,1)';
    else if (w <= 25) return 'rgba(139,195,74,1)';
    else if (w <= 50) return 'rgba(205,220,57,1)';
    else if (w <= 100) return 'rgba(255,235,59,1)';
    else if (w <= 150) return 'rgba(255,193,7,1)';
    else if (w <= 200) return 'rgba(255,152,0,1)';
    else if (w <= 250) return 'rgba(255,87,34,1)';
    else if (w <= 300) return 'rgba(244,67,54,1)';
    else if (w <= 500) return 'rgba(233,30,99,1)';
    else if (w <= 1000) return 'rgba(156,39,176,1)';
    else if (w <= 1500) return 'rgba(103,58,183,1)';
    else if (w <= 2500) return 'rgba(63,81,181,1)';
    else return 'rgba(26,35,126,1)';
}
