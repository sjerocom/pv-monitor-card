import { Hass, TapAction } from "../types";

export class ActionHandler {
    constructor(
        private hass?: Hass,
        private dispatchEvent?: (event: CustomEvent) => void
    ) {}

    public handleAction(
        event: Event,
        actions: { tap?: TapAction; double_tap?: TapAction; hold?: TapAction },
        isHausCard: boolean = false,
        toggleConsumers?: () => void
    ): void {
        if (isHausCard && toggleConsumers) {
            if (event.type === 'click') {
                toggleConsumers();
                return;
            }
        }

        const actionType = event.type === 'dblclick' ? 'double_tap' : event.type === 'contextmenu' ? 'hold' : 'tap';
        const action = actions[actionType];

        if (event.type === 'contextmenu') {
            event.preventDefault();
        }

        this.handleTap(action);
    }

    public handleTap(tapAction?: TapAction): void {
        if (!tapAction || tapAction.action === 'none') return;

        if (tapAction.action === 'navigate' && tapAction.navigation_path) {
            history.pushState(null, '', tapAction.navigation_path);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else if (tapAction.action === 'url' && tapAction.url_path) {
            window.open(tapAction.url_path, '_blank');
        } else if (tapAction.action === 'call-service' && tapAction.service && this.hass) {
            const [domain, service] = tapAction.service.split('.');

            const serviceData: any = { ...(tapAction.service_data || {}) };

            if (tapAction.target) {
                Object.assign(serviceData, tapAction.target);
            }

            if (this.hass.callService) {
                this.hass.callService(domain, service, serviceData);
            } else {
                window.dispatchEvent(new CustomEvent('hass-call-service', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        domain,
                        service,
                        serviceData
                    }
                }));
            }
        } else if (tapAction.action === 'more-info') {
            const entityId = tapAction.target?.entity_id;
            if (entityId && this.dispatchEvent) {
                this.dispatchEvent(new CustomEvent('hass-more-info', {
                    composed: true,
                    bubbles: true,
                    detail: { entityId }
                }));
            }
        }
    }
}
