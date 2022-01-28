import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCheckedTodo } from "../../../../services/DeleteTodo/index";
import { ModalView } from "../modalView/index";
import "./DeleteChooseTodos.css";
interface PropsDeleteChoose {
  checkedTodos: any;
}
export const DeleteChooseTodos = (props: PropsDeleteChoose) => {
  const dispatch = useDispatch();
  const [
    handleOpenModalDeleteChooseTodos,
    setHandleOpenModalDeleteChooseTodos,
  ] = useState<any>(false);

  const deleteManyTodos = () => {
    dispatch(deleteCheckedTodo(props.checkedTodos));
    setHandleOpenModalDeleteChooseTodos(false);
  };
  return (
    <div>
      <button onClick={() => setHandleOpenModalDeleteChooseTodos(true)}>
        Удалить выбранные задачи
      </button>
      <ModalView
        active={handleOpenModalDeleteChooseTodos}
        setActive={setHandleOpenModalDeleteChooseTodos}
      >
        <div
          className="button_close_choose_delete"
          onClick={() => setHandleOpenModalDeleteChooseTodos(false)}
        ></div>
        <div>Вы действительно хотите все выбранные задачи?</div>
        <button onClick={deleteManyTodos}>Да</button>
        <button onClick={() => setHandleOpenModalDeleteChooseTodos(false)}>
          Нет
        </button>
      </ModalView>
    </div>
  );
};
