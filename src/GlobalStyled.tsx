import { createGlobalStyle } from "styled-components";
export const Global = createGlobalStyle`
*{
    margin: 0;
    padding:0;
}
html,body{
    heigth:100%;
    margin: 0;
}
input, textarea {
    outline: none;
    border: none;
    border: solid 1px #f2f2f2;
}
`;
