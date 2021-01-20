/* Libraries */
import compression from 'compression';

export default function CompressionMiddleware () {
    return [ compression() ];
}
