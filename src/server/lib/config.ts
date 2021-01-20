/* Libraries */
import cls from 'cls-hooked';

/* Types */
import { LogLevel } from 'server/type/Log';

/* Application files */
import ClientConfig from 'client/lib/config';

function getConfigString (prop: string): string {
    const val = process.env[prop] || null;

    return val ? `${val}` : val;
}

function getConfigNumber (prop: string): number {
    const val = process.env[prop] || null;

    return val ? ~~`${val}` : null;
}

function getConfigBoolean (prop: string): boolean {
    const val = process.env[prop] || null;

    return val ? val === 'true' : null;
}

function getConfig (prop: string, type: 'string' | 'number' | 'boolean'): string | number | boolean {
    switch (type) {
        case 'string': return getConfigString(prop);
        case 'number': return getConfigNumber(prop);
        case 'boolean': return getConfigBoolean(prop);
        default: return getConfigString(prop);
    }
}

export default class Config {
    public static _CLIENT_ENABLED_: string[] = [ 'APP_NAME', 'NODE_ENV' ];

    public static NODE_ENV: string = getConfig('NODE_ENV', 'string') as string;
    public static APP_NAME: string = getConfig('APP_NAME', 'string') as string;
    public static PORT: number = getConfig('PORT', 'number') as number;
    public static STRICT_TLS: boolean = getConfig('STRICT_TLS', 'boolean') as boolean;
    public static LOG_LEVEL: LogLevel = getConfig('LOG_LEVEL', 'string') as LogLevel;
    public static LOG_DISABLE_COLORS: boolean = getConfig('LOG_DISABLE_COLORS', 'boolean') as boolean;
    public static SESSION_NAMESPACE: string = getConfig('SESSION_NAMESPACE', 'string') as string;
    public static ALLOWED_ORIGINS: string = getConfig('ALLOWED_ORIGINS', 'string') as string;

    public static fromSession (name: string) {
        return cls.getNamespace(Config.SESSION_NAMESPACE).get(name);
    }

    public static toSession (name: string, value: any) {
        return cls.getNamespace(Config.SESSION_NAMESPACE).set(name, value);
    }
}

Config._CLIENT_ENABLED_.forEach((name) => {
    ClientConfig[name] = Config[name];
});
