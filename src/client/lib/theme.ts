import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        primary: {
            light: blue[400],
            main: blue[600],
            dark: blue[800]
        }
    }
});
