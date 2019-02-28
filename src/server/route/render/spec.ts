import route from '.';
import { HTTPMethod } from 'server/model/HTTP';
import * as renderService from 'server/service/render';

const renderServiceMock = jest.spyOn(renderService, 'renderToString').mockImplementation(() => 'rendered');

describe('GET /', () => {
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

        expect(renderServiceMock).toBeCalledTimes(1);
        expect(res.send).toBeCalledTimes(1);
        expect(res.send).toBeCalledWith('rendered');
    });
});
