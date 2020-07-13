import React from 'react';
import styled from 'styled-components';
import {
  border,
  borderRadius,
  width,
  maxWidth,
  maxHeight,
  height,
  color,
  backgroundColor,
  justifyContent,
  padding,
} from 'styled-system';
// import styled from 'styled-components';
const BUTTON = styled('button')`
  /* object-fit: contain;
  max-height: 100%;
  height: auto; */
  cursor: pointer;
  ${borderRadius}
  ${border}
  ${width}
  ${color}
  ${backgroundColor}
  ${height}
  ${justifyContent}
  ${maxHeight}
  ${maxWidth}
  ${padding}
`;

BUTTON.defaultProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '100%',
  height: 'auto',
  objectFit: 'contain',
  border: 'none',
};
export default function Button({ onClick, ...props }) {
  return <BUTTON {...props} className="button" onClick={onClick} />;
}
