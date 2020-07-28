import React from "react";
import Modal from "react-modal";
import styled, { css } from "styled-components";
import { ImgNoSrc } from "/components/Common";
const AbsoluteButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    &:before,
    &:after {
        position: absolute;
        right: 0px;
        top: 0px;
        content: " ";
        height: 30px;
        width: 2px;
        background-color: transparent;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
`;

const FullImage = styled.div`
    overflow-y: hidden;
    overflow-x: hidden;
`;
const CustomModal = ({
    data,
    isOpen,
    afterOpenModal,
    closeModal,
    ...props
}) => {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px",
            width: "95%",
        },
        overlay: { background: "rgba(0,0,0,0.7)" },
    };

    return (
        <Modal
            {...props}
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <FullImage backgroundImage={data.modalUrl}>
                <ImgNoSrc src={data.modalUrl} />
            </FullImage>
            <AbsoluteButton onClick={closeModal} />
        </Modal>
    );
};

export default CustomModal;
