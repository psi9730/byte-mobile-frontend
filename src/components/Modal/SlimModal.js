import React from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { Box, Flex, Text } from "/components/Common";
import { Button } from "/components/Button";
const ModalOverlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  opacity: 0.5;
`;
const ModalWrapper = styled(Flex)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  justify-content: flex-end;
  flex-direction: column;
  visibility: ${props => (props.isShowing ? "visible" : "hidden")};
  transition: visibility 0.6s linear;
`;
const fadeIn = keyframes`
  from {
    bottom: -200px;
    opacity: 0;
  }

  to {
    bottom: 0px;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    bottom: 0px;
    opacity: 1;
  }

  to {
    bottom: -200px;
    opacity: 0;
  }
`;
const Modal = styled(Box)`
  position: relative;
  visibility: ${props => (props.isShowing ? "visible" : "hidden")};
  animation: ${props => (props.isShowing ? fadeIn : fadeOut)} 0.6s linear;
  transition: visibility 0.6s linear;
  z-index: 100;
  position: relative;
  margin: 1.75rem auto;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  padding: 1rem;
  box-shadow: 0 6px 4px 0 rgba(0, 0, 0, 0.04);
`;
const CustomModal = ({
  isShowing,
  hide,
  onClick,
  textColor,
  backgroundColor,
  data
}) =>
  ReactDOM.createPortal(
    <React.Fragment>
      {/* <ModalOverlay /> */}
      <ModalWrapper
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        isShowing={isShowing}
        onClick={() => hide(false)}
        role="dialog"
      >
        <Modal
          backgroundColor={backgroundColor}
          isShowing={isShowing}
          className="modal"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text textStyle="p1" color={textColor} whiteSpace="pre-wrap">
              {data.text}
            </Text>
            <Button
              flex="0 0 auto"
              borderRadius="12px"
              backgroundColor={textColor}
              color={backgroundColor}
              justifyContent="center"
              flexDirection="row"
              padding="6px 12px"
              onClick={onClick}
              boxShadow="0 6px 4px 0 rgba(0, 0, 0, 0.04)"
            >
              <Text textStyle="p1" color={backgroundColor} fontWeight="bold">
                {data.button}
              </Text>
            </Button>
          </Flex>
        </Modal>
      </ModalWrapper>
    </React.Fragment>,
    document.body
  );

export default CustomModal;
