/* Libraries */
import os from 'os';

/* Models */
import { LogLevel, LogColor } from 'server/model/Log';

/* Application files */
import Config from 'server/controller/Config';

const order = [ LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR ];
const defaultFields = {
    HostName: os.hostname(),
    Application: Config.APP_NAME,
    Environment: Config.NODE_ENV
};

type LogParams = {
    [k: string]: any
};

type Logger = {
    debug: (msg: string, params?: LogParams) => void;
    info: (msg: string, params?: LogParams) => void;
    warn: (msg: string, params?: LogParams) => void;
    error: (msg: string, params?: LogParams) => void;
};

function colorize (level: LogLevel, func: Function) {
    return (msg: string) => {
        return func([ mapLevelToColor(level), msg, LogColor.DEFAULT ].join(''));
    };
}

function mapLevelToLogger (level: LogLevel): Function {
    switch (level) {
        case LogLevel.DEBUG: return console.debug;
        case LogLevel.INFO: return console.info;
        case LogLevel.WARNING: return console.warn;
        case LogLevel.ERROR: return console.error;
        default: return console.log;
    }
}

function mapLevelToColor (level: LogLevel): LogColor {
    switch (level) {
        case LogLevel.DEBUG: return LogColor.DEFAULT;
        case LogLevel.INFO: return LogColor.BLUE;
        case LogLevel.WARNING: return LogColor.YELLOW;
        case LogLevel.ERROR: return LogColor.RED;
        default: return LogColor.DEFAULT;
    }
}

function attachFieldsToMessage (fields: LogParams, msg: string): string {
    return Object.entries(fields).reduce((msg, [ key, value ]) => `[${key}=${value}] ${msg}`, msg);
}

export default function createLogger (minimum: LogLevel): Logger {
    function log (level: LogLevel, msg: string, fields: LogParams) {
        if (order.indexOf(level) < order.indexOf(minimum)) return;

        msg = attachFieldsToMessage({ LogLevel: level, ...defaultFields, ...fields }, msg);
        msg = `${new Date().toISOString()} ${msg}`;

        if (Config.NODE_ENV !== 'development') return mapLevelToLogger(level)(msg);
        return colorize(level, mapLevelToLogger(level))(msg);
    }

    return {
        debug: (msg: string, fields: LogParams = {}) => log(LogLevel.DEBUG, msg, fields),
        info: (msg: string, fields: LogParams = {}) => log(LogLevel.INFO, msg, fields),
        warn: (msg: string, fields: LogParams = {}) => log(LogLevel.WARNING, msg, fields),
        error: (msg: string, fields: LogParams = {}) => log(LogLevel.ERROR, msg, fields)
    };
}

export const JSErrors = [
    'EvalError',
    'InternalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError'
];
