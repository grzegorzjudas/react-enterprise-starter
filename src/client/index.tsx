/* Libraries */
import React from 'react';
import Renderer from 'react-dom';

/* Application files */
import Config from 'client/lib/config';
import App from 'client/components/App';

if (typeof window !== 'undefined' && window['__config__']) {
    Object.entries(window['__config__']).forEach(([ name, value ]) => {
        Config[name] = value;
    });

    delete window['__config__'];
    const script = document.querySelector('#config-server-side');

    if (script) script.parentNode.removeChild(script);
}

Renderer.hydrate(<App />, document.getElementById('app'));
