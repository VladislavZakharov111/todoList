import React, { useEffect } from 'react'
import { addNewUser } from "../../services/GetData"
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
// import { getisUser } from '../../services/GetData'
import { checkIsEmail } from '../../services/GetData'
import { FormReg } from "./styled"
import "./registration.css"
export function Registration() {

    const dispatch = useDispatch()
    const [email, setEmail] = React.useState<any>('')
    const [password, setPassword] = React.useState<any>('')
    const [flagDidabledReg, setFlagDisabledReg] = React.useState<any>(true)
    const [emailDirty, setEmailDirty] = React.useState<any>(false)
    const [passwordDirty, setPasswordDirty] = React.useState<any>(false)
    const [emailError, setEmailError] = React.useState<any>('Email не может быть пустым')
    const [passwordError, setPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [formValid, setFormValid] = React.useState<any> (false)

    const currentEmail = useSelector((state:any) => state.registerReducer.currentEmail)
    // useEffect(() => {
    //     if(emailError || passwordError)
    //     {
    //         setFlagDisabledReg(true)
    //     }
    //     else{
    //         getisUser(email).then(res => {
    //             if(res.length){
    //                 setEmailError('Пользователь с таким логином уже существует')
    //             }
    //             else{
    //                 setFlagDisabledReg(false)
    //             }
    //         })
    //     }
    // }, [email,password])

    useEffect(() => {
        console.log("em", email)
        console.log("curE", currentEmail)
        if(emailError || passwordError)
        {
            setFlagDisabledReg(true)
        }
        else{
           dispatch(checkIsEmail(email))
           if(currentEmail.length > 0){
                setEmailError('Пользователь с таким логином уже существует')
                setFlagDisabledReg(true)
           }
           else{
                console.log("ddd")
                setFlagDisabledReg(false)
           }
        }
    }, [email, password, currentEmail])

    const handleFormReg = (e: React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        dispatch(addNewUser(email, password))
    }

    const handleExit = () => {
        dispatch(push('/auth'))
    }

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

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>):any => {
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!reg.test(String(event.target.value).toLowerCase()))
        {
          setEmailError('Некоретный email ')
        }
        else 
            setEmailError('')
        setEmail(event.target.value)
    }

    const handlePassword = (event:  React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        const reg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
        if(!reg.test(String(event.target.value)))
        {
            setPasswordError('Пароль должен содержать цифры, буквы (в том числе и заглавную) и хотя бы один из спец. символов !@$%^&*()_-+')
        }
        else
        {
            setPasswordError('')
        }
        setPassword(event.target.value)
    }
    return (
        <div className="App">
                <FormReg>
                <form onSubmit={handleFormReg}>
                    <h1>Регистрация</h1>
                    {(emailDirty && emailError) && <div style = {{color:'red'}}>{emailError}</div>}
                    <input value={email} onChange={handleEmail} onBlur={e => blurHandler(e)} name = 'email' type= "email" placeholder='Email' className='reg_email'/>
                    {(passwordDirty && passwordError) && <div style = {{color:'red'}} >{passwordError}</div>}
                    <input value={password} onChange={e => handlePassword(e)}  onBlur={e => blurHandler(e)} name = 'password'  type= "password" placeholder='Password' className='reg_password' />
                    <button  disabled = {flagDidabledReg}>Зарегестрироваться</button>
                    <button onClick={handleExit}>Назад</button>
                </form>
                </FormReg>
        </div>
    )
}


