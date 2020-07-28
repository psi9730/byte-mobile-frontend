import React from "react";
import { Picture } from "/components/Img";
import { makeImageSrcSet } from "/utils";

export default function Img({ src, rootDir = "/images/", ...props }) {
    const image = src && makeImageSrcSet(src, rootDir);
    return <Picture src={image[0]} {...props} />;
}
