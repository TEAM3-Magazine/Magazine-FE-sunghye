const device = {
  desktop: "@media screen and (min-width: 1024px)",
  tablet: "@media screen and (min-width: 768px)",
  mobile: "@media screen and (min-width: 320px)",
};

const colors = {
  // mainColor: "#dc7487", // pink,
  mainColor: "#686ef3", // purple,
  // navy: "#14194C",
  white: "#FFFFFF",
  black: "#424242",

  headerBgColor: "#F9F9F9",
  // 4 main colors
  green: "#92A094",
  blue: "#798996",
  warmGrey: "#A8A9AB",
  pink: "#DDB9AE",

  yellow: "#F0F354",

  //btn
  lightGrey: "#C4C4C4",
  mediumGrey: "#888888",
  // mediumGrey: "#888888",

  // add btn
  darkGrey: "#505050",
};

const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  xxl: "32px",
};

const space = {
  md: "16px",
};

const theme = {
  device,
  colors,
  fontSizes,
  space,
};

export default theme;
