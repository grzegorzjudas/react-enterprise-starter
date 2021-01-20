/* Libraries */
import React from 'react';
import Renderer from 'react-dom/server';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router';
import { ServerStyleSheets } from '@material-ui/styles';

/* Types */
import { DocumentPlace } from 'server/type/Render';
import { AnyObject } from 'server/type/Object';

/* Application files */
import Config from 'server/lib/config';

import App from 'client/components/App';
import theme from 'client/lib/theme';
import reducers from 'client/reducers';
import template from 'client/index.html';

function createScriptTagWithData (data: AnyObject, name: string): string {
    return `
        <script type="text/javascript" id="${name.toLowerCase()}-server-side">
            window.__${name.toUpperCase()}__ = ${JSON.stringify(data)};
        </script>
    `;
}

export function renderPartial (element: string, place: DocumentPlace, tpl: string) {
    const match = place.split('|').slice(0, 2);

    return tpl.replace(match.join(''), `${match[0]}${element}${match[1]}`);
}

export function renderToString (url: string) {
    const sheets = new ServerStyleSheets();
    let app = template;

    const config = Config._CLIENT_ENABLED_.reduce((cfg, name) => {
        cfg[name] = Config[name];
        return cfg;
    }, {});

    const RouteredApp = () => (
        <StaticRouter location={url} context={{}}>
            <App store={store} theme={theme} />
        </StaticRouter>
    );

    const store = createStore(reducers);
    const html = Renderer.renderToString(sheets.collect(<RouteredApp />));
    const css = sheets.toString();

    app = renderPartial('<script type="text/javascript" src="/static/app.js" defer></script>', DocumentPlace.HEAD, app);
    app = renderPartial(createScriptTagWithData(config, 'CONFIG'), DocumentPlace.HEAD, app);
    app = renderPartial(createScriptTagWithData(store.getState(), 'STATE'), DocumentPlace.HEAD, app);
    app = renderPartial(`<style id="css-server-side">${css}</style>`, DocumentPlace.HEAD, app);
    app = renderPartial(html, DocumentPlace.APP, app);

    return app;
}
