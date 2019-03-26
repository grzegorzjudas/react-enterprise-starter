import middlware from '../RequestDataJsonParserMiddleware';
import bodyParser from 'body-parser';

jest.mock('body-parser', () => ({
    json: jest.fn()
}));

describe('RequestDataJsonParserMiddleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls a compression library', () => {
        const m = middlware();

        expect(bodyParser.json).toBeCalledTimes(1);
        expect(bodyParser.json).toBeCalledWith();
        expect(m.length).toBe(1);
        expect(m[0]).toEqual(bodyParser.json());
    });
});
