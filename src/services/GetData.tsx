import axios from "axios"
import {addUserFromServer} from "../store/authReducer"
// import { addNewTodo, actionDeleteTodo,actionAddOneTodo } from "../store/todoReducer"
import {getTodoFromServer} from "../store/todoReducer"
// import {actionChangeCurrentTodo} from "../store/todoReducer"
import { Redirect, useHistory } from "react-router-dom"
import {addDefferedFromServer} from "../store/defferedReducer"



// let u = a.reduce((acc,a) => {
//     return acc + "id=" + a + "&"
//   },"")   // преобразование массива в id строку

// auth
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
// /todos
export const setDataTodo = () =>{
    return function (dispatch:any){
        axios.get(`http://localhost:3000/todos`)
        .then(res => {
            console.log("our data", res.data);
            dispatch(getTodoFromServer(res.data)); //setDataTodo
        })
    }  
}

export const deleteTodo = (id:any) =>{
    return function (dispatch:any){
        axios.delete(`http://localhost:3000/todos/${id}`)
        .then(res => {
            console.log("deleteData", res.data);
            // dispatch(actionDeleteTodo({id:id}))
            dispatch(setDataTodo())
        }).catch(error => console.log(error))
    }  
}

export const addNewTodo = (id:any, nowdata:any, categories:any, title:any, description:any) => {
    return function (dispatch:any){
        axios.post(`http://localhost:3000/todos`, {
            "datecreate":nowdata,
            "datachange":nowdata,
            categories:categories,
            title:title,
            description:description,
            status: false
          }).then(
            dispatch(setDataTodo())
          )
          .catch(error => {
            console.log(error);
        });
    }  
} 

export const changeCurrentTodo = (todoId:any, nowdata:any, categories:any, title:any, description:any) => {
    // let isCompleted = isCompletedStatus ? "Выполнено" : "Невыполнено"
    return function (dispatch:any){
        axios.patch(`http://localhost:3000/todos/${todoId}`,{
              "datecreate":nowdata,
              "datachange":nowdata,
              categories:categories,
              title:title,
              description:description,
            }).then(
                dispatch(setDataTodo())
            ).catch(
                error => console.log(error)
            )
     }  
} /// разбираться 

export const setIsComplited = (id:any, isCompleted:any) => {
    return function (dispatch:any){
        axios.patch(`http://localhost:3000/todos/${id}`,{
            status: !isCompleted 
        }).then(res => 
            dispatch(setDataTodo())
        ).catch(
            error => console.log(error)
        )
    } 
}

export const deleteCheckedTodo = (arrId:any) => {
    return function (dispatch:any){
        arrId.forEach((todoId:any) => {
            axios.delete(`http://localhost:3000/todos/${todoId}`)
            .then( res => 
                dispatch(setDataTodo())
            )
            .catch(
                 error => console.log(error)
            )
        })
    } 
}

// /archive

export const getArchiveTodo = () =>{
    return function (dispatch:any){
        axios.get(`http://localhost:3000/deffered`)
        .then(res => {
            console.log("deffered data", res.data);
            dispatch(addDefferedFromServer(res.data));
        })
    }  
}

export const addArchiveTodo = (todo:any) =>{
    return function(dispatch:any){
        console.log({todo})
        axios.post(`http://localhost:3000/deffered`, {todo}).then(
            dispatch(getArchiveTodo())
        ).catch(error => console.log(error))
    }
}

// export const changeCurrentTodo = (todoId:any, nowdata:any, categories:any, title:any, description:any, isCompletedStatus:any) => {
//     let isCompleted = isCompletedStatus ? "Выполнено" : "Невыполнено"
//     return function (dispatch:any){
//         axios.put(`http://localhost:3000/todos/${todoId}`,{
//               "date-create":nowdata,
//               "data-change":nowdata,
//               categories:categories,
//               title:title,
//               description:description,
//               "status":isCompleted,
//               "id": todoId
//         }).then(res => dispatch(actionChangeCurrentTodo({
//             "date-create":nowdata,
//             "data-change":nowdata,
//             categories:categories,
//             title:title,
//             description:description,
//             "status":isCompleted,
//             "id": todoId
//         })))
//     }  
// }////////




 //??? 
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