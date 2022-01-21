interface UserState {
  currentEmail: Array<Object> | null;
}
interface UserAction {
  type: string;
  payload?: any;
}
const defState: UserState = {
  currentEmail: [],
};
const GET_EMAIL = "GET_EMAIL";
export const registerReducer = (
  state: any = defState,
  action: UserAction
): any => {
  switch (action.type) {
    case GET_EMAIL:
      return { ...state, currentEmail: action.payload };
    default:
      return state;
  }
};

export const actionCheckDuplicateEmail = (payload: any): any => ({
  type: GET_EMAIL,
  payload,
});
