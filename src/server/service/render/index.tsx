/* Libraries */
import React from 'react';
import Renderer from 'react-dom/server';

/* Models */
import { DocumentPlace } from 'server/model/Render';

/* Application files */
import Config from 'server/controller/Config';
import App from 'client/components/App';
import template from 'client/index.html';
import 'client/global.css';

export function renderPartial (element: string, place: DocumentPlace, tpl: string) {
    const match = place.split('|').slice(0, 2);

    return tpl.replace(match.join(''), `${match[0]}${element}${match[1]}`);
}

export function renderToString () {
    let app = template;
    const config = Config._CLIENT_ENABLED_.reduce((cfg, name) => {
        cfg[name] = Config[name];
        return cfg;
    }, {});

    app = renderPartial(Renderer.renderToString(<App />), DocumentPlace.APP, app);
    app = renderPartial('<link rel="stylesheet" type="text/css" href="/static/style.css" />', DocumentPlace.HEAD, app);
    app = renderPartial('<script type="text/javascript" src="/static/app.js" defer></script>', DocumentPlace.HEAD, app);
    app = renderPartial(`<script type="text/javascript">window.__config__ = ${JSON.stringify(config)}</script>`, DocumentPlace.HEAD, app);

    return app;
}
