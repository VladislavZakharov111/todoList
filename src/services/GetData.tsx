import axios from "axios"
import {addUserFromServer} from "../store/authReducer"
import { addNewTodo } from "../store/todoReducer"

export const GetDataUsers = (login:any,password:any) => { 
    return function (dispatch:any){
        axios.get(`http://localhost:3001/users?login=${login}&password=${password}`)
        // .then(res => ) // catch redirect 
        .then(res => {
            console.log(res.data)
            console.log(res.data.length)
            if(res.data.length){
                dispatch(addUserFromServer(res.data));
            }
            else
                console.log("Неверный логин/пароль")
        }).catch(error=>{
            console.log("error",error)
        })
    }
}

export const GetDataTodos = () =>{
    return function (dispatch:any){
        axios.get(`http://localhost:3001/todos`)
        .then(res => {
            console.log("our data", res.data);
            dispatch(addNewTodo(res.data));
        })
    }  
}

