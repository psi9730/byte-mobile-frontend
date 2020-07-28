import React from "react";
import clsx from "classnames";
import ImageCard from "/components/Card/ImageCard";
import { Box, Flex, LineClamp, Text } from "/components/Common";

const HorizontalCard = ({
    data,
    imageWidth = 300,
    imageHeight = 200,
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
                    // filter={"brightness(50%)"}
                />
            </a>
        </Box>
    );
};

export default HorizontalCard;
