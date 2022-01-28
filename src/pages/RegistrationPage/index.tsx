import axios from "axios";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_HOST } from "../../constants/GlobalConstants";
import {
  actionRegistrationError,
  actionCheckDuplicateEmail,
} from "../../store/registerReducer";
export const addNewUser = (login: any, password: any) => {
  return function (dispatch: any) {
    axios
      .post(`${HTTP_HOST}/users`, {
        login: login,
        password: password,
        city: "",
        date_of_birth: "",
        name: "",
      })
      .then((res) => {
        dispatch(push(`/auth`));
      })
      .catch((error) => console.log(error));
  };
};

export const checkIsEmail = (email: any) => {
  return function (dispatch: any) {
    axios
      .get(`${HTTP_HOST}/users?login=${email}`)
      .then((res) => {
        if (res.data.length !== 0) {
          dispatch(
            actionRegistrationError("Такой пользователь уже существует")
          );
          dispatch(actionCheckDuplicateEmail(res.data));
        } else {
          dispatch(actionRegistrationError(""));
          dispatch(actionCheckDuplicateEmail(res.data));
        }
      })
      .catch((error) => console.log(error));
  };
};
