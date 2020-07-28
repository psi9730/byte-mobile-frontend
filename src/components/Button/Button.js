import React from "react";
import styled from "styled-components";
import {
    border,
    borderRadius,
    width,
    maxWidth,
    maxHeight,
    height,
    color,
    justifyContent,
    padding,
} from "styled-system";
// import styled from 'styled-components';
const BUTTON = styled("button")`
  /* object-fit: contain;
  max-height: 100%;
  height: auto; */
  cursor: pointer;
  ${borderRadius}
  ${border}
  ${width}
  ${color}
  ${height}
  ${justifyContent}
  ${maxHeight}
  ${maxWidth}
  ${padding}
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
