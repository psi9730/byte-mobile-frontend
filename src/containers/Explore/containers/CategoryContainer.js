import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import request from "/utils/request";
import { Box, Flex, Text } from "/components/Common";
import { EditorCard } from "/components/StyleCard";
import { Slider } from "/components/Slider";
import { HoverButton } from "/components/Button";
import { CategoryArticleContainer } from "/containers/Explore/containers";

const CategoryContainer = () => {
    return (
        <Box p="48px 0px 0px">
            {/* <Text
                textStyle="h6"
                pl="24px"
                pt="32px"
                pb="17px"
                fontWeight="bold"
            >
                카테고리별 BYTE를 만나보세요
            </Text> */}
            {/* <Slider gutter={8} perView={4} trackPadding={24}>
                {datas &&
                    datas.map((data) => {
                        return (
                            <HoverButton
                                width="100%"
                                borderRadius="8px"
                                border="1.5px solid rgb(0,0,0)"
                                backgroundColor="rgb(255,255,255)"
                                justifyContent="center"
                                type="submit"
                            >
                                <Text>{data.tag}</Text>
                            </HoverButton>
                        );
                    })}
            </Slider> */}
            <CategoryArticleContainer />
        </Box>
    );
};

export default CategoryContainer;
