import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    color: #3f0b31;
    min-height: 100vh;

    background:
      radial-gradient(900px 700px at 15% 10%, rgba(255,105,180,0.22), transparent 60%),
      radial-gradient(700px 500px at 85% 30%, rgba(255,215,0,0.18), transparent 55%),
      linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.45)),
      url("/pink-bg.png");

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
  }

  button, input { font: inherit; }

  :focus-visible {
    outline: 2px solid rgba(255,105,180,0.75);
    outline-offset: 2px;
    border-radius: 10px;
  }
`
