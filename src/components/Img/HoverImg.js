import React, { useState, useCallback } from "react";
import { Img } from "/components/Common";
const HoverImage = ({ hoverSrc, src, ...props }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const mouseOver = useCallback(() => {
        setImageSrc(hoverSrc);
        console.log(src);
    }, [hoverSrc]);

    const mouseOut = useCallback(() => {
        setImageSrc(src);
        console.log(src);
    }, [src]);
    const onClick = (e) => {
        e.stopPropagation();
        console.log("Panel Clicked");
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
