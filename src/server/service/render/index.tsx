/* Libraries */
import React from 'react';
import Renderer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/styles';

/* Models */
import { DocumentPlace } from 'server/model/Render';

/* Application files */
import Config from 'server/controller/Config';
import App from 'client/components/App';
import template from 'client/index.html';

export function renderPartial (element: string, place: DocumentPlace, tpl: string) {
    const match = place.split('|').slice(0, 2);

    return tpl.replace(match.join(''), `${match[0]}${element}${match[1]}`);
}

export function renderToString () {
    const sheets = new ServerStyleSheets();
    let app = template;

    const config = Config._CLIENT_ENABLED_.reduce((cfg, name) => {
        cfg[name] = Config[name];
        return cfg;
    }, {});

    const html = Renderer.renderToString(sheets.collect(<App />));
    const css = sheets.toString();

    app = renderPartial('<script type="text/javascript" src="/static/app.js" defer></script>', DocumentPlace.HEAD, app);
    app = renderPartial(`<script type="text/javascript" id="config-server-side">window.__config__ = ${JSON.stringify(config)}</script>`, DocumentPlace.HEAD, app);
    app = renderPartial(`<style id="css-server-side">${css}</style>`, DocumentPlace.HEAD, app);
    app = renderPartial(html, DocumentPlace.APP, app);

    return app;
}
