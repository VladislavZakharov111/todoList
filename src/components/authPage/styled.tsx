import styled from "styled-components";

export const ParentInput = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ParentButton = styled.div`
  display: flex;
`;
export const FormAuth = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 6em;
  margin-top: 150px;
  margin-bottom: auto;
`;
export const FiledEmail = styled.input.attrs({
  type: "text",
  placeholder: "Email",
  name: "email",
})`
  height: 20px;
  margin: 3px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  &:focus {
    border: 1px solid ${(props) => (props.color === "" ? "blue" : "red")};
    box-shadow: 1px 1px 2px 0
      ${(props) => (props.color === "" ? "blue" : "red")};
  }
`;
export const FiledPassword = styled.input.attrs({
  type: "password",
  placeholder: "Password",
  name: "password",
})`
  height: 20px;
  margin: 3px;
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  &:focus {
    border: 1px solid ${(props) => (props.color === "" ? "blue" : "red")};
    box-shadow: 1px 1px 2px 0
      ${(props) => (props.color === "" ? "blue" : "red")};
  }
`;

export const ButtonAuthSubmit = styled.button.attrs({
  type: "submit",
})`
  min-width: 85px;
  height: 30px;
  background-color: #ffdd2d;
  border: 1px solid #ffdd2d;
  font: 13px/18px haas, pragmatica, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica Neue, Arial, sans-serif;
  font-style: normal;
  border-radius: 4px;
  font-variant-ligatures: normal;
  font-variant-caps: normal;
  font-variant-numeric: normal;
  font-variant-east-asian: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 13px;
  line-height: 18px;
  margin: 3px;
  padding: 5px;
  font-family: haas, pragmatica, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", Arial, sans-serif;
  &:hover {
    background-color: #cccc00;
  }
`;

export const ButtonGeneral = styled.p`
  text-decoration: underline;
  min-width: 150px;
  margin: 5px;
  color: grey;
`;
