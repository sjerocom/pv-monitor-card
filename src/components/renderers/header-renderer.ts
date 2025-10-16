import { html, TemplateResult } from "lit";
import { PVMonitorCardConfig } from "../../types";

export function renderHeader(config: PVMonitorCardConfig): TemplateResult {
    const s = config.style!;
    const showTitle = config.show_title && config.title;
    const showSubtitle = config.show_subtitle && config.subtitle;
    const showIcon = config.show_icon && config.icon;

    if (!showTitle && !showSubtitle) return html``;

    const titleStyle = `
        text-align: ${s.title_align};
        font-size: ${s.title_size};
        line-height: ${s.title_line_height};
        font-weight: ${s.title_font_weight};
        color: ${s.title_color};
        margin: 0;
    `;

    const subtitleStyle = `
        text-align: ${s.subtitle_align};
        font-size: ${s.subtitle_size};
        line-height: ${s.subtitle_line_height};
        font-weight: ${s.subtitle_font_weight};
        color: ${s.subtitle_color};
        margin: ${s.title_subtitle_gap || '4px'} 0 0 0;
    `;

    const headerIconStyle = `
        font-size: ${s.header_icon_size};
        color: ${s.header_icon_color};
        margin-right: ${s.header_icon_margin};
    `;

    const headerBackgroundEnabled = s.header_background_enabled ?? false;
    const headerWidth = s.header_width ?? 'auto';

    let headerStyle = '';

    if (headerBackgroundEnabled) {
        headerStyle = `
            background: ${s.header_background_color};
            border: 1px solid ${s.header_border_color};
            border-radius: ${s.header_border_radius};
            padding: ${s.header_padding};
            box-shadow: ${s.header_box_shadow};
            width: ${headerWidth === 'full' ? 'calc(100% - 2 * var(--ha-card-border-width, 1px))' : 'fit-content'};
            ${headerWidth === 'auto' ? 'margin-left: auto; margin-right: auto;' : ''}
            box-sizing: border-box;
            margin-bottom: ${s.header_margin_bottom || '12px'};
        `;
    } else {
        headerStyle = `margin-bottom: ${s.header_margin_bottom || '12px'};`;
    }

    return html`
        <div class="card-header" style="${headerStyle}">
            ${showIcon ? html`
                <div class="card-header-with-icon">
                    <ha-icon .icon=${config.icon} style="${headerIconStyle} --mdc-icon-size: ${s.header_icon_size}; width: ${s.header_icon_size}; height: ${s.header_icon_size};"></ha-icon>
                    <div class="card-header-text">
                        ${showTitle ? html`<h2 style="${titleStyle}">${config.title}</h2>` : ''}
                        ${showSubtitle ? html`<p style="${subtitleStyle}">${config.subtitle}</p>` : ''}
                    </div>
                </div>
            ` : html`
                ${showTitle ? html`<h2 style="${titleStyle}">${config.title}</h2>` : ''}
                ${showSubtitle ? html`<p style="${subtitleStyle}">${config.subtitle}</p>` : ''}
            `}
        </div>
    `;
}
