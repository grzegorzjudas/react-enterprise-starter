import React, { useEffect } from 'react';
import { CssBaseline, Card, makeStyles, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import Config from 'client/lib/config';
import theme from 'client/lib/theme';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px',
        padding: '20px'
    },
    notice: {
        backgroundColor: theme.palette.primary.main
    }
}));

export const App = (props) => {
    const classes = useStyles(props);

    useEffect(() => {
        const styles = document.querySelector('#css-server-side');

        if (styles) styles.parentNode.removeChild(styles);
    });

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Card className={classes.root}>
                    <Typography variant="h4">Hello world!</Typography>
                    <Typography variant="subtitle1">You're using {Config.NODE_ENV} environement.</Typography>
                </Card>
            </ThemeProvider>
        </>
    );
};

export default App;
