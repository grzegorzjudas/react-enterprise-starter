/* Libraries */
import joi, { SchemaLike } from 'joi';

/* Models */
import { HTTPCode } from 'server/model/HTTP';
import { AnyObject } from 'server/model/Object';

/* Application files */
import APIError from 'server/controller/APIError';

export function respondSuccess (res, data: any = null, status: HTTPCode = HTTPCode.OK) {
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

export function validateRequestPayload (body: any, schema: SchemaLike): Promise<any> {
    const buildPath = (path: string[]) => {
        return path.reduce((p, n) => {
            return typeof n === 'string' ? p += `.${n}` : p += `[${n}]`;
        }, '').slice(1);
    };

    return new Promise((resolve, reject) => {
        joi.validate(body, schema, {
            convert: true,
            stripUnknown: true
        }, (error, data) => {
            if (error) {
                const msg = `Request validation failed: ${error.details[0].message} (${buildPath(error.details[0].path)})`;

                return reject(new APIError(msg, HTTPCode.BAD_REQUEST));
            }

            return resolve(data);
        });
    });
}
