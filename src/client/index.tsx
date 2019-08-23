/* Libraries */
import React from 'react';
import Renderer from 'react-dom';
import { createStore, compose, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';

/* Application files */
import App from 'client/components/App';
import Config, { loadConfigFromObject } from 'client/lib/config';
import theme from 'client/lib/theme';
import reducers from 'client/reducers';
import { ReduxState } from 'client/types/Redux';

loadConfigFromObject(window['__CONFIG__']);

const devtoolsComposer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
const composer = Config.NODE_ENV === 'development' && devtoolsComposer ? devtoolsComposer : compose;
const store: Store<ReduxState> = createStore(reducers, window['__STATE__'], composer(applyMiddleware(thunk)));

Renderer.hydrate(<App store={store} theme={theme} />, document.getElementById('app'));
