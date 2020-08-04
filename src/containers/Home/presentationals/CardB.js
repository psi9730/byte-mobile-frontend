import React, { useEffect } from "react";
import { cover } from "polished";
import styled, { css } from "styled-components";
import LazyLoad from "vanilla-lazyload";
import ImageCard from "/components/Card/ImageCard";
import { Box, Img, Text, LineClamp, ImgNoSrc, Flex } from "/components/Common";
import { HoverImg } from "/components/Img";
import { Button } from "/components/Button";
import { darkenHover } from "/styles/image";
import { animatedLinearGradient } from "/styles/mixins";

// Only initialize it one time for the entire application
if (typeof document !== "undefined" && !document.lazyLoadInstance) {
    document.lazyLoadInstance = new LazyLoad({
        elements_selector: "img.lazy",
    });
}

const AbsoluteContainer = styled(Flex)`
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;
const AbsoluteCategoryContainer = styled(Box)`
    position: absolute;
    /* bottom: 0px; */
    left: 18px;
    top: 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
`;
const AbsoluteLike = styled(Box)`
    position: absolute;
    /* bottom: 0px; */
    right: 18px;
    top: 18px;
    z-index: 10;
`;
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
    lazy = true,
    hover = false,
    scale = false,
    data,
    like,
    onClickLink,
    onClickLike,
    cardWidth = 200,
    cardHeight = 316,
    imageWidth = 100,
    imageHeight = 100,
    imageVariant = "responsive",
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
            onClick={() => onClickLink(data.original_article_url)}
            borderRadius={borderRadius}
            {...props}
            css={css`
                position: relative;
                overflow: hidden;
                background-color: white;
                transform: translateZ(0);
                ${hover && darkenHover};
                overflow: hidden;
                /* border: 1px solid ${({ theme }) => theme.colors.gray20}; */
                border-radius: 8px;
            `}
        >
            <a>
                {/* TODO: width & height 를 이용하여 비율 맞추는건 ::before 와 같은 seudo element 로 가능합니다. */}
                {hasSize && (
                    <div
                        style={{
                            paddingBottom: `${
                                parseFloat(
                                    (cardHeight / cardWidth).toFixed(2)
                                ) * 100
                            }%`,
                        }}
                    />
                )}
                <AbsoluteContainer>
                    <Box>
                        <ImgNoSrc
                            alt={alt}
                            imageHeight={imageHeight}
                            imageWidth={imageWidth}
                            src={data.image_url}
                            filter={filter}
                            rootDir={""}
                            lazy
                        />
                        <AbsoluteCategoryContainer>
                            <Button
                                flex="0 0 auto"
                                borderRadius="24px"
                                backgroundColor="white"
                                justifyContent="center"
                                flexDirection="row"
                                padding="3px 12px"
                                boxShadow="0 6px 4px 0 rgba(0, 0, 0, 0.04)"
                            >
                                <Text textStyle="p3">{data.category}</Text>
                            </Button>
                        </AbsoluteCategoryContainer>
                        <AbsoluteLike
                            width={["24px", "24px", "60px"]}
                            onClick={onClickLike}
                        >
                            {like ? (
                                <Img
                                    src="bookmark_fill.png"
                                    backgroundColor="transparent"
                                />
                            ) : (
                                <Img
                                    src="bookmark.png"
                                    backgroundColor="transparent"
                                />
                            )}
                        </AbsoluteLike>
                    </Box>
                    <Flex
                        flex="1 1 0"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        backgroundColor="white"
                    >
                        <Box m="9px 18px">
                            <Text fontWeight="bold" textStyle="h4">
                                {data.title}
                            </Text>
                            <LineClamp
                                lines={4}
                                mt="8px"
                                lineHeihgt="1.4"
                                textStyle="p3"
                                color="gray"
                            >
                                {data.description}
                            </LineClamp>
                        </Box>
                    </Flex>
                </AbsoluteContainer>
            </a>
        </Box>
    );
};

export default ImageWithTextBoxCard;
