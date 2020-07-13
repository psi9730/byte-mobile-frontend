import React from 'react';
import styled, { css } from 'styled-components';
// import styled from 'styled-components';
function createCSS(count) {
  let styles = '';

  for (let i = 1; i < count; i += 1) {
    styles += `
         & a:nth-child(${i}).active ~ hr {
            -webkit-transform: translateX(${(i - 1) * 100}%);
            transform: translateX(${(i - 1) * 100}%);
         }
       `;
  }

  return css`
    ${styles}
  `;
}
const NavContainer = styled.div`
  width: ${props => props.scrollWidth || '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Nav = styled.nav`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 20px;
  width: 80%;
  position: relative;
  ${props =>
    props.backgroundColor &&
    css`
      background: ${props.backgroundColor};
    `}
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  ${props => props.count && createCSS(props.count)}
  ${props =>
    props.count &&
    css`
      & hr {
        width: calc(100% / ${props.count});
        background-color: ${props.highlighterColor
          ? props.highlighterColor
          : 'rgb(0,0,0)'};
      }
    `}
`;

const Highlighter = styled.hr`
  -webkit-transition: all 375ms ease-out;
  transition: all 375ms ease-out;
  will-change: transform, background;
  position: absolute;
  bottom: -2px;
  left: 0;
  margin: 0;
  border: 0;
  border-radius: 2px;
  height: 4px;
  ${props =>
    props.count &&
    css`
      width: calc(100% / ${props.count});
    `}
`;

const Anchor = styled.a`
  display: block;
  text-align: center;
  text-transform: capitalize;
  color: rgb(0, 0, 0, 0);

  ${props =>
    props.selected &&
    props.index &&
    css`
      ~ hr {
        background-color: ${props.color ? props.color : 'rgb(0,0,0)'};
        -webkit-transition: all 250ms ease-out;
        transition: all 250ms ease-out;
        -webkit-transform: translateX(${props.index * 100}%);
        transform: translateX(${props.index * 100}%);
      }
    `}
  &:hover {
  }
`;

export default function ScrollBar({
  list,
  index,
  onClick,
  scrollWidth,
  ...props
}) {
  return (
    <NavContainer scrollWidth={scrollWidth}>
      <Nav
        count={list.length}
        className="tab-link"
        color={props.anchorColor}
        highlighterColor={props.highlighterColor}
        backgroundColor={props.anchorColor}
      >
        {list.map((value, i) => {
          return (
            <Anchor
              key={i}
              index={i}
              color={props.highlighterColor}
              onClick={() => onClick(i)}
              selected={index === i ? true : false}
            >
              {i}
            </Anchor>
          );
        })}
        <Highlighter color={props.highlighterColor} />
      </Nav>
    </NavContainer>
  );
}
