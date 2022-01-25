import axios from "axios";
import { push } from "connected-react-router";
import {
  actionSetEmail,
  actionErrorFogotPassword,
} from "../../store/forgotPassword";
import { HTTP_HOST } from "../../GlobalConstants/GlobalConstants";

export const getUserByEmail = (email: any) => {
  return function (dispatch: any) {
    axios
      .get(`${HTTP_HOST}/users?login=${email}`)
      .then((res) => {
        if (res.data.length === 0)
          dispatch(
            actionErrorFogotPassword("Такого пользователя не существует")
          );
        else {
          dispatch(actionSetEmail(res.data));
          dispatch(actionErrorFogotPassword(""));
        }
      })
      .catch((error) => console.log(error));
  };
};

export const setNewPassword = (id: any, password: any) => {
  return function (dispatch: any) {
    axios
      .patch(`${HTTP_HOST}/users/${id}`, {
        password: password,
      })
      .then((res) => {
        dispatch(push("/auth"));
      })
      .catch((error) => console.log(error));
  };
};
