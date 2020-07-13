/* eslint-disable no-undef */
import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { Home } from "/pages"
import Header from "/containers/Header"
import { lightTheme as desktopLightTheme } from "/styles/theme/desktop"
import styled from "styled-components"
import { Box } from "/components/Common"

const Container = styled(Box)`
  max-width: ${props=>props.theme.breakpoints[2]};
  max-height: "900px";
  height: 100vh;
  margin: 0 auto 0 auto;
  /* overflow: hidden; */
`
class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <ThemeProvider theme={desktopLightTheme}>
        <Container>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </ThemeProvider>
    )
  }
}

export default App
