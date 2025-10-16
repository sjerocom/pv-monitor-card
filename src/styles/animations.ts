import { css } from "lit";

export const animationStyles = css`
    @keyframes spin {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(120deg); }
        50%  { transform: rotate(200deg); }
        75%  { transform: rotate(300deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes continuousRotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
        }
        15% {
            transform: translate(8px, -8px) scale(1.1);
            opacity: 1;
        }
        30% {
            transform: translate(12px, -4px) scale(0.95);
            opacity: 0.8;
        }
        45% {
            transform: translate(6px, 6px) scale(1.05);
            opacity: 0.9;
        }
        60% {
            transform: translate(-6px, 8px) scale(1);
            opacity: 0.85;
        }
        75% {
            transform: translate(-10px, -2px) scale(1.08);
            opacity: 0.95;
        }
        90% {
            transform: translate(-4px, -10px) scale(0.98);
            opacity: 0.75;
        }
    }

    @keyframes electricPulse {
        0%, 100% {
            transform: rotate(0deg);
            opacity: 0.6;
        }
        5% {
            opacity: 1;
        }
        10% {
            transform: rotate(15deg);
            opacity: 0.4;
        }
        15% {
            opacity: 0.9;
        }
        20% {
            transform: rotate(45deg);
            opacity: 0.5;
        }
        25% {
            opacity: 1;
        }
        30% {
            transform: rotate(70deg);
            opacity: 0.6;
        }
        40% {
            transform: rotate(120deg);
            opacity: 0.9;
        }
        50% {
            transform: rotate(180deg);
            opacity: 0.5;
        }
        55% {
            opacity: 1;
        }
        60% {
            transform: rotate(210deg);
            opacity: 0.7;
        }
        70% {
            transform: rotate(270deg);
            opacity: 0.9;
        }
        75% {
            opacity: 0.5;
        }
        80% {
            transform: rotate(310deg);
            opacity: 1;
        }
        90% {
            transform: rotate(350deg);
            opacity: 0.7;
        }
    }
`;
