import React, {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
} from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { Box, Flex, Text } from "components/Common";
import {
    CategoryArticleContainer,
    CategoryDetailContainer,
} from "/containers/Explore/containers";

import { ModalContext } from "/stores";
import queryString from "query-string";
const Container = styled(Box)`
    width: 100%;
`;

const datas = [
    { picturePath: "example.png", id: 1 },
    { picturePath: "example_2.png", id: 2 },
    { picturePath: "example.png", id: 3 },
];

const Explore = () => {
    const location = useLocation();
    const [search, setSearch] = useState({});
    let { categoryId, modal } = useContext(ModalContext);

    useEffect(() => {
        setSearch(queryString.parse(location.search));
    }, [location]);

    useEffect(() => {
        if (search && "category" in search) {
            modal[1](true);
            categoryId[1](search.category);
        } else {
            modal[1](false);
        }
    }, [modal, search, categoryId]);

    return (
        <Container pt={["40px", "60px"]}>
            <CategoryArticleContainer />
            <CategoryDetailContainer />
        </Container>
    );
};

export default Explore;
