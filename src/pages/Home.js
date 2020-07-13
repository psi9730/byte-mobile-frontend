import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { Box } from "components/Common";
import { Image } from "/components/Img";
import { Deck } from "components/Carousel";

const Container = styled(Box)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overscroll-behavior: contain;
`;
const DeckContainer = styled(Box)`
  /* margin: 0 auto; */
  max-width: ${(props) => props.theme.breakpoints[2]};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const DeckInnerContainer = styled(Box)`
  /* margin: 0 auto; */
  ${(props) => css`
    @media ${props.theme.device.mobileS} {
      width: calc(100% - 70px);
    }
    @media ${props.theme.device.mobileL} {
      width: calc(100% - 100px);
    }
    @media ${props.theme.device.tablet} {
      width: calc(100% - 350px);
    }
  `}

  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const datas = [
  { picturePath: "example.png", id: 1 },
  { picturePath: "example_2.png", id: 2 },
  { picturePath: "example.png", id: 3 },
];

const Home = () => {
  return (
    <Container>
      <DeckContainer width="100%" height="100%" mt={["4px", "8px"]}>
        <DeckInnerContainer>
          <Deck datas={datas} />
        </DeckInnerContainer>
      </DeckContainer>
    </Container>
  );
};

export default Home;
