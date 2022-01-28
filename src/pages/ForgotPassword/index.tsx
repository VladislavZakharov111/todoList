import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { FormReg } from "./class";
import { getUserByEmail, setNewPassword } from "./GetData";
import "./ForgotPassword.css";
import { push } from "connected-react-router";
import { ErrorsValidation } from "../../constants/GlobalConstants";
import { regForLogin, regForPassword } from "../../constants/GlobalConstants";
import { nameTitlePopUpForgotPassword } from "./constants";
export const ForgotPassword = () => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [flagDidabledReg, setFlagDisabledReg] = useState<any>(true);
  const [emailDirty, setEmailDirty] = useState<any>(false);
  const [passwordDirty, setPasswordDirty] = useState<any>(false);
  const [checkNotBeignStyle, setCheckNotBeignStyle] = useState<any>(false);
  const [dataError, setDataError] = useState<any>("");
  const [emailError, setEmailError] = useState<any>(
    ErrorsValidation.EmailDontEmpty
  );
  const [passwordError, setPasswordError] = useState<any>(
    ErrorsValidation.PasswordDontEmpty
  );
  const [formValid, setFormValid] = useState<any>(false);
  const [dataPoint, setDataPoint] = useState(new Date());

  const dispatch = useDispatch();
  const userByEmail = useSelector(
    (state: any) => state.forgotPassworddReducer.email
  );

  const error = useSelector((state: any) => state.forgotPassworddReducer.error);

  useEffect(() => {
    setCheckNotBeignStyle(true);
    if (
      email.length === 0 ||
      password.length === 0 ||
      emailError.length !== 0
    ) {
      setFlagDisabledReg(true);
    } else {
      setFlagDisabledReg(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (userByEmail.length !== 0) {
      if (
        new Date(userByEmail[0].date_of_birth).getFullYear() ===
          dataPoint.getFullYear() &&
        new Date(userByEmail[0].date_of_birth).getMonth() ===
          dataPoint.getMonth() &&
        new Date(userByEmail[0].date_of_birth).getDay() === dataPoint.getDay()
      ) {
        dispatch(setNewPassword(userByEmail[0].id, password));
      } else {
        setDataError(ErrorsValidation.BirthdaysDontEqual);
      }
    }
  }, [userByEmail]);

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

  const handleSubmitFormFogotPassword = (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  };
  const handleClickFogotPassword = () => {
    setDataError("");
    dispatch(getUserByEmail(email));
  };
  return (
    <div className="App">
      <div className="forgot_password">
        <FormReg>
          <div className="form_wrapper_forgot_password">
            <form onSubmit={handleSubmitFormFogotPassword}>
              <h3>{nameTitlePopUpForgotPassword.forgotPassword}</h3>
              <p>{nameTitlePopUpForgotPassword.inputEmail}</p>
              <input
                type="text"
                onChange={handleEmail}
                onBlur={blurHandler}
                name="email"
                placeholder="Email"
                className={
                  checkNotBeignStyle && emailError.length !== 0
                    ? "input_forgot_password_email_error"
                    : "input_forgot_password_email"
                }
              />
              {emailDirty && emailError && (
                <span style={{ color: "red" }}>{emailError}</span>
              )}
              <span style={{ color: "red" }}>{error}</span>
              <p>{nameTitlePopUpForgotPassword.inputNewPassword}</p>
              <input
                type="password"
                onChange={handlePassword}
                onBlur={blurHandler}
                name="password"
                placeholder="Новый пароль"
                className={
                  checkNotBeignStyle && passwordError.length !== 0
                    ? "input_forgot_password_password_error"
                    : "input_forgot_password_password"
                }
              />
              {passwordDirty && passwordError && (
                <span style={{ color: "red" }}>{passwordError}</span>
              )}
              <p>{nameTitlePopUpForgotPassword.inputBirthDay}</p>
              <DatePicker
                selected={dataPoint}
                required
                onChange={(date: any) => setDataPoint(date)}
                maxDate={new Date()}
              />
              <div style={{ color: "red" }}>{dataError}</div>
              <button
                onClick={handleClickFogotPassword}
                disabled={flagDidabledReg}
              >
                {nameTitlePopUpForgotPassword.recoverPassword}
              </button>
              <button onClick={() => dispatch(push("/auth"))}>
                {nameTitlePopUpForgotPassword.back}
              </button>
            </form>
          </div>
        </FormReg>
      </div>
    </div>
  );
};
