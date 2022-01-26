import axios from "axios";
import {
  actionSetDetailPage,
  getTodoFromServer,
} from "../../../../store/todoReducer";

import { actionSetArchive } from "../../../../store/defferedReducer";
import { push } from "connected-react-router";

export const HTTP_HOST: string = `http://localhost:3000`;
export const getDetailPage = (id: number) => {
  return function (dispatch: any) {
    axios
      .get(`${HTTP_HOST}/todos/${id}`)
      .then((res) => {
        dispatch(actionSetDetailPage(res.data));
        dispatch(dispatch(push(`/${id}`)));
      })
      .catch((error) => console.log(error));
  };
};
