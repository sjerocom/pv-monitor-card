import { css } from "lit";

export const pvMonitorCardStyles = css`
    :host {
        display: block;
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        --ha-card-box-shadow: none !important;
        --ha-card-border-width: 0 !important;
    }
    ha-card {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
    }
    .card-header {
        text-align: center;
        margin-bottom: 12px;
    }
    .card-header-with-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .info-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 6px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    .info-bar-item {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1;
        justify-content: center;
    }
    .info-bar-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0px;
        margin: 0;
        padding: 0;
    }
    .info-bar-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .info-bar-icon ha-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .info-bar-label {
        line-height: 1;
    }
    .info-bar-value {
        line-height: 1.2;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .card {
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    .card::after {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: inherit;
        background: inherit;
        z-index: 1;
    }
    .card > * {
        position: relative;
        z-index: 2;
    }
    .primary {
        font-weight: normal;
    }
    .secondary {
        opacity: 0.7;
        margin-top: 2px;
    }
    .tertiary {
        opacity: 0.7;
        margin-top: 2px;
    }
    .icon {
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @keyframes spin {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(120deg); }
        50%  { transform: rotate(200deg); }
        75%  { transform: rotate(300deg); }
        100% { transform: rotate(360deg); }
    }
`;