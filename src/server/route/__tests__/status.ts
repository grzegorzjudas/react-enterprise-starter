import { HTTPMethod } from 'server/model/HTTP';

import route from '../status';
import * as httpLib from 'server/lib/http';

jest.mock('server/lib/http', () => ({
    respondSuccess: jest.fn().mockReturnValue('rendered')
}));

describe('Endpoint GET /status', () => {
    let req: any = {};
    let res: any = {};
    let next: any = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('listens on correct path using correct HTTP method', () => {
        expect(route.url).toBe('/status');
        expect(route.method).toBe(HTTPMethod.GET);
    });

    it('sends status information back', async () => {
        await route.controller(req, res, next);

        expect(httpLib.respondSuccess).toBeCalledTimes(1);
        expect(httpLib.respondSuccess).toBeCalledWith(res, { status: 'up' });
    });
});
