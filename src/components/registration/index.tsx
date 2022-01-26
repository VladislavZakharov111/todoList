import React, { useEffect } from "react";
import { addNewUser } from "../../services/GetData";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { checkIsEmail } from "../../services/GetData";
import { FormReg } from "./styled";
import "./registration.css";
import { actionRegistrationError } from "../../store/registerReducer";
import {
  ErrorsValidation,
  regForPassword,
  regForLogin,
} from "../../GlobalConstants/GlobalConstants";
export function Registration() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState<any>("");
  const [password, setPassword] = React.useState<any>("");
  const [flagDidabledReg, setFlagDisabledReg] = React.useState<any>(true);
  const [emailDirty, setEmailDirty] = React.useState<any>(false);
  const [passwordDirty, setPasswordDirty] = React.useState<any>(false);
  const [emailError, setEmailError] = React.useState<any>(
    ErrorsValidation.EmailDontEmpty
  );
  const [passwordError, setPasswordError] = React.useState<any>(
    ErrorsValidation.PasswordDontEmpty
  );

  const currentEmail = useSelector(
    (state: any) => state.registerReducer.currentEmail
  );

  const error = useSelector((state: any) => state.registerReducer.error);
  useEffect(() => {
    if (
      currentEmail !== null &&
      currentEmail.length === 0 &&
      error.length === 0
    ) {
      dispatch(addNewUser(email, password));
    }
  }, [currentEmail]);

  useEffect(() => {
    dispatch(actionRegistrationError(""));
    if (emailError || passwordError) {
      setFlagDisabledReg(true);
    } else {
      setFlagDisabledReg(false);
    }
  }, [email, password]);

  const handleFormReg = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onClickRegistration = () => {
    dispatch(checkIsEmail(email));
  };

  const handleExit = () => {
    dispatch(push("/auth"));
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

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): any => {
    if (!regForLogin.test(String(event.target.value).toLowerCase())) {
      setEmailError(ErrorsValidation.InvalidEmail);
    } else setEmailError("");
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!regForPassword.test(String(event.target.value))) {
      setPasswordError(ErrorsValidation.InvalidPasswordSymbols);
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
  };
  return (
    <div className="App">
      <FormReg>
        <form onSubmit={handleFormReg}>
          <h1>Регистрация</h1>
          {emailDirty && emailError && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <div style={{ color: "red" }}>{error}</div>
          <input
            value={email}
            onChange={handleEmail}
            onBlur={(e) => blurHandler(e)}
            name="email"
            type="email"
            placeholder="Email"
            className={emailError ? "reg_email_error" : "reg_email"}
          />
          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <input
            value={password}
            onChange={(e) => handlePassword(e)}
            onBlur={(e) => blurHandler(e)}
            name="password"
            type="password"
            placeholder="Password"
            className={passwordError ? "reg_password_error" : "reg_password"}
          />
          <button disabled={flagDidabledReg} onClick={onClickRegistration}>
            Зарегестрироваться
          </button>
          <button onClick={handleExit}>Назад</button>
        </form>
      </FormReg>
    </div>
  );
}
