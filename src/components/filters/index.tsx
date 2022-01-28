import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetCategories,
  actionSetTitle,
  actionSetDoneTask,
  actionSetValueSort,
} from "../../store/todoReducer";
import { arrayCategories } from "../mainPage/constants";
import {
  TitleFilters,
  ArrNameDoneSearch,
  ArrNameTitleSearch,
  NameDoneSearch,
  NameTitleSearch,
} from "../../constants/GlobalConstants";
export function Filters() {
  const dispatch = useDispatch();
  const [filterName, setFilterName] = useState<any>(``);
  const [filterCategories, setFilterCategories] = useState<any>(null);
  const [done, setDone] = useState<any>(null);
  const [sortState, setSortState] = useState<any>(false);

  useEffect(() => {
    if (filterName.length === 0) dispatch(actionSetTitle(null));
    else dispatch(actionSetTitle(filterName));
  }, [filterName]);

  useEffect(() => {
    dispatch(actionSetCategories(filterCategories));
  }, [filterCategories]);

  useEffect(() => {
    dispatch(actionSetDoneTask(done));
  }, [done]);

  useEffect(() => {
    dispatch(actionSetValueSort(sortState));
  }, [sortState]);

  const handleFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };

  const handleFilterCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Все") setFilterCategories(null);
    else setFilterCategories(e.target.value);
  };

  const handleDone = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === NameDoneSearch.All) setDone(null);
    else {
      e.target.value === NameDoneSearch.Done ? setDone(true) : setDone(false);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === NameTitleSearch.Asc
      ? setSortState(true)
      : setSortState(false);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p> {TitleFilters.NameSearch}</p>
      <input
        onChange={handleFilterName}
        type="text"
        style={{ margin: "5px" }}
      />
      <p> {TitleFilters.CategoriesSearch} </p>
      <select onChange={handleFilterCategories} style={{ margin: "5px" }}>
        <option>Все</option>
        {arrayCategories.map((categories: any) => (
          <option>{categories}</option>
        ))}
      </select>
      <p> {TitleFilters.DoneSearch} </p>
      <select onChange={handleDone} style={{ margin: "5px" }}>
        {ArrNameDoneSearch.map((name) => (
          <option>{name}</option>
        ))}
      </select>
      <p>{TitleFilters.SortTitle}</p>
      <select onChange={handleSort} style={{ margin: "5px" }}>
        {ArrNameTitleSearch.map((name) => (
          <option>{name}</option>
        ))}
      </select>
    </div>
  );
}
