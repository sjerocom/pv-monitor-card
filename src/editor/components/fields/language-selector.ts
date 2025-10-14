import { html } from "lit";
import { SupportedLanguage, detectLanguage } from "../../../pv-monitor-card-i18n";

export function renderLanguageSelector(
    currentLang: SupportedLanguage | undefined,
    onChange: (value: SupportedLanguage) => void,
    options: {
        translations?: any;
    } = {}
) {
    const lang = currentLang || detectLanguage();
    const t = options.translations;

    return html`
        <div class="option">
            <div class="option-label">
                ${t?.editor?.language || 'Language'}
                <div class="info-text">${t?.editor?.language_helper || 'Select interface language'}</div>
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${lang}
                    .items=${[
                        { value: 'de', label: 'Deutsch' },
                        { value: 'en', label: 'English' },
                        { value: 'fr', label: 'Français' },
                        { value: 'it', label: 'Italiano' },
                        { value: 'es', label: 'Español' }
                    ]}
                    item-value-path="value"
                    item-label-path="label"
                    @value-changed=${(ev: any) => {
                        const newValue = ev.detail?.value;
                        if (newValue && newValue !== lang) {
                            onChange(newValue as SupportedLanguage);
                        }
                    }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}
