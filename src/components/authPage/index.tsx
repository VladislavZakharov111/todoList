import React, { useEffect } from 'react';
import {setDataUsers} from '../../services/GetData'
import {useDispatch} from "react-redux"
import { useTypedSelector } from '../../hooks/useTypedSelector';   
import { FormAuth,FiledEmail,ParentInput,ParentButton } from './styled'
import { ButtonAuthSubmit,ButtonGeneral,FiledPassword } from "../../components/authPage/styled"
import { AnyRecord } from 'dns';
import { shallowEqual, useSelector } from 'react-redux'
function  Authorization() {
    const dispatch = useDispatch()
    const userInfo = useTypedSelector(state => (state as any).authReducer.user)
    const [email,setEmail] = React.useState<string>(" ");
    const [password,setPassword] = React.useState<string>("");
    const [flagDisable, setFlagDisable] = React.useState<any>(true)
    const [emailDirty, setEmailDirty] = React.useState<any>(false)
    const [passwordDirty, setPasswordDirty] = React.useState<any>(false)
    const [emailError, setEmailError] = React.useState<any>('Емайл не может быть пустым')
    const [passwordError, setPasswordError] = React.useState<any>('Пароль не может быть пустым')
  
    useEffect(() => {
      if(email.length > 0 && password.length > 0 && emailError === '' && passwordError === '')
        setFlagDisable(false)
      else
        setFlagDisable(true)
    },[email,password])

    useEffect(() => {
      console.log({userInfo})
      if(userInfo === 1)
        setPasswordError('Пароль или email введеные не верно')
      else
        console.log('true auth')
    },[userInfo])

    const handleLogin = (e: React.ChangeEvent<HTMLInputElement>):void =>{
        setEmail(e.target.value)
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!reg.test(String(e.target.value).toLowerCase()))
        {
          setEmailError('Некоретный email ')
        }
        else 
          setEmailError('')
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if(e.target.value.length < 8)
          setPasswordError('Пароль не может быть меньше 8 символов')
        else
        setPasswordError('')
    }

    const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setDataUsers(email, password))
    }
    // console.log({isAuth})
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>):any =>{
      switch (e.target.name){  
          case 'email':
            setEmailDirty(true)
            break
          case 'password':
            setPasswordDirty(true)
            break
      }
    } 

  return (
    <div className="App">
      <FormAuth>
        <p style = {{fontSize:"20px"}}>Авторизация</p>
        <form onSubmit={handleSubmitForm}>
          {/* <input type="text" onChange={handleLogin} value={email} placeholder ='Email'/>  */}
            <FiledEmail onBlur ={blurHandler}  onChange={(e) => handleLogin(e)} color = {emailError}></FiledEmail>
              {(emailDirty && emailError) && <span style = {{color:'red'}}>{emailError}</span>}
            {/* <input type="password" onChange={handlePassword} value={password} placeholder='Пароль'/> */}
            <FiledPassword onBlur = {blurHandler} onChange={(e) => handlePassword(e)}/>
              {(passwordDirty && passwordError) && <span style = {{color:'red'}}>{passwordError}</span>}
            <ButtonAuthSubmit disabled = {flagDisable}>Войти</ButtonAuthSubmit>
            <ButtonGeneral>Зарегестрироваться</ButtonGeneral>
            <ButtonGeneral>Забыли пароль</ButtonGeneral>
          {/* <button disabled = {flagDisable}>Войти</button> */}
        </form>
      </FormAuth>
    </div>
  );
}

export default Authorization;
