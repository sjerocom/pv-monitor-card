import { html } from "lit";
import { convertToHex } from "../../utils/color-utils";

export function renderColorPicker(
    label: string,
    value: string | undefined,
    onChange: (value: string) => void,
    options: {
        placeholder?: string;
        helper?: string;
    } = {}
) {
    return html`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options.helper ? html`<div class="info-text">${options.helper}</div>` : ''}
            </div>
            <div class="option-control">
                <div style="display: flex; gap: 8px; align-items: center;">
                    <input
                        type="color"
                        .value=${convertToHex(value || '')}
                        @input=${(ev: Event) => {
                            const target = ev.target as HTMLInputElement;
                            onChange(target.value);
                        }}
                        style="width: 50px; height: 36px; cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px;"
                    />
                    <ha-textfield
                        .value=${value || ''}
                        .placeholder=${options.placeholder || 'rgba(255, 255, 255, 1) or #ffffff'}
                        @input=${(ev: CustomEvent) => {
                            const target = ev.target as any;
                            onChange(target.value);
                        }}
                        style="flex: 1;"
                    ></ha-textfield>
                </div>
            </div>
        </div>
    `;
}
