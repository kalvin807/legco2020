import React from "react"
import { ThemeProvider } from '@material-ui/core/styles';
import Header from "./header"
import Container from '@material-ui/core/Container';
import "./layout.css"
import theme from '../themes'

const Layout = ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
      <Header />
        <main>{children}</main>
        <footer>
        </footer>
      </Container>
    </ThemeProvider>
  )
}

export default Layout
