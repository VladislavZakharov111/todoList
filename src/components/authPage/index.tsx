import React, { useEffect, useState } from "react";
import { setDataUsers } from "../../services/Auth/index";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { FormAuth, FiledEmail, ParentInput, ParentButton } from "./styled";
import {
  ButtonAuthSubmit,
  ButtonGeneral,
  FiledPassword,
} from "../../components/authPage/styled";
import { AnyRecord } from "dns";
import { shallowEqual, useSelector } from "react-redux";
import { push } from "connected-react-router";
import {
  ErrorsValidation,
  regForLogin,
} from "../../GlobalConstants/GlobalConstants";
import { AuthNameButton } from "./constants";
function Authorization() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.authReducer.user);
  const [email, setEmail] = useState<string>(" ");
  const [password, setPassword] = useState<string>("");
  const [flagDisable, setFlagDisable] = useState<any>(true);
  const [emailDirty, setEmailDirty] = useState<any>(false);
  const [passwordDirty, setPasswordDirty] = useState<any>(false);
  const [emailError, setEmailError] = useState<any>(
    ErrorsValidation.EmailDontEmpty
  );
  const [passwordError, setPasswordError] = useState<any>(
    ErrorsValidation.PasswordDontEmpty
  );

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      emailError === "" &&
      passwordError === ""
    )
      setFlagDisable(false);
    else setFlagDisable(true);
  }, [email, password]);

  useEffect(() => {
    if (userInfo === 1)
      setPasswordError(ErrorsValidation.EmailPasswordDontValid);
  }, [userInfo, password, email]);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (!regForLogin.test(String(e.target.value).toLowerCase())) {
      setEmailError(ErrorsValidation.InvalidEmail);
    } else setEmailError("");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8)
      setPasswordError(ErrorsValidation.PasswordDontValidLength);
    else setPasswordError("");
  };

  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setDataUsers(email, password));
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>): any => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <div className="App">
      <FormAuth>
        <div>
          <p style={{ fontSize: "20px", margin: "5px" }}>Авторизация</p>
          <form onSubmit={handleSubmitForm}>
            <FiledEmail
              onBlur={blurHandler}
              onChange={(e) => handleLogin(e)}
              color={emailError}
            ></FiledEmail>
            <div>
              {emailDirty && emailError && (
                <span style={{ color: "red" }}>{emailError}</span>
              )}
            </div>
            <div>
              <FiledPassword
                onBlur={blurHandler}
                onChange={(e) => handlePassword(e)}
                color={passwordError}
              />
              <div>
                {passwordDirty && passwordError && (
                  <span style={{ color: "red" }}>{passwordError}</span>
                )}
              </div>
            </div>
            <div>
              <ButtonAuthSubmit disabled={flagDisable}>Войти</ButtonAuthSubmit>
            </div>
            <ButtonGeneral onClick={() => dispatch(push("/register"))}>
              {AuthNameButton.register}
            </ButtonGeneral>
            <ButtonGeneral onClick={() => dispatch(push("/forgot-password"))}>
              {AuthNameButton.forgotPassword}
            </ButtonGeneral>
          </form>
        </div>
      </FormAuth>
    </div>
  );
}

export default Authorization;
