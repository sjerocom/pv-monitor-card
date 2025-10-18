import { html, TemplateResult } from "lit";

type LayoutElement = 'header' | 'pv_bar' | 'cards' | 'info_bar' | 'battery_bar' | 'consumers';

const LAYOUT_ELEMENTS: LayoutElement[] = ['header', 'pv_bar', 'cards', 'info_bar', 'battery_bar', 'consumers'];

const LAYOUT_ICONS: Record<LayoutElement, string> = {
    header: 'mdi:card-text',
    pv_bar: 'mdi:solar-panel-large',
    cards: 'mdi:view-grid',
    info_bar: 'mdi:information',
    battery_bar: 'mdi:battery-charging',
    consumers: 'mdi:flash'
};

export function renderLayoutOrderSelector(
    order: LayoutElement[],
    onChange: (value: LayoutElement[]) => void,
    t: any
): TemplateResult {
    const currentOrder = order.length > 0 ? order : LAYOUT_ELEMENTS;

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newOrder = [...currentOrder];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        onChange(newOrder);
    };

    const moveDown = (index: number) => {
        if (index === currentOrder.length - 1) return;
        const newOrder = [...currentOrder];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        onChange(newOrder);
    };

    const getLabel = (element: LayoutElement): string => {
        const labels: Record<LayoutElement, string> = {
            header: t.editor.layout_header || 'Header',
            pv_bar: t.editor.layout_pv_bar || 'PV Bar',
            cards: t.editor.layout_cards || 'Cards',
            info_bar: t.editor.layout_info_bar || 'Info Bar',
            battery_bar: t.editor.layout_battery_bar || 'Battery Bar',
            consumers: t.editor.layout_consumers || 'Consumers'
        };
        return labels[element];
    };

    return html`
        <div class="layout-order-selector">
            ${currentOrder.map((element, index) => html`
                <div class="layout-order-item">
                    <div class="layout-order-info">
                        <ha-icon .icon=${LAYOUT_ICONS[element]}></ha-icon>
                        <span>${getLabel(element)}</span>
                    </div>
                    <div class="layout-order-controls">
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
            .layout-order-selector {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .layout-order-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                background: var(--card-background-color, #1c1c1c);
                border-radius: 8px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }
            .layout-order-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .layout-order-info ha-icon {
                color: var(--primary-text-color, #ffffff);
            }
            .layout-order-info span {
                font-size: 14px;
                color: var(--primary-text-color, #ffffff);
            }
            .layout-order-controls {
                display: flex;
                gap: 4px;
            }
            .layout-order-controls ha-icon-button[disabled] {
                opacity: 0.3;
            }
        </style>
    `;
}
