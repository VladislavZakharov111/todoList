import React, { useEffect } from 'react';
import {setDataUsers} from '../../services/GetData'
import {useDispatch} from "react-redux"
import { useTypedSelector } from '../../hooks/useTypedSelector';   
import {FormAuth} from './styled'
function  Authorization() {
    const dispatch = useDispatch()
    // const userInfo = useTypedSelector(state => state.authReducer.user)
    const [login,setLogin] = React.useState<string>(" ");
    const [password,setPassword] = React.useState<string>("");
    const [flagDisable, setFlagDisable] = React.useState<any>(true)

    useEffect(() => {
      if(login.length > 0 && password.length > 0)
        setFlagDisable(false)
      else
        setFlagDisable(true)
    },[login,password])

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLogin(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

    const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setDataUsers(login, password))
        setDataUsers(login, password)
    }
    // console.log({isAuth})
  return (
    <div className="App">
      <FormAuth>
        <p>Авторизация</p>
        <form onSubmit={handleSubmitForm}>
          <input type="text" onChange={handleLogin} value={login} placeholder ='Email'/> 
          <input type="password" onChange={handlePassword} value={password} placeholder='Пароль'/>
          <button>Зарегестрироваться</button>
          <button>Забыли пароль</button>
          <button disabled = {flagDisable} type='submit'>Войти</button>  
        </form>
      </FormAuth>
     
      <div>{login}</div>
      <div>{password}</div>
    </div>
  );
}

export default Authorization;
