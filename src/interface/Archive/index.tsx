export interface ArchiveTodoProps {
  todo: any;
  component: any;
}
export interface UserState {
  defferedTodo: Array<Object>;
}
export interface UserAction {
  type: string;
  payload?: any;
}
