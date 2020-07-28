import React from "react";
import styled from "styled-components";
import { Button } from "/components/Button";
// import styled from 'styled-components';
const BUTTON = styled(Button)`
    transition: border 500ms ease-out;
    transition: color 500ms ease-out;

    &:hover,
    &:active {
        border-color: ${(props) => props.theme.colors.purple} !important;
    }
    &:hover p,
    &:active p {
        color: ${(props) => props.theme.colors.purple} !important;
    }
`;

BUTTON.defaultProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "100%",
    height: "auto",
    objectFit: "contain",
    border: "none",
};

export default BUTTON;
