/* Application files */
import CrossOriginHeadersMiddleware from './CrossOriginHeadersMiddleware';
import RequestDataJsonParserMiddleware from './RequestDataJsonParserMiddleware';

export default [
    CrossOriginHeadersMiddleware(),
    RequestDataJsonParserMiddleware()
];
