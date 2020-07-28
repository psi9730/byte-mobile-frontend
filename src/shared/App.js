/* eslint-disable no-undef */
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Home, About, Explore } from "/pages";
import { ModalProvider, RestAPIProvider } from "/stores";
import { MainHeader } from "/components/Header";
import { lightTheme as desktopLightTheme } from "/styles/theme/desktop";

import styled from "styled-components";
import { Box } from "/components/Common";

const Container = styled(Box)`
    max-width: ${(props) => props.theme.breakpoints[2]};
    max-height: "900px";
    height: 100vh;
    margin: 0 auto 0 auto;
    position: relative;
`;

class App extends Component {
    componentDidMount() {}
    render() {
        return (
            <RestAPIProvider>
                <ModalProvider>
                    <ThemeProvider theme={desktopLightTheme}>
                        <Container>
                            <MainHeader />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/about" component={About} />
                                <Route path="/explore" component={Explore} />
                            </Switch>
                        </Container>
                    </ThemeProvider>
                </ModalProvider>
            </RestAPIProvider>
        );
    }
}

export default App;
