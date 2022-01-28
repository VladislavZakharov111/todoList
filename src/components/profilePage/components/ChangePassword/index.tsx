import React, { useState, useEffect } from "react";
import { ModalView } from "../../../mainPage/components/modalView";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, changePassword } from "../../GetData";
import DatePicker from "react-datepicker";
import { push } from "connected-react-router";
import {
  ErrorsValidation,
  regForPassword,
} from "../../../../GlobalConstants/GlobalConstants";
export const ChangePassword = () => {
  const [modalChangePassword, setModalChangePassword] = useState<any>(false);
  const [isDisabledChangePassword, setIsDisabledChangePassword] =
    useState<any>(true);
  const [newPasswordDirty, setNewPasswordDirty] = useState<any>(false);
  const [newPasswordError, setPasswordError] = useState<any>(
    ErrorsValidation.EmailDontEmpty
  );
  const [oldPasswordDirty, setOldPasswordDirty] = useState<any>(false);
  const [oldPasswordError, setOldPasswordError] = useState<any>(
    ErrorsValidation.PasswordDontEmpty
  );
  const [oldPassword, setOldPassword] = useState<any>("");
  const [newPassword, setNewPassword] = useState<any>("");
  const user = useSelector((state: any) => state.authReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (oldPassword.length > 0 && newPassword.length > 0) {
      setIsDisabledChangePassword(false);
    } else {
      setIsDisabledChangePassword(true);
    }
  }, [oldPassword, newPassword]);

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    if (e.target.value.length > 0) {
      setOldPasswordError("");
    } else {
      setOldPasswordError(ErrorsValidation.PasswordDontEmpty);
    }
  };

  const handleButtonChangePassword = () => {
    if (oldPassword === user.password) {
      setOldPasswordError("");
      if (newPasswordError.length === 0) {
        dispatch(changePassword(user.id, newPassword));
        setModalChangePassword(false);
      }
    } else {
      setOldPasswordError(ErrorsValidation.InvalidOldPassword);
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>): any => {
    switch (e.target.name) {
      case "oldPassword":
        setOldPasswordDirty(true);
        break;
      case "newPassword":
        setNewPasswordDirty(true);
        break;
    }
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!regForPassword.test(String(event.target.value))) {
      setPasswordError(ErrorsValidation.InvalidPasswordSymbols);
    } else {
      setPasswordError("");
    }
    setNewPassword(event.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <button onClick={() => setModalChangePassword(!modalChangePassword)}>
        Сменить пароль
      </button>
      <ModalView
        active={modalChangePassword}
        setActive={setModalChangePassword}
      >
        <form onSubmit={handleFormChange}>
          <div
            onClick={() => setModalChangePassword(false)}
            className="button_close"
          ></div>
          <p>Введите старый пароль</p>
          <input
            value={oldPassword}
            type="text"
            onBlur={(e) => blurHandler(e)}
            onChange={(e) => handleOldPassword(e)}
            name="oldPassword"
          />
          {oldPasswordDirty && oldPasswordError && (
            <span style={{ color: "red" }}>{oldPasswordError}</span>
          )}
          <p>Введите новый пароль</p>
          <input
            value={newPassword}
            onBlur={(e) => blurHandler(e)}
            name="newPassword"
            type="text"
            onChange={(e) => handleNewPassword(e)}
          />
          {newPasswordDirty && newPasswordError && (
            <span style={{ color: "red" }}>{newPasswordError}</span>
          )}
          <button
            disabled={isDisabledChangePassword}
            onClick={handleButtonChangePassword}
          >
            Изменить пароль
          </button>
        </form>
      </ModalView>
    </div>
  );
};
