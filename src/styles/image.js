import { cover, rgba } from 'polished';
import { css } from 'styled-components';

export const darkenHover = css`
  &:active::after {
    background: ${props => rgba(props.theme.colors.gray100, 0.2)};
    display: block;
    content: '';
    ${cover()}
  }
`;
