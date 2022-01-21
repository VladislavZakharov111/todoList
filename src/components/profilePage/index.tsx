import React, { useState, useEffect } from "react";
import { ModalView } from "../mainPage/components/modalView";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile, changePassword } from "./GetData";
import DatePicker from "react-datepicker";
import { push } from "connected-react-router";
import { ChangeProfileData } from "./components/ChangeProfileData/index";
import { ChangePassword } from "./components/ChangePassword/index";
import "./ProfilePage.css";
import format from "date-fns/format";
export const Profile = () => {
  const user = useSelector((state: any) => state.authReducer.user);
  const dispatch = useDispatch();

  return (
    <div>
      <ChangeProfileData />
      {user != null && user.name === "" ? (
        <div>Заполните все поля </div>
      ) : user === null ? (
        dispatch(push("/auth"))
      ) : (
        <div className="profile_data">
          <div>
            <div className="buttons_profile">
              <button>Профиль</button>
              <button onClick={() => dispatch(push("/"))}>На главную</button>
              <ChangePassword />
            </div>
            <div className="profile_user">
              <div>Профиль</div>
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgWFhQYGRgaGhkaGBoaHRgaGhkcGBgaGhgYGBwcIS4lHB4rHxglJjgmKy8xNTU1GiQ7QDszPy40NjEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgEDBgcIBQT/xABIEAACAQICBwQGBAwEBgMAAAABAgADEQQSBQYHITFBURMiYXEyQlKBkaEUYnKxIyRDc4KSorKzwtHwM4PB8VNjk8PS4SU0Nf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDc0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQI5pS8iT4Sgf6pgXZWUErAREQEgZOWyd/CBW8rmlssfZMrfwgSJkgZaLeBk1PhaBOIiAiIgRaUlW8pDN4QJBpXNIA+EFvqmBMGSloHw98uwEREBKGVlDAjAP9/GRv4QWPswJb/7/wB4i3h/fwlIFyIiAiIgIiICIiAiJjms2uOEwK/h6vftdaSd6o3G3d5A24tYeMDI5Zr11RSzsqKOLMQoHmTumhtYdsGLqkrhlXDpybc9Qi/G7DKLjkBu6zxcNqnpfSDCo9Os4P5TEMVAB33XOblfsgiBvHG6/wCjaV82Mpm3sE1P4YM8mptb0WOFSo3lTb+a0wrAbEq7D8Li6aHoitU+8rPao7EsOB38XVJ+qqKPgbwPaTa5ow8alQedNv8AS89PB7RdGVPRxiD84Hp/N1AmJ1diWGt3cVWB8VQ/IATyMbsQqgHssYjHkHRk+as33QNzYTGU6q5qdRKi+0jKw+Km0+mc1Y7ULS2CbtKdNzl/KYZyx9wWzj4T7dBbV8fhzlr2xCg2KuMtQW3WDqOP2g0DoiJiOq2v2Dx1lSpkqn8lUsrnj6BvZ+F9xvbiBMugIiICIiAiIgIiICIiAiIgIlCYvArEpeVgJbdwASSAALkncABxJPISj1AASSABvJO4AAXJJ6TQm0raC2LY4XCsRhwcrMt81dr/AByX4DnxPIAPb172sWLUMARzD4i1x4iiDx+0fcOBmK6qbPMZpA9tVZqdJjmNWpdnqX4lFJu32iQN/OZls72XKgXEY5Q1TcyUDvVOYaqPWb6vAc7nhtwCBjGreo2CwQBpUQ1QflalnqX6gkWX9ECZREpArE83S2maGGTPXrJTXfYsQCxAvZRxY+ABmFaR2v4GmQFp16gIurBVVSOozsG+IgbHiaywu2bBMwD0cQl+eVGA87Nf4AzNtC6xYXFjNh66VLekBcMv2lazLw5iB688HWHVPB41SK9FWa25x3ai+TDf7jceE96IHPmt2yvE4W9XDMa9Ib7AWrIBvuQPSt1Xf4CfXqNtWqUctHGlqlLcFq7zUT7fN18fS+1wm+JrbaFs1p4sGvhgtPE7yy7lSt4NyV/rc+fUBsLC4lKiK9NlZGAZWUghgeBBEvznDUfXKvoyuaFcN2Ga1WkwOam3AugPA9RwPwM6GwmMSqi1KbB0ZQysN4IPAiB9MSl5WAiUJgGBWIiAiIgIiIEWlLSrLeRNPxMBaVtKCn4zH9dtPrgcJUrk3f0KSm3eqNfL5gWLHwUwMC2v63iz4GjUysAprkesCL9iGHA8CetwOsubItQwirjcQnfYXoIw9AHhVYH1j6vQb+J3Yns20A2kcW1SsoNKm3aVmIuajMSQhPPMblvAH2p0QBArERATDNoGu1PR6Kos1ep6CHgq3saj29UchzI8CRlmJxCojO5sqKWYngAoJYn3CcpayacfF4qpiHvd2uoPqoPQUeQA+Z5wPux+mGr1Hq16/a3ZzZgSy7zkFM+qOG4WAnzJpBT2bM/AEMCCSGs2V7WsQJ5hxZuCAARfh4/P/cyQxp9lbdOvD+kD0hjFBUNUDPlcCpl3KWIy8t/PfyvLmB0p2TFxWJqBlyul1ZTlIzLu32v754y4o2AyqbdeO6TOM4dxfh5f0gb72b6/DFn6NXI+kKCVZdy11G8sBycDeV8yOYGxZx9gse9KqlZGyujBlI5FTce7lbpOrtXtKrisNSxCcKiBrccp4MvuYEe6B6cREDXe1HUUYymcRQUDEoOA/LKPVP1h6p93S2G7KNcRhmTB1mslRmC5r/g6hYZQeitex6Gx5mb2mitserPYVPpVJR2VYkVAB6FUgnMOgbeftA9YG8pS0wnZbrJ9NwgDtetRslTqw9RyPECxPMq0zbJ4wK2lVkez8TJKtoEoiICIiAiIgIiICaB226d7XFrhlPcw694cjUcBjfkbLlHhdpvivWVEZ2NlVSzHoFFyfgJzZqbh20hpdHqC4aq2IqcwApNTKb+qSAvkYG8dn2r4wWCp0iLVGHaVeudwCQfsiy/ozKIiAiIgYptMxJTReKYcSgT3VHVG+TGcvTqjaBgTW0dikAN+yZgBvJNO1QADmTltOV4CIiAiIgJ0TsRxJbRuU/k61RR5HK/3uZztOj9jeCNPRiMbg1HqVLHduvkB8iEB98DPYiICeXrFohMXhquHfg6kA+yw3ow8QwB909SIHNuzbSr4HSa06ndDucNVHINmyqfMOBv6Fus6SnO22XRXYaRNVbhayLUBG6zr3Htbfe6hvNpvTVnSX0nCUK+69SmjNbgGyjOPcwI90D1YiICIiAiIgIkc0ZoEolJWBi+0jGdlo3FNe16ZQf5hFP8AmmtNgWDDYjE1eaU0Qf5jEn+HM12z1LaLqD2qlIH9fN/LPE2BUgMPiX5mqinyVLj98wNsxEgTAnEhmlc0ARecwbRNWGwOLZAD2TkvRPLKTvW/VTut0sec6fJnjazav0MdQajWXdxRh6VNuTqeR8OB4GBydEy/WzUDGYEszIatEbxWQErb644obcb7uhMxCAiJkerGp2MxrDsaRCX31XutNeve9Y+C3MD5dVtBVMbiUoUwe8bs1tyIPSc+Q+JIHOdVYHCJSppSQWRFVFHRVAAHwE8DUzVGjo6lkp9+o1jVqEWZyOQHJBfcvzJmS3gTiRzRmgSiRBkoGptvuDBw+Grc1qtT91RC3/bnsbFcZn0Yq3/wqlRPiRUH8SV21Ug2jHJ9WpTYeZYr9zGeRsCqfi2JXpWU/rIB/LA2vEShgViQuZUNAlEhm/vf/SIEcwlO0HjL0paAErEQMA20rfRjnpUpH9q3+s8bYHU/FsSvMVVP6yAD92ZZtPwnaaMxS+ygqf8ATdXPyUzXmwHFgVcVSvvZKbgfYZlP8QQN3y2W32lyIFkuJUsJdmM68a0Jo/DNVIDO3dpJ7TkXufqjiT7uJECOtut9DAp3rvVYXp0lNi3LMx4Il/WPuB4TRmtuvONxd1qVOzpm/wCCpllUg3FnPr8OZt4TGtI6Qq16j1arl3c5nY8zy8AANwHAAACfHAzrVnafjcKAjMK9McFqElgOi1OI99wOQmSHaHoev3sTorvn0iqUXJP2yUJ981DEDbq696Dpd6joolxvGenQG/lZszEedp42sO1nGV1KUAMMhFu4S1S3QOQMvmoB8ZruIGUasa343Csxo1iQe8yVCXpklrs2UncSTvIsfGbu1K19o44dm47LEC90vdWtxNNufip3jfxG+c0y7RrMrB1YqykMrAkMCDcMCN4IO+8DsIMIziYXsz1yGPoZahH0ikAKnAZ1Po1APG28DgegImcwLQYcr3l2IgYBtoqAaLce1UpAfrZvuWeLsCT8WxJ61VHwT/3J7fMWBhcPSvvesXt4U0ZT86gno7EMJk0dn/4lao3uULT+9DA2LKGViBazDxlO0HjL0QLfx+f9YlyICIiAiIgfNjsKtWm9NvRdGRvJlKn5Gc57OcW2C0siVO7d3w1TzY5APLtAu/wnSs532yaGOHx/brcLiAKikbrOllqAW5+i1/rwOiIng6m6dXG4OlXB7zC1QezUXc4+O8eBE96AnN213TxxGPdAb08Pekg5Zh/inzzbvJBOi8RVyozHgqk/AXnH1eszuzsbszFmPUsbk/EwLUREBERAREQEREDItRtOnBY2lWvZcwSr0NNyA1/L0vNROqZxpOsdTsWauBwtQm7NQp5j1YIAx+Ige3ET4dLaQTD0aleobJTUs3jYcB4k7h4mBorbfpXtcctEG60KYU+D1O+37OX4Gbo1O0Z9GwWGokWZKa5h9dhmf9pjNBal4J9JaVV6m8Go2IrcwFVs2Xf6pYqnk06YgIiICIiAiIgIiIFCYvKNKCBOYjtH1b+nYJ0UXqp+Eo9Syg3X9JSR0uQeUyqVgaB2RayHB4k4WtdaeIK5c24LU4KT0DDunxy9J0DNI7YNUzTLYyiilHIFbdvpt7S8gGJ387+YtkuyvXoYumMNXb8Ypr3ST/jIB6Xi4HEc+PWwZ3po/i9b81U/cM5BnXmnv/rYj8zV/cachwEmikkAbyTYeZkJew1s634Zhf4iBd+gVbMchspIPDlx8/dPmKEWuCL8PHynvMgYsHC9mrPlYMAyXYmxHME8vGUzq4pFlTLlseAswzFUO+4WB4EuCkxUtbcCAT4nhPaFJLrmWmKmVrKCMpNxkzAG17XkqIQK4qBF7yd1T3M2U2zWO4X42gY/EvYlCGYEAG/BbW91uUswE6k2bn/4zCfmh+8Zy3Oo9mf/AOXhfzZ/faBlM03tp1gZyuBogkXz1iOBZd607+F8x8cvQzMNomua6Po2UhsRUBFJOnI1GHsjkOZ3dSNabNtW2x9Va9XvUlaocQW3mq7kMEJ6n0m8PtCBnWx/Vg4XCmtUW1bEWax4rTW+RfM3LfpLfhNiy2B8P74RAnKyF4WBOIiAiIgIiIEGB5GUKnrLkQLYU9YynrLkQPlxWEWojJUAZHUqykbmBFiDOetedTq+jK4r0GbsMwalVF81Nr3CORwI5HmPeJ0fPnxmFSqjU6ih0YWZWFwQeREDWWru0enjMHWoYghMSKFUDkla1Nt69G6r7x0GiJs7XvZdVw5athA1WjvJTjUpDw5uo6jeOd95msYCSQ2IPjIxA+vtkuCE635+W47usqK9P2N3PmeX9PnPjiB9K1UsLrv68JM1aW7uH4nw3cZ8cQJMbn7pGIgJu/RmvtDR+icKotUxDU2yUweHfezVCPRXw4nlzI0hM81H2cV8cVqVL0cPuOcjv1B/yweX1ju6X4QPm0DoTF6ZxbPUZiCwNasR3UHJFHC9tyqPunQ+h9FU8NSShRXKiCwHM9WJ5sTvJ8ZLQ+iaOGpLRoIEReAHM82Y8Sx5kz0IFvIesZT1lyIFvKesqqnmbycQEREBERAREQEREBERAREQEwfW3Ztg8aWcDsKx9dALMd+904N5ixPWZxEDmfWHZtpDCknsu2pjg9G77r+slsw3cdxA6zDXUgkEWI3EHiCOM7Knk6U1fwmJ/wAfDUqh4ZmVcw8m9Ie4wOSYnReN2RaNf0Vq0vsOT/EDTyamxLDeriqw8wh+4CBoqJvOnsSw3PF1j5Kg/rPUwex7Ryen21T7bgD9hVPzgc8TKtAagY/F2KUCiH8pVvTTzFxmYfZBnQ+idVMFhrGjhaSsODZQz/rtdvnPbga61U2VYXDFalc/SKo3jMLUlP1U9Y+LX4XsJsQCViAiIgIiICIiAiIgIiIFLymaRuOsZh1ECcrKAysBERASOaSlsnxgSzSt5bLDrK3HWBItKgyGbxlVMCcREBERAixjNDGRzDrAlmlby2COsrcdYEg0lLebxlyAiIgJQysoYEc0qGkcw6ymYdYE80Sl/H+/hKQJZR0jIOk81amI5qPdl/rJGpX9n5L/AOUD0onx4RqhJziwsLcOPPgTPsgIiICRyyUQIZR0ErlHSSiBHIOkAWkogIiICIiBQiUyjpJRAjlHSMo6SUQIhR0koiAiIgIiIEco6RlHSSiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgf/Z" />
              <p>Город: {user.city}</p>
              <p>Имя: {user.name}</p>
              <p>
                Дата рождения:
                {format(
                  new Date(
                    new Date(user.date_of_birth).getFullYear(),
                    new Date(user.date_of_birth).getMonth(),
                    new Date(user.date_of_birth).getDate()
                  ),
                  "dd.MM.yyyy"
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
