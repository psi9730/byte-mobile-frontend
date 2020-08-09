import React, { useState, useCallback } from "react";
import { Img } from "/components/Common";
const HoverImage = ({ hoverSrc, src, ...props }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const mouseOver = useCallback(() => {
        setImageSrc(hoverSrc);
    }, [hoverSrc]);

    const mouseOut = useCallback(() => {
        setImageSrc(src);
    }, [src]);
    const onClick = (e) => {
        e.stopPropagation();
    };
    return (
        <Img
            src={imageSrc}
            {...props}
            onClick={onClick}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
        />
    );
};

export default HoverImage;
