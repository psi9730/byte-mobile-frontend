import React from "react";
import clsx from "classnames";
import { rgba } from "polished";
import styled from "styled-components";
import ImageCard from "/components/Card/ImageCard";
import { Box, Flex, LineClamp, Text } from "/components/Common";

const ItemCard = ({
    data,
    imageSize = 312,
    imageVariant = "responsive",
    compact = false,
    showLikes = true,
    showReviews = true,
    isWebview = false,
    contextPage,
    previousScreen,
    ...props
}) => {
    return (
        <Box
            {...props}
            className={clsx("item-card", props.className)}
            data-context_page={contextPage}
            data-styles_id={data.id}
        >
            <a className="item-card__link" href={data.original_article_url}>
                <ImageCard
                    alt={data.id}
                    bg="alpha.black12"
                    imageHeight={imageSize}
                    imageUrl={data.image_url}
                    imageWidth={imageSize}
                    variant={imageVariant}
                ></ImageCard>
            </a>
            <LineClamp
                my={compact ? "6px" : "12px"}
                lines={2}
                mr="12px"
                fontWeight="bold"
                textStyle="h5"
            >
                {data.title}
            </LineClamp>
            <LineClamp lines={4} mt="8px" mr="12px" textStyle="p2">
                {data.summary}
            </LineClamp>
        </Box>
    );
};

export default ItemCard;
