import { html } from "lit";

export function renderNumberfield(
    label: string,
    value: number | undefined,
    onChange: (value: number | undefined) => void,
    options: {
        min?: number;
        max?: number;
        step?: number;
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
                <ha-textfield
                    type="number"
                    .value=${value?.toString() || ''}
                    .min=${options.min?.toString()}
                    .max=${options.max?.toString()}
                    .step=${options.step?.toString() || '1'}
                    @input=${(ev: CustomEvent) => {
                        const target = ev.target as any;
                        const newValue = target.value ? Number(target.value) : undefined;
                        onChange(newValue);
                    }}
                ></ha-textfield>
            </div>
        </div>
    `;
}
