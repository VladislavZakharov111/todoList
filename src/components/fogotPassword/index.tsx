
import React , {useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";


import DatePicker from "react-datepicker";
export const ForgotPassword = () => {

    const [email, setEmail] = React.useState<any>('')
    const [password, setPassword] = React.useState<any>('')
    const [flagDidabledReg, setFlagDisabledReg] = React.useState<any>(true)
    const [emailDirty, setEmailDirty] = React.useState<any>(false)
    const [passwordDirty, setPasswordDirty] = React.useState<any>(false)
    const [emailError, setEmailError] = React.useState<any>('Email не может быть пустым')
    const [passwordError, setPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [formValid, setFormValid] = React.useState<any> (false)
    const [dataendpoint, setDataendpoint] = useState(new Date());

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
        <div>
            <form>
                <p>Забыли пароль</p>
                <input type = 'text' onChange={handleEmail} onBlur={blurHandler} name = "email" />
                <DatePicker selected={dataendpoint} required onChange={(date:any) => setDataendpoint(date)} />
                <input type = 'password' onChange={handlePassword} onBlur={blurHandler} name = "password" />
                <button> Востановить пароль </button>
            </form>
        </div>
    )
}
