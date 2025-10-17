import { html } from "lit";
import { getAllThemes, applyThemeToConfig } from "../../../themes/index";
import { PVMonitorCardConfig } from "../../../types";

export function renderThemeSelector(
    currentTheme: string | undefined,
    config: PVMonitorCardConfig,
    onChange: (config: PVMonitorCardConfig) => void,
    options: {
        translations?: any;
    } = {}
) {
    const t = options.translations;
    const allThemes = getAllThemes();
    const themeItems = allThemes.map(theme => ({
        value: theme.id,
        label: theme.name
    }));

    return html`
        <div class="option">
            <div class="option-label">
                ${t?.editor?.theme || 'Theme'}
                <div class="info-text">${t?.editor?.theme_helper || 'Select a predefined theme'}</div>
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${currentTheme || ''}
                    .items=${themeItems}
                    item-value-path="value"
                    item-label-path="label"
                    allow-custom-value
                    @value-changed=${async (ev: any) => {
                        const newValue = ev.detail?.value;
                        const newConfig = { ...config };

                        if (!newValue || newValue === '') {
                            delete newConfig.theme;
                            onChange(newConfig);
                        } else {
                            newConfig.theme = newValue;
                            const themedConfig = await applyThemeToConfig(newConfig, newValue);
                            onChange(themedConfig);
                        }
                    }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}
