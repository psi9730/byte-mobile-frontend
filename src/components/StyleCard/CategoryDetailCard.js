import React from "react";
import clsx from "classnames";
import { rgba } from "polished";
import styled from "styled-components";
import ImageCard from "/components/Card/ImageCard";
import { Box, Flex, LineClamp, Text } from "/components/Common";

const CategoryDetailCard = ({
    data,
    imageSize = 312,
    imageVariant = "responsive",
    compact = false,
    showLikes = true,
    showReviews = true,
    isWebview = false,
    ...props
}) => {
    return data.image_url ? (
        <a href={data.original_article_url}>
            <Flex
                {...props}
                flexDirection="row"
                className={clsx("item-card", props.className)}
                data-styles_id={data.id}
                href={data.original_article_url}
            >
                <Box flex="1 1 0">
                    <ImageCard
                        alt={data.id}
                        bg="alpha.black12"
                        imageHeight={imageSize}
                        imageUrl={data.image_url}
                        imageWidth={imageSize}
                        variant={imageVariant}
                    ></ImageCard>
                </Box>
                <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    mt="8px"
                    mb="8px"
                    ml="16px"
                    flex="1.6 1 0"
                >
                    <Text mr="12px" fontWeight="bold" textStyle="h5">
                        {data.title}
                    </Text>
                    <LineClamp
                        lines={1}
                        mr="12px"
                        textStyle="p3"
                        color="gray60"
                    >
                        {data.tags &&
                            data.tags.map((tag) => "#" + tag).join(" ")}
                    </LineClamp>
                </Flex>
            </Flex>
        </a>
    ) : null;
};

export default CategoryDetailCard;
