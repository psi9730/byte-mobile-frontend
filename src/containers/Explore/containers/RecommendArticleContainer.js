import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import request from "/utils/request";
import { Box, Flex, Text } from "/components/Common";
import { EditorCard } from "/components/StyleCard";
import { Slider } from "/components/Slider";

const Container = styled(Box)`
    width: 100%;
`;

const RecommendArticleContainer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState([
        {
            id: 1661925285,
            title: "저스트고와 워워크의 차이는?그런데 나는 잘 모르겠다.",
            summary:
                "관심있는 카테고리의 뉴스업데이트를 받아보세요 카테고리를 클릭해서 관련된 뉴스를 읽어보세요",
            category: "카테고리",
            tags: "태그들",
            original_article_url: "https://www.naver.com",
            editor_id: 0,
            horizontal_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Horizontal/Horizontal_1661925285.jpg",
            square_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Square/Square_1661925285.jpg",
            vertical_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Vertical/Vertical_1661925285.jpg",
            created_time: "2020-07-14T15:57:26",
        },
        {
            id: 1661925285,
            title: "네이버의 멤버십",
            summary:
                "비대면 분야는 크게 의료, 교육, 소비·물류, 오피스, 엑티비티, 지역콘텐츠, 비대면 기반기술 분야 7개로 나뉘고, 7개 분야에 포함되지는 않으나 스타트업이 비대면 유망 창업아이템이 있는 경우 제안할 수 있도록 ⑧유레카 분야도 구분해 운영할 계획이다.",
            category: "카테고리",
            tags: "태그들",
            original_article_url: "https://www.naver.com",
            editor_id: 0,
            horizontal_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Horizontal/Horizontal_1661925285.jpg",
            square_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Horizontal/Horizontal_1661925285.jpg",
            vertical_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Vertical/Vertical_1661925285.jpg",
            created_time: "2020-07-14T15:57:26",
        },
        {
            id: 1661925285,
            title: "저스트고와 워워크의 차이는?",
            summary:
                "관심있는 카테고리의 뉴스업데이트를 받아보세요 카테고리를 클릭해서 관련된 뉴스를 읽어보세요",
            category: "카테고리",
            tags: "태그들",
            original_article_url: "https://www.naver.com",
            editor_id: 0,
            horizontal_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Horizontal/Horizontal_1661925285.jpg",
            square_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Square/Square_1661925285.jpg",
            vertical_image_url:
                "https://cf-simple-s3-origin-cloudfrontfors3-400138438410.s3.amazonaws.com/Vertical/Vertical_1661925285.jpg",
            created_time: "2020-07-14T15:57:26",
        },
    ]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const datas = await request
                .getList(`editor/`)
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
        <Box p="28px 0px">
            <Text textStyle="h6" pl="24px" pb="17px" fontWeight="bold">
                에디터 추천 BYTE
            </Text>
            <Slider gutter={8} perView={2} trackPadding={24}>
                {datas &&
                    datas.map((_data) => {
                        return (
                            <EditorCard
                                key={_data.article_id}
                                data={{
                                    id: _data.article_id,
                                    original_article_url:
                                        _data.original_article_url,
                                    image_url: _data.square_image_url,
                                    title: _data.title,
                                    tags: _data.tags,
                                }}
                            />
                        );
                    })}
            </Slider>
        </Box>
    );
};

export default RecommendArticleContainer;
