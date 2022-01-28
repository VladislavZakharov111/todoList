import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addArchiveTodo } from "../../../../services/Archive/index";
import { deleteTodo } from "../../../../services/DeleteTodo/index";
import { ModalView } from "../modalView/index";

interface ArchiveTodoProps {
  todo: any;
  component: any;
}

export const ArchiveTodo = (props: ArchiveTodoProps) => {
  const dispatch = useDispatch();
  const [activeModalArchive, setActiveModalArchive] = useState<any>(false);

  const addDefferedTodo = () => {
    dispatch(addArchiveTodo(props.todo, props.component));
    dispatch(deleteTodo(props.todo.id, props.component));
  };

  return (
    <div>
      <button onClick={() => setActiveModalArchive(true)}> В архив</button>
      <ModalView active={activeModalArchive} setActive={setActiveModalArchive}>
        <div
          onClick={() => setActiveModalArchive(false)}
          className="button_close"
        ></div>
        <div>Вы действительно добавить задачу в архив?</div>
        <button onClick={addDefferedTodo}>Да</button>
        <button onClick={() => setActiveModalArchive(false)}>Нет</button>
      </ModalView>
    </div>
  );
};
