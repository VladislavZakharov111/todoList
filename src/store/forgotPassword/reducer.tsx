import { SET_EMAIL, SET_ERROR } from "./type";
const forgotPasswordState: UserState = {
  email: [],
  error: "",
};
export const forgotPassworddReducer = (
  state = forgotPasswordState,
  action: UserAction
) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: [...action.payload] };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
