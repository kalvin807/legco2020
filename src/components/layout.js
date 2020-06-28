import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ContextStoreProvider } from '@/contextStore';
import theme from '@/themes';
import Header from './header';
import Footer from './Footer';
import './layout.css';

const useStyles = makeStyles(t => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: theme.palette.background.paper,
  },
  container: {
    marginBottom: t.spacing(3),
  },
}));

const ThemeProviderWrapper = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const DynamicTheme = React.useMemo(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          ...theme.palette,
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  const classes = useStyles();
  return (
    <ThemeProvider theme={DynamicTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Header />
          <main>{children}</main>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

const Layout = ({ children, initialStore }) => {
  return (
    <ContextStoreProvider initialStore={initialStore}>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </ContextStoreProvider>
  );
};

export default Layout;
