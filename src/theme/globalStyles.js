import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: "Spartan", sans-serif;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.25px;
        font-weight: 500;
    }
    h1 {
        font-size: 32px;
        line-height: 36px;
        letter-spacing: -1px;
        font-weight: 700;
    }
    h2 {
        font-size: 20px;
        line-height: 22px;
        letter-spacing: -0.63px;
        font-weight: 700;
    }
    h3 {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.8px;
        font-weight: 700;
    }
    h4 {
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.25px;
        font-weight: 700;
    }
`;

export default GlobalStyle;
