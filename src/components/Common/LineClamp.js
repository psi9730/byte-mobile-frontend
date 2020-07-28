import React, { forwardRef, useMemo } from "react";
import { math } from "polished";
import styled from "styled-components";
import { system } from "styled-system";

import { mediaQueries, textStyles } from "/styles/theme/desktop";

import Text from "./Text";

function convertToArray(value) {
    if (Array.isArray(value)) {
        return value;
    } else {
        return [value];
    }
}

function getFilledArray(arr, length) {
    return Array.from({ length }, (v, i) =>
        i < arr.length ? arr[i] : arr[arr.length - 1]
    );
}

const LineClamp = forwardRef(
    ({ keepHeight, lines, textStyle = "p1", ...props }, ref) => {
        const height = useMemo(() => {
            const _lines = convertToArray(lines);
            const textStyleKeys = convertToArray(textStyle);
            const queries = [null, mediaQueries.large];

            const maxLength = Math.max(
                _lines.length,
                textStyleKeys.length,
                queries.length
            );
            const filledLines = getFilledArray(_lines, maxLength);
            const filledTextStyleKeys = getFilledArray(
                textStyleKeys,
                maxLength
            );

            return queries.map((media, index) => {
                const textStyle = textStyles[filledTextStyleKeys[index]];
                /* eslint-disable */
                const fontSize =
                    // @ts-ignore
                    (media && textStyle[media] && textStyle[media].fontSize) ||
                    textStyle.fontSize;
                const lineHeight =
                    // @ts-ignore
                    (media &&
                        textStyle[media] &&
                        textStyle[media].lineHeight) ||
                    textStyle.lineHeight;
                /* eslint-enable */

                return math(
                    `${fontSize} * ${lineHeight} * ${filledLines[index]}`
                );
            });
        }, [lines, textStyle]);

        return (
            <StyledLineClamp
                ref={ref}
                height={height}
                keepHeight={keepHeight}
                lines={lines}
                textStyle={textStyle}
                {...props}
            />
        );
    }
);
LineClamp.displayName = "LineClamp";
LineClamp.defaultProps = {
    color: "gray90",
    fontWeight: "normal",
    textStyle: "p1",
};

const StyledLineClamp = styled(Text)`
  display: -webkit-box;
  height: ${(props) => (props.keepHeight ? undefined : props.height[0])};
  max-height: ${(props) => (props.keepHeight ? props.height[0] : undefined)};
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;

  /* ${(props) => props.theme.mediaQueries.large} {
    height: ${(props) => (props.keepHeight ? undefined : props.height[1])};
    max-height: ${(props) => (props.keepHeight ? props.height[1] : undefined)};
  } */

  ${system({ lines: { property: "WebkitLineClamp" } })}
`;

export default LineClamp;
