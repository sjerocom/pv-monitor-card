import { html, TemplateResult } from 'lit';
import { PVMonitorCardConfig } from '../../../types';

export function renderCardOrderSelector(
    label: string,
    config: PVMonitorCardConfig,
    onChange: (path: string[], value: any) => void,
    t: any
): TemplateResult {
    const defaultOrder = ['pv', 'battery', 'house', 'grid'];
    const currentOrder = config.layout?.cards_order || defaultOrder;
    const visibility = config.layout?.cards_visibility || {
        pv: config.pv?.show !== false,
        battery: config.batterie?.show !== false,
        house: config.haus?.show !== false,
        grid: config.netz?.show !== false
    };

    const cardLabels: Record<string, string> = {
        pv: t.editor.card_pv || 'PV',
        battery: t.editor.card_battery || 'Battery',
        house: t.editor.card_house || 'House',
        grid: t.editor.card_grid || 'Grid'
    };

    const cardIcons: Record<string, string> = {
        pv: 'mdi:solar-power',
        battery: 'mdi:battery',
        house: 'mdi:home',
        grid: 'mdi:transmission-tower'
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newOrder = [...currentOrder];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        console.log('Card Order Selector - moveUp:', { from: index, to: index - 1, newOrder });
        onChange(['layout', 'cards_order'], newOrder);
    };

    const moveDown = (index: number) => {
        if (index === currentOrder.length - 1) return;
        const newOrder = [...currentOrder];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        console.log('Card Order Selector - moveDown:', { from: index, to: index + 1, newOrder });
        onChange(['layout', 'cards_order'], newOrder);
    };

    const toggleVisibility = (card: string) => {
        const newVisibility = { ...visibility, [card]: !visibility[card as keyof typeof visibility] };
        console.log('Card Order Selector - toggleVisibility:', { card, newVisibility });
        onChange(['layout', 'cards_visibility'], newVisibility);
        
        // Sync mit show-Properties
        const showPaths: Record<string, string[]> = {
            pv: ['pv', 'show'],
            battery: ['batterie', 'show'],
            house: ['haus', 'show'],
            grid: ['netz', 'show']
        };
        if (showPaths[card]) {
            onChange(showPaths[card], newVisibility[card as keyof typeof newVisibility]);
        }
    };

    return html`
        <div class="card-order-selector">
            ${currentOrder.map((card, index) => html`
                <div class="card-order-item">
                    <div class="card-order-info">
                        <ha-icon
                            .icon="${visibility[card as keyof typeof visibility] ? 'mdi:eye' : 'mdi:eye-off'}"
                            @click="${() => toggleVisibility(card)}"
                            style="cursor: pointer; color: ${visibility[card as keyof typeof visibility] ? '#4caf50' : '#999'};"
                        ></ha-icon>
                        <ha-icon .icon="${cardIcons[card]}"></ha-icon>
                        <span style="${!visibility[card as keyof typeof visibility] ? 'opacity: 0.5;' : ''}">${cardLabels[card]}</span>
                    </div>
                    <div class="card-order-controls">
                        <ha-icon-button
                            .disabled=${index === 0}
                            @click=${() => moveUp(index)}
                        >
                            <ha-icon icon="mdi:arrow-up"></ha-icon>
                        </ha-icon-button>
                        <ha-icon-button
                            .disabled=${index === currentOrder.length - 1}
                            @click=${() => moveDown(index)}
                        >
                            <ha-icon icon="mdi:arrow-down"></ha-icon>
                        </ha-icon-button>
                    </div>
                </div>
            `)}
        </div>
        <style>
            .card-order-selector {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .card-order-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                background: var(--card-background-color, #1c1c1c);
                border-radius: 8px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }
            .card-order-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .card-order-info ha-icon {
                color: var(--primary-text-color, #ffffff);
            }
            .card-order-info span {
                font-size: 14px;
                color: var(--primary-text-color, #ffffff);
            }
            .card-order-controls {
                display: flex;
                gap: 4px;
            }
            .card-order-controls ha-icon-button[disabled] {
                opacity: 0.3;
            }
        </style>
    `;
}
