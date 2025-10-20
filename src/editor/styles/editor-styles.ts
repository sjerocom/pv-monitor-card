import { css } from "lit";

export const editorStyles = css`
    :host {
        display: block;
        position: relative;
        z-index: 1;
    }

    :host ::slotted(*),
    :host * {
        --ha-entity-picker-z-index: 9999;
        --mdc-menu-z-index: 9999;
        --mdc-dialog-z-index: 9999;
    }

    .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: relative;
    }

    .tabs {
        display: flex;
        gap: 8px;
        border-bottom: 2px solid rgba(127, 127, 127, 0.3);
        margin-bottom: 4px;
        flex-wrap: wrap;
    }

    .tab {
        padding: 8px 16px;
        cursor: pointer;
        border: none;
        background: none;
        color: inherit;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        font-size: 14px;
        transition: all 0.2s;
    }

    .tab:hover {
        background: rgba(127, 127, 127, 0.1);
    }

    .tab.active {
        border-bottom-color: #3b82f6;
        color: #3b82f6;
        font-weight: 500;
    }

    .tab-content {
        display: none;
    }

    .tab-content.active {
        display: block;
    }

    .section {
        margin-bottom: 24px;
        position: relative;
        z-index: 1;
    }

    .section-header {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
        color: inherit;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
        padding: 8px;
        margin: -8px;
        border-radius: 8px;
        transition: background 0.2s;
    }

    .section-header:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .section-header ha-icon {
        --mdc-icon-size: 20px;
    }

    .section-header .expand-icon {
        margin-left: auto;
        transition: transform 0.2s;
    }

    .section-header .expand-icon.expanded {
        transform: rotate(180deg);
    }

    .section-content {
        margin-top: 12px;
        overflow: hidden;
    }

    .section-content.collapsed {
        display: none;
    }

    .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        gap: 16px;
        position: relative;
        z-index: 1;
    }

    .option-label {
        flex: 1;
        font-size: 14px;
        color: inherit;
    }

    .option-label.required::before {
        content: "* ";
        color: #ff5252;
        font-weight: bold;
    }

    .option-control {
        flex: 0 0 auto;
        min-width: 200px;
        position: relative;
    }

    ha-entity-picker,
    ha-selector-entity {
        position: relative;
        z-index: 100;
    }

    ha-entity-picker[opened],
    ha-selector-entity[opened] {
        z-index: 1000;
    }

    ha-combo-box {
        position: relative;
        color: #e1e1e1 !important;
    }

    ha-combo-box mwc-list-item {
        color: #e1e1e1 !important;
        background-color: #2c2c2c !important;
    }

    ha-combo-box mwc-menu {
        background-color: #2c2c2c !important;
    }

    ha-textfield, ha-select {
        width: 100%;
    }

    .autocomplete-wrapper {
        position: relative;
        width: 100%;
        z-index: 100;
    }

    .autocomplete-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        min-width: 100%;
        max-height: 200px;
        overflow-y: auto;
        background: #1c1c1c;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 4px;
        z-index: 99999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }

    .autocomplete-item {
        padding: 8px 12px;
        cursor: pointer;
        color: #e1e1e1;
        font-size: 14px;
        background: #1c1c1c;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .autocomplete-item:hover {
        background: rgba(255, 255, 255, 0.08);
    }

    .subsection {
        margin-left: 16px;
        padding-left: 16px;
        border-left: 2px solid rgba(127, 127, 127, 0.3);
        margin-top: 8px;
    }

    .info-text {
        font-size: 12px;
        color: rgba(127, 127, 127, 0.8);
        margin-top: 4px;
        font-style: italic;
    }

    .divider {
        height: 1px;
        background: rgba(127, 127, 127, 0.3);
        margin: 16px 0;
    }

    .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .consumer-section {
        position: relative;
        margin-bottom: 16px;
        border: 1px solid rgba(127, 127, 127, 0.3);
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.1);
        padding: 12px;
    }

    .consumer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 8px;
        margin: -8px;
        border-radius: 8px;
        user-select: none;
    }

    .consumer-header:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .consumer-title {
        font-weight: bold;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
    }

    .consumer-title-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .consumer-header-actions {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
    }

    .consumer-header-actions ha-icon-button {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 18px;
    }

    .consumer-content {
        margin-top: 12px;
        overflow: hidden;
    }

    .consumer-content.collapsed {
        display: none;
    }

    .consumer-subsection {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid rgba(127, 127, 127, 0.2);
    }

    .consumer-subsection-header {
        font-weight: 500;
        margin-bottom: 12px;
        cursor: pointer;
        padding: 8px;
        margin: -8px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
    }

    .consumer-subsection-header:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .consumer-subsection-content {
        margin-top: 12px;
    }

    .consumer-subsection-content.collapsed {
        display: none;
    }

    .expand-icon {
        transition: transform 0.2s;
    }

    .expand-icon.expanded {
        transform: rotate(180deg);
    }

    /* Nested Tabs Styles */
    .sub-tabs {
        display: flex;
        gap: 4px;
        border-bottom: 2px solid rgba(127, 127, 127, 0.2);
        margin: 0 0 12px 0;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;
    }

    .sub-tab {
        padding: 8px 16px;
        cursor: pointer;
        border: none;
        background: rgba(127, 127, 127, 0.08);
        color: rgba(255, 255, 255, 0.7);
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        font-size: 14px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 6px 6px 0 0;
    }

    .sub-tab:hover {
        background: rgba(127, 127, 127, 0.18);
        color: rgba(255, 255, 255, 0.9);
    }

    .sub-tab.active {
        border-bottom-color: #3b82f6;
        background: rgba(59, 130, 246, 0.15);
        color: #60a5fa;
        font-weight: 500;
    }

    .sub-tab ha-icon {
        --mdc-icon-size: 18px;
    }

    .context-tabs {
        display: flex;
        gap: 4px;
        border-bottom: 1px solid rgba(127, 127, 127, 0.15);
        margin: -4px 0 12px 0;
        flex-wrap: wrap;
        padding-left: 16px;
    }

    .context-tab {
        padding: 4px 10px;
        cursor: pointer;
        border: none;
        background: none;
        color: rgba(255, 255, 255, 0.5);
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
        font-size: 12px;
        transition: all 0.2s;
        border-radius: 2px 2px 0 0;
    }

    .context-tab:hover {
        background: rgba(127, 127, 127, 0.1);
        color: rgba(255, 255, 255, 0.8);
    }

    .context-tab.active {
        border-bottom-color: #10b981;
        color: #34d399;
        font-weight: 500;
    }

    .sub-tab-content {
        margin-top: 4px;
    }
`;