/* Libraries */
import React, { useEffect } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { CssBaseline, Theme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

/* Application files */
import { ReduxState } from 'client/types/Redux';
import HomePage from 'client/pages/HomePage';

function removeHeaderElement (selector: string) {
    return () => {
        const element = document.querySelector(selector);

        if (element) element.parentNode.removeChild(element);
    };
}

type Props = {
    store: Store<ReduxState>;
    theme: Theme;
};

export const App = (props: Props) => {
    useEffect(removeHeaderElement('#css-server-side'));
    useEffect(removeHeaderElement('#config-server-side'));
    useEffect(removeHeaderElement('#state-server-side'));

    return (
        <Provider store={props.store}>
            <CssBaseline />
            <ThemeProvider theme={props.theme}>
                <HomePage />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
