import React from "react"
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ContextStore, { ContextStoreProvider } from "@/contextStore"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import theme from '../themes'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    marginBottom: theme.spacing(3),
  }
}));

const ThemeProviderWrapper = ({ children }) => {
  const {
    pageOptions: { state },
  } = React.useContext(ContextStore)
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Header />
          <main>{children}</main>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

const Layout = ({ children, initialStore }) => {
  return (
    <ContextStoreProvider initialStore={initialStore}>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </ContextStoreProvider>
  )
}

export default Layout
