import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Flex, Text } from "/components/Common";
import { Link } from "react-router-dom";
import { Img } from "/components/Common";
import { useHistory, useLocation } from "react-router-dom";

// import Drawer from "./Drawer";

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
`;
const LogoContainer = styled(Box)`
    position: absolute;
    left: 24px;
    cursor: pointer;
`;
const NavText = styled(Text)`
    padding-bottom: 3px;
    color: ${(props) => props.theme.colors.gray};
    /* transition: 1s; */
`;

const NavContainer = styled(Flex)`
    animation: fadein 1s 0.3s forwards;
    opacity: 0;
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    ${NavText} + ${NavText} {
      margin-left: 13px;
    }
`;

const Header = ({ title, onClick, ...props }) => {
    return (
        <Container
            width="100%"
            {...props}
            height={["60px", "80px"]}
            p={["0px 35px", "0px 35px", "0px 50px", "0px 80px"]}
        >
            <LogoContainer onClick={onClick}>
                <Img src="left_arrow.png" width={["24px", "24px", "30px"]} />
            </LogoContainer>
            <NavContainer>
                <NavText textStyle="h5" fontWeight="bold">
                    {title}
                </NavText>
            </NavContainer>
        </Container>
    );
};

export default Header;
