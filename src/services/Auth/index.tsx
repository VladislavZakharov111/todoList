import axios from "axios";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_HOST } from "../../constants/GlobalConstants";
import { actionSetUser } from "../../store/auth/actions";

export const setDataUsers = (login: any, password: any) => {
  return function (dispatch: any) {
    axios
      .get(`${HTTP_HOST}/users?login=${login}&password=${password}`)
      .then((res) => {
        if (res.data.length) {
          dispatch(actionSetUser(res.data[0]));
          if (res.data[0].name === "") dispatch(push("/profile"));
          else {
            dispatch(push("/"));
          }
        } else dispatch(actionSetUser(1));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};
