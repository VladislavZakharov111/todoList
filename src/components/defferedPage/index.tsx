import React, { useEffect } from "react";
import { getArchiveTodo } from "../../services/GetData";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
export const DefferedPage = (): any => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArchiveTodo());
  }, []);

  const defferedInfo = useSelector(
    (state: any) => state.defferedReducer.defferedTodo
  );

  return (
    <div>
      <div>Отложенные задачи</div>
      <table>
        {defferedInfo.map((todo: any) => {
          return (
            <tr key={todo.title}>
              <td>{todo.todo.datecreate}</td>
              <td>{todo.todo.datachange}</td>
              <td>{todo.todo.categories}</td>
              <td>{todo.todo.title}</td>
              <td>{todo.todo.description}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
