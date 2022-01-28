import { SET_USER } from "./type";
import { actionSetUser } from "./actions";

const defState: UserState = {
  user: null,
};
export const authReducer = (state: any = defState, action: UserAction): any => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
