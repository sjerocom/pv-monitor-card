import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { pvMonitorCardStyles } from "./styles";
import { PVMonitorCardConfig, Hass } from "./types";
import { getDefaultConfig } from "./pv-monitor-card-defaults";
import {
    renderPV,
    renderBattery,
    renderHouse,
    renderGrid,
    renderInfoBar,
    renderConsumers,
    renderHeader
} from "./components/renderers";
import {
    ActionHandler,
    getCardStyle,
    getTextFromEntityOrConfig,
    calculateTotalConsumerPower,
    calculateGridColumns
} from "./core";

declare const __BUILD_TIMESTAMP__: string;
declare const __CARD_NAME__: string;

const CARD_TAG = typeof __CARD_NAME__ !== 'undefined' ? __CARD_NAME__ : 'pv-monitor-card';

export class PVMonitorCard extends LitElement {
    @property({ attribute: false }) public hass?: Hass;
    @property() private config!: PVMonitorCardConfig;
    @property() private _consumersVisible: boolean = true;

    private _actionHandler?: ActionHandler;

    static styles = pvMonitorCardStyles;

    public static async getConfigElement() {
        await import('./editor/editor');
        return document.createElement(`${CARD_TAG}-editor`);
    }

    public static getStubConfig() {
        return {
            type: `custom:${CARD_TAG}`,
            title: 'PV Monitor',
            show_title: true,
            pv: { entity: '', animation: true, max_power: 10000 },
            batterie: { entity: '', animation: true },
            haus: { entity: '', animation: true },
            netz: { entity: '', animation: true, threshold: 10 }
        };
    }

    public setConfig(config: PVMonitorCardConfig): void {
        if (!config) throw new Error("Fehlende Konfiguration");
        this.config = getDefaultConfig(config);
        this._actionHandler = new ActionHandler(this.hass, this.dispatchEvent.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this._actionHandler) {
            this._actionHandler = new ActionHandler(this.hass, this.dispatchEvent.bind(this));
        }
    }

    private _toggleConsumers = (): void => {
        if (this.config.consumers?.show && (this.config.consumers?.items?.length ?? 0) > 0) {
            this._consumersVisible = !this._consumersVisible;
            this.requestUpdate();
        }
    };

    render() {
        if (!this.config || !this._actionHandler) return html``;

        const s = this.config.style!;
        const infoBarPosition = this.config.info_bar?.position || 'top';
        const gridTemplateColumns = calculateGridColumns(this.config);

        const getCardStyleBound = (cardStyle?: any) => getCardStyle(cardStyle, s);
        const getTextBound = (entity?: string, text?: string) => getTextFromEntityOrConfig(this.hass, entity, text);
        const calcConsumerPowerBound = () => calculateTotalConsumerPower(this.hass, this.config.consumers?.items, this.config.consumers?.threshold ?? 0);
        const handleActionBound = (event: Event, actions: any, isHausCard?: boolean) =>
            this._actionHandler!.handleAction(event, actions, isHausCard || false, this._toggleConsumers);
        const handleTapBound = (action?: any) => this._actionHandler!.handleTap(action);
        const handleConsumerActionBound = (event: Event, action?: any) => this._actionHandler!.handleTap(action);

        return html`
            ${renderHeader(this.config)}
            ${infoBarPosition === 'top' ? renderInfoBar(this.config, this.hass, handleTapBound) : ''}
            <div class="grid" style="gap: ${this.config.grid_gap}; grid-template-columns: ${gridTemplateColumns};">
                ${this.config.pv?.show !== false ? renderPV(this.config, this.hass, s, getCardStyleBound, getTextBound, handleActionBound) : ''}
                ${this.config.batterie?.show !== false ? renderBattery(this.config, this.hass, s, getCardStyleBound, getTextBound, handleActionBound) : ''}
                ${this.config.haus?.show !== false ? renderHouse(this.config, this.hass, s, getCardStyleBound, getTextBound, calcConsumerPowerBound, handleActionBound) : ''}
                ${this.config.netz?.show !== false ? renderGrid(this.config, this.hass, s, getCardStyleBound, getTextBound, handleActionBound) : ''}
            </div>
            ${infoBarPosition === 'bottom' ? html`
                <div style="margin-top: ${s.infobar_gap || '6px'};">
                    ${renderInfoBar(this.config, this.hass, handleTapBound)}
                </div>
            ` : ''}
            ${renderConsumers(this.config, this.hass, this._consumersVisible, handleConsumerActionBound)}
        `;
    }
}

if (!customElements.get(CARD_TAG)) {
    customElements.define(CARD_TAG, PVMonitorCard);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: `custom:${CARD_TAG}`,
    name: "PV Monitor Card",
    description: "Monitor your PV-System with Battery-Info, Calculations, Grid status and Devices Power Consumtion",
    preview: true,
    documentationURL: "https://github.com/sjerocom/pv-monitor-card"
});

const buildInfo = typeof __BUILD_TIMESTAMP__ !== 'undefined'
    ? ` [DEV: ${__BUILD_TIMESTAMP__}]`
    : ' Version: 0.0.107';

console.info(
    '%c PV-MONITOR-CARD %c' + buildInfo,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray'
);
