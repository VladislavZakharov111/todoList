import axios from "axios";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_HOST } from "../../GlobalConstants/GlobalConstants";
import { getDetailPage } from "../../components/mainPage/components/detailedPage/GetData";
import { setDataTodo } from "../Filters/index";

export const changeCurrentTodo = (
  todoId: any,
  nowdata: any,
  categories: any,
  title: any,
  description: any,
  dateendpoint: any,
  component: any
) => {
  return function (dispatch: any) {
    axios
      .patch(`${HTTP_HOST}/todos/${todoId}`, {
        datecreate: nowdata,
        datachange: nowdata,
        categories: categories,
        title: title,
        description: description,
        dateendpoint: dateendpoint,
      })
      .then((res) => {
        if (component === "Main") {
          dispatch(setDataTodo(1, null, null, null, false));
        } else {
          dispatch(getDetailPage(todoId));
        }
      })
      .catch((error) => console.log(error));
  };
};
