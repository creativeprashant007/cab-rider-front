import { createGlobalStyle } from "styled-components";

 const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    height: 100vh;
    width: 100% ;
    background: linear-gradient(to bottom,rgba(255, 230, 205, 228), rgba(255, 218, 213, 217),rgba(255, 234, 255, 251));
  
  }
`
    
  
export {GlobalStyles}