const fontSizes = [11, 12, 16, 20, 32];
const fontWeights = [500, 700];
const lineHeights = [1, 1.125, 1.25, 1.5];
const letterSpacing = [-0.23, -0.25, -0.63, -0.8, -1];
const radii = ["0px", "4px", "8px", "16px", "48px"];
const space = [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512];

const theme = {
  breakpoints: [32, 48, 64],
  space,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  colors: {
    darkPurple: "#7C5DFA",
    purple: "#9277FF",
    lightPurpleGray: "#7E88C3",
    black: "#0C0E16",
    darkGray: "#141625",
    darkPurpleGray: "#1E2139",
    purpleGray: "#252945",
    gray: "#888EB0",
    lightGray: "#DFE3FA",
    offWhite: "#F8F8FB",
    red: "#EC5757",
    lightRed: "#9277FF",
  },
  radii,
};

// Fonts
theme.fontSizes.body = fontSizes[1];
theme.fontSizes.body2 = fontSizes[0];
theme.fontSizes.h1 = fontSizes[4];
theme.fontSizes.h2 = fontSizes[3];
theme.fontSizes.h3 = fontSizes[2];
theme.fontSizes.h4 = fontSizes[1];

theme.letterSpacing.body = letterSpacing[1];
theme.letterSpacing.body2 = letterSpacing[0];
theme.letterSpacing.h1 = letterSpacing[4];
theme.letterSpacing.h2 = letterSpacing[2];
theme.letterSpacing.h3 = letterSpacing[3];
theme.letterSpacing.h4 = letterSpacing[1];

theme.fontWeights.normal = fontWeights[0];
theme.fontWeights.bold = fontWeights[1];

// Space
theme.space.zero = space[0];
theme.space.small = space[1];
theme.space.medium = space[2];
theme.space.large = space[3];
theme.space.xlarge = space[4];
theme.space.xxlarge = space[5];

export default theme;
