import React, { useEffect } from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import Config from 'client/lib/config';
import theme from 'client/lib/theme';

const styles = {
    '@global': {
        body: {
            backgroundColor: 'lightblue'
        }
    }
};

export const App = ({ classes }) => {
    useEffect(() => {
        const styles = document.querySelector('#css-server-side');

        if (styles) styles.parentNode.removeChild(styles);
    });

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <h1>Hello world!</h1>
                <h5>Environment: {Config.NODE_ENV}</h5>
            </ThemeProvider>
        </>
    );
};

export default withStyles(styles)(App);
