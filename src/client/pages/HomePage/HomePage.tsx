/* Libraries */
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Typography, Card } from '@material-ui/core';

/* Application files */
import Config from 'client/lib/config';
import { ReduxState } from 'client/types/Redux';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px',
        padding: '20px'
    },
    notice: {
        backgroundColor: theme.palette.primary.main
    }
}));

type Props = {
    text: string;
};

export const HomePage = (props: Props) => {
    const classes = useStyles(props);

    return (
        <Card className={classes.root}>
            <Typography variant="h4">{props.text}</Typography>
            <Typography variant="subtitle1">You are using {Config.NODE_ENV} environement.</Typography>
        </Card>
    );
};

export default connect((state: ReduxState) => ({
    text: state.ui.text
}), () => ({
}))(HomePage);
