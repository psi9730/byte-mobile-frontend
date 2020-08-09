import client from "/apiClient/dataProvider";
import { GET_LIST, CREATE, GET_ONE } from "/apiClient/types";

export const getArticles = (params) => {
    // logEvent();
    return client(GET_LIST, "articles", params).then((res) => res.data);
};

export const getArticlesByCategory = (params) => {
    return client(
        GET_LIST,
        "categories/" + params.id + "/articles",
        params
    ).then((res) => res.data);
};

export const getCategoriesByArticle = (params) => {
    return client(
        GET_LIST,
        "categories/" + params.id + "/articles",
        params
    ).then((res) => res.data);
};
