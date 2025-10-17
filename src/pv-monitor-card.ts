import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import { pvMonitorCardStyles } from "./styles";
import { PVMonitorCardConfig, Hass } from "./types";
import { getDefaultConfig } from "./pv-monitor-card-defaults";
import { migrateConfig } from "./utils/migration";
import {
    renderPV,
    renderBattery,
    renderHouse,
    renderGrid,
    renderInfoBar,
    renderConsumers,
    renderHeader,
    renderPVBar,
    renderBatteryBar,
    renderWarnings
} from "./components/renderers";
import {
    ActionHandler,
    getCardStyle,
    getTextFromEntityOrConfig,
    calculateTotalConsumerPower,
    calculateGridColumns
} from "./core";
import { getAllValidationWarnings } from "./utils/validators";

declare const __BUILD_TIMESTAMP__: string;
declare const __CARD_NAME__: string;

const CARD_TAG = typeof __CARD_NAME__ !== 'undefined' ? __CARD_NAME__ : 'pv-monitor-card';

export class PVMonitorCard extends LitElement {
    @property({ attribute: false }) public hass?: Hass;
    @property({ attribute: false }) private config!: PVMonitorCardConfig;
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
        
        // Migration von alter Config-Struktur
        const migratedConfig = migrateConfig(config);
        
        this.config = getDefaultConfig(migratedConfig);
        this._actionHandler = new ActionHandler(this.hass, this.dispatchEvent.bind(this));
        
        console.log('PV Monitor Card - Config updated:', {
            migrated: config.entities ? 'yes' : 'no',
            cards_order: this.config.layout?.cards_order,
            cards_visibility: this.config.layout?.cards_visibility
        });
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

    private _renderCards(
        s: any,
        getCardStyleBound: (cardStyle?: any) => string,
        getTextBound: (entity?: string, text?: string) => string,
        calcConsumerPowerBound: () => number,
        handleActionBound: (event: Event, actions: any, isHausCard?: boolean) => void
    ) {
        const defaultOrder = ['pv', 'battery', 'house', 'grid'];
        const cardsOrder = this.config.layout?.cards_order || defaultOrder;
        const cardsVisibility = this.config.layout?.cards_visibility || {
            pv: this.config.pv?.show !== false,
            battery: this.config.batterie?.show !== false,
            house: this.config.haus?.show !== false,
            grid: this.config.netz?.show !== false
        };

        console.log('_renderCards:', { cardsOrder, cardsVisibility });

        const cardRenderers: Record<string, any> = {
            pv: () => cardsVisibility.pv ? renderPV(this.config, this.hass, s, getCardStyleBound, getTextBound, handleActionBound) : '',
            battery: () => cardsVisibility.battery ? renderBattery(this.config, this.hass, s, getCardStyleBound, getTextBound, handleActionBound) : '',
            house: () => cardsVisibility.house ? renderHouse(this.config, this.hass, s, getCardStyleBound, getTextBound, calcConsumerPowerBound, handleActionBound) : '',
            grid: () => cardsVisibility.grid ? renderGrid(this.config, this.hass, s, getCardStyleBound, getTextBound, handleActionBound) : ''
        };

        return cardsOrder.map(card => cardRenderers[card] ? cardRenderers[card]() : '');
    }

    render() {
        if (!this.config || !this._actionHandler) return html``;

        const s = this.config.style!;
        const gridTemplateColumns = calculateGridColumns(this.config);

        // Validierungen durchführen
        const warnings = this.hass ? getAllValidationWarnings(this.config, this.hass) : [];

        const getCardStyleBound = (cardStyle?: any) => getCardStyle(cardStyle, s);
        const getTextBound = (entity?: string, text?: string) => getTextFromEntityOrConfig(this.hass, entity, text);
        const calcConsumerPowerBound = () => calculateTotalConsumerPower(this.hass, this.config.consumers?.items, this.config.consumers?.threshold ?? 0);
        const handleActionBound = (event: Event, actions: any, isHausCard?: boolean) =>
            this._actionHandler!.handleAction(event, actions, isHausCard || false, this._toggleConsumers);
        const handleTapBound = (action?: any) => this._actionHandler!.handleTap(action);
        const handleConsumerActionBound = (event: Event, action?: any) => this._actionHandler!.handleTap(action);

        // Layout Order bestimmen
        const order = this.config.layout?.order || ['header', 'pv_bar', 'cards', 'info_bar', 'battery_bar', 'consumers'];

        const sections: Record<string, any> = {
            header: renderHeader(this.config),
            pv_bar: this.config.pv_bar?.show ? html`
                <div style="margin-top: ${s.pv_bar_gap || '6px'}; margin-bottom: ${s.pv_bar_gap || '6px'};">
                    ${renderPVBar(this.config, this.hass)}
                </div>
            ` : '',
            battery_bar: this.config.battery_bar?.show ? html`
                <div style="margin-top: ${s.battery_bar_gap || '6px'}; margin-bottom: ${s.battery_bar_gap || '6px'};">
                    ${renderBatteryBar(this.config, this.hass)}
                </div>
            ` : '',
            info_bar: this.config.info_bar?.show ? html`
                <div style="margin-top: ${s.infobar_gap || '6px'}; margin-bottom: ${s.infobar_gap || '6px'};">
                    ${renderInfoBar(this.config, this.hass, handleTapBound)}
                </div>
            ` : '',
            cards: html`
                <div class="grid" style="gap: ${this.config.grid_gap}; grid-template-columns: ${gridTemplateColumns};">
                    ${this._renderCards(s, getCardStyleBound, getTextBound, calcConsumerPowerBound, handleActionBound)}
                </div>
            `,
            consumers: renderConsumers(this.config, this.hass, this._consumersVisible, handleConsumerActionBound)
        };

        return html`
            ${renderWarnings(warnings)}
            ${order.map(key => sections[key] || '')}
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
    : ' Version: 0.0.1';

console.info(
    '%c PV-MONITOR-CARD %c' + buildInfo,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray'
);
