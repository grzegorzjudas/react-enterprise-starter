import { HTTPMethod } from 'server/model/HTTP';

import route from '../render';
import * as renderService from 'server/service/render';

jest.mock('server/service/render', () => ({
    renderToString: jest.fn().mockReturnValue('rendered')
}));

describe('Endpoint GET /', () => {
    let req: any = jest.fn();
    let res: any = { send: jest.fn() };
    let next: any = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('listens on correct path using correct HTTP method', () => {
        expect(route.url).toBe('/');
        expect(route.method).toBe(HTTPMethod.GET);
    });

    it('sends rendered content back', async () => {
        await route.controller(req, res, next);

        expect(renderService.renderToString).toBeCalledTimes(1);
        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith('rendered');
    });
});
