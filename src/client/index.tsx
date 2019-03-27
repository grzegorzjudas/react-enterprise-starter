/* Libraries */
import React from 'react';
import Renderer from 'react-dom';

/* Application files */
import Config from 'client/lib/config';
import App from 'client/components/App';

import './global.css';

if (typeof window !== 'undefined' && window['__config__']) {
    Object.entries(window['__config__']).forEach(([ name, value ]) => {
        Config[name] = value;
    });

    delete window['__config__'];
}

Renderer.hydrate(<App />, document.getElementById('app'));
