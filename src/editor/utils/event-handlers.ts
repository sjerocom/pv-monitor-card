export class EventManager {
    private debounceTimer?: number;

    constructor(private dispatchEvent: (event: CustomEvent) => void) {}

    fireEvent(config: any): void {
        const event = new CustomEvent('config-changed', {
            detail: { config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    debouncedFireEvent(config: any, delay: number = 1000): void {
        if (this.debounceTimer) {
            window.clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = window.setTimeout(() => {
            this.fireEvent(config);
            this.debounceTimer = undefined;
        }, delay);
    }

    cleanup(): void {
        if (this.debounceTimer) {
            window.clearTimeout(this.debounceTimer);
        }
    }
}