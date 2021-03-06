import styled from "styled-components";
import {
    alignSelf,
    typography,
    color,
    compose,
    display,

    /**
     * Flex Item Props
     */
    flex,
    fontWeight,
    justifySelf,
    /**
     * position
     * zIndex
     * top
     * right
     * bottom
     * left
     */
    position,
    shadow,
    /**
     * margin, m
     * marginTop, mt
     * marginRight, mr
     * marginBottom, mb
     * marginLeft, ml
     * marginX, mx
     * marginY, my
     * padding, p
     * paddingTop, pt
     * paddingRight, pr
     * paddingBottom, p
     * paddingLeft, pl
     * paddingX, px
     * paddingY, py
     */
    space,
    system,
    /**
     * textStyle
     * color
     * textShadow
     * fontWeight
     * textAlign
     */
    textAlign,
    textStyle,
} from "styled-system";

const Text = styled("p")(
    {
        boxSizing: "border-box",
        margin: 0,
    },
    system({
        cursor: true,
        wordBreak: true,
    }),
    compose(
        alignSelf,
        color,
        display,
        flex,
        fontWeight,
        justifySelf,
        position,
        shadow,
        typography,
        space,
        textAlign,
        textStyle
    )
);

Text.displayName = "Text";

Text.defaultProps = {
    color: "gray",
    fontWeight: "normal",
    textStyle: "p1",
};

export default Text;
