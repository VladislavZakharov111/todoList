import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../fogotPassword/ForgotPassword.css";
import DatePicker from "react-datepicker";

export const ForgotPassword = () => {
  const [email, setEmail] = React.useState<any>("");
  const [password, setPassword] = React.useState<any>("");
  const [flagDidabledReg, setFlagDisabledReg] = React.useState<any>(true);
  const [emailDirty, setEmailDirty] = React.useState<any>(false);
  const [passwordDirty, setPasswordDirty] = React.useState<any>(false);
  const [emailError, setEmailError] = React.useState<any>(
    "Email не может быть пустым"
  );
  const [passwordError, setPasswordError] = React.useState<any>(
    "Пароль не может быть пустым"
  );
  const [formValid, setFormValid] = React.useState<any>(false);
  const [dataPoint, setDataPoint] = useState(new Date());

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
    const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!reg.test(String(event.target.value).toLowerCase())) {
      setEmailError("Некоретный email ");
    } else setEmailError("");
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const reg =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
    if (!reg.test(String(event.target.value))) {
      setPasswordError(
        "Пароль должен содержать цифры, буквы (в том числе и заглавную) и хотя бы один из спец. символов !@$%^&*()_-+"
      );
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
  };

  const handleSubmitFormFogotPassword = () => {};
  const handleClickFogotPassword = () => {};
  return (
    <div>
      <form onSubmit={handleSubmitFormFogotPassword}>
        <p>Забыли пароль</p>
        <input
          type="text"
          onChange={handleEmail}
          onBlur={blurHandler}
          name="email"
        />
        {emailDirty && emailError && (
          <span style={{ color: "red" }}>{emailError}</span>
        )}
        <input
          type="password"
          onChange={handlePassword}
          onBlur={blurHandler}
          name="password"
        />
        {passwordDirty && passwordError && (
          <span style={{ color: "red" }}>{passwordError}</span>
        )}
        <DatePicker
          selected={dataPoint}
          required
          onChange={(date: any) => setDataPoint(date)}
        />
        <button onClick={handleClickFogotPassword}> Востановить пароль </button>
      </form>
    </div>
  );
};
