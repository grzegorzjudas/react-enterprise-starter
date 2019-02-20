/* Application files */
import createLogger from 'server/lib/log';
import Config from './Config';

export default createLogger(Config.LOG_LEVEL);
export { JSErrors } from 'server/lib/log';
