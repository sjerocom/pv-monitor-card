import { css } from "lit";
import { baseStyles } from "./base";
import { animationStyles } from "./animations";

// Combined styles export
export const pvMonitorCardStyles = [baseStyles, animationStyles];

// Re-export individual style modules for granular imports
export { baseStyles, animationStyles };
