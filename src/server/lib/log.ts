/* Libraries */
import os from 'os';
import cls from 'cls-hooked';

/* Types */
import { LogLevel, LogColor, LogParams, Logger } from 'server/type/Log';
import { AnyObject } from 'server/type/Object';

/* Application files */
import Config from 'server/lib/config';

const order = [ LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR, LogLevel.FAILURE ];

function getFullFields () {
    const store = cls.getNamespace(Config.SESSION_NAMESPACE);

    function getFromStore (name: string): AnyObject {
        return store.get(name) ? { [name]: store.get(name) } : {};
    }

    return {
        ...getFromStore('RequestID'),
        ...getFromStore('SessionID'),
        HostName: os.hostname(),
        Application: Config.APP_NAME,
        Environment: Config.NODE_ENV
    };
}

function colorize (level: LogLevel, func: (...data: any[]) => void) {
    return (msg: string) => {
        return func([ mapLevelToColor(level), msg, LogColor.DEFAULT ].join(''));
    };
}

function mapLevelToLogger (level: LogLevel): (...data: any[]) => void {
    switch (level) {
        case LogLevel.DEBUG: return console.debug;
        case LogLevel.INFO: return console.info;
        case LogLevel.WARNING: return console.warn;
        case LogLevel.ERROR: return console.error;
        case LogLevel.FAILURE: return console.error;
        default: return console.log;
    }
}

function mapLevelToColor (level: LogLevel): LogColor {
    switch (level) {
        case LogLevel.DEBUG: return LogColor.DEFAULT;
        case LogLevel.INFO: return LogColor.BLUE;
        case LogLevel.WARNING: return LogColor.YELLOW;
        case LogLevel.ERROR: return LogColor.ORANGE;
        case LogLevel.FAILURE: return LogColor.RED;
        default: return LogColor.DEFAULT;
    }
}

function attachFieldsToMessage (fields: LogParams, msg: string): string {
    return Object.entries(fields).reduce((msg, [ key, value ]) => `[${key}=${value}] ${msg}`, msg);
}

export function createLogger (minimum: LogLevel): Logger {
    function log (level: LogLevel, msg: string, fields: LogParams) {
        if (order.indexOf(level) < order.indexOf(minimum)) return;

        const offset = (new Date()).getTimezoneOffset() * 60 * 1000;
        const time = (new Date(Date.now() - offset)).toISOString().slice(0, -1);

        msg = attachFieldsToMessage({
            ...fields,
            ...(Config.NODE_ENV === 'production' ? getFullFields() : {}),
            ...(Config.NODE_ENV === 'production' ? { LogLevel: level } : {})
        }, msg);
        msg = `${time} ${msg}`;

        if (Config.LOG_DISABLE_COLORS) return mapLevelToLogger(level)(msg);
        return colorize(level, mapLevelToLogger(level))(msg);
    }

    return {
        debug: (msg: string, fields: LogParams = {}) => log(LogLevel.DEBUG, msg, fields),
        info: (msg: string, fields: LogParams = {}) => log(LogLevel.INFO, msg, fields),
        warn: (msg: string, fields: LogParams = {}) => log(LogLevel.WARNING, msg, fields),
        error: (msg: string, fields: LogParams = {}) => log(LogLevel.ERROR, msg, fields),
        fail: (msg: string, fields: LogParams = {}) => log(LogLevel.FAILURE, msg, fields)
    };
}

export default createLogger(Config.LOG_LEVEL);
