import { GET_EMAIL, GET_ERROR } from "./type";
export const actionCheckDuplicateEmail = (payload: any): any => ({
  type: GET_EMAIL,
  payload,
});

export const actionRegistrationError = (payload: any): any => ({
  type: GET_ERROR,
  payload,
});
