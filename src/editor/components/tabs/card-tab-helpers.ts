import { html } from "lit";
import { PVMonitorCardConfig } from "../../../pv-monitor-card-types";
import { renderCollapsibleSection } from "../sections/collapsible-section";
import { renderIconPicker } from "../fields/icon-picker";
import { renderSwitch } from "../fields/switch";
import { renderEntityPicker, EntityPickerState } from "../fields/entity-picker";
import { renderTextfield } from "../fields/textfield";
import { renderColorPicker } from "../fields/color-picker";
import { renderActionSelector } from "../fields/action-selector";

export function renderAnimationSelector(
    cardType: 'pv' | 'batterie' | 'haus' | 'netz',
    config: any,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    if (!config?.animation) return html``;

    const animationOptions = [
        { value: 'rotating-dots', label: t.editor.animation_rotating_dots || 'Rotating Dots' },
        { value: 'particle-field', label: t.editor.animation_particle_field || 'Particle Field' },
        { value: 'electric-arc', label: t.editor.animation_electric_arc || 'Electric Arc' }
    ];

    return html`
        <div class="option">
            <div class="option-label">
                ${t.editor.animation_style || 'Animation Style'}
                <div class="info-text">${t.editor.animation_style_helper || 'Choose the animation effect'}</div>
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${config.animation_style || 'rotating-dots'}
                    .items=${animationOptions}
                    item-value-path="value"
                    item-label-path="label"
                    @value-changed=${(ev: any) => {
                        const newValue = ev.detail?.value;
                        if (newValue) onChange([cardType, 'animation_style'], newValue);
                    }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}

export function renderCardTapActions(
    cardType: 'pv' | 'batterie' | 'haus' | 'netz',
    config: any,
    expandedSections: Set<string>,
    onToggleSection: (id: string) => void,
    onTapActionChange: (path: string[], key: string, value: any) => void,
    t: any
) {
    return renderCollapsibleSection(
        `${cardType}_tap_actions`,
        'mdi:gesture-tap',
        'Tap Actions',
        html`
            ${renderActionSelector(
                'Tap Action',
                config?.tap_action,
                (key, value) => onTapActionChange([cardType, 'tap_action'], key, value),
                { translations: t }
            )}
            ${renderActionSelector(
                'Double Tap',
                config?.double_tap_action,
                (key, value) => onTapActionChange([cardType, 'double_tap_action'], key, value),
                { translations: t }
            )}
            ${renderActionSelector(
                'Hold Action',
                config?.hold_action,
                (key, value) => onTapActionChange([cardType, 'hold_action'], key, value),
                { translations: t }
            )}
        `,
        expandedSections.has(`${cardType}_tap_actions`),
        () => onToggleSection(`${cardType}_tap_actions`)
    );
}

export function renderCardTexts(
    cardType: 'pv' | 'batterie' | 'haus' | 'netz',
    config: any,
    hass: any,
    expandedSections: Set<string>,
    entityPickerStates: Map<string, EntityPickerState>,
    onToggleSection: (id: string) => void,
    onEntityPickerStateChange: (key: string, state: EntityPickerState) => void,
    onChange: (path: string[], value: any) => void,
    t: any,
    additionalContent?: any
) {
    return renderCollapsibleSection(
        `${cardType}_texts`,
        'mdi:text',
        t.editor.additional_texts,
        html`
            ${additionalContent || ''}
            ${renderEntityPicker(
                t.editor.secondary_entity,
                config?.secondary_entity,
                hass,
                entityPickerStates.get(`${cardType}.secondary_entity`) || { results: [], show: false },
                (value) => onChange([cardType, 'secondary_entity'], value),
                (state) => onEntityPickerStateChange(`${cardType}.secondary_entity`, state),
                { helper: t.editor.secondary_entity_helper, translations: { editor: t.editor } }
            )}
            ${renderTextfield(
                t.editor.secondary_text,
                config?.secondary_text,
                (value) => onChange([cardType, 'secondary_text'], value),
                { helper: t.editor.secondary_text_helper }
            )}
            ${renderEntityPicker(
                t.editor.tertiary_entity,
                config?.tertiary_entity,
                hass,
                entityPickerStates.get(`${cardType}.tertiary_entity`) || { results: [], show: false },
                (value) => onChange([cardType, 'tertiary_entity'], value),
                (state) => onEntityPickerStateChange(`${cardType}.tertiary_entity`, state),
                { translations: { editor: t.editor } }
            )}
            ${renderTextfield(
                t.editor.tertiary_text,
                config?.tertiary_text,
                (value) => onChange([cardType, 'tertiary_text'], value)
            )}
        `,
        expandedSections.has(`${cardType}_texts`),
        () => onToggleSection(`${cardType}_texts`)
    );
}

export function renderCardStyling(
    cardType: 'pv' | 'batterie' | 'haus' | 'netz',
    config: any,
    expandedSections: Set<string>,
    onToggleSection: (id: string) => void,
    onChange: (path: string[], value: any) => void,
    t: any
) {
    return renderCollapsibleSection(
        `${cardType}_styling`,
        'mdi:palette',
        t.editor.styling,
        html`
            ${renderColorPicker(
                t.editor.background_color,
                config?.style?.background_color,
                (value) => onChange([cardType, 'style', 'background_color'], value),
                { placeholder: 'rgba(21, 20, 27, 1)' }
            )}
            ${renderColorPicker(
                t.editor.border_color,
                config?.style?.border_color,
                (value) => onChange([cardType, 'style', 'border_color'], value),
                { placeholder: 'rgba(255, 255, 255, 0.1)' }
            )}
            ${renderColorPicker(
                t.editor.primary_color,
                config?.style?.primary_color,
                (value) => onChange([cardType, 'style', 'primary_color'], value)
            )}
            ${renderColorPicker(
                t.editor.secondary_color,
                config?.style?.secondary_color,
                (value) => onChange([cardType, 'style', 'secondary_color'], value)
            )}
            ${renderColorPicker(
                t.editor.icon_color,
                config?.style?.icon_color,
                (value) => onChange([cardType, 'style', 'icon_color'], value)
            )}
        `,
        expandedSections.has(`${cardType}_styling`),
        () => onToggleSection(`${cardType}_styling`)
    );
}
