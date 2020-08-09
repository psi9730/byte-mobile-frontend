import React, {
    useState,
    useMemo,
    useEffect,
    useCallback,
    useRef,
    useContext,
} from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import request from "/utils/request";
import { Box, Flex, Text, ImgNoSrc } from "/components/Common";
import { CategoryDetailCard } from "/components/StyleCard";
import useIntersect from "hooks/useIntersectionObserver";
import { getArticlesByCategory } from "../../../services/Article";
import { postEvent } from "services/Event";

const LoadingContainer = styled(Box)`
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled(Box)`
    width: 100%;
`;

const CategoryDetailListContainer = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const offset = useRef(0);
    const limit = 2;
    const onIntersect = useCallback(
        async (entry, observer) => {
            if (loadMore) {
                observer.unobserve(entry.target);
                await loadMoreData({ id });
                observer.observe(entry.target);
            }
        },
        [loadMoreData, id, loadMore]
    );
    const onClickLink = (url, id) => {
        postEvent({
            event_name: "click_card_mini",
            params: { article_id: id },
        });
        window.location.href = url;
    };
    const [_, setRef] = useIntersect(onIntersect);

    const loadMoreData = useCallback(
        async (params) => {
            const data = await loadData({ id: params.id });
            if (data && data.length > 0) {
                setDatas((datas) => datas.concat(data));
                offset.current = offset.current + limit;
            } else {
                setLoadMore(false);
            }
        },
        [loadData]
    );

    const loadData = useCallback(async (params) => {
        try {
            setLoading(true);

            const fetchData = await getArticlesByCategory({
                id: params.id,
                pagination: {
                    offset: offset.current,
                    limit: limit,
                },
                sort: { field: "created_at", order: "desc" },
            });
            return fetchData;
        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    });

    // useIntersectionObserver({
    //     root: rootRef.current,
    //     target: targetRef.current,
    //     onIntersect: ([{ isIntersecting }]) => {
    //         console.log(
    //             isIntersecting,
    //             datas,
    //             offset.current,
    //             currentDatas.length
    //         );
    //         if (
    //             isIntersecting &&
    //             offset.current !== undefined &&
    //             currentDatas.length > 0
    //         ) {
    //             loadMoreData();
    //         }
    //     },
    // });

    useEffect(() => {
        offset.current = 0;
        postEvent({
            event_name: "view_category_article",
            params: { category_id: id },
        });

        return () => {
            setDatas([]);
            setLoadMore(true);
        };
    }, [id]);

    if (datas === undefined || error) {
        return null;
    }
    return (
        <Container>
            <Flex flexDirection="column" mt="24px" ml="24px" mr="24px">
                {datas.map((_data) => (
                    <CategoryDetailCard
                        css={`
                            margin-bottom: 24px;
                        `}
                        onClick={onClickLink}
                        key={_data.id}
                        data={{
                            id: _data.id,
                            tags: _data.tags,
                            title: _data.title,
                            original_article_url: _data.original_article_url,
                            image_url: _data.square_image_url,
                        }}
                    />
                ))}
            </Flex>
            <div ref={setRef}>
                <LoadingContainer>
                    {loading && (
                        <ImgNoSrc src="loader.gif" width={30} height={30} />
                    )}
                </LoadingContainer>
            </div>
        </Container>
    );
};

export default CategoryDetailListContainer;
