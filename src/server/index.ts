/* Libraries */
import cls from 'cls-hooked';
import express, { Request, Response, NextFunction } from 'express';

/* Types */
import { AddressInfo } from 'net';

/* Application files */
import routes from './route';
import Config from 'server/lib/config';
import Process from 'server/lib/process';
import APIError, { createApiErrorFromNative } from 'server/lib/error';
import Log from 'server/lib/log';
import { closeWithError, validateRequestPayload } from 'server/lib/http';

import preMiddlewares from './middleware/pre';
import postMiddlewares from './middleware/post';

Process.onStop(async () => {
    Log.info('Stopping server');
});

Process.onException(async (error) => {
    if (error) Log.error(`Fatal error: ${error.message}`);

    Log.info('Stopping server');
});

cls.createNamespace(Config.SESSION_NAMESPACE);

if (Config.STRICT_TLS === false) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const server = express();

for (const preMiddleware of preMiddlewares) {
    server.use(...preMiddleware as any[]);
}

for (const route of routes) {
    server[route.method.toLowerCase()](route.url, async (req: Request, res: Response, next: NextFunction) => {
        Config.toSession('Handled', true);

        Log.info(`${route.method} ${route.url}`);

        try {
            if (route.schema) req.body = await validateRequestPayload(req.body, route.schema);
            await route.controller(req, res, next);
        } catch (error) {
            const sanitized = error instanceof APIError ? error : createApiErrorFromNative(error);

            return closeWithError(res, sanitized);
        }

        return next();
    });
}

for (const postMiddleware of postMiddlewares) {
    server.use(...postMiddleware);
}

const instance = server.listen(Config.PORT, () => {
    const { address, port } = instance.address() as AddressInfo;

    Log.info(`Server listening on ${address}:${port}`);
}).on('error', (err) => {
    Log.error(`Could not start server: ${err.message}`);
});
