import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsComplited } from "../../../../services/CompleteTodo/index";
import { ModalView } from "../modalView/index";
import { NameDoneSearch } from "../../../../constants/GlobalConstants";

export const CompleteTodo = (props: DeleteTodoProps) => {
  const dispatch = useDispatch();
  const handleCompleted = () => {
    dispatch(setIsComplited(props.todo.id, props.todo.status, props.component));
  };
  return (
    <div>
      <button onClick={handleCompleted}>
        {props.todo.status ? NameDoneSearch.DontDone : NameDoneSearch.Done}
      </button>
    </div>
  );
};
