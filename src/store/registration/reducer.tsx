import { GET_EMAIL, GET_ERROR } from "./type";
const defState: UserState = {
  currentEmail: null,
  error: "",
};

export const registerReducer = (
  state: any = defState,
  action: UserAction
): any => {
  switch (action.type) {
    case GET_EMAIL:
      return { ...state, currentEmail: action.payload };
    case GET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
