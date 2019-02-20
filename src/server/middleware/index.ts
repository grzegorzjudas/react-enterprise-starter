/* Application files */
import CompressionMiddleware from './CompressionMiddleware';
import CrossOriginHeadersMiddleware from './CrossOriginHeadersMiddleware';
import RequestDataJsonParserMiddleware from './RequestDataJsonParserMiddleware';
import StaticFilesMiddleware from './StaticFilesMiddleware';

export default [
    CompressionMiddleware(),
    CrossOriginHeadersMiddleware(),
    RequestDataJsonParserMiddleware(),
    StaticFilesMiddleware()
];
