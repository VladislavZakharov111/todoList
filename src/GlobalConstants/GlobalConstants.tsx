export enum ErrorsValidation {
  PasswordDontEmpty = "Пароль не может быть пустым",
  EmailDontEmpty = "Емайл не может быть пустым",
  EmailPasswordDontValid = "Пароль или email введеные не верно",
  PasswordDontValidLength = "Пароль не может быть меньше 8 символов",
  InvalidEmail = "Некоретный email",
  InvalidPasswordSymbols = "Пароль должен содержать цифры, буквы (в том числе и заглавную) и хотя бы один из спец. символов !@$%^&*()_-+",
  BirthdaysDontEqual = "Даты рождения не совпадают",
  InvalidOldPassword = "Неверный старый пароль",
}
export const regForLogin =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const regForPassword =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;

export enum TitleFilters {
  NameSearch = "Поиск по названию",
  CategoriesSearch = "Поиск по категории",
  DoneSearch = "Поиск по выполнению",
  SortTitle = "Cортировать заголовок по",
}

export enum NameDoneSearch {
  All = "Все",
  DontDone = "Не выполнено",
  Done = "Выполнено",
}
export enum NameTitleSearch {
  Descending = "По убыванию",
  Asc = "По возрастанию",
}
export const ArrNameDoneSearch = [
  NameDoneSearch.All,
  NameDoneSearch.DontDone,
  NameDoneSearch.Done,
];
export const ArrNameTitleSearch = [
  NameTitleSearch.Asc,
  NameTitleSearch.Descending,
];
export const DateFormat = "dd.MM.yyyy";
export const DateNowPresentForm = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate()
);
export const DayDifference = 3;
export const HTTP_HOST: string = `http://localhost:3000`;
