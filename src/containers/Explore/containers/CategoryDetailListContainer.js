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
import { Box, Flex, Text } from "/components/Common";
import { CategoryDetailCard } from "/components/StyleCard";
import { RestAPIContext } from "stores";
import useIntersectionObserver from "hooks/useIntersectionObserver";

const Container = styled(Box)`
    width: 100%;
`;

const CategoryDetailListContainer = ({ id }) => {
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

    const limit = 4;
    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const fetchData = await RestAPI(
                "GET_LIST",
                `categories/` + id + "/articles",
                {
                    id,
                    pagination: {
                        offset: offset.current,
                        limit: limit,
                    },
                    sort: { field: "created_at", order: "desc" },
                }
            ).then((res) => res.data);
            setCurrentDatas(fetchData);
            return fetchData;
        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [RestAPI, id]);
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
            if (data) {
                setDatas(data);
            } else {
                setDatas([]);
            }
        };

        fetchData();
    }, [loadData]);
    return datas.length > 0 ? (
        <Flex flexDirection="column" mt="24px" ml="24px" mr="24px">
            {datas.map((_data) => (
                <CategoryDetailCard
                    css={`
                        margin-bottom: 24px;
                    `}
                    key={_data.id}
                    data={{
                        id: _data.id,
                        tags: _data.tags,
                        title: _data.title,
                        original_article_url: _data.original_article_url,
                        image_url: _data.square_image_url,
                        // title: _data.title,
                        // summary: _data.summary,
                    }}
                />
            ))}
        </Flex>
    ) : null;
};

export default CategoryDetailListContainer;
