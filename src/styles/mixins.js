import { linearGradient, rem } from "polished";
import {
    css,
    CSSObject,
    keyframes,
    SimpleInterpolation,
} from "styled-components";

import { sizes } from "./variables";

export const media = {
    down: (key) => (...args) => css`
        @media (max-width: ${rem(sizes[key] - 1)}) {
            ${css(...args)}
        }
    `,
    up: (key) => (...args) => css`
        @media (min-width: ${rem(sizes[key])}) {
            ${css(...args)}
        }
    `,
};
/**
 * 특정 방향의 env(safe-area-inset-...) 를 반환..?
 * 뭐라고 설명하지
 */
export const safe = ["left", "right", "top", "bottom"].reduce(
    (res, direction) => {
        res[direction] = (property, defaultValue = 0) => css`
      @supports (${property}: max(0px)) {
        ${property}: max(
          env(safe-area-inset-${direction}, constant(safe-area-inset-${direction}), 0px),
          ${rem(defaultValue)}
        );
      }
    `;

        return res;
    },
    {}
);

const bgAnimation = keyframes`
  0% {
    background-position:0% 50%;
  }
  50% {
    background-position:100% 50%;
  }
  100% {
    background-position:0% 50%;
  }
`;
export const animatedLinearGradient = () => css`
    background-size: 400%;
    ${(props) =>
        linearGradient({
            colorStops: [props.theme.colors.gray20, props.theme.colors.gray10],
            fallback: props.theme.colors.alpha.white50,
            toDirection: "to right",
        })};
    animation: ${bgAnimation} 1.2s ease infinite;
`;
