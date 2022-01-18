import axios from "axios"
import {addUserFromServer } from "../../../../store/authReducer"
import { actionSetDetailPage, getTodoFromServer } from "../../../../store/todoReducer"
// import {actionChangeCurrentTodo} from "../store/todoReducer"
import {addDefferedFromServer} from "../../../../store/defferedReducer"
import { push } from 'connected-react-router'

export const getDetailPage = (id:number) => {
    return function(dispatch:any){
        axios.get(`http://localhost:3000/todos/${id}`)
        .then( res =>{
            dispatch(actionSetDetailPage(res.data))
            console.log("dataget", res.data)
            dispatch(dispatch(push(`/${id}`)))
        }).catch(error => console.log(error))
    }
} 