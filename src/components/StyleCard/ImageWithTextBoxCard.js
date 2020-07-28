import React, { useEffect } from "react";
import { cover } from "polished";
import { css } from "styled-components";
import LazyLoad from "vanilla-lazyload";
import { Box, Text } from "/components/Common";
import { ImgNoSrc, Flex } from "/components/Common";
import { darkenHover } from "/styles/image";
import { animatedLinearGradient } from "/styles/mixins";

// Only initialize it one time for the entire application
if (typeof document !== "undefined" && !document.lazyLoadInstance) {
    document.lazyLoadInstance = new LazyLoad({
        elements_selector: "img.lazy",
    });
}

/**
 * Art Direction과 Resolution Switching을 지원하기 위한 반응형 이미지 컴포넌트입니다.
 * ImageShare (https://usercontents-c.styleshare.io) 이미지를 사용한다면 웬만하면 이 컴포넌트 대신
 * FixedPicture 또는 를 사용하기를 권장합니다.
 *
 * 공용 컴포넌트는 차 후 리팩토링 후 modules 폴더로 옮길 예정 입니다.
 *
 * 본 컴포넌트를 계속 사용 하실거라면 alias 된 modules/common 의 것을 import 해 주세요.
 */
const ImageWithTextBoxCard = ({
    alt,
    lazy = false,
    hover = false,
    scale = false,
    data,
    cardWidth = 200,
    cardHeight = 316,
    children,
    imageWidth = 100,
    imageHeight = 100,
    boxShadow,
    borderRadius,
    filter,
    width,
    height,
    ...props
}) => {
    useEffect(() => {
        if (
            lazy &&
            typeof document !== "undefined" &&
            document.lazyLoadInstance
        ) {
            /* eslint-disable */
            document.lazyLoadInstance.update();
            /* eslint-enable */
        }
    }, [lazy]);

    const hasSize =
        typeof imageHeight === "number" && typeof imageWidth === "number";

    return (
        /* TODO: 최 외곽의 div 역할은 picture 요소로도 충분할 것 같습니다. */
        <Box
            width={width ? width : "100%"}
            height={height ? height : "100%"}
            boxShadow={boxShadow}
            borderRadius={borderRadius}
            css={css`
                position: relative;
                overflow: hidden;
                transform: translateZ(0);
                ${hover && darkenHover}
            `}
        >
            {/* TODO: width & height 를 이용하여 비율 맞추는건 ::before 와 같은 seudo element 로 가능합니다. */}
            {hasSize && (
                <div
                    style={{
                        paddingBottom: `${
                            parseFloat((cardHeight / cardWidth).toFixed(2)) *
                            100
                        }%`,
                    }}
                />
            )}
            <ImgNoSrc
                alt={alt}
                imageHeight={imageHeight}
                src={data.imageUrl}
                filter={filter}
                rootDir={""}
                imageWidth={imageWidth}
                lazy
            />
            <Flex
                width={width ? width : "100%"}
                height={height ? height : "100%"}
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Box>
                    <Text mr="12px" fontWeight="bold" textStyle="h5">
                        {data.title}
                    </Text>
                    <Text mr="12px" textStyle="p3" color="gray">
                        {data.description}
                    </Text>
                </Box>
                <Box></Box>
            </Flex>
        </Box>
    );
};

export default ImageWithTextBoxCard;
