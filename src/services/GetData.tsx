import axios from "axios"
import {addUserFromServer} from "../store/authReducer"
import { addNewTodo, actionDeleteTodo,actionAddOneTodo } from "../store/todoReducer"
import { Redirect, useHistory } from "react-router-dom"
import {addDefferedFromServer} from "../store/defferedReducer"

export const setDataUsers = (login:any,password:any) => { 
    // const history = useHistory() //setDataUsers
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

export const setDataTodo = () =>{
    return function (dispatch:any){
        axios.get(`http://localhost:3000/todos`)
        .then(res => {
            console.log("our data", res.data);
            dispatch(addNewTodo(res.data)); //setDataTodo
        })
    }  
}

export const deleteTodo = (id:any) =>{
    return function (dispatch:any){
        axios.delete(`http://localhost:3000/todos/${id}`)
        .then(res => {
            console.log("deleteData", res.data);
            dispatch(actionDeleteTodo({id:id}))
        }).catch(error => console.log(error))
    }  
}

export const addNewOneTodo = (nowdata:any, categories:any, title:any, description:any) => {
    return function (dispatch:any){
        axios.post(`http://localhost:3000/todos`, {
            "date-create":nowdata,
            "data-change":nowdata,
            categories:categories,
            title:title,
            description:description,
          }).then(res => {
            actionAddOneTodo({
                "date-create":nowdata,
                "data-change":nowdata,
                categories:categories,
                title:title,
                description:description
            })
          })
          .catch(error => {
            console.log(error);
          });
    }  
} 

export const addArchiveTodo = () =>{
    return function (dispatch:any){
        axios.get(`http://localhost:3000/deffered`)
        .then(res => {
            console.log("deffered data", res.data);
            dispatch(addDefferedFromServer(res.data));
        })
    }  
}

export const changeCurrentTodo = (todoId:any, nowdata:any, categories:any, title:any, description:any) => {
    return function (dispatch:any){
        axios.put(`http://localhost:3000/todos/${todoId}`,{
              "date-create":nowdata,
              "data-change":nowdata,
              categories:categories,
              title:title,
              description:description,
        }).then(res => console.log(res))
    }  
}////////

export const setIsComplited = (id:any, isCompleted:any) => {
    return function (dispatch:any){
        axios.put(`http://localhost:3000/todos/${id}`,{
            ///все данные 
              status:isCompleted
        }).then(res => console.log(res))
    } 
}
//delete thunk


// export const addArchiveTodo = (todo:any) =>{
//     return function (dispatch:any){
//         axios.post(`http://localhost:3000/deffered`, {todo})
//         .then(res => {
//             console.log("deffered data", res.data);
//             dispatch(addDefferedFromServer())
//         })
//     }
// }