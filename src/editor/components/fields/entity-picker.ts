import { html } from "lit";

export interface EntityPickerState {
    results: string[];
    show: boolean;
}

export function renderEntityPicker(
    label: string,
    value: string | undefined,
    hass: any,
    state: EntityPickerState,
    onChange: (value: string) => void,
    onStateChange: (state: EntityPickerState) => void,
    options: {
        helper?: string;
        required?: boolean;
        translations?: any;
    } = {}
) {
    if (!hass) return html``;

    const entities = Object.keys(hass.states).sort();
    const showDropdown = state.show;

    return html`
        <div class="option" style="${showDropdown ? 'z-index: 1000; position: relative;' : ''}">
            <div class="option-label ${options.required ? 'required' : ''}">
                ${label}
                ${options.helper ? html`<div class="info-text">${options.helper}</div>` : ''}
            </div>
            <div class="option-control">
                <div class="autocomplete-wrapper">
                    <ha-textfield
                        .value=${value || ''}
                        .placeholder=${options.translations?.editor?.select_entity || 'Select Entity'}
                        @input=${(ev: CustomEvent) => {
                            const target = ev.target as any;
                            const inputValue = target.value;

                            const filtered = inputValue
                                ? entities.filter(e => e.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 50)
                                : [];

                            onStateChange({
                                results: filtered,
                                show: filtered.length > 0
                            });

                            onChange(inputValue || '');
                        }}
                        @focus=${(ev: Event) => {
                            const currentValue = value || '';
                            if (!currentValue) {
                                onStateChange({
                                    results: entities.slice(0, 50),
                                    show: true
                                });
                            }

                            setTimeout(() => {
                                const target = ev.target as HTMLElement;
                                const dropdown = target.parentElement?.querySelector('.autocomplete-dropdown') as HTMLElement;
                                if (dropdown) {
                                    const rect = target.getBoundingClientRect();
                                    dropdown.style.top = `${rect.bottom + 4}px`;
                                    dropdown.style.left = `${rect.left}px`;
                                    dropdown.style.width = `${Math.max(rect.width, 400)}px`;
                                }
                            }, 10);
                        }}
                        @blur=${() => {
                            setTimeout(() => {
                                onStateChange({ ...state, show: false });
                            }, 200);
                        }}
                    ></ha-textfield>

                    ${showDropdown ? html`
                        <div class="autocomplete-dropdown" @mousedown=${(ev: Event) => ev.preventDefault()}>
                            ${state.results.map(entity => html`
                                <div
                                    class="autocomplete-item"
                                    @click=${() => {
                                        onChange(entity);
                                        onStateChange({ ...state, show: false });
                                    }}
                                >
                                    ${entity}
                                </div>
                            `)}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}
