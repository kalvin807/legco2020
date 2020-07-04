import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
import lightblue from '@material-ui/core/colors/lightBlue';

const typography = {
  fontFamily: ['Helvetica', '-apple-system', 'Noto Sans TC'].join(','),
  h1: {
    fontSize: '1rem',
    fontFamily: 'Rubik Mono One',
    lineHeight: 0.9,
  },
  h2: {
    fontSize: '1.3rem',
    fontWeight: 500,
  },
  h4: {
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  h5: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  h6: {
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '1rem',
  },
};

const palette = {
  primary: {
    main: '#000000',
  },
  secondary: {
    main: '#483d8b',
  },
  warning: {
    main: amber[400],
    light: amber[200],
  },
  success: {
    main: teal[400],
  },
  info: {
    main: lightblue[400],
  },
};


export const createDynamicTheme = ({ prefersDarkMode }) => createMuiTheme({
  typography,
  palette: {
    ...palette,
    secondary: {
      main: prefersDarkMode ? '#7b68ee' : '#483d8b',
    },
    type: prefersDarkMode ? 'dark' : 'light',
  },
  status: {
    danger: 'orange',
  },
});

const theme = createMuiTheme({
  typography,
  palette,
  status: {
    danger: 'orange',
  },
});

export default theme;
