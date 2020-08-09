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
import { ImgNoSrc } from "/components/Common";
import { Box, ScrollContainer } from "/components/Common";
import { CategoryCard } from "/components/StyleCard";
import { ModalContext } from "/stores";
import useIntersect from "../../../hooks/useIntersectionObserver";
import { getCategories } from "../../../services/Category";

import queryString from "query-string";
import { postEvent } from "services/Event";

const LoadingContainer = styled(Box)`
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CategoryArticle = () => {
    const history = useHistory();
    const onClickToast = () => {
        history.push("/about");
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const offset = useRef(0);
    const limit = 2;

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const fetchData = await getCategories({
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
    }, []);
    const loadMoreData = useCallback(async () => {
        const data = await loadData();
        if (data && data.length > 0) {
            setDatas((datas) => datas.concat(data));
            offset.current = offset.current + limit;
        } else setLoadMore(false);
    }, []);

    const onIntersect = useCallback(
        async (entry, observer) => {
            if (loadMore) {
                observer.unobserve(entry.target);
                await loadMoreData();
                observer.observe(entry.target);
            }
        },
        [loadMoreData, loadMore]
    );
    const [_, setRef] = useIntersect(onIntersect, loadMore);

    // useIntersectionObserver({
    //     root: rootRef.current,
    //     target: targetRef.current,
    //     onIntersect: ([{ isIntersecting }]) => {
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
        postEvent({ event_name: "visit_page_explore" });
        return () => {
            offset.current = 0;
            setDatas([]);
            // setLoadMore(true);
        };
    }, []);

    if (datas === undefined || error) {
        return null;
    }

    const onClickCard = (category) => {
        postEvent({
            event_name: "click_category",
            params: { category_id: category },
        });
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify({ category }),
        });
    };
    return (
        <>
            <Box p="48px 0px 0px">
                <ScrollContainer vertical height="100%">
                    <div
                        css={css`
                            padding: 18px 24px;
                            overflow-x: hidden;
                        `}
                    >
                        <div
                            css={`
                                display: flex;
                                flex-wrap: wrap;
                                margin-left: -4px;
                                margin-right: -4px;
                            `}
                        >
                            {datas.map((_data) => {
                                return _data.vertical_image_url ? (
                                    <CategoryCard
                                        css={`
                                            flex-basis: 50%;
                                            width: 50%;
                                            padding-left: 4px;
                                            padding-right: 4px;
                                            margin-bottom: 8px;
                                        `}
                                        onClick={() => onClickCard(_data.id)}
                                        key={_data.id}
                                        data={{
                                            id: _data.id,
                                            title: _data.category_name_kr,
                                            original_article_url:
                                                _data.original_article_url,
                                            image_url: _data.vertical_image_url,
                                            // title: _data.title,
                                            // summary: _data.summary,
                                        }}
                                    />
                                ) : null;
                            })}
                        </div>
                    </div>
                    {/* <div ref={targetRef} /> */}
                    <LoadingContainer ref={setRef}>
                        {loading && (
                            <ImgNoSrc src="loader.gif" width={30} height={30} />
                        )}
                    </LoadingContainer>
                </ScrollContainer>
            </Box>
        </>
    );
};
export default CategoryArticle;
