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
import { RestAPIContext } from "stores";

import { Box, ScrollContainer } from "/components/Common";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { CategoryCard } from "/components/StyleCard";
import { ModalContext } from "/stores";
import queryString from "query-string";

const LoadingContainer = styled(Box)`
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CategoryArticle = () => {
    const history = useHistory();

    let RestAPI = useContext(RestAPIContext);
    const onClickToast = () => {
        history.push("/about");
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState([]);

    const [currentDatas, setCurrentDatas] = useState([]);
    const offset = useRef(0);
    const rootRef = useRef(null);
    const targetRef = useRef(null);

    const limit = 20;
    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const fetchData = await RestAPI("GET_LIST", `categories`, {
                pagination: {
                    offset: offset.current,
                    limit: limit,
                },
                sort: { field: "created_at", order: "desc" },
            }).then((res) => res.data);
            setCurrentDatas(fetchData);
            return fetchData;
        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [RestAPI]);
    const loadMoreData = useCallback(async () => {
        if (datas.length > 0) {
            offset.current = offset.current + limit;
            const data = await loadData();
            data && data.length > 0 && setDatas([...datas, ...data]);
        }
    }, [datas, loadData]);

    useIntersectionObserver({
        root: rootRef.current,
        target: targetRef.current,
        onIntersect: ([{ isIntersecting }]) => {
            if (isIntersecting && !!offset.current && currentDatas.length > 0) {
                loadMoreData();
            }
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData();
            data && data.length > 0 && setDatas(data);
        };

        fetchData();
    }, [loadData]);
    const onClickCard = (category) => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify({ category }),
        });
    };
    return (
        <>
            {datas ? (
                <Box p="48px 0px 0px">
                    <ScrollContainer vertical height="100%" ref={rootRef}>
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
                                            onClick={() =>
                                                onClickCard(_data.id)
                                            }
                                            key={_data.id}
                                            data={{
                                                id: _data.id,
                                                title: _data.category_name_kr,
                                                original_article_url:
                                                    _data.original_article_url,
                                                image_url:
                                                    _data.vertical_image_url,
                                                // title: _data.title,
                                                // summary: _data.summary,
                                            }}
                                        />
                                    ) : null;
                                })}
                            </div>
                        </div>
                        <LoadingContainer>
                            {loading && (
                                <ImgNoSrc
                                    src="loader.gif"
                                    width={30}
                                    height={30}
                                />
                            )}
                        </LoadingContainer>
                        <div ref={targetRef} />
                    </ScrollContainer>
                </Box>
            ) : null}
        </>
    );
};
export default CategoryArticle;
