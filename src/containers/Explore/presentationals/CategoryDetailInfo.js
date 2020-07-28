import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import request from "/utils/request";
import { Box, Flex, Text } from "/components/Common";
import { HorizontalCard } from "/components/StyleCard";
import { Slider } from "/components/Slider";
import { ModalHeader } from "/components/Header";

const Container = styled(Box)`
    width: 100%;
`;

const CategoryDetailInfo = ({ data }) => {
    console.log(data);
    return data ? (
        <>
            <HorizontalCard
                mt="24px"
                ml="24px"
                mr="24px"
                data={{
                    id: data.id,
                    category: data.category,
                    original_article_url: data.original_article_url,
                    image_url: data.horizontal_image_url,
                }}
            />
            {/* <Box p="12px 0px">
                <Text
                    textStyle="h5"
                    pl="24px"
                    pr="24px"
                    pb="17px"
                    fontWeight="bold"
                >
                    {data.tag}
                </Text>
            </Box> */}
        </>
    ) : null;
};

export default CategoryDetailInfo;
