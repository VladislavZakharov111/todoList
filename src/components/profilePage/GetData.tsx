import axios from "axios";
import { push } from "connected-react-router";
import { actionSetUser } from "../../store/authReducer";

export const HTTP_HOST: string = `http://localhost:3000`;
export const setDataUsersById = (id: any) => {
  return function (dispatch: any) {
    axios
      .get(`${HTTP_HOST}/users/${id}`)
      .then((res) => {
        dispatch(actionSetUser(res.data));
        if (res.data.name !== "") dispatch(push("/profile"));
        else {
          dispatch(push("/"));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

export const changeProfile = (
  id: any,
  city: any,
  date_of_birth: any,
  name: any
) => {
  return function (dispatch: any) {
    axios
      .patch(`${HTTP_HOST}/users/${id}`, {
        city: city,
        date_of_birth: date_of_birth,
        name: name,
      })
      .then((res) => {
        dispatch(setDataUsersById(id));
      })
      .catch((error) => console.log(error));
  };
};

export const changePassword = (id: any, password: any) => {
  return function (dispatch: any) {
    axios
      .patch(`${HTTP_HOST}/users/${id}`, {
        password: password,
      })
      .then(dispatch(setDataUsersById(id)))
      .catch((error) => console.log(error));
  };
};
