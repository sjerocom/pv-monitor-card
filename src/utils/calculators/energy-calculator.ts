/**
 * Berechnet die Autarkie (Selbstversorgungsgrad)
 * @param pvProductionW PV-Produktion in W
 * @param batteryDischargeW Batterie-Entladung in W
 * @param gridFeedInW Netzeinspeisung in W (positiv bei Einspeisung)
 * @param houseConsumptionW Hausverbrauch in W
 * @returns Autarkie in Prozent (0-100) oder "—" wenn nicht berechenbar
 */
export function calculateAutarky(
    pvProductionW: number,
    batteryDischargeW: number,
    gridFeedInW: number,
    houseConsumptionW: number
): string {
    if (houseConsumptionW <= 0) return '—';
    
    const selfProduction = pvProductionW + batteryDischargeW;
    const gridConsumption = gridFeedInW < 0 ? Math.abs(gridFeedInW) : 0;
    const selfConsumption = houseConsumptionW - gridConsumption;
    const autarky = (selfConsumption / houseConsumptionW) * 100;
    const clampedAutarky = Math.max(0, Math.min(100, autarky));

    return `${Math.round(clampedAutarky)}%`;
}

/**
 * Berechnet den Eigenverbrauch
 * @param pvProductionW PV-Produktion in W
 * @param gridFeedInW Netzeinspeisung in W (positiv bei Einspeisung)
 * @returns Eigenverbrauch in Prozent (0-100) oder "—" wenn nicht berechenbar
 */
export function calculateSelfConsumption(
    pvProductionW: number,
    gridFeedInW: number
): string {
    if (pvProductionW <= 10) return '—';
    
    const feedIn = gridFeedInW > 0 ? gridFeedInW : 0;
    const selfUsed = pvProductionW - feedIn;
    const selfConsumption = (selfUsed / pvProductionW) * 100;
    const clampedSelfConsumption = Math.max(0, Math.min(100, selfConsumption));

    return `${Math.round(clampedSelfConsumption)}%`;
}
