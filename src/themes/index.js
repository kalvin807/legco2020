import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
import lightblue from '@material-ui/core/colors/lightblue';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Helvetica',
            '-apple-system',
            'Noto Sans TC',
        ].join(','),
        h1: {
            fontSize: '1rem',
            fontFamily: 'Rubik Mono One',
            lineHeight: 0.9
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500
        },
        body1: {
            fontSize: '1rem'
        }
    },
    palette: {
        primary: {
            main: '#7B68EE',
        },
        warning: {
            main: amber[400]
        },
        success: {
            main: teal[400]
        },
        info: {
            main: lightblue[400]
        }
    },
    status: {
        danger: 'orange',
    },
});

export default theme