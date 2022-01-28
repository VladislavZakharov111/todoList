import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCheckedTodo } from "../../services/DeleteTodo/index";
import { setDataTodo } from "../../services/Filters/index";
import { getDetailPage } from "./components/detailedPage/GetData";
import "react-datepicker/dist/react-datepicker.css";
import { Exit } from "./components/exit";
import { PaginationButton } from "./components/pagination";
import "./mainPage.css";
import { push } from "connected-react-router";
import { Filters } from "../filters/index";
import parse from "date-fns/parse";
import differenceInDays from "date-fns/differenceInDays";
import { DeleteTodo } from "./components/DeleteTodo/index";
import { ArchiveTodo } from "./components/ArchiveTodo";
import { CompleteTodo } from "../mainPage/components/CompleteTodo/index";
import { ChangeTodo } from "./components/ChangeTodo/index";
import { AddTodo } from "./components/AddTodo/index";
import { titleTable, listDo } from "./constants";
import { DeleteChooseTodos } from "../mainPage/components/DeleteChooseTodos";
import format from "date-fns/format";
import {
  DateFormat,
  DateNowPresentForm,
  DayDifference,
} from "../../GlobalConstants/GlobalConstants";
let component = "Main";

export const MainPage = () => {
  const [checkedTodos, setCheckedTodos] = useState<any>([]);
  const dispatch = useDispatch();
  const todoInfo = useSelector((state: any) => state.todoReducer.todolist);
  const currentPage = useSelector(
    (state: any) => state.todoReducer.currentPage
  );
  const categoriesRedux = useSelector(
    (state: any) => state.todoReducer.categories
  );
  const titleRedux = useSelector((state: any) => state.todoReducer.title);
  const doneTaskRedux = useSelector((state: any) => state.todoReducer.doneTask);
  const sortRedux = useSelector((state: any) => state.todoReducer.sort);
  const currentUser = useSelector((state: any) => state.authReducer.user);

  useEffect(() => {
    if (currentUser === null) dispatch(push("/auth"));
  }, [currentUser]);

  useEffect(() => {
    dispatch(
      setDataTodo(
        currentPage,
        titleRedux,
        categoriesRedux,
        doneTaskRedux,
        sortRedux
      )
    );
  }, [currentPage, categoriesRedux, titleRedux, doneTaskRedux, sortRedux]);

  const saveCheckId = (event: any, id: any) => {
    event.target.checked
      ? setCheckedTodos([...checkedTodos, id])
      : setCheckedTodos(checkedTodos.filter((todoId: any) => id !== todoId));
  };

  const handleDetailsPage = (id: number) => {
    dispatch(getDetailPage(id));
  };

  return (
    <div className="main_page">
      <div className="main_button_todos">
        <AddTodo />
        <button>Список задач</button>
        <DeleteChooseTodos checkedTodos={checkedTodos} />
        <button onClick={() => dispatch(push("/profile"))}>Профиль</button>
        <button onClick={() => dispatch(push("/archive"))}>Архив</button>
        <Exit />
      </div>
      <div className="filters_todo">
        <span className="title_filters">Фильтры</span>
        <Filters />
      </div>
      <table>
        {titleTable.map((title: any) => (
          <th>{title}</th>
        ))}
        {todoInfo &&
          todoInfo
            .filter((todo: any) => currentUser.id === todo.idUser)
            .map((todo: any) => {
              return (
                <tr key={todo.title}>
                  <td>
                    {format(
                      new Date(
                        new Date(todo.datecreate).getFullYear(),
                        new Date(todo.datecreate).getMonth(),
                        new Date(todo.datecreate).getDate()
                      ),
                      DateFormat
                    )}
                  </td>
                  <td>
                    {format(
                      new Date(
                        new Date(todo.datachange).getFullYear(),
                        new Date(todo.datachange).getMonth(),
                        new Date(todo.datachange).getDate()
                      ),
                      DateFormat
                    )}
                  </td>
                  <td>
                    <p className={todo.status ? "do" : "nodo"}>
                      {todo.categories}
                    </p>
                  </td>
                  <td>
                    <p className={todo.status ? "do" : "nodo"}>{todo.title}</p>
                  </td>
                  <td>
                    <p className={todo.status ? "do" : "nodo"}>
                      {todo.description}
                    </p>
                  </td>
                  <td
                    className={
                      differenceInDays(
                        new Date(
                          new Date(todo.dateendpoint).getFullYear(),
                          new Date(todo.dateendpoint).getMonth(),
                          new Date(todo.dateendpoint).getDate()
                        ),
                        DateNowPresentForm
                      ) <= DayDifference
                        ? "HotEndpointData"
                        : "noHotEndpointData"
                    }
                  >
                    {format(
                      new Date(
                        new Date(todo.dateendpoint).getFullYear(),
                        new Date(todo.dateendpoint).getMonth(),
                        new Date(todo.dateendpoint).getDate()
                      ),
                      DateFormat
                    )}
                  </td>
                  <td>{todo.status ? listDo[1] : listDo[2]}</td>
                  <td className="button_todo">
                    <CompleteTodo todo={todo} component={component} />
                    <DeleteTodo id={todo.id} component={component} />
                    <ChangeTodo todo={todo} component={component} />
                    <ArchiveTodo todo={todo} component={component} />
                    <button onClick={() => handleDetailsPage(todo.id)}>
                      Детальнее
                    </button>
                    <input
                      type="checkbox"
                      onChange={(event) => saveCheckId(event, todo.id)}
                    />
                  </td>
                </tr>
              );
            })}
      </table>
      <PaginationButton />
    </div>
  );
};
