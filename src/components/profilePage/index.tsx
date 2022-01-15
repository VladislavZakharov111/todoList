import React, {useState,useEffect} from "react"
import { ModalView } from "../mainPage/components/modalView"
import { useDispatch,useSelector } from "react-redux";
import { changeProfile } from "./GetData"
import DatePicker from "react-datepicker";
export const Profile = () =>{

    const [openModalProfile, setOpenModalProfile] = React.useState<any> (false)
    const [modalChangePassword, setModalChangePassword] = React.useState<any>(false)
    const [city, setCity] = React.useState<any>('')
    const [name, setName] = React.useState<any>()
    const [oldPassword, setOldPassword] = React.useState<any>('')
    const [newPassword, setNewPassword] = React.useState<any>('')
    const [passwordError, setPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [newPasswordDirty, setNewPasswordDirty] = React.useState<any>(false)
    const [oldPasswordDirty, setOldPasswordDirty] = React.useState<any>(false)
    const [isDisabledChangePassword, setIsDisabledChangePassword] = React.useState<any>(true)
    const [oldPasswordError, setOldPasswordError] = React.useState<any>('Пароль не может быть пустым')
    const [dataendpoint, setDataendpoint] = React.useState(new Date());
    const [currentPassword, setCurrentPassword] = React.useState<any>() 
    const user = useSelector((state:any) => state.authReducer.user)
    console.log("user", user)

    const dispatch = useDispatch()

    useEffect(() => {
        if(user[0].name === "")
            setOpenModalProfile(true)
    },[user])

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
    }
    const handleChangePassword = () =>{
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

    const handleButtonChangePassword  = () => {
         if(oldPassword === user[0].password && oldPassword.length > 0)
         {
            setOldPasswordError('')
         }
         else 
         {
            setOldPasswordError('Неверный старый пароль')
         }
    }
 
    const handleFormChange =  (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
    }  

    const handleChangeProfile = (id:any, city:any , date_of_birth:any, name:any ) => {
        dispatch(changeProfile(id, city, date_of_birth, name ))
    }

    return(<div>

        <button>Профиль</button>
        <button onClick={handleEditProfile}>Редактировать Профиль</button>
        <button onClick={handleChangePassword}>Сменить пароль</button>

        
        <div>Профиль</div>
        <p>Город {user.city}</p>
        <p>Имя {user.name}</p>
        <p>Дата рождения {user.date_of_birth}</p>

        <ModalView active={openModalProfile} setActive={setOpenModalProfile}>
            <form onSubmit={() => handleChangeProfile(user[0].id, city,dataendpoint,name)} >
                <button onClick={() => setOpenModalProfile(false)}>Закрыть</button>
                <h2>Заполните все поля</h2>
                <p>Город</p>
                <input type = 'text' value={city} onChange={e => setCity(e.target.value)}/>
                <p>Дата рождения</p>
                <DatePicker selected={dataendpoint} required onChange={(date:any) => setDataendpoint(date)} />
                <p>Имя</p>
                <input type = 'text' value ={name} onChange={e => setName(e.target.value)}/>
                <button type ="submit">Изменить</button>
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
                {(newPasswordDirty && passwordError) && <span style = {{color:'red'}}>{passwordError}</span>}
                <button disabled = {isDisabledChangePassword} onClick={handleButtonChangePassword}>Изменить пароль</button>
            </form>
        </ModalView>
    </div>)
}