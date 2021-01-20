/* Libraries */
import HTTPCode from 'http-status-codes';

/* Types */
import { AnySchema } from 'joi';
import { AnyObject } from 'server/type/Object';

/* Application files */
import APIError from 'server/lib/error';

export function respondSuccess (res, data: any = null, status: number = HTTPCode.OK) {
    res.set('Content-Type', 'application/json');

    res.status(status);
    res.send(JSON.stringify({ status: 'ok', data }, null, 4));
}

export function closeWithError (res, data: AnyObject = {}, status = HTTPCode.INTERNAL_SERVER_ERROR) {
    res.setHeader('Content-Type', 'application/json');

    if (data instanceof APIError) {
        data = { message: data.message, code: data.code };
        status = data.code;
    }

    res.status(status);
    res.send(JSON.stringify({ status: 'error', data }, null, 4));
}

export function getRequestOriginIP (req): string {
    if (req.headers['x-forwarded-for']) return req.headers['x-forwarded-for'].split(',').pop();

    return req.connection.remoteAddress || req.socket.remoteAddress || null;
}

export async function validateRequestPayload (body: any, schema: AnySchema): Promise<any> {
    const buildPath = (path: string[]) => {
        return path.reduce((p, n) => {
            p = typeof n === 'string' ? p += `.${n}` : p += `[${n}]`;

            return p;
        }, '').slice(1);
    };

    try {
        const value = await schema.validateAsync(body, {
            convert: true,
            stripUnknown: true
        });

        return value;
    } catch (err) {
        const message = `Request validation failed: ${err.details[0].message} (${buildPath(err.details[0].path)})`;

        throw new APIError({
            id: 'PAYLOAD_VALIDATION_FAILED',
            message,
            code: HTTPCode.BAD_REQUEST
        });
    }
}
