import axios from "axios"
import {addUserFromServer} from "../store/authReducer"
// import { addNewTodo, actionDeleteTodo,actionAddOneTodo } from "../store/todoReducer"
import {getTodoFromServer} from "../store/todoReducer"
// import {actionChangeCurrentTodo} from "../store/todoReducer"
import { Redirect, useHistory } from "react-router-dom"
import {addDefferedFromServer} from "../store/defferedReducer"


// http://localhost:3000/todos?_page=2&_limit=2 // pagination


// let u = a.reduce((acc,a) => {
//     return acc + "id=" + a + "&"
//   },"")   // преобразование массива в id строку

// auth
export const setDataUsers = (login:any,password:any) => { 
    // const history = useHistory() //setDataUsers
    return function (dispatch:any){
        axios.get(`http://localhost:3000/users?login=${login}&password=${password}`)
        // .then(res => ) // catch redirect 
        .then(res => {
            console.log(res.data)
            console.log(res.data.length)
            if(res.data.length){
                dispatch(addUserFromServer(res.data));
            }
            else
                dispatch(addUserFromServer(1));
        }).catch(error=>{
            console.log("error",error)
        })
    }
}
// /todos
export const setDataTodo = (page:any, filterName:any, filterCategories:any,done:any, sortState:any) =>{
    
    let URL = `http://localhost:3000/todos?_page=${page}&_limit=5`
    // if(filterName.length === 0) 
    //     URL =  `http://localhost:3000/todos?_page=${page}&_limit=5&_sort=title`
    // else
    //     //URL = `http://localhost:3000/todos?_page=${page}&_limit=5&title=${filterName}&categories=${filterCategories}&status=${done}`
    //     if()
    //     URL = `http://localhost:3000/todos?_page=${page}&_limit=5&title=${filterName}&status=${done}&_sort=title`
    console.log({filterCategories})
    if(filterName.length !== 0) URL = URL + `&title=${filterName}`;
    if(filterCategories.length !== 0) URL = URL + `&categories=${filterCategories}`; //?????????????????????????
    if(done.length !== 0) URL = URL + `&status=${done}`;
    if(sortState === false) URL = URL + `&_sort=title`;
    if(sortState) URL = URL + `&_sort=title&_order=desc`;

    return function (dispatch:any){
        axios.get(URL)
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
            dispatch(setDataTodo(1,"","Спорт",true, true))
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
            dispatch(setDataTodo(1,"","Спорт",true,true))
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
                dispatch(setDataTodo(1,"","Спорт",true,true))
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
            dispatch(setDataTodo(1,"","Спорт",true,true))
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
                dispatch(setDataTodo(1,"","Спорт",true,true))
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