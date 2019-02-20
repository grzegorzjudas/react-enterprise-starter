/* Models */
import { HTTPCode } from 'server/model/HTTP';

export default class APIError {
    public message: string;
    public code: HTTPCode;
    public name: HTTPCode;

    constructor (message: string, code: HTTPCode = HTTPCode.INTERNAL_SERVER_ERROR) {
        this.message = message;
        this.code = code;
        this.name = code;
    }
}
