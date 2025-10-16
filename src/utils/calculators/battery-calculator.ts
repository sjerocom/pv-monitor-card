import { formatTime } from '../formatters';

/**
 * Berechnet die Restlaufzeit der Batterie (Entladezeit)
 * @param batteryCapacityWh Batteriekapazität in Wh
 * @param socPercent State of Charge in Prozent (0-100)
 * @param chargeW Ladeleistung in W
 * @param dischargeW Entladeleistung in W
 * @returns Formatierte Restlaufzeit oder Symbol
 */
export function calculateBatteryRuntime(
    batteryCapacityWh: number,
    socPercent: number,
    chargeW: number,
    dischargeW: number
): string {
    const capKwh = batteryCapacityWh / 1000;
    const soc = socPercent / 100;
    const eRestKwh = capKwh * soc;

    const chKw = chargeW / 1000;
    const disKw = dischargeW / 1000;
    const pNetKw = chKw - disKw;
    const thresholdKw = 0.03;

    if (eRestKwh > 0 && pNetKw < -thresholdKw) {
        const totalSeconds = (eRestKwh / Math.abs(pNetKw)) * 3600;
        return formatTime(totalSeconds);
    } else if (pNetKw > thresholdKw) {
        return '♾️';
    } else {
        return '—';
    }
}

/**
 * Berechnet die Restladezeit der Batterie
 * @param batteryCapacityWh Batteriekapazität in Wh
 * @param socPercent State of Charge in Prozent (0-100)
 * @param chargeW Ladeleistung in W
 * @param dischargeW Entladeleistung in W
 * @returns Formatierte Restladezeit oder Symbol
 */
export function calculateBatteryChargeTime(
    batteryCapacityWh: number,
    socPercent: number,
    chargeW: number,
    dischargeW: number
): string {
    const capKwh = batteryCapacityWh / 1000;
    const soc = socPercent / 100;
    const eMissingKwh = capKwh * (1 - soc);

    const chKw = chargeW / 1000;
    const disKw = dischargeW / 1000;
    const pNetKw = chKw - disKw;
    const thresholdKw = 0.03;

    if (eMissingKwh > 0 && pNetKw > thresholdKw) {
        const totalSeconds = (eMissingKwh / pNetKw) * 3600;
        return formatTime(totalSeconds);
    } else if (pNetKw < -thresholdKw) {
        return '♾️';
    } else {
        return '—';
    }
}
