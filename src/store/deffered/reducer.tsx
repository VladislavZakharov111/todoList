import { SET_DEFFERED } from "./type";
import { actionSetArchive } from "./actions";

const defferedState: UserState = {
  defferedTodo: [],
};

export const defferedReducer = (state = defferedState, action: UserAction) => {
  switch (action.type) {
    case SET_DEFFERED:
      return { ...state, defferedTodo: [...action.payload] };
    default:
      return state;
  }
};
