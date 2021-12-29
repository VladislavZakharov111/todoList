import axios from "axios"
import {addUserFromServer} from "../store/authReducer"
// import { addNewTodo, actionDeleteTodo,actionAddOneTodo } from "../store/todoReducer"
import {getTodoFromServer} from "../store/todoReducer"
// import {actionChangeCurrentTodo} from "../store/todoReducer"
import {addDefferedFromServer} from "../store/defferedReducer"
import { push } from 'connected-react-router'

export const setDataUsers = (login:any,password:any) => { 
    return function (dispatch:any){
        axios.get(`http://localhost:3000/users?login=${login}&password=${password}`)
        .then(res => {
            console.log(res.data)
            console.log(res.data.length)
            if(res.data.length){
                dispatch(addUserFromServer(res.data));
                dispatch(push('/'))
            }
            else
                dispatch(addUserFromServer(1));
        }).catch(error=>{
            console.log("error",error)
        })
    }
}

export const setDataTodo = (page:any, filterName:any, filterCategories:any ,done:any, sortState:any) =>{
    let URL = `http://localhost:3000/todos?_page=${page}&_limit=5&_sort=title`
    console.log({filterCategories})
    if(filterName !== null) URL = URL + `&title=${filterName}`;
    if(filterCategories !== null) URL = URL + `&categories=${filterCategories}`; 
    if(done !== null) URL = URL + `&status=${done}`;
    if(sortState) URL = URL + `&_order=desc`;

    return function (dispatch:any){
        axios.get(URL)
        .then(res => {
            console.log("our data", res.data);
            dispatch(getTodoFromServer(res.data)); 
        })
    }  
}

export const deleteTodo = (id:any) =>{
    return function (dispatch:any){
        axios.delete(`http://localhost:3000/todos/${id}`)
        .then(res => {
            console.log("deleteData", res.data);
            // dispatch(actionDeleteTodo({id:id}))
            dispatch(setDataTodo(1,null,null,null, false))
        }).catch(error => console.log(error))
    }  
}

export const addNewTodo = (nowdata:any, categories:any, title:any, description:any, dateendpoint: any ) => {
    return function (dispatch:any){
        axios.post(`http://localhost:3000/todos`, {
            "datecreate":nowdata,
            "datachange":nowdata,
            categories:categories,
            title:title,
            description:description,
            dateendpoint:dateendpoint,
            status: false
          }).then(
            dispatch(setDataTodo(1,null,null,null,false)) // ?
          )
          .catch(error => {
            console.log(error);
        });
    }  
} 

export const changeCurrentTodo = (todoId: any, nowdata: any, categories: any, title: any, description: any, dateendpoint: any) => {
    return function (dispatch:any){
        axios.patch(`http://localhost:3000/todos/${todoId}`,{
              "datecreate":nowdata,
              "datachange":nowdata,
              categories:categories,
              title:title,
              description:description,
              dateendpoint: dateendpoint
            }).then(
                dispatch(setDataTodo(1,null,null,null,false))
            ).catch(
                error => console.log(error)
            )
     }  
} 

export const setIsComplited = (id:any, isCompleted:any) => {
    return function (dispatch:any){
        axios.patch(`http://localhost:3000/todos/${id}`,{
            status: !isCompleted 
        }).then(res => 
            dispatch(setDataTodo(1,null,null,null,false))
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
                dispatch(setDataTodo(1,null,null,null,false))
            )
            .catch(
                 error => console.log(error)
            )
        })
    } 
}

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