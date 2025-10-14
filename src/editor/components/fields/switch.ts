import { html } from "lit";

export function renderSwitch(
    label: string,
    value: boolean | undefined,
    onChange: (value: boolean) => void,
    options: {
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
                <ha-switch
                    .checked=${value === true}
                    @change=${(ev: CustomEvent) => {
                        const target = ev.target as any;
                        onChange(target.checked);
                    }}
                ></ha-switch>
            </div>
        </div>
    `;
}
