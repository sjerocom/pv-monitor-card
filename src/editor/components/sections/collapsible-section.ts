import { html } from "lit";

export function renderCollapsibleSection(
    sectionId: string,
    icon: string,
    title: string,
    content: any,
    isExpanded: boolean,
    onToggle: () => void,
    infoText?: string
) {
    return html`
        <div class="section">
            <div class="section-header" @click=${onToggle}>
                <ha-icon icon="${icon}"></ha-icon>
                ${title}
                <ha-icon
                    class="expand-icon ${isExpanded ? 'expanded' : ''}"
                    icon="mdi:chevron-down"
                ></ha-icon>
            </div>
            <div class="section-content ${isExpanded ? '' : 'collapsed'}">
                ${infoText ? html`<div class="info-text" style="margin-bottom: 12px;">${infoText}</div>` : ''}
                ${content}
            </div>
        </div>
    `;
}
