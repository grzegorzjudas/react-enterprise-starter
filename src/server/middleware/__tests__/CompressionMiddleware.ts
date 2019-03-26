import middlware from '../CompressionMiddleware';
import compression from 'compression';

jest.mock('compression');

describe('CompressionMiddleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls a compression library', () => {
        const m = middlware();

        expect(compression).toBeCalledTimes(1);
        expect(compression).toBeCalledWith();
        expect(m.length).toBe(1);
        expect(m[0]).toEqual(compression());
    });
});
