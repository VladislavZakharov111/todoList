import axios from "axios"
// import {actionChangeCurrentTodo} from "../store/todoReducer"
import { push } from 'connected-react-router'
import { setUserFromServer } from "../../store/authReducer"

export const setDataUsersById = (id:any) => { 
    console.log('this')
    return function (dispatch:any){
        axios.get(`http://localhost:3000/users/${id}`)
        .then(res => {
            console.log('dataTTT',res.data)
            console.log(res.data.length)
                dispatch(setUserFromServer(res.data));
                if(res.data.name !== "")
                    dispatch(push('/profile'))
                else{
                    dispatch(push('/'))
                }
            }).catch(error=>{
            console.log("error",error)
        })
    }
}

export const changeProfile = (id:any, city:any, date_of_birth: any, name:any) => {
    return function (dispatch:any){
        axios.patch(`http://localhost:3000/users/${id}`,{
            "city": city,
            "date_of_birth": date_of_birth,
            "name": name
            }).then( res => {
                console.log("sucsees")
                dispatch(setDataUsersById(id))
            }
            ).catch(
                error => console.log(error)
            )
     }  
}

export const changePassword = (id:any, password:any) => {
    return function (dispatch:any){
        axios.patch(`http://localhost:3000/users/${id}`,{
                "password": password
            }).then(
                dispatch(setDataUsersById(id))
            ).catch(
                error => console.log(error)
            )
     }  
} 