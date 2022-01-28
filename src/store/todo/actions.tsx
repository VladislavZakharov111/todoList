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

export const getTodoFromServer = (payload: any): any => ({
  type: GET_TODOS,
  payload,
});
export const setCurrentPage = (payload: any): any => ({
  type: GET_CURRENT_PAGE,
  payload,
});

export const deleteexit = (payload: any): any => ({
  type: DELETE_EXIT,
  payload,
});

export const actionSetCategories = (payload: any): any => ({
  type: GET_CATEGORIES,
  payload,
});

export const actionSetTitle = (payload: any): any => ({
  type: GET_TITLE,
  payload,
});

export const actionSetDoneTask = (payload: any): any => ({
  type: GET_DONE_TASK,
  payload,
});

export const actionSetValueSort = (payload: any): any => ({
  type: GET_VALUE_SORT,
  payload,
});

export const actionSetDetailPage = (payload: any): any => ({
  type: GET_DETAIL_PAIGE,
  payload,
});
