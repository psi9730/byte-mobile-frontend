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
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0px;
`;
const Logo = styled(Img)`
    animation: fadein 1s;
    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
const NavText = styled(Text)`
    padding-bottom: 3px;
    color: ${(props) =>
        props.active ? props.theme.colors.purple : props.theme.colors.gray40};
    transition: 1s;
    border-bottom: ${(props) =>
        props.active
            ? `2px solid ${props.theme.colors.purple}`
            : `2px solid ${props.theme.colors.gray40}`};
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

const Header = () => {
    const [visible, setVisible] = useState(false);
    let location = useLocation();
    let [pathname, setPathname] = useState("");
    useEffect(() => {
        setPathname(location.pathname);
    }, [location]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const history = useHistory();
    const onClickNav = (nav) => {
        history.push(nav);
    };
    return (
        <Container
            width="100%"
            height={["60px", "80px"]}
            p={["0px 35px", "0px 35px", "0px 50px", "0px 175px"]}
        >
            <Link to={`/`}>
                <Logo src="byte_logo.png" width={["60px", "60px", "68px"]} />
            </Link>
            <NavContainer>
                <NavText
                    fontWeight="bold"
                    active={pathname === "/"}
                    onClick={() => onClickNav("")}
                >
                    최신
                </NavText>
                <NavText
                    fontWeight="bold"
                    active={pathname === "/explore"}
                    onClick={() => onClickNav("explore")}
                >
                    추천
                </NavText>
            </NavContainer>
            {/* <Img
        onClick={showDrawer}
        src="menu.png"
        width={["16px", "20px", "24px"]}
        height={["16px", "20px", "24px"]}
      /> */}
            {/* <Drawer visible={visible} onClose={onClose} /> */}
        </Container>
    );
};

export default Header;
