import styled from 'styled-components';
import {
  border,
  compose,
  flexbox,
  layout,
  space,
  borderRadius,
} from 'styled-system';

const Img = styled('img')(
  {
    display: 'block',
  },
  compose(
    space,
    layout,
    border,
    flexbox,
    borderRadius,
  ),
);

Img.displayName = 'Img';

Img.defaultProps = {
  width: '100%',
};

export default Img;
