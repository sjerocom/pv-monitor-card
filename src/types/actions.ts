export interface TapAction {
    action: string;
    navigation_path?: string;
    url_path?: string;
    service?: string;
    service_data?: any;
    target?: any;
    data?: any;
}
