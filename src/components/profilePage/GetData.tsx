import axios from "axios"
// import {actionChangeCurrentTodo} from "../store/todoReducer"
import { push } from 'connected-react-router'
import { getDetailPage } from "../../services/GetData"

// export const changePassword = (id:any, password:any) => {
//     return function (dispatch:any){
//         axios.patch(`http://localhost:3000/users/${id}`,{
//                 "password": password
//             }).then(
//                 // dispatch(setDataTodo(1,null,null,null,false))
//             ).catch(
//                 error => console.log(error)
//             )
//      }  
// } 

export const changeProfile = (id:any, city:any, date_of_birth: any, name:any) => {
    return function (dispatch:any){
        axios.patch(`http://localhost:3000/todos/${id}`,{
            "city": city,
            "date_of_birth": date_of_birth,
            "name": name
            }).then(
                dispatch(getDetailPage(id))
            ).catch(
                error => console.log(error)
            )
     }  
}