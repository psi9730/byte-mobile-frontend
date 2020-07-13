import React, { useEffect } from "react";
import { cover } from "polished";
import { css } from "styled-components";
import LazyLoad from "vanilla-lazyload";
import { Image, Box } from "/components/Common";
import { darkenHover } from "/styles/image";
import { animatedLinearGradient } from "/styles/mixins";

// Only initialize it one time for the entire application
if (typeof document !== "undefined" && !document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad({
    elements_selector: "img.lazy",
  });
}

/**
 * Art Direction과 Resolution Switching을 지원하기 위한 반응형 이미지 컴포넌트입니다.
 * ImageShare (https://usercontents-c.styleshare.io) 이미지를 사용한다면 웬만하면 이 컴포넌트 대신
 * FixedPicture 또는 를 사용하기를 권장합니다.
 *
 * 공용 컴포넌트는 차 후 리팩토링 후 modules 폴더로 옮길 예정 입니다.
 *
 * 본 컴포넌트를 계속 사용 하실거라면 alias 된 modules/common 의 것을 import 해 주세요.
 */
const Picture = ({
  alt,
  lazy = false,
  hover = false,
  scale = false,
  src,
  srcSet,
  sizes,
  sources,
  imageWidth,
  imageHeight,
  boxShadow,
  borderRadius,
  width,
  height,
  ...props
}) => {
  useEffect(() => {
    if (lazy && typeof document !== "undefined" && document.lazyLoadInstance) {
      /* eslint-disable */
      document.lazyLoadInstance.update();
      /* eslint-enable */
    }
  }, [lazy]);

  const hasSize =
    typeof imageHeight === "number" && typeof imageWidth === "number";

  return (
    /* TODO: 최 외곽의 div 역할은 picture 요소로도 충분할 것 같습니다. */
    <Box
      width={width ? width : "100%"}
      height={height ? height : "100%"}
      boxShadow={boxShadow}
      borderRadius={borderRadius}
      css={css`
        position: relative;
        overflow: hidden;
        transform: translateZ(0);
        ${hover && darkenHover}
      `}
    >
      {/* TODO: width & height 를 이용하여 비율 맞추는건 ::before 와 같은 seudo element 로 가능합니다. */}
      {hasSize && (
        <div
          style={{
            paddingBottom: `${
              parseFloat((imageHeight / imageWidth).toFixed(2)) * 100
            }%`,
          }}
        />
      )}
      <picture>
        {sources &&
          sources.map(({ media, sizes, type, srcSet }, index) => (
            <source
              key={index}
              media={media}
              sizes={sizes}
              type={type}
              {...{ [lazy ? "data-srcset" : "srcSet"]: srcSet }}
            />
          ))}
        <Image
          alt={alt}
          {...props}
          className={lazy ? "lazy" : undefined}
          {...{
            [lazy ? "data-src" : "src"]: src,
            [lazy ? "data-srcset" : "srcSet"]: srcSet,
            [lazy ? "data-sizes" : "sizes"]: sizes,
          }}
          css={css`
            display: block;
            width: 100%;
            height: 100%;

            ${hasSize && cover()}

            ${({ theme }) => theme.mediaQueries.large} {
              ${scale &&
              `
            transition-property: transform;
            transition-duration: 250ms;
            transition-timing-function: ease-in-out;

            &:hover {
              transform: scale(1.1) translateZ(0);
            }

              `}
            }

            &.lazy {
              opacity: 0;
              transition-timing-function: ease-in-out;
              transition-duration: 250ms;
              transition-property: opacity;

              &:not(.loaded):before {
                ${cover()}
                ${animatedLinearGradient()}
              }

              &.loaded {
                opacity: 1;
              }

              ${({ theme }) => theme.mediaQueries.large} {
                ${scale &&
                `
                transition-property: transform, opacity;
              `}
              }
            }
          `}
        />
      </picture>
    </Box>
  );
};

export default Picture;
