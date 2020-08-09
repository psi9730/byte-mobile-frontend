import client from "/apiClient/dataProvider";
import { GET_LIST, CREATE } from "/apiClient/types";

export const postSurvey = (params) => {
    // logEvent();
    return client(CREATE, "survey", params).then((res) => res.data);
};
