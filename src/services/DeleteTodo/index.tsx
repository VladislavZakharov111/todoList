import axios from "axios";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_HOST } from "../../GlobalConstants/GlobalConstants";
import { setDataTodo } from "../../services/Filters/index";
export const deleteTodo = (id: any, component: any) => {
  return function (dispatch: any) {
    axios
      .delete(`${HTTP_HOST}/todos/${id}`)
      .then((res) => {
        console.log("deleteData", res.data);
        if (component === "Main") {
          dispatch(setDataTodo(1, null, null, null, false));
        } else {
          dispatch(push("/"));
        }
      })
      .catch((error) => console.log(error));
  };
};

export const deleteCheckedTodo = (arrId: any) => {
  return function (dispatch: any) {
    arrId.forEach((todoId: any) => {
      axios
        .delete(`${HTTP_HOST}/todos/${todoId}`)
        .then((res) => dispatch(setDataTodo(1, null, null, null, false)))
        .catch((error) => console.log(error));
    });
  };
};
