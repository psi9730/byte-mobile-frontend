import client from "/apiClient/dataProvider";
import { GET_LIST, CREATE, GET_ONE } from "/apiClient/types";

export const postEvent = (params) => {
    // logEvent();
    return client(CREATE, "eventLogs", { data: params })
        .then((res) => res.data)
        .catch((e) => console.log(e));
};
