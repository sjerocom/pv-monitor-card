import { html } from "lit";

export function renderTextfield(
    label: string,
    value: string | undefined,
    onChange: (value: string) => void,
    options: {
        placeholder?: string;
        helper?: string;
        required?: boolean;
    } = {}
) {
    return html`
        <div class="option">
            <div class="option-label ${options.required ? 'required' : ''}">
                ${label}
                ${options.helper ? html`<div class="info-text">${options.helper}</div>` : ''}
            </div>
            <div class="option-control">
                <ha-textfield
                    .value=${value || ''}
                    .placeholder=${options.placeholder || ''}
                    @input=${(ev: CustomEvent) => {
                        const target = ev.target as any;
                        onChange(target.value);
                    }}
                ></ha-textfield>
            </div>
        </div>
    `;
}
