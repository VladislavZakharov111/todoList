export interface UserState {
  currentEmail: Array<Object> | null;
  error: string;
}
export interface UserAction {
  type: string;
  payload?: any;
}
