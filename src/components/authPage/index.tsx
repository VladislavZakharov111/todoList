import React, { useEffect } from 'react';
import {GetDataUsers} from '../../services/GetData'
import {useDispatch} from "react-redux"
import { useTypedSelector } from '../../hooks/useTypedSelector';   
// import { useHistory } from 'react-router-dom';

function  Authorization() {
    const dispatch = useDispatch()
    // const userInfo = useTypedSelector(state => state.authReducer.user)
    const [login,setLogin] = React.useState<string>(" ");
    const [password,setPassword] = React.useState<string>("");
    // const [isAuth,setIsAuth]  = React.useState(false)
    
    // const history = useHistory()

    // useEffect(() => {
    //     if(userInfo[0] !== undefined){
    //       userInfo[0].password === password ? setIsAuth(true) : setIsAuth(false)
    //     } 
    // }, [userInfo]);

    // useEffect(()=>{
    //   isAuth === true  ? history.push("/") : history.push("/login")
    // },[isAuth])

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setLogin(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }

    const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(GetDataUsers(login, password))
        GetDataUsers(login, password)
    }
    // console.log({isAuth})
  return (
    <div className="App">
      <form onSubmit={handleSubmitForm}>
        <input type="text" onChange={handleLogin} value={login} placeholder ='Логин'/> 
        <input type="password" onChange={handlePassword} value={password} placeholder='Пароль'/>
        <button type='submit'>Войти</button>
       </form>
      <div>{login}</div>
      <div>{password}</div>
    </div>
  );
}

export default Authorization;
