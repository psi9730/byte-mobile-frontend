import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import request from "/utils/request";
import { Box, Flex, Text, ImgNoSrc } from "/components/Common";

const Container = styled(Box)`
    bottom: 8%;
    right: 8%;
    border-radius: 50%;
    position: fixed;
    z-index: 1000;
    overflow: hidden;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.white};
`;
const Toast = ({ data, imageHeight, imageWidth, ...props }) => {
    return (
        <Container {...props} p="5px">
            <ImgNoSrc
                alt={data.image_url}
                imageHeight={imageHeight}
                src={data.image_url}
                imageWidth={imageWidth}
                lazy
            />
        </Container>
    );
};

export default Toast;
