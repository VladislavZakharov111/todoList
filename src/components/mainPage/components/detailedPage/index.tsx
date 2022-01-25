import React, { useState, useEffect } from "react";
import { actionSetDetailPage } from "../../../../store/todoReducer";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { ModalView } from "../modalView/index";
import DatePicker from "react-datepicker";
import { Description } from "./styled";
import { format } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import parse from "date-fns/parse";
import { DeleteTodo } from "../DeleteTodo/index";
import { ArchiveTodo } from "../ArchiveTodo/index";
import { CompleteTodo } from "../CompleteTodo/index";
import { ChangeTodo } from "../ChangeTodo/index";
import { titleTable, listDo } from "../../constants";
import {
  DateFormat,
  DayDifference,
  DateNowPresentForm,
} from "../../../../GlobalConstants/GlobalConstants";
import "./DetailedPage.css";

const component = "detailed";

function DetailPage({ match }: any) {
  const dispatch = useDispatch();
  const todoInfo = useSelector((state: any) => state.todoReducer.detailPage);

  const handleExit = () => {
    dispatch(actionSetDetailPage([]));
    dispatch(push(`/`));
  };

  return (
    <div className="detail_page">
      <button onClick={handleExit}>Назад</button>
      <table>
        {titleTable.map((title: any) => (
          <th>{title}</th>
        ))}
        {todoInfo.map((todo: any) => {
          return (
            <tr key={todo.title} style={{ border: "1px solid black" }}>
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
                <p className={todo.status ? "do" : "nodo"}>{todo.categories}</p>
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
              <td>
                <CompleteTodo todo={todo} component={component} />
                <DeleteTodo id={todo.id} component={component} />
                <ChangeTodo todo={todo} component={component} />
                <ArchiveTodo todo={todo} component={component} />
              </td>
            </tr>
          );
        })}
      </table>
      <p>Детальная страница</p>
      {match.params.id}
    </div>
  );
}
export default DetailPage;
