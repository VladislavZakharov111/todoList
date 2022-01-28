import {
  GET_TODOS,
  GET_CURRENT_PAGE,
  DELETE_EXIT,
  GET_CATEGORIES,
  GET_TITLE,
  GET_DONE_TASK,
  GET_VALUE_SORT,
  GET_DETAIL_PAIGE,
} from "./type";

const defaultState: Todostate = {
  todolist: [],
  currentPage: 1,
  categories: null,
  title: null,
  doneTask: null,
  sort: false,
  detailPage: [],
};

export const todoReducer = (state = defaultState, action: any): any => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todolist: [...action.payload] };
    case GET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case DELETE_EXIT:
      return { ...state, todolist: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_TITLE:
      return { ...state, title: action.payload };
    case GET_DONE_TASK:
      return { ...state, doneTask: action.payload };
    case GET_VALUE_SORT:
      return { ...state, sort: action.payload };
    case GET_DETAIL_PAIGE:
      return { ...state, detailPage: [action.payload] };

    default:
      return state;
  }
};
