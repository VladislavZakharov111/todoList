interface UserState {
  currentEmail: Array<Object> | null;
  error: string;
}
interface UserAction {
  type: string;
  payload?: any;
}
const defState: UserState = {
  currentEmail: null,
  error: "",
};
const GET_EMAIL = "GET_EMAIL";
const GET_ERROR = "GET_ERROR";
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

export const actionCheckDuplicateEmail = (payload: any): any => ({
  type: GET_EMAIL,
  payload,
});

export const actionRegistrationError = (payload: any): any => ({
  type: GET_ERROR,
  payload,
});
