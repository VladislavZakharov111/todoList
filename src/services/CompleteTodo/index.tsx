import axios from "axios";
import { HTTP_HOST } from "../../GlobalConstants/GlobalConstants";
import { setDataTodo } from "../Filters/index";
import { getDetailPage } from "../../components/mainPage/components/detailedPage/GetData";
export const setIsComplited = (id: any, isCompleted: any, component: any) => {
  return function (dispatch: any) {
    axios
      .patch(`${HTTP_HOST}/todos/${id}`, {
        status: !isCompleted,
      })
      .then((res) => {
        if (component === "Main") {
          dispatch(setDataTodo(1, null, null, null, false));
        } else {
          dispatch(getDetailPage(id));
        }
      })
      .catch((error) => console.log(error));
  };
};
