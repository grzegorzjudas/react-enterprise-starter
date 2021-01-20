/* Application files */
import Config from 'server/lib/config';

import RequestDataJsonParserMiddleware from './RequestDataJsonParserMiddleware';
import SessionStorageSetupMiddleware from './SessionStorageSetupMiddleware';
import CrossOrignHeadersMiddleware from './CrossOriginHeadersMiddleware';
import CookieParserMiddleware from './CookieParserMiddleware';
import CompressionMiddleware from './CompressionMiddleware';

export default [
    RequestDataJsonParserMiddleware(),
    SessionStorageSetupMiddleware(Config.SESSION_NAMESPACE),
    CrossOrignHeadersMiddleware(Config.ALLOWED_ORIGINS),
    CookieParserMiddleware(),
    CompressionMiddleware()
];
