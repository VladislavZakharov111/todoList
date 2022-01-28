import { SET_EMAIL, SET_ERROR } from "./type";
export const actionSetEmail = (payload: any): any => ({
  type: SET_EMAIL,
  payload,
});

export const actionErrorFogotPassword = (payload: any): any => ({
  type: SET_ERROR,
  payload,
});
