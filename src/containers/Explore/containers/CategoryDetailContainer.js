import React, { useState, useEffect, useCallback, useContext } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import request from "/utils/request";
import { Box, Flex, Text } from "/components/Common";
import { EditorCard } from "/components/StyleCard";
import { Slider } from "/components/Slider";
import { HoverButton } from "/components/Button";
import { ModalContext } from "/stores";
import { FullModal } from "/components/Modal";
import { ModalHeader } from "/components/Header";
import { CategoryDetailInfo } from "/containers/Explore/presentationals";
import CategoryDetailListContainer from "./CategoryDetailListContainer";
import { RestAPIContext } from "stores";

const CategoryDetailContainer = ({ id, hide }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [title, setTitle] = useState("인공지능");
    let RestAPI = useContext(RestAPIContext);

    useEffect(() => {
        if (data && data.hasOwnProperty("category_name_kr")) {
            setTitle(data.category_name_kr);
        }
    }, [data]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const fetchData = await RestAPI("GET_ONE", `categories`, {
                id: id,
            }).then((res) => res.data);
            return fetchData;
        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [RestAPI]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await loadData();
            result && setData(result);
        };

        fetchData();
    }, [loadData]);
    return (
        <Box p="48px 0px 0px">
            <ModalHeader title={title} onClick={hide} />
            {data && <CategoryDetailInfo data={data} />}
            <CategoryDetailListContainer id={id} />
        </Box>
    );
};

const CategoryDetailFullModalContainer = () => {
    let { categoryId, modal } = useContext(ModalContext);
    const history = useHistory();

    const hide = () => {
        history.push({
            pathname: history.location.pathname,
            search: "",
        });
    };
    return categoryId[0] ? (
        <FullModal
            isShowing={modal[0]}
            children={
                <CategoryDetailContainer id={categoryId[0]} hide={hide} />
            }
        />
    ) : null;
};

export default CategoryDetailFullModalContainer;
