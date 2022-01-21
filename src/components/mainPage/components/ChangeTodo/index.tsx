import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeCurrentTodo } from "../../../../services/GetData";
import { ModalView } from "../modalView/index";
import DatePicker from "react-datepicker";
import { Description } from "../../../mainPage/styled";
import { format } from "date-fns";
import { arrayCategories } from "../../constants";
import differenceInDays from "date-fns/differenceInDays";
import "./ChangeTodo.css";
interface DeleteTodoProps {
  todo: any;
  component: any;
}

export const ChangeTodo = (props: DeleteTodoProps) => {
  let nowdata = new Date();

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
      <button onClick={() => setmodalActiveChange(true)}> Изменить</button>
      <ModalView active={modalActiveChange} setActive={setmodalActiveChange}>
        <div
          onClick={() => setmodalActiveChange(false)}
          className="button_close"
        ></div>
        <form onSubmit={handleSubmitChange}>
          <p>Категории</p>
          <select
            defaultValue={categories}
            onChange={handleCategories}
            required
          >
            {arrayCategories.map((categories: any) => (
              <option>{categories}</option>
            ))}
          </select>
          <p>Новый заголовок</p>
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
          <p>Новое описание</p>
          <Description
            value={decription}
            placeholder="Описания"
            required
            onChange={handleDescriptionTodo}
            className={
              onSubmitClicked && decription.length === 0 ? "empty_title" : " "
            }
          ></Description>
          <p>Новый cрок выполнения</p>
          <DatePicker
            value={format(
              new Date(
                dataPoint.getFullYear(),
                dataPoint.getMonth(),
                dataPoint.getDate()
              ),
              "dd.MM.yyyy"
            )}
            selected={dataPoint}
            required
            onChange={(date: any) => setDataPoint(date)}
            minDate={new Date()}
          />
          <button type="submit" onClick={changeTodo}>
            <p>Изменить задачу</p>
          </button>
        </form>
      </ModalView>
    </div>
  );
};
