import { html, TemplateResult } from "lit";
import { CardStyle } from "../../types";
import { getAnimationStyleByType } from "../../utils";

export interface CardRenderConfig {
    cardConfig: any;
    icon: string;
    primaryValue: string;
    secondaryText?: string;
    tertiaryText?: string;
    animStyle: { color: string; duration: number; show: boolean };
    iconColor?: string;
    customIconStyle?: string;
    isHausCard?: boolean;
}

export function renderCard(
    config: CardRenderConfig,
    style: any,
    getCardStyle: (cardStyle?: CardStyle) => string,
    handleAction: (event: Event, actions: any, isHausCard?: boolean) => void
): TemplateResult {
    const s = style;
    const cardStyle = config.cardConfig?.style;

    const iconColor = config.iconColor || (config.animStyle.show && config.animStyle.color ? config.animStyle.color : '');
    const primaryColor = cardStyle?.primary_color || s.primary_color;
    const secondaryColor = cardStyle?.secondary_color || s.secondary_color;

    const iconStyle = `font-size: ${s.icon_size}; opacity: ${s.icon_opacity}; ${config.customIconStyle || ''} ${iconColor ? `color: ${iconColor};` : ''}`;
    const primaryStyle = `font-size: ${s.primary_size}; color: ${primaryColor}; opacity: ${s.primary_font_opacity}; font-weight: ${s.primary_font_weight}; line-height: ${s.primary_line_height};`;
    const secondaryStyle = `font-size: ${s.secondary_size}; color: ${secondaryColor}; opacity: ${s.secondary_font_opacity}; font-weight: ${s.secondary_font_weight}; line-height: ${s.secondary_line_height};`;
    const tertiaryStyle = `font-size: ${s.tertiary_size}; color: ${s.tertiary_color}; opacity: ${s.tertiary_font_opacity}; font-weight: ${s.tertiary_font_weight}; line-height: ${s.tertiary_line_height};`;

    const animationType = config.cardConfig?.animation_style || 'rotating-dots';
    const isHaus = config.isHausCard || false;

    return html`
        <div class="card"
             style="${getCardStyle(cardStyle)}"
             @click=${(e: Event) => handleAction(e, { tap: config.cardConfig?.tap_action }, isHaus)}
             @dblclick=${(e: Event) => handleAction(e, { double_tap: config.cardConfig?.double_tap_action }, isHaus)}
             @contextmenu=${(e: Event) => handleAction(e, { hold: config.cardConfig?.hold_action }, isHaus)}>
            ${config.animStyle.show && config.animStyle.color ? html`
                <div style="${getAnimationStyleByType(animationType, config.animStyle.color, config.animStyle.duration)}"></div>
            ` : ''}
            <div class="icon" style="${iconStyle}; margin-bottom: ${s.icon_margin};"><ha-icon .icon=${config.icon} style="--mdc-icon-size: ${s.icon_size}; width: ${s.icon_size}; height: ${s.icon_size};"></ha-icon></div>
            <div class="primary" style="${primaryStyle}">${config.primaryValue}</div>
            ${config.secondaryText ? html`<div class="secondary" style="${secondaryStyle}">${config.secondaryText}</div>` : ''}
            ${config.tertiaryText ? html`<div class="tertiary" style="${tertiaryStyle}">${config.tertiaryText}</div>` : ''}
        </div>
    `;
}
