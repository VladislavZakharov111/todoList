import React, {useState,useEffect} from "react"
import { ModalView } from "../../../mainPage/components/modalView"
import { useDispatch,useSelector } from "react-redux";
import { changeProfile, changePassword } from "../../GetData"
import DatePicker from "react-datepicker";
import { push } from 'connected-react-router'

export const ChangePassword = () => {
    const [modalChangePassword, setModalChangePassword] = React.useState<any>(false)
    const [isDisabledChangePassword, setIsDisabledChangePassword] = React.useState<any>(true)
    const [newPasswordDirty, setNewPasswordDirty] = React.useState<any>(false)
    const [newPasswordError, setPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [oldPasswordDirty, setOldPasswordDirty] = React.useState<any>(false)
    const [oldPasswordError, setOldPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [oldPassword, setOldPassword] = React.useState<any>('')
    const [newPassword, setNewPassword] = React.useState<any>('')
    const user = useSelector((state:any) => state.authReducer.user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if(oldPassword.length > 0 && newPassword.length > 0){
            setIsDisabledChangePassword(false)
        }
        else{
            setIsDisabledChangePassword(true)
        }
    }, [oldPassword, newPassword])

    const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value)
        if(e.target.value.length > 0)
        {
            setOldPasswordError('')
        } 
        else{
            setOldPasswordError('Пароль не может быть пустым')
        }
    }

    const handleButtonChangePassword  = () => {
        if(oldPassword === user.password)
        {
           setOldPasswordError('')
           if(newPasswordError.length === 0 ){
                dispatch(changePassword(user.id, newPassword))
                setModalChangePassword(false)
           }
        }
        else 
        {
           setOldPasswordError('Неверный старый пароль')
        }
    }

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>):any =>{
        switch(e.target.name){
            case 'oldPassword':
                setOldPasswordDirty(true)
                break
            case 'newPassword':
                setNewPasswordDirty(true)
                break
        }
    }

    const handleNewPassword = (event:  React.ChangeEvent<HTMLInputElement>) => {
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
        setNewPassword(event.target.value)
    }

    const handleFormChange =  (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault() 
    } 

    return (
        <div>
             <button onClick={() => setModalChangePassword(!modalChangePassword)}>Сменить пароль</button>
            <ModalView active={modalChangePassword} setActive={setModalChangePassword}>
                <form onSubmit={handleFormChange}> 
                    <div onClick={() => setModalChangePassword(false)} className="button_close"></div>
                    <p>Введите старый пароль</p>
                    <input value = {oldPassword} type='text' onBlur = {e=> blurHandler(e)} onChange={e => handleOldPassword(e)} name ='oldPassword'/>
                    {(oldPasswordDirty && oldPasswordError)  && <span style = {{color:'red'}}>{oldPasswordError}</span>}
                    <p>Введите новый пароль</p>
                    <input value ={newPassword} onBlur = {e=> blurHandler(e)} name ='newPassword' type='text' onChange={e => handleNewPassword(e)}/>
                    {(newPasswordDirty && newPasswordError) && <span style = {{color:'red'}}>{newPasswordError}</span>}
                    <button disabled = {isDisabledChangePassword} onClick={handleButtonChangePassword}>Изменить пароль</button>
                </form>
            </ModalView>
        </div>
    )
}

