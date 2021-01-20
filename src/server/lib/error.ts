/* Libraries */
import HTTPCode from 'http-status-codes';

/* Application files */
import Log from 'server/lib/log';
import Config from 'server/lib/config';

type ErrorCreateOptions = {
    message: string;
    id: string;
    code?: number;
    log?: boolean;
    stack?: string;
}

export default class APIError extends Error {
    public message: string;
    public code: number;
    public location: string;
    public id: string;

    constructor (options: ErrorCreateOptions) {
        super();

        this.message = options.message;
        this.id = options.id || 'UNKNOWN';
        this.code = options.code || HTTPCode.INTERNAL_SERVER_ERROR;
        this.location = this.getLocation();
        this.stack = options.stack || this.stack;

        const params = {
            Stack: this.location,
            Endpoint: Config.fromSession('Endpoint')
        };

        if (options.log !== false) {
            Log[this.code === HTTPCode.INTERNAL_SERVER_ERROR ? 'fail' : 'error'](options.message, params);
        }
    }

    private getLocation () {
        const [ transpiled, original ] = this.stack.split(/\n/g).slice(1);

        if (original.trim().startsWith('->')) {
            return original.trim().replace('-> ', '');
        }

        return transpiled.trim().replace('at ', '');
    }
}

export function createApiErrorFromNative (error: Error) {
    return new APIError({
        message: error.message,
        id: `NATIVE_${error.name.toUpperCase()}`,
        stack: error.stack
    });
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
