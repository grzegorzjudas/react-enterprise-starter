/* Libraries */
import React from 'react';
import Renderer from 'react-dom/server';
import { createStore } from 'redux';
import { ServerStyleSheets } from '@material-ui/styles';

/* Models */
import { DocumentPlace } from 'server/model/Render';
import { AnyObject } from 'server/model/Object';

/* Application files */
import Config from 'server/controller/Config';
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

export function renderToString () {
    const sheets = new ServerStyleSheets();
    let app = template;

    const config = Config._CLIENT_ENABLED_.reduce((cfg, name) => {
        cfg[name] = Config[name];
        return cfg;
    }, {});

    const store = createStore(reducers);
    const html = Renderer.renderToString(sheets.collect(<App store={store} theme={theme} />));
    const css = sheets.toString();

    app = renderPartial('<script type="text/javascript" src="/static/app.js" defer></script>', DocumentPlace.HEAD, app);
    app = renderPartial(createScriptTagWithData(config, 'CONFIG'), DocumentPlace.HEAD, app);
    app = renderPartial(createScriptTagWithData(store.getState(), 'STATE'), DocumentPlace.HEAD, app);
    app = renderPartial(`<style id="css-server-side">${css}</style>`, DocumentPlace.HEAD, app);
    app = renderPartial(html, DocumentPlace.APP, app);

    return app;
}
