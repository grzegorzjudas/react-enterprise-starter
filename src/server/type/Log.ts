export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    FAILURE = 'FAILURE'
}

export enum LogColor {
    BLUE = '\x1b[34m',
    YELLOW = '\x1b[33m',
    ORANGE = '\x1b[38;5;208m',
    RED = '\x1b[31m',
    DEFAULT = '\x1b[0m'
}

export type LogParams = Record<string, any>;

export type Logger = {
    debug: (msg: string, params?: LogParams) => void;
    info: (msg: string, params?: LogParams) => void;
    warn: (msg: string, params?: LogParams) => void;
    error: (msg: string, params?: LogParams) => void;
    fail: (msg: string, param?: LogParams) => void;
}
