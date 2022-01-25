import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../../store/todoReducer";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useSelector } from "react-redux";
import { maxTodo } from "./constants";
import "./pagination.css";
export const PaginationButton = () => {
  const dispatch = useDispatch();
  const [disableArrowLeft, setDisableArrowLeft] = useState<any>(false);
  const [disableArrowRigth, setDisableArrowRigth] = useState<any>(false);
  const todoInfo = useSelector((state: any) => state.todoReducer.todolist);
  const currentPage = useSelector(
    (state: any) => state.todoReducer.currentPage
  );

  useEffect(() => {
    todoInfo.length < maxTodo
      ? setDisableArrowRigth(true)
      : setDisableArrowRigth(false);
  }, [disableArrowRigth, todoInfo]);

  useEffect(() => {
    if (currentPage <= 1) setDisableArrowLeft(true);
    else setDisableArrowLeft(false);
  }, [currentPage]);
  return (
    <div>
      <button
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={disableArrowLeft}
      >
        <ArrowBackIosIcon />
      </button>
      <span className="number_current_page">{currentPage}</span>
      <button
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={disableArrowRigth}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};
