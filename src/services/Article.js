import client from "/apiClient/dataProvider";
import { GET_LIST, CREATE } from "/apiClient/types";

export const getArticles = (params) => {
    // logEvent();
    return client(GET_LIST, "articles", params).then((res) => res.data);
};

export const likeArticle = (params) => {
    return client(
        CREATE,
        "articles/" + params.article_id + "/likes",
        params
    ).then((res) => res.data);
};

export const getArticlesByCategory = (params) => {
    return client(
        GET_LIST,
        "categories/" + params.id + "/articles",
        params
    ).then((res) => res.data);
};
