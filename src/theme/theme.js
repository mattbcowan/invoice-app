const theme = {
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
    grayBlue: "#858BB2",
    offWhite: "#F8F8FB",
    red: "#EC5757",
    lightRed: "#FF9797",
  },
  fontSizes: {
    body1: "12px",
    body2: "11px",
    h1: "32px",
    h2: "20px",
    h3: "16px",
    h4: "12px",
  },
  fontWeights: { regular: 500, bold: 700 },
  lineHeights: {
    body1: "15px",
    body2: "18px",
    h1: "36px",
    h2: "22px",
    h3: "24px",
    h4: "15px",
  },
  status: {
    pending: {
      color: "#ff8f00",
      background: "rgba(255, 143, 0, 0.06)",
    },
    paid: {
      color: "#33d69f",
      background: "rgba(51, 214, 159, 0.06)",
    },
    draft: {
      color: "#373b53",
      background: "rgba(55, 59, 83, 0.06)",
    },
  },
  letterSpacing: [-0.23, -0.25, -0.63, -0.8, -1],
  radii: ["0px", "4px", "8px", "16px", "48px"],
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  breakpoints: ["40em", "52em", "64em", "80em"],
};

export default theme;
