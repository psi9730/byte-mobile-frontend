import React, { useState } from "react";

const ModalContext = React.createContext(null);

const ModalProvider = ({ children }) => {
    const [isShowing, setIsShowing] = useState(false);
    const [categoryId, setCategoryId] = useState();
    const store = {
        modal: [isShowing, setIsShowing],
        categoryId: [categoryId, setCategoryId],
    };

    return (
        <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
    );
};

export { ModalProvider, ModalContext };
