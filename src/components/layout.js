import React from "react"
import Container from '@material-ui/core/Container';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Header from "./header"
import Footer from "./Footer"
import "./layout.css"
import theme from '../themes'

const useStyles = makeStyles((t) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    marginBottom: t.spacing(3),
  }
}));

const Layout = ({ children }) => {
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

export default Layout
