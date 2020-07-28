import React from "react";
import Modal from "react-modal";
import styled, { css } from "styled-components";
import { ImgNoSrc } from "/components/Common";
const AbsoluteButton = styled.div`
    position: absolute;
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    &:before,
    &:after {
        position: absolute;
        right: 20px;
        top: 20px;
        content: " ";
        height: 40px;

        width: 2px;
        background-color: rgba(0, 0, 0, 0);
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
`;

const FullImage = styled.div``;
const CustomModal = ({
    data,
    isOpen,
    customStyles,
    afterOpenModal,
    closeModal,
    ...props
}) => {
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
