import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  
  ${reset}

  @font-face {
    font-family: 'Mukta', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500&display=swap');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  *{
    box-sizing: border-box;
    margin : auto
  }

  body {
    margin : auto;
    min-height: 100vh-60px;
    background-color: #f1f3f4;
    font-family: 'Pretendard-Regular';
    font-family: 'Mukta', sans-serif;
    padding: 0px 3rem;
   
   
  }

  a {
    text-decoration: none;
    color : black;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    border: none;
    background-color: transparent;
    outline: none;
  }
`;

export default GlobalStyles;
