import { html, TemplateResult } from 'lit';

export function renderActionTargetSelector(
    label: string,
    value: 'none' | 'entity' | 'custom_entity' | 'custom_action' | undefined,
    onChange: (value: 'none' | 'entity' | 'custom_entity' | 'custom_action') => void,
    options?: { helper?: string; translations?: any }
): TemplateResult {
    const t = options?.translations?.editor || {};
    
    const items = [
        { value: 'none', label: t.action_target_none || 'Keine Aktion' },
        { value: 'entity', label: t.action_target_entity || 'Entity Toggle' },
        { value: 'custom_entity', label: t.action_target_custom_entity || 'Custom Entity Toggle' },
        { value: 'custom_action', label: t.action_target_custom_action || 'Custom Action' }
    ];

    return html`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options?.helper ? html`<div class="info-text">${options.helper}</div>` : ''}
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${value || 'none'}
                    .items=${items}
                    item-value-path="value"
                    item-label-path="label"
                    @value-changed=${(ev: any) => {
                        const newValue = ev.detail?.value;
                        if (newValue) onChange(newValue);
                    }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}
