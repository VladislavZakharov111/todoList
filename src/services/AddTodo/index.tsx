import axios from "axios";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_HOST } from "../../GlobalConstants/GlobalConstants";
import { setDataTodo } from "../GetData";
export const addNewTodo = (
  nowdata: any,
  categories: any,
  title: any,
  description: any,
  dateendpoint: any,
  idUser: any
) => {
  return function (dispatch: any) {
    axios
      .post(`${HTTP_HOST}/todos`, {
        datecreate: nowdata,
        datachange: nowdata,
        categories: categories,
        title: title,
        description: description,
        dateendpoint: dateendpoint,
        status: false,
        idUser: idUser,
      })
      .then(dispatch(setDataTodo(1, null, null, null, false)))
      .catch((error) => {
        console.log(error);
      });
  };
};
