import React, {useState,useEffect} from "react"
import { ModalView } from "../mainPage/components/modalView"
import { useDispatch,useSelector } from "react-redux";
import { changeProfile, changePassword } from "./GetData"
import DatePicker from "react-datepicker";
import { push } from 'connected-react-router'
export const Profile = () =>{

    const [openModalProfile, setOpenModalProfile] = React.useState<any> (false)
    const [modalChangePassword, setModalChangePassword] = React.useState<any>(false)
    const [city, setCity] = React.useState<any>('')
    const [name, setName] = React.useState<any>()
    const [isDisabledChangePassword, setIsDisabledChangePassword] = React.useState<any>(true)
    const [dataendpoint, setDataendpoint] = React.useState(new Date());
    const [currentPassword, setCurrentPassword] = React.useState<any>() 
    const [newPasswordDirty, setNewPasswordDirty] = React.useState<any>(false)
    const [newPasswordError, setPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [oldPasswordDirty, setOldPasswordDirty] = React.useState<any>(false)
    const [oldPasswordError, setOldPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [oldPassword, setOldPassword] = React.useState<any>('')
    const [newPassword, setNewPassword] = React.useState<any>('')
    const user = useSelector((state:any) => state.authReducer.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if(user.length > 0)
        {
            if(user[0].name === "")
                setOpenModalProfile(true)
        }
        else{
            dispatch(push('/auth'))
        }
    },[user])

    console.log("user", user)
    console.log(oldPassword.length, newPassword)
    React.useEffect(() => {
        if(oldPassword.length > 0 && newPassword.length > 0){
            setIsDisabledChangePassword(false)
        }
        else{
            setIsDisabledChangePassword(true)
        }
    }, [oldPassword, newPassword])

    const handleEditProfile = () => {
        setOpenModalProfile(!openModalProfile)
    }

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
        if(oldPassword === user[0].password)
        {
           setOldPasswordError('')
           if(newPasswordError.length === 0 ){
                dispatch(changePassword(user[0].id, newPassword))
                setModalChangePassword(false)
           }
        }
        else 
        {
           setOldPasswordError('Неверный старый пароль')
        }
    }

    const handleChangePassword = () => {
        setModalChangePassword(!modalChangePassword)
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

    const handleChangeProfile = (e: React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setOpenModalProfile(false)
    }

    const handleClickChangeProfile = () => {
        if(user.length > 0) {
            dispatch(changeProfile(user[0].id, city, dataendpoint, name ))
        }
    }
    return(<div>
        {
            user.length > 0 && user[0].name === "" ? <div>Заполните все поля  <button onClick={handleEditProfile}>Редактировать Профиль</button> </div> : 
            // {user.length > 0 ? {dispatch(push('/auth'))} : <div>
            user.length === 0 ? dispatch(push('/auth')) :  
                <div>
                    <button>Профиль</button>
                    <button onClick={handleEditProfile}>Редактировать Профиль</button>
                    <button onClick={handleChangePassword}>Сменить пароль</button>
                    <div>Профиль</div>
                    <p>Город {user[0].city}</p>
                    <p>Имя {user[0].name}</p>
                    <p>Дата рождения {user[0].date_of_birth}</p>
                </div>
        }

        <ModalView active={openModalProfile} setActive={setOpenModalProfile}>
            <form onSubmit={handleChangeProfile} >
                <button onClick={() => setOpenModalProfile(false)}>Закрыть</button>
                <h2>Заполните все поля</h2>
                <p>Город</p>
                <input type = 'text' value={city} onChange={e => setCity(e.target.value)}/>
                <p>Дата рождения</p>
                <DatePicker selected={dataendpoint} required onChange={(date:any) => setDataendpoint(date)} />
                <p>Имя</p>
                <input type = 'text' value ={name} onChange={e => setName(e.target.value)}/>
                <button type ="submit" onClick={handleClickChangeProfile}>Изменить</button>
            </form>
        </ModalView>

        <ModalView active={modalChangePassword} setActive={setModalChangePassword}>
            <form onSubmit={handleFormChange}> 
                <button onClick={() => setModalChangePassword(false)}>Закрыть</button>
                <p>Введите старый пароль</p>
                <input value = {oldPassword} type='text' onBlur = {e=> blurHandler(e)} onChange={e => handleOldPassword(e)} name ='oldPassword'/>
                {(oldPasswordDirty && oldPasswordError)  && <span style = {{color:'red'}}>{oldPasswordError}</span>}
                <p>Введите новый пароль</p>
                <input value ={newPassword} onBlur = {e=> blurHandler(e)} name ='newPassword' type='text' onChange={e => handleNewPassword(e)}/>
                {(newPasswordDirty && newPasswordError) && <span style = {{color:'red'}}>{newPasswordError}</span>}
                <button disabled = {isDisabledChangePassword} onClick={handleButtonChangePassword}>Изменить пароль</button>
            </form>
        </ModalView>
    </div>)
}