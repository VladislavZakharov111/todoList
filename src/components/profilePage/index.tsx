import React, { useState, useEffect } from "react";
import { ModalView } from "../mainPage/components/modalView";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, changePassword } from "./GetData";
import DatePicker from "react-datepicker";
import { push } from "connected-react-router";
import { ChangeProfileData } from "./components/ChangeProfileData/index";
import { ChangePassword } from "./components/ChangePassword/index";
import "./ProfilePage.css";
import format from "date-fns/format";
import { DateFormat } from "../../GlobalConstants/GlobalConstants";
import { URL_IMAGE } from "./constants";
export const Profile = () => {
  const user = useSelector((state: any) => state.authReducer.user);
  const dispatch = useDispatch();

  return (
    <div>
      <ChangeProfileData />
      {user != null && user.name === "" ? (
        <div>Заполните все поля </div>
      ) : user === null ? (
        dispatch(push("/auth"))
      ) : (
        <div className="profile_data">
          <div>
            <div className="buttons_profile">
              <button>Профиль</button>
              <button onClick={() => dispatch(push("/"))}>На главную</button>
              <ChangePassword />
            </div>
            <div className="profile_user">
              <div>Профиль</div>
              <img src={URL_IMAGE} />
              <p>Город: {user.city}</p>
              <p>Имя: {user.name}</p>
              <p>
                Дата рождения:
                {format(
                  new Date(
                    new Date(user.date_of_birth).getFullYear(),
                    new Date(user.date_of_birth).getMonth(),
                    new Date(user.date_of_birth).getDate()
                  ),
                  DateFormat
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
