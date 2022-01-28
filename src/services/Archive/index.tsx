import axios from "axios";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_HOST } from "../../constants/GlobalConstants";
import { actionSetUser } from "../../store/authReducer";
import { actionSetArchive } from "../../store/defferedReducer";
export const getArchiveTodo = () => {
  return function (dispatch: any) {
    axios.get(`${HTTP_HOST}/deffered`).then((res) => {
      console.log("deffered data", res.data);
      dispatch(actionSetArchive(res.data));
    });
  };
};

export const addArchiveTodo = (todo: any, component: any) => {
  return function (dispatch: any) {
    console.log({ todo });
    axios
      .post(`${HTTP_HOST}/deffered`, { todo })
      .then((res) => {
        if (component === "Main") {
          dispatch(getArchiveTodo());
        } else {
          dispatch(push("/"));
        }
      })
      .catch((error) => console.log(error));
  };
};
