import axios from "axios";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { HTTP_HOST } from "../../constants/GlobalConstants";
import { getTodoFromServer } from "../../store/todoReducer";

export const setDataTodo = (
  page: any,
  filterName: any,
  filterCategories: any,
  done: any,
  sortState: any
) => {
  let URL = `${HTTP_HOST}/todos?_page=${page}&_limit=5&_sort=title`;
  console.log({ filterCategories });
  if (filterName !== null) URL = URL + `&title=${filterName}`;
  if (filterCategories !== null) URL = URL + `&categories=${filterCategories}`;
  if (done !== null) URL = URL + `&status=${done}`;
  if (sortState) URL = URL + `&_order=desc`;
  return function (dispatch: any) {
    axios.get(URL).then((res) => {
      dispatch(getTodoFromServer(res.data));
    });
  };
};
