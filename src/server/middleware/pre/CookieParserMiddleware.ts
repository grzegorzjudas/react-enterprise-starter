/* Libraries */
import cookieParser from 'cookie-parser';

export default function CookieParserMiddleware () {
    return [ cookieParser() ];
}
