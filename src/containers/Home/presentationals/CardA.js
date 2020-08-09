import React from "react";
import clsx from "classnames";
import { rgba } from "polished";
import styled from "styled-components";
import ImageCard from "/components/Card/ImageCard";
import { Box, Flex, LineClamp, Text, Img } from "/components/Common";
import { Button } from "/components/Button";
const AbsoluteContainer = styled(Box)`
    position: absolute;
    /* bottom: 0px; */
    left: 18px;
    bottom: 8%;
    width: calc(100%-36px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
`;

const AbsoluteLike = styled(Box)`
    position: absolute;
    /* bottom: 0px; */
    right: 18px;
    top: 8%;
    background-color: transparent;
    z-index: 10;
`;

const CategoryCard = ({
    data,
    boxShadow,
    onClickLink,
    onClickLike,
    imageWidth = 200,
    imageHeight = 316,
    like,
    filter,
    imageVariant = "responsive",
    compact = false,
    ...props
}) => {
    return (
        <Box
            {...props}
            className={clsx("item-card", props.className)}
            data-styles_id={data.id}
            onClick={() => onClickLink(data.original_article_url, data.id)}
            backgroundColor="white"
            position="relative"
        >
            <a className="item-card__link">
                <ImageCard
                    alt={data.id}
                    bg="alpha.black12"
                    imageHeight={imageHeight}
                    imageUrl={data.image_url}
                    imageWidth={imageWidth}
                    // title={data.title}
                    // summary={data.summary}
                    variant={imageVariant}
                    filter={filter}
                    boxShadow={boxShadow}
                    border="none"
                >
                    <AbsoluteLike
                        width={["24px", "24px", "36px"]}
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
                    <AbsoluteContainer>
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
                        <Text
                            color="white"
                            mt="8px"
                            mr="18px"
                            fontWeight="bold"
                            textStyle="h4"
                        >
                            {data.title}
                        </Text>
                        <Text
                            color="white"
                            mt="8px"
                            mr="18px"
                            textStyle="p2"
                            // wordBreak="keep-all"
                        >
                            {data.description}
                        </Text>
                    </AbsoluteContainer>
                </ImageCard>
            </a>
        </Box>
    );
};

export default CategoryCard;
