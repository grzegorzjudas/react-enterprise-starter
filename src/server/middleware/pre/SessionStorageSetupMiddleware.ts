/* Libraries */
import cls from 'cls-hooked';
import { v4 as uuid } from 'uuid';

/* Types */
import { Request, Response, NextFunction } from 'express';

export default function SessionStorageSetupMiddleware (namespace: string) {
    return [ (req: Request, res: Response, next: NextFunction) => {
        const store = cls.getNamespace(namespace);
        const requestId = uuid();
        const sessionId = uuid();

        store.run(async () => {
            store.set('RequestID', requestId);
            store.set('SessionID', sessionId);
            store.set('Endpoint', `${req.method} ${req.url}`);
            store.set('Handled', false);

            next();
        });
    } ];
}
