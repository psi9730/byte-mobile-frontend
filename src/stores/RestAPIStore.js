import React, { useState } from "react";
import jsonServerRestClient from "/apiClient/jsonServer";

const RestAPIContext = React.createContext(null);

const RestAPIProvider = ({ children }) => {
    const RestAPI = jsonServerRestClient(
        "http://ec2-52-78-231-61.ap-northeast-2.compute.amazonaws.com/v1"
    );
    const store = RestAPI;

    return (
        <RestAPIContext.Provider value={store}>
            {children}
        </RestAPIContext.Provider>
    );
};

export { RestAPIProvider, RestAPIContext };
