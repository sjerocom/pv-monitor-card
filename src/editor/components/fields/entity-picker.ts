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
        include_domains?: string[];
    } = {}
) {
    if (!hass) return html``;

    let entities = Object.keys(hass.states).sort();
    
    // Filter by domains if specified
    if (options.include_domains && options.include_domains.length > 0) {
        entities = entities.filter(entityId => {
            const domain = entityId.split('.')[0];
            return options.include_domains!.includes(domain);
        });
    }
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

                            let filtered = inputValue
                                ? entities.filter(e => e.toLowerCase().includes(inputValue.toLowerCase()))
                                : entities;
                            
                            filtered = filtered.slice(0, 50);

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
