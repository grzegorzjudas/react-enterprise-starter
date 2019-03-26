import middleware from '../StaticFilesMiddleware';
import express from 'express';

import Config from 'server/controller/Config';

jest.mock('express', () => ({
    static: jest.fn().mockReturnValue('test')
}));

jest.mock('server/controller/Config', () => ({
    NODE_ENV: 'development'
}));

describe('StaticFilesMiddleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('registers correct endpoint for hosting static files', () => {
        const m = middleware();

        expect(express.static).toBeCalledTimes(1);
        expect(express.static).toBeCalledWith('build/static/');
        expect(m.length).toBe(2);
        expect(m[0]).toEqual('/static');
        expect(m[1]).toEqual('test');
    });

    it('hosts static files from different directory on non-development environment', () => {
        Config.NODE_ENV = 'production';

        middleware();

        expect(express.static).toBeCalledWith('static/');
    });
});
