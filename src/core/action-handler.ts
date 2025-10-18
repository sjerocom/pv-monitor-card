import { Hass, TapAction, ConsumerItem } from "../types";

export class ActionHandler {
    constructor(
        private getHass: () => Hass | undefined,
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

    /**
     * Handhabt Consumer-spezifische Actions
     * @param event Event
     * @param consumer Consumer Item Config
     */
    public handleConsumerAction(event: Event, consumer: ConsumerItem): void {
        console.log('handleConsumerAction called:', {
            eventType: event.type,
            consumerEntity: consumer.entity,
            tap_action_target: consumer.tap_action_target,
            double_tap_action_target: consumer.double_tap_action_target,
            hold_action_target: consumer.hold_action_target
        });
        
        const actionType = event.type === 'dblclick' ? 'double_tap' : event.type === 'contextmenu' ? 'hold' : 'tap';
        
        if (event.type === 'contextmenu') {
            event.preventDefault();
        }

        // Prüfe welches Target für diese Action definiert ist
        let target: 'none' | 'entity' | 'custom_entity' | 'custom_action' | undefined;
        if (actionType === 'tap') target = consumer.tap_action_target;
        else if (actionType === 'double_tap') target = consumer.double_tap_action_target;
        else if (actionType === 'hold') target = consumer.hold_action_target;

        console.log('Action type and target:', { actionType, target });

        // Default: 'none'
        if (!target) {
            target = 'none';
            console.log('No target defined, using default: none');
        }

        if (target === 'entity') {
            console.log('Toggling consumer entity:', consumer.entity);
            // Toggle die Consumer-Entity
            this.toggleEntity(consumer.entity);
        } else if (target === 'custom_entity') {
            // Toggle eine custom Entity
            let customEntity: string | undefined;
            if (actionType === 'tap') customEntity = consumer.tap_action_custom_entity;
            else if (actionType === 'double_tap') customEntity = consumer.double_tap_action_custom_entity;
            else if (actionType === 'hold') customEntity = consumer.hold_action_custom_entity;
            
            console.log('Toggling custom entity:', customEntity);
            if (customEntity) {
                this.toggleEntity(customEntity);
            }
        } else if (target === 'custom_action') {
            // Verwende custom action
            let action: TapAction | undefined;
            if (actionType === 'tap') action = consumer.tap_action;
            else if (actionType === 'double_tap') action = consumer.double_tap_action;
            else if (actionType === 'hold') action = consumer.hold_action;
            
            console.log('Executing custom action:', action);
            this.handleTap(action);
        } else {
            console.log('No action (target is none)');
        }
    }

    /**
     * Toggle eine Entity (z.B. Switch)
     */
    private toggleEntity(entityId: string): void {
        const hass = this.getHass();
        console.log('toggleEntity called:', { entityId, hasHass: !!hass });
        
        if (!hass || !entityId) {
            console.warn('toggleEntity: Missing hass or entityId');
            return;
        }

        const [domain] = entityId.split('.');
        const service = 'toggle';

        console.log('Calling service:', { domain, service, entity_id: entityId });

        if (hass.callService) {
            console.log('Using hass.callService');
            hass.callService(domain, service, { entity_id: entityId });
        } else {
            console.log('Using window.dispatchEvent');
            window.dispatchEvent(new CustomEvent('hass-call-service', {
                bubbles: true,
                composed: true,
                detail: {
                    domain,
                    service,
                    serviceData: { entity_id: entityId }
                }
            }));
        }
    }

    public handleTap(tapAction?: TapAction): void {
        if (!tapAction || tapAction.action === 'none') return;

        const hass = this.getHass();

        if (tapAction.action === 'toggle') {
            const entityId = tapAction.target?.entity_id;
            if (entityId) {
                this.toggleEntity(entityId);
            }
        } else if (tapAction.action === 'navigate' && tapAction.navigation_path) {
            history.pushState(null, '', tapAction.navigation_path);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else if (tapAction.action === 'url' && tapAction.url_path) {
            window.open(tapAction.url_path, '_blank');
        } else if (tapAction.action === 'call-service' && tapAction.service && hass) {
            const [domain, service] = tapAction.service.split('.');

            const serviceData: any = { ...(tapAction.service_data || {}) };

            if (tapAction.target) {
                Object.assign(serviceData, tapAction.target);
            }

            if (hass.callService) {
                hass.callService(domain, service, serviceData);
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
