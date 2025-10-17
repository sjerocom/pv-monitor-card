import { html } from "lit";
import { TapAction } from "../../../types";

export function renderActionSelector(
    label: string,
    action: TapAction | undefined,
    onChange: (key: string, value: any) => void,
    options: {
        translations?: any;
    } = {}
) {
    const t = options.translations;

    const actions = [
        { value: 'none', label: t?.editor?.action_none || 'None' },
        { value: 'more-info', label: t?.editor?.action_more_info || 'More Info' },
        { value: 'navigate', label: t?.editor?.action_navigate || 'Navigate' },
        { value: 'url', label: t?.editor?.action_url || 'URL' },
        { value: 'call-service', label: t?.editor?.action_call_service || 'Call Service' }
    ];

    return html`
        <div class="option">
            <div class="option-label">${label}</div>
            <div class="option-control">
                <ha-combo-box
                    .value=${action?.action || 'none'}
                    .items=${actions}
                    item-value-path="value"
                    item-label-path="label"
                    @value-changed=${(ev: any) => onChange('action', ev.detail.value)}
                ></ha-combo-box>
            </div>
        </div>

        ${action?.action === 'navigate' ? html`
            <div class="option">
                <div class="option-label">${t?.editor?.action_navigation_path || 'Navigation Path'}</div>
                <div class="option-control">
                    <ha-textfield
                        .value=${action.navigation_path || ''}
                        placeholder="/lovelace/view"
                        @input=${(ev: any) => onChange('navigation_path', ev.target.value)}
                    ></ha-textfield>
                </div>
            </div>
        ` : ''}

        ${action?.action === 'url' ? html`
            <div class="option">
                <div class="option-label">${t?.editor?.action_url_label || 'URL'}</div>
                <div class="option-control">
                    <ha-textfield
                        .value=${action.url_path || ''}
                        placeholder="https://example.com"
                        @input=${(ev: any) => onChange('url_path', ev.target.value)}
                    ></ha-textfield>
                </div>
            </div>
        ` : ''}

        ${action?.action === 'call-service' ? html`
            <div class="option">
                <div class="option-label">${t?.editor?.action_service || 'Service'}</div>
                <div class="option-control">
                    <ha-textfield
                        .value=${action.service || ''}
                        placeholder="light.turn_on"
                        @input=${(ev: any) => onChange('service', ev.target.value)}
                    ></ha-textfield>
                </div>
            </div>
        ` : ''}
    `;
}
