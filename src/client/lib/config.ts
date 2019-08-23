import { AnyObject } from 'client/types/Common';

export default class Config {
    public static APP_NAME: string;
    public static NODE_ENV: string;
}

export function loadConfigFromObject (object: AnyObject): void {
    Object.entries(object).forEach(([ name, value ]) => {
        Config[name] = value;
    });
}
