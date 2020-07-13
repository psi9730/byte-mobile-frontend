import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "/components/Common";
import { Link } from "react-router-dom";
import { Image } from "/components/Img";
import Drawer from "./Drawer";

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Header = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <Container width="100%" p="20px 40px">
      <Link to={`/`}>
        <Image src="byte_logo.png" width={["40px", "60px", "68px"]} />
      </Link>
      <Image
        onClick={showDrawer}
        src="menu.png"
        width={["16px", "20px", "24px"]}
        height={["16px", "20px", "24px"]}
      />
      <Drawer visible={visible} onClose={onClose} />
    </Container>
  );
};

export default Header;
