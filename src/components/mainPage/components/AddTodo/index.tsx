import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addNewTodo } from "../../../../services/GetData";
import { ModalView } from "../modalView/index";
import DatePicker from "react-datepicker";
import { Description } from "../../../mainPage/styled";
import { format } from "date-fns";
import { arrayCategories } from "../../constants";
import "../AddTodo/AddTodo.css";
export const AddTodo = () => {
  let nowdata = new Date();
  const [modalActiveAdd, setmodalActiveAdd] = useState<any>(false);
  const [dataPoint, setDataPoint] = useState(new Date());
  const [categories, setCategories] = useState<any>("Спорт");
  const [title, setTitle] = useState("");
  const [decription, setDescription] = useState<any>("");
  const dispatch = useDispatch();
  const [onSubmitClicked, setOnSubmitClicked] = useState<any>(false);

  const currentUser = useSelector((state: any) => state.authReducer.user);

  const handleSubmitPopUp = (e: React.ChangeEvent<HTMLFormElement>) => {
    dispatch(
      addNewTodo(
        nowdata,
        categories,
        title,
        decription,
        dataPoint,
        currentUser.id
      )
    );
    setmodalActiveAdd(false);
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
      <button onClick={() => setmodalActiveAdd(true)}>
        <p>Добавить новую задачу</p>
      </button>
      <ModalView active={modalActiveAdd} setActive={setmodalActiveAdd}>
        <div
          onClick={() => setmodalActiveAdd(false)}
          className="button_close"
        ></div>
        <form onSubmit={handleSubmitPopUp}>
          <p>Категории</p>
          <select onChange={handleCategories} required>
            {arrayCategories.map((categories: any) => (
              <option>{categories}</option>
            ))}
          </select>
          <p>Заголовок</p>
          <input
            type="text"
            placeholder="Заголовок"
            required
            onChange={handleTitleTodo}
            className={
              onSubmitClicked && title.length === 0 ? "empty_title_add" : " "
            }
          ></input>
          <p>Описание</p>
          <Description
            placeholder="Описание"
            required
            onChange={handleDescriptionTodo}
            className={
              onSubmitClicked && decription.length === 0
                ? "empty_title_add"
                : " "
            }
          ></Description>
          <p>Крайний срок</p>
          <DatePicker
            selected={dataPoint}
            value={format(
              new Date(
                dataPoint.getFullYear(),
                dataPoint.getMonth(),
                dataPoint.getDate()
              ),
              "MM.dd.yyyy"
            )}
            required
            onChange={(date: any) => setDataPoint(date)}
            minDate={new Date()}
          />
          <button type="submit" onClick={() => setOnSubmitClicked(true)}>
            Создать задачу{" "}
          </button>
        </form>
      </ModalView>
    </div>
  );
};
