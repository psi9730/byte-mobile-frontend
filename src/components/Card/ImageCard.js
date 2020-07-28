import React from "react";
import { em } from "polished";
import styled, { css } from "styled-components";
import { ImgNoSrc } from "/components/Common";

/**
 * Card 컴포넌트에 사용되는 이미지
 */
const ImageCard = ({
    imageUrl,
    imageWidth,
    imageHeight,
    boxShadow,
    border,
    alt,
    sizes = `50vw, (min-width: ${em(1024)}): 25vw`,
    plural = false,
    children,
    filter,
    ...props
}) => {
    return (
        <div
            css={css`
                position: relative;
                /* overflow: hidden; */
                border: 1px solid ${({ theme }) => theme.colors.gray20};
                border: ${({ border }) => border && border};
                border-radius: 8px;
            `}
            border={border}
            {...props}
        >
            <ImgNoSrc
                alt={alt}
                borderRadius="8px"
                boxShadow={boxShadow}
                imageHeight={imageHeight}
                src={imageUrl}
                filter={filter}
                rootDir={""}
                imageWidth={imageWidth}
                sizes={sizes}
                lazy
            />
            {children}
        </div>
    );
};

export default ImageCard;
