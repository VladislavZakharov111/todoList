import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { FormReg } from "./class";
import { getUserByEmail, setNewPassword } from "./GetData";
import "./ForgotPassword.css";
import { push } from "connected-react-router";
import { ErrorsValidation } from "../../GlobalConstants/GlobalConstants";
import {
  regForLogin,
  regForPassword,
} from "../../GlobalConstants/GlobalConstants";
export const ForgotPassword = () => {
  const [email, setEmail] = React.useState<any>("");
  const [password, setPassword] = React.useState<any>("");
  const [flagDidabledReg, setFlagDisabledReg] = React.useState<any>(true);
  const [emailDirty, setEmailDirty] = React.useState<any>(false);
  const [passwordDirty, setPasswordDirty] = React.useState<any>(false);
  const [checkNotBeignStyle, setCheckNotBeignStyle] =
    React.useState<any>(false);
  const [dataError, setDataError] = React.useState<any>("");
  const [emailError, setEmailError] = React.useState<any>(
    ErrorsValidation.EmailDontEmpty
  );
  const [passwordError, setPasswordError] = React.useState<any>(
    ErrorsValidation.PasswordDontEmpty
  );
  const [formValid, setFormValid] = React.useState<any>(false);
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
              <h3>Забыли пароль</h3>
              <p>Введите email</p>
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
              <p>Введите новый пароль</p>
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
              <p>Введите дату рождения</p>
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
                Востановить пароль
              </button>
              <button onClick={() => dispatch(push("/auth"))}>Назад</button>
            </form>
          </div>
        </FormReg>
      </div>
    </div>
  );
};
