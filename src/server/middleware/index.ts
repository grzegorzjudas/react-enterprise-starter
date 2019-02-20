/* Application files */
import CompressionMiddleware from './CompressionMiddleware';
import CrossOriginHeadersMiddleware from './CrossOriginHeadersMiddleware';
import RequestDataJsonParserMiddleware from './RequestDataJsonParserMiddleware';

export default [
    CompressionMiddleware(),
    CrossOriginHeadersMiddleware(),
    RequestDataJsonParserMiddleware()
];
