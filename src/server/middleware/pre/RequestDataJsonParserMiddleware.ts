/* Libraries */
import bodyParser from 'body-parser';

export default function RequestDataJsonParserMiddleware () {
    return [ bodyParser.json() ];
}
