export interface Todostate {
  todolist: Array<Object>;
  currentPage: number;
  categories: string | null;
  title: string | null;
  doneTask: string | boolean | null;
  sort: boolean;
  detailPage: Array<Object> | null;
}
