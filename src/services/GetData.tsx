 import axios from "axios"
 import {addUserFromServer} from "../store/authReducer"

// export const GetDataUsers = async(
//     login:string
// ):Promise<Array<Object>> =>{
//     console.log("login",login)
//     const res = await axios.get(`http://localhost:3001/users?login=${login}`);
//     console.log("res" , res.data);
//     return res.data;
// }


// export const GetDataUsers = async(
//     login:string
// ):function => {
//     return function(dispath) =>{
//         axios.get(`http://localhost:3005/users?login=${login}`)
//         .then(res => dispatch())
//     }
// }   
export const GetDataUsers = (login:any) => { 
    return function (dispatch:any){
        axios.get(`http://localhost:3001/users?login=${login}`)
        .then(res => dispatch(addUserFromServer(res.data)))
    }
}
export const data = 10