/* Libraries */
import React from 'react';
import Renderer from 'react-dom';

/* Application files */
import App from 'client/components/App';

import './global.css';

Renderer.hydrate(<App />, document.getElementById('app'));
