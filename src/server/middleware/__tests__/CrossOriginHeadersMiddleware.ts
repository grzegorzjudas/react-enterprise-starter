import middlware from '../CrossOriginHeadersMiddleware';

describe('CrossOriginHeadersMiddleware', () => {
    const req = {
        headers: {
            origin: 'origin',
            host: 'host',
            'access-control-request-headers': 'access-control-request-headers'
        }
    };
    const res = { set: jest.fn() };
    const next = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls a compression library', () => {
        const m = middlware();

        expect(m.length).toBe(1);

        m[0](req, res, next);

        expect(res.set).toBeCalledTimes(3);
        expect(res.set).nthCalledWith(1, 'Access-Control-Allow-Origin', 'origin');
        expect(res.set).nthCalledWith(2, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        expect(res.set).nthCalledWith(3, 'Access-Control-Allow-Headers', 'access-control-request-headers');

        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith();
    });

    it('sets allowed origin to Host header value if Origin is not present', () => {
        delete req.headers.origin;
        middlware()[0](req, res, next);

        expect(res.set).nthCalledWith(1, 'Access-Control-Allow-Origin', 'host');
    });

    it('sets allowed headers to all if it\'s not a preflight request', () => {
        delete req.headers['access-control-request-headers'];
        middlware()[0](req, res, next);

        expect(res.set).lastCalledWith('Access-Control-Allow-Headers', '*');
    });
});
