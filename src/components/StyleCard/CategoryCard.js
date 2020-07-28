import React from "react";
import clsx from "classnames";
import { rgba } from "polished";
import styled from "styled-components";
import ImageCard from "/components/Card/ImageCard";
import { Box, Flex, LineClamp, Text } from "/components/Common";

const AbsoluteContainer = styled(Box)`
    position: absolute;
    /* bottom: 0px; */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
`;
const CategoryCard = ({
    data,
    imageWidth = 200,
    imageHeight = 316,
    imageVariant = "responsive",
    compact = false,
    ...props
}) => {
    return (
        <Box
            {...props}
            className={clsx("item-card", props.className)}
            data-styles_id={data.id}
            position="relative"
        >
            <a className="item-card__link" href={data.original_article_url}>
                <ImageCard
                    alt={data.id}
                    bg="alpha.black12"
                    imageHeight={imageHeight}
                    imageUrl={data.image_url}
                    imageWidth={imageWidth}
                    // title={data.title}
                    // summary={data.summary}
                    variant={imageVariant}
                    filter={"brightness(50%)"}
                >
                    <AbsoluteContainer>
                        <Box py={compact ? "6px" : "12px"} mr="12px" ml="6px">
                            <Text
                                color="white"
                                textStyle="h5"
                                textAlign="center"
                            >
                                {data.title}
                            </Text>
                        </Box>
                    </AbsoluteContainer>
                </ImageCard>
            </a>
        </Box>
    );
};

export default CategoryCard;
