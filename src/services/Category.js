import client from "/apiClient/dataProvider";
import { GET_LIST, CREATE, GET_ONE } from "/apiClient/types";

export const getCategories = (params) => {
    // logEvent();
    return client(GET_LIST, "categories", params).then((res) => res.data);
};

export const getCategory = (params) => {
    // logEvent();
    return client(GET_ONE, "categories", params).then((res) => res.data);
};
