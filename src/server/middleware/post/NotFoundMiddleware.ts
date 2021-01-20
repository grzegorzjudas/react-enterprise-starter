/* Libraries */
import HTTPCode from 'http-status-codes';

/* Types */
import { Response, Request, NextFunction } from 'express';

/* Application files */
import Config from 'server/lib/config';
import APIError from 'server/lib/error';
import { closeWithError } from 'server/lib/http';

export default function NotFoundMiddleware () {
    return [ (req: Request, res: Response, next: NextFunction) => {
        if (!Config.fromSession('Handled')) {
            closeWithError(res, new APIError({
                message: 'Route not found.',
                id: 'ROUTE_NOT_FOUND',
                code: HTTPCode.NOT_FOUND
            }));
        }

        next();
    } ];
}
