import { em, linearGradient, rem, rgb, rgba } from "polished";

const size = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "425px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px",
};

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`,
};
// theme.js
export const breakpoints = [
    "375px",
    "425px",
    "768px",
    "1024px",
    "1440px",
    "2560px",
];

export const mediaQueries = {
    // Under mobile size
    large: `@media screen and (min-width: ${breakpoints[0]})`,
    least: `@media screen and (max-width: ${em(350)})`,
    small: `@media screen and (max-width: ${breakpoints[0]})`, // Over mobile size
};
export const fontSizes = [
    "13px", // p3
    "14px", // p2
    "15px", // p1
    "16px", // h6
    "18px", // h5
    "24px", // h4
    "32px", // h3
    "36px", // h2
    "44px", // h1
];

export const colors = {
    alpha: {
        black12: rgba(0, 0, 0, 0.12),
        black16: rgba(0, 0, 0, 0.16),
        black80: rgba(0, 0, 0, 0.8),
        gray5: rgba(19, 21, 24, 0.5),
        point50: rgba(77, 0, 235, 0.5),
        white16: rgba(255, 255, 255, 0.16),
        white50: rgba(255, 255, 255, 0.5),
    },
    black: "#000000",
    blue: rgb(0, 122, 255),
    gray: rgb(64, 64, 64),
    purple: rgb(119, 89, 246),
    // gray
    gray5: rgb(252, 252, 253),
    gray10: "#f7f8f9",
    gray20: "#e8ebed",
    gray30: "#dadde0",
    gray40: "#CACACA",
    gray50: "#9EA4AA",
    gray60: "#72787F",
    gray70: "#454C53",
    gray80: "#3a3e45",
    gray90: "#26282B",
    gray100: "#1B1D1F",
    live: linearGradient({
        colorStops: [rgb(111, 32, 255), rgb(255, 33, 255)],
        toDirection: "to right",
    }),
    palette: {
        purple: rgb(119, 89, 246),
        blue: rgb(33, 114, 202),
        green: rgb(67, 174, 89),
        mint: rgb(22, 209, 194),
        orange: rgb(219, 132, 88),
        pink: rgb(233, 89, 124),
        sky: rgb(81, 145, 215),
        yellow: rgb(217, 196, 86),
    },
    point: rgb(77, 0, 235),
    red: rgb(248, 21, 66),
    white: "#ffffff",
};

export const fontWeights = {
    bold: 700,
    normal: 400,
};

export const lineHeights = {
    heading: 1.3,
    paragraph: 1.4,
};

export const letterSpacings = ["-0.4px", "-0.3px"];

const shadows = {
    box: `0 4px 12px 0 ${rgba(colors.gray90, 0.15)}`,
    dropdown: { list: `0 2px 2px 0 ${rgba(colors.gray100, 0.2)}` },
    modal: `0 8px 12px 0 ${rgba(colors.gray90, 0.15)}`,
    toast: `0 2px 10px 0 ${rgba(colors.gray90, 0.2)}`,
    tooltip: `2px 4px 12px 0 ${rgba(colors.gray100, 0.2)}`,
};

export const textStyles = {
    display1: {
        fontSize: rem(56),
        letterSpacing: rem(-0.5),
        lineHeight: 1.39,
    },
    h1: {
        fontSize: rem(44),
        letterSpacing: rem(-0.4),
        lineHeight: 1.32,
    },
    h2: {
        fontSize: rem(36),
        letterSpacing: rem(-0.4),
        lineHeight: 1.33,
    },
    h3: {
        fontSize: rem(32),
        letterSpacing: rem(-0.4),
        lineHeight: 1.34,
    },
    h4: {
        fontSize: rem(24),
        letterSpacing: rem(-0.4),
        lineHeight: 1.33,
    },
    h5: {
        fontSize: rem(18),
        letterSpacing: rem(-0.4),
        lineHeight: 1.38,
    },
    h6: {
        fontSize: rem(16),
        letterSpacing: rem(-0.4),
        lineHeight: 1.31,
    },
    p1: {
        fontSize: rem(15),
        letterSpacing: rem(-0.4),
        lineHeight: 1.4,
    },
    p2: {
        fontSize: rem(14),
        letterSpacing: rem(-0.4),
        lineHeight: 1.43,
    },
    p3: {
        fontSize: rem(13),
        letterSpacing: rem(-0.3),
        lineHeight: 1.4,
    },
};

const buttonSizes = {
    big: {
        height: rem(56),
    },
    medium: {
        height: rem(44),
    },
    small: {
        height: rem(36),
    },
};

const radii = {
    box: "4px",
    text: "2px",
};

export const zIndices = [10, 98, 100, 138, 140, 198, 200];
zIndices.dropdown = zIndices[0];
zIndices.gnbOverlay = zIndices[1];
zIndices.gnb = zIndices[2];
zIndices.drawerOverlay = zIndices[3];
zIndices.drawer = zIndices[4];
zIndices.modalOverlay = zIndices[5];
zIndices.modal = zIndices[6];

export const lightTheme = {
    breakpoints,
    size,
    buttonSizes,
    colors,
    fontSizes,
    fontWeights,
    letterSpacings,
    lineHeights,
    mediaQueries,
    radii,
    shadows,
    textStyles,
    zIndices,
    device,
};

export const darkTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,
        black: colors.white,
        gray5: colors.gray90,
        gray10: colors.gray80,
        gray20: colors.gray70,
        gray30: colors.gray60,
        gray40: colors.gray50,
        gray50: colors.gray40,
        gray60: colors.gray30,
        gray70: colors.gray20,
        gray80: colors.gray10,
        gray90: colors.gray5,
        gray100: colors.white,
        white: colors.gray100,
    },
};
