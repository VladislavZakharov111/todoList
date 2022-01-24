interface UserState {
  user: Array<Object> | null;
}
interface UserAction {
  type: string;
  payload?: any;
}
const defState: UserState = {
  user: null,
};
const SET_USER = "SET_USER";
export const authReducer = (state: any = defState, action: UserAction): any => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const actionSetUser = (payload: any): any => ({
  type: SET_USER,
  payload,
});
