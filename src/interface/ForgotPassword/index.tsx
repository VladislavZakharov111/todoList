export interface UserState {
  email: Array<Object>;
  error: string;
}
export interface UserAction {
  type: string;
  payload?: any;
}
