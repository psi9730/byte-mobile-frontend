import React from 'react';
import { Picture } from '/components/Img';
import { makeImageSrcSet } from '/utils';

export default function Img({ src, ...props }) {
  const image = makeImageSrcSet(src);
  return <Picture src={image[0]} srcSet={image[1]} {...props} />;
}
