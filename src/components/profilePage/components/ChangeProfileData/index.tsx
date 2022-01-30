import React, { useState, useEffect } from "react";
import { ModalView } from "../../../mainPage/components/modalView";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { push } from "connected-react-router";
import { changeProfile } from "../../../../services/ProfilePage/index";
import "../ChangeProfileData/ChangeProfileData.css";

export const ChangeProfileData = () => {
  const user = useSelector((state: any) => state.authReducer.user);
  const [openModalProfile, setOpenModalProfile] = useState<any>(false);
  const [city, setCity] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [dataPoint, setDataPoint] = useState(new Date());
  const [onSubmitClicked, setOnSubmitClicked] = useState(false);
  const handleEditProfile = () => {
    setOpenModalProfile(!openModalProfile);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      if (user.name === "") setOpenModalProfile(true);
    } else {
      dispatch(push("/auth"));
    }
  }, [user]);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user !== null) {
      dispatch(changeProfile(user.id, city, dataPoint, name));
    }
    setOpenModalProfile(false);
  };

  const handleClickChangeProfile = () => {
    setOnSubmitClicked(true);
  };
  return (
    <div>
      <button onClick={handleEditProfile}>Редактировать Профиль</button>
      <ModalView active={openModalProfile} setActive={setOpenModalProfile}>
        <form onSubmit={handleChangeProfile}>
          <div
            onClick={() => setOpenModalProfile(false)}
            className="button_close"
          ></div>
          <h2>Заполните все поля</h2>
          <p>Город</p>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={
              onSubmitClicked && city.length === 0 ? "empty_profile" : " "
            }
          />
          <p>Дата рождения</p>
          <DatePicker
            selected={dataPoint}
            required
            onChange={(date: any) => setDataPoint(date)}
            maxDate={new Date()}
          />
          <p>Имя</p>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={
              onSubmitClicked && name.length === 0 ? "empty_profile" : " "
            }
          />
          <button type="submit" onClick={handleClickChangeProfile}>
            Изменить
          </button>
        </form>
      </ModalView>
    </div>
  );
};
