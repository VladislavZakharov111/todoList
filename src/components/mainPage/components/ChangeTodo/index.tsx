import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeCurrentTodo } from "../../../../services/ChangeTodo";
import { ModalView } from "../modalView/index";
import DatePicker from "react-datepicker";
import { Description } from "../../../mainPage/styled";
import { format } from "date-fns";
import { arrayCategories } from "../../constants";
import differenceInDays from "date-fns/differenceInDays";
import "./ChangeTodo.css";
import {
  DateFormat,
  DateNowPresentForm,
} from "../../../../constants/GlobalConstants";
import { ChangeTodoNameTitle } from "./Constants";

interface DeleteTodoProps {
  todo: any;
  component: any;
}

export const ChangeTodo = (props: DeleteTodoProps) => {
  const nowdata = new Date();

  const [modalActiveChange, setmodalActiveChange] = useState<any>(false);
  const [dataPoint, setDataPoint] = useState<any>(
    new Date(props.todo.dateendpoint)
  );
  const [categories, setCategories] = useState<any>(props.todo.categories);
  const [title, setTitle] = useState(props.todo.title);
  const [decription, setDescription] = useState<any>(props.todo.description);
  const [onSubmitClicked, setOnSubmitCliced] = useState<any>(false);

  const dispatch = useDispatch();

  const handleSubmitChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    dispatch(
      changeCurrentTodo(
        props.todo.id,
        nowdata,
        categories,
        title,
        decription,
        dataPoint,
        props.component
      )
    );
    setmodalActiveChange(false);
  };

  const changeTodo = () => {
    setOnSubmitCliced(true);
  };

  const handleTitleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionTodo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategories(e.target.value);
  };
  return (
    <div>
      <button onClick={() => setmodalActiveChange(true)}>
        {" "}
        {ChangeTodoNameTitle.Change}
      </button>
      <ModalView active={modalActiveChange} setActive={setmodalActiveChange}>
        <div
          onClick={() => setmodalActiveChange(false)}
          className="button_close"
        ></div>
        <form onSubmit={handleSubmitChange}>
          <p>{ChangeTodoNameTitle.Categories}</p>
          <select
            defaultValue={categories}
            onChange={handleCategories}
            required
          >
            {arrayCategories.map((categories: any) => (
              <option>{categories}</option>
            ))}
          </select>
          <p>{ChangeTodoNameTitle.NewTitle}</p>
          <input
            type="text"
            defaultValue={title}
            placeholder="Заголовок"
            required
            onChange={handleTitleTodo}
            className={
              onSubmitClicked && title.length === 0 ? "empty_title" : " "
            }
          ></input>
          <p>{ChangeTodoNameTitle.NewDescription}</p>
          <Description
            value={decription}
            placeholder="Описания"
            required
            onChange={handleDescriptionTodo}
            className={
              onSubmitClicked && decription.length === 0 ? "empty_title" : " "
            }
          ></Description>
          <p>{ChangeTodoNameTitle.NewDatePoit}</p>
          <DatePicker
            value={format(DateNowPresentForm, DateFormat)}
            selected={dataPoint}
            required
            onChange={(date: any) => setDataPoint(date)}
            minDate={new Date()}
          />
          <button type="submit" onClick={changeTodo}>
            <p>{ChangeTodoNameTitle.ChangeTodo}</p>
          </button>
        </form>
      </ModalView>
    </div>
  );
};
