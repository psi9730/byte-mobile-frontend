import styled from "styled-components";
import {
    alignSelf,

    /**
     * backgroundImage
     * backgroundSize
     * backgroundPosition
     * backgroundRepeat
     */
    background,

    /**
     * border
     * borderTop
     * borderRight
     * borderBottom
     * borderLeft
     * borderWidth
     * borderStyle
     * borderColor
     * borderRadius
     */
    border,
    boxShadow,

    /**
     * color
     * backgroundColor, bg
     */
    color,
    compose,
    /**
     * Flex Item Props
     */
    flex,
    flexBasis,
    justifySelf,
    /**
     * width
     * height
     * display
     * minWidth
     * minHeight
     * maxWidth
     * maxHeight
     * size (width & height)
     * verticalAlign
     */
    layout,
    order,

    /**
     * overflow
     */
    overflow,

    /**
     * position
     * zIndex
     * top
     * right
     * bottom
     * left
     */
    position,
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
    // Types
    system,
    // 이거 나중에 제거하는게 좋을 듯
    textAlign,
} from "styled-system";
const Box = styled("div")(
    {
        boxSizing: "border-box",
        whiteSpace: "pre-line",
    },
    compose(
        space,
        color,
        layout,
        position,
        overflow,
        flex,
        flexBasis,
        alignSelf,
        justifySelf,
        order,
        border,
        boxShadow,
        background,
        textAlign
    ),
    system({
        flexGrow: true,
        flexShrink: true,
    })
);
Box.displayName = "Box";

export default Box;
