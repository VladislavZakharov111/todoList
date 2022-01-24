interface UserState {
  email: Array<Object>;
  error: string;
}
interface UserAction {
  type: string;
  payload?: any;
}
const forgotPasswordState: UserState = {
  email: [],
  error: "",
};
const SET_EMAIL = "SET_EMAIL";
const SET_ERROR = "SET_ERROR";
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

export const actionSetEmail = (payload: any): any => ({
  type: SET_EMAIL,
  payload,
});

export const actionErrorFogotPassword = (payload: any): any => ({
  type: SET_ERROR,
  payload,
});
