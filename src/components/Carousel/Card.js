import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Box } from "/components/Common";
import { Link, Route, useHistory } from "react-router-dom";
import { Image } from "/components/Img";

const Container = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Card = ({ data }) => {
  const history = useHistory();
  const themeContext = useContext(ThemeContext);

  const onClick = (id) => {
    history.push("/article/" + id);
  };
  return (
    data && (
      <Container onClick={() => onClick(data.id)}>
        <Image
          src={data.picturePath}
          borderRadius="10px"
          boxShadow={themeContext.shadows.box}
          lazy
        />
      </Container>
    )
  );
};

export default Card;
