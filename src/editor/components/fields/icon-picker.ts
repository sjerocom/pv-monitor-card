import { html } from "lit";

export function renderIconPicker(
    label: string,
    value: string | undefined,
    hass: any,
    onChange: (value: string) => void,
    options: {
        helper?: string;
        translations?: any;
    } = {}
) {
    return html`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options.helper ? html`<div class="info-text">${options.helper}</div>` : ''}
            </div>
            <div class="option-control">
                <ha-icon-picker
                    .hass=${hass}
                    .value=${value || ''}
                    .label=${options.translations?.editor?.select_icon || 'Select Icon'}
                    @value-changed=${(ev: any) => {
                        ev.stopPropagation();
                        const newValue = ev.detail?.value || '';
                        onChange(newValue);
                    }}
                ></ha-icon-picker>
            </div>
        </div>
    `;
}
