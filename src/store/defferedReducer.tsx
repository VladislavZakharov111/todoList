interface UserState {
  defferedTodo: Array<Object>;
}
interface UserAction {
  type: string;
  payload?: any;
}
const defferedState: UserState = {
  defferedTodo: [],
};
const SET_DEFFERED = "SET_DEFFERED";

export const defferedReducer = (state = defferedState, action: UserAction) => {
  switch (action.type) {
    case SET_DEFFERED:
      return { ...state, defferedTodo: [...action.payload] };
    default:
      return state;
  }
};

export const actionSetArchive = (payload: any): any => ({
  type: SET_DEFFERED,
  payload,
});
