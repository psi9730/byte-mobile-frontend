import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import request from "/utils/request";
import { Box, Flex, Text } from "/components/Common";
import { EditorCard } from "/components/StyleCard";
import { Slider } from "/components/Slider";
import { HoverButton } from "/components/Button";
import { CategoryArticleContainer } from "/containers/Explore/containers";

const CategoryContainer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState([
        {
            id: 1,
            category: "병아리",
        },
        {
            id: 2,
            category: "최신",
        },
        {
            id: 3,
            category: "IT",
        },
    ]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const datas = await request
                .getList(`/tag/`)
                .then((res) => res.data);
            return datas;
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
            return [];
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await loadData();
            result.length > 0 && setDatas(result);
        };

        fetchData();
    }, [loadData]);
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
