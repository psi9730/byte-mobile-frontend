import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Drawer } from "antd"
import { Box, Text } from "/components/Common"
import "antd/dist/antd.css"

const LinkContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 40px;
`
const StyledText = styled(Text).attrs({ textStyle: "h6" })``

const CustomDrawer = ({ visible, onClose }) => {
  return (
    <Drawer placement="right" closable={false} onClose={onClose} visible={visible}>
      <LinkContainer>
        <Link onClick={onClose} to={`/`}>
          <StyledText>HOME</StyledText>
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link onClick={onClose} to={`/explore`}>
          <StyledText>EXPLORE</StyledText>
        </Link>
      </LinkContainer>
      <LinkContainer>
        <Link onClick={onClose} to={`/about`}>
          <StyledText>ABOUT</StyledText>
        </Link>
      </LinkContainer>
    </Drawer>
  )
}

export default CustomDrawer
