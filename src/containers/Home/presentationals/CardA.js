import React from "react";
import clsx from "classnames";
import { rgba } from "polished";
import styled from "styled-components";
import ImageCard from "/components/Card/ImageCard";
import { Box, Flex, LineClamp, Text } from "/components/Common";
import { Button } from "/components/Button";
const AbsoluteContainer = styled(Box)`
    position: absolute;
    /* bottom: 0px; */
    left: 18px;
    bottom: 8%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
`;
const CategoryCard = ({
    data,
    boxShadow,
    onClickLink,
    imageWidth = 200,
    imageHeight = 316,
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
            onClick={() => onClickLink(data.original_article_url)}
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
                            fontWeight="bold"
                            textStyle="h4"
                        >
                            {data.title}
                        </Text>
                        <Text color="white" mt="8px" textStyle="p3">
                            {data.description}
                        </Text>
                    </AbsoluteContainer>
                </ImageCard>
            </a>
        </Box>
    );
};

export default CategoryCard;
