/* Application files */
import APIConfig from 'server/lib/config';
import ClientConfig from 'client/lib/config';

export default class Config extends APIConfig {
    public static _CLIENT_ENABLED_: string[] = [ 'APP_NAME', 'NODE_ENV' ];

    /* Your custom configuration variables here */
}

Config._CLIENT_ENABLED_.forEach((name) => {
    ClientConfig[name] = Config[name];
});
