import { html, TemplateResult } from 'lit';
import { ValidationWarning } from '../../utils/validators';

export function renderWarnings(warnings: ValidationWarning[]): TemplateResult {
    if (!warnings || warnings.length === 0) {
        return html``;
    }

    return html`
        <div class="warnings-container" style="
            background: rgba(244, 67, 54, 0.1);
            border: 1px solid rgba(244, 67, 54, 0.3);
            border-radius: 8px;
            padding: 8px 12px;
            margin-bottom: 12px;
        ">
            ${warnings.map(warning => html`
                <div class="warning-item" style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 4px 0;
                    font-size: 0.9em;
                    color: rgba(244, 67, 54, 1);
                ">
                    <ha-icon icon="mdi:alert" style="font-size: 1.2em;"></ha-icon>
                    <span>${warning.message}</span>
                </div>
            `)}
        </div>
    `;
}
