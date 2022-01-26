import axios from "axios";
import { actionSetUser } from "../store/authReducer";
import { actionSetDetailPage } from "../store/todoReducer";
import { getTodoFromServer } from "../store/todoReducer";
import { actionSetArchive } from "../store/defferedReducer";
import { push } from "connected-react-router";
import { getDetailPage } from "../components/mainPage/components/detailedPage/GetData";
import {
  actionCheckDuplicateEmail,
  actionRegistrationError,
} from "../store/registerReducer";
import { HTTP_HOST } from "../GlobalConstants/GlobalConstants";

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
