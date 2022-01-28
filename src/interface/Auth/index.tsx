export interface UserState {
  user: Array<Object> | null;
}
export interface UserAction {
  type: string;
  payload?: any;
}
